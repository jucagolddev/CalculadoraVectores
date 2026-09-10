import { Configuracion } from '../../../core/constants/Configuracion.js';

/**
 * Controlador de presentación para el cajón de resolución paso a paso y evaluación formativa.
 */
export class ControladorSolucion {
  /**
   * @param {HTMLElement} contenedorComprobacion
   * @param {HTMLElement} cajonSolucion
   * @param {HTMLElement} cuerpoSolucion
   * @param {VerificarRespuestaUseCase} casoDeUso
   * @param {EstadoApp} estadoApp
   */
  constructor(contenedorComprobacion, cajonSolucion, cuerpoSolucion, casoDeUso, estadoApp) {
    this._contenedorComprobacion = contenedorComprobacion;
    this._cajonSolucion = cajonSolucion;
    this._cuerpoSolucion = cuerpoSolucion;
    this._casoDeUso = casoDeUso;
    this._estadoApp = estadoApp;

    this._vincularEventos();
  }

  _vincularEventos() {
    const btnCerrar = document.getElementById('btn-cerrar-cajon');
    if (btnCerrar) {
      btnCerrar.addEventListener('click', () => this.cerrar());
    }
  }

  renderizarFormularioComprobacion(modo, puntosCadena = []) {
    if (modo === Configuracion.MODOS_APP.CADENA_PUNTOS) {
      const esMultiple = puntosCadena.length > 2;
      const letraFinal = puntosCadena[puntosCadena.length - 1]?.id || 'B';

      this._contenedorComprobacion.innerHTML = `
        <h3><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg> Comprueba tu Solución</h3>
        <p class="texto-ayuda">${esMultiple ? `Calcula el vector resultante neto (R = A → ${letraFinal}) antes de ver la solución:` : '¿Calculaste el vector a mano? Ingresa tus resultados para verificar si están correctos:'}</p>
        <div class="inputs-par">
          <div class="input-con-icono">
            <span>${esMultiple ? 'Rx' : 'dx'}</span>
            <input type="number" id="test-vx" class="input-numero" placeholder="${esMultiple ? 'Suma dx' : 'Bx - Ax'}" step="any">
          </div>
          <div class="input-con-icono">
            <span>${esMultiple ? 'Ry' : 'dy'}</span>
            <input type="number" id="test-vy" class="input-numero" placeholder="${esMultiple ? 'Suma dy' : 'By - Ay'}" step="any">
          </div>
        </div>
        <div class="input-con-icono">
          <span>${esMultiple ? '||R||' : '||v||'}</span>
          <input type="number" id="test-modulo" class="input-numero" placeholder="Magnitud estimada" step="any">
        </div>
        <button id="btn-validar-usuario" class="btn-comprobar-usuario" type="button">
          Comprobar y Corregir
        </button>
      `;
    } else if (modo === Configuracion.MODOS_APP.OPERACIONES) {
      this._contenedorComprobacion.innerHTML = `
        <h3><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg> Comprueba tu Solución</h3>
        <p class="texto-ayuda">Introduce tus respuestas para suma (u+v) y producto punto (u·v):</p>
        <div class="inputs-par">
          <div class="input-con-icono">
            <span>Sx</span>
            <input type="number" id="test-sumax" class="input-numero" placeholder="ux + vx" step="any">
          </div>
          <div class="input-con-icono">
            <span>Sy</span>
            <input type="number" id="test-sumay" class="input-numero" placeholder="uy + vy" step="any">
          </div>
        </div>
        <div class="input-con-icono">
          <span>u·v</span>
          <input type="number" id="test-punto" class="input-numero" placeholder="ux·vx + uy·vy" step="any">
        </div>
        <button id="btn-validar-usuario" class="btn-comprobar-usuario" type="button">
          Comprobar y Corregir
        </button>
      `;
    } else if (modo === Configuracion.MODOS_APP.EQUIPOLENCIA) {
      this._contenedorComprobacion.innerHTML = `
        <h3><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg> Comprueba tu Solución</h3>
        <p class="texto-ayuda">¿Son equipolentes los vectores AB y CD?:</p>
        <div style="display:flex; gap:1rem; align-items:center; margin: 0.35rem 0;">
          <label class="opcion-radio"><input type="radio" name="test-equipolente" value="si"> SÍ son equipolentes</label>
          <label class="opcion-radio"><input type="radio" name="test-equipolente" value="no"> NO son equipolentes</label>
        </div>
        <button id="btn-validar-usuario" class="btn-comprobar-usuario" type="button">
          Comprobar y Corregir
        </button>
      `;
    }

    const btnValidar = document.getElementById('btn-validar-usuario');
    if (btnValidar) {
      btnValidar.addEventListener('click', () => this.evaluarRespuestaUsuario());
    }
  }

