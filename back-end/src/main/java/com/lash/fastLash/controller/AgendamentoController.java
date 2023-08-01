package com.lash.fastLash.controller;

import com.lash.fastLash.dto.Request.AgendamentoRequestDTO;
import com.lash.fastLash.model.AgendamentoModel;
import com.lash.fastLash.service.AgendamentoService;
import org.modelmapper.ModelMapper;
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

    @Autowired
    private ModelMapper modelMapper;


    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> listarAgendamentos() {
        return new ResponseEntity<>(agendamentoService.listarAgendamentos(), HttpStatus.OK);
    }

    @GetMapping(path = "/{codigo}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> buscarAgendamentoPorCodigo(@PathVariable Long codigo) {
        return new ResponseEntity<>(agendamentoService.buscarAgendamentoPorCodigo(codigo), HttpStatus.OK);
    }

    @GetMapping(path = "/procedimento/{codigo}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> buscarProcedimentoPorCodigo(@PathVariable Long codigo) {
        return new ResponseEntity<>(agendamentoService.buscarProcedimentoPorCodigo(codigo), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> salvarAgendamento(@RequestBody AgendamentoRequestDTO agendamentoRequest) {
        AgendamentoModel agendamento = modelMapper.map(agendamentoRequest, AgendamentoModel.class);
        return new ResponseEntity<>(agendamentoService.salvarAgendamento(agendamento), HttpStatus.CREATED);
    }

    @PutMapping(path = "/alterarStatus/{codigo}/{acao}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> alterarStatusAgendamento(@PathVariable Long codigo,
                                                      @PathVariable String acao){
        return  new ResponseEntity<>(agendamentoService.alterarStatusAgendamento(codigo, acao), HttpStatus.OK);
    }

    @DeleteMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> excluirAgendamentos(){
        return new ResponseEntity<>(agendamentoService.excluirAgendamentos(), HttpStatus.OK);
    }
}

