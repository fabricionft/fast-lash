package com.lash.fastLash.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table(name = "clientes")
@Entity
public class AgendamentoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long codigo;

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


    //Dados de endereço
    @Column(length = 250, nullable = false)
    private String endereco;


    //Dados avaliativos
    @Column(length = 3, nullable = false)
    private String estaDeRimel;

    @Column(length = 3, nullable = false)
    private String estaGravida;

    @Column(length = 3, nullable = false)
    private String possuiAlergia;

    @Column(length = 3, nullable = false)
    private String possuiProblemaNaTireoide;

    @Column(length = 3, nullable = false)
    private String possuiProblemaOcular;

    @Column(length = 3, nullable = false)
    private String estaEmTratamentoOncologico;

    @Column(length = 3, nullable = false)
    private String dormeDeLado;


    //Detalhes dados avaliativos
    @Column(length = 200, nullable = false)
    private String detalhesAlergia;

    @Column(length = 200, nullable = false)
    private String detalhesProblemaOcular;

    @Column(length = 200, nullable = false)
    private String detalhesLado;

    @Column(length = 200, nullable = false)
    private String detalhesProcedimentoAdcional;
}
