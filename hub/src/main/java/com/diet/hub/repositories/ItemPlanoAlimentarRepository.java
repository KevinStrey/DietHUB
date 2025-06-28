package com.diet.hub.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diet.hub.entities.ItemPlanoAlimentar;

@Repository
public interface ItemPlanoAlimentarRepository extends JpaRepository<ItemPlanoAlimentar, Long> {
	
	List<ItemPlanoAlimentar> findByPlanoAlimentarId(Long planoId);

}


