import { TransformadorCoordenadas } from './TransformadorCoordenadas.js';
import { Configuracion } from '../../core/constants/Configuracion.js';

/**
 * Motor de renderizado en Canvas 2D desacoplado y orientado a visualización vectorial.
 */
export class PlanoCartesiano {
  /**
   * @param {HTMLCanvasElement} lienzo
   */
  constructor(lienzo) {
    this._lienzo = lienzo;
    this._ctx = lienzo.getContext('2d');

    this._origenX = lienzo.width / 2;
    this._origenY = lienzo.height / 2;
    this._escala = Configuracion.ESCALA_INICIAL_PX;

    this._transformador = new TransformadorCoordenadas(this._origenX, this._origenY, this._escala);

    this._vectores = [];
    this._puntos = [];
    this._modoGeometrico = 'ninguno';
    this._mostrarVectores = true;
    this._mostrarPuntos = true;
    this._mostrarEtiquetas = true;
    this._mostrarConstrucciones = true;
    this._mostrarEjes = true;
    this._mostrarProyecciones = true;
    this._mostrarCuadricula = true;

    this._arrastrando = false;
    this._ultimoRatonX = 0;
    this._ultimoRatonY = 0;
    this._notificadorCursor = null;

    this._inicializarEventos();
    this.ajustarResolucion();
  }

  alMoverCursor(callback) {
    this._notificadorCursor = callback;
  }

  ajustarResolucion() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this._lienzo.getBoundingClientRect();
    const anchoLogico = rect.width > 0 ? rect.width : 800;
    const altoLogico = rect.height > 0 ? rect.height : 600;

    this._lienzo.width = Math.round(anchoLogico * dpr);
    this._lienzo.height = Math.round(altoLogico * dpr);

    this._ctx.setTransform(1, 0, 0, 1, 0, 0);
    this._ctx.scale(dpr, dpr);

    if (this._origenX === 0 && this._origenY === 0) {
      this._origenX = anchoLogico / 2;
      this._origenY = altoLogico / 2;
      this._actualizarTransformador();
    }

