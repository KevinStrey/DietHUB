package com.diet.hub.services;

import org.springframework.stereotype.Service;

import com.diet.hub.entities.HistoricoDiario;
import com.diet.hub.repositories.HistoricoDiarioRepository;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class HistoricoDiarioService {

    private final HistoricoDiarioRepository historicoDiarioRepository;

    public HistoricoDiarioService(HistoricoDiarioRepository historicoDiarioRepository) {
        this.historicoDiarioRepository = historicoDiarioRepository;
    }

    public Optional<HistoricoDiario> buscarPorUsuarioEData(Long usuarioId, LocalDate data) {
        return historicoDiarioRepository.findByUsuarioIdAndData(usuarioId, data);
    }

    public void atualizarOuCriarHistorico(Long usuarioId, LocalDate data, double calorias, double proteinas, double carboidratos, double gorduras) {
        Optional<HistoricoDiario> opt = historicoDiarioRepository.findByUsuarioIdAndData(usuarioId, data);
        HistoricoDiario historico = opt.orElseGet(HistoricoDiario::new);
        historico.setUsuario(new com.diet.hub.entities.Usuario());
        historico.getUsuario().setId(usuarioId);
        historico.setData(data);
        historico.setTotalCalorias(calorias);
        historico.setTotalProteinas(proteinas);
        historico.setTotalCarboidratos(carboidratos);
        historico.setTotalGorduras(gorduras);
        historicoDiarioRepository.save(historico);
    }
}
