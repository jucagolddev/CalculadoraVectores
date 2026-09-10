import { Punto3D } from './Punto3D.js';

/**
 * Entidad de dominio inmutable que modela un vector en el espacio tridimensional ℝ³.
 * Incluye operaciones algebraicas, producto escalar, producto vectorial (cruz) y cosenos directores.
 */
export class Vector3D {
  /**
   * @param {number} x - Componente en el eje X
   * @param {number} y - Componente en el eje Y
   * @param {number} z - Componente en el eje vertical Z
   * @param {Punto3D} [origen=new Punto3D(0,0,0)] - Punto de anclaje inicial
   * @param {string} [etiqueta='u'] - Nombre o símbolo del vector
   * @param {string} [color='#06b6d4'] - Color para renderizado
   */
  constructor(x, y, z, origen = new Punto3D(0, 0, 0), etiqueta = 'u', color = '#06b6d4') {
    this._x = Number(x) || 0;
    this._y = Number(y) || 0;
    this._z = Number(z) || 0;
    this._origen = origen;
    this._etiqueta = etiqueta;
    this._color = color;
  }

  get x() { return this._x; }
  get y() { return this._y; }
  get z() { return this._z; }
  get origen() { return this._origen; }
  get etiqueta() { return this._etiqueta; }
  get color() { return this._color; }

  /**
   * Punto cartesiano 3D donde finaliza la flecha del vector.
   * @returns {Punto3D}
   */
  get extremo() {
    return new Punto3D(
      this._origen.x + this._x,
      this._origen.y + this._y,
      this._origen.z + this._z,
      `Ext_${this._etiqueta}`,
      this._color
    );
  }

  /**
   * Crea un vector a partir de dos puntos espaciales A y B: v = B - A
   * @param {Punto3D} origen
   * @param {Punto3D} destino
   * @param {string} [etiqueta='AB']
   * @param {string} [color='#06b6d4']
   * @returns {Vector3D}
   */
  static desdePuntos(origen, destino, etiqueta = 'AB', color = '#06b6d4') {
    return new Vector3D(
      destino.x - origen.x,
      destino.y - origen.y,
      destino.z - origen.z,
      origen,
      etiqueta,
      color
    );
  }

