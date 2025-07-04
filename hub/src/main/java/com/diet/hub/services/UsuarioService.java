package com.diet.hub.services;

import org.springframework.stereotype.Service;

import com.diet.hub.entities.Usuario;
import com.diet.hub.repositories.UsuarioRepository;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario salvarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario atualizarUsuario(Long id, Usuario usuario) {
        Usuario existente = buscarPorId(id);
        existente.setNome(usuario.getNome());
        existente.setEmail(usuario.getEmail());
        existente.setObjetivo(usuario.getObjetivo());
        existente.setCaloriasDiarias(usuario.getCaloriasDiarias());
        // Adicione outros campos que podem ser atualizados, se necessário
        return usuarioRepository.save(existente);
    }
}
