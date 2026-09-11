import { Punto2D } from '../../../core/models/Punto2D.js?v=flechas18';
import { Configuracion } from '../../../core/constants/Configuracion.js';
import { FormateadorMatematico } from '../../../shared/utils/FormateadorMatematico.js?v=flechas18';
import { GeneradorInputs } from '../../../shared/utils/GeneradorInputs.js?v=flechas18';
import { CatalogoInfoContextual } from '../../teoria/domain/CatalogoInfoContextual.js?v=flechas18';

/**
 * Controlador de presentación para el test y resolución de equipolencia de vectores.
 * Admite evaluación clásica de 4 puntos y despeje algebraico de incógnitas '?' (ej: hallar B y D dado u y A, C).
 */
export class ControladorEquipolencia {
  /**
   * @param {HTMLElement} contenedorFormulario
   * @param {HTMLElement} contenedorResumen
   * @param {ResolverEquipolenciaConIncognitasUseCase} casoDeUso
   * @param {EstadoApp} estadoApp
   */
  constructor(contenedorFormulario, contenedorResumen, casoDeUso, estadoApp) {
    this._contenedorFormulario = contenedorFormulario;
    this._contenedorResumen = contenedorResumen;
    this._casoDeUso = casoDeUso;
    this._estadoApp = estadoApp;

    this._modoEntrada = '4puntos'; // '4puntos' | 'vector-u'
    this._vectorU = { ux: 3, uy: 4 };
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
    this._vectorU = { ux: 0, uy: 0 };
    this.renderizar();
    this.procesarYActualizar();
  }

  cargarEjercicio(datos) {
    this._puntos = {
      ax: datos.Ax !== undefined ? datos.Ax : 1,
      ay: datos.Ay !== undefined ? datos.Ay : 1,
      bx: datos.Bx !== undefined ? datos.Bx : '?',
      by: datos.By !== undefined ? datos.By : '?',
      cx: datos.Cx !== undefined ? datos.Cx : -2,
      cy: datos.Cy !== undefined ? datos.Cy : -1,
      dx: datos.Dx !== undefined ? datos.Dx : '?',
      dy: datos.Dy !== undefined ? datos.Dy : '?'
    };

    if (datos.ux !== undefined && datos.uy !== undefined) {
      this._vectorU = { ux: datos.ux, uy: datos.uy };
      this._modoEntrada = 'vector-u';
    } else {
      this._modoEntrada = '4puntos';
    }

    this.renderizar();
    this.procesarYActualizar();
  }

