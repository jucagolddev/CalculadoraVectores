/**
 * Motor Gráfico Tridimensional para el Canvas HTML5.
 * Actúa como Orquestador/Fachada de alta cohesión delegando la proyección,
 * renderizado de ejes, plano de ingeniería y geometrías a submódulos especializados.
 * 
 * Submódulos desacoplados:
 * - CamaraOrbital3D: Modelo matemático y proyección esférica R3 -> R2.
 * - RenderizadorEjes3D: Ejes cartesianos R3 y malla espacial de suelo XY.
 * - RenderizadorPlanoPapel: Folio técnico de ingeniería milimetrado R2 c R3.
 * - RenderizadorGeometria3D: Trazado de vectores, proyecciones ortogonales y paralelogramos.
 */
import { CamaraOrbital3D } from './motor3d/CamaraOrbital3D.js';
import { RenderizadorEjes3D } from './motor3d/RenderizadorEjes3D.js';
import { RenderizadorPlanoPapel } from './motor3d/RenderizadorPlanoPapel.js';
import { RenderizadorGeometria3D } from './motor3d/RenderizadorGeometria3D.js';

export class MotorGrafico3D {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {Function} [alCambiarCamara]
   */
  constructor(canvas, alCambiarCamara = null) {
    this._canvas = canvas;
    this._ctx = canvas.getContext('2d');
    this._alCambiarCamara = alCambiarCamara;

    // Subsistema de Cámara Orbital y Proyección Espacial
    this._camara = new CamaraOrbital3D();

    // Estado del ciclo de interacción
    this._arrastrando = false;
    this._ultimoMouseX = 0;
    this._ultimoMouseY = 0;

    // Dimensiones lógicas de renderizado
    this._anchoLogico = 800;
    this._altoLogico = 600;

    // Elementos geométricos tridimensionales
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

  get yaw() { return this._camara.yaw; }
  get pitch() { return this._camara.pitch; }
  get escala() { return this._camara.escala; }
  get panX() { return this._camara.panX; }
  get panY() { return this._camara.panY; }

  establecerModoPapel(activo) {
    this._camara.establecerModoPapel(activo);
    this.renderizar();
    this._notificarCamara();
  }

  esModoPapel() {
    return this._camara.modoPapel;
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
      this._canvas.style.cursor = this.esModoPapel() ? 'move' : 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!this._activo || !this._arrastrando) return;
      const dx = e.clientX - this._ultimoMouseX;
      const dy = e.clientY - this._ultimoMouseY;

      if (this.esModoPapel()) {
        this._camara.aplicarPaneo(dx, dy);
      } else {
        this._camara.aplicarRotacion(dx, dy);
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
      this._camara.aplicarZoom(delta);
      this.renderizar();
      this._notificarCamara();
    }, { passive: false });

    window.addEventListener('resize', () => this.redimensionar());
  }

  _notificarCamara() {
    if (this._alCambiarCamara) {
      this._alCambiarCamara(this._camara.obtenerInfoEstado());
    }
  }

  /**
   * Proyecta un punto cartesiano 3D (x, y, z) a coordenadas 2D de pantalla.
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {{ px: number, py: number, profundidad: number }}
   */
  proyectar(x, y, z) {
    return this._camara.proyectar(x, y, z, this._anchoLogico, this._altoLogico);
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
    this._camara.centrarOrigen();
    this.renderizar();
    this._notificarCamara();
  }

  zoomIn() {
    this._camara.zoomIn();
    this.renderizar();
    this._notificarCamara();
  }

  zoomOut() {
    this._camara.zoomOut();
    this.renderizar();
    this._notificarCamara();
  }

  autoAjustar() {
    this._camara.autoAjustar(this._vectores, this._puntos, this._anchoLogico, this._altoLogico);
    this.renderizar();
    this._notificarCamara();
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

  renderizar() {
    if (!this._activo) return;

    const ctx = this._ctx;
    ctx.clearRect(0, 0, this._anchoLogico, this._altoLogico);

    const proyectar = (x, y, z) => this.proyectar(x, y, z);
    const dibujarFlecha = (x1, y1, x2, y2, col, tam) =>
      RenderizadorGeometria3D.dibujarPuntaFlecha2D(ctx, x1, y1, x2, y2, col, tam);
    const dibujarInsignia = (txt, x, y, col) =>
      RenderizadorGeometria3D.dibujarInsigniaEtiqueta(ctx, txt, x, y, col);

    // MODO PLANO: HOJA TÉCNICA DE INGENIERÍA
    if (this.esModoPapel()) {
      RenderizadorPlanoPapel.dibujarHojaPapel(
        ctx, this._anchoLogico, this._altoLogico, this._camara.escala, this._camara.panX, this._camara.panY
      );

      if (this._capas.cuadricula) {
        RenderizadorPlanoPapel.dibujarCuadriculaPapel(
          ctx, this._anchoLogico, this._altoLogico, this._camara.escala, this._camara.panX, this._camara.panY
        );
      }

      if (this._capas.ejes) {
        RenderizadorPlanoPapel.dibujarEjesPapel(
          ctx, this._anchoLogico, this._altoLogico, this._camara.escala, this._camara.panX, this._camara.panY,
          this._capas.etiquetas, dibujarFlecha
        );
      }

      if (this._capas.construcciones && this._poligonoParalelogramo && this._poligonoParalelogramo.length >= 4) {
        RenderizadorGeometria3D.dibujarParalelogramo3D(
          ctx, this._poligonoParalelogramo, proyectar, this._capas, dibujarInsignia
        );
      }

      if (this._capas.vectores) {
        RenderizadorGeometria3D.dibujarVectoresPapel(
          ctx, this._vectores, proyectar, this._capas, dibujarFlecha, dibujarInsignia
        );
      }

      if (this._capas.puntos) {
        RenderizadorGeometria3D.dibujarPuntos3D(ctx, this._puntos, proyectar, this._capas);
      }
      return;
    }

    // MODO 3D ORBITAL ESTÁNDAR
    this._dibujarFondoGradiente();

    if (this._capas.cuadricula) {
      RenderizadorEjes3D.dibujarMallaSueloXY(ctx, proyectar);
    }

    if (this._capas.ejes) {
      RenderizadorEjes3D.dibujarEjes3D(
        ctx, proyectar, this._camara.escala, this._capas.etiquetas, dibujarFlecha
      );
    }

    if (this._capas.construcciones && this._poligonoParalelogramo && this._poligonoParalelogramo.length >= 4) {
      RenderizadorGeometria3D.dibujarParalelogramo3D(
        ctx, this._poligonoParalelogramo, proyectar, this._capas, dibujarInsignia
      );
    }

    if (this._capas.proyecciones) {
      RenderizadorGeometria3D.dibujarProyeccionesSuelo(ctx, this._vectores, proyectar, this._capas);
    }

    if (this._capas.vectores) {
      RenderizadorGeometria3D.dibujarVectores3D(
        ctx, this._vectores, proyectar, this._capas, dibujarFlecha, dibujarInsignia
      );
    }

    if (this._capas.puntos) {
      RenderizadorGeometria3D.dibujarPuntos3D(ctx, this._puntos, proyectar, this._capas);
    }
  }
}
