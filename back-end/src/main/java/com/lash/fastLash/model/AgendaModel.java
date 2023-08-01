package com.lash.fastLash.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Table(name = "agendas")
@Getter
@Setter
@NoArgsConstructor
@Entity(name = "Agenda")
public class AgendaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    @Column(length = 12, nullable = false)
    private String data;

    @Column(length = 6, nullable = false)
    private String diaDaSemana;

    @OneToMany
    @JoinColumn(name = "agenda_id")
    private List<AgendamentoModel> agendamentos = new ArrayList<>();

    public AgendaModel(Long codigo, String data, String diaDaSemana, AgendamentoModel agendamento) {
        this.codigo = codigo;
        this.data = data;
        this.diaDaSemana = diaDaSemana;
        this.agendamentos.add(agendamento);
    }
}
