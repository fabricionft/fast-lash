package com.lash.fastLash.service;

import com.lash.fastLash.exception.RequestException;
import com.lash.fastLash.model.AgendamentoModel;
import com.lash.fastLash.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    public List<AgendamentoModel> listarAgendamentos(){
        return  agendamentoRepository.findAll();
    }

    public AgendamentoModel buscarAgendamentoPorID(Long codigo){
        return verificarSeAgendamentoExiste(codigo);
    }

    public List<AgendamentoModel> buscarAgendamentoPorNome(String nome){
        return  agendamentoRepository.buscarAgendamentoPorNome(nome);
    }

    public AgendamentoModel salvarAgendamento(AgendamentoModel agendamento){
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Calendar calendar = Calendar.getInstance();

        agendamento.setData(formatter.format(calendar.getTime()));
        agendamento.setStatus("Pendente");

        return agendamentoRepository.save(agendamento);
    }

    public AgendamentoModel alterarStatusAgendamento(Long codigo, Integer acao){
        AgendamentoModel agendamento = verificarSeAgendamentoExiste(codigo);

        if ((acao.equals(1)))agendamento.setStatus("Concluido");
        else agendamento.setStatus("Pendente");

        return agendamentoRepository.save(agendamento);
    }

    public String excluirAgendamentos(){
        agendamentoRepository.deleteAll();
        return "Todos agendamentos foram excluídos com sucesso!";
    }

    private AgendamentoModel verificarSeAgendamentoExiste(Long codigo){
        Optional<AgendamentoModel> agendamento = agendamentoRepository.buscarAgendamentoPorID(codigo);
        if(agendamento.isEmpty()) throw new RequestException("Agendamento inexistente!");
        else return  agendamento.get();
    }
}
