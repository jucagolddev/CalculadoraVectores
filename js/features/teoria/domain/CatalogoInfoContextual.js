/**
 * Catálogo inmutable de definiciones, fórmulas e interpretaciones matemáticas
 * para campos de entrada, parámetros y métricas de solución en VectorLab ℝ².
 */
export class CatalogoInfoContextual {
  static _conceptos = {
    // --- Entradas de Datos y Coordenadas ---
    'coord-punto': {
      titulo: 'Coordenadas de un Punto Cartesiano P(x, y)',
      categoria: 'Geometría Cartesiana',
      temaTeoriaId: 'componentes',
      queEs: 'Posición exacta de un nodo geométrico en el plano cartesiano bidimensional ℝ² respecto al origen (0, 0).',
      formula: 'P = (x, y) \\in \\mathbb{R}^2',
      interpretacion: 'El valor x representa la abscisa (desplazamiento horizontal) y el valor y representa la ordenada (desplazamiento vertical).'
    },
    'vector-u': {
      titulo: 'Vector Concurrente u(ux, uy)',
      categoria: 'Álgebra Vectorial',
      temaTeoriaId: 'fundamentos',
      queEs: 'Entidad geométrica con origen en el punto (0, 0) definida por sus componentes horizontales y verticales.',
      formula: '\\vec{u} = (u_x, u_y)',
      interpretacion: 'Indica una traslación directa desde el origen hasta el extremo (ux, uy).'
    },
    'vector-v': {
      titulo: 'Vector Concurrente v(vx, vy)',
      categoria: 'Álgebra Vectorial',
      temaTeoriaId: 'fundamentos',
      queEs: 'Segundo vector de referencia que interactúa algebraicamente con el vector u.',
      formula: '\\vec{v} = (v_x, v_y)',
      interpretacion: 'Permite formular operaciones como suma, diferencia, proyecciones y producto punto.'
    },
    'escalar-k': {
      titulo: 'Multiplicador Escalar k',
      categoria: 'Álgebra Vectorial',
      temaTeoriaId: 'fundamentos',
      queEs: 'Número real puro que multiplica a cada componente de un vector, alterando su magnitud y posiblemente su sentido.',
      formula: 'k \\cdot \\vec{u} = (k \\cdot u_x, k \\cdot u_y)',
      interpretacion: 'Si |k| > 1 dilata el vector; si 0 < |k| < 1 lo contrae; si k < 0 invierte su sentido 180°.'
    },
    'vector-ab': {
      titulo: 'Vector Fijo AB (Extremo - Origen)',
      categoria: 'Geometría Analítica',
      temaTeoriaId: 'componentes',
      queEs: 'Segmento orientado que parte del punto inicial A y finaliza en el punto de destino B.',
      formula: '\\vec{AB} = B - A = (x_B - x_A, y_B - y_A)',
      interpretacion: 'Representa el desplazamiento relativo necesario para viajar desde la posición A hasta la posición B.'
    },
    'vector-cd': {
      titulo: 'Vector Fijo CD (Extremo - Origen)',
      categoria: 'Geometría Analítica',
      temaTeoriaId: 'componentes',
      queEs: 'Segundo vector fijo en el plano utilizado para contrastar igualdad o equipolencia geométrica contra AB.',
      formula: '\\vec{CD} = D - C = (x_D - x_C, y_D - y_C)',
      interpretacion: 'Permite comprobar si dos vectores situados en diferentes regiones del plano describen la misma acción física.'
    },

    // --- Métricas del Resumen y Soluciones ---
    'vector-resultante': {
      titulo: 'Vector Resultante Neto R',
      categoria: 'Cinemática y Trayectorias',
      temaTeoriaId: 'cadenas-resultante',
      queEs: 'Vector único equivalente al efecto global de recorrer consecutivamente toda la cadena de vectores.',
      formula: '\\vec{R} = \\sum_{i=1}^{n} \\vec{v}_i = (x_{final} - x_{inicial}, y_{final} - y_{inicial})',
      interpretacion: 'El desplazamiento neto solo depende del punto de partida inicial y del punto de llegada final, ignorando la ruta intermedia.'
    },
    'modulo': {
      titulo: 'Módulo o Norma Euclídea ||v||',
      categoria: 'Trigonometría y Norma',
      temaTeoriaId: 'modulo-pitagoras',
      queEs: 'Longitud escalar intrínseca del vector en unidades métricas del plano. Siempre es un valor real no negativo.',
      formula: '\\|\\vec{v}\\| = \\sqrt{v_x^2 + v_y^2} \\ge 0',
      interpretacion: 'Corresponde a la hipotenusa del triángulo rectángulo formado por las dos componentes cartesianas.'
    },
    'angulo-director': {
      titulo: 'Ángulo Director θ (Orientación)',
      categoria: 'Trigonometría',
      temaTeoriaId: 'modulo-pitagoras',
      queEs: 'Inclinación angular del vector medida en sentido antihorario desde el semieje positivo de abscisas (X+).',
      formula: '\\theta = \\operatorname{atan2}(v_y, v_x) \\in [0^{\\circ}, 360^{\\circ})',
      interpretacion: 'Define la dirección absoluta de avance del vector en el plano cartesiano.'
    },
    'vector-unitario': {
      titulo: 'Vector Unitario Director û (Normalización)',
      categoria: 'Normalización',
      temaTeoriaId: 'unitario',
      queEs: 'Vector de longitud unitaria (norma = 1) que señala con total precisión la dirección y sentido de v.',
      formula: '\\hat{u} = \\frac{\\vec{v}}{\\|\\vec{v}\\|} = \\left(\\frac{v_x}{\\|\\vec{v}\\|}, \\frac{v_y}{\\|\\vec{v}\\|}\\right)',
      interpretacion: 'Aísla la dirección pura descartando la escala o magnitud física.'
    },
    'distancia-puntos': {
      titulo: 'Distancia Euclídea d(A, B)',
      categoria: 'Geometría Métrica',
      temaTeoriaId: 'modulo-pitagoras',
      queEs: 'Separación en línea recta entre dos puntos independientes del plano cartesiano.',
      formula: 'd(A, B) = \\|\\vec{AB}\\| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}',
      interpretacion: 'Es simétrica: d(A, B) = d(B, A), y nula si y solo si A y B son idénticos.'
    },
    'suma-vectores': {
      titulo: 'Suma Vectorial u + v',
      categoria: 'Álgebra Vectorial',
      temaTeoriaId: 'algebra-paralelogramo',
      queEs: 'Combinación lineal directa donde se suman algebraicamente las componentes afines de ambos vectores.',
      formula: '\\vec{u} + \\vec{v} = (u_x + v_x, u_y + v_y)',
      interpretacion: 'Geométricamente corresponde a la diagonal mayor del paralelogramo generado por u y v.'
    },
    'resta-vectores': {
      titulo: 'Diferencia Vectorial u - v',
      categoria: 'Álgebra Vectorial',
      temaTeoriaId: 'algebra-paralelogramo',
      queEs: 'Suma del vector u con el opuesto de v: u + (-v).',
      formula: '\\vec{u} - \\vec{v} = (u_x - v_x, u_y - v_y)',
      interpretacion: 'Geométricamente es el vector que va desde el extremo de v hasta el extremo de u (diagonal menor).'
    },
    'producto-escalar': {
      titulo: 'Producto Escalar (Dot Product) u · v',
      categoria: 'Álgebra y Proyecciones',
      temaTeoriaId: 'producto-escalar',
      queEs: 'Operación que multiplica dos vectores y devuelve un número escalar que mide cuánto apuntan en la misma dirección.',
      formula: '\\vec{u} \\cdot \\vec{v} = u_x v_x + u_y v_y = \\|\\vec{u}\\| \\|\\vec{v}\\| \\cos(\\theta)',
      interpretacion: 'Si es 0, los vectores son estrictamente perpendiculares (ortogonales). Si es positivo, forman un ángulo agudo; si es negativo, obtuso.'
    },
    'angulo-entre-vectores': {
      titulo: 'Ángulo entre Vectores θ',
      categoria: 'Geometría Angular',
      temaTeoriaId: 'producto-escalar',
      queEs: 'Apertura angular menor comprendida entre las direcciones directrices de u y v.',
      formula: '\\theta = \\arccos\\left(\\frac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\| \\|\\vec{v}\\|}\\right)',
      interpretacion: 'Permite conocer la divergencia direccional entre dos fuerzas o velocidades.'
    },
    'equipolencia': {
      titulo: 'Diagnóstico de Equipolencia (Vectores Libres)',
      categoria: 'Relaciones de Equivalencia',
      temaTeoriaId: 'equipolencia',
      queEs: 'Determinación de si dos vectores fijos separados espacialmente tienen componentes cartesianas idénticas.',
      formula: '\\vec{AB} \\sim \\vec{CD} \\iff (x_B - x_A = x_D - x_C) \\land (y_B - y_A = y_D - y_C)',
      interpretacion: 'Si son equipolentes, ambos segmentos representan exactamente el mismo vector libre y forman un paralelogramo ABDC.'
    },
    'construccion-geometrica': {
      titulo: 'Construcción Geométrica Auxiliar',
      categoria: 'Visualización',
      temaTeoriaId: 'algebra-paralelogramo',
      queEs: 'Trazado gráfico de líneas discontinuas que ilustra el método geométrico de resolución en el plano.',
      formula: '\\text{Paralelogramo} \\quad \\text{vs.} \\quad \\text{Punta-Cola}',
      interpretacion: 'El método del paralelogramo traslada ambos vectores al origen; punta-cola encadena el origen de uno en el extremo del otro.'
    }
  };

  /**
   * Obtiene la definición contextual a partir de su clave.
   * @param {string} clave
   * @returns {Object|null}
   */
  static obtener(clave) {
    return this._conceptos[clave] || null;
  }

  /**
   * Genera el marcado HTML para un botón "ℹ" contextual.
   * @param {string} clave - Clave del concepto en el catálogo
   * @param {string} [clasesExtra=''] - Clases CSS adicionales
   * @returns {string}
   */
  static htmlBotonInfo(clave, clasesExtra = '') {
    return `
      <button type="button" class="btn-info-contextual ${clasesExtra}" data-info-clave="${clave}" title="Información y Teoría" aria-label="Información">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      </button>
    `;
  }
}
