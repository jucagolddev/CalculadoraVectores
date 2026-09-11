/**
 * Repositorio de dominio con el compendio teórico exhaustivo, lógica matemática y ejemplos interactivos en ℝ² y ℝ³
 * Cada módulo incluye:
 * 1. Concepto formal y significado físico (¿Qué es?, ¿Para qué sirve?, Significado en Física/Geometría)
 * 2. Glosario de simbología y variables matemáticas
 * 3. Fórmulas matemáticas universales y determinantes matriciales tipográficos
 * 4. Demostración analítica y deducción geométrica rigurosa ("¿Por qué funciona?")
 * 5. Mini-Laboratorio interactivo embebido in situ (SVG interactivo sin salir de la teoría)
 * 6. Algoritmo metódico de resolución a mano paso a paso
 * 7. Errores típicos y trampas frecuentes con diagnóstico de causa raíz
 * 8. Guía práctica de observación e interpretación en el simulador VectorLab
 * 9. Micro-Checkpoint interactivo de autocomprobación conceptual (Mini-Quiz)
 * 10. Ejemplo guiado con datos preconfigurados para simulación o reto en 1 clic
 */
export class RepositorioTeoria {
  /**
   * Retorna la colección completa de 16 módulos de aprendizaje conceptual (10 en ℝ² y 6 en ℝ³).
   * @returns {Array<Object>}
   */
  static obtenerTemas() {
    return [
      /* ==========================================================================
         DIMENSIÓN ℝ² (PLANO CARTESIANO)
         ========================================================================== */
      {
        id: 'fundamentos',
        numero: 1,
        dimension: '2d',
        categoria: 'Introducción al Álgebra Lineal',
        titulo: 'Fundamentos: Escalares vs. Vectores en ℝ²',
        subtitulo: 'Diferenciación rigurosa entre magnitudes puramente numéricas y entidades orientadas.',
        resumen: 'Comprende la diferencia esencial entre escalares y vectores, y las tres propiedades que definen a un vector.',
        concepto: {
          queEs: 'Un escalar es una magnitud cuantitativa que queda completamente definida por un único número real acompañado de su unidad física (temperatura de 25 °C, masa de 70 kg, intervalo de 15 segundos). Un vector en ℝ², en cambio, es un elemento de un espacio vectorial que requiere inexcusablemente tres atributos simultáneos: módulo o norma (longitud euclídea), dirección (inclinación de la recta directriz sobre la que descansa) y sentido (hacia cuál de los dos extremos apunta la saeta).',
          paraQueSirve: 'Es el lenguaje matemático imprescindible de la física, la robótica y la infografía. Permite modelar magnitudes orientadas en el espacio: fuerzas concurrentes, campos de velocidad de fluidos, aceleraciones y traslaciones cinemáticas.',
          significadoFisico: 'Si empujas un bloque con una fuerza de 50 N hacia arriba, el efecto dinámico es opuesto a empujarlo con 50 N hacia abajo. La magnitud escalar del esfuerzo es idéntica (50 N), pero los vectores tienen sentidos contrarios y producen aceleraciones opuestas.'
        },
        variables: [
          { simbolo: 'v = (vx, vy)', nombre: 'Vector en ℝ²', descripcion: 'Par ordenado de números reales que representan los desplazamientos ortogonales en el plano.' },
          { simbolo: 'vx', nombre: 'Componente horizontal', descripcion: 'Proyección escalar a lo largo del eje X (positivo hacia la derecha, negativo a la izquierda).' },
          { simbolo: 'vy', nombre: 'Componente vertical', descripcion: 'Proyección escalar a lo largo del eje Y (positivo hacia arriba, negativo hacia abajo).' },
          { simbolo: '||v||', nombre: 'Módulo o norma', descripcion: 'Longitud del segmento orientado en el plano. Siempre ||v|| ≥ 0.' },
          { simbolo: 'θ', nombre: 'Ángulo director', descripcion: 'Inclinación angular respecto al semieje coordenado positivo X.' }
        ],
        formula: '$$\\vec{v} = (v_x, v_y) = v_x \\mathbf{i} + v_y \\mathbf{j} \\in \\mathbb{R}^2$$',
        formulaNota: 'Los vectores i = (1, 0) y j = (0, 1) constituyen la base ortonormal canónica de ℝ².',
        demostracion: {
          titulo: '¿Por qué un vector no es un punto? Deducción de la invariancia por traslación',
          pasos: [
            { paso: 'Definición de punto afín', detalle: 'Un punto P(x, y) es una posición fija e inmóvil anclada rígidamente al sistema coordenado.' },
            { paso: 'Definición de vector libre', detalle: 'Un vector v representa la traslación pura entre dos puntos: v = B - A. Si desplazamos simultáneamente A y B una distancia fija d, el vector v\' = (B + d) - (A + d) = B - A = v permanece inalterado.' },
            { paso: 'Conclusión formal', detalle: 'Los vectores son invariantes bajo traslación rígida del origen; definen magnitudes libres orientadas, no posiciones fijas.' }
          ]
        },
        algoritmoPasos: [
          { paso: 1, titulo: 'Discriminar la presencia de dirección', detalle: 'Determina si la magnitud física exige orientación en el espacio. Si solo posee cuantía numérica, es un escalar.' },
          { paso: 2, titulo: 'Establecer el marco de referencia ortogonal', detalle: 'Fija el origen coordenado O(0, 0) y la orientación dextrógira de los ejes perpendiculares X e Y.' },
          { paso: 3, titulo: 'Extraer componentes cartesianas', detalle: 'Calcula el avance horizontal neto vx y el avance vertical neto vy.' },
          { paso: 4, titulo: 'Formular en notación canónica', detalle: 'Expresa el vector como par cartesiano v = (vx, vy) o combinación canónica v = vx·i + vy·j.' }
        ],
        erroresComunes: [
          { error: 'Confundir un punto con un vector', porqueOcurre: 'Ambos se representan con la notación de pares entre paréntesis (x, y).', solucionCorrecta: 'Un punto P(x, y) es una localización estática. Un vector v = (vx, vy) es una traslación orientada que puede dibujarse partiendo de cualquier punto del plano.' },
          { error: 'Asumir que vectores con igual módulo son iguales', porqueOcurre: 'Ignorar la dirección o el sentido.', solucionCorrecta: 'Dos vectores son idénticos únicamente si coinciden en módulo, dirección y sentido simultáneamente.' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'En la cabecera superior, haz clic en el botón "Plano ℝ²"', resultadoEsperado: 'El visor gráfico se orienta en la cuadrícula bidimensional cartesiana.' },
          { paso: 2, accion: 'En el panel lateral, introduce las coordenadas A(0, 0) y B(4, 3)', resultadoEsperado: 'Se traza el vector azul con flecha terminal en (4, 3).' },
          { paso: 3, accion: 'Observa la tarjeta de "Resumen de Magnitudes"', resultadoEsperado: 'Comprobarás vx = 4, vy = 3, Módulo = 5.00 u y Dirección θ = 36.87°.' }
        ],
        checkpoint: {
          pregunta: '¿Cuál de las siguientes magnitudes físicas NO puede modelarse como un vector en ℝ²?',
          opciones: [
            { texto: 'La fuerza de arrastre que un remolcador ejerce sobre un barco.', correcta: false, feedback: 'La fuerza requiere módulo, dirección y sentido: es un vector.' },
            { texto: 'La masa inercial de una caja de 45 kilogramos.', correcta: true, feedback: '¡Correcto! La masa es un escalar puro; solo tiene cantidad y unidad, carece por completo de dirección.' },
            { texto: 'La velocidad de navegación de una aeronave hacia el noreste.', correcta: false, feedback: 'La velocidad incluye rapidez e inclinación de rumbo: es un vector.' }
          ]
        },
        ejemplo: {
          enunciado: 'Modelar un vector anclado en el origen con desplazamiento horizontal de 4 unidades y vertical de 3 unidades.',
          pasos: [
            { paso: 'Coordenadas del origen A', calculo: 'A = (0, 0)' },
            { paso: 'Coordenadas del extremo B', calculo: 'B = (4, 3)' },
            { paso: 'Componentes cartesianas', calculo: 'v = (4 - 0, 3 - 0) = (4, 3)' },
            { paso: 'Módulo por Pitágoras', calculo: '||v|| = √(4² + 3²) = √25 = 5.00 u' }
          ],
          simulacion: { modo: 'puntos', datos: { puntos: [{ x: 0, y: 0 }, { x: 4, y: 3 }] } }
        }
      },

      {
        id: 'componentes',
        numero: 2,
        dimension: '2d',
        categoria: 'Geometría Cartesiana',
        titulo: 'Componentes Cartesianas: Extremo Menos Origen (B - A)',
        subtitulo: 'Cálculo analítico del vector fijado por dos puntos arbitrarios en el plano.',
        resumen: 'Aprende a construir el vector equivalente anclado al origen restando las coordenadas del punto de partida al punto de llegada.',
        concepto: {
          queEs: 'Dado un segmento dirigido que se inicia en un punto A(x₁, y₁) y concluye en un punto B(x₂, y₂), sus componentes cartesianas representan las distancias algebraicas con signo proyectadas sobre los ejes coordenados. Se obtienen mediante la regla universal de traslación: v = B - A = (x₂ - x₁, y₂ - y₁).',
          paraQueSirve: 'Permite desanclar el vector de su posición física inicial y trasladarlo al origen de coordenadas (0, 0) para realizar sumas, restas y productos con otros vectores del espacio.',
          significadoFisico: 'En navegación aérea o marítima, si un buque zarpó de las coordenadas A(12, 5) km y arribó a B(30, 29) km, el vector desplazamiento neto realizado fue v = (18, 24) km.'
        },
        variables: [
          { simbolo: 'A(x₁, y₁)', nombre: 'Punto de origen', descripcion: 'Coordenadas de la cola o punto de partida del vector.' },
          { simbolo: 'B(x₂, y₂)', nombre: 'Punto extremo', descripcion: 'Coordenadas de la punta de flecha o punto de llegada.' },
          { simbolo: 'vx = x₂ - x₁', nombre: 'Componente X', descripcion: 'Desplazamiento horizontal neto de A hacia B.' },
          { simbolo: 'vy = y₂ - y₁', nombre: 'Componente Y', descripcion: 'Desplazamiento vertical neto de A hacia B.' }
        ],
        formula: '$$\\overrightarrow{AB} = B - A = (x_2 - x_1, \\; y_2 - y_1) \\quad \\big| \\quad \\overleftarrow{BA} = -\\overrightarrow{AB} = A - B$$',
        formulaNota: 'Notación estándar: la saeta superior indica el sentido. De A hacia B se denota con flecha a la derecha $\\overrightarrow{AB}$; de B hacia A con flecha a la izquierda $\\overleftarrow{BA}$.',
        demostracion: {
          titulo: 'Deducción vectorial por suma de vectores de posición (Relación de Chasles)',
          pasos: [
            { paso: 'Vectores de posición respecto al origen O(0,0)', detalle: 'Los puntos A y B definen vectores de posición anclados en el origen: $\\overrightarrow{OA} = (x_1, y_1)$ y $\\overrightarrow{OB} = (x_2, y_2)$.' },
            { paso: 'Relación triangular de Chasles', detalle: 'Por suma de desplazamientos consecutivos en el plano: $\\overrightarrow{OA} + \\overrightarrow{AB} = \\overrightarrow{OB}$.' },
            { paso: 'Despeje algebraico y vector inverso', detalle: '$\\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} = (x_2 - x_1, \\; y_2 - y_1)$. Si el sentido se invierte de B a A: $\\overleftarrow{BA} = -\\overrightarrow{AB} = A - B$. Queda demostrado.' }
          ]
        },
        algoritmoPasos: [
          { paso: 1, titulo: 'Identificar cuál es el origen y cuál el extremo', detalle: 'Localiza claramente el punto donde inicia la flecha (A) y el punto donde finaliza (B).' },
          { paso: 2, titulo: 'Calcular el avance horizontal con signo', detalle: 'Resta x_final - x_inicial. Respeta estrictamente los signos negativos.' },
          { paso: 3, titulo: 'Calcular el avance vertical con signo', detalle: 'Resta y_final - y_inicial.' },
          { paso: 4, titulo: 'Ensamblar el vector canónico', detalle: 'Escribe el par ordenado resultante v = (vx, vy).' }
        ],
        erroresComunes: [
          { error: 'Invertir el orden de la resta (A - B)', porqueOcurre: 'Pensar que la resta es conmutativa.', solucionCorrecta: 'A - B produce el vector opuesto -v que apunta en sentido contrario. Siempre debe ser B - A.' },
          { error: 'Error de signos con coordenadas negativas', porqueOcurre: 'Olvidar el doble signo al restar un número negativo: 3 - (-5) = 8, no -2.', solucionCorrecta: 'Coloca paréntesis protectores en los cálculos: x₂ - (x₁).' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'Selecciona el modo "Puntos y Cadenas Vectoriales"', resultadoEsperado: 'Aparecen los campos para los puntos A y B.' },
          { paso: 2, accion: 'Introduce A(1, 2) y B(5, 5)', resultadoEsperado: 'El simulador dibuja el vector AB flotante entre dichos puntos.' },
          { paso: 3, accion: 'Pulsa el botón "Solución Paso a Paso"', resultadoEsperado: 'El panel lateral desglosa formalmente vx = 5 - 1 = 4 y vy = 5 - 2 = 3.' }
        ],
        checkpoint: {
          pregunta: 'Dados los puntos A(-2, 5) y B(3, 1), ¿cuáles son las componentes del vector AB?',
          opciones: [
            { texto: 'AB = (1, 6)', correcta: false, feedback: 'Sumaste las coordenadas en lugar de restarlas.' },
            { texto: 'AB = (5, -4)', correcta: true, feedback: '¡Exacto! vx = 3 - (-2) = 5, y vy = 1 - 5 = -4.' },
            { texto: 'AB = (-5, 4)', correcta: false, feedback: 'Restaste A - B en vez de B - A, invirtiendo el sentido del vector.' }
          ]
        },
        ejemplo: {
          enunciado: 'Determinar el vector AB que une el punto A(2, -1) con el punto B(-3, 4).',
          pasos: [
            { paso: 'Componente horizontal vx', calculo: 'vx = xB - xA = -3 - (2) = -5' },
            { paso: 'Componente vertical vy', calculo: 'vy = yB - yA = 4 - (-1) = 4 + 1 = 5' },
            { paso: 'Vector resultante', calculo: 'v = (-5, 5)' },
            { paso: 'Módulo del vector', calculo: '||v|| = √((-5)² + 5²) = √50 ≈ 7.07 u' }
          ],
          simulacion: { modo: 'puntos', datos: { puntos: [{ x: 2, y: -1 }, { x: -3, y: 4 }] } }
        }
      },

      {
        id: 'modulo-pitagoras',
        numero: 3,
        dimension: '2d',
        categoria: 'Trigonometría y Norma',
        titulo: 'Módulo Euclídeo y Teorema de Pitágoras en ℝ²',
        subtitulo: 'Determinación de la longitud del vector y su ángulo director trigonométrico.',
        resumen: 'Aprende a calcular la distancia real del vector y su orientación angular exacta en los 4 cuadrantes.',
        concepto: {
          queEs: 'El módulo (o norma euclídea) es la longitud geométrica del segmento orientado que une el origen con el extremo del vector. Las componentes cartesianas vx y vy forman con el vector un triángulo rectángulo perfecto donde vx y vy son los catetos y el vector es la hipotenusa. Por el Teorema de Pitágoras: ||v||² = vx² + vy².',
          paraQueSirve: 'Determina la magnitud total de magnitudes escaladas (velocidad neta en km/h, intensidad de una fuerza en Newtons, magnitud de una tensión en puentes de ingeniería civil).',
          significadoFisico: 'La norma mide la intensidad sin importar hacia dónde apunta. Es el valor que marcaría el velocímetro de un automóvil independientemente de la dirección en que circule.'
        },
        variables: [
          { simbolo: '||v||', nombre: 'Norma euclídea', descripcion: 'Longitud escalar del vector. ||v|| = √(vx² + vy²).' },
          { simbolo: 'θ', nombre: 'Ángulo director', descripcion: 'Ángulo medido en sentido antihorario desde el eje positivo X hasta el vector.' },
          { simbolo: 'atan2(vy, vx)', nombre: 'Arcotangente de 4 cuadrantes', descripcion: 'Función trigonométrica robusta que resuelve la ambigüedad de signos cuadrantales.' }
        ],
        formula: '$$\\|\\vec{v}\\| = \\sqrt{v_x^2 + v_y^2} \\quad \\Big| \\quad \\theta = \\operatorname{atan2}(v_y, v_x)$$',
        formulaNota: 'La norma siempre es un número real positivo o nulo (||v|| ≥ 0). Solo vale cero si v = (0, 0).',
        demostracion: {
          titulo: 'Deducción métrica mediante el Teorema de Pitágoras',
          pasos: [
            { paso: 'Construcción del triángulo rectángulo ortogonal', detalle: 'El segmento horizontal desde (0, 0) a (vx, 0) tiene longitud |vx|. El segmento vertical desde (vx, 0) a (vx, vy) tiene longitud |vy| y forma 90° con el eje X.' },
            { paso: 'Aplicación de la métrica euclídea', detalle: 'Por el Teorema de Pitágoras, el cuadrado de la hipotenusa es la suma de los cuadrados de los catetos: ||v||² = |vx|² + |vy|² = vx² + vy².' },
            { paso: 'Extracción de la raíz cuadrada positiva', detalle: 'Como las distancias geométricas son no negativas, ||v|| = √(vx² + vy²). Queda demostrado.' }
          ]
        },
        algoritmoPasos: [
          { paso: 1, titulo: 'Elevar cada componente al cuadrado', detalle: 'Calcula vx² y vy². Ten en cuenta que el cuadrado de cualquier número real negativo es positivo: (-4)² = +16.' },
          { paso: 2, titulo: 'Sumar los cuadrados', detalle: 'Calcula la suma S = vx² + vy².' },
          { paso: 3, titulo: 'Extraer la raíz cuadrada principal', detalle: 'Calcula ||v|| = √S.' },
          { paso: 4, titulo: 'Determinar el ángulo cuadrantal', detalle: 'Usa atan2(vy, vx) o añade 180° si vx < 0 para ubicar correctamente el vector en los cuadrantes II o III.' }
        ],
        erroresComunes: [
          { error: 'Obtener un módulo negativo', porqueOcurre: 'Calcular -4² = -16 en lugar de (-4)² = 16.', solucionCorrecta: 'La norma euclídea jamás puede ser negativa: ||v|| ≥ 0.' },
          { error: 'Fallar en el cuadrante del ángulo con atan(vy/vx)', porqueOcurre: 'Las fracciones (-1)/(-1) y 1/1 dan 1, arrojando 45° para ambos casos.', solucionCorrecta: 'Si vx < 0 y vy < 0 el vector está en el cuadrante III (225°). Usa atan2 o suma 180°.' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'Configura un vector con vx = -3 y vy = 4', resultadoEsperado: 'El vector apunta hacia el cuadrante superior izquierdo (II cuadrante).' },
          { paso: 2, accion: 'Comprueba el valor del módulo en el HUD', resultadoEsperado: 'El módulo marca exactamente ||v|| = 5.00 u (√((-3)² + 4²) = √25 = 5).' },
          { paso: 3, accion: 'Verifica la dirección angular', resultadoEsperado: 'El ángulo marca θ = 126.87° (180° - 53.13°).' }
        ],
        checkpoint: {
          pregunta: 'Si un vector tiene componentes vx = -6 y vy = -8, ¿cuál es su módulo euclídeo ||v||?',
          opciones: [
            { texto: '||v|| = -10', correcta: false, feedback: 'El módulo es una distancia euclídea y jamás puede ser un valor negativo.' },
            { texto: '||v|| = 10', correcta: true, feedback: '¡Excelente! ||v|| = √((-6)² + (-8)²) = √(36 + 64) = √100 = 10.' },
            { texto: '||v|| = 14', correcta: false, feedback: 'Sumaste directamente los valores absolutos |6| + |8|, violando el Teorema de Pitágoras.' }
          ]
        },
        ejemplo: {
          enunciado: 'Calcular el módulo y dirección del vector v = (-6, 8).',
          pasos: [
            { paso: 'Cuadrado de componentes', calculo: '(-6)² = 36 | 8² = 64' },
            { paso: 'Suma de cuadrados', calculo: '36 + 64 = 100' },
            { paso: 'Módulo euclídeo', calculo: '||v|| = √100 = 10.00 u' },
            { paso: 'Ángulo en II Cuadrante', calculo: 'θ = 180° - atan(8/6) = 180° - 53.13° = 126.87°' }
          ],
          simulacion: { modo: 'puntos', datos: { puntos: [{ x: 0, y: 0 }, { x: -6, y: 8 }] } }
        }
      },

      {
        id: 'unitario',
        numero: 4,
        dimension: '2d',
        categoria: 'Normalización de Vectores',
        titulo: 'Vector Unitario (û) y Normalización en ℝ²',
        subtitulo: 'Aislamiento de la dirección y sentido de un vector con longitud estándar igual a 1.',
        resumen: 'Comprende el proceso de dividir un vector entre su propia norma para obtener un vector unitario de longitud 1.',
        concepto: {
          queEs: 'Un vector unitario (o versor) es aquel cuya norma euclídea es exactamente igual a la unidad (||û|| = 1). Normalizar un vector no nulo v consiste en multiplicar dicho vector por el escalar inverso de su módulo: û = v / ||v||.',
          paraQueSirve: 'Permite desacoplar la dirección pura de la intensidad. En videojuegos 3D, animación por ordenador y física computacional, los vectores unitarios definen direcciones de cámaras, normales de superficies reflectantes y trayectorias de partículas.',
          significadoFisico: 'En el lanzamiento de un proyectil con velocidad de 80 m/s en dirección 30°, el vector unitario û = (cos 30°, sen 30°) marca la dirección del vuelo, mientras que el escalar 80 m/s indica la rapidez.'
        },
        variables: [
          { simbolo: 'û = v / ||v||', nombre: 'Vector unitario director', descripcion: 'Vector colineal con v que posee exactamente longitud 1.' },
          { simbolo: '||û|| = 1', nombre: 'Condición de normalización', descripcion: 'La norma del vector unitario es invariablemente 1.' },
          { simbolo: '(cos θ, sen θ)', nombre: 'Forma trigonométrica', descripcion: 'Componentes del versor expresadas mediante las funciones coseno y seno del ángulo director.' }
        ],
        formula: '$$\\hat{u} = \\frac{\\vec{v}}{\\|\\vec{v}\\|} = \\left(\\frac{v_x}{\\|\\vec{v}\\|}, \\; \\frac{v_y}{\\|\\vec{v}\\|}\\right) = (\\cos\\theta, \\; \\sin\\theta) \\quad (\\|\\hat{u}\\| = 1)$$',
        formulaNota: 'El vector nulo (0, 0) no admite normalización pues la división por cero no está definida.',
        demostracion: {
          titulo: 'Demostración de que la norma de û = v / ||v|| es invariablemente 1',
          pasos: [
            { paso: 'Cálculo analítico de componentes de û', detalle: 'û = (vx / ||v||, vy / ||v||).' },
            { paso: 'Aplicación de la fórmula de la norma a û', detalle: '||û|| = √[ (vx / ||v||)² + (vy / ||v||)² ] = √[ (vx² + vy²) / ||v||² ].' },
            { paso: 'Sustitución de ||v||² por definición', detalle: 'Como vx² + vy² = ||v||², tenemos √[ ||v||² / ||v||² ] = √1 = 1. Queda demostrado.' }
          ]
        },
        miniLab: {
          tipo: 'unitario-trig',
          titulo: 'Mini-Laboratorio: Círculo Unitario y Normalización Dinámica',
          descripcion: 'Ajusta el módulo y observa cómo el vector unitario û se mantiene siempre estrictamente anclado al perímetro del círculo de radio 1.'
        },
        algoritmoPasos: [
          { paso: 1, titulo: 'Calcular el módulo del vector original', detalle: 'Obtén ||v|| = √(vx² + vy²). Si ||v|| = 0, el vector carece de dirección definida.' },
          { paso: 2, titulo: 'Dividir la componente X entre el módulo', detalle: 'Calcula u_x = vx / ||v||.' },
          { paso: 3, titulo: 'Dividir la componente Y entre el módulo', detalle: 'Calcula u_y = vy / ||v||.' },
          { paso: 4, titulo: 'Verificar la condición unitaria', detalle: 'Comprueba que u_x² + u_y² = 1.000.' }
        ],
        erroresComunes: [
          { error: 'Intentar normalizar el vector nulo (0, 0)', porqueOcurre: 'Olvidar que no se puede dividir entre cero.', solucionCorrecta: 'El vector nulo no tiene dirección ni sentido, por lo que no existe vector unitario para él.' },
          { error: 'Redondear en exceso las componentes', porqueOcurre: 'Truncar a pocos decimales hace que la norma dé 0.98 o 1.02.', solucionCorrecta: 'Usa al menos 3 o 4 cifras decimales para preservar la propiedad métrica ||û|| ≈ 1.' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'Crea un vector con componentes vx = 6 y vy = 8', resultadoEsperado: 'El simulador dibuja el vector de longitud 10.' },
          { paso: 2, accion: 'Examina la fila "Vector Unitario û" en el panel resumen', resultadoEsperado: 'Verás û = (0.600, 0.800).' },
          { paso: 3, accion: 'Comprueba su módulo analítico', resultadoEsperado: '0.6² + 0.8² = 0.36 + 0.64 = 1.000.' }
        ],
        checkpoint: {
          pregunta: '¿Cuál es el vector unitario director correspondiente al vector v = (0, -5)?',
          opciones: [
            { texto: 'û = (0, 1)', correcta: false, feedback: 'Este vector apunta hacia arriba (+Y), invirtiendo el sentido del vector original.' },
            { texto: 'û = (0, -1)', correcta: true, feedback: '¡Correcto! El módulo es 5; al dividir v entre 5 obtenemos û = (0/5, -5/5) = (0, -1).' },
            { texto: 'û = (-5, 0)', correcta: false, feedback: 'Cambiaste la dirección vertical por la horizontal.' }
          ]
        },
        ejemplo: {
          enunciado: 'Normalizar el vector v = (3, 4).',
          pasos: [
            { paso: 'Cálculo de la norma', calculo: '||v|| = √(3² + 4²) = √25 = 5' },
            { paso: 'Componente horizontal unitaria', calculo: 'u_x = 3 / 5 = 0.600' },
            { paso: 'Componente vertical unitaria', calculo: 'u_y = 4 / 5 = 0.800' },
            { paso: 'Comprobación métrica', calculo: '||û|| = √(0.6² + 0.8²) = √(0.36 + 0.64) = 1.000' }
          ],
          simulacion: { modo: 'puntos', datos: { puntos: [{ x: 0, y: 0 }, { x: 3, y: 4 }] } }
        }
      },

      {
        id: 'algebra-paralelogramo',
        numero: 5,
        dimension: '2d',
        categoria: 'Álgebra Vectorial',
        titulo: 'Suma Vectorial: Regla del Paralelogramo y Punta-Cola',
        subtitulo: 'Construcciones geométricas y adición analítica de vectores concurrentes.',
        resumen: 'Aprende a sumar vectores de forma analítica (componente a componente) y visual (paralelogramo vs punta-cola).',
        concepto: {
          queEs: 'La suma analítica de dos vectores u y v equivale a sumar independientemente sus componentes homólogas: u + v = (ux + vx, uy + vy). Geométricamente, si los vectores parten del mismo origen, sus lados paralelos forman un paralelogramo cuya diagonal principal es el vector suma. Si se colocan uno a continuación del otro (punta-cola), el vector suma une el origen del primero con el extremo del segundo.',
          paraQueSirve: 'Es el principio de superposición universal de la física: la fuerza neta sobre un cuerpo es la suma vectorial de todas las fuerzas actuantes (Primera y Segunda Ley de Newton).',
          significadoFisico: 'Si un avión vuela a 500 km/h al Norte y sopla un viento cruzado de 100 km/h al Este, la trayectoria real de la aeronave es la suma vectorial diagonal resultante.'
        },
        variables: [
          { simbolo: 'u = (ux, uy)', nombre: 'Primer vector concurrente', descripcion: 'Vector inicial anclado en el origen.' },
          { simbolo: 'v = (vx, vy)', nombre: 'Segundo vector concurrente', descripcion: 'Segundo vector anclado en el origen común.' },
          { simbolo: 'u + v', nombre: 'Vector suma resultante', descripcion: 'Diagonal principal del paralelogramo o cierre del polígono punta-cola.' },
          { simbolo: 'u - v', nombre: 'Vector diferencia', descripcion: 'Vector que conecta el extremo de v con el extremo de u (diagonal secundaria).' },
          { simbolo: 'k · u', nombre: 'Multiplicación por escalar', descripcion: 'Escalado que estira (|k| > 1), comprime (|k| < 1) o invierte el sentido (k < 0).' }
        ],
        formula: '$$\\vec{u} + \\vec{v} = (u_x + v_x, \\; u_y + v_y) \\quad \\Big| \\quad \\vec{u} - \\vec{v} = (u_x - v_x, \\; u_y - v_y)$$',
        formulaNota: 'La resta u - v equivale algebraicamente a sumar el opuesto: u + (-v).',
        demostracion: {
          titulo: 'Equivalencia entre la Regla del Paralelogramo y el Método Punta-Cola',
          pasos: [
            { paso: 'Construcción concurrente', detalle: 'Vectores u = (ux, uy) y v = (vx, vy) con origen en O(0,0).' },
            { paso: 'Traslación paralela de v', detalle: 'Como los vectores son libres, trasladar v al extremo de u sitúa el origen de v en (ux, uy). Su nuevo extremo estará en (ux + vx, uy + vy).' },
            { paso: 'Coincidencia geométrica', detalle: 'El punto alcanzado (ux + vx, uy + vy) es idéntico al vértice opuesto del paralelogramo formado por los lados u y v. Queda demostrada la equivalencia.' }
          ]
        },
        miniLab: {
          tipo: 'suma-concurrente',
          titulo: 'Mini-Laboratorio: Paralelogramo vs. Punta-Cola en Vivo',
          descripcion: 'Alterna entre ambos métodos para comprobar visualmente cómo ambos conducen exactamente al mismo vector resultante.'
        },
        algoritmoPasos: [
          { paso: 1, titulo: 'Listar las componentes cartesianas de ambos vectores', detalle: 'Anota u = (ux, uy) y v = (vx, vy).' },
          { paso: 2, titulo: 'Sumar algebraicamente las componentes X', detalle: 'Calcula Sx = ux + vx prestando máxima atención a los signos.' },
          { paso: 3, titulo: 'Sumar algebraicamente las componentes Y', detalle: 'Calcula Sy = uy + vy.' },
          { paso: 4, titulo: 'Trazar el paralelogramo geométrico de comprobación', detalle: 'Dibuja la paralela a u por el extremo de v y la paralela a v por el extremo de u para verificar que la diagonal coincide con (Sx, Sy).' }
        ],
        erroresComunes: [
          { error: 'Sumar los módulos directamente (||u + v|| = ||u|| + ||v||)', porqueOcurre: 'Tratar a los vectores como escalares aritméticos.', solucionCorrecta: 'Por la desigualdad triangular: ||u + v|| ≤ ||u|| + ||v||. Solo son iguales si ambos vectores son paralelos y con el mismo sentido.' },
          { error: 'Invertir el sentido del vector resta u - v', porqueOcurre: 'Apuntar la flecha hacia v en vez de hacia u.', solucionCorrecta: 'El vector u - v siempre apunta hacia el minuendo (hacia u).' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'Haz clic en "Operaciones con Vectores u y v" en el panel de modos', resultadoEsperado: 'Aparecen los campos independientes para u, v y el escalar k.' },
          { paso: 2, accion: 'Ingresa u = (4, 2) y v = (-2, 3)', resultadoEsperado: 'El motor dibuja ambos vectores en cian y ámbar con el paralelogramo punteado.' },
          { paso: 3, accion: 'Observa la flecha verde esmeralda resultante', resultadoEsperado: 'Muestra u + v = (2, 5) con módulo 5.39 u.' }
        ],
        checkpoint: {
          pregunta: 'Si u = (3, -2) y v = (-5, 6), ¿cuál es el vector resultante de la suma u + v?',
          opciones: [
            { texto: 'u + v = (-2, 4)', correcta: true, feedback: '¡Correcto! Sx = 3 + (-5) = -2, Sy = -2 + 6 = 4.' },
            { texto: 'u + v = (8, -8)', correcta: false, feedback: 'Restaste los vectores en lugar de sumarlos.' },
            { texto: 'u + v = (-2, -4)', correcta: false, feedback: 'Error de signos en la componente Y: -2 + 6 = +4, no -4.' }
          ]
        },
        ejemplo: {
          enunciado: 'Sumar u = (4, 2) y v = (-2, 3) calculando la diagonal resultante.',
          pasos: [
            { paso: 'Suma horizontal Sx', calculo: 'Sx = ux + vx = 4 + (-2) = 2' },
            { paso: 'Suma vertical Sy', calculo: 'Sy = uy + vy = 2 + 3 = 5' },
            { paso: 'Módulo del vector resultante', calculo: '||u + v|| = √(2² + 5²) = √29 ≈ 5.39 u' }
          ],
          simulacion: { modo: 'operaciones', datos: { ux: 4, uy: 2, vx: -2, vy: 3, k: 1 } }
        }
      },

      {
        id: 'producto-escalar',
        numero: 6,
        dimension: '2d',
        categoria: 'Álgebra y Proyecciones',
        titulo: 'Producto Escalar (Dot Product) y Criterio de Ortogonalidad',
        subtitulo: 'Operación bilineal que produce un escalar y determina perpendicularidad angular.',
        resumen: 'Aprende a calcular el producto punto en función de componentes o del ángulo, y cómo detectar si dos vectores son perpendiculares.',
        concepto: {
          queEs: 'El producto escalar (o producto punto) de dos vectores u y v es una operación algebraica cuyo resultado NO es un vector, sino un número real (escalar). Se calcula sumando los productos de sus componentes homólogas: u · v = ux·vx + uy·vy, o geométricamente multiplicando sus módulos por el coseno del ángulo comprendido: u · v = ||u||·||v||·cos θ.',
          paraQueSirve: 'Es el criterio matemático más potente para verificar perpendicularidad instantánea (dos vectores no nulos son perpendiculares si y solo si su producto escalar es cero: u · v = 0). En física calcula el trabajo mecánico W = F · d.',
          significadoFisico: 'Si empujas un vagón hacia adelante y la fuerza aplicada es perpendicular a las vías (90°), cos 90° = 0 y el trabajo mecánico es nulo: no produces desplazamiento alguno en el vagón.'
        },
        variables: [
          { simbolo: 'u · v', nombre: 'Producto escalar', descripcion: 'Número real resultante de la operación. Puede ser positivo, cero o negativo.' },
          { simbolo: 'cos θ', nombre: 'Coseno del ángulo', descripcion: 'Factor de alineación entre los dos vectores.' },
          { simbolo: 'θ = 90° ⟺ u · v = 0', nombre: 'Condición de perpendicularidad', descripcion: 'Dos vectores no nulos son ortogonales si su producto escalar es nulo.' }
        ],
        formula: '$$\\vec{u} \\cdot \\vec{v} = u_x v_x + u_y v_y = \\|\\vec{u}\\| \\|\\vec{v}\\| \\cos(\\theta)$$',
        formulaNota: 'El producto escalar es estrictamente conmutativo: u · v = v · u.',
        demostracion: {
          titulo: 'Deducción del Producto Escalar mediante el Teorema del Coseno',
          pasos: [
            { paso: 'Triángulo formado por u, v y u - v', detalle: 'Considera los vectores u y v anclados en el origen con ángulo θ entre ellos. El tercer lado que une sus puntas es el vector diferencia u - v.' },
            { paso: 'Aplicación del Teorema del Coseno', detalle: '||u - v||² = ||u||² + ||v||² - 2||u||||v||cos θ.' },
            { paso: 'Desarrollo en componentes cartesianas', detalle: '||u - v||² = (ux - vx)² + (uy - vy)² = (ux² + uy²) + (vx² + vy²) - 2(ux vx + uy vy) = ||u||² + ||v||² - 2(ux vx + uy vy).' },
            { paso: 'Igualación de expresiones', detalle: '-2||u||||v||cos θ = -2(ux vx + uy vy) ⟹ u · v = ux vx + uy vy = ||u||||v||cos θ. Queda demostrado.' }
          ]
        },
        miniLab: {
          tipo: 'producto-escalar',
          titulo: 'Mini-Laboratorio: Producto Escalar y Ángulo θ en Tiempo Real',
          descripcion: 'Desliza el ángulo de 0° a 180° y observa cómo u · v pasa de positivo a cero en 90° y a negativo en ángulos obtusos.'
        },
        algoritmoPasos: [
          { paso: 1, titulo: 'Multiplicar componentes horizontales', detalle: 'Calcula Px = ux · vx respetando signos.' },
          { paso: 2, titulo: 'Multiplicar componentes verticales', detalle: 'Calcula Py = uy · vy.' },
          { paso: 3, titulo: 'Sumar ambos productos parciales', detalle: 'Calcula el escalar final: u · v = Px + Py.' },
          { paso: 4, titulo: 'Evaluar el signo o condición de ortogonalidad', detalle: 'Si u · v = 0 son perpendiculares. Si u · v > 0 forman ángulo agudo (<90°). Si u · v < 0 forman ángulo obtuso (>90°).' }
        ],
        erroresComunes: [
          { error: 'Escribir el producto escalar como un vector', porqueOcurre: 'Confundir el producto punto con una operación interna.', solucionCorrecta: 'El producto escalar produce UN NÚMERO REAL, jamás un par ordenado: u · v = 14, no (14, 0).' },
          { error: 'Olvidar los signos al multiplicar componentes negativas', porqueOcurre: '(-3) · (-2) = +6, no -6.', solucionCorrecta: 'Multiplica primero los signos y luego los valores absolutos.' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'En el modo de Operaciones, introduce u = (3, 1) y v = (-1, 3)', resultadoEsperado: 'Se dibujan los dos vectores formando un ángulo recto.' },
          { paso: 2, accion: 'Revisa la métrica "Producto Escalar u · v"', resultadoEsperado: 'Verás u · v = (3)(-1) + (1)(3) = -3 + 3 = 0.00.' },
          { paso: 3, accion: 'Observa la lectura del ángulo θ', resultadoEsperado: 'Marca θ = 90.00° (π/2 rad) con badge de "Vectores Perpendiculares".' }
        ],
        checkpoint: {
          pregunta: '¿Para qué valor de k los vectores u = (2, k) y v = (6, -4) son estrictamente perpendiculares?',
          opciones: [
            { texto: 'k = 3', correcta: true, feedback: '¡Excelente! u · v = (2)(6) + (k)(-4) = 12 - 4k = 0 ⟹ 4k = 12 ⟹ k = 3.' },
            { texto: 'k = -3', correcta: false, feedback: 'Si k = -3, u · v = 12 - 4(-3) = 12 + 12 = 24 ≠ 0.' },
            { texto: 'k = 0', correcta: false, feedback: 'Si k = 0, u · v = 12 ≠ 0.' }
          ]
        },
        ejemplo: {
          enunciado: 'Calcular el producto escalar y el ángulo entre u = (3, 4) y v = (4, 3).',
          pasos: [
            { paso: 'Producto en componentes', calculo: 'u · v = (3)(4) + (4)(3) = 12 + 12 = 24' },
            { paso: 'Módulos de u y v', calculo: '||u|| = √(3² + 4²) = 5 | ||v|| = √(4² + 3²) = 5' },
            { paso: 'Coseno del ángulo', calculo: 'cos(θ) = 24 / (5 · 5) = 24 / 25 = 0.960' },
            { paso: 'Ángulo entre vectores', calculo: 'θ = arccos(0.960) ≈ 16.26°' }
          ],
          simulacion: { modo: 'operaciones', datos: { ux: 3, uy: 4, vx: 4, vy: 3, k: 1 } }
        }
      },

      {
        id: 'proyeccion-ortogonal',
        numero: 7,
        dimension: '2d',
        categoria: 'Geometría y Descomposición',
        titulo: 'Proyección Ortogonal y Descomposición de Fuerzas en ℝ²',
        subtitulo: 'Proyección de la sombra de un vector sobre otro y descomposición en componentes ortogonales.',
        resumen: 'Aprende a descomponer cualquier vector en una componente paralela a una dirección dada y una componente ortogonal.',
        concepto: {
          queEs: 'La proyección ortogonal de un vector u sobre un vector no nulo v es el vector sombra que u proyecta perpendicularmente sobre la recta directriz de v. Se calcula mediante la fórmula vectorial proy_v(u) = [(u · v) / ||v||²] · v. La componente perpendicular ortogonal complementaria viene dada por u⊥ = u - proy_v(u).',
          paraQueSirve: 'Es el pilar del cálculo de trabajo de fuerzas sobre trayectorias inclinadas (planos inclinados en física elemental), compresión de señales, algoritmos de renderizado 3D y el proceso de ortogonalización de Gram-Schmidt.',
          significadoFisico: 'Al deslizar un trineo por una rampa inclinada, la gravedad tira verticalmente hacia abajo. La proyección sobre la rampa es la fuerza que lo acelera colina abajo, mientras que la componente perpendicular es la que lo aprieta contra la nieve.'
        },
        variables: [
          { simbolo: 'proy_v(u)', nombre: 'Vector proyección de u sobre v', descripcion: 'Vector paralelo a v que representa la sombra ortogonal de u.' },
          { simbolo: 'comp_v(u)', nombre: 'Componente escalar de la proyección', descripcion: 'Longitud con signo de la proyección: comp_v(u) = (u · v) / ||v||.' },
          { simbolo: 'u⊥ = u - proy_v(u)', nombre: 'Componente ortogonal', descripcion: 'Vector perpendicular a v tal que proy_v(u) + u⊥ = u.' }
        ],
        formula: '$$\\operatorname{proy}_{\\vec{v}}(\\vec{u}) = \\left[ \\frac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{v}\\|^2} \\right] \\vec{v} \\quad \\Big| \\quad \\vec{u} = \\operatorname{proy}_{\\vec{v}}(\\vec{u}) + \\vec{u}_\\perp$$',
        formulaNota: 'El término (u · v) / ||v||² es un número escalar puro que multiplica al vector v.',
        demostracion: {
          titulo: 'Deducción geométrica de la fórmula de proyección ortogonal',
          pasos: [
            { paso: 'Condición de paralelismo con v', detalle: 'La proyección p debe ser colineal con v: p = c · v para algún escalar real c.' },
            { paso: 'Condición de ortogonalidad del residuo', detalle: 'El vector residuo u - p debe ser estrictamente perpendicular a v: (u - c · v) · v = 0.' },
            { paso: 'Desarrollo del producto escalar', detalle: 'u · v - c (v · v) = 0 ⟹ c · ||v||² = u · v ⟹ c = (u · v) / ||v||².' },
            { paso: 'Sustitución en p', detalle: 'p = proy_v(u) = [ (u · v) / ||v||² ] · v. Queda demostrado.' }
          ]
        },
        miniLab: {
          tipo: 'proyeccion-ortogonal',
          titulo: 'Mini-Laboratorio: Descomposición de la Sombra Vectorial',
          descripcion: 'Modifica la inclinación de u y observa cómo la proyección proy_v(u) en ámbar y la componente ortogonal u⊥ en violeta se recalculan dinámicamente.'
        },
        algoritmoPasos: [
          { paso: 1, titulo: 'Calcular el producto escalar u · v', detalle: 'Obtén el número real u · v = ux·vx + uy·vy.' },
          { paso: 2, titulo: 'Calcular el cuadrado de la norma de v', detalle: 'Calcula ||v||² = vx² + vy² (no requiere extraer raíz).' },
          { paso: 3, titulo: 'Calcular el factor de escala escalar c', detalle: 'Divide c = (u · v) / ||v||².' },
          { paso: 4, titulo: 'Multiplicar el escalar c por las componentes de v', detalle: 'Calcula proy_v(u) = (c · vx, c · vy).' },
          { paso: 5, titulo: 'Obtener la componente ortogonal complementaria', detalle: 'Resta u⊥ = (ux - px, uy - py) y verifica que u⊥ · v = 0.' }
        ],
        erroresComunes: [
          { error: 'Dividir entre la norma ||v|| en vez de la norma al cuadrado ||v||²', porqueOcurre: 'Confundir la componente escalar con la proyección vectorial.', solucionCorrecta: 'La proyección vectorial requiere dividir entre ||v||² para que el resultado tenga unidades de vector v.' },
          { error: 'Proyectar al revés (v sobre u en vez de u sobre v)', porqueOcurre: 'Invertir el denominador.', solucionCorrecta: 'El vector base sobre el cual se proyecta siempre va en el denominador: ||v||².' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'En el modo de Operaciones, introduce u = (2, 4) y v = (5, 0)', resultadoEsperado: 'El vector v descansa sobre el eje horizontal X.' },
          { paso: 2, accion: 'Calcula proy_v(u)', resultadoEsperado: 'Como v está en el eje X, la proyección es simplemente la componente X de u: (2, 0).' },
          { paso: 3, accion: 'Comprueba la componente ortogonal', resultadoEsperado: 'u⊥ = (2, 4) - (2, 0) = (0, 4), perpendicular a v.' }
        ],
        checkpoint: {
          pregunta: 'Si u = (3, 5) y v = (2, 0), ¿cuál es el vector proyección proy_v(u)?',
          opciones: [
            { texto: 'proy_v(u) = (3, 0)', correcta: true, feedback: '¡Correcto! u · v = (3)(2) + (5)(0) = 6. ||v||² = 2² = 4. Factor c = 6/4 = 1.5. proy = 1.5 · (2, 0) = (3, 0).' },
            { texto: 'proy_v(u) = (0, 5)', correcta: false, feedback: 'Esa es la componente ortogonal perpendicular, no la proyección sobre v.' },
            { texto: 'proy_v(u) = (6, 0)', correcta: false, feedback: 'Olvidaste dividir entre el cuadrado de la norma de v.' }
          ]
        },
        ejemplo: {
          enunciado: 'Calcular la proyección ortogonal del vector u = (4, 3) sobre v = (6, 2).',
          pasos: [
            { paso: 'Producto escalar u · v', calculo: 'u · v = (4)(6) + (3)(2) = 24 + 6 = 30' },
            { paso: 'Norma al cuadrado ||v||²', calculo: '||v||² = 6² + 2² = 36 + 4 = 40' },
            { paso: 'Escalar multiplicador c', calculo: 'c = 30 / 40 = 0.75' },
            { paso: 'Vector proyección proy_v(u)', calculo: 'proy_v(u) = 0.75 · (6, 2) = (4.50, 1.50)' }
          ],
          simulacion: { modo: 'operaciones', datos: { ux: 4, uy: 3, vx: 6, vy: 2, k: 1 } }
        }
      },

      {
        id: 'dependencia-lineal',
        numero: 8,
        dimension: '2d',
        categoria: 'Álgebra Lineal Avanzada',
        titulo: 'Dependencia Lineal y Determinante 2×2 en ℝ²',
        subtitulo: 'Colinealidad, independencia lineal y condición para que dos vectores formen base.',
        resumen: 'Aprende a comprobar si dos vectores son colineales o si pueden generar todo el plano mediante el determinante 2x2.',
        concepto: {
          queEs: 'Dos vectores u y v en ℝ² son linealmente dependientes si uno es múltiplo escalar del otro (v = k · u), lo que significa que descansan sobre la misma recta directriz (colineales). Son linealmente independientes si apuntan en direcciones distintas y no están alineados. Algebraicamente, dos vectores en ℝ² son independientes si y solo si su determinante matricial 2×2 es distinto de cero: det(u, v) = ux·vy - uy·vx ≠ 0.',
          paraQueSirve: 'Cualquier par de vectores linealmente independientes en ℝ² forma una BASE: cualquier otro vector del plano puede escribirse de forma única como combinación lineal de ellos: w = c₁·u + c₂·v.',
          significadoFisico: 'En cinemática o navegación, necesitas al menos dos vectores independientes para poder moverte en cualquier dirección de la superficie; si tus propulsores están alineados (dependientes), solo podrás moverte hacia adelante y atrás sobre una única línea recta.'
        },
        variables: [
          { simbolo: 'det(u, v)', nombre: 'Determinante 2×2', descripcion: 'Valor escalar ux·vy - uy·vx que representa el área orientada del paralelogramo.' },
          { simbolo: 'det = 0', nombre: 'Condición de dependencia', descripcion: 'Los vectores son paralelos / colineales; no pueden formar base.' },
          { simbolo: 'det ≠ 0', nombre: 'Condición de independencia', descripcion: 'Los vectores forman una base generadora completa de todo ℝ².' }
        ],
        formula: '$$\\det\\begin{pmatrix} u_x & v_x \\\\ u_y & v_y \\end{pmatrix} = u_x v_y - u_y v_x \\quad \\Big( \\text{Independientes} \\iff \\det \\neq 0 \\Big)$$',
        formulaNota: 'El valor absoluto |det(u, v)| es exactamente igual al área del paralelogramo formado por u y v en ℝ².',
        demostracion: {
          titulo: 'Deducción de la condición de dependencia lineal v = k · u',
          pasos: [
            { paso: 'Planteamiento de la combinación lineal nula', detalle: 'c₁ · u + c₂ · v = (0, 0) con c₁, c₂ escalares.' },
            { paso: 'Sistema de ecuaciones homogéneo', detalle: 'c₁ ux + c₂ vx = 0  y  c₁ uy + c₂ vy = 0.' },
            { paso: 'Existencia de soluciones no triviales', detalle: 'Por la regla de Cramer, el sistema tiene soluciones distintas de (0, 0) si y solo si el determinante de la matriz de coeficientes se anula: ux vy - uy vx = 0.' },
            { paso: 'Conclusión geométrica', detalle: 'Si det = 0, existe k tal que v = k · u (colineales). Si det ≠ 0, son linealmente independientes. Queda demostrado.' }
          ]
        },
        miniLab: {
          tipo: 'dependencia-lineal',
          titulo: 'Mini-Laboratorio: Determinante 2×2 y Colinealidad en Vivo',
          descripcion: 'Fuerza la colinealidad o mueve la componente vertical para ver cómo el determinante y el área colapsan exactamente a 0.'
        },
        algoritmoPasos: [
          { paso: 1, titulo: 'Plantear la matriz 2×2 con los vectores como filas o columnas', detalle: 'Fila 1: (ux, uy). Fila 2: (vx, vy).' },
          { paso: 2, titulo: 'Multiplicar la diagonal principal', detalle: 'Calcula D1 = ux · vy.' },
          { paso: 3, titulo: 'Multiplicar la diagonal secundaria', detalle: 'Calcula D2 = uy · vx.' },
          { paso: 4, titulo: 'Restar D1 - D2', detalle: 'det = D1 - D2. Si da 0 son linealmente dependientes (colineales); si es distinto de 0 son independientes y forman base.' }
        ],
        erroresComunes: [
          { error: 'Invertir el signo de la diagonal secundaria', porqueOcurre: 'Sumar en lugar de restar: ux vy + uy vx.', solucionCorrecta: 'El determinante 2×2 siempre resta la diagonal secundaria: ux·vy - uy·vx.' },
          { error: 'Asumir que vectores no nulos son siempre base', porqueOcurre: 'No comprobar si son proporcionales.', solucionCorrecta: 'Los vectores (2, 4) y (4, 8) no son nulos pero son múltiplos (k = 2); no forman base de ℝ².' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'Introduce u = (2, 3) y v = (4, 6)', resultadoEsperado: 'Ambos vectores se solapan sobre la misma línea recta con factor k = 2.' },
          { paso: 2, accion: 'Calcula su determinante', resultadoEsperado: 'det = (2)(6) - (3)(4) = 12 - 12 = 0.00 (Linealmente Dependientes).' },
          { paso: 3, accion: 'Cambia v a (4, 5)', resultadoEsperado: 'det = (2)(5) - (3)(4) = 10 - 12 = -2.00 ≠ 0 (Independientes, forman base).' }
        ],
        checkpoint: {
          pregunta: '¿Cuál de las siguientes parejas de vectores forma una base válida de ℝ²?',
          opciones: [
            { texto: 'u = (3, -6) y v = (-1, 2)', correcta: false, feedback: 'det = (3)(2) - (-6)(-1) = 6 - 6 = 0. Son colineales (v = -1/3 u), no forman base.' },
            { texto: 'u = (1, 2) y v = (3, 4)', correcta: true, feedback: '¡Correcto! det = (1)(4) - (2)(3) = 4 - 6 = -2 ≠ 0. Son independientes y forman base.' },
            { texto: 'u = (0, 0) y v = (5, 5)', correcta: false, feedback: 'Cualquier conjunto que incluya al vector nulo es automáticamente dependiente.' }
          ]
        },
        ejemplo: {
          enunciado: 'Determinar si los vectores u = (3, 2) y v = (1, 4) son linealmente independientes y calcular el área del paralelogramo que forman.',
          pasos: [
            { paso: 'Cálculo del determinante 2×2', calculo: 'det = (3)(4) - (2)(1) = 12 - 2 = 10' },
            { paso: 'Diagnóstico de independencia', calculo: 'Como det = 10 ≠ 0, son linealmente independientes y forman base en ℝ²' },
            { paso: 'Área del paralelogramo', calculo: 'Área = |det| = 10.00 unidades cuadradas' }
          ],
          simulacion: { modo: 'operaciones', datos: { ux: 3, uy: 2, vx: 1, vy: 4, k: 1 } }
        }
      },

      {
        id: 'equipolencia',
        numero: 9,
        dimension: '2d',
        categoria: 'Relaciones de Equivalencia',
        titulo: 'Equipolencia de Vectores y Vectores Libres en ℝ²',
        subtitulo: 'Condición matemática de igualdad entre vectores con diferente origen espacial.',
        resumen: 'Aprende cuándo dos flechas dibujadas en distintas zonas del plano representan exactamente el mismo vector matemático.',
        concepto: {
          queEs: 'Dos vectores fijos AB y CD son equipolentes si tienen idéntico módulo, idéntica dirección e idéntico sentido, independientemente de que sus orígenes A y C se encuentren en partes distintas del plano. La equipolencia es una relación de equivalencia (reflexiva, simétrica y transitiva) que agrupa infinitos segmentos dirigidos en una única clase llamada vector libre.',
          paraQueSirve: 'Permite trasladar fuerzas y velocidades a conveniencia en análisis estructural y cinemática sin alterar las propiedades del problema.',
          significadoFisico: 'Un viento uniforme de 20 nudos hacia el Este en el norte de una ciudad tiene los mismos efectos dinámicos sobre un avión que en el sur de la ciudad; ambos son vectores equipolentes.'
        },
        variables: [
          { simbolo: 'AB ~ CD', nombre: 'Relación de equipolencia', descripcion: 'Indica que los vectores AB y CD son representantes del mismo vector libre.' },
          { simbolo: '||AB|| = ||CD||', nombre: 'Primer requisito', descripcion: 'Módulo idéntico entre ambos segmentos dirigidos.' },
          { simbolo: 'û_AB = û_CD', nombre: 'Segundo y tercer requisito', descripcion: 'Dirección y sentido estrictamente idénticos mediante vector unitario director.' }
        ],
        formula: '$$\\vec{AB} \\sim \\vec{CD} \\iff B - A = D - C \\iff \\begin{cases} x_B - x_A = x_D - x_C \\\\ y_B - y_A = y_D - y_C \\end{cases}$$',
        formulaNota: 'Geométricamente, los cuatro puntos A, B, D, C forman los vértices consecutivos de un paralelogramo.',
        demostracion: {
          titulo: 'Demostración mediante el paralelogramo de equipolencia',
          pasos: [
            { paso: 'Definición de componentes iguales', detalle: 'B - A = D - C.' },
            { paso: 'Reordenamiento algebraico', detalle: 'Sumando A + C a ambos lados: B + C = D + A ⟹ D - B = C - A.' },
            { paso: 'Interpretación geométrica', detalle: 'El segmento AC es paralelo y de igual longitud que el segmento BD. Por lo tanto, la figura ABDC es un paralelogramo. Queda demostrado.' }
          ]
        },
        algoritmoPasos: [
          { paso: 1, titulo: 'Obtener componentes de AB', detalle: 'Calcula v₁ = B - A = (xB - xA, yB - yA).' },
          { paso: 2, titulo: 'Obtener componentes de CD', detalle: 'Calcula v₂ = D - C = (xD - xC, yD - yC).' },
          { paso: 3, titulo: 'Comparar componentes homólogas', detalle: 'Comprueba si v₁x == v₂x y v₁y == v₂y dentro de una tolerancia numérica ε = 10⁻⁶.' },
          { paso: 4, titulo: 'Concluir el diagnóstico', detalle: 'Si coinciden, son equipolentes. Si difiere en un solo signo, son opuestos, no equipolentes.' }
        ],
        erroresComunes: [
          { error: 'Creer que vectores opuestos son equipolentes', porqueOcurre: 'Tienen igual módulo e igual dirección, pero sentidos contrarios.', solucionCorrecta: 'Para ser equipolentes el sentido debe ser idéntico: (4, 3) ≠ (-4, -3).' },
          { error: 'Confundir equipolencia con rectas coincidentes', porqueOcurre: 'Pensar que deben estar en la misma línea.', solucionCorrecta: 'Los vectores pueden estar en rectas paralelas distintas y ser perfectamente equipolentes.' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'Entra en el modo "Test de Equipolencia (AB vs CD)"', resultadoEsperado: 'Aparecen controles para cuatro puntos independientes: A, B, C y D.' },
          { paso: 2, accion: 'Introduce A(1, 1), B(4, 3) y C(2, 4), D(5, 6)', resultadoEsperado: 'El simulador dibuja ambos vectores en azul y ámbar en posiciones distintas del plano.' },
          { paso: 3, accion: 'Revisa el diagnóstico de equipolencia', resultadoEsperado: 'Se enciende el badge verde "¡Vectores Estrictamente Equipolentes!" pues B-A = D-C = (3, 2).' }
        ],
        checkpoint: {
          pregunta: 'Si A(1, 2) y B(4, 6), ¿cuál debe ser el punto D para que CD sea equipolente a AB partiendo de C(0, -1)?',
          opciones: [
            { texto: 'D = (3, 3)', correcta: true, feedback: '¡Correcto! AB = (4-1, 6-2) = (3, 4). D = C + AB = (0+3, -1+4) = (3, 3).' },
            { texto: 'D = (3, 5)', correcta: false, feedback: 'Calculaste erróneamente la suma en Y: -1 + 4 = 3, no 5.' },
            { texto: 'D = (-3, -4)', correcta: false, feedback: 'Restaste en lugar de sumar el vector al origen C.' }
          ]
        },
        ejemplo: {
          enunciado: 'Verificar si AB con A(1, 2), B(5, 5) es equipolente a CD con C(-2, 1), D(2, 4).',
          pasos: [
            { paso: 'Componentes de AB', calculo: 'AB = (5 - 1, 5 - 2) = (4, 3)' },
            { paso: 'Componentes de CD', calculo: 'CD = (2 - (-2), 4 - 1) = (4, 3)' },
            { paso: 'Comparación', calculo: 'AB = CD = (4, 3) ⟹ Son Estrictamente Equipolentes' }
          ],
          simulacion: { modo: 'equipolencia', datos: { ax: 1, ay: 2, bx: 5, by: 5, cx: -2, cy: 1, dx: 2, dy: 4 } }
        }
      },

      {
        id: 'cadenas-resultante',
        numero: 10,
        dimension: '2d',
        categoria: 'Cinemática y Trayectorias',
        titulo: 'Cadenas Vectoriales y Desplazamiento Resultante Neto',
        subtitulo: 'Concatenación de múltiples segmentos orientados y principio de conservación del camino.',
        resumen: 'Aprende cómo una sucesión de desplazamientos encadenados equivale exactamente al vector directo que une el origen inicial con el final.',
        concepto: {
          queEs: 'Una cadena vectorial es una secuencia ordenada de desplazamientos continuos donde el extremo de cada vector coincide con el origen del siguiente (A → B → C → D). La resultante global de la cadena R es la suma de todos los vectores intermedios y representa el desplazamiento neto directo desde el punto de partida original hasta el punto de llegada final: R = v₁ + v₂ + ... + vn = D - A.',
          paraQueSirve: 'Es el modelo cinemático de robots articulados (cinemática directa), trayectorias GPS de vehículos terrestres y cálculo de poligonales cerradas en topografía.',
          significadoFisico: 'Si caminas 100 m al Este, 50 m al Norte y 100 m al Oeste, la distancia recorrida a pie es de 250 m (escalar), pero tu desplazamiento vectorial neto es de solo 50 m hacia el Norte: R = (0, 50).'
        },
        variables: [
          { simbolo: 'P₁, P₂, ..., Pn', nombre: 'Vértices de la trayectoria', descripcion: 'Sucesión de coordenadas que marcan la ruta poligonal.' },
          { simbolo: 'vi = P_{i+1} - Pi', nombre: 'Vector del tramo i', descripcion: 'Desplazamiento individual en cada etapa del camino.' },
          { simbolo: 'R = ∑ vi = Pn - P₁', nombre: 'Vector resultante neto', descripcion: 'Vector directo que conecta el punto de partida inicial con la meta final.' },
          { simbolo: 'R = (0, 0)', nombre: 'Poligonal cerrada', descripcion: 'Si la ruta regresa al punto de partida original, el desplazamiento neto es nulo.' }
        ],
        formula: '$$\\vec{R} = \\sum_{i=1}^n \\vec{v}_i = P_{\\text{final}} - P_{\\text{inicial}}$$',
        formulaNota: 'La suma vectorial de una cadena cerrada de vectores (polígono que regresa al origen) es siempre el vector cero (0, 0).',
        demostracion: {
          titulo: 'Demostración de la suma telescópica de la resultante',
          pasos: [
            { paso: 'Expresión de cada vector por extremos', detalle: 'v₁ = B - A, v₂ = C - B, v₃ = D - C.' },
            { paso: 'Suma de todos los vectores de la cadena', detalle: 'R = v₁ + v₂ + v₃ = (B - A) + (C - B) + (D - C).' },
            { paso: 'Cancelación telescópica de términos intermedios', detalle: 'R = -A + (B - B) + (C - C) + D = D - A.' },
            { paso: 'Conclusión formal', detalle: 'Todos los vértices intermedios se anulan algebraicamente; solo sobreviven el extremo final y el origen inicial. Queda demostrado.' }
          ]
        },
        algoritmoPasos: [
          { paso: 1, titulo: 'Listar las coordenadas de todos los nodos de la cadena', detalle: 'Registra los puntos ordenados P₁, P₂, ..., Pn.' },
          { paso: 2, titulo: 'Calcular componentes de cada vector consecutivo', detalle: 'Obtén v₁ = P₂ - P₁, v₂ = P₃ - P₂, etc.' },
          { paso: 3, titulo: 'Sumar todas las componentes X por separado', detalle: 'Calcula Rx = v₁x + v₂x + ... + vnx.' },
          { paso: 4, titulo: 'Sumar todas las componentes Y por separado', detalle: 'Calcula Ry = v₁y + v₂y + ... + vny.' },
          { paso: 5, titulo: 'Comprobar con el vector directo Pn - P₁', detalle: 'Verifica que (Rx, Ry) coincide con Pn - P₁.' }
        ],
        erroresComunes: [
          { error: 'Confundir la distancia recorrida con el módulo de la resultante', porqueOcurre: 'Pensar que la longitud total del camino es igual al desplazamiento.', solucionCorrecta: 'La distancia recorrida es la suma de los módulos ||v₁|| + ||v₂||. El desplazamiento es el módulo de la suma ||R||.' },
          { error: 'Alterar el orden de los vértices intermedios', porqueOcurre: 'Desordenar la lista de puntos.', solucionCorrecta: 'El encadenamiento exige respetar la secuencia de navegación P₁ → P₂ → P₃.' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'En el modo de Puntos y Cadenas, añade cuatro puntos: A(0,0), B(4,0), C(4,3) y D(0,3)', resultadoEsperado: 'Se dibuja una ruta rectangular de 3 vectores (v₁, v₂, v₃).' },
          { paso: 2, accion: 'Observa la línea punteada de la Resultante', resultadoEsperado: 'La resultante conecta A con D directamente: R = (0, 3) con longitud 3.00 u.' },
          { paso: 3, accion: 'Añade el punto E(0,0) para cerrar la figura', resultadoEsperado: 'La resultante colapsa a (0, 0), demostrando que en una poligonal cerrada el desplazamiento es nulo.' }
        ],
        checkpoint: {
          pregunta: 'Un robot parte de A(1, 1), avanza hacia B(5, 1), luego a C(5, 4) y finalmente a D(1, 4). ¿Cuál es su desplazamiento neto resultante R?',
          opciones: [
            { texto: 'R = (0, 3)', correcta: true, feedback: '¡Correcto! R = D - A = (1 - 1, 4 - 1) = (0, 3). El robot se desplazó 3 unidades hacia el Norte.' },
            { texto: 'R = (4, 3)', correcta: false, feedback: 'Ese sería el vector de A a C, no a la posición final D.' },
            { texto: 'R = (10, 0)', correcta: false, feedback: 'Sumaste la distancia total de los tramos en lugar del vector neto.' }
          ]
        },
        ejemplo: {
          enunciado: 'Calcular la resultante de la cadena A(0,0) → B(3,1) → C(5,4) → D(2,5).',
          pasos: [
            { paso: 'Vector v₁ (A→B)', calculo: 'v₁ = (3 - 0, 1 - 0) = (3, 1)' },
            { paso: 'Vector v₂ (B→C)', calculo: 'v₂ = (5 - 3, 4 - 1) = (2, 3)' },
            { paso: 'Vector v₃ (C→D)', calculo: 'v₃ = (2 - 5, 5 - 4) = (-3, 1)' },
            { paso: 'Resultante por suma telescópica', calculo: 'R = D - A = (2 - 0, 5 - 0) = (2, 5)' }
          ],
          simulacion: { modo: 'puntos', datos: { puntos: [{ x: 0, y: 0 }, { x: 3, y: 1 }, { x: 5, y: 4 }, { x: 2, y: 5 }] } }
        }
      },

      /* ==========================================================================
         DIMENSIÓN ℝ³ (ESPACIO TRIDIMENSIONAL)
         ========================================================================== */
      {
        id: 'expresion-espacial-3d',
        numero: 11,
        dimension: '3d',
        categoria: 'Álgebra Espacial 3D',
        titulo: 'Expresión Cartesiana en Base Canónica {i, j, k} en ℝ³',
        subtitulo: 'Representación en ternas ordenadas y base ortonormal tridimensional.',
        resumen: 'Aprende a representar vectores en el espacio con tres coordenadas y la base canónica espacial {i, j, k}.',
        concepto: {
          queEs: 'Un vector en el espacio tridimensional ℝ³ es una terna ordenada de números reales v = (vx, vy, vz). Representa el desplazamiento simultáneo a lo largo de tres ejes coordenados perpendiculares entre sí: eje X (abscisa), eje Y (ordenada) y eje Z (cota o altura). En la base canónica ortonormal estándar se expresa como combinación lineal v = vx·i + vy·j + vz·k, donde i = (1,0,0), j = (0,1,0) y k = (0,0,1).',
          paraQueSirve: 'Es la estructura fundamental del mundo físico real, modelado 3D, animación por ordenador (OpenGL, WebGL, Vulkan), navegación espacial y robótica de 6 grados de libertad.',
          significadoFisico: 'En aeronáutica modela los tres ejes del avión: vx avance frontal (roll), vy deriva lateral (pitch) y vz altitud vertical (yaw).'
        },
        variables: [
          { simbolo: 'v = (vx, vy, vz)', nombre: 'Vector en ℝ³', descripcion: 'Terna ordenada que define el desplazamiento tridimensional.' },
          { simbolo: 'i, j, k', nombre: 'Base canónica espacial', descripcion: 'Vectores unitarios directores mutuamente perpendiculares: i=(1,0,0), j=(0,1,0), k=(0,0,1).' },
          { simbolo: '||v|| = √(vx² + vy² + vz²)', nombre: 'Módulo espacial 3D', descripcion: 'Diagonal de la caja rectangular paralelepipédica formada por las componentes.' }
        ],
        formula: '$$\\vec{v} = v_x \\mathbf{i} + v_y \\mathbf{j} + v_z \\mathbf{k} \\quad \\Big| \\quad \\|\\vec{v}\\| = \\sqrt{v_x^2 + v_y^2 + v_z^2}$$',
        formulaNota: 'El sistema cartesiano tridimensional se asume siempre dextrógiro (regla de la mano derecha).',
        demostracion: {
          titulo: 'Deducción del módulo 3D por doble aplicación del Teorema de Pitágoras',
          pasos: [
            { paso: 'Proyección sobre el plano XY', detalle: 'La base rectangular en el plano XY tiene lados |vx| y |vy|. Su diagonal d en el plano XY cumple d² = vx² + vy².' },
            { paso: 'Elevación vertical sobre el eje Z', detalle: 'La diagonal d y la componente vertical vz forman un segundo triángulo rectángulo perpendicular al plano del suelo, cuya hipotenusa es la norma del vector ||v||.' },
            { paso: 'Aplicación final de Pitágoras', detalle: '||v||² = d² + vz² = (vx² + vy²) + vz² = vx² + vy² + vz² ⟹ ||v|| = √(vx² + vy² + vz²). Queda demostrado.' }
          ]
        },
        algoritmoPasos: [
          { paso: 1, titulo: 'Identificar las tres coordenadas del punto origen y extremo', detalle: 'A(x₁, y₁, z₁) y B(x₂, y₂, z₂).' },
          { paso: 2, titulo: 'Calcular componentes restando Extremo - Origen', detalle: 'vx = x₂ - x₁, vy = y₂ - y₁, vz = z₂ - z₁.' },
          { paso: 3, titulo: 'Elevar las tres componentes al cuadrado', detalle: 'Calcula vx², vy² y vz².' },
          { paso: 4, titulo: 'Sumar y extraer la raíz cuadrada', detalle: 'Calcula ||v|| = √(vx² + vy² + vz²).' }
        ],
        erroresComunes: [
          { error: 'Confundir el eje Y con la altura en 3D', porqueOcurre: 'En 2D la altura es Y, pero en la convención matemática 3D la cota vertical es el eje Z.', solucionCorrecta: 'En matemáticas e ingeniería estándar, X e Y forman el plano horizontal y Z es la altura vertical.' },
          { error: 'Omitir una componente en la norma', porqueOcurre: 'Calcular solo con dos componentes como si fuera 2D.', solucionCorrecta: 'El espacio euclídeo 3D exige sumar los tres cuadrados: vx² + vy² + vz².' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'Haz clic en "Espacio ℝ³" en la barra superior', resultadoEsperado: 'El canvas se transforma en un entorno 3D orbital interactivo con ejes X (rojo), Y (verde) y Z (azul).' },
          { paso: 2, accion: 'Introduce las coordenadas A(0, 0, 0) y B(2, 3, 6)', resultadoEsperado: 'Aparece la flecha tridimensional suspendida en el espacio.' },
          { paso: 3, accion: 'Examina el módulo en el HUD', resultadoEsperado: 'Comprobarás ||v|| = √(2² + 3² + 6²) = √(4 + 9 + 36) = √49 = 7.00 u exactos.' }
        ],
        checkpoint: {
          pregunta: '¿Cuál es el módulo del vector espacial v = (1, 2, 2)?',
          opciones: [
            { texto: '||v|| = 3', correcta: true, feedback: '¡Correcto! ||v|| = √(1² + 2² + 2²) = √(1 + 4 + 4) = √9 = 3.' },
            { texto: '||v|| = 5', correcta: false, feedback: 'Sumaste 1 + 2 + 2 = 5 directamente sin aplicar la métrica euclídea.' },
            { texto: '||v|| = √5', correcta: false, feedback: 'Olvidaste sumar el cuadrado de la tercera componente vz.' }
          ]
        },
        ejemplo: {
          enunciado: 'Calcular las componentes y norma del vector espacial que une A(1, -2, 3) con B(4, 2, -1).',
          pasos: [
            { paso: 'Componente vx', calculo: 'vx = 4 - 1 = 3' },
            { paso: 'Componente vy', calculo: 'vy = 2 - (-2) = 4' },
            { paso: 'Componente vz', calculo: 'vz = -1 - 3 = -4' },
            { paso: 'Módulo espacial ||v||', calculo: '||v|| = √(3² + 4² + (-4)²) = √(9 + 16 + 16) = √41 ≈ 6.40 u' }
          ],
          simulacion: { modo: 'puntos', datos: { ax: 1, ay: -2, az: 3, bx: 4, by: 2, bz: -1 } }
        }
      },

      {
        id: 'cosenos-directores-3d',
        numero: 12,
        dimension: '3d',
        categoria: 'Álgebra Espacial 3D',
        titulo: 'Cosenos Directores y Relación Fundamental en ℝ³',
        subtitulo: 'Ángulos directores con los ejes coordenados e identidad pitagórica espacial.',
        resumen: 'Aprende a calcular los ángulos que forma un vector 3D con los ejes X, Y, Z y por qué la suma de sus cosenos al cuadrado siempre da 1.',
        concepto: {
          queEs: 'Los cosenos directores de un vector no nulo v en ℝ³ son los cosenos de los ángulos que forma dicho vector con los semiejes positivos X, Y y Z: α (ángulo con X), β (ángulo con Y) y γ (ángulo con Z). Se calculan simplemente dividiendo cada componente entre la norma total del vector: cos α = vx / ||v||, cos β = vy / ||v||, cos γ = vz / ||v||.',
          paraQueSirve: 'Son exactamente las componentes del vector unitario director û = (cos α, cos β, cos γ). Permiten orientar elementos en el espacio en diseño CAD, robótica, balística y astronomía.',
          significadoFisico: 'En navegación aérea representan la orientación tridimensional de la nariz del avión respecto a los ejes de referencia terrestre.'
        },
        variables: [
          { simbolo: 'α, β, γ', nombre: 'Ángulos directores', descripcion: 'Ángulos con los semiejes positivos X, Y y Z respectivamente. Siempre 0° ≤ α, β, γ ≤ 180°.' },
          { simbolo: 'cos α = vx / ||v||', nombre: 'Coseno director en X', descripcion: 'Componente normalizada a lo largo del eje X.' },
          { simbolo: 'cos β = vy / ||v||', nombre: 'Coseno director en Y', descripcion: 'Componente normalizada a lo largo del eje Y.' },
          { simbolo: 'cos γ = vz / ||v||', nombre: 'Coseno director en Z', descripcion: 'Componente normalizada a lo largo del eje Z.' }
        ],
        formula: '$$\\cos^2(\\alpha) + \\cos^2(\\beta) + \\cos^2(\\gamma) = 1 \\quad \\Big| \\quad \\hat{u} = (\\cos\\alpha, \\; \\cos\\beta, \\; \\cos\\gamma)$$',
        formulaNota: 'La suma de los cuadrados de los tres cosenos directores es invariablemente igual a 1 en cualquier vector no nulo de ℝ³.',
        demostracion: {
          titulo: 'Demostración de la Relación Fundamental cos² α + cos² β + cos² γ = 1',
          pasos: [
            { paso: 'Sustitución de las definiciones trigonométricas', detalle: 'cos² α = (vx / ||v||)², cos² β = (vy / ||v||)², cos² γ = (vz / ||v||)².' },
            { paso: 'Suma de los tres cuadrados', detalle: 'cos² α + cos² β + cos² γ = (vx² + vy² + vz²) / ||v||².' },
            { paso: 'Identidad del numerador con la norma', detalle: 'Como vx² + vy² + vz² = ||v||², el cociente es ||v||² / ||v||² = 1. Queda formalmente demostrado.' }
          ]
        },
        algoritmoPasos: [
          { paso: 1, titulo: 'Calcular el módulo espacial del vector', detalle: 'Obtén ||v|| = √(vx² + vy² + vz²).' },
          { paso: 2, titulo: 'Calcular cada coseno dividiendo entre el módulo', detalle: 'cos α = vx / ||v||, cos β = vy / ||v||, cos γ = vz / ||v||.' },
          { paso: 3, titulo: 'Extraer los ángulos mediante el arcocoseno', detalle: 'α = arccos(cos α), β = arccos(cos β), γ = arccos(cos γ).' },
          { paso: 4, titulo: 'Verificar la identidad pitagórica', detalle: 'Comprueba que cos² α + cos² β + cos² γ = 1.000.' }
        ],
        erroresComunes: [
          { error: 'Creer que α + β + γ = 90° o 180°', porqueOcurre: 'Confundir los ángulos directores con los ángulos internos de un triángulo plano.', solucionCorrecta: 'La relación NO es lineal: la suma de los ángulos NO suma 180°, lo que suma 1 es la suma de sus cosenos al cuadrado.' },
          { error: 'Obtener un coseno fuera del rango [-1, 1]', porqueOcurre: 'Error aritmético al dividir entre un módulo menor que una componente.', solucionCorrecta: 'Ninguna componente puede ser mayor que el módulo del vector; siempre -1 ≤ cos ≤ 1.' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'En el Espacio ℝ³, introduce el vector v = (0, 3, 4)', resultadoEsperado: 'El vector descansa enteramente en el plano vertical YZ.' },
          { paso: 2, accion: 'Observa la tarjeta de "Cosenos Directores"', resultadoEsperado: 'Comprobarás cos α = 0/5 = 0.00 (α = 90°), cos β = 3/5 = 0.60 (β = 53.13°) y cos γ = 4/5 = 0.80 (γ = 36.87°).' },
          { paso: 3, accion: 'Verifica la suma pitagórica', resultadoEsperado: '0² + 0.6² + 0.8² = 0 + 0.36 + 0.64 = 1.000.' }
        ],
        checkpoint: {
          pregunta: 'Si un vector en ℝ³ forma ángulos α = 60° con el eje X y β = 60° con el eje Y, ¿qué ángulo γ forma con el eje Z (con 0° ≤ γ ≤ 90°)?',
          opciones: [
            { texto: 'γ = 45°', correcta: true, feedback: '¡Exacto! cos² 60° + cos² 60° + cos² γ = 1 ⟹ (0.5)² + (0.5)² + cos² γ = 1 ⟹ 0.25 + 0.25 + cos² γ = 1 ⟹ cos² γ = 0.5 ⟹ cos γ = 1/√2 ⟹ γ = 45°.' },
            { texto: 'γ = 60°', correcta: false, feedback: 'Si γ fuera 60°, la suma sería 0.25 + 0.25 + 0.25 = 0.75 ≠ 1.' },
            { texto: 'γ = 90°', correcta: false, feedback: 'Si γ fuera 90°, cos 90° = 0 y la suma daría solo 0.50.' }
          ]
        },
        ejemplo: {
          enunciado: 'Determinar los cosenos y ángulos directores del vector v = (2, 3, 6).',
          pasos: [
            { paso: 'Módulo del vector', calculo: '||v|| = √(2² + 3² + 6²) = √49 = 7' },
            { paso: 'Cosenos directores', calculo: 'cos(α) = 2/7 ≈ 0.286 | cos(β) = 3/7 ≈ 0.429 | cos(γ) = 6/7 ≈ 0.857' },
            { paso: 'Ángulos directores', calculo: 'α = arccos(2/7) ≈ 73.40° | β = arccos(3/7) ≈ 64.62° | γ = arccos(6/7) ≈ 31.00°' },
            { paso: 'Comprobación de identidad', calculo: '(2/7)² + (3/7)² + (6/7)² = (4 + 9 + 36) / 49 = 49 / 49 = 1.000' }
          ],
          simulacion: { modo: 'puntos', datos: { ax: 0, ay: 0, az: 0, bx: 2, by: 3, bz: 6 } }
        }
      },

      {
        id: 'producto-vectorial-3d',
        numero: 13,
        dimension: '3d',
        categoria: 'Álgebra Espacial 3D',
        titulo: 'Producto Vectorial (u × v) y Área del Paralelogramo en ℝ³',
        subtitulo: 'Determinante simbólico de Laplace, vector perpendicular y regla de la mano derecha.',
        resumen: 'Aprende a calcular el producto cruz en ℝ³, obtener un vector normal perpendicular y calcular el área del paralelogramo sustentado.',
        concepto: {
          queEs: 'El producto vectorial (o cross product) entre dos vectores u, v ∈ ℝ³ engendra UN NUEVO VECTOR w = u × v con tres propiedades excepcionales: 1. Es estrictamente perpendicular a ambos vectores originales (w ⊥ u y w ⊥ v); 2. Su sentido sigue la regla de la mano derecha; 3. Su módulo ||u × v|| es exactamente igual al área del paralelogramo sustentado por u y v: Área = ||u||·||v||·sen θ.',
          paraQueSirve: 'En física e ingeniería modela el Momento de una Fuerza (Torque: τ = r × F), la Fuerza Magnética de Lorentz sobre cargas en movimiento (F = q·v × B) y el cálculo de vectores normales de superficie en diseño 3D y gráficos por computadora.',
          significadoFisico: 'Es una operación estrictamente anticonmutativa: v × u = -(u × v). Al cambiar el orden de los factores, el vector resultante conserva su módulo y dirección pero invierte su sentido en 180°.'
        },
        variables: [
          { simbolo: 'u × v', nombre: 'Vector producto cruz', descripcion: 'Vector ortogonal al plano generado por u y v.' },
          { simbolo: '||u × v||', nombre: 'Módulo del producto cruz', descripcion: 'Área del paralelogramo sustentado: ||u|| · ||v|| · sen(θ).' },
          { simbolo: 'i, j, k', nombre: 'Vectores de la base canónica', descripcion: 'Fila superior del determinante formal de desarrollo de Laplace.' },
          { simbolo: 'u × v = (0, 0, 0)', nombre: 'Vectores colineales', descripcion: 'Si el producto vectorial se anula, los vectores son estrictamente paralelos.' }
        ],
        formula: '$$\\vec{u} \\times \\vec{v} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ u_x & u_y & u_z \\\\ v_x & v_y & v_z \\end{vmatrix} = (u_y v_z - u_z v_y)\\mathbf{i} - (u_x v_z - u_z v_x)\\mathbf{j} + (u_x v_y - u_y v_x)\\mathbf{k}$$',
        formulaMatriz: {
          filas: [
            ['i', 'j', 'k'],
            ['ux', 'uy', 'uz'],
            ['vx', 'vy', 'vz']
          ]
        },
        formulaNota: 'El signo negativo central en la componente j proviene de la regla de los signos de Laplace (-1)^(1+2) = -1.',
        demostracion: {
          titulo: 'Demostración de la Perpendicularidad de u × v con u mediante Producto Escalar',
          pasos: [
            { paso: 'Cálculo de u · (u × v)', detalle: 'Efectuamos el producto escalar entre u y el vector resultante w = u × v.' },
            { paso: 'Sustitución en componentes', detalle: 'u · (u × v) = ux(uy vz - uz vy) - uy(ux vz - uz vx) + uz(ux vy - uy vx).' },
            { paso: 'Desarrollo algebraico distributivo', detalle: '= ux uy vz - ux uz vy - uy ux vz + uy uz vx + uz ux vy - uz uy vx.' },
            { paso: 'Cancelación exacta', detalle: 'Todos los términos se cancelan dos a dos: (ux uy vz - uy ux vz) + (uz ux vy - ux uz vy) + (uy uz vx - uz uy vx) = 0. Por tanto, u × v es perpendicular a u. Queda demostrado.' }
          ]
        },
        miniLab: {
          tipo: 'producto-vectorial',
          titulo: 'Mini-Laboratorio: Producto Vectorial y Regla de la Mano Derecha',
          descripcion: 'Alterna entre u × v y v × u para verificar en tiempo real cómo el vector perpendicular se invierte 180° hacia abajo.'
        },
        algoritmoPasos: [
          { paso: 1, titulo: 'Plantear el determinante 3×3 simbólico', detalle: 'Coloca en la fila 1 a (i, j, k), en la fila 2 a u=(ux, uy, uz) y en la fila 3 a v=(vx, vy, vz).' },
          { paso: 2, titulo: 'Calcular el menor adjunto en i', detalle: 'Tapa fila 1 y columna 1: wx = (uy·vz - uz·vy).' },
          { paso: 3, titulo: 'Calcular el menor adjunto en j (con signo negativo)', detalle: 'Tapa fila 1 y columna 2: wy = - (ux·vz - uz·vx) = (uz·vx - ux·vz).' },
          { paso: 4, titulo: 'Calcular el menor adjunto en k', detalle: 'Tapa fila 1 y columna 3: wz = (ux·vy - uy·vx).' },
          { paso: 5, titulo: 'Calcular el área del paralelogramo', detalle: 'Calcula la norma del vector resultante: Área = √(wx² + wy² + wz²).' }
        ],
        erroresComunes: [
          { error: 'Olvidar el signo negativo de la componente j', porqueOcurre: 'Tratar a todos los menores complementarios con signo positivo.', solucionCorrecta: 'La componente j es -(ux·vz - uz·vx). Omitir el signo negativo arruina la perpendicularidad.' },
          { error: 'Asumir conmutatividad (u × v = v × u)', porqueOcurre: 'Aplicar la propiedad del producto escalar.', solucionCorrecta: 'El producto cruz es anticonmutativo: v × u = -(u × v).' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'En el Espacio ℝ³, selecciona "Operaciones & Producto Vectorial (u × v)"', resultadoEsperado: 'Se abren los inputs 3D para u y v.' },
          { paso: 2, accion: 'Introduce u = (3, 1, 2) y v = (-1, 3, 1)', resultadoEsperado: 'El motor 3D dibuja u y v, sombreado en color ámbar el paralelogramo y trazando el vector u × v en perpendicular.' },
          { paso: 3, accion: 'Comprueba el vector resultante', resultadoEsperado: 'u × v = (-5, -5, 10) con Área = 12.25 u².' }
        ],
        checkpoint: {
          pregunta: '¿Cuál es el producto vectorial i × j de los vectores de la base canónica espacial?',
          opciones: [
            { texto: 'i × j = k', correcta: true, feedback: '¡Correcto! Por la regla de la mano derecha, girar de X a Y engendra el vector unitario Z positivo: k.' },
            { texto: 'i × j = -k', correcta: false, feedback: 'Ese sería el resultado de j × i por anticonmutatividad.' },
            { texto: 'i × j = 0', correcta: false, feedback: 'i y j son ortogonales, su producto cruz tiene módulo máximo 1, no cero.' }
          ]
        },
        ejemplo: {
          enunciado: 'Calcular el producto vectorial de u = (3, 1, 2) y v = (-1, 3, 1) y el área del paralelogramo.',
          pasos: [
            { paso: 'Componente i', calculo: 'wx = (1)(1) - (2)(3) = 1 - 6 = -5' },
            { paso: 'Componente j con signo negativo', calculo: 'wy = - [ (3)(1) - (2)(-1) ] = - [ 3 + 2 ] = -5' },
            { paso: 'Componente k', calculo: 'wz = (3)(3) - (1)(-1) = 9 + 1 = 10' },
            { paso: 'Vector resultante u × v', calculo: 'u × v = (-5, -5, 10)' },
            { paso: 'Área del paralelogramo sustentado', calculo: 'Área = ||u × v|| = √((-5)² + (-5)² + 10²) = √(25 + 25 + 100) = √150 ≈ 12.25 u²' }
          ],
          simulacion: { modo: 'operaciones', datos: { ux: 3, uy: 1, uz: 2, vx: -1, vy: 3, vz: 1, k: 1 } }
        }
      },

      {
        id: 'producto-mixto-3d',
        numero: 14,
        dimension: '3d',
        categoria: 'Geometría Espacial 3D',
        titulo: 'Producto Mixto [u, v, w] y Volumen del Paralelepípedo en ℝ³',
        subtitulo: 'Operación combinada dot-cross, determinante 3×3 numérico y coplanaridad.',
        resumen: 'Aprende a calcular el volumen geométrico de un paralelepípedo y comprobar si 3 vectores están en el mismo plano.',
        concepto: {
          queEs: 'El producto mixto (o triple producto escalar) de tres vectores u, v, w ∈ ℝ³ es el número escalar que resulta de combinar el producto vectorial y el producto escalar: [u, v, w] = u · (v × w). Su valor absoluto |[u, v, w]| es exactamente igual al volumen del paralelepípedo tridimensional cuyas aristas concurrentes son u, v y w. El volumen del tetraedro apoyado en esos mismos vectores es un sexto: V_tet = (1/6) · |[u, v, w]|.',
          paraQueSirve: 'Es el criterio determinante para comprobar si tres vectores son coplanares (están en el mismo plano). Si [u, v, w] = 0, el paralelepípedo no tiene altura ni grosor y los tres vectores están aplastados en una misma superficie plana.',
          significadoFisico: 'En ingeniería civil y mecánica de sólidos calcula volúmenes de cimentaciones, prismas irregulares y tensores de deformación volumétrica.'
        },
        variables: [
          { simbolo: '[u, v, w]', nombre: 'Producto mixto', descripcion: 'Escalar obtenido de la operación u · (v × w).' },
          { simbolo: 'V = |[u, v, w]|', nombre: 'Volumen del paralelepípedo', descripcion: 'Volumen del sólido sustentado por los 3 vectores tridimensionales.' },
          { simbolo: '[u, v, w] = 0', nombre: 'Condición de coplanaridad', descripcion: 'Los tres vectores son linealmente dependientes y descansan en el mismo plano.' }
        ],
        formula: '$$[\\vec{u}, \\vec{v}, \\vec{w}] = \\vec{u} \\cdot (\\vec{v} \\times \\vec{w}) = \\begin{vmatrix} u_x & u_y & u_z \\\\ v_x & v_y & v_z \\\\ w_x & w_y & w_z \\end{vmatrix} \\implies \\text{Volumen} = |[\\vec{u}, \\vec{v}, \\vec{w}]|$$',
        formulaMatriz: {
          filas: [
            ['ux', 'uy', 'uz'],
            ['vx', 'vy', 'vz'],
            ['wx', 'wy', 'wz']
          ]
        },
        formulaNota: 'El producto mixto equivale al determinante 3×3 formado directamente por las componentes de los 3 vectores.',
        demostracion: {
          titulo: 'Deducción del volumen de un paralelepípedo: Área de la Base por la Altura',
          pasos: [
            { paso: 'Área de la base', detalle: 'La base está formada por v y w. Su área es el módulo del producto vectorial: A_base = ||v × w||.' },
            { paso: 'Vector normal a la base', detalle: 'El vector n = v × w es perpendicular al plano de la base.' },
            { paso: 'Cálculo de la altura', detalle: 'La altura h del paralelepípedo es la proyección del vector u sobre el vector normal n: h = ||u|| |cos φ|, donde φ es el ángulo entre u y v × w.' },
            { paso: 'Volumen total', detalle: 'V = A_base · h = ||v × w|| · ||u|| · |cos φ| = |u · (v × w)| = |[u, v, w]|. Queda demostrado.' }
          ]
        },
        algoritmoPasos: [
          { paso: 1, titulo: 'Construir la matriz 3×3 con los tres vectores', detalle: 'Fila 1: u(ux, uy, uz), Fila 2: v(vx, vy, vz), Fila 3: w(wx, wy, wz).' },
          { paso: 2, titulo: 'Aplicar la regla de Sarrus o desarrollo por la primera fila', detalle: 'det = ux(vy·wz - vz·wy) - uy(vx·wz - vz·wx) + uz(vx·wy - vy·wx).' },
          { paso: 3, titulo: 'Obtener el valor escalar', detalle: 'Calcula el número resultante con su signo.' },
          { paso: 4, titulo: 'Interpretar el resultado geométrico', detalle: 'El volumen es el valor absoluto |det|. Si det = 0, los vectores son coplanares.' }
        ],
        erroresComunes: [
          { error: 'Olvidar el valor absoluto para el volumen', porqueOcurre: 'El determinante puede dar un número negativo dependiendo de la orientación de los vectores.', solucionCorrecta: 'El volumen físico de un cuerpo no puede ser negativo: toma siempre el valor absoluto |[u, v, w]|.' },
          { error: 'Mezclar el orden de las operaciones', porqueOcurre: 'Intentar calcular (u · v) × w.', solucionCorrecta: 'El producto escalar u · v produce un número; no se puede hacer el producto cruz de un número con un vector. Siempre es u · (v × w).' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'En el Espacio ℝ³, observa la terna canónica de vectores i, j, k', resultadoEsperado: 'Representan el cubo unitario de aristas 1 en el origen.' },
          { paso: 2, accion: 'Calcula mentalmente [i, j, k] = i · (j × k)', resultadoEsperado: 'Como j × k = i, entonces i · i = 1.00 u³ (el volumen del cubo unitario).' },
          { paso: 3, accion: 'Si los tres vectores estuvieran en el plano XY (todos con z=0)', resultadoEsperado: 'La tercera columna de la matriz sería de ceros, arrojando det = 0 (coplanares).' }
        ],
        checkpoint: {
          pregunta: 'Si tres vectores u, v y w tienen un producto mixto [u, v, w] = 0, ¿qué afirmación geométrica es rigurosamente cierta?',
          opciones: [
            { texto: 'Los tres vectores son mutuamente perpendiculares.', correcta: false, feedback: 'Si fueran perpendiculares, el paralelepípedo tendría volumen máximo, no cero.' },
            { texto: 'Los tres vectores son coplanares (están en el mismo plano).', correcta: true, feedback: '¡Exacto! El volumen del prisma es cero porque no hay grosor vertical; todos yacen en el mismo plano.' },
            { texto: 'Al menos uno de los vectores debe ser el vector nulo (0,0,0).', correcta: false, feedback: 'Pueden ser tres vectores perfectamente no nulos pero situados en el mismo plano (ej. todos en z=0).' }
          ]
        },
        ejemplo: {
          enunciado: 'Calcular el volumen del paralelepípedo sustentado por u=(1,0,2), v=(0,2,3) y w=(2,1,0).',
          pasos: [
            { paso: 'Planteamiento del determinante', calculo: '| 1 0 2 | / | 0 2 3 | / | 2 1 0 |' },
            { paso: 'Desarrollo por la primera fila', calculo: '1·(2·0 - 3·1) - 0·(...) + 2·(0·1 - 2·2)' },
            { paso: 'Evaluación aritmética', calculo: '1·(-3) + 2·(-4) = -3 - 8 = -11' },
            { paso: 'Volumen físico', calculo: 'Volumen = |-11| = 11.00 unidades cúbicas' }
          ],
          simulacion: { modo: 'operaciones', datos: { ux: 1, uy: 0, uz: 2, vx: 0, vy: 2, vz: 3, k: 1 } }
        }
      },

      {
        id: 'rectas-planos-3d',
        numero: 15,
        dimension: '3d',
        categoria: 'Geometría Analítica del Espacio',
        titulo: 'Ecuaciones del Plano y Vector Normal en ℝ³',
        subtitulo: 'Definición analítica de planos mediante el vector normal perpendicular.',
        resumen: 'Aprende a formular la ecuación general de un plano Ax + By + Cz + D = 0 a partir de un punto y un vector normal.',
        concepto: {
          queEs: 'Un plano en el espacio ℝ³ queda determinado unívocamente por un punto conocido P₀(x₀, y₀, z₀) contenido en él y un vector normal n = (A, B, C) perpendicular a toda la superficie del plano. Cualquier punto arbitrario P(x, y, z) pertenece al plano si y solo si el vector que lo une con P₀ es perpendicular a n: n · (P - P₀) = 0. Al desarrollar este producto escalar se obtiene la Ecuación General del Plano: Ax + By + Cz + D = 0.',
          paraQueSirve: 'Es el pilar de la geometría computacional, colisiones de superficies en motores gráficos (raycasting, sombreado de polígonos), diseño de alas de aviones en aerodinámica y cortes tomográficos en medicina.',
          significadoFisico: 'Los coeficientes (A, B, C) de la ecuación del plano son directamente las componentes del vector perpendicular n. Si quieres un plano horizontal como una mesa, n = (0, 0, 1) y su ecuación es simplemente z = constante.'
        },
        variables: [
          { simbolo: 'n = (A, B, C)', nombre: 'Vector normal al plano', descripcion: 'Vector perpendicular a todas las rectas y vectores contenidos en el plano.' },
          { simbolo: 'P₀(x₀, y₀, z₀)', nombre: 'Punto conocido de paso', descripcion: 'Punto de apoyo fijo perteneciente al plano.' },
          { simbolo: 'D = -(A·x₀ + B·y₀ + C·z₀)', nombre: 'Término independiente', descripcion: 'Constante escalar que fija la distancia del plano al origen de coordenadas.' }
        ],
        formula: '$$\\vec{n} \\cdot (P - P_0) = 0 \\implies A(x - x_0) + B(y - y_0) + C(z - z_0) = 0 \\implies Ax + By + Cz + D = 0$$',
        formulaNota: 'Si conoces dos vectores directores u y v contenidos en el plano, el vector normal se obtiene mediante su producto cruz: n = u × v.',
        demostracion: {
          titulo: 'Deducción de la ecuación general del plano a partir del producto escalar nulo',
          pasos: [
            { paso: 'Vector genérico sobre el plano', detalle: 'Sea P(x, y, z) un punto cualquiera del plano y P₀(x₀, y₀, z₀) un punto fijo del mismo. El vector P₀P = (x - x₀, y - y₀, z - z₀) está completamente contenido en el plano.' },
            { paso: 'Condición de perpendicularidad', detalle: 'Por definición de vector normal, n = (A, B, C) es perpendicular a cualquier vector contenido en el plano: n · P₀P = 0.' },
            { paso: 'Desarrollo del producto escalar', detalle: 'A(x - x₀) + B(y - y₀) + C(z - z₀) = 0 ⟹ Ax + By + Cz - (Ax₀ + By₀ + Cz₀) = 0.' },
            { paso: 'Definición del término independiente D', detalle: 'Haciendo D = -(Ax₀ + By₀ + Cz₀), queda la ecuación general Ax + By + Cz + D = 0. Queda demostrado.' }
          ]
        },
        algoritmoPasos: [
          { paso: 1, titulo: 'Obtener el vector normal n', detalle: 'Si te dan dos vectores u y v contenidos en el plano, calcula n = u × v = (A, B, C).' },
          { paso: 2, titulo: 'Identificar las coordenadas de un punto de paso P₀', detalle: 'Anota P₀ = (x₀, y₀, z₀).' },
          { paso: 3, titulo: 'Calcular el término independiente D', detalle: 'Calcula D = -(A·x₀ + B·y₀ + C·z₀).' },
          { paso: 4, titulo: 'Escribir la ecuación general del plano', detalle: 'Expresa Ax + By + Cz + D = 0 sustituyendo los valores numéricos de A, B, C y D.' }
        ],
        erroresComunes: [
          { error: 'Confundir el vector director de una recta con el vector normal de un plano', porqueOcurre: 'Las rectas usan vectores paralelos a ellas, pero los planos se definen por vectores perpendiculares.', solucionCorrecta: 'En un plano, los coeficientes (A, B, C) son las componentes del vector perpendicular a la superficie.' },
          { error: 'Error de signos en el cálculo de D', porqueOcurre: 'Olvidar el signo menos de la fórmula D = -(A x₀ + B y₀ + C z₀).', solucionCorrecta: 'Comprueba siempre que al sustituir P₀(x₀, y₀, z₀) en Ax + By + Cz + D el resultado sea exactamente 0.' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'En el Espacio ℝ³, observa los vectores u = (3, 1, 2) y v = (-1, 3, 1)', resultadoEsperado: 'Ambos vectores generan un plano en el espacio.' },
          { paso: 2, accion: 'Calcula su producto vectorial u × v', resultadoEsperado: 'u × v = (-5, -5, 10), que es el vector normal perpendicular al plano.' },
          { paso: 3, accion: 'Simplifica el vector normal dividiendo entre -5', resultadoEsperado: 'n_simplificado = (1, 1, -2). La ecuación del plano que pasa por el origen es x + y - 2z = 0.' }
        ],
        checkpoint: {
          pregunta: '¿Cuál es el vector normal del plano de ecuación 3x - 4y + 2z - 9 = 0?',
          opciones: [
            { texto: 'n = (3, -4, 2)', correcta: true, feedback: '¡Correcto! Los coeficientes de x, y, z en la ecuación general son directamente las componentes del vector normal.' },
            { texto: 'n = (3, 4, 2)', correcta: false, feedback: 'Olvidaste el signo negativo del coeficiente de y (-4).' },
            { texto: 'n = (3, -4, -9)', correcta: false, feedback: '-9 es el término independiente D, no la componente z.' }
          ]
        },
        ejemplo: {
          enunciado: 'Hallar la ecuación del plano que pasa por P₀(1, 2, 3) y tiene vector normal n = (2, -1, 4).',
          pasos: [
            { paso: 'Coeficientes de variables', calculo: 'A = 2, B = -1, C = 4 ⟹ 2x - y + 4z + D = 0' },
            { paso: 'Cálculo de D evaluando en P₀', calculo: 'D = - [ 2(1) + (-1)(2) + 4(3) ] = - [ 2 - 2 + 12 ] = -12' },
            { paso: 'Ecuación general del plano', calculo: '2x - y + 4z - 12 = 0' }
          ],
          simulacion: { modo: 'puntos', datos: { ax: 0, ay: 0, az: 0, bx: 2, by: -1, bz: 4 } }
        }
      },

      {
        id: 'modo-papel-3d',
        numero: 16,
        dimension: '3d',
        categoria: 'Sistemas de Representación Técnica',
        titulo: 'Proyección Ortogonal Plana y Modo Papel Técnico (ℝ² ⊂ ℝ³)',
        subtitulo: 'Reducción diédrica y representación del espacio tridimensional sobre una hoja de papel.',
        resumen: 'Comprende cómo los sistemas CAD y los planos técnicos de ingeniería proyectan objetos tridimensionales en superficies bidimensionales.',
        concepto: {
          queEs: 'La proyección ortogonal plana es la transformación geométrica que mapea puntos y vectores del espacio tridimensional ℝ³ sobre un plano bidimensional (habitualmente el plano horizontal XY con cota z = 0). Esta técnica elimina la componente de profundidad o altura para permitir la lectura y acotación técnica sobre soporte plano (papel técnico o pantallas 2D).',
          paraQueSirve: 'Es la base del sistema diédrico tradicional, planos de arquitectura, planos de despiece mecánico industrial e interfaces de visualización técnica donde se requiere medir distancias ortogonales sin distorsión de perspectiva.',
          significadoFisico: 'Representa la sombra exacta que proyectaría un objeto 3D iluminado por una fuente de luz cenital con rayos paralelos situados en el infinito.'
        },
        variables: [
          { simbolo: 'P(x, y, z) → P\'(x, y, 0)', nombre: 'Proyector ortogonal a XY', descripcion: 'Transformación lineal que anula la cota vertical preservando las coordenadas del plano.' },
          { simbolo: 'v_proy = (vx, vy, 0)', nombre: 'Vector proyectado plano', descripcion: 'Sombra del vector espacial sobre la lámina horizontal.' },
          { simbolo: 'cota z', nombre: 'Cota de altura', descripcion: 'Distancia perpendicular que separa el punto original de su traza proyectada.' }
        ],
        formula: '$$\\Pi_{XY}: \\mathbb{R}^3 \\to \\mathbb{R}^2, \\quad \\Pi_{XY}(v_x, v_y, v_z) = (v_x, v_y) \\quad \\Big( \\|\\vec{v}_{\\text{proy}}\\| \\le \\|\\vec{v}\\| \\Big)$$',
        formulaNota: 'La longitud proyectada sobre el plano es siempre menor o igual que la longitud real en el espacio; solo son iguales si el vector es estrictamente horizontal (vz = 0).',
        demostracion: {
          titulo: 'Demostración de que la norma proyectada es acotada superiormente por la norma espacial',
          pasos: [
            { paso: 'Norma del vector espacial', detalle: '||v||² = vx² + vy² + vz².' },
            { paso: 'Norma de la proyección en el plano XY', detalle: '||v_proy||² = vx² + vy².' },
            { paso: 'Comparación por resta', detalle: '||v||² - ||v_proy||² = vz² ≥ 0 para todo vz real.' },
            { paso: 'Conclusión geométrica', detalle: '||v_proy|| ≤ ||v||, cumpliéndose la igualdad estricta si y solo si vz = 0. Queda demostrado.' }
          ]
        },
        algoritmoPasos: [
          { paso: 1, titulo: 'Identificar las tres componentes espaciales', detalle: 'Anota vx, vy y vz.' },
          { paso: 2, titulo: 'Aplicar la traza sobre el plano XY', detalle: 'Preserva vx y vy, haciendo vz = 0.' },
          { paso: 3, titulo: 'Calcular la norma del vector proyectado', detalle: '||v_proy|| = √(vx² + vy²).' },
          { paso: 4, titulo: 'Trazar las líneas de cota punteadas', detalle: 'Dibuja el segmento vertical de altura |vz| que conecta el extremo espacial con su sombra en el plano de papel.' }
        ],
        erroresComunes: [
          { error: 'Creer que la longitud medida en el plano es la longitud real del vector', porqueOcurre: 'Ignorar el escorzo perspectivo y la cota vertical vz.', solucionCorrecta: 'Si el vector tiene inclinación (vz ≠ 0), la medida en el plano es un escorzo menor a la longitud real.' },
          { error: 'Confundir vista en planta con vista diédrica de alzado', porqueOcurre: 'Planta proyecta sobre z=0, alzado proyecta sobre y=0.', solucionCorrecta: 'La vista estándar de papel de VectorLab es la planta horizontal (z = 0).' }
        ],
        guiaSimulador: [
          { paso: 1, accion: 'En el Espacio ℝ³, haz clic en el botón "Modo Papel" del HUD', resultadoEsperado: 'La cámara 3D se alinea en vista cenital perpendicular (Pitch = 90°), convirtiendo el espacio en un plano diédrico técnico.' },
          { paso: 2, accion: 'Observa la cuadrícula de papel milimetrado', resultadoEsperado: 'El fondo cambia a estética de papel técnico con cotas de ingeniería.' },
          { paso: 3, accion: 'Mueve el ratón para rotar la cámara fuera del modo papel', resultadoEsperado: 'Vuelve suavemente a la perspectiva axonométrica orbital con profundidad tridimensional.' }
        ],
        checkpoint: {
          pregunta: 'Un vector espacial mide ||v|| = 10 unidades y su cota vertical es vz = 6. ¿Cuánto mide su sombra proyectada sobre el plano XY?',
          opciones: [
            { texto: '||v_proy|| = 8 unidades', correcta: true, feedback: '¡Excelente! ||v||² = ||v_proy||² + vz² ⟹ 10² = ||v_proy||² + 6² ⟹ 100 = ||v_proy||² + 36 ⟹ ||v_proy|| = √64 = 8.' },
            { texto: '||v_proy|| = 4 unidades', correcta: false, feedback: 'Restaste 10 - 6 = 4 aritméticamente, ignorando la relación pitagórica.' },
            { texto: '||v_proy|| = 10 unidades', correcta: false, feedback: 'La sombra solo mediría 10 si el vector fuera totalmente horizontal (vz = 0).' }
          ]
        },
        ejemplo: {
          enunciado: 'Calcular la proyección sobre el plano XY del vector espacial v = (4, 3, 12) y su reducción de longitud.',
          pasos: [
            { paso: 'Vector proyectado', calculo: 'v_proy = (4, 3, 0)' },
            { paso: 'Módulo del vector proyectado', calculo: '||v_proy|| = √(4² + 3²) = √25 = 5.00 u' },
            { paso: 'Módulo del vector real en ℝ³', calculo: '||v|| = √(4² + 3² + 12²) = √(25 + 144) = √169 = 13.00 u' },
            { paso: 'Factor de acortamiento por escorzo', calculo: 'Escorzo = 5.00 / 13.00 ≈ 0.385 (38.5% de la longitud real)' }
          ],
          simulacion: { modo: 'puntos', datos: { ax: 0, ay: 0, az: 0, bx: 4, by: 3, bz: 12 } }
        }
      }
    ];
  }