  /**
   * Módulo o longitud euclídea tridimensional: ||v|| = √(x² + y² + z²)
   * @returns {number}
   */
  modulo() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
  }

  /**
   * Cosenos directores respecto a los semiejes positivos X, Y y Z.
   * cos α = x / ||v||,  cos β = y / ||v||,  cos γ = z / ||v||
   * @returns {{ cosAlfa: number, cosBeta: number, cosGamma: number, alfaGrados: number, betaGrados: number, gammaGrados: number, sumaCuadrados: number }}
   */
  cosenosDirectores() {
    const mod = this.modulo();
    if (mod === 0) {
      return {
        cosAlfa: 0, cosBeta: 0, cosGamma: 0,
        alfaGrados: 0, betaGrados: 0, gammaGrados: 0,
        sumaCuadrados: 0
      };
    }

    const cosAlfa = Math.max(-1, Math.min(1, this._x / mod));
    const cosBeta = Math.max(-1, Math.min(1, this._y / mod));
    const cosGamma = Math.max(-1, Math.min(1, this._z / mod));

    const alfaGrados = (Math.acos(cosAlfa) * 180) / Math.PI;
    const betaGrados = (Math.acos(cosBeta) * 180) / Math.PI;
    const gammaGrados = (Math.acos(cosGamma) * 180) / Math.PI;
    const sumaCuadrados = cosAlfa * cosAlfa + cosBeta * cosBeta + cosGamma * cosGamma;

    return {
      cosAlfa,
      cosBeta,
      cosGamma,
      alfaGrados,
      betaGrados,
      gammaGrados,
      sumaCuadrados
    };
  }

  /**
   * Vector unitario director con la misma dirección y sentido: û = v / ||v||
   * @returns {Vector3D}
   */
  calcularUnitario() {
    const mod = this.modulo();
    if (mod === 0) {
      return new Vector3D(0, 0, 0, this._origen, `u_${this._etiqueta}`, this._color);
    }
    return new Vector3D(
      this._x / mod,
      this._y / mod,
      this._z / mod,
      this._origen,
      `u_${this._etiqueta}`,
      this._color
    );
  }

  /**
   * Suma algebraica de vectores: u + v
   * @param {Vector3D} otro
   * @param {string} [etiqueta='u+v']
   * @param {string} [color='#10b981']
   * @returns {Vector3D}
   */
  sumar(otro, etiqueta = 'u+v', color = '#10b981') {
    return new Vector3D(
      this._x + otro.x,
      this._y + otro.y,
      this._z + otro.z,
      this._origen,
      etiqueta,
      color
    );
  }

  /**
   * Diferencia algebraica de vectores: u - v
   * @param {Vector3D} otro
   * @param {string} [etiqueta='u-v']
   * @param {string} [color='#f43f5e']
   * @returns {Vector3D}
   */
  restar(otro, etiqueta = 'u-v', color = '#f43f5e') {
    return new Vector3D(
      this._x - otro.x,
      this._y - otro.y,
      this._z - otro.z,
      this._origen,
      etiqueta,
      color
    );
  }

  /**
   * Multiplicación por un escalar: k · u
   * @param {number} k
   * @param {string} [etiqueta]
   * @param {string} [color]
   * @returns {Vector3D}
   */
  multiplicarEscalar(k, etiqueta = null, color = null) {
    return new Vector3D(
      this._x * k,
      this._y * k,
      this._z * k,
      this._origen,
      etiqueta || `(${k}·${this._etiqueta})`,
      color || this._color
    );
  }

  /**
   * Producto escalar (dot product): u · v = ux·vx + uy·vy + uz·vz
   * @param {Vector3D} otro
   * @returns {number}
   */
  productoEscalar(otro) {
    return this._x * otro.x + this._y * otro.y + this._z * otro.z;
  }

  /**
   * Producto vectorial (cross product): w = u × v
   * w = (uy·vz - uz·vy) i - (ux·vz - uz·vx) j + (ux·vy - uy·vx) k
   * @param {Vector3D} otro
   * @param {string} [etiqueta='u×v']
   * @param {string} [color='#c084fc']
   * @returns {Vector3D}
   */
  productoVectorial(otro, etiqueta = 'u×v', color = '#c084fc') {
    const wx = this._y * otro.z - this._z * otro.y;
    const wy = this._z * otro.x - this._x * otro.z;
    const wz = this._x * otro.y - this._y * otro.x;

    return new Vector3D(wx, wy, wz, this._origen, etiqueta, color);
  }

  /**
   * Área del paralelogramo definido por u y v en ℝ³: Área = ||u × v||
   * @param {Vector3D} otro
   * @returns {number}
   */
  areaParalelogramo(otro) {
    return this.productoVectorial(otro).modulo();
  }

  /**
   * Ángulo convexo comprendido entre dos vectores en grados: θ = arccos((u·v) / (||u||·||v||))
   * @param {Vector3D} otro
   * @returns {number}
   */
  anguloCon(otro) {
    const modU = this.modulo();
    const modV = otro.modulo();
    if (modU === 0 || modV === 0) return 0;

    const cosTheta = Math.max(-1, Math.min(1, this.productoEscalar(otro) / (modU * modV)));
    return (Math.acos(cosTheta) * 180) / Math.PI;
  }

  /**
   * Proyección escalar ortogonal de este vector sobre otro: Proy_(u->v) = (u · v) / ||v||
   * @param {Vector3D} otro
   * @returns {number}
   */
  proyeccionSobre(otro) {
    const modOtro = otro.modulo();
    if (modOtro === 0) return 0;
    return this.productoEscalar(otro) / modOtro;
  }
}