  renderizar() {
    const esModoVectorU = this._modoEntrada === 'vector-u';

    this._contenedorFormulario.innerHTML = `
      <!-- Selector de Modo de Entrada de Equipolencia -->
      <div class="selector-modo-equipolencia" role="tablist" aria-label="Modo de equipolencia">
        <button type="button" class="btn-tab-equipolencia ${!esModoVectorU ? 'activo' : ''}" data-modo-tab="4puntos" title="Introducir 4 puntos A, B, C, D con o sin incógnitas (?)">
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="6" r="3"/></svg>
          4 Puntos (A, B, C, D)
        </button>
        <button type="button" class="btn-tab-equipolencia ${esModoVectorU ? 'activo' : ''}" data-modo-tab="vector-u" title="Introducir vector guía u y orígenes A y C para hallar B y D">
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          Vector ${FormateadorMatematico.htmlVector('u')} + Orígenes
        </button>
      </div>

      ${esModoVectorU ? `
        <!-- Sección de Vector Director Guía u -->
        <div class="seccion-vector-guia-u">
          <div class="etiqueta-vector" style="margin-bottom:0.4rem;">
            <span class="punto-color" style="background:#a855f7"></span>
            Vector Libre Guía ${FormateadorMatematico.htmlVector('u')} (ux, uy)
          </div>
          <div class="inputs-par">
            ${GeneradorInputs.crearCampoNumero({ id: 'input-ux', name: 'ux', etiqueta: 'ux', valor: this._vectorU.ux, clasesExtra: 'input-vector-u', dataAttrs: 'data-campo-u="ux"' })}
            ${GeneradorInputs.crearCampoNumero({ id: 'input-uy', name: 'uy', etiqueta: 'uy', valor: this._vectorU.uy, clasesExtra: 'input-vector-u', dataAttrs: 'data-campo-u="uy"' })}
          </div>
        </div>
      ` : ''}

      <div class="grupo-coordenadas">
        <!-- Vector AB -->
        <div class="fila-vector">
          <div class="cabecera-punto-fila">
            <span class="etiqueta-vector">
              <span class="punto-color" style="background:#38bdf8"></span>
              Vector ${FormateadorMatematico.htmlVector('AB')} (A → B) ${CatalogoInfoContextual.htmlBotonInfo('vector-ab')}
            </span>
            ${esModoVectorU ? '<span class="badge-tag" style="background:rgba(245,158,11,0.15); color:#f59e0b; font-size:0.68rem;">B = ? (A hallar)</span>' : ''}
          </div>
          <div class="inputs-par">
            ${GeneradorInputs.crearCampoNumero({ id: 'input-ax', name: 'ax', etiqueta: 'Ax', valor: this._puntos.ax, clasesExtra: 'input-eq', dataAttrs: 'data-campo="ax"', permiteIncognita: true })}
            ${GeneradorInputs.crearCampoNumero({ id: 'input-ay', name: 'ay', etiqueta: 'Ay', valor: this._puntos.ay, clasesExtra: 'input-eq', dataAttrs: 'data-campo="ay"', permiteIncognita: true })}
          </div>
          <div class="inputs-par" style="margin-top:0.35rem;">
            ${GeneradorInputs.crearCampoNumero({ id: 'input-bx', name: 'bx', etiqueta: 'Bx', valor: esModoVectorU ? '?' : this._puntos.bx, clasesExtra: 'input-eq', dataAttrs: 'data-campo="bx"', permiteIncognita: true })}
            ${GeneradorInputs.crearCampoNumero({ id: 'input-by', name: 'by', etiqueta: 'By', valor: esModoVectorU ? '?' : this._puntos.by, clasesExtra: 'input-eq', dataAttrs: 'data-campo="by"', permiteIncognita: true })}
          </div>
        </div>

        <!-- Vector CD -->
        <div class="fila-vector">
          <div class="cabecera-punto-fila">
            <span class="etiqueta-vector">
              <span class="punto-color" style="background:#f59e0b"></span>
              Vector ${FormateadorMatematico.htmlVector('CD')} (C → D) ${CatalogoInfoContextual.htmlBotonInfo('vector-cd')}
            </span>
            ${esModoVectorU ? '<span class="badge-tag" style="background:rgba(245,158,11,0.15); color:#f59e0b; font-size:0.68rem;">D = ? (A hallar)</span>' : ''}
          </div>
          <div class="inputs-par">
            ${GeneradorInputs.crearCampoNumero({ id: 'input-cx', name: 'cx', etiqueta: 'Cx', valor: this._puntos.cx, clasesExtra: 'input-eq', dataAttrs: 'data-campo="cx"', permiteIncognita: true })}
            ${GeneradorInputs.crearCampoNumero({ id: 'input-cy', name: 'cy', etiqueta: 'Cy', valor: this._puntos.cy, clasesExtra: 'input-eq', dataAttrs: 'data-campo="cy"', permiteIncognita: true })}
          </div>
          <div class="inputs-par" style="margin-top:0.35rem;">
            ${GeneradorInputs.crearCampoNumero({ id: 'input-dx', name: 'dx', etiqueta: 'Dx', valor: esModoVectorU ? '?' : this._puntos.dx, clasesExtra: 'input-eq', dataAttrs: 'data-campo="dx"', permiteIncognita: true })}
            ${GeneradorInputs.crearCampoNumero({ id: 'input-dy', name: 'dy', etiqueta: 'Dy', valor: esModoVectorU ? '?' : this._puntos.dy, clasesExtra: 'input-eq', dataAttrs: 'data-campo="dy"', permiteIncognita: true })}
          </div>
        </div>
      </div>
    `;

    this._vincularEventos();
  }

