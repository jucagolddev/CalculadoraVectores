import { Configuracion } from '../constants/Configuracion.js';

/**
 * Gestor de estado reactivo y bus de eventos centralizado (Store).
 * Desacopla la lógica de negocio de los controladores de vista y del motor gráfico.
 */
export class EstadoApp {
  constructor() {
    this._estado = {
      modoActivo: Configuracion.MODOS_APP.CADENA_PUNTOS,
      entornoActivo: Configuracion.ENTORNOS_APP.CALCULADORA,
      respuestasVisibles: true,
      construccionGeometrica: 'paralelogramo',
      mostrarProyecciones: true,
      mostrarCuadricula: true,
      coordenadasCursor: { x: 0, y: 0 },
      ultimoResultado: null,
      vectoresRenderizables: [],
      puntosRenderizables: []
    };

    this._suscriptores = new Map();
  }

  /**
   * Obtiene una copia inmutable del estado actual.
   * @returns {Object}
   */
  obtener() {
    return { ...this._estado };
  }

  /**
   * Actualiza propiedades del estado y notifica a los suscriptores suscritos.
   * @param {Object} mutaciones
   */
  actualizar(mutaciones) {
    const estadoAnterior = { ...this._estado };
    this._estado = { ...this._estado, ...mutaciones };

    for (const [clave, callbacks] of this._suscriptores.entries()) {
      if (clave in mutaciones || clave === '*') {
        callbacks.forEach(cb => {
          try {
            cb(this._estado, estadoAnterior);
          } catch (err) {
            console.error(`Error en suscriptor de estado [${clave}]:`, err);
          }
        });
      }
    }
  }

  /**
   * Suscribe una función callback a cambios en una propiedad específica del estado o '*'.
   * @param {string} propiedad
   * @param {Function} callback
   * @returns {Function} Función para cancelar la suscripción
   */
  suscribir(propiedad, callback) {
    if (!this._suscriptores.has(propiedad)) {
      this._suscriptores.set(propiedad, new Set());
    }
    this._suscriptores.get(propiedad).add(callback);

    return () => {
      const conjunto = this._suscriptores.get(propiedad);
      if (conjunto) {
        conjunto.delete(callback);
      }
    };
  }
}
