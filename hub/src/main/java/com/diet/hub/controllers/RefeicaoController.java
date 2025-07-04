package com.diet.hub.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.diet.hub.entities.Refeicao;
import com.diet.hub.services.RefeicaoService;

import java.util.List;

@RestController
@RequestMapping("/api/refeicoes")
public class RefeicaoController {

    private final RefeicaoService refeicaoService;

    public RefeicaoController(RefeicaoService refeicaoService) {
        this.refeicaoService = refeicaoService;
    }

    @PostMapping
    public ResponseEntity<Refeicao> registrarRefeicao(@RequestBody Refeicao refeicao) {
        return ResponseEntity.ok(refeicaoService.salvarRefeicao(refeicao));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Refeicao> buscarRefeicao(@PathVariable Long id) {
        return ResponseEntity.ok(refeicaoService.buscarPorId(id));
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Refeicao>> listarRefeicoesPorUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(refeicaoService.listarPorUsuario(usuarioId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarRefeicao(@PathVariable Long id) {
        refeicaoService.deletarRefeicao(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Refeicao> atualizarRefeicao(@PathVariable Long id, @RequestBody Refeicao refeicao) {
        Refeicao atualizada = refeicaoService.atualizarRefeicao(id, refeicao);
        return ResponseEntity.ok(atualizada);
    }
}

