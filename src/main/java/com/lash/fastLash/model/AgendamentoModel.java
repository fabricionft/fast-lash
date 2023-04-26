package com.lash.fastLash.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Table(name = "agendamentos")
@Entity
public class AgendamentoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long codigo;

    @Column(nullable = false)
    private String data;

    @Column(length = 20, nullable = false)
    private String status;

    //Dados pessoais
    @Column(length = 100, nullable = false)
    private String nome;

    @Column(length = 10, nullable = false)
    private String dataNascimento;

    @Column(length = 50, nullable = false)
    private String profissao;

    @Column(length = 11, nullable = false)
    private String celular;

    @Column(length = 100, nullable = false)
    private String email;

    @Column(length = 11, nullable = false)
    private String cpf;

    @Column(length = 11, nullable = false)
    private String rg;

    @Column(length = 250, nullable = false)
    private String endereco;

    //Dados avaliativos
    private String[] respostas;

    @Column(length = 200, nullable = false)
    private String detalhesAlergia;

    @Column(length = 200, nullable = false)
    private String detalhesProblemaOcular;

    @Column(length = 200, nullable = false)
    private String detalhesLado;

    @Column(length = 200, nullable = false)
    private String detalhesProcedimentoAdcional;
}
