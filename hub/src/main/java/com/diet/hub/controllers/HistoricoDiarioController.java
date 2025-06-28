package com.diet.hub.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.diet.hub.entities.HistoricoDiario;
import com.diet.hub.services.HistoricoDiarioService;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("/api/historico")
public class HistoricoDiarioController {

    private final HistoricoDiarioService historicoDiarioService;

    public HistoricoDiarioController(HistoricoDiarioService historicoDiarioService) {
        this.historicoDiarioService = historicoDiarioService;
    }

    @GetMapping("/usuario/{usuarioId}/data/{data}")
    public ResponseEntity<Optional<HistoricoDiario>> buscarHistoricoPorData(
            @PathVariable Long usuarioId, @PathVariable String data) {
        LocalDate dataFormatada = LocalDate.parse(data);
        return ResponseEntity.ok(historicoDiarioService.buscarPorUsuarioEData(usuarioId, dataFormatada));
    }
}
