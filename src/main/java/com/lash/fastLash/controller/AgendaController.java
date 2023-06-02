package com.lash.fastLash.controller;

import com.lash.fastLash.dto.Request.AgendaRequestDTO;
import com.lash.fastLash.service.AgendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/agenda")
public class AgendaController {

    @Autowired
    private AgendaService agendaService;


    @GetMapping ResponseEntity<?> buscarAgendas(){
        return  new ResponseEntity<>(agendaService.listarAgendas(), HttpStatus.OK);
    }

    @GetMapping(path = "/{data}/{diaDaSemana}")
    public ResponseEntity<?> buscarHorariosDisponiveis(@PathVariable String data,
                                                       @PathVariable String diaDaSemana){
        return  new ResponseEntity<>(agendaService.buscarHorariosDisponiveis(data, diaDaSemana), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> adcionarAgendamentoNaAgenda(@RequestBody AgendaRequestDTO agendaRequest){
        return  new ResponseEntity<>(agendaService.adcionarAgendamentoNaAgenda(agendaRequest), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<?> alterarAgendamentoDaAgenda(@RequestBody AgendaRequestDTO agendaRequest){
        return  new ResponseEntity<>(agendaService.alterarAgendamentoDaAgenda(agendaRequest), HttpStatus.CREATED);
    }

    @PutMapping(path = "/alterarDiaEHorario/{codigoAgendamento}/{dia}/{horario}")
    public ResponseEntity<?> alterarDiaEHorarioDeAgendamentoDaAgenda(@PathVariable Long codigoAgendamento,
                                                                     @PathVariable String dia,
                                                                     @PathVariable String horario){
        return  new ResponseEntity<>(agendaService.alterarDiaEHorarioDeAgendamentoDaAgenda(codigoAgendamento, dia, horario), HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/removerAgendamento/{codigo}")
    public ResponseEntity<?> removerAgendamentoDaAgenda(@PathVariable Long codigo){
        return new ResponseEntity<>(agendaService.removerAgendamentoDaAgenda(codigo), HttpStatus.OK);
    }

    @DeleteMapping ResponseEntity<?> excluirAgendas(){
        return  new ResponseEntity<>(agendaService.excluirAgendas(), HttpStatus.OK);
    }
}
