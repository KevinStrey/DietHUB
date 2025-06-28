package com.diet.hub.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diet.hub.entities.ItemRefeicao;

import java.util.List;

@Repository
public interface ItemRefeicaoRepository extends JpaRepository<ItemRefeicao, Long> {
    
    // Busca todos os itens de uma refeição específica
    List<ItemRefeicao> findByRefeicaoId(Long refeicaoId);
}


