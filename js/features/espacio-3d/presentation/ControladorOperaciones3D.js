import { Punto3D } from '../../../core/models/Punto3D.js';
import { Vector3D } from '../../../core/models/Vector3D.js';
import { FormateadorMatematico } from '../../../shared/utils/FormateadorMatematico.js';
import { GeneradorInputs } from '../../../shared/utils/GeneradorInputs.js';
import { CatalogoInfoContextual } from '../../teoria/domain/CatalogoInfoContextual.js';

/**
 * Controlador de presentación para la pestaña de Operaciones y Producto Vectorial en ℝ³.
 */
export class ControladorOperaciones3D {
  /**
   * @param {HTMLElement} contenedorFormulario
   * @param {HTMLElement} contenedorResumen
   * @param {CalcularOperaciones3DUseCase} casoDeUso
   * @param {EstadoApp} estadoApp
   * @param {MotorGrafico3D} motor3D
   */
  constructor(contenedorFormulario, contenedorResumen, casoDeUso, estadoApp, motor3D) {
    this._contenedorFormulario = contenedorFormulario;
    this._contenedorResumen = contenedorResumen;
    this._casoDeUso = casoDeUso;
    this._estadoApp = estadoApp;
    this._motor3D = motor3D;

    this._valores = {
      ux: 3, uy: 1, uz: 2,
      vx: -1, vy: 3, vz: 1,
      k: 1.5,
      mostrarCruz: true,
      mostrarParalelogramo: true
    };
  }

  reiniciarACero() {
    this._valores = {
      ux: 0, uy: 0, uz: 0,
      vx: 0, vy: 0, vz: 0,
      k: 1,
      mostrarCruz: true,
      mostrarParalelogramo: true
    };
    this.renderizar();
    this.procesarYActualizar();
    this._motor3D.centrarOrigen();
  }

  cargarEjercicio(datos) {
    this._valores = { ...this._valores, ...datos };
    this.renderizar();
    this.procesarYActualizar();
    this._motor3D.autoAjustar();
  }

  renderizar() {
    this._contenedorFormulario.innerHTML = `
      <div class="grupo-coordenadas">
        <div class="fila-vector">
          <span class="etiqueta-vector">
            <span class="punto-color" style="background:#06b6d4"></span>
            Vector u (ux, uy, uz)
            ${CatalogoInfoContextual.htmlBotonInfo('vector-3d-u')}
          </span>
          <div class="inputs-trio">
            ${GeneradorInputs.crearCampoNumero({ id: 'input-3d-ux', name: 'ux', etiqueta: 'ux', valor: this._valores.ux, clasesExtra: 'input-op-3d', dataAttrs: 'data-campo="ux"' })}
            ${GeneradorInputs.crearCampoNumero({ id: 'input-3d-uy', name: 'uy', etiqueta: 'uy', valor: this._valores.uy, clasesExtra: 'input-op-3d', dataAttrs: 'data-campo="uy"' })}
            ${GeneradorInputs.crearCampoNumero({ id: 'input-3d-uz', name: 'uz', etiqueta: 'uz', valor: this._valores.uz, clasesExtra: 'input-op-3d', dataAttrs: 'data-campo="uz"' })}
          </div>
        </div>

        <div class="fila-vector">
          <span class="etiqueta-vector">
            <span class="punto-color" style="background:#f59e0b"></span>
            Vector v (vx, vy, vz)
            ${CatalogoInfoContextual.htmlBotonInfo('vector-3d-v')}
          </span>
          <div class="inputs-trio">
            ${GeneradorInputs.crearCampoNumero({ id: 'input-3d-vx', name: 'vx', etiqueta: 'vx', valor: this._valores.vx, clasesExtra: 'input-op-3d', dataAttrs: 'data-campo="vx"' })}
            ${GeneradorInputs.crearCampoNumero({ id: 'input-3d-vy', name: 'vy', etiqueta: 'vy', valor: this._valores.vy, clasesExtra: 'input-op-3d', dataAttrs: 'data-campo="vy"' })}
            ${GeneradorInputs.crearCampoNumero({ id: 'input-3d-vz', name: 'vz', etiqueta: 'vz', valor: this._valores.vz, clasesExtra: 'input-op-3d', dataAttrs: 'data-campo="vz"' })}
          </div>
        </div>

        <div class="fila-vector">
          <span class="etiqueta-vector">
            <span class="punto-color" style="background:#a855f7"></span>
            Escalar k (Ponderación k·u)
            ${CatalogoInfoContextual.htmlBotonInfo('escalar-k')}
          </span>
          ${GeneradorInputs.crearCampoNumero({ id: 'input-3d-k', name: 'k', etiqueta: 'k', valor: this._valores.k, clasesExtra: 'input-op-3d', dataAttrs: 'data-campo="k"' })}
        </div>

        <div class="opciones-union" style="margin-top:0.25rem;">
          <span style="font-size:0.75rem; font-weight:700; color:var(--color-texto-secundario); text-transform:uppercase;">Visualización Tridimensional:</span>
          <label class="opcion-radio" style="font-size:0.75rem;">
            <input type="checkbox" id="check-3d-cruz" ${this._valores.mostrarCruz ? 'checked' : ''}>
            Mostrar Producto Vectorial u × v (Vector Perpendicular)
          </label>
          <label class="opcion-radio" style="font-size:0.75rem;">
            <input type="checkbox" id="check-3d-paralelogramo" ${this._valores.mostrarParalelogramo ? 'checked' : ''}>
            Mostrar Paralelogramo Sustentado (Área)
          </label>
        </div>
      </div>
    `;

    this._vincularEventos();
  }

