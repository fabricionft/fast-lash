package com.lash.fastLash.controller;

import com.lash.fastLash.model.AgendamentoModel;
import com.lash.fastLash.service.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/agendamento")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @GetMapping
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> listarAgendamentos() {
        return new ResponseEntity<>(agendamentoService.listarAgendamentos(), HttpStatus.OK);
    }

    @GetMapping(path = "/{codigo}")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> buscarAgendamentoPorCodigo(@PathVariable Long codigo) {
        return new ResponseEntity<>(agendamentoService.buscarAgendamentoPorCodigo(codigo), HttpStatus.OK);
    }

    @GetMapping(path = "/procedimento/{codigo}")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> buscarProcedimentoPorCodigo(@PathVariable Long codigo) {
        return new ResponseEntity<>(agendamentoService.buscarProcedimentoPorCodigo(codigo), HttpStatus.OK);
    }

    @GetMapping(path = "/nome/{nome}")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> buscarAgendamentoPorNome(@PathVariable String nome) {
        return new ResponseEntity<>(agendamentoService.buscarAgendamentoPorNome(nome), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> salvarAgendamento(@RequestBody AgendamentoModel agendamento) {
        return new ResponseEntity<>(agendamentoService.salvarAgendamento(agendamento), HttpStatus.CREATED);
    }

    @PutMapping(path = "/alterarStatus/{codigo}/{acao}")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> alterarStatusAgendamento(@PathVariable Long codigo,
                                                      @PathVariable Integer acao){
        return  new ResponseEntity<>(agendamentoService.alterarStatusAgendamento(codigo, acao), HttpStatus.OK);
    }

    @DeleteMapping
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> excluirAgendamentos(){
        return new ResponseEntity<>(agendamentoService.excluirAgendamentos(), HttpStatus.OK);
    }
}

