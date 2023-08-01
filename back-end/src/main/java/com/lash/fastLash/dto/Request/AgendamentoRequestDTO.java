package com.lash.fastLash.dto.Request;

import com.lash.fastLash.model.ProcedimentoModel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AgendamentoRequestDTO {

    private String nome;
    private String dataNascimento;
    private String profissao;
    private String celular;
    private String email;
    private String cpf;
    private String rg;
    private String endereco;
    private String[] respostas;
    private String detalhesAlergia;
    private String detalhesProblemaOcular;
    private String detalhesLado;
    private String detalhesProcedimentoAdcional;
}
