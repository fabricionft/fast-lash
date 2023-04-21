package com.lash.fastLash.repository;

import com.lash.fastLash.model.AdminModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<AdminModel, Long> {

    @Query(value = "select * from admins where codigo = ?", nativeQuery = true)
    Optional<AdminModel> buscarAdminPorID(Long codigo);

    @Query(value = "select * from admins where usuario = ?", nativeQuery = true)
    Optional<AdminModel> buscarAdminPorUsuario(String usuario);
}
