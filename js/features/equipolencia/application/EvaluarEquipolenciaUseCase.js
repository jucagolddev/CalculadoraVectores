import { Vector2D } from '../../../core/models/Vector2D.js';

/**
 * Caso de uso: Evaluar analíticamente la equipolencia entre dos vectores fijos AB y CD.
 */
export class EvaluarEquipolenciaUseCase {
  /**
   * @param {Punto2D} puntoA
   * @param {Punto2D} puntoB
   * @param {Punto2D} puntoC
   * @param {Punto2D} puntoD
   * @returns {Object}
   */
  ejecutar(puntoA, puntoB, puntoC, puntoD) {
    const vectorAB = Vector2D.desdeDosPuntos(puntoA, puntoB, 'AB', '#38bdf8');
    const vectorCD = Vector2D.desdeDosPuntos(puntoC, puntoD, 'CD', '#f59e0b');

    const sonEquipolentes = vectorAB.esEquipolente(vectorCD);
    const modAB = vectorAB.modulo();
    const modCD = vectorCD.modulo();
    const angAB = vectorAB.direccionGrados();
    const angCD = vectorCD.direccionGrados();

    const pasos = [
      {
        titulo: '1. Cálculo del Vector \\vec{AB}',
        formula: '$$\\vec{AB} = (x_B - x_A, \\; y_B - y_A)$$',
        sustitucion: `$$\\vec{AB} = (${puntoB.x} - (${puntoA.x}), \\; ${puntoB.y} - (${puntoA.y}))$$`,
        resultado: `$$\\vec{AB} = (${vectorAB.x}, \\; ${vectorAB.y}) \\quad \\big| \\quad \\|\\vec{AB}\\| = ${modAB.toFixed(4)} \\text{ u} \\quad \\big| \\quad \\theta = ${angAB.toFixed(2)}^\\circ$$`
      },
      {
        titulo: '2. Cálculo del Vector \\vec{CD}',
        formula: '$$\\vec{CD} = (x_D - x_C, \\; y_D - y_C)$$',
        sustitucion: `$$\\vec{CD} = (${puntoD.x} - (${puntoC.x}), \\; ${puntoD.y} - (${puntoC.y}))$$`,
        resultado: `$$\\vec{CD} = (${vectorCD.x}, \\; ${vectorCD.y}) \\quad \\big| \\quad \\|\\vec{CD}\\| = ${modCD.toFixed(4)} \\text{ u} \\quad \\big| \\quad \\theta = ${angCD.toFixed(2)}^\\circ$$`
      },
      {
        titulo: '3. Comprobación de Condiciones de Equipolencia',
        formula: '$$\\vec{AB} \\equiv \\vec{CD} \\iff (AB_x = CD_x) \\land (AB_y = CD_y) \\land (\\|\\vec{AB}\\| = \\|\\vec{CD}\\|)$$',
        sustitucion: `$$AB_x = ${vectorAB.x} \\stackrel{?}{=} ${vectorCD.x} = CD_x \\; (${vectorAB.x === vectorCD.x ? '\\text{CUMPLE}' : '\\text{NO CUMPLE}'}) \\quad \\big| \\quad AB_y = ${vectorAB.y} \\stackrel{?}{=} ${vectorCD.y} = CD_y \\; (${vectorAB.y === vectorCD.y ? '\\text{CUMPLE}' : '\\text{NO CUMPLE}'})$$`,
        resultado: sonEquipolentes
          ? 'CONCLUSIÓN: SÍ son equipolentes. Representan el mismo vector libre trasladado en el plano.'
          : 'CONCLUSIÓN: NO son equipolentes. Difieren en magnitud, dirección o sentido.'
      }
    ];

    return {
      vectorAB,
      vectorCD,
      sonEquipolentes,
      pasos
    };
  }
}
