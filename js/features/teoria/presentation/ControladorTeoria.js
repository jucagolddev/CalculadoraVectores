import { RepositorioTeoria } from '../domain/RepositorioTeoria.js';

/**
 * Controlador de presentación para la Sección Teórica Interactiva y Guía Pedagógica.
 */
export class ControladorTeoria {
  /**
   * @param {HTMLElement} modalElemento
   * @param {Function} alCargarEjemploEnSimulador - Callback para cargar ejemplos en el lienzo
   */
  constructor(modalElemento, alCargarEjemploEnSimulador) {
    this._modal = modalElemento;
    this._alCargarEjemplo = alCargarEjemploEnSimulador;

    this._listaIndice = modalElemento.querySelector('#indice-temas-teoria');
    this._visorContenido = modalElemento.querySelector('#visor-contenido-teoria');
    this._inputBuscador = modalElemento.querySelector('#input-buscador-teoria');
    this._btnCerrar = modalElemento.querySelector('#btn-cerrar-teoria');

    this._temaActivoId = 'fundamentos';
    this._temasVisibles = RepositorioTeoria.obtenerTemas();

    this._iniciar();
  }

  _iniciar() {
    this._renderizarIndice();
    this._renderizarContenido(this._temaActivoId);

    // Búsqueda en tiempo real
    if (this._inputBuscador) {
      this._inputBuscador.addEventListener('input', (e) => {
        const termino = e.target.value;
        this._temasVisibles = RepositorioTeoria.buscar(termino);
        this._renderizarIndice();

        // Si el tema actual ya no está visible en el filtro, activar el primero de la búsqueda
        if (this._temasVisibles.length > 0 && !this._temasVisibles.some(t => t.id === this._temaActivoId)) {
          this._temaActivoId = this._temasVisibles[0].id;
          this._renderizarContenido(this._temaActivoId);
        } else if (this._temasVisibles.length === 0) {
          this._visorContenido.innerHTML = `
            <div class="teoria-sin-resultados">
              <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" style="margin-bottom:0.75rem; color:var(--color-texto-tenue);">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <p>No se encontraron conceptos para <strong>"${termino}"</strong>.</p>
              <p style="font-size:0.8rem; margin-top:0.25rem;">Intenta buscar términos como "Pitágoras", "Escalar", "Paralelogramo", "Ortogonal" o "Unitario".</p>
            </div>
          `;
        }
      });
    }

    // Cierre del modal
    this._btnCerrar?.addEventListener('click', () => this.cerrar());
    this._modal.addEventListener('click', (e) => {
      if (e.target === this._modal) this.cerrar();
    });

    // Delegación de eventos para índice y botones interactivos
    this._listaIndice?.addEventListener('click', (e) => {
      const item = e.target.closest('.item-tema-teoria');
      if (!item) return;
      const temaId = item.dataset.temaId;
      this._temaActivoId = temaId;
      this._renderizarIndice();
      this._renderizarContenido(temaId);
    });

    this._visorContenido?.addEventListener('click', (e) => {
      const btnProbar = e.target.closest('.btn-probar-simulador');
      const btnReto = e.target.closest('.btn-practicar-reto');

      if (btnProbar) {
        const tema = RepositorioTeoria.obtenerPorId(this._temaActivoId);
        if (tema && tema.ejemplo && this._alCargarEjemplo) {
          this.cerrar();
          this._alCargarEjemplo({
            modo: tema.ejemplo.simulacion.modo,
            datos: tema.ejemplo.simulacion.datos,
            construccion: tema.ejemplo.simulacion.construccion || 'paralelogramo',
            entorno: 'calculadora'
          });
        }
      } else if (btnReto) {
        const tema = RepositorioTeoria.obtenerPorId(this._temaActivoId);
        if (tema && tema.ejemplo && this._alCargarEjemplo) {
          this.cerrar();
          this._alCargarEjemplo({
            modo: tema.ejemplo.simulacion.modo,
            datos: tema.ejemplo.simulacion.datos,
            construccion: tema.ejemplo.simulacion.construccion || 'paralelogramo',
            entorno: 'ejercicio'
          });
        }
      }
    });
  }

