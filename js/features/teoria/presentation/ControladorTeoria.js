import { RepositorioTeoria } from '../domain/RepositorioTeoria.js';
import { MiniLaboratorioTeoria } from './MiniLaboratorioTeoria.js';

/**
 * Controlador de presentación para la Sección Teórica Interactiva y Guía Pedagógica.
 * Renderiza módulos estructurados con explicaciones rigurosas, tablas de variables,
 * mini-laboratorios interactivos SVG in situ, demostraciones matemáticas desplegables,
 * pasos metódicos de resolución, micro-checkpoints de autocomprobación y guías del simulador.
 */
export class ControladorTeoria {
  /**
   * @param {HTMLElement} modalElemento
   * @param {Function} alCargarEjemploEnSimulador - Callback para cargar ejemplos en el simulador
   */
  constructor(modalElemento, alCargarEjemploEnSimulador) {
    this._modal = modalElemento;
    this._alCargarEjemplo = alCargarEjemploEnSimulador;

    this._listaIndice = modalElemento.querySelector('#indice-temas-teoria');
    this._visorContenido = modalElemento.querySelector('#visor-contenido-teoria');
    this._inputBuscador = modalElemento.querySelector('#input-buscador-teoria');
    this._btnCerrar = modalElemento.querySelector('#btn-cerrar-teoria');
    this._botonesDimension = modalElemento.querySelectorAll('.btn-dimension-teoria');

    this._dimensionActiva = '2d';
    this._terminoBusqueda = '';
    this._temaActivoId = 'fundamentos';
    this._temasVisibles = RepositorioTeoria.obtenerPorDimension('2d');

    this._iniciar();
  }

  _iniciar() {
    this._renderizarIndice();
    this._renderizarContenido(this._temaActivoId);

    // 1. Selector de Dimensión Teórica con Botones Dedicados ℝ² y ℝ³
    if (this._botonesDimension) {
      this._botonesDimension.forEach(btn => {
        btn.addEventListener('click', () => {
          const dimension = btn.dataset.dimension;
          this.establecerDimensionActiva(dimension);
        });
      });
    }

    // 2. Búsqueda en tiempo real acotada a la dimensión activa
    if (this._inputBuscador) {
      this._inputBuscador.addEventListener('input', (e) => {
        this._terminoBusqueda = e.target.value || '';
        this._filtrarTemas();
      });
    }

    // 3. Cierre del modal
    this._btnCerrar?.addEventListener('click', () => this.cerrar());
    this._modal.addEventListener('click', (e) => {
      if (e.target === this._modal) this.cerrar();
    });

    // 4. Delegación de eventos para el índice de temas
    this._listaIndice?.addEventListener('click', (e) => {
      const item = e.target.closest('.item-tema-teoria');
      if (!item) return;
      const temaId = item.dataset.temaId;
      this._temaActivoId = temaId;
      this._renderizarIndice();
      this._renderizarContenido(temaId);
    });

    // 5. Delegación de eventos en el visor de contenido
    this._visorContenido?.addEventListener('click', (e) => {
      // 5.1 Botones de anclaje rápido (Pills de sub-navegación)
      const btnPill = e.target.closest('.pill-subnav');
      if (btnPill) {
        const destinoId = btnPill.dataset.destino;
        const target = this._visorContenido.querySelector(`#${destinoId}`);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }

      // 5.2 Micro-checkpoint: opciones interactivas
      const btnOpcion = e.target.closest('.btn-opcion-checkpoint');
      if (btnOpcion) {
        this._manejarRespuestaCheckpoint(btnOpcion);
        return;
      }

      // 5.3 Botones de acción interactiva ("Probar en Simulador" y "Practicar este Reto")
      const btnProbar = e.target.closest('.btn-probar-simulador');
      const btnReto = e.target.closest('.btn-practicar-reto');

      if (!btnProbar && !btnReto) return;

      const tema = RepositorioTeoria.obtenerPorId(this._temaActivoId);
      if (!tema || !tema.ejemplo || !this._alCargarEjemplo) return;

      const dim = tema.dimension || '2d';
      const esEjercicio = !!btnReto;

      this.cerrar();
      this._alCargarEjemplo({
        modo: tema.ejemplo.simulacion.modo,
        datos: tema.ejemplo.simulacion.datos,
        construccion: tema.ejemplo.simulacion.construccion || 'paralelogramo',
        entorno: esEjercicio ? 'ejercicio' : (dim === '3d' ? 'espacio-3d' : 'calculadora'),
        espacio: dim
      });
    });
  }

