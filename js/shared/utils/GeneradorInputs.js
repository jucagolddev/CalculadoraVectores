/**
 * Generador de componentes de entrada numérica con prefijo integrado y steppers estilizados.
 * Asegura una estructura modular que erradica solapamientos visuales de texto y estandariza controles.
 */
export class GeneradorInputs {
  /**
   * Genera el bloque HTML para los botones de incremento y decremento estilizados.
   * @returns {string}
   */
  static htmlStepper() {
    return `
      <div class="stepper-controles">
        <button type="button" class="btn-step btn-step-arriba" tabindex="-1" title="Incrementar">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </button>
        <button type="button" class="btn-step btn-step-abajo" tabindex="-1" title="Decrementar">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
      </div>
    `;
  }

  /**
   * Genera el marcado de un contenedor .input-con-icono con prefijo, input numérico y stepper.
   * @param {Object} opciones
   * @param {string} opciones.id - ID único del input
   * @param {string} [opciones.name] - Atributo name
   * @param {string} opciones.etiqueta - Texto de la etiqueta/prefijo (ej: Ax, dx, ||v||)
   * @param {number|string} [opciones.valor=''] - Valor actual del campo
   * @param {string} [opciones.placeholder=''] - Texto guía para el usuario
   * @param {string} [opciones.step='any'] - Paso numérico
   * @param {string} [opciones.clasesExtra=''] - Clases CSS adicionales para el input
   * @param {string} [opciones.dataAttrs=''] - Atributos data-* adicionales
   * @returns {string}
   */
  static crearCampoNumero({
    id,
    name = '',
    etiqueta,
    valor = '',
    placeholder = '',
    step = 'any',
    clasesExtra = '',
    dataAttrs = '',
    permiteIncognita = false
  }) {
    const attrName = name ? `name="${name}"` : '';
    const attrValor = valor !== '' && valor !== null && valor !== undefined ? `value="${valor}"` : '';
    const attrPlaceholder = placeholder ? `placeholder="${placeholder}"` : '';
    const esIncog = permiteIncognita && String(valor).trim() === '?';
    const claseIncogContenedor = esIncog ? 'tiene-incognita' : '';
    const claseIncogInput = esIncog ? 'es-incognita' : '';
    const tipoInput = permiteIncognita ? 'text' : 'number';
    const attrInputMode = permiteIncognita ? 'inputmode="text"' : '';

    const botonIncognita = permiteIncognita ? `
      <button type="button" class="btn-toggle-incognita ${esIncog ? 'activo' : ''}" data-target-id="${id}" tabindex="-1" title="Alternar entre incógnita (?) y valor numérico">
        ?
      </button>
    ` : '';

    return `
      <div class="input-con-icono ${claseIncogContenedor}">
        <span>${etiqueta}</span>
        <input type="${tipoInput}" ${attrInputMode} id="${id}" ${attrName} class="input-numero ${claseIncogInput} ${clasesExtra}" ${dataAttrs} ${attrValor} ${attrPlaceholder} step="${step}" ${permiteIncognita ? 'data-permite-incognita="true"' : ''}>
        ${botonIncognita}
        ${this.htmlStepper()}
      </div>
    `;
  }

  /**
   * Inicializa la delegación global de eventos de click para los controles stepper e incógnitas.
   * Aplica incrementos/decrementos seguros con precisión decimal y dispara eventos reactivos.
   */
  static inicializarManejadorSteppers() {
    document.addEventListener('click', (evento) => {
      // Manejar click en toggle de incógnita (?)
      const botonIncog = evento.target.closest('.btn-toggle-incognita');
      if (botonIncog) {
        const contenedor = botonIncog.closest('.input-con-icono');
        const input = contenedor?.querySelector('.input-numero');
        if (!input) return;

        if (input.value.trim() === '?') {
          input.value = input.dataset.prevValor || '0';
          contenedor.classList.remove('tiene-incognita');
          input.classList.remove('es-incognita');
          botonIncog.classList.remove('activo');
        } else {
          input.dataset.prevValor = input.value;
          input.value = '?';
          contenedor.classList.add('tiene-incognita');
          input.classList.add('es-incognita');
          botonIncog.classList.add('activo');
        }

        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        return;
      }

      // Manejar steppers
      const botonStep = evento.target.closest('.btn-step');
      if (!botonStep) return;

      const contenedor = botonStep.closest('.input-con-icono');
      const input = contenedor?.querySelector('.input-numero');
      if (!input) return;

      const pasoDefinido = parseFloat(input.step);
      const paso = !isNaN(pasoDefinido) && pasoDefinido > 0 ? pasoDefinido : 1;

      // Si el campo estaba en '?', al pulsar stepper pasa a número
      if (input.value.trim() === '?') {
        contenedor.classList.remove('tiene-incognita');
        input.classList.remove('es-incognita');
        const btnIncog = contenedor.querySelector('.btn-toggle-incognita');
        if (btnIncog) btnIncog.classList.remove('activo');
        input.value = botonStep.classList.contains('btn-step-arriba') ? paso : -paso;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        return;
      }

      const valorActual = parseFloat(input.value) || 0;
      let nuevoValor;
      if (botonStep.classList.contains('btn-step-arriba')) {
        nuevoValor = parseFloat((valorActual + paso).toFixed(4));
      } else if (botonStep.classList.contains('btn-step-abajo')) {
        nuevoValor = parseFloat((valorActual - paso).toFixed(4));
      } else {
        return;
      }

      input.value = nuevoValor;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });

    // Escuchar tipeo directo en campos que permiten incógnitas para actualizar estilo al escribir '?'
    document.addEventListener('input', (evento) => {
      const input = evento.target;
      if (input && input.dataset && input.dataset.permiteIncognita === 'true') {
        const contenedor = input.closest('.input-con-icono');
        const btnIncog = contenedor?.querySelector('.btn-toggle-incognita');
        const esIncog = input.value.trim() === '?';

        if (contenedor) {
          contenedor.classList.toggle('tiene-incognita', esIncog);
        }
        input.classList.toggle('es-incognita', esIncog);
        if (btnIncog) {
          btnIncog.classList.toggle('activo', esIncog);
        }
      }
    });
  }
}
