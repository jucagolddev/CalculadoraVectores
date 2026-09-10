/**
 * Constantes y configuraciones globales del dominio vectorial
 */
export const Configuracion = Object.freeze({
  TOLERANCIA_NUMERICA: 0.05,
  TOLERANCIA_EQUIPOLENCIA: 1e-5,
  ESCALA_INICIAL_PX: 40,
  ESCALA_MINIMA_PX: 8,
  ESCALA_MAXIMA_PX: 400,

  PALETA_VECTORES: [
    '#38bdf8', // Cian
    '#f59e0b', // Ámbar
    '#a855f7', // Violeta
    '#ec4899', // Rosa
    '#14b8a6', // Turquesa
    '#6366f1', // Índigo
    '#f43f5e'  // Rojo
  ],

  COLOR_RESULTANTE: '#10b981', // Verde esmeralda
  COLOR_ORIGEN: '#ffffff',
  COLOR_EJES: 'rgba(148, 163, 184, 0.85)',
  COLOR_FONDO: '#0a0f1d',
  COLOR_CUADRICULA_MENOR: 'rgba(255, 255, 255, 0.04)',
  COLOR_CUADRICULA_MAYOR: 'rgba(255, 255, 255, 0.12)',

  MODOS_APP: Object.freeze({
    CADENA_PUNTOS: 'dos-puntos',
    OPERACIONES: 'operaciones',
    EQUIPOLENCIA: 'equipolencia'
  }),

  ENTORNOS_APP: Object.freeze({
    CALCULADORA: 'calculadora',
    EJERCICIO: 'ejercicio'
  })
});
