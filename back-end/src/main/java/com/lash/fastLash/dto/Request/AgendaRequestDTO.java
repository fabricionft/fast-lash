package com.lash.fastLash.dto.Request;

import lombok.Getter;
import lombok.Setter;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class AgendaRequestDTO {

    //Agenda
    private Long codigo;
    private Long codigoAgendamento;
    private String data;
    private String diaDaSemana;

    //Agendamento
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
