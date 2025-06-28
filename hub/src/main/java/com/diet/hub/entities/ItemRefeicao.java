package com.diet.hub.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "ItemRefeicao")
public class ItemRefeicao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantidadeEmGramas")
    private Double quantidadeEmGramas;

    @ManyToOne
    @JoinColumn(name = "refeicao_id")
    private Refeicao refeicao;

    @ManyToOne
    @JoinColumn(name = "alimento_id")
    private Alimento alimento;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getQuantidadeEmGramas() {
		return quantidadeEmGramas;
	}

	public void setQuantidadeEmGramas(Double quantidadeEmGramas) {
		this.quantidadeEmGramas = quantidadeEmGramas;
	}

	public Refeicao getRefeicao() {
		return refeicao;
	}

	public void setRefeicao(Refeicao refeicao) {
		this.refeicao = refeicao;
	}

	public Alimento getAlimento() {
		return alimento;
	}

	public void setAlimento(Alimento alimento) {
		this.alimento = alimento;
	}

    
}

