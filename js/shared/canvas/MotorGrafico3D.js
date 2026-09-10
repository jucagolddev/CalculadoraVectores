/**
 * Motor de Renderizado Tridimensional (Axonométrico / Proyección Esférica) en HTML5 Canvas 2D.
 * Implementa rotación orbital interactiva con ratón (Yaw y Pitch), zoom métrico,
 * planos de proyección discontinuos y trazado de vectores en ℝ³.
 */
export class MotorGrafico3D {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {Function} [alCambiarCamara]
   */
  constructor(canvas, alCambiarCamara = null) {
    this._canvas = canvas;
    this._ctx = canvas.getContext('2d');
    this._alCambiarCamara = alCambiarCamara;

    // Parámetros de Cámara Orbital
    this._yaw = -0.65;   // ~ -37° rotación horizontal
    this._pitch = 0.48;  // ~ 27.5° elevación vertical
    this._escala = 28;   // Píxeles por unidad espacial
    this._panX = 0;
    this._panY = 0;

    // Control de interacción
    this._arrastrando = false;
    this._ultimoMouseX = 0;
    this._ultimoMouseY = 0;

    // Elementos a renderizar
    this._vectores = [];
    this._puntos = [];
    this._poligonoParalelogramo = null;

    // Filtros de Capa del HUD
    this._capas = {
      vectores: true,
      puntos: true,
      etiquetas: true,
      construcciones: true,
      proyecciones: true,
      cuadricula: true,
      ejes: true
    };

    this._activo = false;
    this._iniciarEventos();
  }

  establecerActivo(activo) {
    this._activo = Boolean(activo);
    if (this._activo) {
      this._canvas.style.cursor = 'grab';
      this.redimensionar();
      this.renderizar();
      this._notificarCamara();
    }
  }

  redimensionar() {
    if (!this._canvas) return;
    const contenedor = this._canvas.parentElement;
    const dpr = window.devicePixelRatio || 1;
    const ancho = contenedor ? contenedor.clientWidth : window.innerWidth;
    const alto = contenedor ? contenedor.clientHeight : window.innerHeight;

    this._canvas.width = ancho * dpr;
    this._canvas.height = alto * dpr;
    this._anchoLogico = ancho;
    this._altoLogico = alto;

    this._ctx.scale(dpr, dpr);
    if (this._activo) {
      this.renderizar();
    }
  }

  _iniciarEventos() {
    this._canvas.addEventListener('mousedown', (e) => {
      if (!this._activo) return;
      this._arrastrando = true;
      this._ultimoMouseX = e.clientX;
      this._ultimoMouseY = e.clientY;
      this._canvas.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!this._activo || !this._arrastrando) return;
      const dx = e.clientX - this._ultimoMouseX;
      const dy = e.clientY - this._ultimoMouseY;

      this._yaw += dx * 0.008;
      this._pitch += dy * 0.008;

      // Limitar pitch para evitar inversión de cámara
      const limitePitch = Math.PI / 2 - 0.05;
      this._pitch = Math.max(-limitePitch, Math.min(limitePitch, this._pitch));

      this._ultimoMouseX = e.clientX;
      this._ultimoMouseY = e.clientY;

      this.renderizar();
      this._notificarCamara();
    });

    window.addEventListener('mouseup', () => {
      if (this._arrastrando) {
        this._arrastrando = false;
        if (this._activo) {
          this._canvas.style.cursor = 'grab';
        }
      }
    });

    this._canvas.addEventListener('wheel', (e) => {
      if (!this._activo) return;
      e.preventDefault();
      const delta = e.deltaY < 0 ? 1.15 : 0.85;
      this._escala = Math.max(8, Math.min(120, this._escala * delta));
      this.renderizar();
      this._notificarCamara();
    }, { passive: false });

