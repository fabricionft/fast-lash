package com.lash.fastLash.repository;

import com.lash.fastLash.model.ProcedimentoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProcedimentoRepository extends JpaRepository<ProcedimentoModel, Long> {
}
