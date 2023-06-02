package com.lash.fastLash.repository;

import com.lash.fastLash.model.AgendamentoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AgendamentoRepository extends JpaRepository<AgendamentoModel, Long> {

    Optional<AgendamentoModel> findByCodigo(Long codigo);

    @Query(value = "select a from Agendamento a where a.nome like %:nome%")
    List<AgendamentoModel> buscarAgendamentoPorNome(String nome);
}
