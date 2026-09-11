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
        titulo: 'Suma de Vectores: \\vec{u} + \\vec{v}',
        formula: '$$\\vec{u} + \\vec{v} = (u_x + v_x, \\; u_y + v_y)$$',
        sustitucion: `$$\\vec{u} + \\vec{v} = (${u.x} + (${v.x}), \\; ${u.y} + (${v.y}))$$`,
        resultado: `$$\\vec{u} + \\vec{v} = (${suma.x}, \\; ${suma.y}) \\quad \\big| \\quad \\|\\vec{u} + \\vec{v}\\| = ${suma.modulo().toFixed(4)} \\text{ u}$$`
      }
    ];

    const pasosResta = [
      {
        titulo: 'Resta de Vectores: \\vec{u} - \\vec{v}',
        formula: '$$\\vec{u} - \\vec{v} = (u_x - v_x, \\; u_y - v_y)$$',
        sustitucion: `$$\\vec{u} - \\vec{v} = (${u.x} - (${v.x}), \\; ${u.y} - (${v.y}))$$`,
        resultado: `$$\\vec{u} - \\vec{v} = (${resta.x}, \\; ${resta.y}) \\quad \\big| \\quad \\|\\vec{u} - \\vec{v}\\| = ${resta.modulo().toFixed(4)} \\text{ u}$$`
      }
    ];

    const pasosEscalar = [
      {
        titulo: `Multiplicación por Escalar: ${k} \\cdot \\vec{u}`,
        formula: '$$k \\cdot \\vec{u} = (k \\cdot u_x, \\; k \\cdot u_y)$$',
        sustitucion: `$$${k} \\cdot (${u.x}, \\; ${u.y}) = (${k} \\cdot ${u.x}, \\; ${k} \\cdot ${u.y})$$`,
        resultado: `$$${k}\\vec{u} = (${ponderadoU.x}, \\; ${ponderadoU.y}) \\quad \\big| \\quad \\|${k}\\vec{u}\\| = ${ponderadoU.modulo().toFixed(4)} \\text{ u}$$`
      }
    ];

    const pasosProductoPunto = [
      {
        titulo: 'Producto Escalar (Producto Punto): \\vec{u} \\cdot \\vec{v}',
        formula: '$$\\vec{u} \\cdot \\vec{v} = u_x v_x + u_y v_y$$',
        sustitucion: `$$\\vec{u} \\cdot \\vec{v} = (${u.x})(${v.x}) + (${u.y})(${v.y}) = ${u.x * v.x} + ${u.y * v.y}$$`,
        resultado: `$$\\vec{u} \\cdot \\vec{v} = ${productoPunto}$$`
      },
      {
        titulo: 'Ángulo Convexo entre \\vec{u} y \\vec{v}',
        formula: '$$\\cos(\\theta) = \\frac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\| \\cdot \\|\\vec{v}\\|}$$',
        sustitucion: (u.modulo() === 0 || v.modulo() === 0)
          ? 'Al menos uno de los vectores es el vector nulo (0, 0), por lo que carece de dirección definida.'
          : `$$\\cos(\\theta) = \\frac{${productoPunto}}{${u.modulo().toFixed(4)} \\cdot ${v.modulo().toFixed(4)}}$$`,
        resultado: (u.modulo() === 0 || v.modulo() === 0)
          ? '$$\\theta = 0.00^\\circ \\quad \\text{(Indeterminado por vector nulo)}$$'
          : `$$\\theta = ${angulo.toFixed(2)}^\\circ \\quad (${((angulo * Math.PI) / 180).toFixed(4)} \\text{ rad})$$`
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
