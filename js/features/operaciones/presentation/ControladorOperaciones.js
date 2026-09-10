import { Punto2D } from '../../../core/models/Punto2D.js';
import { Vector2D } from '../../../core/models/Vector2D.js';
import { Configuracion } from '../../../core/constants/Configuracion.js';
import { FormateadorMatematico } from '../../../shared/utils/FormateadorMatematico.js';
import { GeneradorInputs } from '../../../shared/utils/GeneradorInputs.js';

/**
 * Controlador de presentación para la pestaña de operaciones vectoriales con u y v.
 */
export class ControladorOperaciones {
  /**
   * @param {HTMLElement} contenedorFormulario
   * @param {HTMLElement} contenedorResumen
   * @param {CalcularOperacionesUseCase} casoDeUso
   * @param {EstadoApp} estadoApp
   */
  constructor(contenedorFormulario, contenedorResumen, casoDeUso, estadoApp) {
    this._contenedorFormulario = contenedorFormulario;
    this._contenedorResumen = contenedorResumen;
    this._casoDeUso = casoDeUso;
    this._estadoApp = estadoApp;

    this._valores = {
      ux: 4,
      uy: 2,
      vx: -2,
      vy: 3,
      k: 2
    };
  }

  reiniciarACero() {
    this._valores = {
      ux: 0,
      uy: 0,
      vx: 0,
      vy: 0,
      k: 1
    };
    this.renderizar();
    this.procesarYActualizar();
  }

  cargarEjercicio(datos) {
    this._valores = { ...datos };
    this.renderizar();
    this.procesarYActualizar();
  }

  renderizar() {
    const estado = this._estadoApp.obtener();
    this._contenedorFormulario.innerHTML = `
      <div class="grupo-coordenadas">
        <div class="fila-vector">
          <span class="etiqueta-vector"><span class="punto-color" style="background:#06b6d4"></span> Vector u (ux, uy)</span>
          <div class="inputs-par">
            ${GeneradorInputs.crearCampoNumero({
              id: 'input-ux',
              name: 'ux',
              etiqueta: 'ux',
              valor: this._valores.ux,
              clasesExtra: 'input-op',
              dataAttrs: 'data-campo="ux"'
            })}
            ${GeneradorInputs.crearCampoNumero({
              id: 'input-uy',
              name: 'uy',
              etiqueta: 'uy',
              valor: this._valores.uy,
              clasesExtra: 'input-op',
              dataAttrs: 'data-campo="uy"'
            })}
          </div>
        </div>
        <div class="fila-vector">
          <span class="etiqueta-vector"><span class="punto-color" style="background:#f59e0b"></span> Vector v (vx, vy)</span>
          <div class="inputs-par">
            ${GeneradorInputs.crearCampoNumero({
              id: 'input-vx',
              name: 'vx',
              etiqueta: 'vx',
              valor: this._valores.vx,
              clasesExtra: 'input-op',
              dataAttrs: 'data-campo="vx"'
            })}
            ${GeneradorInputs.crearCampoNumero({
              id: 'input-vy',
              name: 'vy',
              etiqueta: 'vy',
              valor: this._valores.vy,
              clasesExtra: 'input-op',
              dataAttrs: 'data-campo="vy"'
            })}
          </div>
        </div>
        <div class="fila-vector">
          <span class="etiqueta-vector"><span class="punto-color" style="background:#a855f7"></span> Escalar k (Ponderación k·u)</span>
          ${GeneradorInputs.crearCampoNumero({
            id: 'input-escalar',
            name: 'k',
            etiqueta: 'k',
            valor: this._valores.k,
            clasesExtra: 'input-op',
            dataAttrs: 'data-campo="k"'
          })}
        </div>
        <div class="opciones-union">
          <span style="font-size:0.75rem; font-weight:700; color:var(--color-texto-secundario); text-transform:uppercase;">Representación de la Unión:</span>
          <label class="opcion-radio">
            <input type="radio" name="modo-geom" value="paralelogramo" ${estado.construccionGeometrica === 'paralelogramo' ? 'checked' : ''}>
            Regla del Paralelogramo (Suma)
          </label>
          <label class="opcion-radio">
            <input type="radio" name="modo-geom" value="punta-cola" ${estado.construccionGeometrica === 'punta-cola' ? 'checked' : ''}>
            Regla Punta con Cola (Polígono)
          </label>
          <label class="opcion-radio">
            <input type="radio" name="modo-geom" value="ninguno" ${estado.construccionGeometrica === 'ninguno' ? 'checked' : ''}>
            Sin líneas de unión auxiliar
          </label>
        </div>
      </div>
    `;

    this._vincularEventos();
  }

