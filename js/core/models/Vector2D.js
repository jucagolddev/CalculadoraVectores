import { Punto2D } from './Punto2D.js';
import { Configuracion } from '../constants/Configuracion.js';

/**
 * Entidad de dominio inmutable que representa un vector en ℝ²
 * con punto de aplicación, componentes algebraicas y métodos operacionales.
 */
export class Vector2D {
  /**
   * @param {number} x - Componente cartesiana horizontal (dx).
   * @param {number} y - Componente cartesiana vertical (dy).
   * @param {Punto2D} [origen=new Punto2D(0, 0, 'O')] - Punto de anclaje en el plano.
   * @param {string} [etiqueta='u'] - Nombre simbólico del vector.
   * @param {string} [color='#06b6d4'] - Color para renderizado gráfico.
   */
  constructor(x, y, origen = new Punto2D(0, 0, 'O'), etiqueta = 'u', color = '#06b6d4') {
    this._x = Number(x);
    this._y = Number(y);
    this._origen = origen instanceof Punto2D ? origen : new Punto2D(origen.x || 0, origen.y || 0, 'O');
    this._etiqueta = String(etiqueta);
    this._color = String(color);
    Object.freeze(this);
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get origen() {
    return this._origen;
  }

  get etiqueta() {
    return this._etiqueta;
  }

  get color() {
    return this._color;
  }

  /**
   * Punto terminal (punta de la flecha) calculado a partir del origen y componentes.
   * @returns {Punto2D}
   */
  get extremo() {
    return new Punto2D(this._origen.x + this._x, this._origen.y + this._y, `${this._etiqueta}_fin`);
  }

  /**
   * Constructor de fábrica para crear un vector a partir de dos puntos (origen -> extremo).
   * @param {Punto2D} puntoA
   * @param {Punto2D} puntoB
   * @param {string} [etiqueta]
   * @param {string} [color]
   * @returns {Vector2D}
   */
  static desdeDosPuntos(puntoA, puntoB, etiqueta, color = '#38bdf8') {
    const nombre = etiqueta || `${puntoA.etiqueta}${puntoB.etiqueta}`;
    const dx = puntoB.x - puntoA.x;
    const dy = puntoB.y - puntoA.y;
    return new Vector2D(dx, dy, puntoA, nombre, color);
  }

  /**
   * Módulo o norma euclidiana ||v|| = √(x² + y²).
   * @returns {number}
   */
  modulo() {
    return Math.hypot(this._x, this._y);
  }

  /**
   * Dirección en radianes en el rango [-π, π].
   * @returns {number}
   */
  direccionRadianes() {
    return Math.atan2(this._y, this._x);
  }

  /**
   * Dirección en grados sexagesimales estandarizada en [0, 360).
   * @returns {number}
   */
  direccionGrados() {
    let grados = (this.direccionRadianes() * 180) / Math.PI;
    if (grados < 0) {
      grados += 360;
    }
    return grados;
  }

  /**
   * Genera el vector unitario normalizado (||u|| = 1).
   * @returns {Vector2D}
   */
  unitario() {
    const norma = this.modulo();
    if (norma === 0) {
      return new Vector2D(0, 0, this._origen, `u_${this._etiqueta}`, this._color);
    }
    return new Vector2D(this._x / norma, this._y / norma, this._origen, `u_${this._etiqueta}`, this._color);
  }

  /**
   * Suma algebraica con otro vector.
   * @param {Vector2D} otroVector
   * @param {Punto2D} [origenResultado]
   * @param {string} [etiquetaResultado]
   * @param {string} [colorResultado]
   * @returns {Vector2D}
   */
  sumar(otroVector, origenResultado = this._origen, etiquetaResultado = `${this._etiqueta}+${otroVector.etiqueta}`, colorResultado = '#10b981') {
    return new Vector2D(
      this._x + otroVector.x,
      this._y + otroVector.y,
      origenResultado,
      etiquetaResultado,
      colorResultado
    );
  }

  /**
   * Resta algebraica: this - otroVector.
   * @param {Vector2D} otroVector
   * @param {Punto2D} [origenResultado]
   * @param {string} [etiquetaResultado]
   * @param {string} [colorResultado]
   * @returns {Vector2D}
   */
  restar(otroVector, origenResultado = this._origen, etiquetaResultado = `${this._etiqueta}-${otroVector.etiqueta}`, colorResultado = '#f43f5e') {
    return new Vector2D(
      this._x - otroVector.x,
      this._y - otroVector.y,
      origenResultado,
      etiquetaResultado,
      colorResultado
    );
  }

  /**
   * Multiplicación por escalar k · v.
   * @param {number} k
   * @param {Punto2D} [origenResultado]
   * @param {string} [etiquetaResultado]
   * @param {string} [colorResultado]
   * @returns {Vector2D}
   */
  multiplicarPorEscalar(k, origenResultado = this._origen, etiquetaResultado, colorResultado = '#a855f7') {
    const nombre = etiquetaResultado || `${k}·${this._etiqueta}`;
    return new Vector2D(
      this._x * k,
      this._y * k,
      origenResultado,
      nombre,
      colorResultado
    );
  }

  /**
   * Producto escalar (dot product): ux·vx + uy·vy.
   * @param {Vector2D} otroVector
   * @returns {number}
   */
  productoPunto(otroVector) {
    return (this._x * otroVector.x) + (this._y * otroVector.y);
  }

  /**
   * Ángulo convexo comprendido entre dos vectores en grados [0°, 180°].
   * @param {Vector2D} otroVector
   * @returns {number}
   */
  anguloCon(otroVector) {
    const normaA = this.modulo();
    const normaB = otroVector.modulo();
    if (normaA === 0 || normaB === 0) {
      return 0;
    }
    const cosTheta = Math.max(-1, Math.min(1, this.productoPunto(otroVector) / (normaA * normaB)));
    return (Math.acos(cosTheta) * 180) / Math.PI;
  }

  /**
   * Evalúa si dos vectores son equipolentes.
   * @param {Vector2D} otroVector
   * @param {number} [tolerancia=Configuracion.TOLERANCIA_EQUIPOLENCIA]
   * @returns {boolean}
   */
  esEquipolente(otroVector, tolerancia = Configuracion.TOLERANCIA_EQUIPOLENCIA) {
    const deltaX = Math.abs(this._x - otroVector.x);
    const deltaY = Math.abs(this._y - otroVector.y);
    return deltaX <= tolerancia && deltaY <= tolerancia;
  }

  /**
   * Traslada las componentes del vector a un nuevo punto de origen.
   * @param {Punto2D} nuevoOrigen
   * @param {string} [nuevaEtiqueta]
   * @param {string} [nuevoColor]
   * @returns {Vector2D}
   */
  trasladarA(nuevoOrigen, nuevaEtiqueta, nuevoColor) {
    return new Vector2D(
      this._x,
      this._y,
      nuevoOrigen,
      nuevaEtiqueta || `${this._etiqueta}'`,
      nuevoColor || this._color
    );
  }

  /**
   * Formato de componentes "(x, y)".
   * @returns {string}
   */
  aCadenaComponentes() {
    const fx = Number.isInteger(this._x) ? this._x : this._x.toFixed(2);
    const fy = Number.isInteger(this._y) ? this._y : this._y.toFixed(2);
    return `(${fx}, ${fy})`;
  }
}
