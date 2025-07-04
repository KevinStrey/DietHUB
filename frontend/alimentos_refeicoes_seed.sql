-- 0. Usuários
-- Assumindo tabela usuario (id, calorias_diarias, email, nome, objetivo, senha)
INSERT INTO usuario (id, calorias_diarias, email, nome, objetivo, senha) VALUES
  (1, 1800, 'admin@gmail.com', 'admin', 'Emagrecimento', 'admin'),
  (2, 3200, 'user@gmail.com', 'usuario', 'Ganhar Massa', 'usuario');



-- Script para popular alimentos, refeições e itens de refeição para 30 dias
-- Datas: 2025-06-04 a 2025-07-04
-- Alimentos: 20 tipos variados
-- Refeições: 3, 4 ou 5 por dia, cada uma com itens variados

-- 1. Alimentos
INSERT INTO alimento (id, nome, calorias, proteinas, carboidratos, gorduras) VALUES
  (1, 'Ovos', 143, 13, 1.1, 9.5),
  (2, 'Arroz Integral', 124, 2.6, 25.8, 1.0),
  (3, 'Frango Grelhado', 165, 31, 0, 3.6),
  (4, 'Banana', 89, 1.1, 23, 0.3),
  (5, 'Aveia', 389, 16.9, 66.3, 6.9),
  (6, 'Brócolis', 34, 2.8, 7, 0.4),
  (7, 'Salmão', 208, 20, 0, 13),
  (8, 'Batata Doce', 86, 1.6, 20.1, 0.1),
  (9, 'Maçã', 52, 0.3, 14, 0.2),
  (10, 'Iogurte Natural', 61, 3.5, 4.7, 3.3),
  (11, 'Nozes', 654, 15, 14, 65),
  (12, 'Quinoa', 120, 4.1, 21.3, 1.9),
  (13, 'Feijão Preto', 132, 8.9, 23.7, 0.5),
  (14, 'Queijo Minas', 264, 17, 2.6, 21),
  (15, 'Peito de Peru', 104, 17, 1.2, 3.5),
  (16, 'Alface', 15, 1.4, 2.9, 0.2),
  (17, 'Tomate', 18, 0.9, 3.9, 0.2),
  (18, 'Pão Integral', 247, 9, 41, 3.4),
  (19, 'Leite Desnatado', 35, 3.4, 5, 0.1),
  (20, 'Abacate', 160, 2, 9, 15);

-- 2. Refeições e Itens
-- Assumindo usuario_id = 1 para todos os registros

-- Gerado automaticamente: 30 dias, 3-5 refeições por dia, 2-5 itens por refeição

-- Exemplo de um dia:
-- 2025-07-04
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (1, 'Café da Manhã', '2025-07-04', 1);
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (2, 'Almoço', '2025-06-04', 1);
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (3, 'Jantar', '2025-06-04', 1);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (1, 1, 1, 120);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (2, 1, 5, 40);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (3, 1, 19, 200);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (4, 2, 3, 150);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (5, 2, 2, 120);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (6, 2, 6, 80);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (7, 2, 13, 100);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (8, 3, 7, 130);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (9, 3, 8, 100);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (10, 3, 6, 60);

-- 2025-06-27
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (4, 'Café da Manhã', '2025-06-27', 2);
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (5, 'Almoço', '2025-06-27', 2);
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (6, 'Jantar', '2025-06-27', 2);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (11, 4, 1, 100);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (12, 4, 5, 30);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (13, 4, 19, 200);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (14, 5, 3, 120);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (15, 5, 2, 100);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (16, 5, 6, 80);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (17, 6, 7, 110);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (18, 6, 8, 90);

-- 2025-06-28
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (7, 'Café da Manhã', '2025-06-28', 2);
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (8, 'Almoço', '2025-06-28', 2);
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (9, 'Jantar', '2025-06-28', 2);
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (10, 'Ceia', '2025-06-28', 2);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (19, 7, 10, 180);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (20, 7, 4, 80);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (21, 8, 3, 140);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (22, 8, 2, 110);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (23, 8, 13, 90);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (24, 9, 7, 120);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (25, 9, 8, 100);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (26, 10, 11, 30);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (27, 10, 9, 120);

-- 2025-06-29
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (11, 'Café da Manhã', '2025-06-29', 2);
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (12, 'Almoço', '2025-06-29', 2);
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (13, 'Jantar', '2025-06-29', 2);
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (14, 'Lanche da Tarde', '2025-06-29', 2);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (28, 11, 18, 60);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (29, 11, 19, 200);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (30, 12, 3, 130);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (31, 12, 2, 100);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (32, 12, 6, 90);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (33, 13, 7, 100);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (34, 13, 8, 100);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (35, 14, 20, 50);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (36, 14, 9, 100);

-- 2025-06-30
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (15, 'Café da Manhã', '2025-06-30', 2);
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (16, 'Almoço', '2025-06-30', 2);
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (17, 'Jantar', '2025-06-30', 2);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (37, 15, 1, 110);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (38, 15, 5, 30);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (39, 16, 3, 120);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (40, 16, 2, 100);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (41, 16, 6, 80);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (42, 17, 7, 110);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (43, 17, 8, 90);

-- 2025-07-01
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (18, 'Café da Manhã', '2025-07-01', 2);
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (19, 'Almoço', '2025-07-01', 2);
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (20, 'Jantar', '2025-07-01', 2);
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (21, 'Ceia', '2025-07-01', 2);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (44, 18, 10, 180);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (45, 18, 4, 80);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (46, 19, 3, 140);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (47, 19, 2, 110);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (48, 19, 13, 90);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (49, 20, 7, 120);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (50, 20, 8, 100);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (51, 21, 11, 30);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (52, 21, 9, 120);

-- 2025-07-02
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (22, 'Café da Manhã', '2025-07-02', 2);
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (23, 'Almoço', '2025-07-02', 2);
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (24, 'Jantar', '2025-07-02', 2);
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (25, 'Lanche da Tarde', '2025-07-02', 2);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (53, 22, 18, 60);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (54, 22, 19, 200);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (55, 23, 3, 130);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (56, 23, 2, 100);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (57, 23, 6, 90);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (58, 24, 7, 100);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (59, 24, 8, 100);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (60, 25, 20, 50);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (61, 25, 9, 100);

-- 2025-07-03
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (26, 'Café da Manhã', '2025-07-03', 2);
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (27, 'Almoço', '2025-07-03', 2);
INSERT INTO refeicao (id, nome, data, usuario_id) VALUES (28, 'Jantar', '2025-07-03', 2);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (62, 26, 1, 110);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (63, 26, 5, 30);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (64, 27, 3, 120);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (65, 27, 2, 100);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (66, 27, 6, 80);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (67, 28, 7, 110);
INSERT INTO item_refeicao (id, refeicao_id, alimento_id, quantidade_em_gramas) VALUES (68, 28, 8, 90);