    this.renderizar();
  }

  _actualizarTransformador() {
    this._transformador.origenX = this._origenX;
    this._transformador.origenY = this._origenY;
    this._transformador.escala = this._escala;
  }

  pantallaAMundo(px, py) {
    return this._transformador.pantallaAMundo(px, py);
  }

  mundoAPantalla(mx, my) {
    return this._transformador.mundoAPantalla(mx, my);
  }

  actualizarElementos(vectores, puntos = [], modoGeometrico = 'ninguno') {
    this._vectores = Array.isArray(vectores) ? vectores : [];
    this._puntos = Array.isArray(puntos) ? puntos : [];
    this._modoGeometrico = modoGeometrico;
    this.renderizar();
  }

  establecerProyeccionesVisibles(visible) {
    this._mostrarProyecciones = Boolean(visible);
    this.renderizar();
  }

  establecerCuadriculaVisible(visible) {
    this._mostrarCuadricula = Boolean(visible);
    this.renderizar();
  }

  establecerVectoresVisibles(visible) {
    this._mostrarVectores = Boolean(visible);
    this.renderizar();
  }

  establecerPuntosVisibles(visible) {
    this._mostrarPuntos = Boolean(visible);
    this.renderizar();
  }

  establecerEtiquetasVisibles(visible) {
    this._mostrarEtiquetas = Boolean(visible);
    this.renderizar();
  }

  establecerConstruccionesVisibles(visible) {
    this._mostrarConstrucciones = Boolean(visible);
    this.renderizar();
  }

  establecerEjesVisibles(visible) {
    this._mostrarEjes = Boolean(visible);
    this.renderizar();
  }

  alternarTodoElGrafo(visible) {
    const nuevoEstado = (visible !== undefined) ? Boolean(visible) : !this.estanElementosVisibles();
    this._mostrarVectores = nuevoEstado;
    this._mostrarPuntos = nuevoEstado;
    this._mostrarEtiquetas = nuevoEstado;
    this._mostrarConstrucciones = nuevoEstado;
    this._mostrarProyecciones = nuevoEstado;
    this.renderizar();
    return nuevoEstado;
  }

  estanElementosVisibles() {
    return this._mostrarVectores || this._mostrarPuntos || this._mostrarConstrucciones;
  }

  obtenerEstadoCapas() {
    return {
      todo: this.estanElementosVisibles(),
      vectores: this._mostrarVectores,
      puntos: this._mostrarPuntos,
      etiquetas: this._mostrarEtiquetas,
      construcciones: this._mostrarConstrucciones,
      proyecciones: this._mostrarProyecciones,
      cuadricula: this._mostrarCuadricula,
      ejes: this._mostrarEjes
    };
  }

  centrarOrigen() {
    const rect = this._lienzo.getBoundingClientRect();
    this._origenX = rect.width / 2;
    this._origenY = rect.height / 2;
    this._escala = Configuracion.ESCALA_INICIAL_PX;
    this._actualizarTransformador();
    this.renderizar();
  }

  cambiarZoom(factor) {
    this._escala = Math.max(Configuracion.ESCALA_MINIMA_PX, Math.min(Configuracion.ESCALA_MAXIMA_PX, this._escala * factor));
    this._actualizarTransformador();
    this.renderizar();
  }

  autoAjustarVista() {
    const puntosInteres = [{ x: 0, y: 0 }];

    this._puntos.forEach(p => puntosInteres.push({ x: p.x, y: p.y }));
    this._vectores.forEach(v => {
      puntosInteres.push({ x: v.origen.x, y: v.origen.y });
      puntosInteres.push({ x: v.extremo.x, y: v.extremo.y });
    });

    if (puntosInteres.length <= 1) {
      this.centrarOrigen();
      return;
    }

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    puntosInteres.forEach(pt => {
      if (pt.x < minX) minX = pt.x;
      if (pt.x > maxX) maxX = pt.x;
      if (pt.y < minY) minY = pt.y;
      if (pt.y > maxY) maxY = pt.y;
    });

    const margen = 2.5;
    minX -= margen;
    maxX += margen;
    minY -= margen;
    maxY += margen;

    const anchoMundo = Math.max(1, maxX - minX);
    const altoMundo = Math.max(1, maxY - minY);

    const rect = this._lienzo.getBoundingClientRect();
    const escalaX = rect.width / anchoMundo;
    const escalaY = rect.height / altoMundo;

    this._escala = Math.max(Configuracion.ESCALA_MINIMA_PX, Math.min(150, Math.min(escalaX, escalaY)));

    const centroMundoX = (minX + maxX) / 2;
    const centroMundoY = (minY + maxY) / 2;

    this._origenX = (rect.width / 2) - (centroMundoX * this._escala);
    this._origenY = (rect.height / 2) + (centroMundoY * this._escala);

    this._actualizarTransformador();
    this.renderizar();
  }

  renderizar() {
    const rect = this._lienzo.getBoundingClientRect();
    const ancho = rect.width;
    const alto = rect.height;

    this._ctx.fillStyle = Configuracion.COLOR_FONDO;
    this._ctx.fillRect(0, 0, ancho, alto);

    if (this._mostrarCuadricula) {
      this._dibujarCuadricula(ancho, alto);
    }

    if (this._mostrarEjes) {
      this._dibujarEjes(ancho, alto);
    }

    if (this._mostrarConstrucciones) {
      this._dibujarConstruccionesGeometricas();
    }

    if (this._mostrarPuntos) {
      this._puntos.forEach(p => this._dibujarPunto(p));
    }

    if (this._mostrarVectores) {
      this._vectores.forEach(v => this._dibujarVector(v));
    }
  }

  _dibujarCuadricula(ancho, alto) {
    const pasoBase = this._calcularPasoCuadricula();
    const pasoPx = pasoBase * this._escala;
    const pasoMenorPx = (pasoBase / 5) * this._escala;

    if (pasoMenorPx > 10) {
      this._ctx.strokeStyle = Configuracion.COLOR_CUADRICULA_MENOR;
      this._ctx.lineWidth = 1;
      this._ctx.beginPath();

      for (let x = (this._origenX % pasoMenorPx); x <= ancho; x += pasoMenorPx) {
        this._ctx.moveTo(Math.round(x) + 0.5, 0);
        this._ctx.lineTo(Math.round(x) + 0.5, alto);
      }
      for (let y = (this._origenY % pasoMenorPx); y <= alto; y += pasoMenorPx) {
        this._ctx.moveTo(0, Math.round(y) + 0.5);
        this._ctx.lineTo(ancho, Math.round(y) + 0.5);
      }
      this._ctx.stroke();
    }

    this._ctx.strokeStyle = Configuracion.COLOR_CUADRICULA_MAYOR;
    this._ctx.lineWidth = 1;
    this._ctx.beginPath();

    for (let x = (this._origenX % pasoPx); x <= ancho; x += pasoPx) {
      this._ctx.moveTo(Math.round(x) + 0.5, 0);
      this._ctx.lineTo(Math.round(x) + 0.5, alto);
    }
    for (let y = (this._origenY % pasoPx); y <= alto; y += pasoPx) {
      this._ctx.moveTo(0, Math.round(y) + 0.5);
      this._ctx.lineTo(ancho, Math.round(y) + 0.5);
    }
    this._ctx.stroke();
  }

  _calcularPasoCuadricula() {
    const pasosPosibles = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100];
    const distanciaMinimaPx = 50;
    for (let i = 0; i < pasosPosibles.length; i++) {
      if (pasosPosibles[i] * this._escala >= distanciaMinimaPx) {
        return pasosPosibles[i];
      }
    }
    return 100;
  }

  _dibujarEjes(ancho, alto) {
    this._ctx.save();
    this._ctx.strokeStyle = Configuracion.COLOR_EJES;
    this._ctx.lineWidth = 2;

    // Eje X
    this._ctx.beginPath();
    this._ctx.moveTo(0, Math.round(this._origenY) + 0.5);
    this._ctx.lineTo(ancho, Math.round(this._origenY) + 0.5);
    this._ctx.stroke();

    // Eje Y
    this._ctx.beginPath();
    this._ctx.moveTo(Math.round(this._origenX) + 0.5, 0);
    this._ctx.lineTo(Math.round(this._origenX) + 0.5, alto);
    this._ctx.stroke();

    this._dibujarFlechaEje(ancho - 5, this._origenY, 0);
    this._dibujarFlechaEje(this._origenX, 5, -Math.PI / 2);

    const paso = this._calcularPasoCuadricula();
    const pasoPx = paso * this._escala;

    this._ctx.font = '11px "JetBrains Mono", Consolas, monospace';
    this._ctx.fillStyle = '#94a3b8';

    // Marcas Eje X
    this._ctx.textAlign = 'center';
    this._ctx.textBaseline = 'top';
    const limIzq = Math.floor(-this._origenX / pasoPx);
    const limDer = Math.ceil((ancho - this._origenX) / pasoPx);

    for (let k = limIzq; k <= limDer; k++) {
      if (k === 0) continue;
      const valor = k * paso;
      const px = this._origenX + (k * pasoPx);

      this._ctx.beginPath();
      this._ctx.moveTo(px, this._origenY - 4);
      this._ctx.lineTo(px, this._origenY + 4);
      this._ctx.stroke();

      this._ctx.fillText(Number.isInteger(valor) ? valor.toString() : valor.toFixed(1), px, this._origenY + 6);
    }

    // Marcas Eje Y
    this._ctx.textAlign = 'right';
    this._ctx.textBaseline = 'middle';
    const limInf = Math.floor((this._origenY - alto) / pasoPx);
    const limSup = Math.ceil(this._origenY / pasoPx);

    for (let k = limInf; k <= limSup; k++) {
      if (k === 0) continue;
      const valor = k * paso;
      const py = this._origenY - (k * pasoPx);

      this._ctx.beginPath();
      this._ctx.moveTo(this._origenX - 4, py);
      this._ctx.lineTo(this._origenX + 4, py);
      this._ctx.stroke();

      this._ctx.fillText(Number.isInteger(valor) ? valor.toString() : valor.toFixed(1), this._origenX - 8, py);
    }

    this._ctx.textAlign = 'right';
    this._ctx.textBaseline = 'top';
    this._ctx.fillText('0', this._origenX - 6, this._origenY + 6);

    this._ctx.fillStyle = '#38bdf8';
    this._ctx.font = 'bold 12px Inter, sans-serif';
    this._ctx.textAlign = 'right';
    this._ctx.fillText('X', ancho - 15, this._origenY - 18);
    this._ctx.fillText('Y', this._origenX + 18, 12);

    this._ctx.restore();
  }

  _dibujarFlechaEje(x, y, angulo) {
    this._ctx.save();
    this._ctx.translate(x, y);
    this._ctx.rotate(angulo);
    this._ctx.fillStyle = Configuracion.COLOR_EJES;
    this._ctx.beginPath();
    this._ctx.moveTo(0, 0);
    this._ctx.lineTo(-8, -4);
    this._ctx.lineTo(-8, 4);
    this._ctx.closePath();
    this._ctx.fill();
    this._ctx.restore();
  }

  _dibujarPunto(punto) {
    const { px, py } = this.mundoAPantalla(punto.x, punto.y);
    this._ctx.save();
    this._ctx.shadowColor = '#38bdf8';
    this._ctx.shadowBlur = 8;
    this._ctx.fillStyle = '#38bdf8';
    this._ctx.beginPath();
    this._ctx.arc(px, py, 5, 0, 2 * Math.PI);
    this._ctx.fill();

    this._ctx.shadowBlur = 0;
    this._ctx.strokeStyle = '#ffffff';
    this._ctx.lineWidth = 1.5;
    this._ctx.stroke();

    if (this._mostrarEtiquetas) {
      this._ctx.font = 'bold 12px "JetBrains Mono", monospace';
      this._ctx.fillStyle = '#f8fafc';
      this._ctx.textAlign = 'left';
      this._ctx.textBaseline = 'bottom';
      this._ctx.fillText(` ${punto.aCadena()}`, px + 6, py - 4);
    }
    this._ctx.restore();
  }

  _dibujarVector(vector) {
    const origenPx = this.mundoAPantalla(vector.origen.x, vector.origen.y);
    const destinoPx = this.mundoAPantalla(vector.extremo.x, vector.extremo.y);

    const deltaX = destinoPx.px - origenPx.px;
    const deltaY = destinoPx.py - origenPx.py;
    const longitudPx = Math.hypot(deltaX, deltaY);

    if (longitudPx < 1) return;

    const angulo = Math.atan2(deltaY, deltaX);
    const tamanoFlecha = Math.min(16, Math.max(10, longitudPx * 0.2));

    this._ctx.save();

    if (this._mostrarProyecciones) {
      this._ctx.save();
      this._ctx.setLineDash([4, 4]);
      this._ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      this._ctx.lineWidth = 1;

      const ejeXPx = this.mundoAPantalla(vector.extremo.x, 0);
      this._ctx.beginPath();
      this._ctx.moveTo(destinoPx.px, destinoPx.py);
      this._ctx.lineTo(destinoPx.px, ejeXPx.py);
      this._ctx.stroke();

      const ejeYPx = this.mundoAPantalla(0, vector.extremo.y);
      this._ctx.beginPath();
      this._ctx.moveTo(destinoPx.px, destinoPx.py);
      this._ctx.lineTo(ejeYPx.px, destinoPx.py);
      this._ctx.stroke();

      this._ctx.restore();
    }

    this._ctx.strokeStyle = vector.color;
    this._ctx.lineWidth = 3;
    this._ctx.shadowColor = vector.color;
    this._ctx.shadowBlur = 10;

    this._ctx.beginPath();
    this._ctx.moveTo(origenPx.px, origenPx.py);
    const puntoCorteX = destinoPx.px - (tamanoFlecha * 0.7 * Math.cos(angulo));
    const puntoCorteY = destinoPx.py - (tamanoFlecha * 0.7 * Math.sin(angulo));
    this._ctx.lineTo(puntoCorteX, puntoCorteY);
    this._ctx.stroke();

    this._ctx.fillStyle = vector.color;
    this._ctx.beginPath();
    this._ctx.moveTo(destinoPx.px, destinoPx.py);
    this._ctx.lineTo(
      destinoPx.px - tamanoFlecha * Math.cos(angulo - Math.PI / 6),
      destinoPx.py - tamanoFlecha * Math.sin(angulo - Math.PI / 6)
    );
    this._ctx.lineTo(
      destinoPx.px - (tamanoFlecha * 0.6) * Math.cos(angulo),
      destinoPx.py - (tamanoFlecha * 0.6) * Math.sin(angulo)
    );
    this._ctx.lineTo(
      destinoPx.px - tamanoFlecha * Math.cos(angulo + Math.PI / 6),
      destinoPx.py - tamanoFlecha * Math.sin(angulo + Math.PI / 6)
    );
    this._ctx.closePath();
    this._ctx.fill();

    this._ctx.shadowBlur = 0;
    this._ctx.fillStyle = Configuracion.COLOR_ORIGEN;
    this._ctx.beginPath();
    this._ctx.arc(origenPx.px, origenPx.py, 3.5, 0, 2 * Math.PI);
    this._ctx.fill();

    if (this._mostrarEtiquetas) {
      const medioX = (origenPx.px + destinoPx.px) / 2;
      const medioY = (origenPx.py + destinoPx.py) / 2;
      const normalX = -Math.sin(angulo) * 18;
      const normalY = Math.cos(angulo) * 18;

      const textoEtiqueta = `${vector.etiqueta} = ${vector.aCadenaComponentes()}`;

      this._ctx.font = 'bold 12px Inter, sans-serif';
      const anchoCaja = this._ctx.measureText(textoEtiqueta).width + 12;
      const altoCaja = 20;

      const cajaX = medioX + normalX - (anchoCaja / 2);
      const cajaY = medioY + normalY - (altoCaja / 2);

      this._ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
      this._ctx.strokeStyle = vector.color;
      this._ctx.lineWidth = 1;
      this._ctx.beginPath();
      this._ctx.roundRect(cajaX, cajaY, anchoCaja, altoCaja, 5);
      this._ctx.fill();
      this._ctx.stroke();

      this._ctx.fillStyle = '#f8fafc';
      this._ctx.textAlign = 'center';
      this._ctx.textBaseline = 'middle';
      this._ctx.fillText(textoEtiqueta, medioX + normalX, medioY + normalY);
    }

    this._ctx.restore();
  }

  _dibujarConstruccionesGeometricas() {
    if (this._modoGeometrico === 'paralelogramo' && this._vectores.length >= 2) {
      const u = this._vectores[0];
      const v = this._vectores[1];
      const finU = this.mundoAPantalla(u.extremo.x, u.extremo.y);
      const finV = this.mundoAPantalla(v.extremo.x, v.extremo.y);
      const finSuma = this.mundoAPantalla(u.origen.x + u.x + v.x, u.origen.y + u.y + v.y);

      this._ctx.save();
      this._ctx.setLineDash([5, 5]);
      this._ctx.lineWidth = 1.5;

      this._ctx.strokeStyle = v.color;
      this._ctx.beginPath();
      this._ctx.moveTo(finU.px, finU.py);
      this._ctx.lineTo(finSuma.px, finSuma.py);
      this._ctx.stroke();

      this._ctx.strokeStyle = u.color;
      this._ctx.beginPath();
      this._ctx.moveTo(finV.px, finV.py);
      this._ctx.lineTo(finSuma.px, finSuma.py);
      this._ctx.stroke();

      const origenPx = this.mundoAPantalla(u.origen.x, u.origen.y);
      this._ctx.fillStyle = 'rgba(56, 189, 248, 0.05)';
      this._ctx.beginPath();
      this._ctx.moveTo(origenPx.px, origenPx.py);
      this._ctx.lineTo(finU.px, finU.py);
      this._ctx.lineTo(finSuma.px, finSuma.py);
      this._ctx.lineTo(finV.px, finV.py);
      this._ctx.closePath();
      this._ctx.fill();

      this._ctx.restore();
    } else if (this._modoGeometrico === 'punta-cola' && this._vectores.length >= 2) {
      const u = this._vectores[0];
      const v = this._vectores[1];
      const finU = this.mundoAPantalla(u.extremo.x, u.extremo.y);
      const finSuma = this.mundoAPantalla(u.extremo.x + v.x, u.extremo.y + v.y);

      this._ctx.save();
      this._ctx.setLineDash([4, 4]);
      this._ctx.strokeStyle = v.color;
      this._ctx.lineWidth = 2;

      this._ctx.beginPath();
      this._ctx.moveTo(finU.px, finU.py);
      this._ctx.lineTo(finSuma.px, finSuma.py);
      this._ctx.stroke();

      const angulo = Math.atan2(finSuma.py - finU.py, finSuma.px - finU.px);
      this._ctx.fillStyle = v.color;
      this._ctx.beginPath();
      this._ctx.moveTo(finSuma.px, finSuma.py);
      this._ctx.lineTo(
        finSuma.px - 10 * Math.cos(angulo - Math.PI / 6),
        finSuma.py - 10 * Math.sin(angulo - Math.PI / 6)
      );
      this._ctx.lineTo(
        finSuma.px - 10 * Math.cos(angulo + Math.PI / 6),
        finSuma.py - 10 * Math.sin(angulo + Math.PI / 6)
      );
      this._ctx.closePath();
      this._ctx.fill();

      this._ctx.restore();
    } else if (this._modoGeometrico === 'equipolencia' && this._vectores.length >= 2) {
      const u = this._vectores[0];
      const v = this._vectores[1];
      const origUPx = this.mundoAPantalla(u.origen.x, u.origen.y);
      const origVPx = this.mundoAPantalla(v.origen.x, v.origen.y);
      const finUPx = this.mundoAPantalla(u.extremo.x, u.extremo.y);
      const finVPx = this.mundoAPantalla(v.extremo.x, v.extremo.y);

      this._ctx.save();
      this._ctx.setLineDash([4, 4]);
      this._ctx.strokeStyle = 'rgba(234, 179, 8, 0.7)';
      this._ctx.lineWidth = 1.5;

      this._ctx.beginPath();
      this._ctx.moveTo(origUPx.px, origUPx.py);
      this._ctx.lineTo(origVPx.px, origVPx.py);
      this._ctx.stroke();

      this._ctx.beginPath();
      this._ctx.moveTo(finUPx.px, finUPx.py);
      this._ctx.lineTo(finVPx.px, finVPx.py);
      this._ctx.stroke();

      this._ctx.restore();
    }
  }

  _inicializarEventos() {
    this._lienzo.addEventListener('mousedown', (e) => {
      this._arrastrando = true;
      this._ultimoRatonX = e.clientX;
      this._ultimoRatonY = e.clientY;
      this._lienzo.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      const rect = this._lienzo.getBoundingClientRect();
      const coords = this.pantallaAMundo(e.clientX - rect.left, e.clientY - rect.top);

      if (this._notificadorCursor) {
        this._notificadorCursor(coords.x, coords.y);
      }

      if (!this._arrastrando) return;

      this._origenX += (e.clientX - this._ultimoRatonX);
      this._origenY += (e.clientY - this._ultimoRatonY);
      this._ultimoRatonX = e.clientX;
      this._ultimoRatonY = e.clientY;
      this._actualizarTransformador();
      this.renderizar();
    });

    window.addEventListener('mouseup', () => {
      if (this._arrastrando) {
        this._arrastrando = false;
        this._lienzo.style.cursor = 'crosshair';
      }
    });

    this._lienzo.addEventListener('wheel', (e) => {
      e.preventDefault();
      const rect = this._lienzo.getBoundingClientRect();
      const ratonX = e.clientX - rect.left;
      const ratonY = e.clientY - rect.top;

      const factorZoom = e.deltaY < 0 ? 1.15 : 0.85;
      const nuevaEscala = Math.max(Configuracion.ESCALA_MINIMA_PX, Math.min(Configuracion.ESCALA_MAXIMA_PX, this._escala * factorZoom));

      this._origenX = ratonX - ((ratonX - this._origenX) * (nuevaEscala / this._escala));
      this._origenY = ratonY - ((ratonY - this._origenY) * (nuevaEscala / this._escala));
      this._escala = nuevaEscala;

      this._actualizarTransformador();
      this.renderizar();
    }, { passive: false });

    window.addEventListener('resize', () => this.ajustarResolucion());
    this._lienzo.style.cursor = 'crosshair';
  }

  exportarComoImagen() {
    const enlace = document.createElement('a');
    enlace.download = 'grafico_vectores.png';
    enlace.href = this._lienzo.toDataURL('image/png');
    enlace.click();
  }
}
