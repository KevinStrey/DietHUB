package com.diet.hub.services;

import org.springframework.stereotype.Service;

import com.diet.hub.entities.Refeicao;
import com.diet.hub.repositories.RefeicaoRepository;

import java.util.List;

@Service
public class RefeicaoService {

    private final RefeicaoRepository refeicaoRepository;

    public RefeicaoService(RefeicaoRepository refeicaoRepository) {
        this.refeicaoRepository = refeicaoRepository;
    }

    public Refeicao salvarRefeicao(Refeicao refeicao) {
        return refeicaoRepository.save(refeicao);
    }

    public Refeicao buscarPorId(Long id) {
        return refeicaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Refeição não encontrada!"));
    }

    public List<Refeicao> listarPorUsuario(Long usuarioId) {
        return refeicaoRepository.findByUsuarioId(usuarioId);
    }
}

