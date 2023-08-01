package com.lash.fastLash.repository;

import com.lash.fastLash.model.ProcedimentoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProcediemntoRepository extends JpaRepository<ProcedimentoModel, Long> {

    Optional<ProcedimentoModel> findByCodigoAgendamento(Long codigoAgendamento);
}
