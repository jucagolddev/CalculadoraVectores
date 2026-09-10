import { Vector2D } from '../../../core/models/Vector2D.js';
import { Configuracion } from '../../../core/constants/Configuracion.js';

/**
 * Caso de uso: Calcular la cadena vectorial continua entre múltiples puntos
 * y deducir los vectores directores consecutivos y el vector resultante neto.
 */
export class CalcularCadenaUseCase {
  /**
   * @param {Punto2D[]} puntos
   * @returns {{vectores: Vector2D[], vectorResultante: Vector2D, longitudTotal: number, pasos: Array<{titulo: string, formula: string, sustitucion: string, resultado: string}>}}
   */
  ejecutar(puntos) {
    if (!Array.isArray(puntos) || puntos.length < 2) {
      throw new Error('Se requieren al menos dos puntos de unión para calcular la cadena vectorial.');
    }

    const paleta = Configuracion.PALETA_VECTORES;
    const vectores = [];
    const pasos = [];
    let longitudTotal = 0;

    for (let i = 0; i < puntos.length - 1; i++) {
      const pOrigen = puntos[i];
      const pDestino = puntos[i + 1];
      const etiqueta = `${pOrigen.etiqueta}${pDestino.etiqueta}`;
      const color = paleta[i % paleta.length];

      const v = Vector2D.desdeDosPuntos(pOrigen, pDestino, etiqueta, color);
      vectores.push(v);
      const mod = v.modulo();
      longitudTotal += mod;

      pasos.push({
        titulo: `Vector de Unión ${i + 1}: ${etiqueta} (${pOrigen.etiqueta} → ${pDestino.etiqueta})`,
        formula: `${etiqueta} = ${pDestino.etiqueta} - ${pOrigen.etiqueta} = (${pDestino.etiqueta}x - ${pOrigen.etiqueta}x, ${pDestino.etiqueta}y - ${pOrigen.etiqueta}y)`,
        sustitucion: `${etiqueta} = (${pDestino.x} - (${pOrigen.x}), ${pDestino.y} - (${pOrigen.y}))`,
        resultado: `${etiqueta} = (${v.x}, ${v.y}) | ||${etiqueta}|| = ${mod.toFixed(4)} u | θ = ${v.direccionGrados().toFixed(2)}°`
      });
    }

    const pInicial = puntos[0];
    const pFinal = puntos[puntos.length - 1];
    const vectorResultante = Vector2D.desdeDosPuntos(
      pInicial,
      pFinal,
      puntos.length > 2 ? `R_${pInicial.etiqueta}${pFinal.etiqueta}` : `${pInicial.etiqueta}${pFinal.etiqueta}`,
      Configuracion.COLOR_RESULTANTE
    );
    const modResultante = vectorResultante.modulo();

    if (puntos.length > 2) {
      const sumatoriaX = vectores.map(v => v.x >= 0 ? `+${v.x}` : `${v.x}`).join(' ').replace(/^\+/, '');
      const sumatoriaY = vectores.map(v => v.y >= 0 ? `+${v.y}` : `${v.y}`).join(' ').replace(/^\+/, '');

      pasos.push({
        titulo: `Vector Resultante Total: R (${pInicial.etiqueta} → ${pFinal.etiqueta})`,
        formula: 'R = v_1 + v_2 + ... = (Suma dx_i, Suma dy_i) = P_final - P_inicial',
        sustitucion: `Rx = ${sumatoriaX} = ${vectorResultante.x} | Ry = ${sumatoriaY} = ${vectorResultante.y}`,
        resultado: `R = (${vectorResultante.x}, ${vectorResultante.y}) | ||R|| = ${modResultante.toFixed(4)} u | θ = ${vectorResultante.direccionGrados().toFixed(2)}°`
      });

      pasos.push({
        titulo: 'Trayectoria Total Recorrida vs Desplazamiento Resultante',
        formula: 'Distancia Recorrida = Suma(||v_i||) vs Desplazamiento Neto = ||R||',
        sustitucion: `Suma de módulos = ${vectores.map(v => v.modulo().toFixed(2)).join(' + ')} = ${longitudTotal.toFixed(4)} u`,
        resultado: `Desplazamiento ||R|| = ${modResultante.toFixed(4)} u (Diferencia de camino: ${(longitudTotal - modResultante).toFixed(4)} u)`
      });
    }

    return {
      vectores,
      vectorResultante,
      longitudTotal,
      pasos
    };
  }
}
