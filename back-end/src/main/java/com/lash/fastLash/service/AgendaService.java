package com.lash.fastLash.service;

import com.lash.fastLash.dto.Request.AgendaRequestDTO;
import com.lash.fastLash.exception.RequestException;
import com.lash.fastLash.model.AgendaModel;
import com.lash.fastLash.model.AgendamentoModel;
import com.lash.fastLash.model.ProcedimentoModel;
import com.lash.fastLash.repository.AgendaRepository;
import com.lash.fastLash.repository.AgendamentoRepository;
import com.lash.fastLash.repository.ProcediemntoRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class AgendaService {

    @Autowired
    private AgendaRepository agendaRepository;

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private ProcediemntoRepository procedimentorepository;

    @Autowired
    private ModelMapper modelMapper;


    public List<AgendaModel> listarAgendas(){
        return agendaRepository.findAllByOrderByDataAsc();
    }

    public List<String> buscarHorariosDisponiveis(String data, String diaDaSemana){
        validarDatas(data, diaDaSemana);

        Double inicio = (diaDaSemana.toUpperCase().equals("DOM")) ? 8.0 : 9.0;
        Double fim = (diaDaSemana.toUpperCase().equals("DOM")) ? 12.5 : 19.0;

        List<String> horarios = new ArrayList<>();
        for(inicio = 0 + inicio; inicio <= fim; inicio+= 0.5){
            String horario = inicio.toString().replace(".5", ":30").replace(".0", ":00");
            if(agendaRepository.buscarHorarioEmDeterminadoDia(data, horario).isEmpty())
                horarios.add(horario);
        }

        return  horarios;
    }

    public AgendaModel adcionarProcedimentoDeAgendamentoNaAgenda(AgendaRequestDTO agendaRequest){
        Optional<AgendaModel> agendaExistente = agendaRepository.findByData(agendaRequest.getData());
        AgendamentoModel agendamento = buscarAgendamentoPorCodigo(agendaRequest.getCodigoAgendamento());

        if(agendamento.getStatus().equals("Concluido") || agendamento.getStatus().equals("Agendado"))
            throw new RequestException("Você não pode agendar horário para um agendamento já agendado/concluído!");

        if(agendaRepository.buscarHorarioEmDeterminadoDia(agendaRequest.getData(), agendaRequest.getHorario()).isPresent())
            throw new RequestException("Desculpe, este horário já está ocupado!");

        ProcedimentoModel procedimento = preencherProcedimento(agendaRequest);
        agendamento.setProcedimento(procedimento);
        agendamento.setStatus("Agendado");

        if(agendaExistente.isPresent()){
            agendaExistente.get().getAgendamentos().add(agendamento);
            return  agendaRepository.save(agendaExistente.get());
        }
        else{
            AgendaModel agenda = new AgendaModel(
                null,
                agendaRequest.getData(),
                agendaRequest.getDiaDaSemana(),
                agendamento
            );
            return agendaRepository.save(agenda);
        }
    }

    public ProcedimentoModel alterarProcedimento(AgendaRequestDTO agendaRequest){
        ProcedimentoModel procedimento = buscarProcedimentoPorCodigoAgendamento(agendaRequest.getCodigoAgendamento());

        if(!(procedimento.getData().equals(agendaRequest.getData()) && procedimento.getDiaDaSemana().equals(agendaRequest.getDiaDaSemana()) && procedimento.getHorario().equals(agendaRequest.getHorario())))
            throw new RequestException("Você não pode alterar a data e horário da agenda/procedimento através desta função!");

        ProcedimentoModel procedimentoAtualizado = preencherProcedimento(agendaRequest);
        return  procedimentorepository.save(procedimentoAtualizado);
    }

    public AgendamentoModel alterarDiaEHorarioDeProcedimentoDaAgenda(AgendaRequestDTO agendaRequest){
        AgendamentoModel agendamento = buscarAgendamentoPorCodigo(agendaRequest.getCodigoAgendamento());
        AgendaModel agenda = (agendaRepository.findByData(agendaRequest.getData()).isPresent())
                           ? agendaRepository.findByData(agendaRequest.getData()).get() : new AgendaModel();

        if(agendaRepository.buscarHorarioEmDeterminadoDia(agendaRequest.getData(), agendaRequest.getHorario()).isEmpty()){
            validarDatas(agendaRequest.getData(), agendaRequest.getDiaDaSemana());

            agendamento.getProcedimento().setData(agendaRequest.getData());
            agendamento.getProcedimento().setHorario(agendaRequest.getHorario());

            AgendaModel agendaAtual = buscarAgendaPorCodigoDeAgendamento(agendamento.getCodigo());
            agendaAtual.getAgendamentos().remove(agendamento);

            if(agenda.getCodigo() != null) agenda.getAgendamentos().add(agendamento);
            else{
                excluirAgendasVazias();
                agenda = new AgendaModel(
                    null,
                    agendaRequest.getData(),
                    agendaRequest.getDiaDaSemana(),
                    agendamento
                );
            }

            agendaRepository.save(agenda);
            return  agendamentoRepository.save(agendamento);
        }else throw new RequestException("Desculpe, este horário já está ocupado!");
    }

    public String removerProcedimentoDeAgendamentoDaAgenda(Long codigoAgendamento){
        AgendaModel agenda = buscarAgendaPorCodigoDeAgendamento(codigoAgendamento);
        AgendamentoModel agendamento = buscarAgendamentoPorCodigo(codigoAgendamento);

        excluirProcedimentoDeUmAgendamento(agendamento);

        agenda.getAgendamentos().remove(agendamento);
        excluirAgendasVazias();

        return "Agendamento removido da agenda com sucesso!";
    }

    public String excluirAgendas() {
        for (AgendaModel agenda : agendaRepository.findAll()) {
            for (AgendamentoModel agendamento : agenda.getAgendamentos()) {
                if (agendamento.getStatus().equals("Agendado")) {
                    excluirProcedimentoDeUmAgendamento(agendamento);
                }
            }
        }
        agendaRepository.deleteAll();
        return "Agendas excluídas com sucesso!";
    }

    
    //Métodos privados
    private AgendaModel buscarAgendaPorCodigoDeAgendamento(Long codigo){
        return  agendaRepository.buscarAgendaPorCodigoDeAgendamento(codigo)
                .orElseThrow(() -> new RequestException("Agenda inexistente"));
    }

    private AgendamentoModel buscarAgendamentoPorCodigo(Long codigo){
        return  agendamentoRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RequestException("Agendamento inexistente"));
    }

    private ProcedimentoModel buscarProcedimentoPorCodigoAgendamento(Long codigoAgendamento){
        return  procedimentorepository.findByCodigoAgendamento(codigoAgendamento)
                .orElseThrow(() -> new RequestException("Procedimento inexistente"));
    }

    private Double calcularValorDeProcedimento(String mapping){
        return (mapping.equals("aindaNaofoiDefinido")) ? 50.0 : 70.0;
    }

    private ProcedimentoModel preencherProcedimento(AgendaRequestDTO agendaRequest){
        validarDatas(agendaRequest.getData(), agendaRequest.getDiaDaSemana());

        ProcedimentoModel procedimento = (procedimentorepository.findByCodigoAgendamento(agendaRequest.getCodigoAgendamento()).isPresent()) ?
                buscarProcedimentoPorCodigoAgendamento(agendaRequest.getCodigoAgendamento())
                : new ProcedimentoModel();

        procedimento = modelMapper.map(agendaRequest, ProcedimentoModel.class);
        procedimento.setValor(calcularValorDeProcedimento(procedimento.getMapping()));
        procedimento.setFinalizado(false);

        return  procedimento;
    }

    private void validarDatas (String data, String diaDaSemana){
        Date dataConvertida;

        try {
            dataConvertida = new SimpleDateFormat("yyyy-MM-dd").parse(data);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        if(dataConvertida.compareTo(new Date()) == -1)
            throw new RequestException("Você não pode agendar um atendimento para o dia atual ou algum dia passado!");

        if(diaDaSemana.toUpperCase().equals("SAB"))
            throw new RequestException("Você não pode agendar um atendimento para sabádos");
    }

    private void excluirProcedimentoDeUmAgendamento(AgendamentoModel agendamento){
        agendamento.setStatus("Pendente");
        ProcedimentoModel procedimento = agendamento.getProcedimento();
        agendamento.setProcedimento(null);
        procedimentorepository.delete(procedimento);
    }

    private void excluirAgendasVazias(){
        for(AgendaModel agenda: agendaRepository.findAll()){
            if(agenda.getAgendamentos().size() == 0) agendaRepository.delete(agenda);
            else agendaRepository.save(agenda);
        }
    }
}
