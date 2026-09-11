/**
 * Entidad de dominio inmutable que modela un punto en el espacio bidimensional ℝ².
 */
export class Punto2D {
  /**
   * @param {number} x - Coordenada en el eje de las abscisas.
   * @param {number} y - Coordenada en el eje de las ordenadas.
   * @param {string} [etiqueta=''] - Identificador alfanumérico del punto (ej. 'A', 'B').
   * @param {boolean} [esIncognitaResuelta=false] - Indica si el punto fue hallado analíticamente a partir de una incógnita '?'.
   */
  constructor(x, y, etiqueta = '', esIncognitaResuelta = false) {
    this._x = Number(x);
    this._y = Number(y);
    this._etiqueta = String(etiqueta);
    this._esIncognitaResuelta = Boolean(esIncognitaResuelta);
    Object.freeze(this);
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get etiqueta() {
    return this._etiqueta;
  }

  get esIncognitaResuelta() {
    return this._esIncognitaResuelta;
  }

  /**
   * Calcula la distancia euclidiana hacia otro punto cartesiano.
   * @param {Punto2D} otroPunto
   * @returns {number}
   */
  distanciaA(otroPunto) {
    const deltaX = otroPunto.x - this._x;
    const deltaY = otroPunto.y - this._y;
    return Math.hypot(deltaX, deltaY);
  }

  /**
   * Representación textual en formato estándar (ej: "A(3.00, -2.50)").
   * @returns {string}
   */
  aCadena() {
    const fx = Number.isInteger(this._x) ? this._x : this._x.toFixed(2);
    const fy = Number.isInteger(this._y) ? this._y : this._y.toFixed(2);
    return this._etiqueta ? `${this._etiqueta}(${fx}, ${fy})` : `(${fx}, ${fy})`;
  }
}
