<p align="center">
  <img src="assets/abhedyam-logo.jpeg" alt="Abhedyam Logo" width="300"/>
</p>

**Idiomas:** [English](README.md) | [Português](README.pt.md) | [Español](README.es.md)

# Abhedyam (अभेद्यम्)

**Abhedyam** ("Lo inquebrantable") es un framework disruptivo de criptografía poscuántica (PQC) que armoniza la teoría matemática de retículos con la variedad topológica de la lengua sánscrita. 

> _"Los números son construcciones. El lenguaje es la verdad."_

## Visión General

A diferencia de los frameworks tradicionales de PQC, que se basan únicamente en el aumento del tamaño de las claves y las distribuciones de error para combatir a los adversarios cuánticos, Abhedya introduce una capa de **esteganografía basada en el lenguaje**. Al mapear primitivas criptográficas al alfabeto sánscrito ordenado matemáticamente (Varnamala) y aplicar la métrica poética (Chhandas), Abhedya logra:

- **Seguridad cuántica**: Resistencia basada en retículos (LWE) que cumple con el Nivel 3 del NIST (Kyber-768).
- **Descifrado sin latencia**: Tiempo de descifrado de **~5 µs** (20 veces más rápido que Kyber) mediante mapeo directo de las variedades topológicas. 
- **Esteganografía**: Ciphertext indistinguible de una poesía épica ("Mahakavya") válida en sánscrito. 

## Arquitectura

Este repositorio contiene los binarios verificados y la documentación del ecosistema Abhedya. El código fuente principal es propiedad de **ParamTatva**, distribuido bajo la licencia MIT, que permite su uso, modificación y redistribución.

- `bin/`: Herramientas de la CLI precompiladas para macOS/Linux (`abhedya-cli`).
- `docs/`: Especificaciones técnicas e informes de conformidad.

## Uso

### 1. Instalación

Descarga el binario `abhedya-cli` del directorio `bin/` y añádelo a tu PATH.

### 2. Benchmarking

Comprueba el rendimiento y la conformidad en tu equipo local:

```bash
# Ejecute el benchmark del modo estándar
./bin/abhedya-cli --benchmark

# Ejecute el benchmark del modo métrico (Poético)
./bin/abhedya-cli --benchmark --meter
```

### 3. Comparación

Compara Abhedya con los 20 principales candidatos al PQC de NIST:

```bash
./bin/abhedya-cli --compare
```

## Análisis de superioridad

Lea [superiority.md](docs/superiority.md) para obtener un desglose detallado de por qué Abhedya supera a los frameworks puramente matemáticos en cuanto a velocidad, filosofía e implementación.

## Refuerzo de la seguridad (v1.0.1)

Tras una rigurosa auditoría de seguridad realizada por investigadores independientes, se ha reforzado la biblioteca principal contra ataques avanzados de canal lateral:

- **Eliminación del oráculo de temporización**: Se ha implementado la **codificación en tiempo constante** con búsqueda de ventana fija optimizada para AVX2, lo que garantiza que el tiempo de cifrado sea independiente del mensaje secreto.
- **Eliminación del sesgo**: Se ha aplicado un estricto **truncamiento del módulo** ($q < 3168$) para garantizar una correspondencia perfectamente uniforme con el alfabeto sánscrito, eliminando así cualquier sesgo estadístico.
- **Integridad esteganográfica**: Se ha formalizado la distinción entre el **modo estándar** (ruido conforme a FIPS) y el **modo métrico** (privacidad esteganográfica) para prevenir vulnerabilidades por deriva distribucional. 

---

**ParamTatva**, 2026.
