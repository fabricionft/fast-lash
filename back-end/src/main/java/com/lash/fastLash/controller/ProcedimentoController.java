package com.lash.fastLash.controller;

import com.lash.fastLash.repository.ProcedimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/proc")
public class ProcedimentoController {

    @Autowired
    private ProcedimentoRepository procedimentoRepository;

    @DeleteMapping
    public ResponseEntity<?> deletar(){
        procedimentoRepository.deleteAll();;
        return  new ResponseEntity<>("Deletados", HttpStatus.OK);
    }
}
