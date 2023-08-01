package com.lash.fastLash.repository;

import com.lash.fastLash.model.AgendamentoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AgendamentoRepository extends JpaRepository<AgendamentoModel, Long> {

    List<AgendamentoModel> findAllByOrderByCodigoDesc();

    Optional<AgendamentoModel> findByCodigo(Long codigo);
}
