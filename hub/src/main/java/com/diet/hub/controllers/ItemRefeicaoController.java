package com.diet.hub.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.diet.hub.entities.ItemRefeicao;
import com.diet.hub.services.ItemRefeicaoService;

import java.util.List;

@RestController
@RequestMapping("/api/itens-refeicao")
public class ItemRefeicaoController {

    private final ItemRefeicaoService itemRefeicaoService;

    public ItemRefeicaoController(ItemRefeicaoService itemRefeicaoService) {
        this.itemRefeicaoService = itemRefeicaoService;
    }

    @PostMapping
    public ResponseEntity<ItemRefeicao> adicionarItem(@RequestBody ItemRefeicao itemRefeicao) {
        return ResponseEntity.ok(itemRefeicaoService.salvarItem(itemRefeicao));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemRefeicao> buscarItemPorId(@PathVariable Long id) {
        return ResponseEntity.ok(itemRefeicaoService.buscarPorId(id));
    }

    @GetMapping("/refeicao/{refeicaoId}")
    public ResponseEntity<List<ItemRefeicao>> listarItensPorRefeicao(@PathVariable Long refeicaoId) {
        return ResponseEntity.ok(itemRefeicaoService.listarPorRefeicao(refeicaoId));
    }
}