  /**
   * Procesa la selección de una opción en el micro-checkpoint interactivo.
   * @param {HTMLElement} btnOpcion
   */
  _manejarRespuestaCheckpoint(btnOpcion) {
    const contenedor = btnOpcion.closest('.tarjeta-checkpoint');
    if (!contenedor) return;

    const idx = parseInt(btnOpcion.dataset.opcionIdx, 10);
    const tema = RepositorioTeoria.obtenerPorId(this._temaActivoId);
    if (!tema || !tema.checkpoint || !tema.checkpoint.opciones[idx]) return;

    const opcion = tema.checkpoint.opciones[idx];
    const feedbackBox = contenedor.querySelector('.feedback-checkpoint-box');
    const todosBotones = contenedor.querySelectorAll('.btn-opcion-checkpoint');

    // Desactivar o limpiar selecciones previas
    todosBotones.forEach(b => {
      b.classList.remove('opcion-correcta', 'opcion-incorrecta');
    });

    if (opcion.correcta) {
      btnOpcion.classList.add('opcion-correcta');
      if (feedbackBox) {
        feedbackBox.className = 'feedback-checkpoint-box feedback-exito';
        feedbackBox.style.display = 'block';
        feedbackBox.innerHTML = `
          <div style="display:flex; align-items:flex-start; gap:0.5rem;">
            <span style="font-size:1.1rem;">🎉</span>
            <div>
              <strong>¡Respuesta Correcta!</strong>
              <div style="font-size:0.84rem; margin-top:0.2rem;">${opcion.feedback}</div>
            </div>
          </div>
        `;
      }
    } else {
      btnOpcion.classList.add('opcion-incorrecta');
      if (feedbackBox) {
        feedbackBox.className = 'feedback-checkpoint-box feedback-fallo';
        feedbackBox.style.display = 'block';
        feedbackBox.innerHTML = `
          <div style="display:flex; align-items:flex-start; gap:0.5rem;">
            <span style="font-size:1.1rem;">💡</span>
            <div>
              <strong>Revisa el planteamiento:</strong>
              <div style="font-size:0.84rem; margin-top:0.2rem;">${opcion.feedback}</div>
            </div>
          </div>
        `;
      }
    }
  }

  /**
   * Cambia la dimensión de teoría activa ('2d' o '3d') y actualiza la vista.
   * @param {'2d'|'3d'} dimension
   */
  establecerDimensionActiva(dimension) {
    if (dimension !== '2d' && dimension !== '3d') return;
    this._dimensionActiva = dimension;

    // Actualizar clase activa en los botones
    if (this._botonesDimension) {
      this._botonesDimension.forEach(btn => {
        btn.classList.toggle('activo', btn.dataset.dimension === dimension);
      });
    }

    this._filtrarTemas();
  }

  /**
   * Aplica los filtros actuales (dimensión y búsqueda de texto).
   */
  _filtrarTemas() {
    this._temasVisibles = RepositorioTeoria.buscar(this._terminoBusqueda, this._dimensionActiva);

    // Si el tema seleccionado ya no pertenece a la vista filtrada, seleccionar el primero disponible
    if (this._temasVisibles.length > 0 && !this._temasVisibles.some(t => t.id === this._temaActivoId)) {
      this._temaActivoId = this._temasVisibles[0].id;
    }

    this._renderizarIndice();

    if (this._temasVisibles.length > 0) {
      this._renderizarContenido(this._temaActivoId);
    } else {
      const dimTexto = this._dimensionActiva === '3d' ? 'ℝ³ (Espacio)' : 'ℝ² (Plano)';
      this._visorContenido.innerHTML = `
        <div class="teoria-sin-resultados">
          <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" style="margin-bottom:0.75rem; color:var(--color-texto-tenue);">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <p>No se encontraron conceptos para <strong>"${this._terminoBusqueda}"</strong> en <strong>${dimTexto}</strong>.</p>
          <p style="font-size:0.8rem; margin-top:0.25rem;">Prueba a cambiar a la otra dimensión o a buscar términos más generales.</p>
        </div>
      `;
    }
  }

