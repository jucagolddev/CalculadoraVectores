/**
 * Repositorio de dominio con el compendio teórico exhaustivo, lógica matemática y ejemplos interactivos en ℝ² y ℝ³
 * Cada módulo incluye:
 * 1. Concepto formal y significado físico
 * 2. Glosario de simbología y variables
 * 3. Fórmulas matemáticas y determinantes
 * 4. Algoritmo metódico de resolución a mano paso a paso
 * 5. Errores típicos y trampas frecuentes
 * 6. Guía práctica de uso y observación en el simulador VectorLab
 * 7. Ejemplo guiado con datos preconfigurados para simulación interactiva
 */
export class RepositorioTeoria {
  /**
   * Retorna la colección completa de 12 módulos de aprendizaje conceptual (ℝ² y ℝ³).
   * @returns {Array<Object>}
   */
  static obtenerTemas() {
    return [
      {
        id: 'fundamentos',
        numero: 1,
        dimension: '2d',
        categoria: 'Introducción al Álgebra Lineal',
        titulo: 'Fundamentos: Escalares vs. Vectores en ℝ²',
        resumen: 'Diferenciación rigurosa entre magnitudes puramente numéricas y magnitudes direccionales orientadas.',
        concepto: {
          queEs: 'Un escalar es una cantidad que queda definida por un único número real con su unidad (como 25 °C, 70 kg o 12 segundos). Un vector en ℝ², en cambio, es un objeto geométrico que requiere tres propiedades simultáneas: magnitud (cuánto mide), dirección (inclinación de su recta) y sentido (hacia dónde apunta la flecha).',
          paraQueSirve: 'Permite modelar magnitudes físicas donde no basta conocer la intensidad, sino hacia dónde se ejercen: velocidades, fuerzas, aceleraciones o desplazamientos espaciales.',
          significadoFisico: 'Si empujas un objeto con 50 N hacia arriba, el resultado físico es opuesto a empujarlo con 50 N hacia abajo; la magnitud es la misma (50 N), pero los vectores son opuestos.'
        },
        variables: [
          { simbolo: 'v = (vx, vy)', nombre: 'Vector cartesiano', descripcion: 'Par ordenado de números reales que representan las componentes en el plano.' },
          { simbolo: 'vx', nombre: 'Componente horizontal', descripcion: 'Desplazamiento a lo largo del eje coordenado X (positivo a la derecha, negativo a la izquierda).' },
          { simbolo: 'vy', nombre: 'Componente vertical', descripcion: 'Desplazamiento a lo largo del eje coordenado Y (positivo hacia arriba, negativo hacia abajo).' },
          { simbolo: '||v||', nombre: 'Módulo o norma', descripcion: 'Longitud euclídea escalar del segmento orientado. Siempre ||v|| ≥ 0.' },
          { simbolo: 'θ', nombre: 'Ángulo director', descripcion: 'Inclinación angular de la recta directriz respecto al semieje positivo X.' }
        ],
        formula: 'Vector v = (vx, vy) = vx · i + vy · j ∈ ℝ²',
        formulaNota: 'Los vectores unitarios i = (1, 0) y j = (0, 1) forman la base ortonormal canónica del plano cartesiano.',
        algoritmoPasos: [
          { paso: 1, titulo: 'Identificar si la magnitud tiene dirección', detalle: 'Determina si la cantidad posee orientación en el espacio. Si solo tiene tamaño numérico (ej. masa o tiempo), es un escalar.' },
          { paso: 2, titulo: 'Establecer el sistema de referencia cartesiano', detalle: 'Fija el origen (0, 0) y la orientación de los ejes perpendiculares X e Y.' },
          { paso: 3, titulo: 'Descomponer en componentes ortogonales', detalle: 'Determina cuánto avanza el vector en horizontal (vx) y cuánto en vertical (vy).' },
          { paso: 4, titulo: 'Escribir en notación cartesiana o vectorial', detalle: 'Expresa el vector como par ordenado v = (vx, vy) o combinación lineal v = vx·i + vy·j.' }
        ],
        erroresComunes: [
          { error: 'Confundir un punto con un vector', porqueOcurre: 'Ambos se escriben como (x, y).', solucionCorrecta: 'Un punto P(x, y) es una ubicación fija en el espacio. Un vector v = (vx, vy) es un desplazamiento libre que puede trasladarse a cualquier parte del plano.' },
          { error: 'Asumir que vectores con igual módulo son iguales', porqueOcurre: 'Ignorar la dirección o el sentido.', solucionCorrecta: 'Dos vectores solo son iguales si tienen idéntico módulo, idéntica dirección e idéntico sentido.' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'Selecciona "Plano ℝ²" en la barra superior', resultadoEsperado: 'Se activa la cuadrícula bidimensional con ejes X e Y.' },
          { paso: 2, accion: 'En el panel izquierdo, introduce las coordenadas de origen A(0, 0) y extremo B(4, 3)', resultadoEsperado: 'Aparece dibujada la flecha azul con origen en (0,0) y extremo en (4,3).' },
          { paso: 3, accion: 'Observa la tarjeta de "Resumen de Magnitudes"', resultadoEsperado: 'Verás vx = 4, vy = 3, Módulo = 5.00 u y Dirección θ = 36.87°.' }
        ],
        ejemplo: {
          enunciado: 'Modelar un vector anclado en el origen con avance horizontal de 4 unidades y vertical de 3 unidades.',
          pasos: [
            { paso: 'Coordenadas del origen A', calculo: 'A = (0, 0)' },
            { paso: 'Coordenadas del extremo B', calculo: 'B = (4, 3)' },
            { paso: 'Componentes cartesianas', calculo: 'v = (4 - 0, 3 - 0) = (4, 3)' },
            { paso: 'Módulo del vector', calculo: '||v|| = √(4² + 3²) = √(16 + 9) = √25 = 5' }
          ],
          resultado: 'Vector v = (4, 3) con módulo ||v|| = 5 unidades',
          simulacion: {
            modo: 'dos-puntos',
            espacio: '2d',
            datos: { puntos: [{ id: 'A', x: 0, y: 0 }, { id: 'B', x: 4, y: 3 }] }
          }
        }
      },
      {
        id: 'componentes',
        numero: 2,
        dimension: '2d',
        categoria: 'Geometría Cartesiana',
        titulo: 'Cálculo de Componentes: Extremo menos Origen (B - A)',
        resumen: 'Por qué restamos las coordenadas del extremo menos las del punto inicial para obtener el vector libre.',
        concepto: {
          queEs: 'Para calcular las componentes de un vector que une dos puntos cualesquiera del plano, se restan rigurosamente las coordenadas del punto de llegada (extremo B) menos las del punto de partida (origen A).',
          paraQueSirve: 'Transforma un vector "fijo" anclado en cualquier lugar del plano en un vector "libre" con origen estándar en (0, 0), facilitando sumas, restas y comparaciones algebraicas.',
          significadoFisico: 'Mide el desplazamiento neto independiente: cuánto tuvimos que avanzar en X (Δx) y cuánto en Y (Δy) para ir exactamente desde la posición de partida hasta la posición de destino.'
        },
        variables: [
          { simbolo: 'A(xA, yA)', nombre: 'Punto de origen', descripcion: 'Ubicación espacial donde nace o parte el vector.' },
          { simbolo: 'B(xB, yB)', nombre: 'Punto de extremo', descripcion: 'Ubicación espacial donde termina o apunta la flecha del vector.' },
          { simbolo: 'Δx = xB - xA', nombre: 'Incremento en X', descripcion: 'Desplazamiento horizontal neto de A hacia B.' },
          { simbolo: 'Δy = yB - yA', nombre: 'Incremento en Y', descripcion: 'Desplazamiento vertical neto de A hacia B.' },
          { simbolo: 'Vector AB', nombre: 'Vector fijo A→B', descripcion: 'Segmento orientado desde el nodo A hacia el nodo B.' }
        ],
        formula: 'Vector AB = B - A = (xB - xA, yB - yA)',
        formulaNota: 'El orden de la resta es inmutable: Extremo (Destino) menos Origen (Partida). Si se calcula A - B se obtiene el vector opuesto BA = -AB.',
        algoritmoPasos: [
          { paso: 1, titulo: 'Identificar claramente origen y destino', detalle: 'Anota A(xA, yA) como punto inicial y B(xB, yB) como punto final.' },
          { paso: 2, titulo: 'Calcular la componente X', detalle: 'Efectúa la resta algebraica vx = xB - xA. Respeta la ley de los signos si hay negativos.' },
          { paso: 3, titulo: 'Calcular la componente Y', detalle: 'Efectúa la resta algebraica vy = yB - yA. Respeta la ley de los signos.' },
          { paso: 4, titulo: 'Escribir el vector resultante', detalle: 'Expresa el vector entre paréntesis AB = (vx, vy).' }
        ],
        erroresComunes: [
          { error: 'Invertir el orden de la resta (A - B)', porqueOcurre: 'Restar origen menos extremo por intuición alfabética.', solucionCorrecta: 'Siempre es LLEGADA menos SALIDA: B - A. A - B genera un vector que apunta en sentido contrario (180° opuesto).' },
          { error: 'Errores con coordenadas negativas', porqueOcurre: 'Ejemplo: xB = 3 y xA = -2, escribir 3 - 2 = 1.', solucionCorrecta: '3 - (-2) = 3 + 2 = 5. Usa siempre paréntesis protectores en la resta.' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'Ve al modo "Puntos de Unión / Cadena Vectorial"', resultadoEsperado: 'El panel lateral mostrará los campos de coordenadas para el punto A y punto B.' },
          { paso: 2, accion: 'Escribe A = (2, 1) y B = (7, 5)', resultadoEsperado: 'El canvas dibuja el nodo A en (2,1), el nodo B en (7,5) y la flecha dirigida de A hacia B.' },
          { paso: 3, accion: 'Abre el cajón "Ver Solución"', resultadoEsperado: 'Verás la sustitución paso a paso: vx = 7 - 2 = 5, vy = 5 - 1 = 4 -> Vector AB = (5, 4).' }
        ],
        ejemplo: {
          enunciado: 'Calcular las componentes del vector que nace en A(2, 1) y finaliza en B(7, 5).',
          pasos: [
            { paso: 'Componente horizontal X', calculo: 'vx = xB - xA = 7 - 2 = 5' },
            { paso: 'Componente vertical Y', calculo: 'vy = yB - yA = 5 - 1 = 4' },
            { paso: 'Vector resultante AB', calculo: 'AB = (5, 4)' }
          ],
          resultado: 'Vector AB = (5, 4)',
          simulacion: {
            modo: 'dos-puntos',
            espacio: '2d',
            datos: { puntos: [{ id: 'A', x: 2, y: 1 }, { id: 'B', x: 7, y: 5 }] }
          }
        }
      },
      {
        id: 'modulo-pitagoras',
        numero: 3,
        dimension: '2d',
        categoria: 'Trigonometría y Norma',
        titulo: 'Módulo y Teorema de Pitágoras en ℝ²',
        resumen: 'Deducción geométrica de la longitud euclídea del vector mediante el triángulo de proyecciones.',
        concepto: {
          queEs: 'El módulo o norma ||v|| es la distancia en línea recta entre el origen y el extremo del vector. Si proyectamos el vector ortogonalmente sobre los ejes X e Y, se forma un triángulo rectángulo donde las componentes |vx| y |vy| son los catetos y el vector es la hipotenusa.',
          paraQueSirve: 'Permite calcular la rapidez de un móvil (magnitud de la velocidad), la intensidad total de una fuerza o la distancia exacta entre dos posiciones.',
          significadoFisico: 'Es una magnitud escalar pura y estrictamente no negativa (||v|| ≥ 0). Solo vale cero si el vector es el vector nulo (0, 0).'
        },
        variables: [
          { simbolo: '||v||', nombre: 'Módulo o Norma', descripcion: 'Longitud real de la flecha en unidades de cuadrícula.' },
          { simbolo: 'vx²', nombre: 'Cuadrado de la componente X', descripcion: 'Área del cuadrado del cateto horizontal.' },
          { simbolo: 'vy²', nombre: 'Cuadrado de la componente Y', descripcion: 'Área del cuadrado del cateto vertical.' },
          { simbolo: '√(vx² + vy²)', nombre: 'Raíz cuadrada euclídea', descripcion: 'Solución positiva del Teorema de Pitágoras.' }
        ],
        formula: '||v|| = √(vx² + vy²)',
        formulaNota: 'Al elevar al cuadrado, (-vx)² = vx², garantizando que los signos negativos de las componentes no afecten la no-negatividad del módulo.',
        algoritmoPasos: [
          { paso: 1, titulo: 'Obtener las componentes del vector', detalle: 'Asegúrate de tener vx y vy calculados o dados.' },
          { paso: 2, titulo: 'Elevar cada componente al cuadrado', detalle: 'Calcula vx² y vy². El resultado siempre debe ser positivo.' },
          { paso: 3, titulo: 'Sumar ambos cuadrados', detalle: 'Suma vx² + vy² para obtener la suma de áreas de los catetos.' },
          { paso: 4, titulo: 'Extraer la raíz cuadrada positiva', detalle: 'Aplica la raíz cuadrada al resultado de la suma para obtener la longitud final.' }
        ],
        erroresComunes: [
          { error: 'Escribir signos negativos dentro del radical', porqueOcurre: 'Escribir (-8)² como -64 en la calculadora.', solucionCorrecta: '(-8)² = +64. La suma de cuadrados siempre suma cantidades positivas.' },
          { error: 'Simplificar √(a² + b²) como a + b', porqueOcurre: 'Falsa linealidad de la raíz cuadrada.', solucionCorrecta: '√(36 + 64) = √100 = 10, no 6 + 8 = 14. La raíz de una suma no es la suma de raíces.' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'En modo "Puntos de Unión", ingresa A(1, 1) y B(7, -7)', resultadoEsperado: 'El vector tiene componentes vx = 6, vy = -8.' },
          { paso: 2, accion: 'Mira la tarjeta de "Resumen de Magnitudes"', resultadoEsperado: 'Módulo: ||v|| = 10.00 u.' },
          { paso: 3, accion: 'Observa las líneas punteadas de proyección en el plano', resultadoEsperado: 'Verás visualizado el triángulo rectángulo de catetos 6 y 8 e hipotenusa 10.' }
        ],
        ejemplo: {
          enunciado: 'Calcular el módulo del vector v = (6, -8).',
          pasos: [
            { paso: 'Cuadrado de vx', calculo: 'vx² = 6² = 36' },
            { paso: 'Cuadrado de vy', calculo: 'vy² = (-8)² = 64' },
            { paso: 'Suma de cuadrados', calculo: '36 + 64 = 100' },
            { paso: 'Raíz cuadrada euclídea', calculo: '||v|| = √100 = 10' }
          ],
          resultado: '||v|| = 10 unidades',
          simulacion: {
            modo: 'dos-puntos',
            espacio: '2d',
            datos: { puntos: [{ id: 'A', x: 1, y: 1 }, { id: 'B', x: 7, y: -7 }] }
          }
        }
      },
      {
        id: 'unitario',
        numero: 4,
        dimension: '2d',
        categoria: 'Normalización de Vectores',
        titulo: 'Vector Unitario Normalizado: Dirección Pura (u = v / ||v||)',
        resumen: 'Aislamiento de la orientación espacial de un vector eliminando el factor de escala o longitud.',
        concepto: {
          queEs: 'Un vector unitario (denotado como û o v̂) es aquel cuya norma mide exactamente 1 (||û|| = 1). Normalizar un vector significa dividir cada una de sus componentes entre su propio módulo.',
          paraQueSirve: 'Permite definir "direcciones puras". En videojuegos, simulación física y robótica, se usa para orientar fuerzas, proyectar luces y calcular trayectorias balísticas sin distorsionar la intensidad.',
          significadoFisico: 'Cualquier vector del universo puede descomponerse en el producto de su intensidad escalar multiplicada por su vector unitario director: v = ||v|| · û.'
        },
        variables: [
          { simbolo: 'û', nombre: 'Vector unitario', descripcion: 'Vector de longitud unitaria (||û|| = 1) que señala la misma dirección y sentido que v.' },
          { simbolo: '||v||', nombre: 'Norma del vector original', descripcion: 'Longitud empleada como factor de división para normalizar.' },
          { simbolo: 'ux = vx / ||v||', nombre: 'Componente X normalizada', descripcion: 'Coincide exactamente con el coseno del ángulo director: ux = cos(θ).' },
          { simbolo: 'uy = vy / ||v||', nombre: 'Componente Y normalizada', descripcion: 'Coincide exactamente con el seno del ángulo director: uy = sen(θ).' }
        ],
        formula: 'û = v / ||v|| = (vx / ||v||, vy / ||v||)  ==>  ||û|| = 1',
        formulaNota: 'Demostración: ||û||² = (vx/||v||)² + (vy/||v||)² = (vx² + vy²) / ||v||² = ||v||² / ||v||² = 1.',
        algoritmoPasos: [
          { paso: 1, titulo: 'Calcular el módulo del vector original', detalle: 'Calcula ||v|| = √(vx² + vy²). Debe ser estrictamente mayor que 0.' },
          { paso: 2, titulo: 'Dividir la componente X entre el módulo', detalle: 'Calcula ux = vx / ||v||.' },
          { paso: 3, titulo: 'Dividir la componente Y entre el módulo', detalle: 'Calcula uy = vy / ||v||.' },
          { paso: 4, titulo: 'Verificar la norma del resultado', detalle: 'Comprueba que √(ux² + uy²) es igual a 1 (con margen numérico de redondeo).' }
        ],
        erroresComunes: [
          { error: 'Intentar normalizar el vector nulo (0, 0)', porqueOcurre: 'Dividir entre ||(0, 0)|| = 0.', solucionCorrecta: 'El vector nulo no tiene dirección definida y no puede normalizarse (división por cero indeterminada).' },
          { error: 'Olvidar conservar los signos de las componentes', porqueOcurre: 'Hacer ux y uy siempre positivos.', solucionCorrecta: 'El vector unitario debe apuntar al mismo cuadrante que el vector original; conserva sus signos.' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'Carga el vector v = (3, 4) con A(0, 0) y B(3, 4)', resultadoEsperado: 'Se visualiza el vector de longitud 5.' },
          { paso: 2, accion: 'Abre el cajón "Ver Solución"', resultadoEsperado: 'En la sección "Vector Unitario Director" verás: û = (3/5, 4/5) = (0.60, 0.80).' },
          { paso: 3, accion: 'Comprueba el cálculo', resultadoEsperado: '||û|| = √(0.60² + 0.80²) = √(0.36 + 0.64) = √1 = 1.00.' }
        ],
        ejemplo: {
          enunciado: 'Hallar el vector unitario en la dirección de v = (3, 4).',
          pasos: [
            { paso: 'Cálculo del módulo', calculo: '||v|| = √(3² + 4²) = √25 = 5' },
            { paso: 'Componente unitaria X', calculo: 'ux = 3 / 5 = 0.6' },
            { paso: 'Componente unitaria Y', calculo: 'uy = 4 / 5 = 0.8' },
            { paso: 'Comprobación de norma', calculo: '||û|| = √(0.6² + 0.8²) = √(0.36 + 0.64) = √1 = 1' }
          ],
          resultado: 'û = (0.6, 0.8) con ||û|| = 1',
          simulacion: {
            modo: 'dos-puntos',
            espacio: '2d',
            datos: { puntos: [{ id: 'A', x: 0, y: 0 }, { id: 'B', x: 3, y: 4 }] }
          }
        }
      },
      {
        id: 'algebra-paralelogramo',
        numero: 5,
        dimension: '2d',
        categoria: 'Álgebra Vectorial',
        titulo: 'Suma Vectorial: Regla del Paralelogramo y Punta-Cola',
        resumen: 'Construcciones geométricas y adición analítica de vectores concurrentes.',
        concepto: {
          queEs: 'La suma de dos vectores u y v equivale algebraicamente a sumar sus componentes homólogas: (ux + vx, uy + vy). Geométricamente, si los vectores parten del mismo origen, los lados paralelos trazados desde sus extremos forman un paralelogramo cuya diagonal principal es el vector suma u + v.',
          paraQueSirve: 'Es el principio fundamental de superposición de fuerzas en estática y dinámica: la fuerza neta que mueve un cuerpo es la suma vectorial de todas las fuerzas concurrentes que tiran de él.',
          significadoFisico: 'La resta u - v equivale a sumar el vector opuesto: u + (-v). Geométricamente representa la otra diagonal del paralelogramo (el vector que va desde la punta de v hasta la punta de u).'
        },
        variables: [
          { simbolo: 'u = (ux, uy)', nombre: 'Primer vector concurrente', descripcion: 'Primer vector anclado en el origen común.' },
          { simbolo: 'v = (vx, vy)', nombre: 'Segundo vector concurrente', descripcion: 'Segundo vector anclado en el origen común.' },
          { simbolo: 'u + v', nombre: 'Vector suma resultante', descripcion: 'Diagonal principal del paralelogramo.' },
          { simbolo: 'u - v', nombre: 'Vector diferencia', descripcion: 'Vector que conecta el extremo de v con el extremo de u.' },
          { simbolo: 'k · u', nombre: 'Producto por escalar', descripcion: 'Escalado que estira (k > 1), comprime (0 < k < 1) o invierte el sentido (k < 0).' }
        ],
        formula: 'Suma: u + v = (ux + vx, uy + vy)  |  Resta: u - v = (ux - vx, uy - vy)',
        formulaNota: 'Regla Punta-Cola: Si colocas el origen de v en el extremo de u, el vector suma conecta el origen de u con el extremo de v.',
        algoritmoPasos: [
          { paso: 1, titulo: 'Obtener las componentes de u y v', detalle: 'Anota u = (ux, uy) y v = (vx, vy).' },
          { paso: 2, titulo: 'Sumar componentes horizontales', detalle: 'Calcula Sx = ux + vx teniendo en cuenta signos negativos.' },
          { paso: 3, titulo: 'Sumar componentes verticales', detalle: 'Calcula Sy = uy + vy teniendo en cuenta signos negativos.' },
          { paso: 4, titulo: 'Trazar el paralelogramo geométrico', detalle: 'Dibuja la línea paralela a u en la punta de v y la paralela a v en la punta de u para visualizar la diagonal.' }
        ],
        erroresComunes: [
          { error: 'Sumar los módulos directamente (||u + v|| = ||u|| + ||v||)', porqueOcurre: 'Pensar que los módulos se suman como números ordinarios.', solucionCorrecta: 'Por la desigualdad triangular, ||u + v|| ≤ ||u|| + ||v||. Solo son iguales si ambos vectores son colineales y tienen el mismo sentido.' },
          { error: 'Confundir el sentido del vector resta u - v', porqueOcurre: 'Apuntar la flecha hacia v en vez de hacia u.', solucionCorrecta: 'u - v apunta hacia u (hacia el minuendo).' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'Haz clic en el modo "Operaciones con Vectores u y v"', resultadoEsperado: 'Aparecen campos para ux, uy, vx, vy y el factor k.' },
          { paso: 2, accion: 'Ingresa u = (4, 2) y v = (-2, 3)', resultadoEsperado: 'El canvas traza ambos vectores en cian y ámbar y dibuja el paralelogramo con líneas punteadas.' },
          { paso: 3, accion: 'Observa la flecha verde esmeralda', resultadoEsperado: 'Es el vector suma u + v = (2, 5) que recorre la diagonal del paralelogramo.' }
        ],
        ejemplo: {
          enunciado: 'Sumar vector u = (4, 2) y vector v = (-2, 3) con la regla del paralelogramo.',
          pasos: [
            { paso: 'Suma horizontal Sx', calculo: 'Sx = ux + vx = 4 + (-2) = 2' },
            { paso: 'Suma vertical Sy', calculo: 'Sy = uy + vy = 2 + 3 = 5' },
            { paso: 'Módulo del vector suma', calculo: '||u + v|| = √(2² + 5²) = √29 ≈ 5.39 u' }
          ],
          resultado: 'u + v = (2, 5) con ||u + v|| ≈ 5.39 unidades',
          simulacion: {
            modo: 'operaciones',
            espacio: '2d',
            datos: { ux: 4, uy: 2, vx: -2, vy: 3, k: 2 },
            construccion: 'paralelogramo'
          }
        }
      },
      {
        id: 'producto-escalar',
        numero: 6,
        dimension: '2d',
        categoria: 'Álgebra y Proyecciones',
        titulo: 'Producto Escalar y Criterio de Ortogonalidad (u · v = 0)',
        resumen: 'Multiplicación escalar, proyección geométrica y determinación del ángulo entre vectores.',
        concepto: {
          queEs: 'El producto escalar (o dot product) de dos vectores no devuelve otro vector, sino un número real (escalar): u · v = ux·vx + uy·vy. Se vincula íntimamente con el ángulo θ entre ellos: u · v = ||u|| · ||v|| · cos(θ).',
          paraQueSirve: 'Es la herramienta matemática definitiva para verificar si dos direcciones son perpendiculares (ortogonales) sin necesidad de dibujar ni medir ángulos.',
          significadoFisico: 'En física, define el Trabajo Mecánico W = F · d (fuerza por desplazamiento). Si la fuerza es perpendicular al movimiento (θ = 90°), el trabajo realizado es nulo (W = 0).'
        },
        variables: [
          { simbolo: 'u · v', nombre: 'Producto escalar', descripcion: 'Número real resultante de la suma de productos de componentes.' },
          { simbolo: 'cos(θ)', nombre: 'Coseno del ángulo comprendido', descripcion: 'cos(θ) = (u · v) / (||u|| · ||v||).' },
          { simbolo: 'θ < 90°', nombre: 'Ángulo agudo', descripcion: 'Producto escalar positivo (u · v > 0): apuntan en el mismo hemisferio.' },
          { simbolo: 'θ = 90°', nombre: 'Ortogonales / Perpendiculares', descripcion: 'Producto escalar estrictamente cero (u · v = 0).' },
          { simbolo: 'θ > 90°', nombre: 'Ángulo obtuso', descripcion: 'Producto escalar negativo (u · v < 0): apuntan en sentidos opuestos.' }
        ],
        formula: 'u · v = ux·vx + uy·vy = ||u|| · ||v|| · cos(θ)  ==>  u ⊥ v <=> u · v = 0',
        formulaNota: 'El producto escalar es conmutativo: u · v = v · u. Para hallar el ángulo: θ = arccos((u·v) / (||u||·||v||)).',
        algoritmoPasos: [
          { paso: 1, titulo: 'Multiplicar las componentes X', detalle: 'Calcula Px = ux · vx.' },
          { paso: 2, titulo: 'Multiplicar las componentes Y', detalle: 'Calcula Py = uy · vy.' },
          { paso: 3, titulo: 'Sumar ambos productos', detalle: 'Calcula u · v = Px + Py.' },
          { paso: 4, titulo: 'Evaluar el criterio de ortogonalidad', detalle: 'Si el resultado es exactamente 0, los vectores son ortogonales (perpendiculares a 90°).' }
        ],
        erroresComunes: [
          { error: 'Creer que el producto escalar devuelve un vector', porqueOcurre: 'Confundir producto escalar con producto por un escalar o vectorial.', solucionCorrecta: 'El producto escalar produce UN NÚMERO (escalar), nunca una pareja de coordenadas.' },
          { error: 'Olvidar que cos(90°) = 0', porqueOcurre: 'Confundir seno y coseno.', solucionCorrecta: 'El coseno de 90° es 0, por eso la perpendicularidad anula el producto escalar.' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'En modo "Operaciones", ingresa u = (3, 2) y v = (-2, 3)', resultadoEsperado: 'En el canvas se observa que las dos flechas forman un ángulo recto exacto.' },
          { paso: 2, accion: 'Consulta el panel de "Resumen de Magnitudes"', resultadoEsperado: 'Producto Escalar u · v = 0.00 | Ángulo θ = 90.00°.' },
          { paso: 3, accion: 'Abre el cajón de solución', resultadoEsperado: 'Verás la comprobación: (3)(-2) + (2)(3) = -6 + 6 = 0 -> SÍ SON ORTOGONALES.' }
        ],
        ejemplo: {
          enunciado: 'Comprobar analíticamente si u = (3, 2) y v = (-2, 3) son perpendiculares.',
          pasos: [
            { paso: 'Producto en X', calculo: '(3) · (-2) = -6' },
            { paso: 'Producto en Y', calculo: '(2) · (3) = +6' },
            { paso: 'Suma de productos', calculo: 'u · v = -6 + 6 = 0' },
            { paso: 'Cálculo del ángulo θ', calculo: 'cos(θ) = 0 / (||u||·||v||) = 0  ==>  θ = arccos(0) = 90°' }
          ],
          resultado: 'u y v son ortogonales (perpendiculares, θ = 90°)',
          simulacion: {
            modo: 'operaciones',
            espacio: '2d',
            datos: { ux: 3, uy: 2, vx: -2, vy: 3, k: 1 },
            construccion: 'ninguno'
          }
        }
      },
      {
        id: 'equipolencia',
        numero: 7,
        dimension: '2d',
        categoria: 'Relaciones de Equivalencia',
        titulo: 'Equipolencia de Vectores y Vectores Libres',
        resumen: 'Cuándo dos vectores fijos situados en distintas partes del plano representan el mismo vector libre.',
        concepto: {
          queEs: 'Dos segmentos orientados AB y CD son equipolentes (AB ~ CD) si y solo si poseen el mismo módulo (longitud), la misma dirección (rectas directrices paralelas con igual pendiente) y el mismo sentido (apuntan hacia el mismo lado).',
          paraQueSirve: 'Es el fundamento teórico del concepto de "Vector Libre": permite trasladar vectores rígidamente por el espacio sin que sus propiedades algebraicas cambien.',
          significadoFisico: 'Si empujas un vagón por la parte delantera o por la parte trasera con la misma fuerza y dirección, la fuerza aplicada es el mismo vector libre equipolente.'
        },
        variables: [
          { simbolo: 'AB ~ CD', nombre: 'Relación de equipolencia', descripcion: 'Indica que los vectores fijos AB y CD son equipolentes.' },
          { simbolo: 'Δx(AB) = xB - xA', nombre: 'Componente horizontal de AB', descripcion: 'Debe coincidir exactamente con Δx(CD) = xD - xC.' },
          { simbolo: 'Δy(AB) = yB - yA', nombre: 'Componente vertical de AB', descripcion: 'Debe coincidir exactamente con Δy(CD) = yD - yC.' },
          { simbolo: 'Vértices ABDC', nombre: 'Paralelogramo de equipolencia', descripcion: 'Los cuatro extremos unidos en orden forman un paralelogramo no degenerado.' }
        ],
        formula: 'AB equipolente a CD <=> (xB - xA = xD - xC) ∧ (yB - yA = yD - yC)',
        formulaNota: 'Criterio analítico directo: Dos vectores son equipolentes si y solo si tienen EXACTAMENTE las mismas componentes cartesianas.',
        algoritmoPasos: [
          { paso: 1, titulo: 'Calcular componentes de AB', detalle: 'Calcula u = (xB - xA, yB - yA).' },
          { paso: 2, titulo: 'Calcular componentes de CD', detalle: 'Calcula v = (xD - xC, yD - yC).' },
          { paso: 3, titulo: 'Comparar componentes homólogas', detalle: 'Comprueba si uX == vX y si uY == vY.' },
          { paso: 4, titulo: 'Emitir veredicto formal', detalle: 'Si ambas coinciden, son equipolentes. Si alguna difiere, NO son equipolentes.' }
        ],
        erroresComunes: [
          { error: 'Verificar solo que tengan el mismo módulo', porqueOcurre: 'Pensar que medir lo mismo basta para ser equipolentes.', solucionCorrecta: 'Dos vectores pueden medir 5 unidades pero uno apuntar al norte y otro al este; no son equipolentes.' },
          { error: 'Ignorar el sentido (dirección opuesta)', porqueOcurre: 'Tener pendientes iguales pero sentidos contrarios (180°).', solucionCorrecta: 'Si u = (3, 4) y v = (-3, -4), tienen igual módulo y recta directriz, pero sentido contrario; NO son equipolentes.' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'Selecciona el modo "Test de Equipolencia"', resultadoEsperado: 'El panel muestra las coordenadas de los cuatro puntos: A, B, C y D.' },
          { paso: 2, accion: 'Ingresa A(1,1), B(4,5) y C(-2,-1), D(1,3)', resultadoEsperado: 'El canvas dibuja ambos vectores en posiciones espaciales distintas conectadas por líneas punteadas.' },
          { paso: 3, accion: 'Observa la tarjeta de resultado', resultadoEsperado: 'Verás el badge verde: "SÍ: VECTORES EQUIPOLENTES" con desglose de módulos y pendientes.' }
        ],
        ejemplo: {
          enunciado: 'Verificar equipolencia entre AB [A(1,1), B(4,5)] y CD [C(-2,-1), D(1,3)].',
          pasos: [
            { paso: 'Componentes de AB', calculo: 'AB = (4 - 1, 5 - 1) = (3, 4)' },
            { paso: 'Componentes de CD', calculo: 'CD = (1 - (-2), 3 - (-1)) = (3, 4)' },
            { paso: 'Comparación analítica', calculo: '(3, 4) == (3, 4)  ==>  Idénticas componentes, módulo 5 y misma pendiente' }
          ],
          resultado: 'SÍ: Son vectores equipolentes',
          simulacion: {
            modo: 'equipolencia',
            espacio: '2d',
            datos: { Ax: 1, Ay: 1, Bx: 4, By: 5, Cx: -2, Cy: -1, Dx: 1, Dy: 3 }
          }
        }
      },
      {
        id: 'cadenas-resultante',
        numero: 8,
        dimension: '2d',
        categoria: 'Cinemática y Trayectorias',
        titulo: 'Cadenas Vectoriales y Desplazamiento Resultante Neto',
        resumen: 'Principio de superposición y desplazamiento total en rutas multipunto consecutivas.',
        concepto: {
          queEs: 'Cuando un móvil o partícula recorre una serie de tramos consecutivos A → B → C → D → ..., el desplazamiento resultante neto R es la suma vectorial de todos los tramos individuales.',
          paraQueSirve: 'Permite comprender la diferencia vital en cinemática entre la distancia escalar total recorrida (odómetro del coche) y el vector desplazamiento neto (dónde estás respecto a donde saliste).',
          significadoFisico: 'Por la propiedad telescópica: R = (B - A) + (C - B) + (D - C) = D - A. El vector desplazamiento neto depende EXCLUSIVAMENTE del punto inicial y del punto final, sin importar el camino recorrido.'
        },
        variables: [
          { simbolo: 'v1, v2, ..., vn', nombre: 'Tramos individuales', descripcion: 'Vectores de cada segmento de la ruta.' },
          { simbolo: 'd_total', nombre: 'Distancia total recorrida', descripcion: 'Suma escalar de las longitudes de los tramos: ||v1|| + ||v2|| + ...' },
          { simbolo: 'R = ∑ vi', nombre: 'Vector Resultante Neto', descripcion: 'Vector suma directa que une el punto inicial con el final.' },
          { simbolo: '||R||', nombre: 'Módulo del desplazamiento neto', descripcion: 'Distancia euclídea en línea recta entre partida y destino.' }
        ],
        formula: 'R = ∑ vi = P_final - P_inicial  ==>  ||R|| ≤ d_total',
        formulaNota: 'La igualdad ||R|| = d_total solo ocurre si la trayectoria es una línea recta pura sin cambios de sentido.',
        algoritmoPasos: [
          { paso: 1, titulo: 'Calcular cada vector tramo', detalle: 'Calcula v1 = B - A, v2 = C - B, v3 = D - C...' },
          { paso: 2, titulo: 'Sumar todas las componentes X', detalle: 'Rx = v1x + v2x + v3x + ...' },
          { paso: 3, titulo: 'Sumar todas las componentes Y', detalle: 'Ry = v1y + v2y + v3y + ...' },
          { paso: 4, titulo: 'Comprobar con el atajo telescópico', detalle: 'Verifica que Rx = x_final - x_inicial y Ry = y_final - y_inicial.' }
        ],
        erroresComunes: [
          { error: 'Confundir distancia caminada con desplazamiento neto', porqueOcurre: 'Si caminas 4 km al norte y 4 km al sur, la distancia es 8 km.', solucionCorrecta: 'El desplazamiento neto es 0 (volviste al punto de partida).' },
          { error: 'Olvidar el orden secuencial de los nodos', porqueOcurre: 'Conectar puntos en orden no cronológico.', solucionCorrecta: 'Cada tramo nace donde murió el anterior: A→B, luego B→C, etc.' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'En modo "Puntos de Unión", usa los botones "+ Añadir Punto"', resultadoEsperado: 'Puedes añadir puntos C, D, E... para crear rutas complejas.' },
          { paso: 2, accion: 'Introduce A(1, 2), B(5, 6), C(9, 3)', resultadoEsperado: 'Se dibujan los tramos individuales en cian y el vector resultante neto R en verde esmeralda.' },
          { paso: 3, accion: 'Consulta el resumen rápido', resultadoEsperado: 'Verás desglosadas las longitudes de cada tramo y el vector resultante R = (8, 1).' }
        ],
        ejemplo: {
          enunciado: 'Calcular el desplazamiento resultante de la ruta A(1, 2) → B(5, 6) → C(9, 3).',
          pasos: [
            { paso: 'Tramo 1 (AB)', calculo: 'AB = (5 - 1, 6 - 2) = (4, 4)' },
            { paso: 'Tramo 2 (BC)', calculo: 'BC = (9 - 5, 3 - 6) = (4, -3)' },
            { paso: 'Vector resultante R', calculo: 'R = AB + BC = (4 + 4, 4 + (-3)) = (8, 1)' },
            { paso: 'Comprobación directa C - A', calculo: 'R = (9 - 1, 3 - 2) = (8, 1)' }
          ],
          resultado: 'R = (8, 1) con módulo ||R|| = √(64 + 1) ≈ 8.06 unidades',
          simulacion: {
            modo: 'dos-puntos',
            espacio: '2d',
            datos: { puntos: [{ id: 'A', x: 1, y: 2 }, { id: 'B', x: 5, y: 6 }, { id: 'C', x: 9, y: 3 }] }
          }
        }
      },
      {
        id: 'teoria-3d-cartesiana',
        numero: 9,
        dimension: '3d',
        categoria: 'Álgebra Espacial 3D',
        titulo: 'Expresión Cartesiana y Cosenos Directores en ℝ³',
        resumen: 'Representación tridimensional en la base canónica i, j, k, módulo espacial y orientación angular.',
        concepto: {
          queEs: 'En el espacio tridimensional ℝ³, un vector posee tres proyecciones ortogonales sobre los ejes cartesianos X, Y y Z: u = (ux, uy, uz) = ux·i + uy·j + uz·k. Su orientación angular no se mide con un único ángulo, sino mediante tres ángulos directores α, β y γ que forma el vector con los semiejes positivos X, Y y Z.',
          paraQueSirve: 'Es la base de la navegación aérea, astrodinámica y gráficos 3D: define hacia dónde apunta una cámara, un avión o un cohete en el espacio real.',
          significadoFisico: 'Los cosenos directores son exactamente las componentes del vector unitario director: û = (cos α, cos β, cos γ). Se cumple siempre la identidad pitagórica fundamental: cos²α + cos²β + cos²γ = 1.'
        },
        variables: [
          { simbolo: 'u = (ux, uy, uz)', nombre: 'Vector tridimensional', descripcion: 'Trío ordenado de componentes espaciales.' },
          { simbolo: '||u||', nombre: 'Módulo tridimensional', descripcion: 'Longitud euclídea: ||u|| = √(ux² + uy² + uz²).' },
          { simbolo: 'cos α = ux / ||u||', nombre: 'Coseno director en X', descripcion: 'Coseno del ángulo α con el eje X.' },
          { simbolo: 'cos β = uy / ||u||', nombre: 'Coseno director en Y', descripcion: 'Coseno del ángulo β con el eje Y.' },
          { simbolo: 'cos γ = uz / ||u||', nombre: 'Coseno director en Z', descripcion: 'Coseno del ángulo γ con el eje vertical Z.' }
        ],
        formula: '||u|| = √(ux² + uy² + uz²)  |  cos²α + cos²β + cos²γ = 1',
        formulaNota: 'Si se conocen los ángulos directores y la magnitud, el vector exacto se reconstruye como: ux = ||u||·cos α, uy = ||u||·cos β, uz = ||u||·cos γ.',
        algoritmoPasos: [
          { paso: 1, titulo: 'Obtener las tres componentes espaciales', detalle: 'Asegúrate de disponer de ux, uy, uz.' },
          { paso: 2, titulo: 'Calcular el módulo tridimensional', detalle: 'Eleva las tres componentes al cuadrado, súmalas y extrae la raíz: ||u|| = √(ux² + uy² + uz²).' },
          { paso: 3, titulo: 'Calcular los tres cosenos directores', detalle: 'Divide cada componente entre el módulo: cos α = ux/||u||, cos β = uy/||u||, cos γ = uz/||u||.' },
          { paso: 4, titulo: 'Comprobar la identidad pitagórica', detalle: 'Verifica que (cos α)² + (cos β)² + (cos γ)² = 1.' }
        ],
        erroresComunes: [
          { error: 'Intentar usar un solo ángulo θ como en 2D', porqueOcurre: 'Extrapolar la trigonometría plana al espacio.', solucionCorrecta: 'En ℝ³ se necesitan al menos dos ángulos esféricos (azimut y elevación) o los tres cosenos directores.' },
          { error: 'Olvidar la componente vertical Z al calcular el módulo', porqueOcurre: 'Hacer solo √(ux² + uy²).', solucionCorrecta: 'En ℝ³ el Teorema de Pitágoras se aplica dos veces: la diagonal espacial incluye uz².' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'Pulsa el botón "Espacio ℝ³" en la barra superior', resultadoEsperado: 'El canvas conmuta al motor 3D orbital con ejes X (rojo), Y (verde) y Z (violeta).' },
          { paso: 2, accion: 'Selecciona el modo "Vector entre 2 Puntos (A → B) & Cosenos"', resultadoEsperado: 'El panel permite introducir coordenadas 3D para A y B.' },
          { paso: 3, accion: 'Introduce A(0,0,0) y B(1,2,2) y arrastra con el ratón', resultadoEsperado: 'Puedes orbitar la cámara 360° para ver la orientación espacial y los cosenos en el resumen.' }
        ],
        ejemplo: {
          enunciado: 'Dado el vector u = (1, 2, 2), calcular su módulo, cosenos directores y vector unitario.',
          pasos: [
            { paso: 'Cálculo del módulo 3D', calculo: '||u|| = √(1² + 2² + 2²) = √(1 + 4 + 4) = √9 = 3' },
            { paso: 'Cosenos directores', calculo: 'cos α = 1/3 ≈ 0.333, cos β = 2/3 ≈ 0.667, cos γ = 2/3 ≈ 0.667' },
            { paso: 'Identidad pitagórica', calculo: '(1/3)² + (2/3)² + (2/3)² = 1/9 + 4/9 + 4/9 = 9/9 = 1.00' },
            { paso: 'Vector unitario û', calculo: 'û = (1/3, 2/3, 2/3) ≈ (0.333, 0.667, 0.667)' }
          ],
          resultado: '||u|| = 3 unidades,  cos=(0.33, 0.67, 0.67),  û=(1/3, 2/3, 2/3)',
          simulacion: {
            entorno: 'espacio-3d',
            espacio: '3d',
            modo: 'puntos-3d',
            datos: { ax: 0, ay: 0, az: 0, bx: 1, by: 2, bz: 2 }
          }
        }
      },
      {
        id: 'teoria-3d-producto-vectorial',
        numero: 10,
        dimension: '3d',
        categoria: 'Álgebra Espacial 3D',
        titulo: 'Producto Vectorial (u × v) y Área del Paralelogramo en ℝ³',
        resumen: 'Determinante simbólico de Laplace, vector normal perpendicular, regla de la mano derecha y área de la superficie.',
        concepto: {
          queEs: 'A diferencia del producto escalar, el producto vectorial (o cross product) entre dos vectores u, v ∈ ℝ³ engendra UN NUEVO VECTOR w = u × v con tres propiedades excepcionales: 1. Es estrictamente perpendicular a ambos vectores; 2. Su sentido sigue la regla de la mano derecha; 3. Su módulo ||u × v|| es exactamente igual al área del paralelogramo formado por u y v.',
          paraQueSirve: 'En ingeniería y física modela el Momento de una Fuerza (Torque: τ = r × F), la Fuerza Magnética de Lorentz (F = q·v × B) y el cálculo de vectores normales de superficie en diseño 3D CAD.',
          significadoFisico: 'Es anticonmutativo: v × u = -(u × v). Invertir el orden de los factores invierte la dirección de la flecha 180°.'
        },
        variables: [
          { simbolo: 'u × v', nombre: 'Vector producto cruz', descripcion: 'Vector perpendicular al plano generado por u y v.' },
          { simbolo: '||u × v||', nombre: 'Módulo del producto cruz', descripcion: 'Área del paralelogramo sustentado: ||u|| · ||v|| · sen(θ).' },
          { simbolo: 'i, j, k', nombre: 'Vectores de la base canónica', descripcion: 'Filas superiores del determinante de desarrollo de Laplace.' },
          { simbolo: 'u × v = (0, 0, 0)', nombre: 'Vectores colineales', descripcion: 'Si el producto vectorial se anula, los vectores son paralelos.' }
        ],
        formula: 'u × v = (uy·vz - uz·vy)·i - (ux·vz - uz·vx)·j + (ux·vy - uy·vx)·k',
        formulaMatriz: {
          filas: [
            ['i', 'j', 'k'],
            ['ux', 'uy', 'uz'],
            ['vx', 'vy', 'vz']
          ]
        },
        formulaNota: 'El signo negativo central en la componente j proviene de la regla de los signos de Laplace (-1)^(1+2) = -1.',
        algoritmoPasos: [
          { paso: 1, titulo: 'Plantear el determinante 3×3 simbólico', detalle: 'Coloca en la fila 1 a (i, j, k), en la fila 2 a u=(ux, uy, uz) y en la fila 3 a v=(vx, vy, vz).' },
          { paso: 2, titulo: 'Calcular el menor adjunto en i', detalle: 'Tapa la fila 1 y columna 1: wx = (uy·vz - uz·vy).' },
          { paso: 3, titulo: 'Calcular el menor adjunto en j (con signo negativo)', detalle: 'Tapa fila 1 y columna 2: wy = - (ux·vz - uz·vx) = (uz·vx - ux·vz).' },
          { paso: 4, titulo: 'Calcular el menor adjunto en k', detalle: 'Tapa fila 1 y columna 3: wz = (ux·vy - uy·vx).' },
          { paso: 5, titulo: 'Calcular el área del paralelogramo', detalle: 'Calcula la norma del vector resultante: Área = √(wx² + wy² + wz²).' }
        ],
        erroresComunes: [
          { error: 'Olvidar el signo negativo de la componente j', porqueOcurre: 'Tratar todos los menores complementarios con signo positivo.', solucionCorrecta: 'La componente j es -(ux·vz - uz·vx). Omitir el signo negativo arruina la perpendicularidad.' },
          { error: 'Asumir conmutatividad (u × v = v × u)', porqueOcurre: 'Aplicar la propiedad del producto escalar.', solucionCorrecta: 'El producto cruz es anticonmutativo: v × u = -(u × v).' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'En el Espacio ℝ³, selecciona "Operaciones & Producto Vectorial (u × v)"', resultadoEsperado: 'Se abren los inputs 3D para u y v.' },
          { paso: 2, accion: 'Introduce u = (3, 1, 2) y v = (-1, 3, 1)', resultadoEsperado: 'El motor 3D dibuja u y v, sombreado en color ámbar el paralelogramo y trazando el vector u × v en perpendicular.' },
          { paso: 3, accion: 'Arrastra con el ratón para rotar el espacio', resultadoEsperado: 'Verifica visualmente que el vector u × v forma 90° exactos con u y con v simultáneamente.' }
        ],
        ejemplo: {
          enunciado: 'Calcular el producto vectorial de u = (3, 1, 2) y v = (-1, 3, 1) y el área del paralelogramo.',
          pasos: [
            { paso: 'Componente i', calculo: 'wx = (1)(1) - (2)(3) = 1 - 6 = -5' },
            { paso: 'Componente j', calculo: 'wy = -[(3)(1) - (2)(-1)] = -[3 + 2] = -5' },
            { paso: 'Componente k', calculo: 'wz = (3)(3) - (1)(-1) = 9 + 1 = 10' },
            { paso: 'Vector resultante w', calculo: 'u × v = (-5, -5, 10)' },
            { paso: 'Área del paralelogramo', calculo: 'Área = √((-5)² + (-5)² + 10²) = √(25 + 25 + 100) = √150 ≈ 12.25 u²' }
          ],
          resultado: 'u × v = (-5, -5, 10) con Área = 12.25 u²',
          simulacion: {
            entorno: 'espacio-3d',
            espacio: '3d',
            modo: 'operaciones-3d',
            datos: { ux: 3, uy: 1, uz: 2, vx: -1, vy: 3, vz: 1, k: 1 }
          }
        }
      },
      {
        id: 'teoria-3d-producto-mixto',
        numero: 11,
        dimension: '3d',
        categoria: 'Geometría Espacial 3D',
        titulo: 'Producto Mixto [u, v, w] y Volumen del Paralelepípedo',
        resumen: 'Operación combinada escalar-vectorial para medir volúmenes espaciales y test de coplanaridad.',
        concepto: {
          queEs: 'El producto mixto (o triple producto escalar) de tres vectores u, v, w ∈ ℝ³ combina el producto escalar con el producto vectorial: [u, v, w] = u · (v × w). Su valor algebraico coincide exactamente con el determinante de la matriz 3×3 cuyas filas son las componentes de los tres vectores.',
          paraQueSirve: 'Es el método más rápido y potente de la geometría espacial para calcular el volumen de prismas y tetraedros y para determinar si tres vectores yacen en el mismo plano (coplanares).',
          significadoFisico: 'El valor absoluto |[u, v, w]| es el volumen del paralelepípedo sustentado por los tres vectores. Si el producto mixto es cero ([u, v, w] = 0), los vectores están "aplastados" en un mismo plano y no generan volumen tridimensional.'
        },
        variables: [
          { simbolo: '[u, v, w]', nombre: 'Producto mixto', descripcion: 'u · (v × w), valor escalar del determinante 3×3.' },
          { simbolo: 'V = |[u, v, w]|', nombre: 'Volumen del paralelepípedo', descripcion: 'Volumen del cuerpo prismático generado por las aristas concurrentes u, v y w.' },
          { simbolo: 'V_tetraedro = V / 6', nombre: 'Volumen del tetraedro', descripcion: 'Volumen de la pirámide triangular sustentada por los tres vectores.' },
          { simbolo: '[u, v, w] = 0', nombre: 'Condición de coplanaridad', descripcion: 'Los tres vectores son linealmente dependientes y pertenecen al mismo plano.' }
        ],
        formula: 'Volumen = |u · (v × w)| = |det([u; v; w])|',
        formulaMatriz: {
          filas: [
            ['ux', 'uy', 'uz'],
            ['vx', 'vy', 'vz'],
            ['wx', 'wy', 'wz']
          ]
        },
        formulaNota: 'El signo del determinante indica la orientación de la terna: positivo para ternas dextrógiras (mano derecha) y negativo para levógiras.',
        algoritmoPasos: [
          { paso: 1, titulo: 'Construir la matriz 3×3 con las componentes', detalle: 'Coloca u en la fila 1, v en la fila 2 y w en la fila 3.' },
          { paso: 2, titulo: 'Calcular el producto vectorial de v × w', detalle: 'Aplica el método de menores para obtener el vector normal.' },
          { paso: 3, titulo: 'Calcular el producto escalar de u con ese resultado', detalle: 'Efectúa u · (v × w) = ux·(v×w)x + uy·(v×w)y + uz·(v×w)z.' },
          { paso: 4, titulo: 'Obtener el volumen tomando valor absoluto', detalle: 'Toma el valor absoluto del escalar obtenido para asegurar un volumen positivo.' },
          { paso: 5, titulo: 'Evaluar coplanaridad', detalle: 'Si el resultado es 0, los vectores son coplanares.' }
        ],
        erroresComunes: [
          { error: 'Dar un volumen negativo', porqueOcurre: 'Olvidar el valor absoluto cuando el determinante resulta negativo.', solucionCorrecta: 'Un determinante puede ser negativo por orientación, pero el volumen físico siempre es positivo: V = |det|.' },
          { error: 'Confundir el volumen del paralelepípedo con el del tetraedro', porqueOcurre: 'No dividir entre 6.', solucionCorrecta: 'El tetraedro solo ocupa una sexta parte (1/6) del volumen total del paralelepípedo.' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'En el Espacio ℝ³, prueba con los vectores u=(2, 1, 0) y v=(0, 3, 1)', resultadoEsperado: 'Se visualiza la base del prisma en el espacio.' },
          { paso: 2, accion: 'Observa el producto vectorial u × v en el resumen rápido', resultadoEsperado: 'Verás las componentes del vector normal que actúa como altura.' },
          { paso: 3, accion: 'Abre el cajón de solución', resultadoEsperado: 'Verás el cálculo del determinante 3x3 y la deducción completa del volumen.' }
        ],
        ejemplo: {
          enunciado: 'Calcular el producto mixto y volumen del paralelepípedo con aristas u=(2, 1, 0), v=(0, 3, 1) y w=(1, 2, 3).',
          pasos: [
            { paso: 'Producto vectorial v × w', calculo: 'v × w = (3·3 - 1·2, -(0·3 - 1·1), 0·2 - 3·1) = (7, 1, -3)' },
            { paso: 'Producto escalar u · (v × w)', calculo: 'u · (v × w) = (2)(7) + (1)(1) + (0)(-3) = 14 + 1 + 0 = 15' },
            { paso: 'Volumen paralelepípedo', calculo: 'V = |15| = 15 u³' },
            { paso: 'Volumen tetraedro', calculo: 'V_tetraedro = 15 / 6 = 2.50 u³' }
          ],
          resultado: 'Producto Mixto = 15,  Volumen = 15 u³,  Tetraedro = 2.5 u³',
          simulacion: {
            entorno: 'espacio-3d',
            espacio: '3d',
            modo: 'operaciones-3d',
            datos: { ux: 2, uy: 1, uz: 0, vx: 0, vy: 3, vz: 1, k: 1 }
          }
        }
      },
      {
        id: 'teoria-3d-proyeccion-papel',
        numero: 12,
        dimension: '3d',
        categoria: 'Sistemas de Representación',
        titulo: 'Proyección Ortogonal Plana y Modo Papel Técnico (ℝ² ⊂ ℝ³)',
        resumen: 'Paso de la visualización tridimensional al dibujo diédrico de ingeniería y cota z de elevación.',
        concepto: {
          queEs: 'En ingeniería, arquitectura y física aplicada, cualquier vector espacial v = (vx, vy, vz) puede descomponerse en dos elementos: su proyección ortogonal horizontal sobre el plano base XY (z=0) dada por Proy_XY(v) = (vx, vy, 0), y su cota de elevación vertical pura Δz = vz.',
          paraQueSirve: 'Es el fundamento del Sistema Diédrico de Monge y de los planos técnicos de construcción: permite inspeccionar en un papel plano de 2 dimensiones las trayectorias reales de estructuras y tuberías espaciales.',
          significadoFisico: 'Permite comprender que el plano bidimensional ℝ² es un subespacio inmerso dentro de ℝ³ (ℝ² ⊂ ℝ³). La longitud total del vector se descompone en longitud plana √(vx² + vy²) y altura vz mediante Pitágoras tridimensional.'
        },
        variables: [
          { simbolo: 'v = (vx, vy, vz)', nombre: 'Vector en el espacio', descripcion: 'Entidad tridimensional completa suspendida en el aire.' },
          { simbolo: 'Proy_XY(v) = (vx, vy, 0)', nombre: 'Sombra proyectada', descripcion: 'Vector planar que descansa sobre la cuadrícula del suelo z=0.' },
          { simbolo: 'Cota = vz', nombre: 'Altura o cota vertical', descripcion: 'Distancia perpendicular estricta que separa el extremo del vector del suelo.' },
          { simbolo: 'L_plano = √(vx² + vy²)', nombre: 'Longitud en planta', descripcion: 'Magnitud de la sombra vista desde arriba.' }
        ],
        formula: 'v = (vx, vy, vz)  ==>  Proy_XY(v) = (vx, vy, 0),  Cota = vz  |  ||v|| = √(L_plano² + Cota²)',
        formulaNota: 'El Modo Papel Técnico traza líneas de trazo discontinuo entre el vector espacial y su proyección en el plano para verificar la cota visualmente.',
        algoritmoPasos: [
          { paso: 1, titulo: 'Identificar las tres coordenadas del vector', detalle: 'Anota vx, vy, vz.' },
          { paso: 2, titulo: 'Aislar la sombra horizontal en el plano XY', detalle: 'Haz z = 0 para obtener la proyección diédrica: Proy = (vx, vy, 0).' },
          { paso: 3, titulo: 'Calcular la longitud de la proyección plana', detalle: 'Aplica Pitágoras bidimensional: L_plano = √(vx² + vy²).' },
          { paso: 4, titulo: 'Determinar la cota de elevación', detalle: 'La cota es directamente la componente vz.' },
          { paso: 5, titulo: 'Reconstruir el módulo espacial', detalle: 'Comprueba que ||v|| = √(L_plano² + vz²).' }
        ],
        erroresComunes: [
          { error: 'Creer que la longitud en el plano es igual a la longitud espacial', porqueOcurre: 'Olvidar que la cota z acorta la sombra si el vector está inclinado.', solucionCorrecta: 'La sombra proyectada L_plano siempre es menor o igual al módulo real ||v||. Solo son iguales si el vector es completamente horizontal (vz = 0).' },
          { error: 'Confundir cota negativa con longitud negativa', porqueOcurre: 'Tener vz < 0.', solucionCorrecta: 'Una cota negativa significa que el vector desciende por debajo del plano base (hacia el sótano); la distancia vertical sigue siendo |vz|.' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'En el Espacio ℝ³, pulsa el botón "Modo Papel" en el HUD derecho', resultadoEsperado: 'La cuadrícula cambia a papel técnico milimetrado con proyecciones ortogonales resaltadas.' },
          { paso: 2, accion: 'Introduce A(1, 1, 0) y B(4, 5, 3)', resultadoEsperado: 'Observa la sombra plana de longitud 5 en el suelo y la línea vertical de cota 3 que sube hasta el punto B.' },
          { paso: 3, accion: 'Comprueba el módulo', resultadoEsperado: 'En el HUD verás: L_plano = 5.00 u, Cota = 3.00 u, Módulo 3D = 5.83 u.' }
        ],
        ejemplo: {
          enunciado: 'Analizar la proyección en el plano XY y la cota vertical del vector del punto A(1, 1, 0) al punto B(4, 5, 3).',
          pasos: [
            { paso: 'Vector espacial AB', calculo: 'AB = (4 - 1, 5 - 1, 3 - 0) = (3, 4, 3)' },
            { paso: 'Sombra proyectada XY', calculo: 'Proy_XY(AB) = (3, 4, 0)' },
            { paso: 'Longitud en el plano (ℝ²)', calculo: 'L_plano = √(3² + 4²) = √25 = 5.00 u' },
            { paso: 'Cota de elevación vertical', calculo: 'Δz = 3.00 u' },
            { paso: 'Módulo espacial total', calculo: '||AB|| = √(5² + 3²) = √(25 + 9) = √34 ≈ 5.83 u' }
          ],
          resultado: 'Proyección XY = (3, 4, 0) con longitud 5.00 u, Cota = 3.00 u, Módulo = 5.83 u',
          simulacion: {
            entorno: 'espacio-3d',
            espacio: '3d',
            modo: 'puntos-3d',
            datos: { ax: 1, ay: 1, az: 0, bx: 4, by: 5, bz: 3 }
          }
        }
      }
    ];
  }

  /**
   * Retorna los temas filtrados por dimensión ('2d' o '3d').
   * @param {'2d'|'3d'} dimension
   * @returns {Array<Object>}
   */
  static obtenerTemasPorDimension(dimension) {
    if (!dimension) return this.obtenerTemas();
    return this.obtenerTemas().filter(t => t.dimension === dimension);
  }

  /**
   * Busca temas que coincidan con un término de búsqueda, opcionalmente acotado por dimensión.
   * @param {string} termino
   * @param {'2d'|'3d'|null} [dimension=null]
   * @returns {Array<Object>}
   */
  static buscar(termino, dimension = null) {
    const listaBase = dimension ? this.obtenerTemasPorDimension(dimension) : this.obtenerTemas();
    if (!termino || typeof termino !== 'string' || !termino.trim()) {
      return listaBase;
    }
    const clean = termino.toLowerCase().trim();
    return listaBase.filter(t =>
      t.titulo.toLowerCase().includes(clean) ||
      t.resumen.toLowerCase().includes(clean) ||
      t.categoria.toLowerCase().includes(clean) ||
      (t.concepto && t.concepto.queEs.toLowerCase().includes(clean)) ||
      (t.formula && t.formula.toLowerCase().includes(clean))
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
