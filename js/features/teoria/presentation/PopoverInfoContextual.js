import { CatalogoInfoContextual } from '../domain/CatalogoInfoContextual.js';
import { RenderizadorMatematico } from '../../../shared/math/RenderizadorMatematico.js';

/**
 * Controlador de presentación para el Popover de Información Contextual.
 * Muestra definiciones matemáticas, fórmulas y enlaces a la Guía Teórica in situ.
 */
export class PopoverInfoContextual {
  /**
   * @param {Function} [alAbrirTeoria] - Callback para abrir la guía teórica con un tema específico
   */
  constructor(alAbrirTeoria = null) {
    this._alAbrirTeoria = alAbrirTeoria;
    this._elementoPopover = null;
    this._botonActivo = null;

    this._iniciar();
  }

  _iniciar() {
    // Delegación global de clics para cualquier botón "ℹ"
    document.addEventListener('click', (e) => {
      const botonInfo = e.target.closest('.btn-info-contextual');
      if (botonInfo) {
        e.stopPropagation();
        this._manejarClicBoton(botonInfo);
        return;
      }

      // Si hace clic fuera del popover activo, cerrarlo
      if (this._elementoPopover && !e.target.closest('.popover-info-contextual')) {
        this.cerrar();
      }
    });

    // Cerrar si se redimensiona la ventana
    window.addEventListener('resize', () => {
      if (this._elementoPopover) {
        this.cerrar();
      }
    });
  }

  _manejarClicBoton(boton) {
    const clave = boton.dataset.infoClave;
    if (!clave) return;

    // Si pulsó el mismo botón que ya está abierto, cerrarlo (toggle)
    if (this._botonActivo === boton && this._elementoPopover) {
      this.cerrar();
      return;
    }

    const concepto = CatalogoInfoContextual.obtener(clave);
    if (!concepto) return;

    this.mostrar(boton, concepto);
  }

  /**
   * Muestra el popover anclado a un botón específico con la información del concepto.
   * @param {HTMLElement} boton
   * @param {Object} concepto
   */
  mostrar(boton, concepto) {
    this.cerrar();
    this._botonActivo = boton;

    const popover = document.createElement('div');
    popover.className = 'popover-info-contextual';
    popover.setAttribute('role', 'dialog');
    popover.setAttribute('aria-modal', 'false');

    popover.innerHTML = `
      <div class="popover-info-cabecera">
        <div class="popover-info-titulo-grupo">
          <span class="popover-info-categoria">${concepto.categoria}</span>
          <div class="popover-info-titulo">${concepto.titulo}</div>
        </div>
        <button type="button" class="popover-info-btn-cerrar" title="Cerrar ayuda" aria-label="Cerrar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="popover-info-cuerpo">
        <p class="popover-info-que-es">${concepto.queEs}</p>
        <div class="popover-info-formula-bloque">
          ${concepto.formula}
        </div>
        <p class="popover-info-interpretacion">${concepto.interpretacion}</p>
        ${concepto.temaTeoriaId ? `
          <button type="button" class="popover-info-btn-teoria" data-tema-id="${concepto.temaTeoriaId}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            Ver en Guía Teórica
          </button>
        ` : ''}
      </div>
    `;

    // Eventos internos del popover
    popover.querySelector('.popover-info-btn-cerrar')?.addEventListener('click', () => {
      this.cerrar();
    });

    popover.querySelector('.popover-info-btn-teoria')?.addEventListener('click', (e) => {
      const temaId = e.currentTarget.dataset.temaId;
      this.cerrar();
      if (this._alAbrirTeoria && temaId) {
        this._alAbrirTeoria(temaId);
      }
    });

    document.body.appendChild(popover);
    this._elementoPopover = popover;

    // Compilar fórmulas matemáticas con KaTeX
    RenderizadorMatematico.renderizarElemento(popover);

    this._posicionar(boton, popover);
  }

  _posicionar(boton, popover) {
    const rectBoton = boton.getBoundingClientRect();
    const rectPopover = popover.getBoundingClientRect();
    const paddingPantalla = 12;

    // Posición horizontal centrada respecto al botón
    let left = rectBoton.left + (rectBoton.width / 2) - (rectPopover.width / 2);

    // Evitar desbordamiento en bordes izquierdo y derecho
    if (left < paddingPantalla) {
      left = paddingPantalla;
    } else if (left + rectPopover.width > window.innerWidth - paddingPantalla) {
      left = window.innerWidth - rectPopover.width - paddingPantalla;
    }

    // Posición vertical: preferir abajo si hay espacio, o arriba
    let top = rectBoton.bottom + 8;
    if (top + rectPopover.height > window.innerHeight - paddingPantalla) {
      // Probar colocarlo arriba
      const topArriba = rectBoton.top - rectPopover.height - 8;
      if (topArriba >= paddingPantalla) {
        top = topArriba;
      } else {
        // Si no cabe ni arriba ni abajo, limitarlo a la altura visible
        top = Math.max(paddingPantalla, window.innerHeight - rectPopover.height - paddingPantalla);
      }
    }

    popover.style.left = `${Math.round(left)}px`;
    popover.style.top = `${Math.round(top)}px`;
  }

  cerrar() {
    if (this._elementoPopover) {
      this._elementoPopover.remove();
      this._elementoPopover = null;
    }
    this._botonActivo = null;
  }
}