    window.addEventListener('resize', () => this.redimensionar());
  }

  _notificarCamara() {
    if (this._alCambiarCamara) {
      const yawGrados = Math.round((this._yaw * 180) / Math.PI) % 360;
      const pitchGrados = Math.round((this._pitch * 180) / Math.PI);
      this._alCambiarCamara({
        yaw: yawGrados,
        pitch: pitchGrados,
        escala: Math.round(this._escala)
      });
    }
  }

  /**
   * Proyecta un punto cartesiano 3D (x, y, z) a coordenadas de pantalla 2D.
   * Convención física: Z es vertical hacia arriba; X e Y definen el plano horizontal.
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {{ px: number, py: number, profundidad: number }}
   */
  proyectar(x, y, z) {
    // 1. Rotación Yaw alrededor del eje vertical Z
    const cosY = Math.cos(this._yaw);
    const sinY = Math.sin(this._yaw);
    const x1 = x * cosY - y * sinY;
    const y1 = x * sinY + y * cosY;
    const z1 = z;

    // 2. Rotación Pitch sobre el plano visual
    const cosP = Math.cos(this._pitch);
    const sinP = Math.sin(this._pitch);
    const x2 = x1;
    const y2 = y1 * cosP - z1 * sinP;
    const z2 = y1 * sinP + z1 * cosP;

    // 3. Proyección a pantalla centrada en el canvas
    const cx = this._anchoLogico / 2 + this._panX;
    const cy = this._altoLogico / 2 + this._panY;

    return {
      px: cx + x2 * this._escala,
      py: cy - z2 * this._escala,
      profundidad: y2
    };
  }

  actualizarElementos(vectores = [], puntos = [], poligono = null) {
    this._vectores = vectores;
    this._puntos = puntos;
    this._poligonoParalelogramo = poligono;
    this.renderizar();
  }

  establecerCapas(nuevasCapas) {
    this._capas = { ...this._capas, ...nuevasCapas };
    this.renderizar();
  }

  centrarOrigen() {
    this._yaw = -0.65;
    this._pitch = 0.48;
    this._escala = 28;
    this._panX = 0;
    this._panY = 0;
    this.renderizar();
    this._notificarCamara();
  }

  zoomIn() {
    this._escala = Math.min(120, this._escala * 1.25);
    this.renderizar();
    this._notificarCamara();
  }

  zoomOut() {
    this._escala = Math.max(8, this._escala * 0.8);
    this.renderizar();
    this._notificarCamara();
  }

  autoAjustar() {
    if (this._vectores.length === 0 && this._puntos.length === 0) {
      this.centrarOrigen();
      return;
    }

    let maxDist = 4;
    this._vectores.forEach(v => {
      const d = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
      if (d > maxDist) maxDist = d;
    });

    const dimensionMin = Math.min(this._anchoLogico, this._altoLogico);
    this._escala = Math.max(12, Math.min(60, (dimensionMin * 0.35) / maxDist));
    this.renderizar();
    this._notificarCamara();
  }

  renderizar() {
    if (!this._activo) return;

    const ctx = this._ctx;
    ctx.clearRect(0, 0, this._anchoLogico, this._altoLogico);

    // Fondo espacial sutil
    this._dibujarFondoGradiente();

    // 1. Malla de Suelo XY (z = 0)
    if (this._capas.cuadricula) {
      this._dibujarMallaSueloXY();
    }

    // 2. Ejes Coordenados Tridimensionales X, Y, Z
    if (this._capas.ejes) {
      this._dibujarEjes3D();
    }

    // 3. Paralelogramo Sustentado (Área del Producto Vectorial)
    if (this._capas.construcciones && this._poligonoParalelogramo && this._poligonoParalelogramo.length >= 4) {
      this._dibujarParalelogramo3D(this._poligonoParalelogramo);
    }

    // 4. Proyecciones Verticales Ortogonales hacia el Plano XY
    if (this._capas.proyecciones) {
      this._dibujarProyeccionesSuelo();
    }

    // 5. Vectores Tridimensionales
    if (this._capas.vectores) {
      this._dibujarVectores3D();
    }

    // 6. Nodos de Puntos Fijos
    if (this._capas.puntos) {
      this._dibujarPuntos3D();
    }
  }

  _dibujarFondoGradiente() {
    const ctx = this._ctx;
    const grad = ctx.createRadialGradient(
      this._anchoLogico / 2, this._altoLogico / 2, 80,
      this._anchoLogico / 2, this._altoLogico / 2, Math.max(this._anchoLogico, this._altoLogico) * 0.75
    );
    grad.addColorStop(0, 'rgba(15, 23, 42, 0.4)');
    grad.addColorStop(1, 'rgba(2, 6, 23, 0.95)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, this._anchoLogico, this._altoLogico);
  }

  _dibujarMallaSueloXY() {
    const ctx = this._ctx;
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';

    const rango = 8;
    for (let i = -rango; i <= rango; i++) {
      // Líneas paralelas a Y
      const p1 = this.proyectar(i, -rango, 0);
      const p2 = this.proyectar(i, rango, 0);
      ctx.beginPath();
      ctx.moveTo(p1.px, p1.py);
      ctx.lineTo(p2.px, p2.py);
      ctx.stroke();

      // Líneas paralelas a X
      const p3 = this.proyectar(-rango, i, 0);
      const p4 = this.proyectar(rango, i, 0);
      ctx.beginPath();
      ctx.moveTo(p3.px, p3.py);
      ctx.lineTo(p4.px, p4.py);
      ctx.stroke();
    }
    ctx.restore();
  }

  _dibujarEjes3D() {
    const ctx = this._ctx;
    const lEje = 9;
    const o = this.proyectar(0, 0, 0);

    const ejes = [
      { id: 'X', fin: this.proyectar(lEje, 0, 0), color: '#ef4444', unitario: this.proyectar(1, 0, 0), etiqueta: 'Eje X (+i)' },
      { id: 'Y', fin: this.proyectar(0, lEje, 0), color: '#10b981', unitario: this.proyectar(0, 1, 0), etiqueta: 'Eje Y (+j)' },
      { id: 'Z', fin: this.proyectar(0, 0, lEje), color: '#8b5cf6', unitario: this.proyectar(0, 0, 1), etiqueta: 'Eje Z (+k)' }
    ];

    // Ejes negativos discontinuos
    ctx.save();
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 4]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    [
      this.proyectar(-lEje, 0, 0),
      this.proyectar(0, -lEje, 0),
      this.proyectar(0, 0, -lEje)
    ].forEach(pNeg => {
      ctx.beginPath();
      ctx.moveTo(o.px, o.py);
      ctx.lineTo(pNeg.px, pNeg.py);
      ctx.stroke();
    });
    ctx.restore();

    // Ejes positivos sólidos
    ejes.forEach(eje => {
      ctx.save();
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = eje.color;
      ctx.fillStyle = eje.color;

      // Línea principal del semieje
      ctx.beginPath();
      ctx.moveTo(o.px, o.py);
      ctx.lineTo(eje.fin.px, eje.fin.py);
      ctx.stroke();

      // Flecha terminal del eje
      this._dibujarPuntaFlecha2D(o.px, o.py, eje.fin.px, eje.fin.py, eje.color, 9);

      // Etiqueta del eje
      if (this._capas.etiquetas) {
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.fillText(eje.id, eje.fin.px + 8, eje.fin.py - 6);
      }
      ctx.restore();
    });
  }

  _dibujarParalelogramo3D(pts) {
    const ctx = this._ctx;
    const proys = pts.map(p => this.proyectar(p.x, p.y, p.z));

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(proys[0].px, proys[0].py);
    for (let i = 1; i < proys.length; i++) {
      ctx.lineTo(proys[i].px, proys[i].py);
    }
    ctx.closePath();

    ctx.fillStyle = 'rgba(192, 132, 252, 0.18)';
    ctx.fill();

    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(192, 132, 252, 0.75)';
    ctx.stroke();
    ctx.restore();
  }

  _dibujarProyeccionesSuelo() {
    const ctx = this._ctx;
    ctx.save();
    ctx.setLineDash([3, 3]);
    ctx.lineWidth = 1.2;

    this._vectores.forEach(v => {
      const ext = v.extremo;
      const pExt = this.proyectar(ext.x, ext.y, ext.z);
      const pSuelo = this.proyectar(ext.x, ext.y, 0);
      const pX = this.proyectar(ext.x, 0, 0);
      const pY = this.proyectar(0, ext.y, 0);
      const pZ = this.proyectar(0, 0, ext.z);

      // Traza vertical hacia el suelo (z = 0)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
      ctx.beginPath();
      ctx.moveTo(pExt.px, pExt.py);
      ctx.lineTo(pSuelo.px, pSuelo.py);
      ctx.stroke();

      // Proyección horizontal del suelo hacia X e Y
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.beginPath();
      ctx.moveTo(pSuelo.px, pSuelo.py);
      ctx.lineTo(pX.px, pX.py);
      ctx.moveTo(pSuelo.px, pSuelo.py);
      ctx.lineTo(pY.px, pY.py);
      ctx.stroke();

      // Proyección hacia el eje vertical Z
      ctx.beginPath();
      ctx.moveTo(pExt.px, pExt.py);
      ctx.lineTo(pZ.px, pZ.py);
      ctx.stroke();
    });

    ctx.restore();
  }

  _dibujarVectores3D() {
    const ctx = this._ctx;

    this._vectores.forEach(v => {
      const orig = this.proyectar(v.origen.x, v.origen.y, v.origen.z);
      const ext = this.proyectar(v.extremo.x, v.extremo.y, v.extremo.z);

      ctx.save();
      const esProductoCruz = v.etiqueta.includes('×');
      ctx.lineWidth = esProductoCruz ? 3.5 : 2.6;
      ctx.strokeStyle = v.color;
      ctx.fillStyle = v.color;

      // Glow sutil para el vector
      ctx.shadowColor = v.color;
      ctx.shadowBlur = esProductoCruz ? 12 : 6;

      // Línea del vector
      ctx.beginPath();
      ctx.moveTo(orig.px, orig.py);
      ctx.lineTo(ext.px, ext.py);
      ctx.stroke();

      // Punta de flecha
      ctx.shadowBlur = 0;
      this._dibujarPuntaFlecha2D(orig.px, orig.py, ext.px, ext.py, v.color, esProductoCruz ? 12 : 10);

      // Etiqueta del vector
      if (this._capas.etiquetas) {
        const midX = (orig.px + ext.px) / 2;
        const midY = (orig.py + ext.py) / 2;
        this._dibujarInsigniaEtiqueta(
          `${v.etiqueta}: (${v.x}, ${v.y}, ${v.z})`,
          midX + 10, midY - 10, v.color
        );
      }

      ctx.restore();
    });
  }

  _dibujarPuntos3D() {
    const ctx = this._ctx;
    this._puntos.forEach(p => {
      const proy = this.proyectar(p.x, p.y, p.z);
      ctx.save();
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(proy.px, proy.py, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      if (this._capas.etiquetas) {
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${p.id}(${p.x}, ${p.y}, ${p.z})`, proy.px + 8, proy.py - 6);
      }
      ctx.restore();
    });
  }

  _dibujarPuntaFlecha2D(x1, y1, x2, y2, color, tamaño = 10) {
    const ctx = this._ctx;
    const angulo = Math.atan2(y2 - y1, x2 - x1);

    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(
      x2 - tamaño * Math.cos(angulo - Math.PI / 6),
      y2 - tamaño * Math.sin(angulo - Math.PI / 6)
    );
    ctx.lineTo(
      x2 - tamaño * Math.cos(angulo + Math.PI / 6),
      y2 - tamaño * Math.sin(angulo + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  _dibujarInsigniaEtiqueta(texto, x, y, colorBorde) {
    const ctx = this._ctx;
    ctx.save();
    ctx.font = '10px var(--fuente-mono, monospace)';
    const metrica = ctx.measureText(texto);
    const paddingX = 6;
    const paddingY = 3;
    const ancho = metrica.width + paddingX * 2;
    const alto = 16;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.strokeStyle = colorBorde;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.roundRect(x - paddingX, y - alto + paddingY, ancho, alto, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.fillText(texto, x, y - 2);
    ctx.restore();
  }
}
