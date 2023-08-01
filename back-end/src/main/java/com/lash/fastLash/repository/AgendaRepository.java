package com.lash.fastLash.repository;

import com.lash.fastLash.model.AgendaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AgendaRepository extends JpaRepository<AgendaModel, Long> {

    List<AgendaModel> findAllByOrderByDataAsc();

    Optional<AgendaModel> findByData(String data);

    @Query(value = "select a from Agenda a inner join a.agendamentos ag inner join ag.procedimento p where a.data = :data and p.horario = :horario")
    Optional<AgendaModel> buscarHorarioEmDeterminadoDia(String data, String horario);

    @Query(value = "select a from Agenda a inner join a.agendamentos ag where ag.codigo = :codigo")
    Optional<AgendaModel> buscarAgendaPorCodigoDeAgendamento(Long codigo);
}
