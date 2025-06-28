package com.diet.hub.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.diet.hub.entities.ItemPlanoAlimentar;
import com.diet.hub.repositories.ItemPlanoAlimentarRepository;

@Service
public class ItemPlanoAlimentarService {

    @Autowired
    private ItemPlanoAlimentarRepository itemPlanoAlimentarRepository;

    public List<ItemPlanoAlimentar> listarTodos() {
        return itemPlanoAlimentarRepository.findAll();
    }

    public List<ItemPlanoAlimentar> listarPorPlanoId(Long planoId) {
        return itemPlanoAlimentarRepository.findByPlanoAlimentarId(planoId);
    }

    public ItemPlanoAlimentar salvar(ItemPlanoAlimentar item) {
        return itemPlanoAlimentarRepository.save(item);
    }

    public void deletar(Long id) {
        itemPlanoAlimentarRepository.deleteById(id);
    }
}
