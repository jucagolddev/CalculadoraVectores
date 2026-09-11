import { Vector3D } from '../../../core/models/Vector3D.js';
import { FormateadorMatematico } from '../../../shared/utils/FormateadorMatematico.js';

/**
 * Caso de uso: Calcula el vector entre dos puntos en ℝ³, cosenos directores y vector unitario.
 */
export class CalcularPuntos3DUseCase {
  /**
   * @param {Punto3D} puntoA
   * @param {Punto3D} puntoB
   * @returns {Object}
   */
  ejecutar(puntoA, puntoB) {
    const vectorAB = Vector3D.desdePuntos(puntoA, puntoB, 'AB', '#38bdf8');
    const modulo = vectorAB.modulo();
    const cosenos = vectorAB.cosenosDirectores();
    const unitario = vectorAB.calcularUnitario();

    const pasos = [
      {
        titulo: '1. Componentes del Vector Fijo $\\overrightarrow{AB}$ (Extremo - Origen)',
        formula: '\\overrightarrow{AB} = (x_B - x_A)\\vec{i} + (y_B - y_A)\\vec{j} + (z_B - z_A)\\vec{k}',
        sustitucion: `\\overrightarrow{AB} = (${puntoB.x} - (${puntoA.x}))\\vec{i} + (${puntoB.y} - (${puntoA.y}))\\vec{j} + (${puntoB.z} - (${puntoA.z}))\\vec{k}`,
        resultado: `\\overrightarrow{AB} = (${vectorAB.x}, ${vectorAB.y}, ${vectorAB.z})`
      },
      {
        titulo: '2. Módulo o Longitud Tridimensional (\\|\\overrightarrow{AB}\\|)',
        formula: '\\|\\overrightarrow{AB}\\| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2 + (z_B - z_A)^2}',
        sustitucion: `\\|\\overrightarrow{AB}\\| = \\sqrt{(${vectorAB.x})^2 + (${vectorAB.y})^2 + (${vectorAB.z})^2}`,
        resultado: `\\|\\overrightarrow{AB}\\| = ${FormateadorMatematico.formatearNumero(modulo)} \\text{ u}`
      },
      {
        titulo: '3. Cosenos Directores respecto a los Ejes X, Y y Z',
        formula: '\\cos\\alpha = \\frac{v_x}{\\|\\vec{v}\\|}, \\quad \\cos\\beta = \\frac{v_y}{\\|\\vec{v}\\|}, \\quad \\cos\\gamma = \\frac{v_z}{\\|\\vec{v}\\|}',
        sustitucion: `\\cos\\alpha = \\frac{${vectorAB.x}}{${FormateadorMatematico.formatearNumero(modulo)}}, \\quad \\cos\\beta = \\frac{${vectorAB.y}}{${FormateadorMatematico.formatearNumero(modulo)}}, \\quad \\cos\\gamma = \\frac{${vectorAB.z}}{${FormateadorMatematico.formatearNumero(modulo)}}`,
        resultado: `\\cos\\alpha = ${FormateadorMatematico.formatearNumero(cosenos.cosAlfa, 4)} \\;(\\alpha = ${FormateadorMatematico.formatearGrados(cosenos.alfaGrados)}), \\; \\cos\\beta = ${FormateadorMatematico.formatearNumero(cosenos.cosBeta, 4)} \\;(\\beta = ${FormateadorMatematico.formatearGrados(cosenos.betaGrados)}), \\; \\cos\\gamma = ${FormateadorMatematico.formatearNumero(cosenos.cosGamma, 4)} \\;(\\gamma = ${FormateadorMatematico.formatearGrados(cosenos.gammaGrados)})`
      },
      {
        titulo: '4. Identidad Fundamental de los Cosenos Directores',
        formula: '\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1',
        sustitucion: `(${FormateadorMatematico.formatearNumero(cosenos.cosAlfa, 4)})^2 + (${FormateadorMatematico.formatearNumero(cosenos.cosBeta, 4)})^2 + (${FormateadorMatematico.formatearNumero(cosenos.cosGamma, 4)})^2`,
        resultado: `\\sum \\cos^2 = ${FormateadorMatematico.formatearNumero(cosenos.sumaCuadrados, 4)} \\approx 1 \\text{ (Verificado)}`
      },
      {
        titulo: '5. Vector Unitario Director (û)',
        formula: '\\hat{u} = \\frac{\\overrightarrow{AB}}{\\|\\overrightarrow{AB}\\|} = \\cos\\alpha\\vec{i} + \\cos\\beta\\vec{j} + \\cos\\gamma\\vec{k}',
        sustitucion: `\\hat{u} = \\left(\\frac{${vectorAB.x}}{${FormateadorMatematico.formatearNumero(modulo)}}, \\frac{${vectorAB.y}}{${FormateadorMatematico.formatearNumero(modulo)}}, \\frac{${vectorAB.z}}{${FormateadorMatematico.formatearNumero(modulo)}}\\right)`,
        resultado: `\\hat{u} = (${FormateadorMatematico.formatearNumero(unitario.x, 3)}, ${FormateadorMatematico.formatearNumero(unitario.y, 3)}, ${FormateadorMatematico.formatearNumero(unitario.z, 3)})`
      }
    ];

    return {
      puntoA,
      puntoB,
      vectorAB,
      modulo,
      cosenos,
      unitario,
      pasos
    };
  }
}