  /**
   * Obtiene un tema por su ID único.
   * @param {string} id
   * @returns {Object|null}
   */
  static obtenerPorId(id) {
    const temas = this.obtenerTemas();
    return temas.find(t => t.id === id) || null;
  }

  /**
   * Filtra temas por dimensión ('2d' o '3d').
   * @param {string} dimension
   * @returns {Array<Object>}
   */
  static obtenerPorDimension(dimension) {
    const temas = this.obtenerTemas();
    return temas.filter(t => t.dimension === dimension);
  }

  /**
   * Alias de compatibilidad para obtenerPorDimension.
   * @param {string} dimension
   * @returns {Array<Object>}
   */
  static obtenerTemasPorDimension(dimension) {
    return this.obtenerPorDimension(dimension);
  }

  /**
   * Busca temas por texto clave y dimensión opcional.
   * @param {string} termino
   * @param {string} [dimension]
   * @returns {Array<Object>}
   */
  static buscar(termino, dimension) {
    const temas = dimension ? this.obtenerPorDimension(dimension) : this.obtenerTemas();
    if (!termino || !termino.trim()) return temas;
    const q = termino.toLowerCase().trim();
    return temas.filter(t =>
      (t.titulo && t.titulo.toLowerCase().includes(q)) ||
      (t.subtitulo && t.subtitulo.toLowerCase().includes(q)) ||
      (t.resumen && t.resumen.toLowerCase().includes(q)) ||
      (t.categoria && t.categoria.toLowerCase().includes(q)) ||
      (t.formula && t.formula.toLowerCase().includes(q)) ||
      (t.concepto?.queEs && t.concepto.queEs.toLowerCase().includes(q))
    );
  }
}
