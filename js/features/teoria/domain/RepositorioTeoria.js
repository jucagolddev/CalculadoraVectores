/**
 * Repositorio de dominio con el compendio teórico exhaustivo, lógica matemática y ejemplos interactivos en ℝ²
 */
export class RepositorioTeoria {
  /**
   * Retorna la colección completa de módulos de aprendizaje conceptual.
   * @returns {Array<Object>}
   */
  static obtenerTemas() {
    return [
      {
        id: 'fundamentos',
        numero: 1,
        categoria: 'Introducción',
        titulo: 'Fundamentos: Escalares vs. Vectores en ℝ²',
        resumen: 'Diferencia entre magnitudes puramente numéricas y entidades orientadas en el espacio.',
        explicacion: `En física y matemáticas, distinguimos dos clases fundamentales de magnitudes:
1. **Escalares:** Quedan completamente determinados por un único valor numérico acompañado de su unidad (temperatura, masa, tiempo, energía). No poseen dirección.
2. **Vectores en ℝ²:** Entidades geométricas y algebraicas que requieren tres atributos simultáneos:
   - **Módulo (o Magnitud):** La longitud o tamaño del vector, siempre un número no negativo (||v|| >= 0).
   - **Dirección:** La inclinación de la recta directriz en el plano respecto al eje horizontal X (medida por el ángulo θ).
   - **Sentido:** La orientación específica a lo largo de dicha recta, señalada por la cabeza de la flecha (hacia dónde apunta).`,
        formula: 'Vector v = (vx, vy) ∈ ℝ²',
        formulaNota: 'Un vector en el plano se define por un par ordenado de números reales que representan sus componentes horizontal y vertical.',
        notaPedagogica: 'Dos flechas con la misma longitud e inclinación pero que apunten en sentidos opuestos representan vectores diferentes (v y -v).',
        ejemplo: {
          enunciado: 'Visualizar un vector anclado desde el origen con desplazamiento de 4 unidades a la derecha y 3 hacia arriba.',
          pasos: [
            { paso: 'Coordenadas del origen A', calculo: 'A = (0, 0)' },
            { paso: 'Coordenadas del extremo B', calculo: 'B = (4, 3)' },
            { paso: 'Vector resultante AB', calculo: 'AB = (4 - 0, 3 - 0) = (4, 3)' }
          ],
          resultado: 'Vector v = (4, 3) con módulo ||v|| = 5',
          simulacion: {
            modo: 'dos-puntos',
            datos: {
              puntos: [
                { id: 'A', x: 0, y: 0 },
                { id: 'B', x: 4, y: 3 }
              ]
            }
          }
        }
      },
      {
        id: 'componentes',
        numero: 2,
        categoria: 'Geometría Cartesiana',
        titulo: 'Cálculo de Componentes: Extremo menos Origen',
        resumen: '¿Por qué restamos las coordenadas del extremo menos las del punto inicial?',
        explicacion: `Dado un segmento orientado que comienza en un punto origen A(xA, yA) y finaliza en un extremo B(xB, yB), sus componentes cartesianas representan el **desplazamiento neto independiente** sobre cada eje:
- **Desplazamiento horizontal:** Δx = xB - xA
- **Desplazamiento vertical:** Δy = yB - yA

Restamos B - A porque estamos midiendo "cuánto tuvimos que movernos desde A para alcanzar B". Si xB > xA, el movimiento es hacia la derecha (positivo); si xB < xA, es hacia la izquierda (negativo). Lo mismo rige verticalmente para el eje Y.`,
        formula: 'Vector AB = B - A = (xB - xA, yB - yA)',
        formulaNota: 'El orden es rigurosamente Extremo (Destino) menos Origen (Partida). Invertir el orden (A - B) produce el vector opuesto BA = -AB.',
        notaPedagogica: 'Al calcular las componentes, transformamos un vector anclado en cualquier parte del plano en un vector libre equivalente con origen en el punto (0, 0).',
        ejemplo: {
          enunciado: 'Calcular el vector que parte del punto A(2, 1) y llega al punto B(7, 5).',
          pasos: [
            { paso: 'Componente X (horizontal)', calculo: 'vx = xB - xA = 7 - 2 = 5' },
            { paso: 'Componente Y (vertical)', calculo: 'vy = yB - yA = 5 - 1 = 4' }
          ],
          resultado: 'Vector AB = (5, 4)',
          simulacion: {
            modo: 'dos-puntos',
            datos: {
              puntos: [
                { id: 'A', x: 2, y: 1 },
                { id: 'B', x: 7, y: 5 }
              ]
            }
          }
        }
      },
      {
        id: 'modulo-pitagoras',
        numero: 3,
        categoria: 'Trigonometría y Norma',
        titulo: 'Módulo y Teorema de Pitágoras en ℝ²',
        resumen: 'Deducción de la longitud de un vector a través del triángulo rectángulo de proyecciones.',
        explicacion: `El módulo o norma euclidiana ||v|| de un vector v = (vx, vy) es la distancia euclídea entre su origen y su extremo.
Si trazamos las proyecciones ortogonales del vector sobre los ejes coordenados, obtenemos un triángulo rectángulo donde:
- El cateto horizontal mide la longitud |vx|.
- El cateto vertical mide la longitud |vy|.
- La hipotenusa es la longitud del propio vector ||v||.

Por el Teorema de Pitágoras: Hipotenusa² = Cateto₁² + Cateto₂²
||v||² = vx² + vy²  ==>  ||v|| = √(vx² + vy²)`,
        formula: '||v|| = √(vx² + vy²)',
        formulaNota: 'Al elevar al cuadrado (vx² y vy²), los signos negativos desaparecen, garantizando que el módulo siempre sea un número real mayor o igual que cero.',
        notaPedagogica: 'Si ||v|| = 0, el vector es el vector nulo (0, 0), el cual no tiene dirección definida.',
        ejemplo: {
          enunciado: 'Calcular la magnitud del vector v = (6, -8).',
          pasos: [
            { paso: 'Cuadrado de vx', calculo: 'vx² = 6² = 36' },
            { paso: 'Cuadrado de vy', calculo: 'vy² = (-8)² = 64' },
            { paso: 'Suma de cuadrados', calculo: '36 + 64 = 100' },
            { paso: 'Raíz cuadrada', calculo: '||v|| = √100 = 10' }
          ],
          resultado: '||v|| = 10 unidades',
          simulacion: {
            modo: 'dos-puntos',
            datos: {
              puntos: [
                { id: 'A', x: 1, y: 1 },
                { id: 'B', x: 7, y: -7 }
              ]
            }
          }
        }
      },
      {
        id: 'unitario',
        numero: 4,
        categoria: 'Normalización',
        titulo: 'Vector Unitario Normalizado: Dirección Pura',
        resumen: '¿Por qué normalizamos vectores y cómo se aísla la orientación de la escala?',
        explicacion: `Un **vector unitario** (denotado como u o v̂) es aquel cuya norma es exactamente igual a 1 (||u|| = 1).
Normalizar un vector significa dividir cada una de sus componentes entre su propio módulo:
u = (vx / ||v||, vy / ||v||)

**¿Por qué es indispensable en ingeniería y física?**
Al normalizar, eliminamos la magnitud pero preservamos intactas la dirección y el sentido. Esto permite definir "direcciones puras", por ejemplo para calcular fuerzas a lo largo de cables, direcciones de colisión o vectores normales de iluminación en gráficos 3D.`,
        formula: 'u = v / ||v|| = (vx / ||v||, vy / ||v||)',
        formulaNota: 'Demostración de que ||u|| = 1: ||u||² = (vx/||v||)² + (vy/||v||)² = (vx² + vy²) / ||v||² = ||v||² / ||v||² = 1.',
        notaPedagogica: 'Cualquier vector puede reconstruirse multiplicando su vector unitario director por su módulo: v = ||v|| · u.',
        ejemplo: {
          enunciado: 'Hallar el vector unitario en la dirección de v = (3, 4).',
          pasos: [
            { paso: 'Calcular módulo', calculo: '||v|| = √(3² + 4²) = √25 = 5' },
            { paso: 'Dividir componentes entre 5', calculo: 'u = (3/5, 4/5) = (0.6, 0.8)' },
            { paso: 'Verificación de norma', calculo: '√(0.6² + 0.8²) = √(0.36 + 0.64) = √1 = 1' }
          ],
          resultado: 'u = (0.6, 0.8) con ||u|| = 1',
          simulacion: {
            modo: 'dos-puntos',
            datos: {
              puntos: [
                { id: 'A', x: 0, y: 0 },
                { id: 'B', x: 3, y: 4 }
              ]
            }
          }
        }
      },
      {
        id: 'algebra-paralelogramo',
        numero: 5,
        categoria: 'Álgebra Vectorial',
        titulo: 'Suma Vectorial: Regla del Paralelogramo y Punta-Cola',
        resumen: 'Construcciones geométricas para la adición y resta de vectores en el plano.',
        explicacion: `Para sumar dos vectores u y v algebraicamente, sumamos sus componentes homólogas:
u + v = (ux + vx, uy + vy)

Geométricamente, disponemos de dos métodos equivalentes:
1. **Regla del Paralelogramo (Vectores Concurrentes):**
   Si u y v parten del mismo origen, trazamos una recta paralela a u en el extremo de v, y una paralela a v en el extremo de u. La diagonal principal que parte del origen común es el vector suma u + v.
2. **Regla Punta-Cola (Método del Polígono):**
   Trasladamos el vector v de modo que su origen coincida con el extremo de u. El vector suma une el origen de u con el extremo de v.

**Resta de Vectores (u - v):**
Equivale a sumar a u el vector opuesto de v: u - v = u + (-v). Representa el vector que va desde el extremo de v hasta el extremo de u.`,
        formula: 'Suma: u + v = (ux + vx, uy + vy) | Resta: u - v = (ux - vx, uy - vy)',
        formulaNota: 'Multiplicación por escalar: k · u = (k · ux, k · uy). Si k > 0 estira o comprime; si k < 0 invierte el sentido 180°.',
        notaPedagogica: 'La regla del paralelogramo es el modelo directo en física para hallar la fuerza neta o resultante que actúa sobre una masa puntual.',
        ejemplo: {
          enunciado: 'Sumar vector u = (4, 2) y vector v = (-2, 3) con la regla del paralelogramo.',
          pasos: [
            { paso: 'Suma horizontal Sx', calculo: 'Sx = ux + vx = 4 + (-2) = 2' },
            { paso: 'Suma vertical Sy', calculo: 'Sy = uy + vy = 2 + 3 = 5' },
            { paso: 'Módulo del vector suma', calculo: '||u+v|| = √(2² + 5²) = √29 ≈ 5.39' }
          ],
          resultado: 'u + v = (2, 5)',
          simulacion: {
            modo: 'operaciones',
            datos: {
              ux: 4, uy: 2, vx: -2, vy: 3, k: 2
            },
            construccion: 'paralelogramo'
          }
        }
      },
      {
        id: 'producto-escalar',
        numero: 6,
        categoria: 'Álgebra y Proyecciones',
        titulo: 'Producto Escalar y Criterio de Ortogonalidad',
        resumen: 'Multiplicación escalar, proyección geométrica y determinación del ángulo entre vectores.',
        explicacion: `A diferencia de la suma, el **producto escalar (dot product)** de dos vectores devuelve un **escalar** (un número real, no un vector):
u · v = ux · vx + uy · vy

Geométricamente, se relaciona con el ángulo θ comprendido entre ambos vectores:
u · v = ||u|| · ||v|| · cos(θ)

**Interpretación Geométrica:**
Mide cuánto apunta un vector en la misma dirección que el otro. Representa la proyección ortogonal de u sobre v multiplicada por la magnitud de v.
- Si θ < 90°: u · v > 0 (apuntan hacia el mismo hemisferio).
- Si θ = 90°: u · v = 0 (son estrictamente perpendiculares u ortogonales).
- Si θ > 90°: u · v < 0 (apuntan hacia direcciones contrarias).`,
        formula: 'cos(θ) = (u · v) / (||u|| · ||v||) ==> Perpendiculares <=> u · v = 0',
        formulaNota: 'El producto escalar es conmutativo: u · v = v · u. Permite hallar el ángulo exacto: θ = arccos((u·v) / (||u||·||v||)).',
        notaPedagogica: 'En física, el trabajo mecánico W es el producto escalar entre el vector fuerza y el vector desplazamiento: W = F · d.',
        ejemplo: {
          enunciado: 'Comprobar si los vectores u = (3, 2) y v = (-2, 3) son perpendiculares.',
          pasos: [
            { paso: 'Producto escalar', calculo: 'u · v = (3)(-2) + (2)(3) = -6 + 6 = 0' },
            { paso: 'Evaluación del ángulo', calculo: 'cos(θ) = 0 / (||u|| · ||v||) = 0  ==>  θ = 90°' }
          ],
          resultado: 'u y v son ortogonales (perpendiculares, θ = 90°)',
          simulacion: {
            modo: 'operaciones',
            datos: {
              ux: 3, uy: 2, vx: -2, vy: 3, k: 1
            },
            construccion: 'ninguno'
          }
        }
      },
      {
        id: 'equipolencia',
        numero: 7,
        categoria: 'Relaciones de Equivalencia',
        titulo: 'Equipolencia de Vectores y Vectores Libres',
        resumen: '¿Cuándo dos vectores en diferentes posiciones espaciales representan el mismo vector libre?',
        explicacion: `Dos vectores fijos AB (con origen A y extremo B) y CD (con origen C y extremo D) se dicen **equipolentes** (AB ~ CD) si y sólo si cumplen simultáneamente tres condiciones:
1. **Mismo Módulo:** ||AB|| = ||CD|| (tienen exactamente la misma longitud).
2. **Misma Dirección:** Las rectas directrices son paralelas (poseen la misma pendiente m).
3. **Mismo Sentido:** Apuntan en la misma dirección a lo largo de sus rectas.

**Propiedad Algebraica Fundamental:**
Dos vectores son equipolentes si y sólo si tienen **las mismas componentes cartesianas**:
xB - xA = xD - xC   y   yB - yA = yD - yC

Un **vector libre** es el conjunto de todos los vectores fijos equipolentes entre sí. No importa dónde comience el vector en el plano cartesiano; si su variación en X y en Y es idéntica, es el mismo vector libre.`,
        formula: 'Vector AB equipolente a Vector CD <=> (xB - xA = xD - xC) ∧ (yB - yA = yD - yC)',
        formulaNota: 'Geométricamente, los cuatro puntos A, B, D, C (en ese orden) forman los vértices de un paralelogramo.',
        notaPedagogica: 'La velocidad del viento o la gravedad en una habitación son campos vectoriales donde todos los puntos experimentan vectores equipolentes.',
        ejemplo: {
          enunciado: 'Verificar equipolencia entre AB con A(1, 1), B(4, 5) y CD con C(-2, -1), D(1, 3).',
          pasos: [
            { paso: 'Componentes de AB', calculo: 'AB = (4 - 1, 5 - 1) = (3, 4)' },
            { paso: 'Componentes de CD', calculo: 'CD = (1 - (-2), 3 - (-1)) = (3, 4)' },
            { paso: 'Comparación', calculo: '(3, 4) == (3, 4)  ==>  Módulo 5, misma pendiente 4/3 y mismo sentido' }
          ],
          resultado: 'SÍ: Son vectores equipolentes',
          simulacion: {
            modo: 'equipolencia',
            datos: {
              Ax: 1, Ay: 1, Bx: 4, By: 5, Cx: -2, Cy: -1, Dx: 1, Dy: 3
            }
          }
        }
      },
      {
        id: 'cadenas-resultante',
        numero: 8,
        categoria: 'Cinemática y Trayectorias',
        titulo: 'Cadenas Vectoriales y Vector Resultante Neto',
        resumen: 'Principio de superposición y desplazamiento total en rutas multipunto.',
        explicacion: `Cuando un móvil o una partícula sigue una trayectoria quebrada a través de varios puntos consecutivos A → B → C → D → ...:
- Cada tramo es un vector individual v_i = P_(i+1) - P_i.
- La **distancia total recorrida** es la suma escalar de las longitudes de cada tramo:
  d_total = ||v_1|| + ||v_2|| + ... + ||v_n||

- El **Vector Resultante Neto (Desplazamiento)** R es la suma vectorial directa de todos los tramos:
  R = v_1 + v_2 + ... + v_n

Por la propiedad telescópica de la suma:
R = (B - A) + (C - B) + (D - C) = D - A

El vector desplazamiento neto depende **exclusivamente del punto inicial y del punto final**, siendo completamente independiente del camino intermedio recorrido.`,
        formula: 'R = ∑ v_i = P_final - P_inicial',
        formulaNota: 'Por la desigualdad triangular: ||R|| <= ||v_1|| + ||v_2|| + ... + ||v_n||. La igualdad solo se cumple si todos los tramos son colineales y tienen el mismo sentido.',
        notaPedagogica: 'Si una persona camina 4 km al norte, 3 km al este y 4 km al sur, la distancia caminada es 11 km, pero su desplazamiento neto es solo 3 km al este.',
        ejemplo: {
          enunciado: 'Calcular el vector resultante de la cadena A(1, 2) → B(5, 6) → C(9, 3).',
          pasos: [
            { paso: 'Tramo 1 (AB)', calculo: 'AB = (5 - 1, 6 - 2) = (4, 4)' },
            { paso: 'Tramo 2 (BC)', calculo: 'BC = (9 - 5, 3 - 6) = (4, -3)' },
            { paso: 'Vector Resultante R', calculo: 'R = AB + BC = (4 + 4, 4 + (-3)) = (8, 1)' },
            { paso: 'Verificación directa (C - A)', calculo: 'C - A = (9 - 1, 3 - 2) = (8, 1)' }
          ],
          resultado: 'R = (8, 1) con ||R|| ≈ 8.06',
          simulacion: {
            modo: 'dos-puntos',
            datos: {
              puntos: [
                { id: 'A', x: 1, y: 2 },
                { id: 'B', x: 5, y: 6 },
                { id: 'C', x: 9, y: 3 }
              ]
            }
          }
        }
      }
    ];
  }

  /**
   * Busca temas que coincidan con un término de búsqueda.
   * @param {string} termino
   * @returns {Array<Object>}
   */
  static buscar(termino) {
    if (!termino || typeof termino !== 'string' || !termino.trim()) {
      return this.obtenerTemas();
    }
    const clean = termino.toLowerCase().trim();
    return this.obtenerTemas().filter(t =>
      t.titulo.toLowerCase().includes(clean) ||
      t.resumen.toLowerCase().includes(clean) ||
      t.categoria.toLowerCase().includes(clean) ||
      t.explicacion.toLowerCase().includes(clean) ||
      t.formula.toLowerCase().includes(clean)
    );
  }

  /**
   * Obtiene un tema por su ID único.
   * @param {string} id
   * @returns {Object|null}
   */
  static obtenerPorId(id) {
    return this.obtenerTemas().find(t => t.id === id) || null;
  }
}
