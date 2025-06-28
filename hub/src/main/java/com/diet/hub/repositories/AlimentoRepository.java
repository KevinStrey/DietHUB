package com.diet.hub.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diet.hub.entities.Alimento;

@Repository
public interface AlimentoRepository extends JpaRepository<Alimento, Long> {
}
