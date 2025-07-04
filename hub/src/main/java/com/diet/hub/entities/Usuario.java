package com.diet.hub.entities;

import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "Usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;
    
    @Column(name = "email")
    private String email;
    
    @Column(name = "senha")
    private String senha;
    
    @Column(name = "objetivo")
    private String objetivo; // "emagrecer", "manter", "ganhar"
    
    @Column(name = "caloriasDiarias")
    private Integer caloriasDiarias;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Refeicao> refeicoes;

    @JsonManagedReference
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<HistoricoDiario> historicos;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getObjetivo() {
		return objetivo;
	}

	public void setObjetivo(String objetivo) {
		this.objetivo = objetivo;
	}

	public Integer getCaloriasDiarias() {
		return caloriasDiarias;
	}

	public void setCaloriasDiarias(Integer caloriasDiarias) {
		this.caloriasDiarias = caloriasDiarias;
	}

	public List<Refeicao> getRefeicoes() {
		return refeicoes;
	}

	public void setRefeicoes(List<Refeicao> refeicoes) {
		this.refeicoes = refeicoes;
	}

	public List<HistoricoDiario> getHistoricos() {
		return historicos;
	}

	public void setHistoricos(List<HistoricoDiario> historicos) {
		this.historicos = historicos;
	}

    
}

