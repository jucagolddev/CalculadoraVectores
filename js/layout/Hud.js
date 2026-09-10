import { FormateadorMatematico } from '../shared/utils/FormateadorMatematico.js';

/**
 * Componente estructural del HUD y controles flotantes del escenario gráfico
 */
export class Hud {
  /**
   * @param {Object} elementosHUD
   * @param {HTMLElement} [elementosHUD.textoCoords]
   * @param {HTMLButtonElement} [elementosHUD.btnToggleTodo]
   * @param {HTMLButtonElement} [elementosHUD.btnVectores]
   * @param {HTMLButtonElement} [elementosHUD.btnPuntos]
   * @param {HTMLButtonElement} [elementosHUD.btnEtiquetas]
   * @param {HTMLButtonElement} [elementosHUD.btnConstrucciones]
   * @param {HTMLButtonElement} [elementosHUD.btnProyecciones]
   * @param {HTMLButtonElement} [elementosHUD.btnCuadricula]
   * @param {HTMLButtonElement} [elementosHUD.btnEjes]
   * @param {HTMLButtonElement} [elementosHUD.btnZoomIn]
   * @param {HTMLButtonElement} [elementosHUD.btnZoomOut]
   * @param {HTMLButtonElement} [elementosHUD.btnCentrar]
   * @param {HTMLButtonElement} [elementosHUD.btnAjustar]
   * @param {HTMLButtonElement} [elementosHUD.btnExportar]
   * @param {PlanoCartesiano} plano
   * @param {EstadoApp} estadoApp
   * @param {MotorGrafico3D} [motor3D]
   */
  constructor(elementosHUD, plano, estadoApp, motor3D = null) {
    this._elementos = elementosHUD;
    this._plano = plano;
    this._estadoApp = estadoApp;
    this._motor3D = motor3D;

    this._inicializar();
  }

  _es3D() {
    return this._estadoApp.obtener().entornoActivo === 'espacio-3d';
  }

  actualizarCoordenadas3D(info) {
    if (this._elementos.textoCoords && this._es3D()) {
      this._elementos.textoCoords.textContent = `Yaw: ${info.yaw}°, Pitch: ${info.pitch}° | Zoom: ${info.escala}px/u`;
    }
  }

