package com.diet.hub.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diet.hub.entities.HistoricoDiario;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface HistoricoDiarioRepository extends JpaRepository<HistoricoDiario, Long> {
    Optional<HistoricoDiario> findByUsuarioIdAndData(Long usuarioId, LocalDate data);
}
