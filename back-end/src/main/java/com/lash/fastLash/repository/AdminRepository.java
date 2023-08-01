package com.lash.fastLash.repository;

import com.lash.fastLash.model.AdminModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<AdminModel, Long> {

    Optional<AdminModel> findByCodigo(Long codigo);

    Optional<AdminModel> findByUsuario(String usuario);
}
