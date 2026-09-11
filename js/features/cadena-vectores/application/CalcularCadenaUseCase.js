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

      const cmdFlecha = etiqueta.startsWith('BA') ? '\\overleftarrow' : '\\overrightarrow';
      pasos.push({
        titulo: `Vector de Unión ${i + 1}: $${cmdFlecha}{${etiqueta}}$ ($${pOrigen.etiqueta} \\to ${pDestino.etiqueta}$)`,
        formula: `$$${cmdFlecha}{${etiqueta}} = ${pDestino.etiqueta} - ${pOrigen.etiqueta} = (${pDestino.etiqueta}_x - ${pOrigen.etiqueta}_x, \\; ${pDestino.etiqueta}_y - ${pOrigen.etiqueta}_y)$$`,
        sustitucion: `$$${cmdFlecha}{${etiqueta}} = (${pDestino.x} - (${pOrigen.x}), \\; ${pDestino.y} - (${pOrigen.y}))$$`,
        resultado: `$$${cmdFlecha}{${etiqueta}} = (${v.x}, \\; ${v.y}) \\quad \\big| \\quad \\|${cmdFlecha}{${etiqueta}}\\| = ${mod.toFixed(4)} \\text{ u} \\quad \\big| \\quad \\theta = ${v.direccionGrados().toFixed(2)}^\\circ$$`
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
        titulo: `Vector Resultante Total: $\\overrightarrow{R}$ ($${pInicial.etiqueta} \\to ${pFinal.etiqueta}$)`,
        formula: '$$\\overrightarrow{R} = \\sum_{i=1}^{n} \\vec{v}_i = \\left(\\sum v_{ix}, \\; \\sum v_{iy}\\right) = P_{\\text{final}} - P_{\\text{inicial}}$$',
        sustitucion: `$$R_x = ${sumatoriaX} = ${vectorResultante.x} \\quad \\big| \\quad R_y = ${sumatoriaY} = ${vectorResultante.y}$$`,
        resultado: `$$\\overrightarrow{R} = (${vectorResultante.x}, \\; ${vectorResultante.y}) \\quad \\big| \\quad \\|\\overrightarrow{R}\\| = ${modResultante.toFixed(4)} \\text{ u} \\quad \\big| \\quad \\theta = ${vectorResultante.direccionGrados().toFixed(2)}^\\circ$$`
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