  _renderizarIndice() {
    if (!this._listaIndice) return;

    if (this._temasVisibles.length === 0) {
      this._listaIndice.innerHTML = '<div style="padding:1rem; font-size:0.8rem; color:var(--color-texto-tenue); text-align:center;">Sin temas disponibles</div>';
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

    const dimBadge = tema.dimension === '3d' ? '🧊 Dimensión ℝ³' : '📐 Dimensión ℝ²';
    const dimColor = tema.dimension === '3d' ? 'var(--color-violeta)' : 'var(--color-cian)';

    // 1. Renderizado de la tabla de variables y simbología
    const htmlVariables = (tema.variables && tema.variables.length > 0) ? `
      <div class="tabla-variables-simbologia">
        <div style="font-size:0.78rem; font-weight:700; color:var(--color-texto-tenue); text-transform:uppercase; margin-bottom:0.25rem;">
          Simbología y Variables Matemáticas
        </div>
        ${tema.variables.map(v => `
          <div class="variable-fila-item">
            <span class="variable-simbolo-badge" style="color:${dimColor}; border-color:${dimColor};">${v.simbolo}</span>
            <div class="variable-desc-texto">
              <strong>${v.nombre}:</strong> ${v.descripcion}
            </div>
          </div>
        `).join('')}
      </div>
    ` : '';

    // 2. Renderizado de Matriz / Determinante visual (si aplica)
    const htmlMatriz = tema.formulaMatriz ? `
      <div style="margin: 0.5rem 0;">
        <div style="font-size:0.8rem; color:var(--color-texto-tenue); margin-bottom:0.25rem;">Determinante Matricial 3×3:</div>
        <div class="matriz-determinante-visual" style="border-color:${dimColor};">
          <div class="matriz-grid-celdas">
            ${tema.formulaMatriz.filas.flatMap((fila, fIdx) => fila.map((c) => {
              let claseExtra = '';
              if (fIdx === 0 && c === 'i') claseExtra = 'celda-canonica-i';
              if (fIdx === 0 && c === 'j') claseExtra = 'celda-canonica-j';
              if (fIdx === 0 && c === 'k') claseExtra = 'celda-canonica-k';
              return `<span class="${claseExtra}">${c}</span>`;
            })).join('')}
          </div>
        </div>
      </div>
    ` : '';

    // 3. Renderizado de la Demostración Formal Desplegable
    const htmlDemostracion = tema.demostracion ? `
      <details class="acordeon-demostracion" id="seccion-demostracion">
        <summary class="cabecera-demostracion">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span class="icono-demostracion">🔍</span>
            <strong style="color:#ffffff;">Demostración Formal:</strong>
            <span style="color:#cbd5e1;">${tema.demostracion.titulo}</span>
          </div>
          <span class="badge-desplegar">Desplegar deducción ▾</span>
        </summary>
        <div class="cuerpo-demostracion">
          <div class="timeline-demostracion">
            ${tema.demostracion.pasos.map((p, pIdx) => `
              <div class="paso-demostracion-item">
                <div class="paso-demostracion-badge">${pIdx + 1}</div>
                <div>
                  <strong style="color:var(--color-cian);">${p.paso}:</strong>
                  <div style="font-size:0.85rem; color:#cbd5e1; margin-top:0.2rem;">${p.detalle}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </details>
    ` : '';

    // 4. Renderizado del Algoritmo Metódico Paso a Paso
    const htmlAlgoritmo = (tema.algoritmoPasos && tema.algoritmoPasos.length > 0) ? `
      <div class="tarjeta-seccion-teoria" id="seccion-algoritmo">
        <div class="titulo-seccion-teoria">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="color:${dimColor};">
            <polyline points="9 11 12 14 22 4"/>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
          </svg>
          Algoritmo de Resolución Paso a Paso (A Mano)
        </div>
        <div class="timeline-pasos-resolucion">
          ${tema.algoritmoPasos.map(p => `
            <div class="paso-metodico-item">
              <div class="paso-numero-badge-grande">${p.paso}</div>
              <div class="paso-contenido-box">
                <div class="paso-titulo-texto">${p.titulo}</div>
                <div class="paso-detalle-texto">${p.detalle}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    // 5. Renderizado de Alerta de Errores Frecuentes
    const htmlErrores = (tema.erroresComunes && tema.erroresComunes.length > 0) ? `
      <div class="caja-alerta-pedagogica" id="seccion-trampas">
        <div class="titulo-alerta">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          Errores Típicos y Trampas a Evitar
        </div>
        <div>
          ${tema.erroresComunes.map(e => `
            <div class="item-error-frecuente">
              <div class="error-nombre">⚠️ Error: ${e.error}</div>
              <div style="font-size:0.8rem; color:var(--color-texto-tenue);">Por qué ocurre: ${e.porqueOcurre}</div>
              <div class="error-solucion">✓ Solución correcta: ${e.solucionCorrecta}</div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    // 6. Renderizado de Guía de Uso en VectorLab
    const htmlGuiaSimulador = (tema.guiaSimulador && tema.guiaSimulador.length > 0) ? `
      <div class="caja-guia-simulador" id="seccion-guia-vectorlab">
        <div class="titulo-guia">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          Cómo Usar e Interpretar este Concepto en VectorLab
        </div>
        <div style="display:flex; flex-direction:column; gap:0.45rem;">
          ${tema.guiaSimulador.map(g => `
            <div class="paso-guia-simulador-item">
              <span class="numero-guia">Paso ${g.paso}:</span>
              <div>
                <strong>${g.accion}.</strong>
                <span style="color:#94a3b8; margin-left:0.25rem;">Resultado esperado: ${g.resultadoEsperado}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    // 7. Renderizado del Micro-Checkpoint de Autocomprobación
    const htmlCheckpoint = tema.checkpoint ? `
      <div class="tarjeta-checkpoint" id="seccion-checkpoint">
        <div class="cabecera-checkpoint">
          <span class="icono-checkpoint">🧠</span>
          <div>
            <h4 class="titulo-checkpoint">Micro-Checkpoint: Autoevaluación In Situ</h4>
            <p class="desc-checkpoint">Pon a prueba tu intuición con esta pregunta rápida de comprensión conceptual.</p>
          </div>
        </div>
        <div class="pregunta-checkpoint-texto">${tema.checkpoint.pregunta}</div>
        <div class="opciones-checkpoint-lista">
          ${tema.checkpoint.opciones.map((opc, oIdx) => `
            <button type="button" class="btn-opcion-checkpoint" data-opcion-idx="${oIdx}">
              <span class="letra-opcion">${String.fromCharCode(65 + oIdx)}</span>
              <span class="texto-opcion">${opc.texto}</span>
            </button>
          `).join('')}
        </div>
        <div class="feedback-checkpoint-box" style="display:none;"></div>
      </div>
    ` : '';

    // 8. Barra de Sub-Navegación Rápida (Pills de anclaje)
    const htmlSubNavPills = `
      <nav class="subnav-pills-teoria" aria-label="Secciones del tema">
        <button type="button" class="pill-subnav" data-destino="seccion-concepto">📖 Concepto</button>
        ${tema.miniLab ? `<button type="button" class="pill-subnav" data-destino="seccion-minilab">⚡ Mini-Lab</button>` : ''}
        ${tema.demostracion ? `<button type="button" class="pill-subnav" data-destino="seccion-demostracion">🔍 Demostración</button>` : ''}
        <button type="button" class="pill-subnav" data-destino="seccion-algoritmo">🔢 Algoritmo</button>
        <button type="button" class="pill-subnav" data-destino="seccion-trampas">⚠️ Trampas</button>
        ${tema.checkpoint ? `<button type="button" class="pill-subnav" data-destino="seccion-checkpoint">🧠 Quiz</button>` : ''}
        <button type="button" class="pill-subnav" data-destino="seccion-ejemplo">🚀 Práctica</button>
      </nav>
    `;

    // Ensamble final del contenido enriquecido
    this._visorContenido.innerHTML = `
      <!-- Cabecera del Tema -->
      <div class="cabecera-tema-actual">
        <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.35rem;">
          <span class="categoria-tema-tag">${tema.categoria}</span>
          <span style="font-size:0.7rem; font-weight:700; color:${dimColor}; background:rgba(255,255,255,0.06); padding:0.15rem 0.5rem; border-radius:4px;">${dimBadge}</span>
        </div>
        <h2 class="titulo-tema-actual">${tema.titulo}</h2>
        <p class="descripcion-tema-intro">${tema.resumen}</p>
        ${htmlSubNavPills}
      </div>

      <!-- Tarjeta 1: Concepto y Fundamento Físico-Matemático -->
      <div class="tarjeta-seccion-teoria" id="seccion-concepto">
        <div class="titulo-seccion-teoria">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="color:${dimColor};">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          Fundamento Teórico y Significado Físico
        </div>
        ${tema.concepto ? `
          <p class="texto-explicacion"><strong>¿Qué es?</strong> ${tema.concepto.queEs}</p>
          <p class="texto-explicacion"><strong>¿Para qué sirve?</strong> ${tema.concepto.paraQueSirve}</p>
          <p class="texto-explicacion"><strong>Significado en Física/Geometría:</strong> ${tema.concepto.significadoFisico}</p>
        ` : `<p class="texto-explicacion">${tema.explicacion}</p>`}
        
        ${htmlVariables}
      </div>

      <!-- Tarjeta 2: Fórmula Matemática Destacada -->
      <div class="formula-destacada-caja" style="border-left-color:${dimColor};">
        <div style="font-size:0.75rem; text-transform:uppercase; color:var(--color-texto-tenue); font-weight:700;">Expresión Matemática Universal</div>
        ${htmlMatriz}
        <div class="formula-destacada-expresion">${tema.formula}</div>
        <div class="formula-destacada-nota">${tema.formulaNota}</div>
      </div>

      <!-- Tarjeta 3: Mini-Laboratorio Interactivo SVG (si aplica) -->
      ${tema.miniLab ? `
        <div class="tarjeta-seccion-teoria minilab-seccion-wrapper" id="seccion-minilab">
          <div id="contenedor-minilab-dinamico"></div>
        </div>
      ` : ''}

      <!-- Tarjeta 4: Demostración Formal Desplegable -->
      ${htmlDemostracion}

      <!-- Tarjeta 5: Algoritmo Metódico Paso a Paso para Resolver a Mano -->
      ${htmlAlgoritmo}

      <!-- Tarjeta 6: Alerta Pedagógica y Prevención de Errores -->
      ${htmlErrores}

      <!-- Tarjeta 7: Guía de Uso Rápido en VectorLab -->
      ${htmlGuiaSimulador}

      <!-- Tarjeta 8: Micro-Checkpoint Interactivo de Autocomprobación -->
      ${htmlCheckpoint}

      <!-- Tarjeta 9: Ejemplo Práctico Guiado y Acciones Interactivas -->
      <div class="tarjeta-ejemplo-practico" id="seccion-ejemplo">
        <div class="cabecera-ejemplo">
          <div class="titulo-ejemplo">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            Ejemplo Numérico Guiado
          </div>
        </div>
        <div class="enunciado-ejemplo">${tema.ejemplo.enunciado}</div>
        <div class="pasos-ejemplo-lista">
          ${tema.ejemplo.pasos.map(p => `
            <div><span class="etiqueta-paso">${p.paso}:</span> ${p.calculo}</div>
          `).join('')}
          <div style="border-top:1px solid rgba(255,255,255,0.1); padding-top:0.4rem; margin-top:0.2rem; color:var(--color-esmeralda); font-weight:700;">
            Resultado Final: ${tema.ejemplo.resultado || tema.ejemplo.pasos[tema.ejemplo.pasos.length - 1].calculo}
          </div>
        </div>
        <div class="acciones-ejemplo-interactivo">
          <button type="button" class="btn-probar-simulador" title="Cargar este ejemplo directamente en el simulador interactivo">
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

    // Si el tema incluye Mini-Laboratorio, inicializarlo en su contenedor específico
    if (tema.miniLab) {
      const contenedorMinilab = this._visorContenido.querySelector('#contenedor-minilab-dinamico');
      if (contenedorMinilab) {
        MiniLaboratorioTeoria.renderizar(contenedorMinilab, tema.miniLab.tipo);
      }
    }
  }

  /**
   * Abre la ventana modal de teoría.
   * @param {string|null} [temaId=null] - ID específico del tema a mostrar.
   * @param {'2d'|'3d'|null} [dimensionPreferida=null] - Dimensión inicial sugerida.
   */
  abrir(temaId = null, dimensionPreferida = null) {
    if (temaId) {
      const tema = RepositorioTeoria.obtenerPorId(temaId);
      if (tema) {
        this.establecerDimensionActiva(tema.dimension || '2d');
        this._temaActivoId = temaId;
      }
    } else if (dimensionPreferida) {
      this.establecerDimensionActiva(dimensionPreferida);
    } else {
      this._filtrarTemas();
    }

    this._renderizarIndice();
    this._renderizarContenido(this._temaActivoId);
    this._modal.classList.add('activo');
  }

  cerrar() {
    this._modal.classList.remove('activo');
  }
}
