import { FormateadorMatematico } from '../../../shared/utils/FormateadorMatematico.js';

/**
 * Caso de uso: Orquesta el cálculo analítico y desglose formal de operaciones vectoriales en ℝ³.
 */
export class CalcularOperaciones3DUseCase {
  /**
   * @param {Vector3D} vectorU
   * @param {Vector3D} vectorV
   * @param {number} k
   * @returns {Object}
   */
  ejecutar(vectorU, vectorV, k = 1) {
    const suma = vectorU.sumar(vectorV, 'u+v', '#10b981');
    const resta = vectorU.restar(vectorV, 'u-v', '#f43f5e');
    const escaladoU = vectorU.multiplicarEscalar(k, `(${k}·u)`, '#a855f7');
    const productoPunto = vectorU.productoEscalar(vectorV);
    const productoCruz = vectorU.productoVectorial(vectorV, 'u×v', '#c084fc');
    const area = productoCruz.modulo();
    const angulo = vectorU.anguloCon(vectorV);
    const proyUsobreV = vectorU.proyeccionSobre(vectorV);
    const proyVsobreU = vectorV.proyeccionSobre(vectorU);

    const modU = vectorU.modulo();
    const modV = vectorV.modulo();

    const pasos = [
      {
        titulo: '1. Suma de Vectores en ℝ³ (u + v)',
        formula: '\\vec{s} = (u_x + v_x)\\vec{i} + (u_y + v_y)\\vec{j} + (u_z + v_z)\\vec{k}',
        sustitucion: `\\vec{s} = (${vectorU.x} + ${vectorV.x})\\vec{i} + (${vectorU.y} + ${vectorV.y})\\vec{j} + (${vectorU.z} + ${vectorV.z})\\vec{k}`,
        resultado: `\\vec{s} = (${suma.x}, ${suma.y}, ${suma.z})`
      },
      {
        titulo: '2. Resta de Vectores en ℝ³ (u - v)',
        formula: '\\vec{d} = (u_x - v_x)\\vec{i} + (u_y - v_y)\\vec{j} + (u_z - v_z)\\vec{k}',
        sustitucion: `\\vec{d} = (${vectorU.x} - (${vectorV.x}))\\vec{i} + (${vectorU.y} - (${vectorV.y}))\\vec{j} + (${vectorU.z} - (${vectorV.z}))\\vec{k}`,
        resultado: `\\vec{d} = (${resta.x}, ${resta.y}, ${resta.z})`
      },
      {
        titulo: '3. Producto Escalar (Dot Product u · v)',
        formula: '\\vec{u} \\cdot \\vec{v} = u_x v_x + u_y v_y + u_z v_z = \\|\\vec{u}\\| \\|\\vec{v}\\| \\cos\\theta',
        sustitucion: `\\vec{u} \\cdot \\vec{v} = (${vectorU.x})(${vectorV.x}) + (${vectorU.y})(${vectorV.y}) + (${vectorU.z})(${vectorV.z})`,
        resultado: `\\vec{u} \\cdot \\vec{v} = ${FormateadorMatematico.formatearNumero(productoPunto)}`
      },
      {
        titulo: '4. Ángulo entre Vectores en ℝ³ (θ)',
        formula: '\\cos\\theta = \\frac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\| \\|\\vec{v}\\|}',
        sustitucion: `\\cos\\theta = \\frac{${FormateadorMatematico.formatearNumero(productoPunto)}}{${FormateadorMatematico.formatearNumero(modU)} \\cdot ${FormateadorMatematico.formatearNumero(modV)}}`,
        resultado: `\\theta = ${FormateadorMatematico.formatearGrados(angulo)}`
      },
      {
        titulo: '5. Producto Vectorial (Cross Product u × v)',
        formula: '\\vec{u} \\times \\vec{v} = (u_y v_z - u_z v_y)\\vec{i} - (u_x v_z - u_z v_x)\\vec{j} + (u_x v_y - u_y v_x)\\vec{k}',
        sustitucion: `\\vec{u} \\times \\vec{v} = [(${vectorU.y})(${vectorV.z}) - (${vectorU.z})(${vectorV.y})]\\vec{i} - [(${vectorU.x})(${vectorV.z}) - (${vectorU.z})(${vectorV.x})]\\vec{j} + [(${vectorU.x})(${vectorV.y}) - (${vectorU.y})(${vectorV.x})]\\vec{k}`,
        resultado: `\\vec{u} \\times \\vec{v} = (${productoCruz.x}, ${productoCruz.y}, ${productoCruz.z})`
      },
      {
        titulo: '6. Área del Paralelogramo Sustentado en ℝ³',
        formula: '\\text{Área} = \\|\\vec{u} \\times \\vec{v}\\| = \\sqrt{w_x^2 + w_y^2 + w_z^2}',
        sustitucion: `\\text{Área} = \\sqrt{(${productoCruz.x})^2 + (${productoCruz.y})^2 + (${productoCruz.z})^2}`,
        resultado: `\\text{Área} = ${FormateadorMatematico.formatearNumero(area)} \\text{ u}^2`
      },
      {
        titulo: '7. Proyección Ortogonal Escalar de u sobre v',
        formula: '\\operatorname{Proy}_{u \\to v} = \\frac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{v}\\|}',
        sustitucion: `\\operatorname{Proy}_{u \\to v} = \\frac{${FormateadorMatematico.formatearNumero(productoPunto)}}{${FormateadorMatematico.formatearNumero(modV)}}`,
        resultado: `\\operatorname{Proy}_{u \\to v} = ${FormateadorMatematico.formatearNumero(proyUsobreV)} \\text{ u}`
      }
    ];

    return {
      vectorU,
      vectorV,
      k,
      suma,
      resta,
      escaladoU,
      productoPunto,
      productoCruz,
      area,
      angulo,
      proyUsobreV,
      proyVsobreU,
      modU,
      modV,
      pasos
    };
  }
}
