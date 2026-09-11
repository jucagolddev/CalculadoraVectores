/**
 * Componente interactivo para Mini-Laboratorios Geométricos SVG embebidos
 * en las tarjetas teóricas de VectorLab.
 * Permite experimentar en vivo sin abandonar el flujo de lectura.
 */
export class MiniLaboratorioTeoria {
  /**
   * Renderiza el mini-laboratorio correspondiente dentro del contenedor.
   * @param {HTMLElement} contenedor - Contenedor del widget
   * @param {string} tipo - Tipo de mini-lab ('producto-escalar', 'suma-concurrente', 'unitario-trig', 'producto-vectorial', 'proyeccion-ortogonal', 'dependencia-lineal')
   */
  static renderizar(contenedor, tipo) {
    if (!contenedor) return;

    switch (tipo) {
      case 'producto-escalar':
        this._renderizarProductoEscalar(contenedor);
        break;
      case 'suma-concurrente':
        this._renderizarSumaConcurrente(contenedor);
        break;
      case 'unitario-trig':
        this._renderizarUnitarioTrig(contenedor);
        break;
      case 'producto-vectorial':
        this._renderizarProductoVectorial(contenedor);
        break;
      case 'proyeccion-ortogonal':
        this._renderizarProyeccionOrtogonal(contenedor);
        break;
      case 'dependencia-lineal':
        this._renderizarDependenciaLineal(contenedor);
        break;
      default:
        contenedor.innerHTML = '';
        break;
    }
  }

