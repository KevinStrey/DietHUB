package com.diet.hub.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diet.hub.entities.ItemPlanoAlimentar;
import com.diet.hub.services.ItemPlanoAlimentarService;

@RestController
@RequestMapping("/api/item-plano")
public class ItemPlanoAlimentarController {

    @Autowired
    private ItemPlanoAlimentarService itemService;

    @GetMapping
    public List<ItemPlanoAlimentar> listarTodos() {
        return itemService.listarTodos();
    }

    @GetMapping("/plano/{planoId}")
    public List<ItemPlanoAlimentar> listarPorPlano(@PathVariable Long planoId) {
        return itemService.listarPorPlanoId(planoId);
    }

    @PostMapping
    public ItemPlanoAlimentar criar(@RequestBody ItemPlanoAlimentar item) {
        return itemService.salvar(item);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        itemService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

