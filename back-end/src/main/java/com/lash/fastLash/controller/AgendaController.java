package com.lash.fastLash.controller;

import com.lash.fastLash.dto.Request.AgendaRequestDTO;
import com.lash.fastLash.service.AgendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/agenda")
public class AgendaController {

    @Autowired
    private AgendaService agendaService;


    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> listarAgendas(){
        return  new ResponseEntity<>(agendaService.listarAgendas(), HttpStatus.OK);
    }

    @GetMapping(path = "/{data}/{diaDaSemana}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> buscarHorariosDisponiveis(@PathVariable String data,
                                                       @PathVariable String diaDaSemana){
        return  new ResponseEntity<>(agendaService.buscarHorariosDisponiveis(data, diaDaSemana), HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> adcionarAgendamentoNaAgenda(@RequestBody AgendaRequestDTO agendaRequest){
        return  new ResponseEntity<>(agendaService.adcionarAgendamentoNaAgenda(agendaRequest), HttpStatus.CREATED);
    }

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> alterarAgendamentoDaAgenda(@RequestBody AgendaRequestDTO agendaRequest){
        return  new ResponseEntity<>(agendaService.alterarAgendamentoDaAgenda(agendaRequest), HttpStatus.CREATED);
    }

    @PutMapping(path = "/alterarDiaEHorario/{codigoAgendamento}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> alterarDiaEHorarioDeAgendamentoDaAgenda(@PathVariable Long codigoAgendamento,
                                                                     @RequestBody AgendaRequestDTO agendaRequest){
        return  new ResponseEntity<>(agendaService.alterarDiaEHorarioDeAgendamentoDaAgenda(codigoAgendamento, agendaRequest), HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/removerAgendamento/{codigo}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> removerAgendamentoDaAgenda(@PathVariable Long codigo){
        return new ResponseEntity<>(agendaService.removerAgendamentoDaAgenda(codigo), HttpStatus.OK);
    }

    @DeleteMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> excluirAgendas(){
        return  new ResponseEntity<>(agendaService.excluirAgendas(), HttpStatus.OK);
    }
}
