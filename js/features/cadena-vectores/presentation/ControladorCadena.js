import { Punto2D } from '../../../core/models/Punto2D.js?v=flechas18';
import { Configuracion } from '../../../core/constants/Configuracion.js';
import { FormateadorMatematico } from '../../../shared/utils/FormateadorMatematico.js?v=flechas18';
import { GeneradorInputs } from '../../../shared/utils/GeneradorInputs.js?v=flechas18';
import { CatalogoInfoContextual } from '../../teoria/domain/CatalogoInfoContextual.js?v=flechas18';

/**
 * Controlador de presentación para la gestión de puntos de unión y cadena vectorial.
 */
export class ControladorCadena {
  /**
   * @param {HTMLElement} contenedorFormulario
   * @param {HTMLElement} contenedorResumen
   * @param {CalcularCadenaUseCase} casoDeUso
   * @param {EstadoApp} estadoApp
   * @param {Function} alCambiarGeometria
   */
  constructor(contenedorFormulario, contenedorResumen, casoDeUso, estadoApp, alCambiarGeometria) {
    this._contenedorFormulario = contenedorFormulario;
    this._contenedorResumen = contenedorResumen;
    this._casoDeUso = casoDeUso;
    this._estadoApp = estadoApp;
    this._alCambiarGeometria = alCambiarGeometria;

    this._puntos = [
      { id: 'A', x: 1, y: 2, color: Configuracion.PALETA_VECTORES[0] },
      { id: 'B', x: 5, y: 6, color: Configuracion.PALETA_VECTORES[1] }
    ];

    this._abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  get puntos() {
    return this._puntos;
  }

  renderizar() {
    const htmlFilas = this._puntos.map((pt, idx) => `
      <div class="fila-vector">
        <div class="cabecera-punto-fila">
          <span class="etiqueta-vector">
            <span class="punto-color" style="background:${pt.color}"></span>
            Punto ${pt.id} ${idx === 0 ? '(Origen inicial)' : (idx === this._puntos.length - 1 ? '(Extremo final)' : `(Unión ${idx})`)}
            ${CatalogoInfoContextual.htmlBotonInfo('coord-punto')}
          </span>
          ${this._puntos.length > 2 ? `
            <button class="btn-eliminar-punto" data-indice="${idx}" type="button" title="Eliminar punto ${pt.id}">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          ` : ''}
        </div>
        <div class="inputs-par">
          ${GeneradorInputs.crearCampoNumero({
            id: `coord-${pt.id}-x`,
            name: `coord-${pt.id}-x`,
            etiqueta: `${pt.id}x`,
            valor: pt.x,
            clasesExtra: 'input-cadena-coord',
            dataAttrs: `data-indice="${idx}" data-eje="x"`
          })}
          ${GeneradorInputs.crearCampoNumero({
            id: `coord-${pt.id}-y`,
            name: `coord-${pt.id}-y`,
            etiqueta: `${pt.id}y`,
            valor: pt.y,
            clasesExtra: 'input-cadena-coord',
            dataAttrs: `data-indice="${idx}" data-eje="y"`
          })}
        </div>
      </div>
    `).join('');

    this._contenedorFormulario.innerHTML = `
      <div class="grupo-coordenadas">
        ${htmlFilas}
        <button id="btn-agregar-punto" class="btn-agregar-punto" type="button" title="Añadir un nuevo punto para encadenar y calcular más vectores">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="16"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          + Añadir Punto de Unión Vectorial
        </button>
      </div>
    `;

    this._vincularEventos();
  }

  _vincularEventos() {
    const btnAgregar = document.getElementById('btn-agregar-punto');
    if (btnAgregar) {
      btnAgregar.addEventListener('click', () => {
        const n = this._puntos.length;
        const nuevoId = String.fromCharCode(65 + n);
        const anterior = this._puntos[n - 1];
        const color = Configuracion.PALETA_VECTORES[n % Configuracion.PALETA_VECTORES.length];

        this._puntos.push({
          id: nuevoId,
          x: anterior.x + 3,
          y: anterior.y + (n % 2 === 0 ? 2 : -2),
          color
        });

        this.renderizar();
        this.procesarYActualizar();
        if (this._alCambiarGeometria) this._alCambiarGeometria(true);
      });
    }

    const btnsEliminar = this._contenedorFormulario.querySelectorAll('.btn-eliminar-punto');
    btnsEliminar.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.indice);
        if (this._puntos.length > 2) {
          this._puntos.splice(idx, 1);
          this._puntos.forEach((p, i) => {
            p.id = String.fromCharCode(65 + i);
          });
          this.renderizar();
          this.procesarYActualizar();
          if (this._alCambiarGeometria) this._alCambiarGeometria(true);
        }
      });
    });

    const inputs = this._contenedorFormulario.querySelectorAll('.input-cadena-coord');
    inputs.forEach(inp => {
      inp.addEventListener('input', (e) => {
        const idx = Number(e.target.dataset.indice);
        const eje = e.target.dataset.eje;
        const val = Number(e.target.value);
        this._puntos[idx][eje] = Number.isNaN(val) ? 0 : val;
        this.procesarYActualizar();
      });
    });
  }

  reiniciarACero() {
    this._puntos = [
      { id: 'A', x: 0, y: 0, color: Configuracion.PALETA_VECTORES[0] },
      { id: 'B', x: 0, y: 0, color: Configuracion.PALETA_VECTORES[1] }
    ];
    this.renderizar();
    this.procesarYActualizar();
    if (this._alCambiarGeometria) this._alCambiarGeometria(true);
  }

  cargarEjercicio(puntos) {
    this._puntos = puntos.map((p, idx) => ({
      id: p.nombre || String.fromCharCode(65 + idx),
      x: p.x,
      y: p.y,
      color: Configuracion.PALETA_VECTORES[idx % Configuracion.PALETA_VECTORES.length]
    }));
    this.renderizar();
    this.procesarYActualizar();
    if (this._alCambiarGeometria) this._alCambiarGeometria(true);
  }

  procesarYActualizar() {
    const puntosEntidad = this._puntos.map(p => new Punto2D(p.x, p.y, p.id));
    const resultado = this._casoDeUso.ejecutar(puntosEntidad);
    const estado = this._estadoApp.obtener();
    const esEjercicioOculto = estado.entornoActivo === Configuracion.ENTORNOS_APP.EJERCICIO && !estado.respuestasVisibles;

    let vectoresADibujar = [];
    if (!esEjercicioOculto) {
      vectoresADibujar = resultado.vectores.length > 1
        ? [...resultado.vectores, resultado.vectorResultante]
        : resultado.vectores;
    }

    this._estadoApp.actualizar({
      ultimoResultado: resultado,
      vectoresRenderizables: vectoresADibujar,
      puntosRenderizables: puntosEntidad
    });

    this._renderizarResumen(resultado, puntosEntidad, esEjercicioOculto);
  }

  _renderizarResumen(resultado, puntosEntidad, esEjercicioOculto) {
    if (esEjercicioOculto) {
      this._contenedorResumen.innerHTML = `
        <div class="item-resumen" style="grid-column: span 2; text-align: center; padding: 1rem 0.5rem;">
          <span class="badge-tag" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); margin-bottom: 0.5rem; display: inline-block;">
            MODO EJERCICIO ACTIVO
          </span>
          <div style="font-size:0.8rem; color:var(--color-texto-secundario); line-height: 1.4;">
            Las magnitudes y el vector solución están ocultos. Resuelve el ejercicio e introduce tus respuestas abajo para comprobar tu solución.
          </div>
        </div>
      `;
      return;
    }

    const esCadena = resultado.vectores.length > 1;
    const v1 = resultado.vectores[0];

    if (!esCadena) {
      const etqV1 = v1.etiqueta || 'AB';
      this._contenedorResumen.innerHTML = `
        <div class="item-resumen">
          <div class="etiqueta">Componentes ${FormateadorMatematico.htmlVector(etqV1)} ${CatalogoInfoContextual.htmlBotonInfo('vector-ab')}</div>
          <div class="valor">(${v1.x}, ${v1.y})</div>
        </div>
        <div class="item-resumen">
          <div class="etiqueta">Módulo ||${FormateadorMatematico.htmlVector(etqV1)}|| ${CatalogoInfoContextual.htmlBotonInfo('modulo')}</div>
          <div class="valor">${FormateadorMatematico.formatearNumero(v1.modulo())} u</div>
        </div>
        <div class="item-resumen">
          <div class="etiqueta">Ángulo θ ${CatalogoInfoContextual.htmlBotonInfo('angulo-director')}</div>
          <div class="valor">${FormateadorMatematico.formatearGrados(v1.direccionGrados())}</div>
        </div>
        <div class="item-resumen">
          <div class="etiqueta">Distancia d(A,B) ${CatalogoInfoContextual.htmlBotonInfo('distancia-puntos')}</div>
          <div class="valor">${FormateadorMatematico.formatearNumero(puntosEntidad[0].distanciaA(puntosEntidad[1]))}</div>
        </div>
      `;
    } else {
      const r = resultado.vectorResultante;
      this._contenedorResumen.innerHTML = `
        <div class="item-resumen">
          <div class="etiqueta">Vector Resultante ${FormateadorMatematico.htmlVector('R')} ${CatalogoInfoContextual.htmlBotonInfo('vector-resultante')}</div>
          <div class="valor" style="color:#10b981">(${r.x}, ${r.y})</div>
        </div>
        <div class="item-resumen">
          <div class="etiqueta">Módulo ||${FormateadorMatematico.htmlVector('R')}|| Neto ${CatalogoInfoContextual.htmlBotonInfo('modulo')}</div>
          <div class="valor" style="color:#10b981">${FormateadorMatematico.formatearNumero(r.modulo())} u</div>
        </div>
        <div class="item-resumen">
          <div class="etiqueta">Vectores Unidos ${CatalogoInfoContextual.htmlBotonInfo('vector-resultante')}</div>
          <div class="valor">${resultado.vectores.length} tramos</div>
        </div>
        <div class="item-resumen">
          <div class="etiqueta">Trayectoria Total ${CatalogoInfoContextual.htmlBotonInfo('modulo')}</div>
          <div class="valor">${FormateadorMatematico.formatearNumero(resultado.longitudTotal)} u</div>
        </div>
        <div class="item-resumen" style="grid-column: span 2;">
          <div class="etiqueta">Tramos de Unión</div>
          <div style="font-size:0.75rem; color:#cbd5e1; margin-top:0.2rem;">
            ${resultado.vectores.map(v => `<span style="display:inline-flex; align-items:center; margin-right:10px; font-family:var(--fuente-mono)"><span style="display:inline-block; width:7px; height:7px; border-radius:50%; background:${v.color}; margin-right:4px;"></span> ${v.etiqueta}: (${v.x}, ${v.y}) [${FormateadorMatematico.formatearNumero(v.modulo(), 1)}u]</span>`).join('')}
          </div>
        </div>
      `;
    }
  }
}
