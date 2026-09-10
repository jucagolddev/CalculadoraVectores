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
        titulo: '1. Cálculo del Vector AB',
        formula: 'Vector AB = (xB - xA, yB - yA)',
        sustitucion: `Vector AB = (${puntoB.x} - (${puntoA.x}), ${puntoB.y} - (${puntoA.y}))`,
        resultado: `Vector AB = (${vectorAB.x}, ${vectorAB.y}) | ||AB|| = ${modAB.toFixed(4)} | θ = ${angAB.toFixed(2)}°`
      },
      {
        titulo: '2. Cálculo del Vector CD',
        formula: 'Vector CD = (xD - xC, yD - yC)',
        sustitucion: `Vector CD = (${puntoD.x} - (${puntoC.x}), ${puntoD.y} - (${puntoC.y}))`,
        resultado: `Vector CD = (${vectorCD.x}, ${vectorCD.y}) | ||CD|| = ${modCD.toFixed(4)} | θ = ${angCD.toFixed(2)}°`
      },
      {
        titulo: '3. Comprobación de Condiciones de Equipolencia',
        formula: 'Dos vectores son equipolentes <=> tienen idéntico módulo, misma dirección y mismo sentido (mismas componentes cartesianas).',
        sustitucion: `Componente X: ${vectorAB.x} = ${vectorCD.x} (${vectorAB.x === vectorCD.x ? 'VERDADERO' : 'FALSO'}) | Componente Y: ${vectorAB.y} = ${vectorCD.y} (${vectorAB.y === vectorCD.y ? 'VERDADERO' : 'FALSO'})`,
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
