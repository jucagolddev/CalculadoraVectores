/**
 * Módulo de Cámara y Proyección Espacial para el Motor Gráfico 3D.
 * Encapsula la orientación angular orbital (Yaw y Pitch), escala métrica,
 * paneo bidimensional y la transformación matemática de coordenadas R3 -> R2 pantalla.
 */
export class CamaraOrbital3D {
  constructor() {
    // Ángulos orbitales iniciales (~ -37° Yaw, ~ 28° Pitch)
    this._yaw = -0.65;
    this._pitch = 0.48;
    this._escala = 28; // Píxeles por unidad espacial
    this._panX = 0;
    this._panY = 0;
    this._modoPapel = false;

    // Límite de elevación para evitar singularidad de cardán (gimbal lock)
    this._limitePitch = Math.PI / 2 - 0.05;
  }

  get yaw() { return this._yaw; }
  get pitch() { return this._pitch; }
  get escala() { return this._escala; }
  get panX() { return this._panX; }
  get panY() { return this._panY; }
  get modoPapel() { return this._modoPapel; }

  establecerModoPapel(activo) {
    this._modoPapel = Boolean(activo);
    if (this._modoPapel) {
      this._panX = 0;
      this._panY = 0;
    } else {
      this._yaw = -0.65;
      this._pitch = 0.48;
    }
  }

  aplicarRotacion(deltaX, deltaY) {
    if (this._modoPapel) return;
    this._yaw += deltaX * 0.008;
    this._pitch += deltaY * 0.008;
    this._pitch = Math.max(-this._limitePitch, Math.min(this._limitePitch, this._pitch));
  }

  aplicarPaneo(deltaX, deltaY) {
    if (!this._modoPapel) return;
    this._panX += deltaX;
    this._panY += deltaY;
  }

  aplicarZoom(factor) {
    this._escala = Math.max(8, Math.min(120, this._escala * factor));
  }

  zoomIn() {
    this.aplicarZoom(1.25);
  }

  zoomOut() {
    this.aplicarZoom(0.8);
  }

  centrarOrigen() {
    this._yaw = -0.65;
    this._pitch = 0.48;
    this._escala = 28;
    this._panX = 0;
    this._panY = 0;
  }

  autoAjustar(vectores = [], puntos = [], ancho = 800, alto = 600) {
    if (vectores.length === 0 && puntos.length === 0) {
      this.centrarOrigen();
      return;
    }

    let maxDist = 4;
    vectores.forEach(v => {
      const d = Math.hypot(v.x, v.y, v.z);
      if (d > maxDist) maxDist = d;
    });

    puntos.forEach(p => {
      const d = Math.hypot(p.x, p.y, p.z);
      if (d > maxDist) maxDist = d;
    });

    const dimensionMin = Math.min(ancho, alto);
    this._escala = Math.max(12, Math.min(60, (dimensionMin * 0.35) / maxDist));
  }

  /**
   * Proyecta un punto cartesiano tridimensional (x, y, z) a coordenadas de pantalla 2D.
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} anchoLogico
   * @param {number} altoLogico
   * @returns {{ px: number, py: number, profundidad: number }}
   */
  proyectar(x, y, z, anchoLogico, altoLogico) {
    const cx = anchoLogico / 2 + this._panX;
    const cy = altoLogico / 2 + this._panY;

    // En Modo Papel: Proyección ortogonal pura sobre el plano coordenado XY (z = 0)
    if (this._modoPapel) {
      return {
        px: cx + x * this._escala,
        py: cy - y * this._escala,
        profundidad: z
      };
    }

    // En Modo 3D Orbital: Rotación compuesta Yaw (eje Z) y Pitch (plano visual)
    const cosY = Math.cos(this._yaw);
    const sinY = Math.sin(this._yaw);
    const x1 = x * cosY - y * sinY;
    const y1 = x * sinY + y * cosY;
    const z1 = z;

    const cosP = Math.cos(this._pitch);
    const sinP = Math.sin(this._pitch);
    const x2 = x1;
    const y2 = y1 * cosP - z1 * sinP;
    const z2 = y1 * sinP + z1 * cosP;

    return {
      px: cx + x2 * this._escala,
      py: cy - z2 * this._escala,
      profundidad: y2
    };
  }

  obtenerInfoEstado() {
    const yawGrados = Math.round((this._yaw * 180) / Math.PI) % 360;
    const pitchGrados = Math.round((this._pitch * 180) / Math.PI);
    return {
      yaw: yawGrados,
      pitch: pitchGrados,
      escala: Math.round(this._escala),
      modoPapel: this._modoPapel
    };
  }
}
