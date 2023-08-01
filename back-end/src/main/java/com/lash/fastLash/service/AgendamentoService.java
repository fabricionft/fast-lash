package com.lash.fastLash.service;

import com.lash.fastLash.exception.RequestException;
import com.lash.fastLash.model.AgendaModel;
import com.lash.fastLash.model.AgendamentoModel;
import com.lash.fastLash.model.ProcedimentoModel;
import com.lash.fastLash.repository.AgendaRepository;
import com.lash.fastLash.repository.AgendamentoRepository;
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


    public List<AgendamentoModel> listarAgendamentos(){
        return  agendamentoRepository.findAll();
    }

    public AgendamentoModel buscarAgendamentoPorCodigo(Long codigo){
        return  agendamentoRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RequestException("Agendamento inexistente!"));
    }

    public List<AgendamentoModel> buscarAgendamentoPorNome(String nome){
        return agendamentoRepository.buscarAgendamentoPorNome(nome);
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

    public AgendamentoModel alterarStatusAgendamento(Long codigo, Integer acao){
        AgendamentoModel agendamento = buscarAgendamentoPorCodigo(codigo);

        if ((acao.equals(1))){
            AgendaModel agenda = agendaRepository.buscarAgendaPorCodigoDeAgendamento(codigo)
                        .orElseThrow(() -> new RequestException("Este agendamento não faz parte de uma agenda"));

            agenda.getAgendamentos().remove(agendamento);
            agendaRepository.save(agenda);
            agendamento.setStatus("Concluido");
        }
        else agendamento.setStatus("Pendente");

        return agendamentoRepository.save(agendamento);
    }

    public String excluirAgendamentos(){
        agendamentoRepository.deleteAll();
        return "Todos agendamentos foram excluídos com sucesso!";
    }
}