  _vincularEventos() {
    const inputs = this._contenedorFormulario.querySelectorAll('.input-op-3d');
    inputs.forEach(inp => {
      inp.addEventListener('input', (e) => {
        const campo = e.target.dataset.campo;
        const val = Number(e.target.value);
        this._valores[campo] = Number.isNaN(val) ? 0 : val;
        this.procesarYActualizar();
      });
    });

    const checkCruz = document.getElementById('check-3d-cruz');
    checkCruz?.addEventListener('change', (e) => {
      this._valores.mostrarCruz = e.target.checked;
      this.procesarYActualizar();
    });

    const checkParal = document.getElementById('check-3d-paralelogramo');
    checkParal?.addEventListener('change', (e) => {
      this._valores.mostrarParalelogramo = e.target.checked;
      this.procesarYActualizar();
    });
  }

  procesarYActualizar() {
    const o = new Punto3D(0, 0, 0, 'O');
    const u = new Vector3D(this._valores.ux, this._valores.uy, this._valores.uz, o, 'u', '#06b6d4');
    const v = new Vector3D(this._valores.vx, this._valores.vy, this._valores.vz, o, 'v', '#f59e0b');

    const resultado = this._casoDeUso.ejecutar(u, v, this._valores.k);

    const vectoresADibujar = [u, v];
    if (this._valores.mostrarCruz) {
      vectoresADibujar.push(resultado.productoCruz);
    }
    vectoresADibujar.push(resultado.suma);

    let poligono = null;
    if (this._valores.mostrarParalelogramo) {
      poligono = [
        o,
        u.extremo,
        resultado.suma.extremo,
        v.extremo
      ];
    }

    this._motor3D.actualizarElementos(vectoresADibujar, [o], poligono);

    this._estadoApp.actualizar({
      ultimoResultado: resultado,
      dimensionActiva: '3d'
    });

    this._renderizarResumen(resultado);
  }

  _renderizarResumen(resultado) {
    this._contenedorResumen.innerHTML = `
      <div class="item-resumen">
        <div class="etiqueta">
          Producto Vectorial u × v
          ${CatalogoInfoContextual.htmlBotonInfo('producto-vectorial')}
        </div>
        <div class="valor" style="color:#c084fc">(${resultado.productoCruz.x}, ${resultado.productoCruz.y}, ${resultado.productoCruz.z})</div>
      </div>
      <div class="item-resumen">
        <div class="etiqueta">
          Área Paralelogramo
          ${CatalogoInfoContextual.htmlBotonInfo('area-paralelogramo-3d')}
        </div>
        <div class="valor" style="color:#c084fc">${FormateadorMatematico.formatearNumero(resultado.area)} u²</div>
      </div>
      <div class="item-resumen">
        <div class="etiqueta">
          Producto Escalar u · v
          ${CatalogoInfoContextual.htmlBotonInfo('producto-escalar')}
        </div>
        <div class="valor">${FormateadorMatematico.formatearNumero(resultado.productoPunto)}</div>
      </div>
      <div class="item-resumen">
        <div class="etiqueta">
          Ángulo θ
          ${CatalogoInfoContextual.htmlBotonInfo('angulo-entre-vectores')}
        </div>
        <div class="valor">${FormateadorMatematico.formatearGrados(resultado.angulo)}</div>
      </div>
      <div class="item-resumen">
        <div class="etiqueta">
          Suma u + v
          ${CatalogoInfoContextual.htmlBotonInfo('suma-vectores')}
        </div>
        <div class="valor">(${resultado.suma.x}, ${resultado.suma.y}, ${resultado.suma.z})</div>
      </div>
      <div class="item-resumen">
        <div class="etiqueta">
          Diferencia u - v
          ${CatalogoInfoContextual.htmlBotonInfo('resta-vectores')}
        </div>
        <div class="valor">(${resultado.resta.x}, ${resultado.resta.y}, ${resultado.resta.z})</div>
      </div>
    `;
  }
}
