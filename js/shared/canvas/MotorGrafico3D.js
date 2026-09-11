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
    this._modoPapel = false;
    this._iniciarEventos();
  }

  establecerModoPapel(activo) {
    this._modoPapel = Boolean(activo);
    if (this._modoPapel) {
      this._panX = 0;
      this._panY = 0;
    } else {
      this._yaw = -0.65;
      this._pitch = 0.48;
    }
    this.renderizar();
    this._notificarCamara();
  }

  esModoPapel() {
    return this._modoPapel;
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
      this._canvas.style.cursor = this._modoPapel ? 'move' : 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!this._activo || !this._arrastrando) return;
      const dx = e.clientX - this._ultimoMouseX;
      const dy = e.clientY - this._ultimoMouseY;

      if (this._modoPapel) {
        this._panX += dx;
        this._panY += dy;
      } else {
        this._yaw += dx * 0.008;
        this._pitch += dy * 0.008;

        // Limitar pitch para evitar inversión de cámara
        const limitePitch = Math.PI / 2 - 0.05;
        this._pitch = Math.max(-limitePitch, Math.min(limitePitch, this._pitch));
      }

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
        escala: Math.round(this._escala),
        modoPapel: this._modoPapel
      });
    }
  }

  /**
   * Proyecta un punto cartesiano 3D (x, y, z) a coordenadas de pantalla 2D.
   * En Modo Papel: Proyección ortogonal pura sobre el plano XY de la hoja de trabajo.
   * En Modo Orbital: Proyección axonométrica esférica 3D con Yaw y Pitch.
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {{ px: number, py: number, profundidad: number }}
   */
  proyectar(x, y, z) {
    const cx = this._anchoLogico / 2 + this._panX;
    const cy = this._altoLogico / 2 + this._panY;

    if (this._modoPapel) {
      return {
        px: cx + x * this._escala,
        py: cy - y * this._escala,
        profundidad: z
      };
    }

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

    if (this._modoPapel) {
      // 1. Hoja de Papel Técnico (Fondo y Folio con Márgenes)
      this._dibujarHojaPapel();

      // 2. Cuadrícula Milimetrada sobre el Papel
      if (this._capas.cuadricula) {
        this._dibujarCuadriculaPapel();
      }

      // 3. Ejes Coordenados sobre el Papel (+X, +Y y Eje Z perpendicular ⊙)
      if (this._capas.ejes) {
        this._dibujarEjesPapel();
      }

      // 4. Paralelogramo Sustentado en el Plano del Papel
      if (this._capas.construcciones && this._poligonoParalelogramo && this._poligonoParalelogramo.length >= 4) {
        this._dibujarParalelogramo3D(this._poligonoParalelogramo);
      }

      // 5. Vectores Proyectados sobre el Papel (con detección de cota normal)
      if (this._capas.vectores) {
        this._dibujarVectoresPapel();
      }

      // 6. Nodos de Puntos Fijos
      if (this._capas.puntos) {
        this._dibujarPuntos3D();
      }
      return;
    }

    // MODO 3D ORBITAL ESTÁNDAR
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

  _dibujarHojaPapel() {
    const ctx = this._ctx;
    const cx = this._anchoLogico / 2 + this._panX;
    const cy = this._altoLogico / 2 + this._panY;

    // Fondo oscuro de la mesa de trabajo
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, this._anchoLogico, this._altoLogico);

    // Dimensiones del folio técnico centrado en (cx, cy)
    const anchoFolio = Math.max(840, this._escala * 26);
    const altoFolio = Math.max(640, this._escala * 20);
    const x0 = cx - anchoFolio / 2;
    const y0 = cy - altoFolio / 2;

    ctx.save();
    // Sombra proyectada del folio sobre la mesa
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 12;

    // Cuerpo de la hoja de papel técnico (azul pizarra oscuro de ingeniería)
    ctx.fillStyle = '#090d1a';
    ctx.beginPath();
    ctx.roundRect(x0, y0, anchoFolio, altoFolio, 8);
    ctx.fill();

    // Borde exterior técnico de la hoja
    ctx.shadowBlur = 0;
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.28)';
    ctx.stroke();

    // Marco técnico perimetral interior
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x0 + 12, y0 + 12, anchoFolio - 24, altoFolio - 24);

    // Cabecera formal del plano técnico
    ctx.font = 'bold 10px var(--fuente-mono, monospace)';
    ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
    ctx.fillText('HOJA DE TRABAJO TÉCNICA: PLANO CARTESIANO ℝ² (z = 0)', x0 + 24, y0 + 26);

    ctx.fillStyle = 'rgba(56, 189, 248, 0.8)';
    ctx.fillText(`ESCALA: 1 u = ${Math.round(this._escala)} px | EJE NORMAL Z ⊙`, x0 + anchoFolio - 260, y0 + 26);

    // Cajetín técnico en la esquina inferior derecha
    const anchoCajetin = 260;
    const altoCajetin = 42;
    const xCajetin = x0 + anchoFolio - anchoCajetin - 16;
    const yCajetin = y0 + altoFolio - altoCajetin - 16;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
    ctx.beginPath();
    ctx.roundRect(xCajetin, yCajetin, anchoCajetin, altoCajetin, 4);
    ctx.fill();
    ctx.stroke();

    ctx.font = '9px var(--fuente-mono, monospace)';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('PROYECCIÓN PLANA ORTOGONAL', xCajetin + 10, yCajetin + 16);
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('MODO PAPEL TÉCNICO ℝ² ⊂ ℝ³', xCajetin + 10, yCajetin + 32);

    ctx.restore();
  }

  _dibujarCuadriculaPapel() {
    const ctx = this._ctx;
    const cx = this._anchoLogico / 2 + this._panX;
    const cy = this._altoLogico / 2 + this._panY;

    const anchoFolio = Math.max(840, this._escala * 26);
    const altoFolio = Math.max(640, this._escala * 20);
    const x0 = cx - anchoFolio / 2;
    const y0 = cy - altoFolio / 2;

    ctx.save();
    ctx.beginPath();
    ctx.rect(x0, y0, anchoFolio, altoFolio);
    ctx.clip();

    const pasoMayor = this._escala;
    const pasoMenor = this._escala / 5;

    if (pasoMenor >= 4) {
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = cx % pasoMenor; x <= x0 + anchoFolio; x += pasoMenor) {
        if (x >= x0) {
          ctx.moveTo(x, y0);
          ctx.lineTo(x, y0 + altoFolio);
        }
      }
      for (let y = cy % pasoMenor; y <= y0 + altoFolio; y += pasoMenor) {
        if (y >= y0) {
          ctx.moveTo(x0, y);
          ctx.lineTo(x0 + anchoFolio, y);
        }
      }
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = cx % pasoMayor; x <= x0 + anchoFolio; x += pasoMayor) {
      if (x >= x0) {
        ctx.moveTo(x, y0);
        ctx.lineTo(x, y0 + altoFolio);
      }
    }
    for (let y = cy % pasoMayor; y <= y0 + altoFolio; y += pasoMayor) {
      if (y >= y0) {
        ctx.moveTo(x0, y);
        ctx.lineTo(x0 + anchoFolio, y);
      }
    }
    ctx.stroke();
    ctx.restore();
  }

  _dibujarEjesPapel() {
    const ctx = this._ctx;
    const cx = this._anchoLogico / 2 + this._panX;
    const cy = this._altoLogico / 2 + this._panY;

    const anchoFolio = Math.max(840, this._escala * 26);
    const altoFolio = Math.max(640, this._escala * 20);
    const x0 = cx - anchoFolio / 2;
    const y0 = cy - altoFolio / 2;

    ctx.save();
    ctx.beginPath();
    ctx.rect(x0, y0, anchoFolio, altoFolio);
    ctx.clip();

    // Eje X Positivo (Rojo)
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x0 + anchoFolio - 25, cy);
    ctx.stroke();
    this._dibujarPuntaFlecha2D(cx, cy, x0 + anchoFolio - 25, cy, '#ef4444', 9);

    // Eje X Negativo (Discontinuo)
    ctx.setLineDash([3, 4]);
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x0 + 44, cy);
    ctx.stroke();
    ctx.setLineDash([]);

    // Eje Y Positivo (Verde)
    ctx.strokeStyle = '#10b981';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx, y0 + 35);
    ctx.stroke();
    this._dibujarPuntaFlecha2D(cx, cy, cx, y0 + 35, '#10b981', 9);

    // Eje Y Negativo (Discontinuo)
    ctx.setLineDash([3, 4]);
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.35)';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx, y0 + altoFolio - 25);
    ctx.stroke();
    ctx.setLineDash([]);

    // Graduación métrica y marcas numéricas de escala
    const pasoPapel = this._escala >= 26 ? 1 : (this._escala >= 14 ? 2 : 5);
    ctx.font = '9px var(--fuente-mono, monospace)';

    // Marcas numéricas en Eje X
    const limIzqX = Math.floor((x0 - cx) / this._escala);
    const limDerX = Math.ceil((x0 + anchoFolio - cx) / this._escala);
    for (let k = limIzqX; k <= limDerX; k++) {
      if (k === 0 || k % pasoPapel !== 0) continue;
      const px = cx + k * this._escala;
      if (px < x0 + 18 || px > x0 + anchoFolio - 35) continue;

      ctx.lineWidth = 1;
      ctx.strokeStyle = k > 0 ? '#ef4444' : 'rgba(239, 68, 68, 0.45)';
      ctx.beginPath();
      ctx.moveTo(px, cy - 3.5);
      ctx.lineTo(px, cy + 3.5);
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = k > 0 ? '#fca5a5' : 'rgba(248, 113, 113, 0.6)';
      ctx.fillText(k.toString(), px, cy + 12);
    }

    // Marcas numéricas en Eje Y
    const limInfY = Math.floor((cy - (y0 + altoFolio)) / this._escala);
    const limSupY = Math.ceil((cy - y0) / this._escala);
    for (let k = limInfY; k <= limSupY; k++) {
      if (k === 0 || k % pasoPapel !== 0) continue;
      const py = cy - k * this._escala;
      if (py < y0 + 35 || py > y0 + altoFolio - 18) continue;

      ctx.lineWidth = 1;
      ctx.strokeStyle = k > 0 ? '#10b981' : 'rgba(16, 185, 129, 0.45)';
      ctx.beginPath();
      ctx.moveTo(cx - 3.5, py);
      ctx.lineTo(cx + 3.5, py);
      ctx.stroke();

      ctx.textAlign = 'right';
      ctx.fillStyle = k > 0 ? '#6ee7b7' : 'rgba(52, 211, 153, 0.6)';
      ctx.fillText(k.toString(), cx - 6, py + 3);
    }

    // Origen 0
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
    ctx.fillText('0', cx - 6, cy + 12);

    // Etiquetas de los ejes
    if (this._capas.etiquetas) {
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillStyle = '#ef4444';
      ctx.fillText('Eje X (+i)', x0 + anchoFolio - 70, cy - 8);

      ctx.fillStyle = '#10b981';
      ctx.fillText('Eje Y (+j)', cx + 10, y0 + 45);

      // Eje Z en el origen (Símbolo de física perpendicular al papel)
      ctx.fillStyle = 'rgba(139, 92, 246, 0.2)';
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Punto central ⊙
      ctx.fillStyle = '#8b5cf6';
      ctx.beginPath();
      ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = 'bold 10px Inter, sans-serif';
      ctx.fillText('Eje Z ⊙ (+k)', cx + 14, cy + 18);
    }

    ctx.restore();
  }

  _dibujarVectoresPapel() {
    const ctx = this._ctx;

    this._vectores.forEach(v => {
      const orig = this.proyectar(v.origen.x, v.origen.y, 0);
      const ext = this.proyectar(v.extremo.x, v.extremo.y, 0);
      const esProductoCruz = v.etiqueta.includes('×');
      const dist2D = Math.hypot(ext.px - orig.px, ext.py - orig.py);

      ctx.save();
      ctx.lineWidth = esProductoCruz ? 3.5 : 2.6;
      ctx.strokeStyle = v.color;
      ctx.fillStyle = v.color;
      ctx.shadowColor = v.color;
      ctx.shadowBlur = esProductoCruz ? 12 : 6;

      if (dist2D < 2) {
        // Vector puramente perpendicular al papel (como u × v en el plano XY)
        ctx.shadowBlur = 0;
        const radio = 14;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(orig.px, orig.py, radio, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = v.color;
        if (v.z >= 0) {
          // ⊙ Saliendo del papel
          ctx.beginPath();
          ctx.arc(orig.px, orig.py, 3.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // ⊗ Entrando al papel
          const d = 8;
          ctx.beginPath();
          ctx.moveTo(orig.px - d, orig.py - d);
          ctx.lineTo(orig.px + d, orig.py + d);
          ctx.moveTo(orig.px + d, orig.py - d);
          ctx.lineTo(orig.px - d, orig.py + d);
          ctx.stroke();
        }

        if (this._capas.etiquetas) {
          const mod = Math.hypot(v.x, v.y, v.z);
          const modStr = Number.isInteger(mod) ? mod.toString() : mod.toFixed(2);
          const sentido = v.z >= 0 ? '⊙ Hacia afuera' : '⊗ Hacia adentro';
          this._dibujarInsigniaEtiqueta(
            `${v.etiqueta}: z=${v.z} (${sentido}) | |${v.etiqueta}| = ${modStr} u`,
            orig.px + 18, orig.py - 14, v.color
          );
        }
      } else {
        // Vector con proyección sobre el papel
        ctx.beginPath();
        ctx.moveTo(orig.px, orig.py);
        ctx.lineTo(ext.px, ext.py);
        ctx.stroke();

        ctx.shadowBlur = 0;
        this._dibujarPuntaFlecha2D(orig.px, orig.py, ext.px, ext.py, v.color, esProductoCruz ? 12 : 10);

        if (this._capas.etiquetas) {
          const midX = (orig.px + ext.px) / 2;
          const midY = (orig.py + ext.py) / 2;
          const mod = Math.hypot(v.x, v.y, v.z);
          const modStr = Number.isInteger(mod) ? mod.toString() : mod.toFixed(2);
          const infoCota = v.z !== 0 ? ` (z=${v.z > 0 ? '+' : ''}${v.z})` : '';
          this._dibujarInsigniaEtiqueta(
            `${v.etiqueta}: (${v.x}, ${v.y})${infoCota} | |${v.etiqueta}| = ${modStr} u`,
            midX + 10, midY - 10, v.color
          );
        }
      }
      ctx.restore();
    });
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
      { id: 'X', fin: this.proyectar(lEje, 0, 0), color: '#ef4444', colorTexto: '#fca5a5', dir: { x: 1, y: 0, z: 0 }, etiqueta: 'Eje X (+i)' },
      { id: 'Y', fin: this.proyectar(0, lEje, 0), color: '#10b981', colorTexto: '#6ee7b7', dir: { x: 0, y: 1, z: 0 }, etiqueta: 'Eje Y (+j)' },
      { id: 'Z', fin: this.proyectar(0, 0, lEje), color: '#8b5cf6', colorTexto: '#c4b5fd', dir: { x: 0, y: 0, z: 1 }, etiqueta: 'Eje Z (+k)' }
    ];

    const paso = this._escala >= 26 ? 1 : (this._escala >= 14 ? 2 : 5);

    // Ejes negativos discontinuos con marcas métricas sutiles
    ctx.save();
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 4]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    [
      { id: '-X', dir: { x: -1, y: 0, z: 0 } },
      { id: '-Y', dir: { x: 0, y: -1, z: 0 } },
      { id: '-Z', dir: { x: 0, y: 0, z: -1 } }
    ].forEach(ejeNeg => {
      const pNeg = this.proyectar(ejeNeg.dir.x * lEje, ejeNeg.dir.y * lEje, ejeNeg.dir.z * lEje);
      ctx.beginPath();
      ctx.moveTo(o.px, o.py);
      ctx.lineTo(pNeg.px, pNeg.py);
      ctx.stroke();

      const dx = pNeg.px - o.px;
      const dy = pNeg.py - o.py;
      const len = Math.hypot(dx, dy);
      if (len > 0.001) {
        const nx = -dy / len;
        const ny = dx / len;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        for (let k = paso; k <= lEje - 1; k += paso) {
          const pk = this.proyectar(ejeNeg.dir.x * k, ejeNeg.dir.y * k, ejeNeg.dir.z * k);
          ctx.beginPath();
          ctx.moveTo(pk.px - 2.5 * nx, pk.py - 2.5 * ny);
          ctx.lineTo(pk.px + 2.5 * nx, pk.py + 2.5 * ny);
          ctx.stroke();
        }
      }
    });
    ctx.restore();

    // Ejes positivos sólidos con graduación métrica y etiquetas numéricas
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

      // Vector normal unitario en pantalla para trazar ticks ortogonales
      const dx = eje.fin.px - o.px;
      const dy = eje.fin.py - o.py;
      const len = Math.hypot(dx, dy);
      const nx = len > 0.001 ? -dy / len : 0;
      const ny = len > 0.001 ? dx / len : 0;

      // Graduación métrica (Ticks numéricos de unidad)
      ctx.font = '9px var(--fuente-mono, monospace)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let k = paso; k <= lEje - 1; k += paso) {
        const pk = this.proyectar(eje.dir.x * k, eje.dir.y * k, eje.dir.z * k);

        // Tick perpendicular a la proyección del eje
        ctx.lineWidth = 1.3;
        ctx.strokeStyle = eje.color;
        ctx.beginPath();
        ctx.moveTo(pk.px - 3.5 * nx, pk.py - 3.5 * ny);
        ctx.lineTo(pk.px + 3.5 * nx, pk.py + 3.5 * ny);
        ctx.stroke();

        // Número de la medida
        if (this._capas.etiquetas) {
          ctx.fillStyle = eje.colorTexto;
          const posTextoX = pk.px + 9 * nx;
          const posTextoY = pk.py + 9 * ny;
          ctx.fillText(k.toString(), posTextoX, posTextoY);
        }
      }

      // Etiqueta formal del eje (+X, +Y, +Z)
      if (this._capas.etiquetas) {
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.fillStyle = eje.color;
        const normDx = len > 0.001 ? dx / len : 1;
        const normDy = len > 0.001 ? dy / len : 0;
        ctx.fillText(eje.etiqueta, eje.fin.px + 12 * normDx, eje.fin.py + 12 * normDy);
      }
      ctx.restore();
    });

    // Origen 0 en pantalla
    if (this._capas.etiquetas) {
      ctx.save();
      ctx.font = '9px var(--fuente-mono, monospace)';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.fillText('0', o.px - 7, o.py + 9);
      ctx.restore();
    }
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

    // Medida del área superficial en el centroide del paralelogramo
    if (this._capas.etiquetas && pts.length >= 4) {
      const p0 = pts[0];
      const p1 = pts[1];
      const p3 = pts[3];
      const v1 = { x: p1.x - p0.x, y: p1.y - p0.y, z: p1.z - p0.z };
      const v2 = { x: p3.x - p0.x, y: p3.y - p0.y, z: p3.z - p0.z };
      const cruzX = v1.y * v2.z - v1.z * v2.y;
      const cruzY = v1.z * v2.x - v1.x * v2.z;
      const cruzZ = v1.x * v2.y - v1.y * v2.x;
      const area = Math.hypot(cruzX, cruzY, cruzZ);

      if (area > 0.05) {
        const centroide = this.proyectar(
          (pts[0].x + pts[1].x + pts[2].x + pts[3].x) / 4,
          (pts[0].y + pts[1].y + pts[2].y + pts[3].y) / 4,
          (pts[0].z + pts[1].z + pts[2].z + pts[3].z) / 4
        );
        const areaStr = Number.isInteger(area) ? area.toString() : area.toFixed(2);
        this._dibujarInsigniaEtiqueta(`Área = ${areaStr} u²`, centroide.px, centroide.py, '#c084fc');
      }
    }
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

      // Cotas de medida espacial
      if (this._capas.etiquetas && Math.abs(ext.z) >= 0.5) {
        ctx.save();
        ctx.font = '8px var(--fuente-mono, monospace)';
        ctx.fillStyle = '#c4b5fd';
        const midVertX = (pExt.px + pSuelo.px) / 2;
        const midVertY = (pExt.py + pSuelo.py) / 2;
        ctx.fillText(`z=${ext.z > 0 ? '+' : ''}${ext.z}`, midVertX + 4, midVertY);
        ctx.restore();
      }
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

      // Etiqueta del vector con coordenadas y medida de la norma euclídea
      if (this._capas.etiquetas) {
        const midX = (orig.px + ext.px) / 2;
        const midY = (orig.py + ext.py) / 2;
        const mod = Math.hypot(v.x, v.y, v.z);
        const modStr = Number.isInteger(mod) ? mod.toString() : mod.toFixed(2);
        this._dibujarInsigniaEtiqueta(
          `${v.etiqueta}: (${v.x}, ${v.y}, ${v.z}) | |${v.etiqueta}| = ${modStr} u`,
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
