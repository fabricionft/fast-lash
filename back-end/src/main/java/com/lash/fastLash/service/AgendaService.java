package com.lash.fastLash.service;

import com.lash.fastLash.dto.Request.AgendaRequestDTO;
import com.lash.fastLash.exception.RequestException;
import com.lash.fastLash.model.AgendaModel;
import com.lash.fastLash.model.AgendamentoModel;
import com.lash.fastLash.model.ProcedimentoModel;
import com.lash.fastLash.repository.AgendaRepository;
import com.lash.fastLash.repository.AgendamentoRepository;
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
    private ModelMapper modelMapper;

    SimpleDateFormat formatar = new SimpleDateFormat("dd/MM/yyyy");


    public List<AgendaModel> listarAgendas(){
        List<AgendaModel> agendas = agendaRepository.findAllByOrderByDataAsc();
        List<AgendaModel> agendasNaoVazias = new ArrayList<>();
        for(AgendaModel agenda: agendas){
            if(agenda.getAgendamentos().size() > 0) agendasNaoVazias.add(agenda);
        }
        return agendasNaoVazias;
    }

    public AgendaModel adcionarAgendamentoNaAgenda(AgendaRequestDTO agendaRequest){
        AgendamentoModel agendamento = buscarAgendamentoPorCodigo(agendaRequest.getCodigoAgendamento());
        AgendaModel agenda = (agendaRepository.findByData(agendaRequest.getData()).isPresent())
                           ? agendaRepository.findByData(agendaRequest.getData()).get() : new AgendaModel();

        if(agendamento.getStatus().equals("Concluido") || agendamento.getStatus().equals("Agendado"))
            throw new RequestException("Você não pode agendar horário para um agendamento já agendado/concluído!");

        if(agendaRepository.buscarHorarioEmDeterminadoDia(agendaRequest.getData(), agendaRequest.getHorario()).isPresent())
            throw new RequestException("Desculpe, este horário já está ocupado!");

        ProcedimentoModel procedimento = modelMapper.map(agendaRequest, ProcedimentoModel.class);
        procedimento.setValor(calulcarValorProcedimento(procedimento.getMapping()));
        agendamento.setProcedimento(procedimento);
        agendamento.setStatus("Agendado");

        if(agenda.getCodigo() != null) agenda.getAgendamentos().add(agendamento);
        else{
            agenda = modelMapper.map(agendaRequest, AgendaModel.class);
            agenda.getAgendamentos().add(agendamento);
        }

        return agendaRepository.save(agenda);
    }

    public AgendamentoModel alterarAgendamentoDaAgenda(AgendaRequestDTO agendaRequest){
        AgendamentoModel agendamento = buscarAgendamentoPorCodigo(agendaRequest.getCodigoAgendamento());

        ProcedimentoModel procedimento = modelMapper.map(agendaRequest, ProcedimentoModel.class);
        procedimento.setDia(agendamento.getProcedimento().getDia());
        procedimento.setHorario(agendamento.getProcedimento().getHorario());
        procedimento.setValor(calulcarValorProcedimento(procedimento.getMapping()));
        agendamento.setProcedimento(procedimento);

        return  agendamentoRepository.save(agendamento);
    }

    public AgendamentoModel alterarDiaEHorarioDeAgendamentoDaAgenda(Long codigoAgendamento, AgendaRequestDTO agendaRequest){
        AgendamentoModel agendamento = buscarAgendamentoPorCodigo(codigoAgendamento);
        AgendaModel agenda = (agendaRepository.findByData(agendaRequest.getDia()).isPresent())
                           ? agendaRepository.findByData(agendaRequest.getDia()).get() : new AgendaModel();

        if(agendaRepository.buscarHorarioEmDeterminadoDia(agendaRequest.getDia(), agendaRequest.getHorario()).isEmpty()){
            agendamento.getProcedimento().setDia(agendaRequest.getDia());
            agendamento.getProcedimento().setHorario(agendaRequest.getHorario());

            if(agenda.getCodigo() != null) agenda.getAgendamentos().add(agendamento);
            else{
                agenda = new AgendaModel(
                    agendamento.getCodigo(),
                    agendaRequest.getDia(),
                    agendaRequest.getDiaDaSemana(),
                    agendamento
                );
            }

            agendaRepository.save(agenda);
            return  agendamentoRepository.save(agendamento);
        }else throw new RequestException("Desculpe, este horário já está ocupado!");
    }

    public AgendaModel removerAgendamentoDaAgenda(Long codigoAgendamento){
        AgendaModel agenda = buscarAgendaPorCodigoDeAgendamento(codigoAgendamento);
        AgendamentoModel agendamento = buscarAgendamentoPorCodigo(codigoAgendamento);
        agendamento.setStatus("Pendente");
        agenda.getAgendamentos().remove(agendamento);
        return  agendaRepository.save(agenda);
    }

    public List<String> buscarHorariosDisponiveis(String data, String diaDaSemana){
        if(diaDaSemana.toUpperCase().equals("SÁB"))
            throw new RequestException("Você não pode agendar um atendimento para sabádos");

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

    public String excluirAgendas(){
        List<AgendaModel> agendas = agendaRepository.findAll();
        for(AgendaModel agenda: agendas){
            for(AgendamentoModel agendamento: agenda.getAgendamentos()){
                if(agendamento.getStatus().equals("Agendado")){
                    agendamento.setStatus("Pendente");
                    agendamentoRepository.save(agendamento);
                }
            }
        }
        agendaRepository.deleteAll();
        return "Agendas excluídas com sucesso!";
    }

    private Double calulcarValorProcedimento(String mapping){
        if(mapping.equals("A")) return 75.00;
        else return 50.00;
    }

    //Buscas
    private AgendaModel buscarAgendaPorCodigo(Long codigo){
        return agendaRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RequestException("Agenda inexistente"));
    }

    private AgendaModel buscarAgendaPorCodigoDeAgendamento(Long codigo){
        return  agendaRepository.buscarAgendaPorCodigoDeAgendamento(codigo)
                .orElseThrow(() -> new RequestException("Agenda inexistente"));
    }

    private AgendamentoModel buscarAgendamentoPorCodigo(Long codigo){
        return  agendamentoRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RequestException("Usuário inexistente"));
    }
}
