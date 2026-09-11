import { Punto2D } from '../../../core/models/Punto2D.js?v=flechas18';

/**
 * Servicio de dominio para la generación algorítmica de retos y ejercicios vectoriales.
 * Garantiza datos de entrada con coordenadas enteras bien condicionadas para resolución pedagógica.
 */
export class GeneradorEjerciciosService {
  /**
   * Genera un número entero aleatorio dentro de un rango inclusivo [min, max], excluyendo opcionalmente valores específicos.
   * @param {number} min
   * @param {number} max
   * @param {number[]} [excluidos=[]]
   * @returns {number}
   */
  static enteroAleatorio(min, max, excluidos = []) {
    let valor;
    do {
      valor = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (excluidos.includes(valor));
    return valor;
  }

  /**
   * Genera una cadena de puntos para cálculo de vectores de unión y resultante.
   * @param {number} [cantidad=2]
   * @returns {Punto2D[]}
   */
  static generarPuntosCadena(cantidad = 2) {
    const letras = ['A', 'B', 'C', 'D', 'E', 'F'];
    const puntos = [];
    const posicionesUsadas = new Set();

    for (let i = 0; i < cantidad; i++) {
      let x, y, clave;
      do {
        x = this.enteroAleatorio(-6, 6);
        y = this.enteroAleatorio(-6, 6);
        clave = `${x},${y}`;
      } while (posicionesUsadas.has(clave));

      posicionesUsadas.add(clave);
      puntos.push(new Punto2D(x, y, letras[i] || `P${i + 1}`));
    }

    return puntos;
  }

  /**
   * Genera parámetros para operaciones vectoriales con u y v más factor de ponderación k.
   * @returns {{ux: number, uy: number, vx: number, vy: number, k: number}}
   */
  static generarOperaciones() {
    let ux, uy, vx, vy;

    // u no nulo
    do {
      ux = this.enteroAleatorio(-5, 5);
      uy = this.enteroAleatorio(-5, 5);
    } while (ux === 0 && uy === 0);

    // v no nulo y no colineal trivial directo
    do {
      vx = this.enteroAleatorio(-5, 5);
      vy = this.enteroAleatorio(-5, 5);
    } while ((vx === 0 && vy === 0) || (vx === ux && vy === uy));

    const factoresEscalares = [-3, -2, 2, 3, 4];
    const k = factoresEscalares[Math.floor(Math.random() * factoresEscalares.length)];

    return { ux, uy, vx, vy, k };
  }

  /**
   * Genera 4 puntos (A, B, C, D) para evaluar equipolencia.
   * 50% de probabilidad de equipolencia exacta; 50% no equipolentes.
   * @returns {{Ax: number, Ay: number, Bx: number, By: number, Cx: number, Cy: number, Dx: number, Dy: number, equipolentesEsperados: boolean}}
   */
  static generarEquipolencia() {
    // Vector base director (dx, dy) no nulo
    let dx, dy;
    do {
      dx = this.enteroAleatorio(-5, 5);
      dy = this.enteroAleatorio(-5, 5);
    } while (dx === 0 && dy === 0);

    // Punto origen A
    const Ax = this.enteroAleatorio(-4, 4);
    const Ay = this.enteroAleatorio(-4, 4);
    const Bx = Ax + dx;
    const By = Ay + dy;

    // Punto origen C (diferente de A para que no sea idéntico en posición)
    let Cx, Cy;
    do {
      Cx = this.enteroAleatorio(-4, 4);
      Cy = this.enteroAleatorio(-4, 4);
    } while (Cx === Ax && Cy === Ay);

    const Dx = Cx + dx;
    const Dy = Cy + dy;

    // 45% de probabilidad de generar un reto de despeje de incógnitas (B y D desconocidos dado u)
    const esRetoIncognitas = Math.random() < 0.45;
    if (esRetoIncognitas) {
      return {
        Ax, Ay,
        Bx: '?', By: '?',
        Cx, Cy,
        Dx: '?', Dy: '?',
        ux: dx, uy: dy,
        esRetoIncognitas: true,
        solucionBx: Bx, solucionBy: By,
        solucionDx: Dx, solucionDy: Dy,
        equipolentesEsperados: true
      };
    }

    const sonEquipolentes = Math.random() < 0.5;
    let finalDx = Dx;
    let finalDy = Dy;
    if (!sonEquipolentes) {
      // Perturbación aleatoria de al menos una componente
      const perturbacionX = this.enteroAleatorio(-2, 2, [0]);
      finalDx = Cx + dx + perturbacionX;
    }

    return {
      Ax, Ay, Bx, By,
      Cx, Cy, Dx: finalDx, Dy: finalDy,
      esRetoIncognitas: false,
      equipolentesEsperados: sonEquipolentes
    };
  }

  /**
   * Genera dos vectores tridimensionales u y v no nulos y no colineales, más un escalar k.
   * @returns {{ux: number, uy: number, uz: number, vx: number, vy: number, vz: number, k: number}}
   */
  static generarOperaciones3D() {
    let ux, uy, uz, vx, vy, vz;

    // Vector u no nulo
    do {
      ux = this.enteroAleatorio(-4, 4);
      uy = this.enteroAleatorio(-4, 4);
      uz = this.enteroAleatorio(-4, 4);
    } while (ux === 0 && uy === 0 && uz === 0);

    // Vector v no nulo y no paralelo/colineal con u (cruz != 0)
    let cruzX, cruzY, cruzZ;
    do {
      vx = this.enteroAleatorio(-4, 4);
      vy = this.enteroAleatorio(-4, 4);
      vz = this.enteroAleatorio(-4, 4);

      cruzX = uy * vz - uz * vy;
      cruzY = uz * vx - ux * vz;
      cruzZ = ux * vy - uy * vx;
    } while ((vx === 0 && vy === 0 && vz === 0) || (cruzX === 0 && cruzY === 0 && cruzZ === 0));

    const factoresEscalares = [-2, 2, 3, 0.5, 1.5, 2.5];
    const k = factoresEscalares[Math.floor(Math.random() * factoresEscalares.length)];

    return { ux, uy, uz, vx, vy, vz, k };
  }

  /**
   * Genera dos puntos en el espacio tridimensional A y B no coincidentes.
   * @returns {{ax: number, ay: number, az: number, bx: number, by: number, bz: number}}
   */
  static generarPuntos3D() {
    const ax = this.enteroAleatorio(-5, 5);
    const ay = this.enteroAleatorio(-5, 5);
    const az = this.enteroAleatorio(-5, 5);

    let bx, by, bz;
    do {
      bx = this.enteroAleatorio(-5, 5);
      by = this.enteroAleatorio(-5, 5);
      bz = this.enteroAleatorio(-5, 5);
    } while (bx === ax && by === ay && bz === az);

    return { ax, ay, az, bx, by, bz };
  }
}
