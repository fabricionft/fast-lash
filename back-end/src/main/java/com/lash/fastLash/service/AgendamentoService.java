package com.lash.fastLash.service;

import com.lash.fastLash.exception.RequestException;
import com.lash.fastLash.model.AgendaModel;
import com.lash.fastLash.model.AgendamentoModel;
import com.lash.fastLash.model.ProcedimentoModel;
import com.lash.fastLash.repository.AgendaRepository;
import com.lash.fastLash.repository.AgendamentoRepository;
import com.lash.fastLash.repository.ProcediemntoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

@Service
public class AgendamentoService {

    @Autowired
    private AgendaRepository agendaRepository;

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private ProcediemntoRepository procediemntoRepository;


    public List<AgendamentoModel> listarAgendamentos(){
        return  agendamentoRepository.findAllByOrderByCodigoDesc();
    }

    public AgendamentoModel buscarAgendamentoPorCodigo(Long codigo){
        return  agendamentoRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RequestException("Agendamento inexistente!"));
    }

    public ProcedimentoModel buscarProcedimentoPorCodigo(Long codigo){
        AgendamentoModel agendamento = buscarAgendamentoPorCodigo(codigo);
        return  agendamento.getProcedimento();
    }

    public AgendamentoModel salvarAgendamento(AgendamentoModel agendamento){
        SimpleDateFormat formatar = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

        agendamento.setData(formatar.format(Calendar.getInstance().getTime()));
        agendamento.setStatus("Pendente");

        return agendamentoRepository.save(agendamento);
    }

    public AgendamentoModel alterarStatusAgendamento(Long codigo, String acao){
        AgendamentoModel agendamento = buscarAgendamentoPorCodigo(codigo);

        if(acao.equals("concluir")){
            AgendaModel agenda = buscarAgendaPorCodigoDeAgendamento(agendamento.getCodigo());
            agenda.getAgendamentos().remove(agendamento);
            excluirAgendasVazias();

            agendamento.setStatus("Concluido");
            agendamento.getProcedimento().setFinalizado(true);
        }
        else if(acao.equals("pendenciar")) excluirProcedimentoDeUmAgendamento(agendamento);
        else throw new RequestException("Ação inválida!");

        return agendamentoRepository.save(agendamento);
    }

    public String excluirAgendamentos(){
        agendamentoRepository.deleteAll();
        excluirAgendasVazias();
        return "Todos agendamentos foram excluídos com sucesso!";
    }


    //Métodos privados
    private void excluirAgendasVazias(){
        for(AgendaModel agenda: agendaRepository.findAll()){
            if(agenda.getAgendamentos().size() == 0) agendaRepository.delete(agenda);
            else agendaRepository.save(agenda);
        }
    }

    private void excluirProcedimentoDeUmAgendamento(AgendamentoModel agendamento){
        agendamento.setStatus("Pendente");
        ProcedimentoModel procedimento = agendamento.getProcedimento();
        agendamento.setProcedimento(null);
        procediemntoRepository.delete(procedimento);
    }

    private AgendaModel buscarAgendaPorCodigoDeAgendamento(Long codigo){
        return  agendaRepository.buscarAgendaPorCodigoDeAgendamento(codigo)
                .orElseThrow(() -> new RequestException("Este agendamento não faz parte de uma agenda"));
    }
}
