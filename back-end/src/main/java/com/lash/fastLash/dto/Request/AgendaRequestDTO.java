package com.lash.fastLash.dto.Request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AgendaRequestDTO {

    private Long codigoAgendamento;
    private String data;
    private String diaDaSemana;
    private String mapping;
    private String estilo;
    private String modeloDosFios;
    private Double espessura;
    private Double curvatura;
    private String adesivoCola;
    private String horario;
    private List<Integer> fiosOlhoEsquerdo;
    private List<Integer> fiosOlhoDireito;
}
