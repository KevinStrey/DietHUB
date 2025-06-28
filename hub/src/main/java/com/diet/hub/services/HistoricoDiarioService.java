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
}
