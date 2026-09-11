/**
 * Repositorio de dominio con el compendio completo de fórmulas vectoriales en ℝ² y ℝ³
 */
export class RepositorioFormulas {
  /**
   * Obtiene todas las fórmulas estructuradas para visualización pedagógica editorial.
   * @returns {Array<{titulo: string, ecuacion: string, descripcion: string}>}
   */
  static obtenerTodas() {
    return [
      {
        titulo: '1. Vector que une dos puntos A y B',
        ecuacion: '$$\\overrightarrow{AB} = B - A = (x_B - x_A, \\; y_B - y_A) \\quad \\big| \\quad \\overleftarrow{BA} = -\\overrightarrow{AB} = A - B$$',
        descripcion: 'Dadas las coordenadas del origen A(xA, yA) y del extremo B(xB, yB), el vector directo se denota con flecha a la derecha sobre AB; el vector opuesto con flecha a la izquierda sobre BA.'
      },
      {
        titulo: '2. Módulo o Magnitud (Norma Euclidiana)',
        ecuacion: '$$\\|\\vec{v}\\| = \\sqrt{v_x^2 + v_y^2} \\ge 0$$',
        descripcion: 'Representa la longitud o tamaño del segmento orientado en el plano cartesiano. Se deduce mediante el Teorema de Pitágoras y siempre es un número real no negativo.'
      },
      {
        titulo: '3. Dirección e Inclinación Angular',
        ecuacion: '$$\\theta = \\arctan\\left(\\frac{v_y}{v_x}\\right)$$',
        descripcion: 'Ángulo que forma la dirección del vector respecto al semieje positivo de las abscisas (+X). El signo de vx y vy determina el cuadrante trigonométrico correspondiente.'
      },
      {
        titulo: '4. Vector Unitario Normalizado',
        ecuacion: '$$\\hat{u} = \\frac{\\vec{v}}{\\|\\vec{v}\\|} = \\left(\\frac{v_x}{\\|\\vec{v}\\|}, \\; \\frac{v_y}{\\|\\vec{v}\\|}\\right) \\implies \\|\\hat{u}\\| = 1$$',
        descripcion: 'Vector que conserva idéntica dirección y sentido que v pero cuya magnitud es exactamente igual a la unidad.'
      },
      {
        titulo: '5. Suma y Resta de Vectores',
        ecuacion: '$$\\vec{u} \\pm \\vec{v} = (u_x \\pm v_x, \\; u_y \\pm v_y)$$',
        descripcion: 'Se calcula operando componente a componente. Gráficamente, la suma equivale a la diagonal del paralelogramo o al encadenamiento punta con cola.'
      },
      {
        titulo: '6. Multiplicación por un Escalar (k real)',
        ecuacion: '$$k \\cdot \\vec{v} = (k \\cdot v_x, \\; k \\cdot v_y)$$',
        descripcion: 'Modifica el tamaño del vector por un factor |k|. Si k > 0 conserva el sentido; si k < 0 el sentido se invierte 180°.'
      },
      {
        titulo: '7. Producto Escalar (Dot Product)',
        ecuacion: '$$\\vec{u} \\cdot \\vec{v} = u_x v_x + u_y v_y = \\|\\vec{u}\\| \\|\\vec{v}\\| \\cos(\\theta)$$',
        descripcion: 'Da como resultado un valor escalar. Si u · v = 0 (y ninguno es nulo), los dos vectores son estrictamente perpendiculares u ortogonales.'
      },
      {
        titulo: '8. Ángulo entre Dos Vectores',
        ecuacion: '$$\\cos(\\theta) = \\frac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\| \\cdot \\|\\vec{v}\\|} \\implies \\theta = \\arccos\\left(\\frac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\| \\|\\vec{v}\\|}\\right)$$',
        descripcion: 'Permite despejar el ángulo convexo θ en el intervalo [0°, 180°] que forman dos vectores concurrentes a partir de su producto escalar y sus normas.'
      },
      {
        titulo: '9. Equipolencia de Vectores',
        ecuacion: '$$\\overrightarrow{AB} \\equiv \\overrightarrow{CD} \\iff \\begin{cases} x_B - x_A = x_D - x_C \\\\ y_B - y_A = y_D - y_C \\end{cases}$$',
        descripcion: 'Dos vectores fijos son equipolentes si y sólo si poseen el mismo módulo, la misma dirección y el mismo sentido, sin importar dónde se encuentren anclados sus orígenes en el plano.'
      },
      {
        titulo: '10. Cadena de Unión y Vector Resultante Neto',
        ecuacion: '$$\\overrightarrow{R} = \\sum_{i=1}^n \\vec{v}_i = P_{\\text{final}} - P_{\\text{inicial}}$$',
        descripcion: 'La resultante del encadenamiento punta con cola es el vector que une directamente el origen del primer punto con el extremo del último punto del recorrido.'
      },
      {
        titulo: '11. Producto Vectorial en ℝ³ (Cruz)',
        ecuacion: '$$\\vec{u} \\times \\vec{v} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ u_x & u_y & u_z \\\\ v_x & v_y & v_z \\end{vmatrix} = (u_y v_z - u_z v_y)\\mathbf{i} - (u_x v_z - u_z v_x)\\mathbf{j} + (u_x v_y - u_y v_x)\\mathbf{k}$$',
        descripcion: 'Operación exclusiva de ℝ³ que genera un nuevo vector simultáneamente ortogonal tanto a u como a v, cuyo sentido se rige por la regla de la mano derecha.'
      },
      {
        titulo: '12. Área del Paralelogramo Sustentado',
        ecuacion: '$$\\text{Área} = \\|\\vec{u} \\times \\vec{v}\\| = \\|\\vec{u}\\| \\cdot \\|\\vec{v}\\| \\cdot \\sin(\\theta)$$',
        descripcion: 'La norma o longitud del producto vectorial representa con exactitud matemática el área superficial del paralelogramo determinado por los vectores concurrentes u y v.'
      },
      {
        titulo: '13. Cosenos Directores en ℝ³ y Relación Pitagórica',
        ecuacion: '$$\\cos(\\alpha) = \\frac{v_x}{\\|\\vec{v}\\|}, \\; \\cos(\\beta) = \\frac{v_y}{\\|\\vec{v}\\|}, \\; \\cos(\\gamma) = \\frac{v_z}{\\|\\vec{v}\\|} \\implies \\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1$$',
        descripcion: 'Ángulos α, β y γ que forma el vector tridimensional con los semiejes positivos coordenados X, Y y Z. La suma de los cuadrados de sus cosenos es idéntica a 1.'
      },
      {
        titulo: '14. Producto Mixto y Volumen en ℝ³',
        ecuacion: '$$[\\vec{u}, \\vec{v}, \\vec{w}] = \\vec{u} \\cdot (\\vec{v} \\times \\vec{w}) = \\begin{vmatrix} u_x & u_y & u_z \\\\ v_x & v_y & v_z \\\\ w_x & w_y & w_z \\end{vmatrix} \\implies \\text{Volumen} = |[\\vec{u}, \\vec{v}, \\vec{w}]|$$',
        descripcion: 'Combina el producto escalar y vectorial de tres vectores. Su valor absoluto cuantifica el volumen del paralelepípedo que sustentan en el espacio euclídeo.'
      }
    ];
  }
}