  /**
   * 1. Mini-Lab: Producto Escalar Dinámico y Variación Angular
   */
  static _renderizarProductoEscalar(contenedor) {
    contenedor.innerHTML = `
      <div class="minilab-tarjeta">
        <div class="minilab-cabecera">
          <span class="minilab-icono">⚡</span>
          <div>
            <h4 class="minilab-titulo">Laboratorio Interactivo: Producto Escalar y Ángulo θ</h4>
            <p class="minilab-descripcion">Mueve el deslizador angular para comprobar cómo cambia u · v según la inclinación entre los vectores.</p>
          </div>
        </div>

        <div class="minilab-cuerpo-grid">
          <div class="minilab-svg-caja">
            <svg id="svg-lab-dot" viewBox="0 0 320 220" class="minilab-svg">
              <defs>
                <marker id="flecha-u" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                  <polygon points="0 0, 7 3.5, 0 7" fill="#38bdf8" />
                </marker>
                <marker id="flecha-v" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                  <polygon points="0 0, 7 3.5, 0 7" fill="#f59e0b" />
                </marker>
              </defs>
              <!-- Ejes guía tenue -->
              <line x1="20" y1="170" x2="300" y2="170" stroke="#334155" stroke-width="1" stroke-dasharray="3,3" />
              <line x1="160" y1="20" x2="160" y2="200" stroke="#334155" stroke-width="1" stroke-dasharray="3,3" />
              <!-- Origen O -->
              <circle cx="160" cy="170" r="4" fill="#94a3b8" />
              <!-- Arco angular -->
              <path id="svg-dot-arco" d="" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" stroke-width="1.5" />
              <text id="svg-dot-txt-theta" x="185" y="155" fill="#f59e0b" font-size="11" font-weight="bold">θ = 60°</text>
              <!-- Vector fijo u (horizontal hacia la derecha) -->
              <line x1="160" y1="170" x2="260" y2="170" stroke="#38bdf8" stroke-width="3" marker-end="url(#flecha-u)" />
              <text x="265" y="174" fill="#38bdf8" font-size="12" font-weight="bold">u (||u||=4)</text>
              <!-- Sombra proyectada -->
              <line id="svg-dot-proy" x1="160" y1="170" x2="210" y2="170" stroke="#a855f7" stroke-width="4" stroke-linecap="round" opacity="0.6" />
              <line id="svg-dot-guia-proy" x1="210" y1="83" x2="210" y2="170" stroke="#a855f7" stroke-width="1" stroke-dasharray="2,2" />
              <!-- Vector móvil v -->
              <line id="svg-dot-v" x1="160" y1="170" x2="210" y2="83" stroke="#f59e0b" stroke-width="3" marker-end="url(#flecha-v)" />
              <text id="svg-dot-txt-v" x="215" y="80" fill="#f59e0b" font-size="12" font-weight="bold">v (||v||=4)</text>
            </svg>
          </div>

          <div class="minilab-panel-control">
            <div class="minilab-control-grupo">
              <label for="slider-dot-theta" class="minilab-etiqueta-slider">
                <span>Ángulo entre vectores (θ):</span>
                <strong id="badge-dot-theta" class="minilab-valor-resaltado">60°</strong>
              </label>
              <input type="range" id="slider-dot-theta" min="0" max="180" value="60" step="1" class="minilab-slider" />
            </div>

            <div class="minilab-botones-preset">
              <button type="button" class="btn-preset-dot" data-theta="0">0° (Paralelos)</button>
              <button type="button" class="btn-preset-dot" data-theta="60">60° (Agudo)</button>
              <button type="button" class="btn-preset-dot" data-theta="90">90° (Ortogonales)</button>
              <button type="button" class="btn-preset-dot" data-theta="120">120° (Obtuso)</button>
              <button type="button" class="btn-preset-dot" data-theta="180">180° (Opuestos)</button>
            </div>

            <div class="minilab-metricas-caja">
              <div class="metrica-item">
                <span class="metrica-lbl">cos(θ):</span>
                <span id="txt-dot-cos" class="metrica-val">0.500</span>
              </div>
              <div class="metrica-item">
                <span class="metrica-lbl">u · v = ||u||·||v||·cos(θ):</span>
                <strong id="txt-dot-resultado" class="metrica-val metrica-val-grande text-cian">+8.00</strong>
              </div>
              <div id="badge-dot-estado" class="minilab-badge-estado badge-positivo">
                Ángulo Agudo: Trabajo Mecánico Positivo (Energía a favor)
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const slider = contenedor.querySelector('#slider-dot-theta');
    const badgeTheta = contenedor.querySelector('#badge-dot-theta');
    const txtCos = contenedor.querySelector('#txt-dot-cos');
    const txtResultado = contenedor.querySelector('#txt-dot-resultado');
    const badgeEstado = contenedor.querySelector('#badge-dot-estado');
    const svgV = contenedor.querySelector('#svg-dot-v');
    const svgTxtV = contenedor.querySelector('#svg-dot-txt-v');
    const svgArco = contenedor.querySelector('#svg-dot-arco');
    const svgTxtTheta = contenedor.querySelector('#svg-dot-txt-theta');
    const svgProy = contenedor.querySelector('#svg-dot-proy');
    const svgGuiaProy = contenedor.querySelector('#svg-dot-guia-proy');

    const actualizar = (thetaDeg) => {
      const thetaRad = (thetaDeg * Math.PI) / 180;
      const cosVal = Math.cos(thetaRad);
      const dotVal = 4 * 4 * cosVal;

      badgeTheta.textContent = `${thetaDeg}° (${thetaRad.toFixed(2)} rad)`;
      txtCos.textContent = cosVal.toFixed(3);
      txtResultado.textContent = (dotVal >= 0 ? '+' : '') + dotVal.toFixed(2);

      // Coordenadas SVG (origen: 160, 170. Longitud vector = 100)
      const r = 100;
      const vx = 160 + r * Math.cos(thetaRad);
      const vy = 170 - r * Math.sin(thetaRad);

      svgV.setAttribute('x2', vx);
      svgV.setAttribute('y2', vy);
      svgTxtV.setAttribute('x', vx + 6);
      svgTxtV.setAttribute('y', vy - 4);

      // Proyección horizontal
      svgProy.setAttribute('x2', vx);
      svgGuiaProy.setAttribute('x1', vx);
      svgGuiaProy.setAttribute('y1', vy);
      svgGuiaProy.setAttribute('x2', vx);

      // Arco angular
      const rArco = 32;
      const arcX = 160 + rArco * Math.cos(thetaRad);
      const arcY = 170 - rArco * Math.sin(thetaRad);
      const largeArc = thetaDeg > 180 ? 1 : 0;
      svgArco.setAttribute('d', `M 160 170 L ${160 + rArco} 170 A ${rArco} ${rArco} 0 ${largeArc} 0 ${arcX} ${arcY} Z`);
      svgTxtTheta.textContent = `θ = ${thetaDeg}°`;

      // Estado cualitativo
      if (Math.abs(thetaDeg - 90) < 0.5) {
        badgeEstado.className = 'minilab-badge-estado badge-neutro';
        badgeEstado.textContent = '📐 Ortogonalidad Estricta: u · v = 0 (Vectores Perpendiculares)';
        txtResultado.className = 'metrica-val metrica-val-grande text-ambar';
      } else if (thetaDeg < 90) {
        badgeEstado.className = 'minilab-badge-estado badge-positivo';
        badgeEstado.textContent = '✨ Ángulo Agudo: u · v > 0 (Vectores colaboran en la misma dirección)';
        txtResultado.className = 'metrica-val metrica-val-grande text-cian';
      } else {
        badgeEstado.className = 'minilab-badge-estado badge-negativo';
        badgeEstado.textContent = '⚠️ Ángulo Obtuso: u · v < 0 (Vectores con componentes opuestas / Fuerza disipativa)';
        txtResultado.className = 'metrica-val metrica-val-grande text-violeta';
      }
    };

    slider.addEventListener('input', (e) => actualizar(Number(e.target.value)));

    contenedor.querySelectorAll('.btn-preset-dot').forEach((btn) => {
      btn.addEventListener('click', () => {
        const val = Number(btn.dataset.theta);
        slider.value = val;
        actualizar(val);
      });
    });

    actualizar(60);
  }

  /**
   * 2. Mini-Lab: Suma Concurrente (Regla del Paralelogramo vs Punta-Cola)
   */
  static _renderizarSumaConcurrente(contenedor) {
    contenedor.innerHTML = `
      <div class="minilab-tarjeta">
        <div class="minilab-cabecera">
          <span class="minilab-icono">📐</span>
          <div>
            <h4 class="minilab-titulo">Laboratorio Interactivo: Paralelogramo vs. Punta-Cola</h4>
            <p class="minilab-descripcion">Compara cómo la adición geométrica produce idéntico vector resultante sea por concurrencia o por encadenamiento.</p>
          </div>
        </div>

        <div class="minilab-cuerpo-grid">
          <div class="minilab-svg-caja">
            <svg id="svg-lab-suma" viewBox="0 0 340 240" class="minilab-svg">
              <defs>
                <marker id="flecha-suma-u" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#38bdf8" />
                </marker>
                <marker id="flecha-suma-v" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#f59e0b" />
                </marker>
                <marker id="flecha-suma-r" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                  <polygon points="0 0, 7 3.5, 0 7" fill="#10b981" />
                </marker>
              </defs>
              <!-- Ejes -->
              <line x1="30" y1="200" x2="310" y2="200" stroke="#334155" stroke-width="1" />
              <line x1="40" y1="30" x2="40" y2="210" stroke="#334155" stroke-width="1" />
              <circle cx="40" cy="200" r="3" fill="#94a3b8" />
              <text x="25" y="215" fill="#64748b" font-size="10">O(0,0)</text>

              <!-- Lineas punteadas del paralelogramo -->
              <g id="capa-paralelogramo">
                <line x1="160" y1="200" x2="240" y2="80" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.7" />
                <line x1="120" y1="80" x2="240" y2="80" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.7" />
                <polygon points="40 200, 160 200, 240 80, 120 80" fill="rgba(16, 185, 129, 0.08)" />
              </g>

              <!-- Vector u (40,200) -> (160,200) -->
              <line x1="40" y1="200" x2="160" y2="200" stroke="#38bdf8" stroke-width="3" marker-end="url(#flecha-suma-u)" />
              <text x="100" y="218" fill="#38bdf8" font-size="11" font-weight="bold">u = (4, 0)</text>

              <!-- Vector v en origen concurrente o trasladado -->
              <line id="svg-suma-v" x1="40" y1="200" x2="120" y2="80" stroke="#f59e0b" stroke-width="3" marker-end="url(#flecha-suma-v)" />
              <text id="svg-suma-txt-v" x="65" y="135" fill="#f59e0b" font-size="11" font-weight="bold">v = (2, 4)</text>

              <!-- Vector Resultante u + v (40,200) -> (240, 80) -->
              <line x1="40" y1="200" x2="240" y2="80" stroke="#10b981" stroke-width="3.5" marker-end="url(#flecha-suma-r)" />
              <text x="145" y="130" fill="#10b981" font-size="12" font-weight="bold">u + v = (6, 4)</text>
            </svg>
          </div>

          <div class="minilab-panel-control">
            <div class="minilab-selector-metodo" role="group" aria-label="Método de suma">
              <button type="button" id="btn-metodo-paralelogramo" class="btn-metodo activo">📐 Regla del Paralelogramo</button>
              <button type="button" id="btn-metodo-puntacola" class="btn-metodo">🏹 Método Punta-Cola</button>
            </div>

            <div class="minilab-caja-explicativa" id="txt-explicacion-suma">
              <strong>Modo Paralelogramo:</strong> Ambos vectores parten del mismo origen común. Trazando las paralelas por sus puntas se forma el romboide cuya diagonal principal representa la suma resultante.
            </div>

            <div class="minilab-metricas-caja">
              <div class="metrica-item">
                <span class="metrica-lbl">Vector u:</span>
                <span class="metrica-val text-cian">(4, 0) | ||u|| = 4.00</span>
              </div>
              <div class="metrica-item">
                <span class="metrica-lbl">Vector v:</span>
                <span class="metrica-val text-ambar">(2, 4) | ||v|| = 4.47</span>
              </div>
              <div class="metrica-item">
                <span class="metrica-lbl">Suma Resultante u + v:</span>
                <strong class="metrica-val text-esmeralda metrica-val-grande">(6, 4) | ||u + v|| = 7.21</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const btnParalelogramo = contenedor.querySelector('#btn-metodo-paralelogramo');
    const btnPuntaCola = contenedor.querySelector('#btn-metodo-puntacola');
    const capaParalelogramo = contenedor.querySelector('#capa-paralelogramo');
    const svgV = contenedor.querySelector('#svg-suma-v');
    const svgTxtV = contenedor.querySelector('#svg-suma-txt-v');
    const txtExplicacion = contenedor.querySelector('#txt-explicacion-suma');

    btnParalelogramo.addEventListener('click', () => {
      btnParalelogramo.classList.add('activo');
      btnPuntaCola.classList.remove('activo');
      capaParalelogramo.style.display = 'block';

      svgV.setAttribute('x1', '40');
      svgV.setAttribute('y1', '200');
      svgV.setAttribute('x2', '120');
      svgV.setAttribute('y2', '80');
      svgTxtV.setAttribute('x', '65');
      svgTxtV.setAttribute('y', '135');

      txtExplicacion.innerHTML = `<strong>Modo Paralelogramo:</strong> Ambos vectores parten del mismo origen común. Trazando las paralelas por sus puntas se forma el romboide cuya diagonal principal representa la suma resultante.`;
    });

    btnPuntaCola.addEventListener('click', () => {
      btnPuntaCola.classList.add('activo');
      btnParalelogramo.classList.remove('activo');
      capaParalelogramo.style.display = 'none';

      svgV.setAttribute('x1', '160');
      svgV.setAttribute('y1', '200');
      svgV.setAttribute('x2', '240');
      svgV.setAttribute('y2', '80');
      svgTxtV.setAttribute('x', '215');
      svgTxtV.setAttribute('y', '145');

      txtExplicacion.innerHTML = `<strong>Modo Punta-Cola:</strong> El vector v se traslada de forma paralela hasta situar su origen exactamente en el extremo de u. El vector suma conecta el origen de u con el extremo final de v.`;
    });
  }

