/**
 * Representa un punto inmutable en el espacio euclídeo tridimensional ℝ³.
 */
export class Punto3D {
  /**
   * @param {number} x - Coordenada en el eje de abscisas X
   * @param {number} y - Coordenada en el eje Y
   * @param {number} z - Coordenada en el eje vertical de cotas Z
   * @param {string} [id='P'] - Identificador alfabético del nodo
   * @param {string} [color='#38bdf8'] - Color hexadecimal para renderizado
   */
  constructor(x, y, z, id = 'P', color = '#38bdf8') {
    this._x = Number(x) || 0;
    this._y = Number(y) || 0;
    this._z = Number(z) || 0;
    this._id = id;
    this._color = color;
  }

  get x() { return this._x; }
  get y() { return this._y; }
  get z() { return this._z; }
  get id() { return this._id; }
  get color() { return this._color; }

  /**
   * Calcula la distancia euclídea tridimensional a otro punto: d = √((x2-x1)² + (y2-y1)² + (z2-z1)²)
   * @param {Punto3D} otroPunto
   * @returns {number}
   */
  distanciaA(otroPunto) {
    const dx = otroPunto.x - this._x;
    const dy = otroPunto.y - this._y;
    const dz = otroPunto.z - this._z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  /**
   * Clona la instancia actual con posibles sobreescrituras parciales.
   * @param {Object} [cambios]
   * @returns {Punto3D}
   */
  clonar(cambios = {}) {
    return new Punto3D(
      cambios.x !== undefined ? cambios.x : this._x,
      cambios.y !== undefined ? cambios.y : this._y,
      cambios.z !== undefined ? cambios.z : this._z,
      cambios.id !== undefined ? cambios.id : this._id,
      cambios.color !== undefined ? cambios.color : this._color
    );
  }
}
