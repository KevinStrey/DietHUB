package com.diet.hub.services;

import org.springframework.stereotype.Service;

import com.diet.hub.entities.Refeicao;
import com.diet.hub.entities.ItemRefeicao;
import com.diet.hub.repositories.RefeicaoRepository;

import java.util.List;

@Service
public class RefeicaoService {

    private final RefeicaoRepository refeicaoRepository;

    public RefeicaoService(RefeicaoRepository refeicaoRepository) {
        this.refeicaoRepository = refeicaoRepository;
    }

    public Refeicao salvarRefeicao(Refeicao refeicao) {
        if (refeicao.getItens() != null) {
            for (var item : refeicao.getItens()) {
                item.setRefeicao(refeicao);
            }
        }
        return refeicaoRepository.save(refeicao);
    }

    public Refeicao buscarPorId(Long id) {
        return refeicaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Refeição não encontrada!"));
    }

    public List<Refeicao> listarPorUsuario(Long usuarioId) {
        return refeicaoRepository.findByUsuarioId(usuarioId);
    }

    public void deletarRefeicao(Long id) {
        refeicaoRepository.deleteById(id);
    }

    public Refeicao atualizarRefeicao(Long id, Refeicao refeicao) {
        Refeicao existente = buscarPorId(id);
        existente.setNome(refeicao.getNome());
        existente.setData(refeicao.getData());

        List<ItemRefeicao> itensAtuais = existente.getItens();
        List<ItemRefeicao> novosItens = refeicao.getItens();

        // Remove itens que não estão mais na nova lista
        itensAtuais.removeIf(itemAtual ->
            novosItens.stream().noneMatch(novo ->
                itemAtual.getId() != null && itemAtual.getId().equals(novo.getId())
            )
        );

        // Atualiza ou adiciona itens
        for (ItemRefeicao novo : novosItens) {
            if (novo.getId() == null) {
                // Novo item
                novo.setRefeicao(existente);
                itensAtuais.add(novo);
            } else {
                for (ItemRefeicao atual : itensAtuais) {
                    if (atual.getId().equals(novo.getId())) {
                        atual.setQuantidadeEmGramas(novo.getQuantidadeEmGramas());
                        atual.setAlimento(novo.getAlimento());
                    }
                }
            }
        }
        return refeicaoRepository.save(existente);
    }
}

