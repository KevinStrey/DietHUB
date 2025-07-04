package com.diet.hub.services;

import org.springframework.stereotype.Service;

import com.diet.hub.entities.Refeicao;
import com.diet.hub.entities.ItemRefeicao;
import com.diet.hub.repositories.RefeicaoRepository;
import com.diet.hub.repositories.AlimentoRepository;
import com.diet.hub.services.HistoricoDiarioService;

import java.util.List;
import java.time.LocalDate;

@Service
public class RefeicaoService {

    private final RefeicaoRepository refeicaoRepository;
    private final AlimentoRepository alimentoRepository;
    private final HistoricoDiarioService historicoDiarioService;

    public RefeicaoService(RefeicaoRepository refeicaoRepository, HistoricoDiarioService historicoDiarioService, AlimentoRepository alimentoRepository) {
        this.refeicaoRepository = refeicaoRepository;
        this.historicoDiarioService = historicoDiarioService;
        this.alimentoRepository = alimentoRepository;
    }

    public Refeicao salvarRefeicao(Refeicao refeicao) {
        if (refeicao.getItens() != null) {
            for (var item : refeicao.getItens()) {
                item.setRefeicao(refeicao);
                if (item.getAlimento() != null && item.getAlimento().getId() != null) {
                    item.setAlimento(alimentoRepository.findById(item.getAlimento().getId()).orElse(null));
                }
            }
        }
        Refeicao saved = refeicaoRepository.save(refeicao);
        atualizarHistoricoDiario(saved.getUsuario().getId(), saved.getData());
        return saved;
    }

    public Refeicao buscarPorId(Long id) {
        return refeicaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Refeição não encontrada!"));
    }

    public List<Refeicao> listarPorUsuario(Long usuarioId) {
        return refeicaoRepository.findByUsuarioId(usuarioId);
    }

    public void deletarRefeicao(Long id) {
        Refeicao refeicao = buscarPorId(id);
        Long usuarioId = refeicao.getUsuario().getId();
        LocalDate data = refeicao.getData();
        refeicaoRepository.deleteById(id);
        atualizarHistoricoDiario(usuarioId, data);
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
                if (novo.getAlimento() != null && novo.getAlimento().getId() != null) {
                    novo.setAlimento(alimentoRepository.findById(novo.getAlimento().getId()).orElse(null));
                }
                itensAtuais.add(novo);
            } else {
                for (ItemRefeicao atual : itensAtuais) {
                    if (atual.getId().equals(novo.getId())) {
                        atual.setQuantidadeEmGramas(novo.getQuantidadeEmGramas());
                        if (novo.getAlimento() != null && novo.getAlimento().getId() != null) {
                            atual.setAlimento(alimentoRepository.findById(novo.getAlimento().getId()).orElse(null));
                        }
                    }
                }
            }
        }
        Refeicao updated = refeicaoRepository.save(existente);
        atualizarHistoricoDiario(updated.getUsuario().getId(), updated.getData());
        return updated;
    }

    private void atualizarHistoricoDiario(Long usuarioId, LocalDate data) {
        List<Refeicao> refeicoesDoDia = refeicaoRepository.findByUsuarioId(usuarioId)
            .stream().filter(r -> r.getData().equals(data)).toList();
        double calorias = 0, proteinas = 0, carboidratos = 0, gorduras = 0;
        for (Refeicao r : refeicoesDoDia) {
            for (ItemRefeicao item : r.getItens()) {
                if (item.getAlimento() != null) {
                    double fator = item.getQuantidadeEmGramas() / 100.0;
                    calorias += item.getAlimento().getCalorias() * fator;
                    proteinas += item.getAlimento().getProteinas() * fator;
                    carboidratos += item.getAlimento().getCarboidratos() * fator;
                    gorduras += item.getAlimento().getGorduras() * fator;
                }
            }
        }
        historicoDiarioService.atualizarOuCriarHistorico(usuarioId, data, calorias, proteinas, carboidratos, gorduras);
    }
}

