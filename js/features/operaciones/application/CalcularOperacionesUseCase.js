/**
 * Caso de uso: Ejecutar operaciones algebraicas entre dos vectores libres concurrentes
 * (Suma, Resta, Multiplicación por Escalar, Producto Punto y Ángulo).
 */
export class CalcularOperacionesUseCase {
  /**
   * @param {Vector2D} u
   * @param {Vector2D} v
   * @param {number} [k=1]
   * @returns {Object}
   */
  ejecutar(u, v, k = 1) {
    const suma = u.sumar(v, u.origen, 'u+v', '#10b981');
    const resta = u.restar(v, u.origen, 'u-v', '#f43f5e');
    const ponderadoU = u.multiplicarPorEscalar(k, u.origen, `${k}·u`, '#a855f7');
    const productoPunto = u.productoPunto(v);
    const angulo = u.anguloCon(v);

    const pasosSuma = [
      {
        titulo: 'Suma de Vectores: u + v',
        formula: 'u + v = (ux + vx, uy + vy)',
        sustitucion: `u + v = (${u.x} + (${v.x}), ${u.y} + (${v.y}))`,
        resultado: `u + v = (${suma.x}, ${suma.y}) | Módulo: ${suma.modulo().toFixed(4)}`
      }
    ];

    const pasosResta = [
      {
        titulo: 'Resta de Vectores: u - v',
        formula: 'u - v = (ux - vx, uy - vy)',
        sustitucion: `u - v = (${u.x} - (${v.x}), ${u.y} - (${v.y}))`,
        resultado: `u - v = (${resta.x}, ${resta.y}) | Módulo: ${resta.modulo().toFixed(4)}`
      }
    ];

    const pasosEscalar = [
      {
        titulo: `Multiplicación por Escalar: ${k} · u`,
        formula: 'k · u = (k · ux, k · uy)',
        sustitucion: `${k} · (${u.x}, ${u.y}) = (${k} · ${u.x}, ${k} · ${u.y})`,
        resultado: `${k}·u = (${ponderadoU.x}, ${ponderadoU.y}) | Módulo: ${ponderadoU.modulo().toFixed(4)}`
      }
    ];

    const pasosProductoPunto = [
      {
        titulo: 'Producto Escalar (Producto Punto): u · v',
        formula: 'u · v = (ux · vx) + (uy · vy)',
        sustitucion: `u · v = (${u.x} · ${v.x}) + (${u.y} · ${v.y}) = ${u.x * v.x} + ${u.y * v.y}`,
        resultado: `u · v = ${productoPunto}`
      },
      {
        titulo: 'Ángulo Convexo entre u y v',
        formula: 'cos(θ) = (u · v) / (||u|| · ||v||)',
        sustitucion: (u.modulo() === 0 || v.modulo() === 0)
          ? 'Al menos uno de los vectores es el vector nulo (0, 0), por lo que carece de dirección definida.'
          : `cos(θ) = ${productoPunto} / (${u.modulo().toFixed(4)} · ${v.modulo().toFixed(4)})`,
        resultado: (u.modulo() === 0 || v.modulo() === 0)
          ? 'θ = 0.00° (Indeterminado por vector nulo)'
          : `θ = ${angulo.toFixed(2)}° (${((angulo * Math.PI) / 180).toFixed(4)} rad)`
      }
    ];

    return {
      suma,
      resta,
      ponderadoU,
      productoPunto,
      angulo,
      pasos: [...pasosSuma, ...pasosResta, ...pasosEscalar, ...pasosProductoPunto]
    };
  }
}