  /**
   * 3. Mini-Lab: Vector Unitario y Círculo Trigonométrico
   */
  static _renderizarUnitarioTrig(contenedor) {
    contenedor.innerHTML = `
      <div class="minilab-tarjeta">
        <div class="minilab-cabecera">
          <span class="minilab-icono">🎯</span>
          <div>
            <h4 class="minilab-titulo">Laboratorio Interactivo: Normalización y Círculo Unitario</h4>
            <p class="minilab-descripcion">Modifica la longitud del vector para ver cómo al normalizarlo (u = v / ||v||) su extremo queda anclado exactamente en el círculo de radio 1.</p>
          </div>
        </div>

        <div class="minilab-cuerpo-grid">
          <div class="minilab-svg-caja">
            <svg id="svg-lab-unitario" viewBox="0 0 280 240" class="minilab-svg">
              <defs>
                <marker id="flecha-orig" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#38bdf8" />
                </marker>
                <marker id="flecha-unit" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                  <polygon points="0 0, 7 3.5, 0 7" fill="#facc15" />
                </marker>
              </defs>
              <line x1="20" y1="120" x2="260" y2="120" stroke="#334155" stroke-width="1" />
              <line x1="140" y1="20" x2="140" y2="220" stroke="#334155" stroke-width="1" />
              <circle cx="140" cy="120" r="60" fill="rgba(250, 204, 21, 0.06)" stroke="#facc15" stroke-width="1.5" stroke-dasharray="3,3" />
              <text x="205" y="115" fill="#facc15" font-size="10">Radio R = 1.0</text>
              <circle cx="140" cy="120" r="3" fill="#94a3b8" />

              <line id="svg-unit-v" x1="140" y1="120" x2="225" y2="55" stroke="#38bdf8" stroke-width="3" marker-end="url(#flecha-orig)" />
              <text id="svg-unit-txt-v" x="230" y="50" fill="#38bdf8" font-size="11" font-weight="bold">v</text>

              <line id="svg-unit-u" x1="140" y1="120" x2="188" y2="83" stroke="#facc15" stroke-width="3.5" marker-end="url(#flecha-unit)" />
              <text id="svg-unit-txt-u" x="195" y="90" fill="#facc15" font-size="11" font-weight="bold">û</text>
            </svg>
          </div>

          <div class="minilab-panel-control">
            <div class="minilab-control-grupo">
              <label for="slider-unit-norma" class="minilab-etiqueta-slider">
                <span>Módulo del vector original ||v||:</span>
                <strong id="badge-unit-norma" class="minilab-valor-resaltado">1.75</strong>
              </label>
              <input type="range" id="slider-unit-norma" min="0.5" max="2.6" value="1.75" step="0.05" class="minilab-slider" />
            </div>

            <div class="minilab-control-grupo">
              <label for="slider-unit-angulo" class="minilab-etiqueta-slider">
                <span>Ángulo de dirección (θ):</span>
                <strong id="badge-unit-angulo" class="minilab-valor-resaltado">38°</strong>
              </label>
              <input type="range" id="slider-unit-angulo" min="0" max="360" value="38" step="2" class="minilab-slider" />
            </div>

            <div class="minilab-metricas-caja">
              <div class="metrica-item">
                <span class="metrica-lbl">Vector original v:</span>
                <span id="txt-unit-val-v" class="metrica-val text-cian">(1.38, 1.08) | ||v|| = 1.75</span>
              </div>
              <div class="metrica-item">
                <span class="metrica-lbl">Vector unitario û = v / ||v||:</span>
                <strong id="txt-unit-val-u" class="metrica-val text-ambar metrica-val-grande">(0.788, 0.616) | ||û|| = 1.000</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const sliderNorma = contenedor.querySelector('#slider-unit-norma');
    const sliderAngulo = contenedor.querySelector('#slider-unit-angulo');
    const badgeNorma = contenedor.querySelector('#badge-unit-norma');
    const badgeAngulo = contenedor.querySelector('#badge-unit-angulo');
    const svgV = contenedor.querySelector('#svg-unit-v');
    const svgTxtV = contenedor.querySelector('#svg-unit-txt-v');
    const svgU = contenedor.querySelector('#svg-unit-u');
    const svgTxtU = contenedor.querySelector('#svg-unit-txt-u');
    const txtValV = contenedor.querySelector('#txt-unit-val-v');
    const txtValU = contenedor.querySelector('#txt-unit-val-u');

    const actualizar = () => {
      const norma = parseFloat(sliderNorma.value);
      const anguloDeg = parseFloat(sliderAngulo.value);
      const anguloRad = (anguloDeg * Math.PI) / 180;

      badgeNorma.textContent = norma.toFixed(2);
      badgeAngulo.textContent = `${anguloDeg}°`;

      const R_SVG = 60;
      const cosA = Math.cos(anguloRad);
      const sinA = Math.sin(anguloRad);

      const vx = 140 + norma * R_SVG * cosA;
      const vy = 120 - norma * R_SVG * sinA;
      svgV.setAttribute('x2', vx);
      svgV.setAttribute('y2', vy);
      svgTxtV.setAttribute('x', vx + 5);
      svgTxtV.setAttribute('y', vy - 3);

      const ux = 140 + R_SVG * cosA;
      const uy = 120 - R_SVG * sinA;
      svgU.setAttribute('x2', ux);
      svgU.setAttribute('y2', uy);
      svgTxtU.setAttribute('x', ux + 5);
      svgTxtU.setAttribute('y', uy - 3);

      const compVx = (norma * cosA).toFixed(2);
      const compVy = (norma * sinA).toFixed(2);
      txtValV.textContent = `(${compVx}, ${compVy}) | ||v|| = ${norma.toFixed(2)}`;

      const compUx = cosA.toFixed(3);
      const compUy = sinA.toFixed(3);
      txtValU.textContent = `(${compUx}, ${compUy}) | ||û|| = 1.000`;
    };

    sliderNorma.addEventListener('input', actualizar);
    sliderAngulo.addEventListener('input', actualizar);
    actualizar();
  }

  /**
   * 4. Mini-Lab: Producto Vectorial 3D y Anticonmutatividad
   */
  static _renderizarProductoVectorial(contenedor) {
    contenedor.innerHTML = `
      <div class="minilab-tarjeta">
        <div class="minilab-cabecera">
          <span class="minilab-icono">🌀</span>
          <div>
            <h4 class="minilab-titulo">Laboratorio Interactivo: Producto Vectorial (u × v) y Regla de la Mano Derecha</h4>
            <p class="minilab-descripcion">Comprueba la perpendicularidad estricta y cómo invertir el orden de los factores (v × u) gira el vector exactamente 180° hacia abajo.</p>
          </div>
        </div>

        <div class="minilab-cuerpo-grid">
          <div class="minilab-svg-caja">
            <svg id="svg-lab-cross" viewBox="0 0 320 250" class="minilab-svg">
              <defs>
                <marker id="flecha-cross-u" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#38bdf8" />
                </marker>
                <marker id="flecha-cross-v" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#f59e0b" />
                </marker>
                <marker id="flecha-cross-w" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                  <polygon points="0 0, 7 3.5, 0 7" fill="#f87171" />
                </marker>
              </defs>
              <polygon points="160 145, 250 160, 200 120, 110 105" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="1.5" stroke-dasharray="2,2" />
              <text x="180" y="142" fill="#10b981" font-size="10" font-weight="bold">Área = ||u × v||</text>

              <circle cx="160" cy="145" r="3" fill="#94a3b8" />

              <line x1="160" y1="145" x2="250" y2="160" stroke="#38bdf8" stroke-width="3" marker-end="url(#flecha-cross-u)" />
              <text x="255" y="165" fill="#38bdf8" font-size="11" font-weight="bold">u</text>

              <line x1="160" y1="145" x2="110" y2="105" stroke="#f59e0b" stroke-width="3" marker-end="url(#flecha-cross-v)" />
              <text x="95" y="105" fill="#f59e0b" font-size="11" font-weight="bold">v</text>

              <line id="svg-cross-w" x1="160" y1="145" x2="160" y2="45" stroke="#f87171" stroke-width="4" marker-end="url(#flecha-cross-w)" />
              <text id="svg-cross-txt-w" x="168" y="45" fill="#f87171" font-size="12" font-weight="bold">w = u × v (Hacia Arriba)</text>
              <path id="svg-cross-recto" d="M 160 125 L 175 127 L 175 147" fill="none" stroke="#f87171" stroke-width="1" />
            </svg>
          </div>

          <div class="minilab-panel-control">
            <div class="minilab-selector-metodo" role="group" aria-label="Orden de los factores">
              <button type="button" id="btn-orden-uxv" class="btn-metodo activo">u × v (Regla de la Mano Derecha)</button>
              <button type="button" id="btn-orden-vxu" class="btn-metodo">v × u (Invertir Sentido: -[u × v])</button>
            </div>

            <div class="minilab-caja-explicativa" id="txt-explicacion-cross">
              <strong>Sentido Positivo (Hacia Arriba):</strong> Al girar los dedos de la mano derecha desde el vector u hacia el vector v por el camino más corto, el pulgar extendido apunta perpendicularmente hacia arriba.
            </div>

            <div class="minilab-metricas-caja">
              <div class="metrica-item">
                <span class="metrica-lbl">Propiedad Fundamental:</span>
                <strong class="metrica-val text-coral">Anticonmutatividad: v × u = -(u × v)</strong>
              </div>
              <div class="metrica-item">
                <span class="metrica-lbl">Ángulo con los vectores base:</span>
                <span class="metrica-val text-esmeralda">w ⊥ u (90°) y w ⊥ v (90°)</span>
              </div>
              <div class="metrica-item">
                <span class="metrica-lbl">Magnitud física del módulo:</span>
                <span class="metrica-val text-cian">||u × v|| = Área del paralelogramo sustentado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const btnUxV = contenedor.querySelector('#btn-orden-uxv');
    const btnVxU = contenedor.querySelector('#btn-orden-vxu');
    const svgW = contenedor.querySelector('#svg-cross-w');
    const svgTxtW = contenedor.querySelector('#svg-cross-txt-w');
    const txtExplicacion = contenedor.querySelector('#txt-explicacion-cross');
    const svgRecto = contenedor.querySelector('#svg-cross-recto');

    btnUxV.addEventListener('click', () => {
      btnUxV.classList.add('activo');
      btnVxU.classList.remove('activo');
      svgW.setAttribute('y2', '45');
      svgTxtW.setAttribute('y', '45');
      svgTxtW.textContent = 'w = u × v (Hacia Arriba)';
      svgRecto.setAttribute('d', 'M 160 125 L 175 127 L 175 147');
      txtExplicacion.innerHTML = `<strong>Sentido Positivo (Hacia Arriba):</strong> Al girar los dedos de la mano derecha desde el vector u hacia el vector v por el camino más corto, el pulgar extendido apunta perpendicularmente hacia arriba.`;
    });

    btnVxU.addEventListener('click', () => {
      btnVxU.classList.add('activo');
      btnUxV.classList.remove('activo');
      svgW.setAttribute('y2', '235');
      svgTxtW.setAttribute('y', '240');
      svgTxtW.textContent = 'w = v × u = -(u × v) (Hacia Abajo)';
      svgRecto.setAttribute('d', 'M 160 165 L 175 167 L 175 147');
      txtExplicacion.innerHTML = `<strong>Sentido Opuesto (Hacia Abajo):</strong> Al invertir el orden y girar desde v hacia u, la mano se invierte y el pulgar apunta hacia abajo. ¡El módulo y la dirección se mantienen, pero el sentido se invierte 180°!`;
    });
  }