  _vincularEventos() {
    const inputs = this._contenedorFormulario.querySelectorAll('.input-op');
    inputs.forEach(inp => {
      inp.addEventListener('input', (e) => {
        const campo = e.target.dataset.campo;
        const val = Number(e.target.value);
        this._valores[campo] = Number.isNaN(val) ? 0 : val;
        this.procesarYActualizar();
      });
    });

    const radios = this._contenedorFormulario.querySelectorAll('input[name="modo-geom"]');
    radios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this._estadoApp.actualizar({ construccionGeometrica: e.target.value });
      });
    });
  }

  procesarYActualizar() {
    const vectorU = new Vector2D(this._valores.ux, this._valores.uy, new Punto2D(0, 0, 'O'), 'u', '#06b6d4');
    const vectorV = new Vector2D(this._valores.vx, this._valores.vy, new Punto2D(0, 0, 'O'), 'v', '#f59e0b');

    const resultado = this._casoDeUso.ejecutar(vectorU, vectorV, this._valores.k);
    const estado = this._estadoApp.obtener();
    const esEjercicioOculto = estado.entornoActivo === Configuracion.ENTORNOS_APP.EJERCICIO && !estado.respuestasVisibles;

    const vectoresADibujar = esEjercicioOculto
      ? [vectorU, vectorV]
      : [vectorU, vectorV, resultado.suma];

    this._estadoApp.actualizar({
      ultimoResultado: resultado,
      vectoresRenderizables: vectoresADibujar,
      puntosRenderizables: [vectorU.origen]
    });

    this._renderizarResumen(resultado, esEjercicioOculto);
  }

  _renderizarResumen(resultado, esEjercicioOculto) {
    if (esEjercicioOculto) {
      this._contenedorResumen.innerHTML = `
        <div class="item-resumen" style="grid-column: span 2; text-align: center; padding: 1rem 0.5rem;">
          <span class="badge-tag" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); margin-bottom: 0.5rem; display: inline-block;">
            MODO EJERCICIO ACTIVO
          </span>
          <div style="font-size:0.8rem; color:var(--color-texto-secundario); line-height: 1.4;">
            Operaciones u + v y producto escalar ocultos. Resuelve el cálculo e introduce tus respuestas en el panel inferior.
          </div>
        </div>
      `;
      return;
    }

    this._contenedorResumen.innerHTML = `
      <div class="item-resumen">
        <div class="etiqueta">Suma u + v</div>
        <div class="valor">(${resultado.suma.x}, ${resultado.suma.y})</div>
      </div>
      <div class="item-resumen">
        <div class="etiqueta">Resta u - v</div>
        <div class="valor">(${resultado.resta.x}, ${resultado.resta.y})</div>
      </div>
      <div class="item-resumen">
        <div class="etiqueta">Producto Escalar</div>
        <div class="valor">${FormateadorMatematico.formatearNumero(resultado.productoPunto)}</div>
      </div>
      <div class="item-resumen">
        <div class="etiqueta">Ángulo entre ellos</div>
        <div class="valor">${FormateadorMatematico.formatearGrados(resultado.angulo)}</div>
      </div>
    `;
  }
}
