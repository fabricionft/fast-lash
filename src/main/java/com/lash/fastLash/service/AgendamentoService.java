package com.lash.fastLash.service;

import com.lash.fastLash.exception.RequestException;
import com.lash.fastLash.model.AgendamentoModel;
import com.lash.fastLash.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public AgendamentoModel salvarAgendamento(AgendamentoModel cliente){
        return agendamentoRepository.save(cliente);
    }

    private AgendamentoModel verificarSeAgendamentoExiste(Long codigo){
        Optional<AgendamentoModel> agendamento = agendamentoRepository.buscarUSuarioPorID(codigo);
        if(agendamento.isEmpty()) throw new RequestException("Agendamento inexistente!");
        else return  agendamento.get();
    }
}
