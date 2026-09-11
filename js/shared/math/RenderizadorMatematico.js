/**
 * Adaptador de Dominio / Presentación para Renderizado Matemático Editorial
 * Integra KaTeX para renderizar fórmulas TeX, vectores con flechas proporcionales (\vec{v}),
 * matrices columna (\begin{pmatrix} x \\ y \end{pmatrix}), determinantes de Laplace
 * y radicales euclídeos en alta resolución sin degradación tipográfica.
 */
export class RenderizadorMatematico {
  /**
   * Configuración estándar de delimitadores matemáticos TeX para KaTeX auto-render.
   */
  static get OPCIONES_POR_DEFECTO() {
    return {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\[', right: '\\]', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false }
      ],
      throwOnError: false,
      errorColor: '#f43f5e',
      strict: false,
      trust: false,
      macros: {
        '\\R': '\\mathbb{R}',
        '\\norm': '\\left\\|#1\\right\\|',
        '\\proy': '\\operatorname{proy}'
      }
    };
  }

  /**
   * Determina si la biblioteca KaTeX está disponible en el ámbito global.
   * @returns {boolean}
   */
  static estaDisponible() {
    return typeof window !== 'undefined' && Boolean(window.katex);
  }

  /**
   * Renderiza recursivamente todas las expresiones matemáticas TeX contenidas
   * dentro de un elemento del DOM mediante auto-render de KaTeX.
   * @param {HTMLElement} elemento - Nodo contenedor del DOM a procesar.
   * @param {object} [opcionesPersonalizadas={}]
   */
  static renderizarElemento(elemento, opcionesPersonalizadas = {}) {
    if (!elemento || !(elemento instanceof HTMLElement)) return;

    if (typeof window.renderMathInElement === 'function') {
      const opciones = { ...this.OPCIONES_POR_DEFECTO, ...opcionesPersonalizadas };
      try {
        window.renderMathInElement(elemento, opciones);
      } catch (error) {
        console.warn('[RenderizadorMatematico] Error durante el auto-renderizado KaTeX:', error);
      }
    } else if (this.estaDisponible()) {
      // Si renderMathInElement aún no estuviese enlazado, fallback selectivo
      this._renderizarSelectoresManuales(elemento);
    }
  }

  /**
   * Renderiza una cadena LaTeX individual y devuelve el marcado HTML generado.
   * @param {string} latex - Código LaTeX a compilar.
   * @param {boolean} [modoDisplay=false] - Si es true, compila en bloque centrado.
   * @returns {string} HTML renderizado por KaTeX o fallback si falla.
   */
  static renderizarLatex(latex, modoDisplay = false) {
    if (!latex) return '';

    if (this.estaDisponible()) {
      try {
        return window.katex.renderToString(latex, {
          displayMode: modoDisplay,
          throwOnError: false
        });
      } catch (error) {
        console.warn('[RenderizadorMatematico] Fallo compilando LaTeX:', latex, error);
      }
    }

    // Fallback si KaTeX no está listo
    return `<span class="tex-fallback">${latex}</span>`;
  }

  /**
   * Formatea un vector con su flecha superior y componentes canónicas en formato TeX.
   * @param {string} nombre - Nombre del vector (ej: 'v', 'u', 'AB').
   * @param {number|string} x - Componente X.
   * @param {number|string} y - Componente Y.
   * @param {number|string|null} [z=null] - Componente Z si aplica.
   * @returns {string} Código LaTeX listo para renderizado.
   */
  static vectorLatex(nombre, x, y, z = null) {
    const cuerpo = z !== null ? `${x}, ${y}, ${z}` : `${x}, ${y}`;
    return `\\vec{${nombre}} = (${cuerpo})`;
  }

  /**
   * Fallback que busca selectores con clase .tex-formula y los compila con katex.renderToString.
   * @private
   */
  static _renderizarSelectoresManuales(contenedor) {
    const nodos = contenedor.querySelectorAll('.tex-formula, [data-latex]');
    nodos.forEach(nodo => {
      const latex = nodo.dataset.latex || nodo.textContent.trim();
      const display = nodo.classList.contains('tex-display');
      try {
        nodo.innerHTML = window.katex.renderToString(latex, { displayMode: display, throwOnError: false });
      } catch (e) {
        // Preservar texto
      }
    });
  }
}
