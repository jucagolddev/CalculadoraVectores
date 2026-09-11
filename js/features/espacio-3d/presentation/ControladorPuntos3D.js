import { Punto3D } from '../../../core/models/Punto3D.js';
import { FormateadorMatematico } from '../../../shared/utils/FormateadorMatematico.js?v=flechas15';
import { GeneradorInputs } from '../../../shared/utils/GeneradorInputs.js';
import { CatalogoInfoContextual } from '../../teoria/domain/CatalogoInfoContextual.js';

/**
 * Controlador de presentación para la pestaña de Puntos 3D, Cosenos Directores y Vector Unitario.
 */
export class ControladorPuntos3D {
  /**
   * @param {HTMLElement} contenedorFormulario
   * @param {HTMLElement} contenedorResumen
   * @param {CalcularPuntos3DUseCase} casoDeUso
   * @param {EstadoApp} estadoApp
   * @param {MotorGrafico3D} motor3D
   */
  constructor(contenedorFormulario, contenedorResumen, casoDeUso, estadoApp, motor3D) {
    this._contenedorFormulario = contenedorFormulario;
    this._contenedorResumen = contenedorResumen;
    this._casoDeUso = casoDeUso;
    this._estadoApp = estadoApp;
    this._motor3D = motor3D;

    this._puntos = {
      ax: 1, ay: 1, az: 0,
      bx: 4, by: 5, bz: 3
    };
  }

  reiniciarACero() {
    this._puntos = {
      ax: 0, ay: 0, az: 0,
      bx: 0, by: 0, bz: 0
    };
    this.renderizar();
    this.procesarYActualizar();
    this._motor3D.centrarOrigen();
  }

  cargarEjercicio(datos) {
    this._puntos = { ...this._puntos, ...datos };
    this.renderizar();
    this.procesarYActualizar();
    this._motor3D.autoAjustar();
  }

  renderizar() {
    this._contenedorFormulario.innerHTML = `
      <div class="grupo-coordenadas">
        <div class="fila-vector">
          <span class="etiqueta-vector">
            <span class="punto-color" style="background:#38bdf8"></span>
            Punto A - Origen (Ax, Ay, Az)
            ${CatalogoInfoContextual.htmlBotonInfo('coord-punto')}
          </span>
          <div class="inputs-trio">
            ${GeneradorInputs.crearCampoNumero({ id: 'input-3d-ax', name: 'ax', etiqueta: 'Ax', valor: this._puntos.ax, clasesExtra: 'input-pt-3d', dataAttrs: 'data-campo="ax"' })}
            ${GeneradorInputs.crearCampoNumero({ id: 'input-3d-ay', name: 'ay', etiqueta: 'Ay', valor: this._puntos.ay, clasesExtra: 'input-pt-3d', dataAttrs: 'data-campo="ay"' })}
            ${GeneradorInputs.crearCampoNumero({ id: 'input-3d-az', name: 'az', etiqueta: 'Az', valor: this._puntos.az, clasesExtra: 'input-pt-3d', dataAttrs: 'data-campo="az"' })}
          </div>
        </div>

        <div class="fila-vector">
          <span class="etiqueta-vector">
            <span class="punto-color" style="background:#10b981"></span>
            Punto B - Extremo (Bx, By, Bz)
            ${CatalogoInfoContextual.htmlBotonInfo('coord-punto')}
          </span>
          <div class="inputs-trio">
            ${GeneradorInputs.crearCampoNumero({ id: 'input-3d-bx', name: 'bx', etiqueta: 'Bx', valor: this._puntos.bx, clasesExtra: 'input-pt-3d', dataAttrs: 'data-campo="bx"' })}
            ${GeneradorInputs.crearCampoNumero({ id: 'input-3d-by', name: 'by', etiqueta: 'By', valor: this._puntos.by, clasesExtra: 'input-pt-3d', dataAttrs: 'data-campo="by"' })}
            ${GeneradorInputs.crearCampoNumero({ id: 'input-3d-bz', name: 'bz', etiqueta: 'Bz', valor: this._puntos.bz, clasesExtra: 'input-pt-3d', dataAttrs: 'data-campo="bz"' })}
          </div>
        </div>

        <div class="opciones-union" style="margin-top:0.25rem;">
          <span style="font-size:0.75rem; font-weight:700; color:var(--color-texto-secundario); text-transform:uppercase;">Visualización Tridimensional:</span>
          <label class="opcion-radio" style="font-size:0.75rem; color:#f59e0b; font-weight:600;">
            <input type="checkbox" id="check-3d-papel-pts" ${this._motor3D.esModoPapel() ? 'checked' : ''}>
            📄 Modo Plano: Hoja de Papel Técnico (Proyección Ortogonal XY)
          </label>
        </div>
      </div>
    `;

    this._vincularEventos();
  }