  evaluarRespuestaUsuario() {
    const estado = this._estadoApp.obtener();
    const resultado = estado.ultimoResultado;
    if (!resultado) return;

    let respuestas = {};
    let esperados = {};
    let correcciones = [];

    if (estado.modoActivo === Configuracion.MODOS_APP.CADENA_PUNTOS) {
      const inputDx = document.getElementById('test-vx')?.value;
      const inputDy = document.getElementById('test-vy')?.value;
      const inputMod = document.getElementById('test-modulo')?.value;

      const esMultiple = resultado.vectores.length > 1;
      const target = esMultiple ? resultado.vectorResultante : resultado.vectores[0];

      respuestas = {
        [esMultiple ? 'Resultante X (Rx)' : 'Componente X (dx)']: inputDx,
        [esMultiple ? 'Resultante Y (Ry)' : 'Componente Y (dy)']: inputDy,
        [esMultiple ? 'Módulo Resultante ||R||' : 'Módulo ||v||']: inputMod
      };

      esperados = {
        [esMultiple ? 'Resultante X (Rx)' : 'Componente X (dx)']: target.x,
        [esMultiple ? 'Resultante Y (Ry)' : 'Componente Y (dy)']: target.y,
        [esMultiple ? 'Módulo Resultante ||R||' : 'Módulo ||v||']: target.modulo()
      };

      correcciones = this._casoDeUso.ejecutar(respuestas, esperados);

    } else if (estado.modoActivo === Configuracion.MODOS_APP.OPERACIONES) {
      const inputSx = document.getElementById('test-sumax')?.value;
      const inputSy = document.getElementById('test-sumay')?.value;
      const inputPunto = document.getElementById('test-punto')?.value;

      respuestas = {
        'Suma Componente X': inputSx,
        'Suma Componente Y': inputSy,
        'Producto Escalar u·v': inputPunto
      };

      esperados = {
        'Suma Componente X': resultado.suma.x,
        'Suma Componente Y': resultado.suma.y,
        'Producto Escalar u·v': resultado.productoPunto
      };

      correcciones = this._casoDeUso.ejecutar(respuestas, esperados);

    } else if (estado.modoActivo === Configuracion.MODOS_APP.EQUIPOLENCIA) {
      const seleccion = document.querySelector('input[name="test-equipolente"]:checked')?.value;
      const correcto = (seleccion === 'si' && resultado.sonEquipolentes) ||
                       (seleccion === 'no' && !resultado.sonEquipolentes);

      correcciones = [
        {
          campo: 'Diagnóstico de Equipolencia',
          correcto: correcto,
          esperado: resultado.sonEquipolentes ? 'SÍ son equipolentes' : 'NO son equipolentes',
          recibido: seleccion ? (seleccion === 'si' ? 'SÍ son equipolentes' : 'NO son equipolentes') : 'Sin responder',
          mensaje: correcto
            ? '¡Correcto! Has deducido adecuadamente la relación de equipolencia.'
            : 'Tu deducción no coincide. Recuerda que para ser equipolentes deben coincidir en dx y dy.'
        }
      ];
    }

    this._estadoApp.actualizar({ respuestasVisibles: true });
    this.abrir(correcciones);
  }

  abrir(correcciones = null) {
    const estado = this._estadoApp.obtener();
    const resultado = estado.ultimoResultado;
    if (!resultado || !resultado.pasos) return;

    let htmlEvaluacion = '';
    if (correcciones && correcciones.length > 0) {
      const tieneErrores = correcciones.some(c => !c.correcto);
      htmlEvaluacion = `
        <div class="seccion-evaluacion-usuario ${tieneErrores ? 'con-errores' : ''}">
          <div class="titulo-evaluacion" style="color:${tieneErrores ? '#f43f5e' : '#34d399'}">
            ${tieneErrores
              ? '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> Revisión de tus respuestas: Hay discrepancias por corregir'
              : '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> ¡Excelente trabajo! Todos tus cálculos coinciden con la solución'}
          </div>
          <div class="grid-correcciones">
            ${correcciones.map(c => `
              <div class="tarjeta-resultado-item ${c.correcto ? 'valido' : 'erroneo'}">
                <div class="nombre-variable">${c.campo}</div>
                <div class="valores-comparados">
                  Tu cálculo: <strong style="color:${c.correcto ? '#34d399' : '#f43f5e'}">${c.recibido}</strong> |
                  Valor exacto: <strong>${c.esperado}</strong>
                </div>
                <div class="feedback-texto" style="color:${c.correcto ? '#38bdf8' : '#fda4af'}">${c.mensaje}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    const htmlPasos = resultado.pasos.map(paso => `
      <div class="paso-matematico">
        <div class="paso-titulo">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
          ${paso.titulo}
        </div>
        <div class="bloque-formula">Fórmula teórica: ${paso.formula}</div>
        <div class="bloque-sustitucion">Sustitución de datos: ${paso.sustitucion}</div>
        <div class="bloque-resultado">${paso.resultado}</div>
      </div>
    `).join('');

    this._cuerpoSolucion.innerHTML = htmlEvaluacion + htmlPasos;
    this._cajonSolucion.classList.add('abierto');
  }

  cerrar() {
    this._cajonSolucion.classList.remove('abierto');
  }
}
