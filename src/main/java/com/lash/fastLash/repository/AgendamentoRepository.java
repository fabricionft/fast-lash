package com.lash.fastLash.repository;

import com.lash.fastLash.model.AgendamentoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AgendamentoRepository extends JpaRepository<AgendamentoModel, Long> {

    @Query(value = "select * from agendamentos where codigo = ?", nativeQuery = true)
    Optional<AgendamentoModel> buscarAgendamentoPorID(Long codigo);

    @Query(value = "select * from agendamentos where nome like %?%", nativeQuery = true)
    List<AgendamentoModel> buscarAgendamentoPorNome(String nome);
}
