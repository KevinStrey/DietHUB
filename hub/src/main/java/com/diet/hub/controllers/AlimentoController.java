package com.diet.hub.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.diet.hub.entities.Alimento;
import com.diet.hub.services.AlimentoService;

import java.util.List;

@RestController
@RequestMapping("/api/alimentos")
@CrossOrigin(origins = "*")
public class AlimentoController {

    private final AlimentoService alimentoService;

    public AlimentoController(AlimentoService alimentoService) {
        this.alimentoService = alimentoService;
    }

    @PostMapping
    public ResponseEntity<Alimento> adicionarAlimento(@RequestBody Alimento alimento) {
        return ResponseEntity.ok(alimentoService.salvarAlimento(alimento));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Alimento> buscarAlimento(@PathVariable Long id) {
        return ResponseEntity.ok(alimentoService.buscarPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<Alimento>> listarAlimentos() {
        return ResponseEntity.ok(alimentoService.listarTodos());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Alimento> atualizarAlimento(@PathVariable Long id, @RequestBody Alimento alimento) {
        alimento.setId(id);
        return ResponseEntity.ok(alimentoService.salvarAlimento(alimento));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarAlimento(@PathVariable Long id) {
        alimentoService.deletarAlimento(id);
        return ResponseEntity.noContent().build();
    }
}

