/**
 * Manejador matemático puro para transformaciones afines entre
 * el espacio métrico cartesiano (mundo) y el espacio de píxeles (pantalla).
 */
export class TransformadorCoordenadas {
  /**
   * @param {number} origenX - Coordenada X de píxel donde se proyecta (0,0).
   * @param {number} origenY - Coordenada Y de píxel donde se proyecta (0,0).
   * @param {number} escala - Píxeles por unidad cartesiana.
   */
  constructor(origenX, origenY, escala) {
    this.origenX = origenX;
    this.origenY = origenY;
    this.escala = escala;
  }

  /**
   * Píxeles de pantalla -> Coordenadas cartesianas reales.
   * @param {number} px
   * @param {number} py
   * @returns {{x: number, y: number}}
   */
  pantallaAMundo(px, py) {
    const x = (px - this.origenX) / this.escala;
    const y = (this.origenY - py) / this.escala;
    return { x, y };
  }

  /**
   * Coordenadas cartesianas reales -> Píxeles de pantalla.
   * @param {number} mx
   * @param {number} my
   * @returns {{px: number, py: number}}
   */
  mundoAPantalla(mx, my) {
    const px = this.origenX + (mx * this.escala);
    const py = this.origenY - (my * this.escala);
    return { px, py };
  }
}