  _vincularEventos() {
    // Pestañas de modo de equipolencia
    const tabs = this._contenedorFormulario.querySelectorAll('.btn-tab-equipolencia');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const modo = e.currentTarget.dataset.modoTab;
        if (modo === this._modoEntrada) return;
        this._modoEntrada = modo;
        if (this._modoEntrada === 'vector-u') {
          this._puntos.bx = '?';
          this._puntos.by = '?';
          this._puntos.dx = '?';
          this._puntos.dy = '?';
        }
        this.renderizar();
        this.procesarYActualizar();
      });
    });

    // Inputs de puntos A, B, C, D
    const inputs = this._contenedorFormulario.querySelectorAll('.input-eq');
    inputs.forEach(inp => {
      inp.addEventListener('input', (e) => {
        const campo = e.target.dataset.campo;
        const raw = e.target.value.trim();
        this._puntos[campo] = raw === '?' ? '?' : (raw === '' ? '?' : Number(raw));
        this.procesarYActualizar();
      });
    });

    // Inputs del vector u
    const inputsU = this._contenedorFormulario.querySelectorAll('.input-vector-u');
    inputsU.forEach(inp => {
      inp.addEventListener('input', (e) => {
        const campo = e.target.dataset.campoU;
        const val = Number(e.target.value);
        this._vectorU[campo] = Number.isNaN(val) ? 0 : val;
        this.procesarYActualizar();
      });
    });
  }

  procesarYActualizar() {
    const esModoVectorU = this._modoEntrada === 'vector-u';

    const params = {
      ax: this._puntos.ax,
      ay: this._puntos.ay,
      bx: esModoVectorU ? '?' : this._puntos.bx,
      by: esModoVectorU ? '?' : this._puntos.by,
      cx: this._puntos.cx,
      cy: this._puntos.cy,
      dx: esModoVectorU ? '?' : this._puntos.dx,
      dy: esModoVectorU ? '?' : this._puntos.dy,
      vectorU: esModoVectorU ? this._vectorU : null
    };

    const resultado = this._casoDeUso.ejecutar(params);
    const estado = this._estadoApp.obtener();
    const esEjercicioOculto = estado.entornoActivo === Configuracion.ENTORNOS_APP.EJERCICIO && !estado.respuestasVisibles;

    if (resultado.sistemaIndeterminado) {
      this._estadoApp.actualizar({
        ultimoResultado: resultado,
        vectoresRenderizables: [],
        puntosRenderizables: []
      });
      this._renderizarResumen(resultado, esEjercicioOculto);
      return;
    }

    const vectoresADibujar = esEjercicioOculto
      ? [resultado.vectorAB]
      : [resultado.vectorAB, resultado.vectorCD];

    this._estadoApp.actualizar({
      ultimoResultado: resultado,
      vectoresRenderizables: vectoresADibujar,
      puntosRenderizables: [resultado.puntoA, resultado.puntoB, resultado.puntoC, resultado.puntoD]
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
            El diagnóstico y las incógnitas están ocultos. Resuelve los puntos en papel e ingresa tus respuestas en el panel inferior.
          </div>
        </div>
      `;
      return;
    }

    if (resultado.sistemaIndeterminado) {
      this._contenedorResumen.innerHTML = `
        <div class="item-resumen" style="grid-column: span 2; border: 1px dashed #f59e0b; background: rgba(245, 158, 11, 0.08); padding: 0.85rem;">
          <div style="font-weight: 700; color: #f59e0b; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.4rem;">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Sistema Indeterminado (Faltan Datos)
          </div>
          <div style="font-size: 0.8rem; color: var(--color-texto-secundario); line-height: 1.4;">
            ${resultado.mensajeIndeterminado || 'Introduce más coordenadas conocidas o el vector guía u para despejar el sistema.'}
          </div>
        </div>
      `;
      return;
    }

    const htmlIncognitas = (resultado.totalIncognitas > 0) ? `
      <div class="item-resumen" style="grid-column: span 2; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.35); padding: 0.75rem;">
        <div class="etiqueta" style="color: #10b981; font-weight: 700; display: flex; align-items: center; gap: 0.4rem;">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Incógnitas (?) Halladas por Despeje Algebraico
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 0.4rem; font-family: var(--fuente-mono); font-size: 0.95rem;">
          ${resultado.puntoA.esIncognitaResuelta ? `<span style="color:#38bdf8;"><strong>A</strong> = (${resultado.puntoA.x}, ${resultado.puntoA.y})</span>` : ''}
          ${resultado.puntoB.esIncognitaResuelta ? `<span style="color:#38bdf8;"><strong>B</strong> = (${resultado.puntoB.x}, ${resultado.puntoB.y})</span>` : ''}
          ${resultado.puntoC.esIncognitaResuelta ? `<span style="color:#f59e0b;"><strong>C</strong> = (${resultado.puntoC.x}, ${resultado.puntoC.y})</span>` : ''}
          ${resultado.puntoD.esIncognitaResuelta ? `<span style="color:#f59e0b;"><strong>D</strong> = (${resultado.puntoD.x}, ${resultado.puntoD.y})</span>` : ''}
        </div>
      </div>
    ` : '';

    this._contenedorResumen.innerHTML = `
      ${htmlIncognitas}
      <div class="item-resumen">
        <div class="etiqueta">Vector ${FormateadorMatematico.htmlVector('AB')} ${CatalogoInfoContextual.htmlBotonInfo('vector-ab')}</div>
        <div class="valor">(${resultado.vectorAB.x}, ${resultado.vectorAB.y})</div>
      </div>
      <div class="item-resumen">
        <div class="etiqueta">Vector ${FormateadorMatematico.htmlVector('CD')} ${CatalogoInfoContextual.htmlBotonInfo('vector-cd')}</div>
        <div class="valor">(${resultado.vectorCD.x}, ${resultado.vectorCD.y})</div>
      </div>
      <div class="item-resumen" style="grid-column: span 2;">
        <div class="etiqueta">Equipolencia ${FormateadorMatematico.htmlVector('AB')} ≡ ${FormateadorMatematico.htmlVector('CD')} ${CatalogoInfoContextual.htmlBotonInfo('equipolencia')}</div>
        <div class="valor" style="color:${resultado.sonEquipolentes ? '#10b981' : '#f43f5e'}; font-weight: 700;">
          ${resultado.sonEquipolentes ? 'SÍ: EQUIPOLENTES (Vectores Idénticos)' : 'NO: NO EQUIPOLENTES (Difieren en componentes)'}
        </div>
      </div>
    `;
  }
}
