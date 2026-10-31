<p align="center">
  <img src="assets/abhedyam-logo.jpeg" alt="Abhedyam Logo" width="300"/>
</p>

**Idiomas:** [English](README.md) | [Português](README.pt.md) | [Español](README.es.md)

# Abhedyam (अभेद्यम्)

**Abhedyam** ("O Inquebrável") é um framework disruptivo de criptografia pós-quântica que harmoniza a teoria matemática das redes com a variedade topológica da língua sânscrita.

> _"Números são construtos. A linguagem é a verdade."_

## Visão geral

Ao contrário dos frameworks tradicionais de PQC, que dependem exclusivamente do aumento do tamanho das chaves e das distribuições de erros para combater adversários quânticos, o Abhedya introduz uma camada de **esteganografia baseada em linguagem**. Ao mapear primitivas criptográficas para o alfabeto sânscrito ordenado matematicamente (Varnamala) e aplicar a métrica poética (Chhandas), o Abhedya consegue:

- **Segurança quântica**: Resistência baseada na rede de reticulados (LWE) em conformidade com o Nível 3 do NIST (Kyber-768).
- **Descriptografia com latência zero**: Tempo de descriptografia de **~5 µs** (20 vezes mais rápido que o Kyber) por meio de mapeamento direto das variedades topológicas.
- **Esteganografia**: Ciphertext indistinguível de uma poesia épica ("Mahakavya") válida em sânscrito.

## Arquitetura
Este repositório contém os binários verificados e a documentação do ecossistema Abhedya. O código-fonte principal é de propriedade da **ParamTatva**, distribuído sob a licença MIT, que permite seu uso, modificação e redistribuição.

- `bin/`: Ferramentas da CLI pré-compiladas para macOS/Linux (`abhedya-cli`).
- `docs/`: Especificações técnicas e relatórios de conformidade.

## Uso

### 1. Instalação

Baixe o binário `abhedya-cli` do diretório `bin/` e o adicione ao seu PATH.

### 2. Benchmarking

Verifique o desempenho e a conformidade na sua máquina local:

```bash
# Execute o benchmark do modo padrão
./bin/abhedya-cli --benchmark

# Execute o benchmark do modo métrico (poético)
./bin/abhedya-cli --benchmark --meter
```

### 3. Comparação

Compare o Abhedya com os 20 principais candidatos a PQC do NIST:

```bash
./bin/abhedya-cli --compare
```

## Análise de Superioridade

 Veja [superiority.md](docs/superiority.md) para uma análise detalhada sobre por que o Abhedya supera os frameworks puramente matemáticos em velocidade, filosofia e implementação.

## Reforço de segurança (v1.0.1)

Após uma rigorosa auditoria de segurança realizada por pesquisadores independentes, a biblioteca principal foi reforçada contra ataques avançados de canal lateral:

- **Eliminação de Oráculos de Tempo**: Implementou-se a **Codificação em Tempo Constante** com busca em janela fixa otimizada via AVX2, garantindo que o tempo de criptografia seja independente da mensagem secreta.
- **Eliminação de Viés**: Aplicou-se rigorosamente o **truncamento por módulo** ($q < 3168$) para garantir um mapeamento perfeitamente uniforme para o alfabeto sânscrito, eliminando todo viés estatístico.
- **Integridade Esteganográfica:** Formalizou-se a distinção entre o **Modo Padrão** (ruído em conformidade com a norma FIPS) e o **Modo Métrico** (privacidade esteganográfica) para evitar vulnerabilidades decorrentes de desvios distribucionais.

---

**ParamTatva**, 2026.