  _renderizarIndice() {
    if (!this._listaIndice) return;

    if (this._temasVisibles.length === 0) {
      this._listaIndice.innerHTML = '<div style="padding:1rem; font-size:0.8rem; color:var(--color-texto-tenue); text-align:center;">Sin resultados</div>';
      return;
    }

    this._listaIndice.innerHTML = this._temasVisibles.map(t => `
      <button class="item-tema-teoria ${t.id === this._temaActivoId ? 'activo' : ''}" data-tema-id="${t.id}" type="button">
        <span class="numero-tema-badge">${t.numero}</span>
        <div class="texto-tema-indice">
          <div style="font-size:0.7rem; text-transform:uppercase; color:var(--color-texto-tenue);">${t.categoria}</div>
          <div>${t.titulo.split(':')[1] ? t.titulo.split(':')[1].trim() : t.titulo}</div>
        </div>
      </button>
    `).join('');
  }

  _renderizarContenido(temaId) {
    if (!this._visorContenido) return;
    const tema = RepositorioTeoria.obtenerPorId(temaId);
    if (!tema) return;

    // Procesar texto con formateo en negritas y saltos de línea
    const explicacionFormateada = tema.explicacion
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .split('\n\n')
      .map(parrafo => `<p class="texto-explicacion">${parrafo.replace(/\n/g, '<br>')}</p>`)
      .join('');

    this._visorContenido.innerHTML = `
      <div class="cabecera-tema-actual">
        <span class="categoria-tema-tag">${tema.categoria}</span>
        <h2 class="titulo-tema-actual">${tema.titulo}</h2>
        <p class="descripcion-tema-intro">${tema.resumen}</p>
      </div>

      <div class="seccion-deduccion">
        <div class="titulo-deduccion">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="color:var(--color-cian);">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          Deducción y Lógica Matemática
        </div>
        ${explicacionFormateada}
      </div>

      <div class="formula-destacada-caja">
        <div class="formula-destacada-expresion">${tema.formula}</div>
        <div class="formula-destacada-nota">${tema.formulaNota}</div>
      </div>

      <div class="nota-pedagogica">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
        <div><strong>Comprensión Intuitiva:</strong> ${tema.notaPedagogica}</div>
      </div>

      <div class="tarjeta-ejemplo-practico">
        <div class="cabecera-ejemplo">
          <div class="titulo-ejemplo">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            Ejemplo Práctico Guiado
          </div>
        </div>
        <div class="enunciado-ejemplo">${tema.ejemplo.enunciado}</div>
        <div class="pasos-ejemplo-lista">
          ${tema.ejemplo.pasos.map(p => `
            <div><span class="etiqueta-paso">${p.paso}:</span> ${p.calculo}</div>
          `).join('')}
          <div style="border-top:1px solid rgba(255,255,255,0.1); padding-top:0.4rem; margin-top:0.2rem; color:var(--color-esmeralda); font-weight:700;">
            Resultado Final: ${tema.ejemplo.resultado}
          </div>
        </div>
        <div class="acciones-ejemplo-interactivo">
          <button type="button" class="btn-probar-simulador" title="Cargar este ejemplo directamente en el lienzo interactivo">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Probar en el Simulador
          </button>
          <button type="button" class="btn-practicar-reto" title="Cargar este ejercicio en modo reto a ciegas para practicar">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
            Practicar este Reto
          </button>
        </div>
      </div>
    `;
  }

  abrir(temaId = null) {
    if (temaId && RepositorioTeoria.obtenerPorId(temaId)) {
      this._temaActivoId = temaId;
    }
    this._renderizarIndice();
    this._renderizarContenido(this._temaActivoId);
    this._modal.classList.add('activo');
  }

  cerrar() {
    this._modal.classList.remove('activo');
  }
}
