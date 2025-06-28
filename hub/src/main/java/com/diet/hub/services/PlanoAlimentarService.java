package com.diet.hub.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.diet.hub.entities.PlanoAlimentar;
import com.diet.hub.repositories.PlanoAlimentarRepository;

@Service
public class PlanoAlimentarService {

    @Autowired
    private PlanoAlimentarRepository planoAlimentarRepository;

    public List<PlanoAlimentar> listarTodos() {
        return planoAlimentarRepository.findAll();
    }

    public PlanoAlimentar buscarPorId(Long id) {
        return planoAlimentarRepository.findById(id).orElse(null);
    }

    public PlanoAlimentar salvar(PlanoAlimentar plano) {
        return planoAlimentarRepository.save(plano);
    }

    public void deletar(Long id) {
        planoAlimentarRepository.deleteById(id);
    }
}

