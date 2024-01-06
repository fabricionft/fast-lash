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
    private Long codigoAgendamento;

    @Column(length = 50, nullable = false)
    private String mapping;

    @Column(length = 50, nullable = false)
    private String estilo;

    @Column(length = 50, nullable = false)
    private String modeloDosFios;

    @Column(length = 5, nullable = false)
    private Double espessura;

    @Column(length = 5, nullable = false)
    private Double curvatura;

    @Column(length = 4, nullable = false)
    private String diaDaSemana;

    @Column(length = 12, nullable = false)
    private String data;

    @Column(length = 6, nullable = false)
    private String horario;

    @Column(length = 10, nullable = false)
    private Double valor;

    private List<Integer> fiosOlhoEsquerdo;

    private List<Integer> fiosOlhoDireito;

    @Column(length = 5, nullable = false)
    private Boolean finalizado;
}
