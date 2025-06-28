package com.diet.hub.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Alimento")
public class Alimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;
    
    @Column(name = "calorias")
    private Double calorias;
    
    @Column(name = "proteinas")
    private Double proteinas;
    
    @Column(name = "carboidratos")
    private Double carboidratos;
    
    @Column(name = "gorduras")
    private Double gorduras;
    
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
	public Double getCalorias() {
		return calorias;
	}
	public void setCalorias(Double calorias) {
		this.calorias = calorias;
	}
	public Double getProteinas() {
		return proteinas;
	}
	public void setProteinas(Double proteinas) {
		this.proteinas = proteinas;
	}
	public Double getCarboidratos() {
		return carboidratos;
	}
	public void setCarboidratos(Double carboidratos) {
		this.carboidratos = carboidratos;
	}
	public Double getGorduras() {
		return gorduras;
	}
	public void setGorduras(Double gorduras) {
		this.gorduras = gorduras;
	}

    
}

