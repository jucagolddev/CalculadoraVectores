/**
 * Repositorio de dominio con el compendio completo de fórmulas vectoriales en ℝ² y ℝ³
 */
export class RepositorioFormulas {
  /**
   * Obtiene todas las fórmulas estructuradas para visualización pedagógica.
   * @returns {Array<{titulo: string, ecuacion: string, descripcion: string}>}
   */
  static obtenerTodas() {
    return [
      {
        titulo: '1. Vector que une dos puntos A y B',
        ecuacion: 'Vector AB = B - A = (xB - xA, yB - yA)',
        descripcion: 'Dadas las coordenadas del origen A(xA, yA) y del extremo B(xB, yB), las componentes del vector director se obtienen restando las coordenadas del extremo menos las del origen.'
      },
      {
        titulo: '2. Módulo o Magnitud (Norma Euclidiana)',
        ecuacion: '||v|| = √(vx² + vy²)',
        descripcion: 'Representa la longitud o tamaño del segmento orientado en el plano cartesiano. Se deduce mediante el Teorema de Pitágoras y siempre es un número real no negativo (||v|| >= 0).'
      },
      {
        titulo: '3. Dirección e Inclinación Angular',
        ecuacion: 'θ = arctan(vy / vx)',
        descripcion: 'Ángulo que forma la dirección del vector respecto al semieje positivo de las abscisas (+X). El signo de vx y vy determina el cuadrante trigonométrico correspondiente.'
      },
      {
        titulo: '4. Vector Unitario Normalizado',
        ecuacion: 'u = v / ||v|| = (vx / ||v||, vy / ||v||)',
        descripcion: 'Vector que conserva idéntica dirección y sentido que v pero cuya magnitud es exactamente igual a la unidad (||u|| = 1).'
      },
      {
        titulo: '5. Suma y Resta de Vectores',
        ecuacion: 'u ± v = (ux ± vx, uy ± vy)',
        descripcion: 'Se calcula operando componente a componente. Gráficamente, la suma equivale a la diagonal del paralelogramo o al encadenamiento punta con cola.'
      },
      {
        titulo: '6. Multiplicación por un Escalar (k real)',
        ecuacion: 'k · v = (k · vx, k · vy)',
        descripcion: 'Modifica el tamaño del vector por un factor |k|. Si k > 0 conserva el sentido; si k < 0 el sentido se invierte 180°.'
      },
      {
        titulo: '7. Producto Escalar (Dot Product)',
        ecuacion: 'u · v = ux·vx + uy·vy = ||u||·||v||·cos(θ)',
        descripcion: 'Da como resultado un valor escalar. Si u · v = 0 (y ninguno es nulo), los dos vectores son estrictamente perpendiculares u ortogonales.'
      },
      {
        titulo: '8. Ángulo entre Dos Vectores',
        ecuacion: 'cos(θ) = (u · v) / (||u|| · ||v||)',
        descripcion: 'Permite despejar el ángulo convexo θ en el intervalo [0°, 180°] que forman dos vectores concurrentes a partir de su producto escalar y sus normas.'
      },
      {
        titulo: '9. Equipolencia de Vectores',
        ecuacion: 'Vector AB = Vector CD <=> (xB - xA = xD - xC) y (yB - yA = yD - yC)',
        descripcion: 'Dos vectores fijos son equipolentes si y sólo si poseen el mismo módulo, la misma dirección y el mismo sentido, sin importar dónde se encuentren anclados sus orígenes en el plano.'
      },
      {
        titulo: '10. Cadena de Unión y Vector Resultante Neto',
        ecuacion: 'R = v_1 + v_2 + ... + v_n = P_final - P_inicial',
        descripcion: 'La resultante del encadenamiento punta con cola es el vector que une directamente el origen del primer punto con el extremo del último punto del recorrido.'
      },
      {
        titulo: '11. Producto Vectorial en ℝ³ (Cruz)',
        ecuacion: 'u × v = (uy·vz - uz·vy) i - (ux·vz - uz·vx) j + (ux·vy - uy·vx) k',
        descripcion: 'Operación exclusiva de ℝ³ que genera un nuevo vector simultáneamente ortogonal (perpendicular) tanto a u como a v, cuyo sentido se rige por la regla de la mano derecha.'
      },
      {
        titulo: '12. Área del Paralelogramo Sustentado',
        ecuacion: 'Área = ||u × v|| = ||u|| · ||v|| · sen(θ)',
        descripcion: 'La norma o longitud del producto vectorial representa con exactitud matemática el área superficial del paralelogramo determinado por los vectores concurrentes u y v.'
      },
      {
        titulo: '13. Cosenos Directores en ℝ³ y Relación Pitagórica',
        ecuacion: 'cos(α) = vx/||v||, cos(β) = vy/||v||, cos(γ) = vz/||v|| => cos²(α) + cos²(β) + cos²(γ) = 1',
        descripcion: 'Ángulos α, β y γ que forma el vector tridimensional con los semiejes positivos coordenados X, Y y Z. La suma de los cuadrados de sus cosenos es idéntica a 1.'
      },
      {
        titulo: '14. Producto Mixto y Volumen en ℝ³',
        ecuacion: '[u, v, w] = u · (v × w) = det([u; v; w]) => Volumen = |[u, v, w]|',
        descripcion: 'Combina el producto escalar y vectorial de tres vectores. Su valor absoluto cuantifica el volumen del paralelepípedo que sustentan en el espacio euclídeo.'
      }
    ];
  }
}