  _vincularEventos() {
    const inputs = this._contenedorFormulario.querySelectorAll('.input-pt-3d');
    inputs.forEach(inp => {
      inp.addEventListener('input', (e) => {
        const campo = e.target.dataset.campo;
        const val = Number(e.target.value);
        this._puntos[campo] = Number.isNaN(val) ? 0 : val;
        this.procesarYActualizar();
      });
    });

    const checkPapel = document.getElementById('check-3d-papel-pts');
    checkPapel?.addEventListener('change', (e) => {
      const activo = e.target.checked;
      this._motor3D.establecerModoPapel(activo);
      const btnHud = document.getElementById('btn-toggle-modo-papel');
      if (btnHud) {
        btnHud.classList.toggle('activo', activo);
        const span = btnHud.querySelector('.texto-btn-papel');
        if (span) span.textContent = activo ? 'Vista 3D' : 'Modo Papel';
      }
    });
  }

  procesarYActualizar() {
    const puntoA = new Punto3D(this._puntos.ax, this._puntos.ay, this._puntos.az, 'A', '#38bdf8');
    const puntoB = new Punto3D(this._puntos.bx, this._puntos.by, this._puntos.bz, 'B', '#10b981');

    const resultado = this._casoDeUso.ejecutar(puntoA, puntoB);

    const estado = this._estadoApp.obtener();
    const esEjercicioOculto = (estado.flujoActivo === 'ejercicios' || estado.entornoActivo === 'ejercicios') && !estado.respuestasVisibles;

    const vectoresADibujar = esEjercicioOculto ? [] : [resultado.vectorAB];
    this._motor3D.actualizarElementos(vectoresADibujar, [puntoA, puntoB], null);

    this._estadoApp.actualizar({
      ultimoResultado: resultado,
      dimensionActiva: '3d'
    });

    this._renderizarResumen(resultado, esEjercicioOculto);
  }

  _renderizarResumen(resultado, esEjercicioOculto = false) {
    if (esEjercicioOculto) {
      this._contenedorResumen.innerHTML = `
        <div class="item-resumen" style="grid-column: span 2; text-align: center; padding: 1rem 0.5rem;">
          <span class="badge-tag" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); margin-bottom: 0.5rem; display: inline-block;">
            🎯 RETO 3D ACTIVO: VECTOR ENTRE DOS PUNTOS
          </span>
          <div style="font-size:0.8rem; color:var(--color-texto-secundario); line-height: 1.4;">
            Componentes del vector AB, módulo ||AB|| y cosenos directores ocultos. Resta las coordenadas (B - A), halla la norma euclídea e introduce tus respuestas en el panel inferior.
          </div>
        </div>
      `;
      return;
    }

    const c = resultado.cosenos;
    const u = resultado.unitario;

    this._contenedorResumen.innerHTML = `
      <div class="item-resumen">
        <div class="etiqueta">
          Vector ${FormateadorMatematico.htmlVector('AB')} (B - A)
          ${CatalogoInfoContextual.htmlBotonInfo('vector-ab')}
        </div>
        <div class="valor" style="color:#38bdf8">(${resultado.vectorAB.x}, ${resultado.vectorAB.y}, ${resultado.vectorAB.z})</div>
      </div>
      <div class="item-resumen">
        <div class="etiqueta">
          Módulo ||${FormateadorMatematico.htmlVector('AB')}||
          ${CatalogoInfoContextual.htmlBotonInfo('modulo')}
        </div>
        <div class="valor">${FormateadorMatematico.formatearNumero(resultado.modulo)} u</div>
      </div>
      <div class="item-resumen" style="grid-column: span 2;">
        <div class="etiqueta">
          Cosenos Directores (con Ejes X, Y, Z)
          ${CatalogoInfoContextual.htmlBotonInfo('cosenos-directores')}
        </div>
        <div style="font-size:0.78rem; color:#e2e8f0; margin-top:0.25rem; font-family:var(--fuente-mono)">
          cos α = ${FormateadorMatematico.formatearNumero(c.cosAlfa, 3)} (${FormateadorMatematico.formatearGrados(c.alfaGrados)}) |
          cos β = ${FormateadorMatematico.formatearNumero(c.cosBeta, 3)} (${FormateadorMatematico.formatearGrados(c.betaGrados)}) |
          cos γ = ${FormateadorMatematico.formatearNumero(c.cosGamma, 3)} (${FormateadorMatematico.formatearGrados(c.gammaGrados)})
        </div>
      </div>
      <div class="item-resumen">
        <div class="etiqueta">
          Identidad cos²α+cos²β+cos²γ
          ${CatalogoInfoContextual.htmlBotonInfo('cosenos-directores')}
        </div>
        <div class="valor" style="color:#10b981">${FormateadorMatematico.formatearNumero(c.sumaCuadrados, 4)} ≈ 1</div>
      </div>
      <div class="item-resumen">
        <div class="etiqueta">
          Vector Unitario û
          ${CatalogoInfoContextual.htmlBotonInfo('vector-unitario')}
        </div>
        <div class="valor" style="color:#a855f7">(${FormateadorMatematico.formatearNumero(u.x, 2)}, ${FormateadorMatematico.formatearNumero(u.y, 2)}, ${FormateadorMatematico.formatearNumero(u.z, 2)})</div>
      </div>
    `;
  }
}
