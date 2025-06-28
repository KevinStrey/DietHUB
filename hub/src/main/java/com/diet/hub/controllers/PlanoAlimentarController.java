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

import com.diet.hub.entities.PlanoAlimentar;
import com.diet.hub.services.PlanoAlimentarService;

@RestController
@RequestMapping("/api/planos")
public class PlanoAlimentarController {

    @Autowired
    private PlanoAlimentarService planoService;

    @GetMapping
    public List<PlanoAlimentar> listarTodos() {
        return planoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlanoAlimentar> buscarPorId(@PathVariable Long id) {
        PlanoAlimentar plano = planoService.buscarPorId(id);
        return plano != null ? ResponseEntity.ok(plano) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public PlanoAlimentar criar(@RequestBody PlanoAlimentar plano) {
        return planoService.salvar(plano);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        planoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

