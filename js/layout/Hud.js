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
   */
  constructor(elementosHUD, plano, estadoApp) {
    this._elementos = elementosHUD;
    this._plano = plano;
    this._estadoApp = estadoApp;

    this._inicializar();
  }

  _inicializar() {
    this._plano.alMoverCursor((x, y) => {
      if (this._elementos.textoCoords) {
        this._elementos.textoCoords.textContent = `X: ${FormateadorMatematico.formatearNumero(x)}, Y: ${FormateadorMatematico.formatearNumero(y)}`;
      }
    });

    // Control Maestro: Alternar todos los elementos geométricos del grafo
    if (this._elementos.btnToggleTodo) {
      this._elementos.btnToggleTodo.addEventListener('click', () => {
        const nuevoEstado = this._plano.alternarTodoElGrafo();
        this._sincronizarBotonesCapas(nuevoEstado);
      });
    }

    // Controles de capas individuales
    if (this._elementos.btnVectores) {
      this._elementos.btnVectores.addEventListener('click', () => {
        const activo = this._elementos.btnVectores.classList.toggle('activo');
        this._plano.establecerVectoresVisibles(activo);
        this._actualizarEstadoBotonMaestro();
      });
    }

    if (this._elementos.btnPuntos) {
      this._elementos.btnPuntos.addEventListener('click', () => {
        const activo = this._elementos.btnPuntos.classList.toggle('activo');
        this._plano.establecerPuntosVisibles(activo);
        this._actualizarEstadoBotonMaestro();
      });
    }

    if (this._elementos.btnEtiquetas) {
      this._elementos.btnEtiquetas.addEventListener('click', () => {
        const activo = this._elementos.btnEtiquetas.classList.toggle('activo');
        this._plano.establecerEtiquetasVisibles(activo);
      });
    }

    if (this._elementos.btnConstrucciones) {
      this._elementos.btnConstrucciones.addEventListener('click', () => {
        const activo = this._elementos.btnConstrucciones.classList.toggle('activo');
        this._plano.establecerConstruccionesVisibles(activo);
        this._actualizarEstadoBotonMaestro();
      });
    }

    if (this._elementos.btnProyecciones) {
      this._elementos.btnProyecciones.addEventListener('click', () => {
        const activo = this._elementos.btnProyecciones.classList.toggle('activo');
        this._plano.establecerProyeccionesVisibles(activo);
        this._estadoApp.actualizar({ mostrarProyecciones: activo });
      });
    }

    if (this._elementos.btnCuadricula) {
      this._elementos.btnCuadricula.addEventListener('click', () => {
        const activo = this._elementos.btnCuadricula.classList.toggle('activo');
        this._plano.establecerCuadriculaVisible(activo);
        this._estadoApp.actualizar({ mostrarCuadricula: activo });
      });
    }

    if (this._elementos.btnEjes) {
      this._elementos.btnEjes.addEventListener('click', () => {
        const activo = this._elementos.btnEjes.classList.toggle('activo');
        this._plano.establecerEjesVisibles(activo);
      });
    }

    // Controles de Cámara y Navegación
    if (this._elementos.btnZoomIn) {
      this._elementos.btnZoomIn.addEventListener('click', () => this._plano.cambiarZoom(1.25));
    }

    if (this._elementos.btnZoomOut) {
      this._elementos.btnZoomOut.addEventListener('click', () => this._plano.cambiarZoom(0.8));
    }

    if (this._elementos.btnCentrar) {
      this._elementos.btnCentrar.addEventListener('click', () => this._plano.centrarOrigen());
    }

    if (this._elementos.btnAjustar) {
      this._elementos.btnAjustar.addEventListener('click', () => this._plano.autoAjustarVista());
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
