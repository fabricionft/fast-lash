package com.lash.fastLash.controller;

import com.lash.fastLash.model.AgendamentoModel;
import com.lash.fastLash.service.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/agendamento")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> listarAgendamentos(){
        return new ResponseEntity<>(agendamentoService.listarAgendamentos(), HttpStatus.OK);
    }

    @GetMapping(path = "/{codigo}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> buscarAgendamentoPorID(@PathVariable Long codigo){
        return new ResponseEntity<>(agendamentoService.buscarAgendamentoPorID(codigo), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> salvarAgendamento(@RequestBody AgendamentoModel agendamento){
        return  new ResponseEntity<>(agendamentoService.salvarAgendamento(agendamento), HttpStatus.CREATED);
    }
}
