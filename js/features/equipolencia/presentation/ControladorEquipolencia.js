import { Punto2D } from '../../../core/models/Punto2D.js';
import { Configuracion } from '../../../core/constants/Configuracion.js';
import { GeneradorInputs } from '../../../shared/utils/GeneradorInputs.js';

/**
 * Controlador de presentación para el test de equipolencia de vectores.
 */
export class ControladorEquipolencia {
  /**
   * @param {HTMLElement} contenedorFormulario
   * @param {HTMLElement} contenedorResumen
   * @param {EvaluarEquipolenciaUseCase} casoDeUso
   * @param {EstadoApp} estadoApp
   */
  constructor(contenedorFormulario, contenedorResumen, casoDeUso, estadoApp) {
    this._contenedorFormulario = contenedorFormulario;
    this._contenedorResumen = contenedorResumen;
    this._casoDeUso = casoDeUso;
    this._estadoApp = estadoApp;

    this._puntos = {
      ax: 1, ay: 1,
      bx: 4, by: 5,
      cx: -2, cy: -1,
      dx: 1, dy: 3
    };
  }

  reiniciarACero() {
    this._puntos = {
      ax: 0, ay: 0,
      bx: 0, by: 0,
      cx: 0, cy: 0,
      dx: 0, dy: 0
    };
    this.renderizar();
    this.procesarYActualizar();
  }

  cargarEjercicio(datos) {
    this._puntos = {
      ax: datos.Ax, ay: datos.Ay,
      bx: datos.Bx, by: datos.By,
      cx: datos.Cx, cy: datos.Cy,
      dx: datos.Dx, dy: datos.Dy
    };
    this.renderizar();
    this.procesarYActualizar();
  }

  renderizar() {
    this._contenedorFormulario.innerHTML = `
      <div class="grupo-coordenadas">
        <div class="fila-vector">
          <span class="etiqueta-vector"><span class="punto-color" style="background:#38bdf8"></span> Vector A → B</span>
          <div class="inputs-par">
            ${GeneradorInputs.crearCampoNumero({ id: 'input-ax', name: 'ax', etiqueta: 'Ax', valor: this._puntos.ax, clasesExtra: 'input-eq', dataAttrs: 'data-campo="ax"' })}
            ${GeneradorInputs.crearCampoNumero({ id: 'input-ay', name: 'ay', etiqueta: 'Ay', valor: this._puntos.ay, clasesExtra: 'input-eq', dataAttrs: 'data-campo="ay"' })}
          </div>
          <div class="inputs-par" style="margin-top:0.35rem;">
            ${GeneradorInputs.crearCampoNumero({ id: 'input-bx', name: 'bx', etiqueta: 'Bx', valor: this._puntos.bx, clasesExtra: 'input-eq', dataAttrs: 'data-campo="bx"' })}
            ${GeneradorInputs.crearCampoNumero({ id: 'input-by', name: 'by', etiqueta: 'By', valor: this._puntos.by, clasesExtra: 'input-eq', dataAttrs: 'data-campo="by"' })}
          </div>
        </div>
        <div class="fila-vector">
          <span class="etiqueta-vector"><span class="punto-color" style="background:#f59e0b"></span> Vector C → D</span>
          <div class="inputs-par">
            ${GeneradorInputs.crearCampoNumero({ id: 'input-cx', name: 'cx', etiqueta: 'Cx', valor: this._puntos.cx, clasesExtra: 'input-eq', dataAttrs: 'data-campo="cx"' })}
            ${GeneradorInputs.crearCampoNumero({ id: 'input-cy', name: 'cy', etiqueta: 'Cy', valor: this._puntos.cy, clasesExtra: 'input-eq', dataAttrs: 'data-campo="cy"' })}
          </div>
          <div class="inputs-par" style="margin-top:0.35rem;">
            ${GeneradorInputs.crearCampoNumero({ id: 'input-dx', name: 'dx', etiqueta: 'Dx', valor: this._puntos.dx, clasesExtra: 'input-eq', dataAttrs: 'data-campo="dx"' })}
            ${GeneradorInputs.crearCampoNumero({ id: 'input-dy', name: 'dy', etiqueta: 'Dy', valor: this._puntos.dy, clasesExtra: 'input-eq', dataAttrs: 'data-campo="dy"' })}
          </div>
        </div>
      </div>
    `;

    this._vincularEventos();
  }

  _vincularEventos() {
    const inputs = this._contenedorFormulario.querySelectorAll('.input-eq');
    inputs.forEach(inp => {
      inp.addEventListener('input', (e) => {
        const campo = e.target.dataset.campo;
        const val = Number(e.target.value);
        this._puntos[campo] = Number.isNaN(val) ? 0 : val;
        this.procesarYActualizar();
      });
    });
  }

  procesarYActualizar() {
    const puntoA = new Punto2D(this._puntos.ax, this._puntos.ay, 'A');
    const puntoB = new Punto2D(this._puntos.bx, this._puntos.by, 'B');
    const puntoC = new Punto2D(this._puntos.cx, this._puntos.cy, 'C');
    const puntoD = new Punto2D(this._puntos.dx, this._puntos.dy, 'D');

    const resultado = this._casoDeUso.ejecutar(puntoA, puntoB, puntoC, puntoD);
    const estado = this._estadoApp.obtener();
    const esEjercicioOculto = estado.entornoActivo === Configuracion.ENTORNOS_APP.EJERCICIO && !estado.respuestasVisibles;

    this._estadoApp.actualizar({
      ultimoResultado: resultado,
      vectoresRenderizables: [resultado.vectorAB, resultado.vectorCD],
      puntosRenderizables: [puntoA, puntoB, puntoC, puntoD]
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
            El diagnóstico de equipolencia está oculto. Compara los vectores en papel y selecciona tu respuesta en el panel inferior para comprobarla.
          </div>
        </div>
      `;
      return;
    }

    this._contenedorResumen.innerHTML = `
      <div class="item-resumen">
        <div class="etiqueta">Vector AB</div>
        <div class="valor">(${resultado.vectorAB.x}, ${resultado.vectorAB.y})</div>
      </div>
      <div class="item-resumen">
        <div class="etiqueta">Vector CD</div>
        <div class="valor">(${resultado.vectorCD.x}, ${resultado.vectorCD.y})</div>
      </div>
      <div class="item-resumen" style="grid-column: span 2;">
        <div class="etiqueta">Equipolencia</div>
        <div class="valor" style="color:${resultado.sonEquipolentes ? '#10b981' : '#f43f5e'}; font-weight: 700;">
          ${resultado.sonEquipolentes ? 'SI: EQUIPOLENTES (Vectores Identicos)' : 'NO: NO EQUIPOLENTES (Difieren en direccion o modulo)'}
        </div>
      </div>
    `;
  }
}
