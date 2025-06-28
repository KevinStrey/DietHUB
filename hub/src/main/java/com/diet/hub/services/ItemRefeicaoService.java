package com.diet.hub.services;

import org.springframework.stereotype.Service;

import com.diet.hub.entities.ItemRefeicao;
import com.diet.hub.repositories.ItemRefeicaoRepository;

import java.util.List;

@Service
public class ItemRefeicaoService {

    private final ItemRefeicaoRepository itemRefeicaoRepository;

    public ItemRefeicaoService(ItemRefeicaoRepository itemRefeicaoRepository) {
        this.itemRefeicaoRepository = itemRefeicaoRepository;
    }

    public ItemRefeicao salvarItem(ItemRefeicao item) {
        return itemRefeicaoRepository.save(item);
    }

    public ItemRefeicao buscarPorId(Long id) {
        return itemRefeicaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item de refeição não encontrado!"));
    }

    public List<ItemRefeicao> listarPorRefeicao(Long refeicaoId) {
        return itemRefeicaoRepository.findByRefeicaoId(refeicaoId);
    }
}

