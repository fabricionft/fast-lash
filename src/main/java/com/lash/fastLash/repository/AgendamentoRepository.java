package com.lash.fastLash.repository;

import com.lash.fastLash.model.AgendamentoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AgendamentoRepository extends JpaRepository<AgendamentoModel, Long> {

    @Query(value = "select * from agendamentos where codigo = ?", nativeQuery = true)
    Optional<AgendamentoModel> buscarUSuarioPorID(Long codigo);
}