  /**
   * 5. Mini-Lab: Proyección Ortogonal
   */
  static _renderizarProyeccionOrtogonal(contenedor) {
    contenedor.innerHTML = `
      <div class="minilab-tarjeta">
        <div class="minilab-cabecera">
          <span class="minilab-icono">📐</span>
          <div>
            <h4 class="minilab-titulo">Laboratorio Interactivo: Proyección Ortogonal de un Vector</h4>
            <p class="minilab-descripcion">Visualiza la descomposición de u en su componente paralela a v (sombra) y su componente perpendicular ortogonal.</p>
          </div>
        </div>

        <div class="minilab-cuerpo-grid">
          <div class="minilab-svg-caja">
            <svg id="svg-lab-proy" viewBox="0 0 320 220" class="minilab-svg">
              <defs>
                <marker id="flecha-proy-u" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#38bdf8" />
                </marker>
                <marker id="flecha-proy-v" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#64748b" />
                </marker>
                <marker id="flecha-proy-sombra" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#f59e0b" />
                </marker>
              </defs>
              <circle cx="40" cy="180" r="3" fill="#94a3b8" />
              <line x1="40" y1="180" x2="280" y2="180" stroke="#64748b" stroke-width="2" marker-end="url(#flecha-proy-v)" />
              <text x="285" y="184" fill="#64748b" font-size="11">v (Eje)</text>

              <line id="svg-proy-u" x1="40" y1="180" x2="180" y2="60" stroke="#38bdf8" stroke-width="3" marker-end="url(#flecha-proy-u)" />
              <text id="svg-proy-txt-u" x="185" y="55" fill="#38bdf8" font-size="11" font-weight="bold">u</text>

              <line id="svg-proy-caida" x1="180" y1="60" x2="180" y2="180" stroke="#c084fc" stroke-width="1.5" stroke-dasharray="3,3" />
              <path id="svg-proy-recto" d="M 170 180 L 170 170 L 180 170" fill="none" stroke="#c084fc" stroke-width="1" />
              <text id="svg-proy-txt-perp" x="185" y="120" fill="#c084fc" font-size="10">u⊥ (ortogonal)</text>

              <line id="svg-proy-sombra" x1="40" y1="180" x2="180" y2="180" stroke="#f59e0b" stroke-width="4" marker-end="url(#flecha-proy-sombra)" />
              <text id="svg-proy-txt-sombra" x="90" y="200" fill="#f59e0b" font-size="11" font-weight="bold">proy_v(u)</text>
            </svg>
          </div>

          <div class="minilab-panel-control">
            <div class="minilab-control-grupo">
              <label for="slider-proy-angulo" class="minilab-etiqueta-slider">
                <span>Inclinación de u (θ):</span>
                <strong id="badge-proy-angulo" class="minilab-valor-resaltado">40°</strong>
              </label>
              <input type="range" id="slider-proy-angulo" min="15" max="165" value="40" step="1" class="minilab-slider" />
            </div>

            <div class="minilab-metricas-caja">
              <div class="metrica-item">
                <span class="metrica-lbl">Magnitud de la Sombra ||proy_v(u)||:</span>
                <strong id="txt-proy-longitud" class="metrica-val text-ambar metrica-val-grande">3.06 u</strong>
              </div>
              <div class="metrica-item">
                <span class="metrica-lbl">Fórmula Vectorial de Proyección:</span>
                <span class="metrica-val text-cian">proy_v(u) = ((u · v) / ||v||²) · v</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const slider = contenedor.querySelector('#slider-proy-angulo');
    const badge = contenedor.querySelector('#badge-proy-angulo');
    const svgU = contenedor.querySelector('#svg-proy-u');
    const svgTxtU = contenedor.querySelector('#svg-proy-txt-u');
    const svgCaida = contenedor.querySelector('#svg-proy-caida');
    const svgSombra = contenedor.querySelector('#svg-proy-sombra');
    const svgTxtSombra = contenedor.querySelector('#svg-proy-txt-sombra');
    const svgRecto = contenedor.querySelector('#svg-proy-recto');
    const svgTxtPerp = contenedor.querySelector('#svg-proy-txt-perp');
    const txtLongitud = contenedor.querySelector('#txt-proy-longitud');

    const actualizar = (anguloDeg) => {
      const anguloRad = (anguloDeg * Math.PI) / 180;
      badge.textContent = `${anguloDeg}°`;

      const R = 150;
      const px = 40 + R * Math.cos(anguloRad);
      const py = 180 - R * Math.sin(anguloRad);

      svgU.setAttribute('x2', px);
      svgU.setAttribute('y2', py);
      svgTxtU.setAttribute('x', px + 5);
      svgTxtU.setAttribute('y', py - 5);

      svgCaida.setAttribute('x1', px);
      svgCaida.setAttribute('y1', py);
      svgCaida.setAttribute('x2', px);
      svgTxtPerp.setAttribute('x', px + 5);
      svgTxtPerp.setAttribute('y', (py + 180) / 2);

      svgSombra.setAttribute('x2', px);
      svgTxtSombra.setAttribute('x', (40 + px) / 2 - 25);

      const rX = px > 40 ? px - 10 : px + 10;
      svgRecto.setAttribute('d', `M ${rX} 180 L ${rX} 170 L ${px} 170`);

      const longProy = (R / 37.5) * Math.cos(anguloRad);
      txtLongitud.textContent = `${Math.abs(longProy).toFixed(2)} u ${longProy < 0 ? '(Sentido opuesto)' : ''}`;
    };

    slider.addEventListener('input', (e) => actualizar(Number(e.target.value)));
    actualizar(40);
  }

  /**
   * 6. Mini-Lab: Dependencia Lineal y Determinante 2x2
   */
  static _renderizarDependenciaLineal(contenedor) {
    contenedor.innerHTML = `
      <div class="minilab-tarjeta">
        <div class="minilab-cabecera">
          <span class="minilab-icono">📊</span>
          <div>
            <h4 class="minilab-titulo">Laboratorio Interactivo: Dependencia Lineal y Determinante 2×2</h4>
            <p class="minilab-descripcion">Descubre cómo cuando dos vectores son colineales, el determinante det(u, v) y el área generada colapsan exactamente a cero.</p>
          </div>
        </div>

        <div class="minilab-cuerpo-grid">
          <div class="minilab-svg-caja">
            <svg id="svg-lab-det" viewBox="0 0 300 220" class="minilab-svg">
              <defs>
                <marker id="flecha-det-u" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#38bdf8" />
                </marker>
                <marker id="flecha-det-v" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#f59e0b" />
                </marker>
              </defs>
              <line x1="20" y1="180" x2="280" y2="180" stroke="#334155" stroke-width="1" />
              <line x1="40" y1="20" x2="40" y2="200" stroke="#334155" stroke-width="1" />

              <polygon id="svg-det-area" points="" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" stroke-width="1" stroke-dasharray="2,2" />

              <line x1="40" y1="180" x2="160" y2="180" stroke="#38bdf8" stroke-width="3" marker-end="url(#flecha-det-u)" />
              <text x="165" y="184" fill="#38bdf8" font-size="11" font-weight="bold">u = (4, 0)</text>

              <line id="svg-det-v" x1="40" y1="180" x2="120" y2="80" stroke="#f59e0b" stroke-width="3" marker-end="url(#flecha-det-v)" />
              <text id="svg-det-txt-v" x="125" y="75" fill="#f59e0b" font-size="11" font-weight="bold">v</text>
            </svg>
          </div>

          <div class="minilab-panel-control">
            <div class="minilab-control-grupo">
              <label class="minilab-checkbox-label">
                <input type="checkbox" id="chk-det-colineal" />
                <span>Forzar Colinealidad Estricta (v = k · u)</span>
              </label>
            </div>

            <div class="minilab-control-grupo">
              <label for="slider-det-vy" class="minilab-etiqueta-slider">
                <span>Componente vertical vy:</span>
                <strong id="badge-det-vy" class="minilab-valor-resaltado">3.0</strong>
              </label>
              <input type="range" id="slider-det-vy" min="0" max="4" value="3" step="0.2" class="minilab-slider" />
            </div>

            <div class="minilab-metricas-caja">
              <div class="metrica-item">
                <span class="metrica-lbl">Determinante 2×2: | ux uy | / | vx vy |:</span>
                <strong id="txt-det-val" class="metrica-val metrica-val-grande text-cian">12.00</strong>
              </div>
              <div id="badge-det-estado" class="minilab-badge-estado badge-positivo">
                Vectores Linealmente Independientes (Generan una base en ℝ²)
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const chkColineal = contenedor.querySelector('#chk-det-colineal');
    const sliderVy = contenedor.querySelector('#slider-det-vy');
    const badgeVy = contenedor.querySelector('#badge-det-vy');
    const svgV = contenedor.querySelector('#svg-det-v');
    const svgTxtV = contenedor.querySelector('#svg-det-txt-v');
    const svgArea = contenedor.querySelector('#svg-det-area');
    const txtDet = contenedor.querySelector('#txt-det-val');
    const badgeEstado = contenedor.querySelector('#badge-det-estado');

    const actualizar = () => {
      let vy = parseFloat(sliderVy.value);
      if (chkColineal.checked) {
        vy = 0;
        sliderVy.value = 0;
        sliderVy.disabled = true;
      } else {
        sliderVy.disabled = false;
      }

      badgeVy.textContent = vy.toFixed(1);

      const ux = 4, uy = 0;
      const vx = 2;
      const det = ux * vy - uy * vx;

      txtDet.textContent = det.toFixed(2);

      const vSvgX = 40 + vx * 30;
      const vSvgY = 180 - vy * 30;
      svgV.setAttribute('x2', vSvgX);
      svgV.setAttribute('y2', vSvgY);
      svgTxtV.setAttribute('x', vSvgX + 5);
      svgTxtV.setAttribute('y', vSvgY - 5);
      svgTxtV.textContent = `v = (${vx}, ${vy.toFixed(1)})`;

      const uSvgX = 40 + ux * 30;
      const diagX = uSvgX + vx * 30;
      const diagY = 180 - vy * 30;

      svgArea.setAttribute('points', `40 180, ${uSvgX} 180, ${diagX} ${diagY}, ${vSvgX} ${vSvgY}`);

      if (Math.abs(det) < 0.001) {
        badgeEstado.className = 'minilab-badge-estado badge-negativo';
        badgeEstado.textContent = '❌ Linealmente Dependientes (Colineales): det = 0. No forman base ni área.';
        txtDet.className = 'metrica-val metrica-val-grande text-ambar';
      } else {
        badgeEstado.className = 'minilab-badge-estado badge-positivo';
        badgeEstado.textContent = '✅ Linealmente Independientes: det ≠ 0. Generan todo el plano ℝ².';
        txtDet.className = 'metrica-val metrica-val-grande text-cian';
      }
    };

    sliderVy.addEventListener('input', actualizar);
    chkColineal.addEventListener('change', actualizar);
    actualizar();
  }
}
