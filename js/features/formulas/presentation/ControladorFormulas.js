import { RepositorioFormulas } from '../domain/RepositorioFormulas.js';

/**
 * Controlador de presentación para el modal con el compendio de fórmulas.
 */
export class ControladorFormulas {
  /**
   * @param {HTMLElement} modalElemento
   */
  constructor(modalElemento) {
    this._modal = modalElemento;
    this._cuerpo = modalElemento.querySelector('.modal-cuerpo');
    this._btnCerrar = modalElemento.querySelector('#btn-cerrar-formulas');

    this._inicializar();
  }

  _inicializar() {
    this._renderizar();

    if (this._btnCerrar) {
      this._btnCerrar.addEventListener('click', () => this.cerrar());
    }

    this._modal.addEventListener('click', (e) => {
      if (e.target === this._modal) {
        this.cerrar();
      }
    });
  }

  _renderizar() {
    if (!this._cuerpo) return;
    const formulas = RepositorioFormulas.obtenerTodas();

    this._cuerpo.innerHTML = formulas.map(f => `
      <article class="tarjeta-formula-doc">
        <h3>${f.titulo}</h3>
        <div class="ecuacion-caja">${f.ecuacion}</div>
        <p>${f.descripcion}</p>
      </article>
    `).join('');
  }

  abrir() {
    this._modal.classList.add('activo');
  }

  cerrar() {
    this._modal.classList.remove('activo');
  }
}