  _inicializar() {
    this._plano.alMoverCursor((x, y) => {
      if (this._elementos.textoCoords && !this._es3D()) {
        this._elementos.textoCoords.textContent = `X: ${FormateadorMatematico.formatearNumero(x)}, Y: ${FormateadorMatematico.formatearNumero(y)}`;
      }
    });

    // Control Maestro: Alternar todos los elementos geométricos del grafo
    if (this._elementos.btnToggleTodo) {
      this._elementos.btnToggleTodo.addEventListener('click', () => {
        const nuevoEstado = this._plano.alternarTodoElGrafo();
        if (this._motor3D) {
          this._motor3D.establecerCapas({
            vectores: nuevoEstado,
            puntos: nuevoEstado,
            etiquetas: nuevoEstado,
            construcciones: nuevoEstado,
            proyecciones: nuevoEstado
          });
        }
        this._sincronizarBotonesCapas(nuevoEstado);
      });
    }

    // Controles de capas individuales
    if (this._elementos.btnVectores) {
      this._elementos.btnVectores.addEventListener('click', () => {
        const activo = this._elementos.btnVectores.classList.toggle('activo');
        this._plano.establecerVectoresVisibles(activo);
        if (this._motor3D) this._motor3D.establecerCapas({ vectores: activo });
        this._actualizarEstadoBotonMaestro();
      });
    }

    if (this._elementos.btnPuntos) {
      this._elementos.btnPuntos.addEventListener('click', () => {
        const activo = this._elementos.btnPuntos.classList.toggle('activo');
        this._plano.establecerPuntosVisibles(activo);
        if (this._motor3D) this._motor3D.establecerCapas({ puntos: activo });
        this._actualizarEstadoBotonMaestro();
      });
    }

    if (this._elementos.btnEtiquetas) {
      this._elementos.btnEtiquetas.addEventListener('click', () => {
        const activo = this._elementos.btnEtiquetas.classList.toggle('activo');
        this._plano.establecerEtiquetasVisibles(activo);
        if (this._motor3D) this._motor3D.establecerCapas({ etiquetas: activo });
      });
    }

    if (this._elementos.btnConstrucciones) {
      this._elementos.btnConstrucciones.addEventListener('click', () => {
        const activo = this._elementos.btnConstrucciones.classList.toggle('activo');
        this._plano.establecerConstruccionesVisibles(activo);
        if (this._motor3D) this._motor3D.establecerCapas({ construcciones: activo });
        this._actualizarEstadoBotonMaestro();
      });
    }

    if (this._elementos.btnProyecciones) {
      this._elementos.btnProyecciones.addEventListener('click', () => {
        const activo = this._elementos.btnProyecciones.classList.toggle('activo');
        this._plano.establecerProyeccionesVisibles(activo);
        if (this._motor3D) this._motor3D.establecerCapas({ proyecciones: activo });
        this._estadoApp.actualizar({ mostrarProyecciones: activo });
      });
    }

    if (this._elementos.btnCuadricula) {
      this._elementos.btnCuadricula.addEventListener('click', () => {
        const activo = this._elementos.btnCuadricula.classList.toggle('activo');
        this._plano.establecerCuadriculaVisible(activo);
        if (this._motor3D) this._motor3D.establecerCapas({ cuadricula: activo });
        this._estadoApp.actualizar({ mostrarCuadricula: activo });
      });
    }

    if (this._elementos.btnEjes) {
      this._elementos.btnEjes.addEventListener('click', () => {
        const activo = this._elementos.btnEjes.classList.toggle('activo');
        this._plano.establecerEjesVisibles(activo);
        if (this._motor3D) this._motor3D.establecerCapas({ ejes: activo });
      });
    }

    // Controles de Cámara y Navegación
    if (this._elementos.btnZoomIn) {
      this._elementos.btnZoomIn.addEventListener('click', () => {
        if (this._es3D() && this._motor3D) {
          this._motor3D.zoomIn();
        } else {
          this._plano.cambiarZoom(1.25);
        }
      });
    }

    if (this._elementos.btnZoomOut) {
      this._elementos.btnZoomOut.addEventListener('click', () => {
        if (this._es3D() && this._motor3D) {
          this._motor3D.zoomOut();
        } else {
          this._plano.cambiarZoom(0.8);
        }
      });
    }

    if (this._elementos.btnCentrar) {
      this._elementos.btnCentrar.addEventListener('click', () => {
        if (this._es3D() && this._motor3D) {
          this._motor3D.centrarOrigen();
        } else {
          this._plano.centrarOrigen();
        }
      });
    }

    if (this._elementos.btnAjustar) {
      this._elementos.btnAjustar.addEventListener('click', () => {
        if (this._es3D() && this._motor3D) {
          this._motor3D.autoAjustar();
        } else {
          this._plano.autoAjustarVista();
        }
      });
    }

    if (this._elementos.btnExportar) {
      this._elementos.btnExportar.addEventListener('click', () => this._plano.exportarComoImagen());
    }
  }

  _sincronizarBotonesCapas(estadoVisible) {
    const capas = [
      this._elementos.btnVectores,
      this._elementos.btnPuntos,
      this._elementos.btnEtiquetas,
      this._elementos.btnConstrucciones,
      this._elementos.btnProyecciones
    ];

    capas.forEach(btn => {
      if (btn) {
        btn.classList.toggle('activo', estadoVisible);
      }
    });

    if (this._elementos.btnToggleTodo) {
      this._elementos.btnToggleTodo.classList.toggle('activo', estadoVisible);
      const spanTexto = this._elementos.btnToggleTodo.querySelector('.texto-btn-todo');
      if (spanTexto) {
        spanTexto.textContent = estadoVisible ? 'Grafo Completo' : 'Grafo Oculto';
      }
    }
  }

  _actualizarEstadoBotonMaestro() {
    if (!this._elementos.btnToggleTodo) return;
    const algunElementoVisible = this._plano.estanElementosVisibles();
    this._elementos.btnToggleTodo.classList.toggle('activo', algunElementoVisible);
    const spanTexto = this._elementos.btnToggleTodo.querySelector('.texto-btn-todo');
    if (spanTexto) {
      spanTexto.textContent = algunElementoVisible ? 'Grafo Completo' : 'Grafo Oculto';
    }
  }
}
