package com.lash.fastLash.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Table(name = "procedimentos")
@Getter
@Setter
@Entity(name = "Procedimento")
public class ProcedimentoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    private String mapping;
    private String estilo;
    private String modeloDosFios;
    private Double espessura;
    private Double curvatura;
    private String adesivoCola;
    private String dia;
    private String horario;
    private Double valor;
    private List<Integer> fiosOlhoEsquerdo;
    private List<Integer> fiosOlhoDireito;
}
