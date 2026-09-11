import { Punto2D } from '../../../core/models/Punto2D.js?v=flechas18';
import { Vector2D } from '../../../core/models/Vector2D.js?v=flechas18';
import { FormateadorMatematico } from '../../../shared/utils/FormateadorMatematico.js?v=flechas18';

/**
 * Caso de uso: Resolver analíticamente la equipolencia de vectores fijos AB y CD,
 * permitiendo el despeje algebraico cuando existen incógnitas '?' en coordenadas o puntos (ej: hallar B y D dado u y A, C).
 */
export class ResolverEquipolenciaConIncognitasUseCase {
  /**
   * @param {Object} params
   * @param {string|number} params.ax
   * @param {string|number} params.ay
   * @param {string|number} params.bx
   * @param {string|number} params.by
   * @param {string|number} params.cx
   * @param {string|number} params.cy
   * @param {string|number} params.dx
   * @param {string|number} params.dy
   * @param {Object|null} [params.vectorU=null] - { ux: number|string, uy: number|string } si se especifica
   * @param {string|number|null} [params.ux=null]
   * @param {string|number|null} [params.uy=null]
   * @returns {Object}
   */
  ejecutar({ ax, ay, bx, by, cx, cy, dx, dy, vectorU = null, ux: paramUx = null, uy: paramUy = null }) {
    const esIncognita = (val) => {
      if (val === null || val === undefined) return true;
      const str = String(val).trim();
      return str === '?' || str === '';
    };

    const parsear = (val) => {
      if (esIncognita(val)) return null;
      const n = Number(val);
      return Number.isNaN(n) ? null : n;
    };

    // Coordenadas parseadas (null si es incógnita '?')
    const valores = {
      ax: parsear(ax), ay: parsear(ay),
      bx: parsear(bx), by: parsear(by),
      cx: parsear(cx), cy: parsear(cy),
      dx: parsear(dx), dy: parsear(dy)
    };

    const incognitasDetectadas = {
      ax: valores.ax === null, ay: valores.ay === null,
      bx: valores.bx === null, by: valores.by === null,
      cx: valores.cx === null, cy: valores.cy === null,
      dx: valores.dx === null, dy: valores.dy === null
    };

    const totalIncognitas = Object.values(incognitasDetectadas).filter(Boolean).length;

    let ux = vectorU && !esIncognita(vectorU.ux)
      ? Number(vectorU.ux)
      : (paramUx !== null && !esIncognita(paramUx) ? Number(paramUx) : null);
    let uy = vectorU && !esIncognita(vectorU.uy)
      ? Number(vectorU.uy)
      : (paramUy !== null && !esIncognita(paramUy) ? Number(paramUy) : null);

    const pasos = [];
    const incognitasResueltas = [];

    // CASO A: Vector u conocido explícitamente dado por el usuario
    if (ux !== null && uy !== null) {
      pasos.push({
        titulo: '1. Condición Fundamental con Vector Guía $\\vec{u}$',
        formula: '$$\\overrightarrow{AB} = \\vec{u} \\iff B - A = \\vec{u} \\quad \\land \\quad \\overrightarrow{CD} = \\vec{u} \\iff D - C = \\vec{u}$$',
        sustitucion: `$$\\vec{u} = (${ux}, \\; ${uy})$$`,
        resultado: 'Se aplica la relación de Chasles para despejar los puntos extremos u orígenes que contengan incógnitas.'
      });

      // Despeje de B si es incógnita
      if (valores.bx === null && valores.ax !== null) {
        valores.bx = valores.ax + ux;
        incognitasResueltas.push('bx');
      }
      if (valores.by === null && valores.ay !== null) {
        valores.by = valores.ay + uy;
        incognitasResueltas.push('by');
      }

      // Despeje de A si es incógnita
      if (valores.ax === null && valores.bx !== null) {
        valores.ax = valores.bx - ux;
        incognitasResueltas.push('ax');
      }
      if (valores.ay === null && valores.by !== null) {
        valores.ay = valores.by - uy;
        incognitasResueltas.push('ay');
      }

      // Despeje de D si es incógnita
      if (valores.dx === null && valores.cx !== null) {
        valores.dx = valores.cx + ux;
        incognitasResueltas.push('dx');
      }
      if (valores.dy === null && valores.cy !== null) {
        valores.dy = valores.cy + uy;
        incognitasResueltas.push('dy');
      }

      // Despeje de C si es incógnita
      if (valores.cx === null && valores.dx !== null) {
        valores.cx = valores.dx - ux;
        incognitasResueltas.push('cx');
      }
      if (valores.cy === null && valores.dy !== null) {
        valores.cy = valores.dy - uy;
        incognitasResueltas.push('cy');
      }

      if (incognitasDetectadas.bx || incognitasDetectadas.by) {
        pasos.push({
          titulo: '2. Despeje del Extremo $\\overrightarrow{AB}$: Punto $B$',
          formula: '$$B = A + \\vec{u} = (A_x + u_x, \\; A_y + u_y)$$',
          sustitucion: `$$B = (${valores.ax} + (${ux}), \\; ${valores.ay} + (${uy}))$$`,
          resultado: `$$B = (${valores.bx}, \\; ${valores.by}) \\quad \\text{[Incógnita Hallada]}$$`
        });
      }

      if (incognitasDetectadas.dx || incognitasDetectadas.dy) {
        pasos.push({
          titulo: '3. Despeje del Extremo $\\overrightarrow{CD}$: Punto $D$',
          formula: '$$D = C + \\vec{u} = (C_x + u_x, \\; C_y + u_y)$$',
          sustitucion: `$$D = (${valores.cx} + (${ux}), \\; ${valores.cy} + (${uy}))$$`,
          resultado: `$$D = (${valores.dx}, \\; ${valores.dy}) \\quad \\text{[Incógnita Hallada]}$$`
        });
      }

    } else {
      // CASO B: Sin vector u explícito. Intentar deducir u a partir de los puntos completos
      // ¿Podemos deducir u de AB completo?
      if (valores.ax !== null && valores.ay !== null && valores.bx !== null && valores.by !== null) {
        ux = valores.bx - valores.ax;
        uy = valores.by - valores.ay;

        pasos.push({
          titulo: '1. Deducción del Vector Libre Guía $\\vec{u} = \\overrightarrow{AB}$',
          formula: '$$\\vec{u} = \\overrightarrow{AB} = B - A = (B_x - A_x, \\; B_y - A_y)$$',
          sustitucion: `$$\\vec{u} = (${valores.bx} - (${valores.ax}), \\; ${valores.by} - (${valores.ay}))$$`,
          resultado: `$$\\vec{u} = (${ux}, \\; ${uy})$$`
        });

        // Despejar D = C + u
        if (valores.dx === null && valores.cx !== null) {
          valores.dx = valores.cx + ux;
          incognitasResueltas.push('dx');
        }
        if (valores.dy === null && valores.cy !== null) {
          valores.dy = valores.cy + uy;
          incognitasResueltas.push('dy');
        }
        // Despejar C = D - u
        if (valores.cx === null && valores.dx !== null) {
          valores.cx = valores.dx - ux;
          incognitasResueltas.push('cx');
        }
        if (valores.cy === null && valores.dy !== null) {
          valores.cy = valores.dy - uy;
          incognitasResueltas.push('cy');
        }

        if (incognitasDetectadas.dx || incognitasDetectadas.dy) {
          pasos.push({
            titulo: '2. Despeje del Cuarto Vértice: Punto $D$',
            formula: '$$D = C + \\overrightarrow{AB} = (C_x + u_x, \\; C_y + u_y)$$',
            sustitucion: `$$D = (${valores.cx} + (${ux}), \\; ${valores.cy} + (${uy}))$$`,
            resultado: `$$D = (${valores.dx}, \\; ${valores.dy}) \\quad \\text{[Incógnita Hallada]}$$`
          });
        }

      } else if (valores.cx !== null && valores.cy !== null && valores.dx !== null && valores.dy !== null) {
        // ¿Podemos deducir u de CD completo?
        ux = valores.dx - valores.cx;
        uy = valores.dy - valores.cy;

        pasos.push({
          titulo: '1. Deducción del Vector Libre Guía $\\vec{u} = \\overrightarrow{CD}$',
          formula: '$$\\vec{u} = \\overrightarrow{CD} = D - C = (D_x - C_x, \\; D_y - C_y)$$',
          sustitucion: `$$\\vec{u} = (${valores.dx} - (${valores.cx}), \\; ${valores.dy} - (${valores.cy}))$$`,
          resultado: `$$\\vec{u} = (${ux}, \\; ${uy})$$`
        });

        // Despejar B = A + u
        if (valores.bx === null && valores.ax !== null) {
          valores.bx = valores.ax + ux;
          incognitasResueltas.push('bx');
        }
        if (valores.by === null && valores.ay !== null) {
          valores.by = valores.ay + uy;
          incognitasResueltas.push('by');
        }
        // Despejar A = B - u
        if (valores.ax === null && valores.bx !== null) {
          valores.ax = valores.bx - ux;
          incognitasResueltas.push('ax');
        }
        if (valores.ay === null && valores.by !== null) {
          valores.ay = valores.by - uy;
          incognitasResueltas.push('ay');
        }

        if (incognitasDetectadas.bx || incognitasDetectadas.by) {
          pasos.push({
            titulo: '2. Despeje del Punto $B$ para Equipolencia',
            formula: '$$B = A + \\overrightarrow{CD} = (A_x + u_x, \\; A_y + u_y)$$',
            sustitucion: `$$B = (${valores.ax} + (${ux}), \\; ${valores.ay} + (${uy}))$$`,
            resultado: `$$B = (${valores.bx}, \\; ${valores.by}) \\quad \\text{[Incógnita Hallada]}$$`
          });
        }
      } else {
        // Despeje por componentes independientes Bx - Ax = Dx - Cx
        const xConocidos = [valores.ax !== null, valores.bx !== null, valores.cx !== null, valores.dx !== null].filter(Boolean).length;
        if (xConocidos === 3) {
          if (valores.bx === null) { valores.bx = valores.dx - valores.cx + valores.ax; incognitasResueltas.push('bx'); }
          else if (valores.dx === null) { valores.dx = valores.bx - valores.ax + valores.cx; incognitasResueltas.push('dx'); }
          else if (valores.ax === null) { valores.ax = valores.bx - (valores.dx - valores.cx); incognitasResueltas.push('ax'); }
          else if (valores.cx === null) { valores.cx = valores.dx - (valores.bx - valores.ax); incognitasResueltas.push('cx'); }
        }

        const yConocidos = [valores.ay !== null, valores.by !== null, valores.cy !== null, valores.dy !== null].filter(Boolean).length;
        if (yConocidos === 3) {
          if (valores.by === null) { valores.by = valores.dy - valores.cy + valores.ay; incognitasResueltas.push('by'); }
          else if (valores.dy === null) { valores.dy = valores.by - valores.ay + valores.cy; incognitasResueltas.push('dy'); }
          else if (valores.ay === null) { valores.ay = valores.by - (valores.dy - valores.cy); incognitasResueltas.push('ay'); }
          else if (valores.cy === null) { valores.cy = valores.dy - (valores.by - valores.ay); incognitasResueltas.push('cy'); }
        }

        if (incognitasResueltas.length > 0) {
          pasos.push({
            titulo: 'Despeje Escalar de Coordenadas por Equipolencia',
            formula: '$$B_x - A_x = D_x - C_x \\quad \\land \\quad B_y - A_y = D_y - C_y$$',
            sustitucion: 'Se sustituyen los tres valores conocidos en cada eje cartesiano para aislar la incógnita restante.',
            resultado: `Coordenadas deducidas: ${incognitasResueltas.map(k => `${k.toUpperCase()} = ${valores[k]}`).join(', ')}`
          });
        }
      }
    }

    // Comprobar si todavía quedan incógnitas sin resolver
    const quedanIncognitas = Object.values(valores).some(v => v === null);
    if (quedanIncognitas) {
      return {
        sistemaIndeterminado: true,
        mensajeIndeterminado: 'Sistema indeterminado: Se requieren al menos 3 puntos conocidos o el vector libre guía $\\vec{u}$ junto con los orígenes para despejar las incógnitas.',
        pasos: [
          {
            titulo: 'Sistema con Grados de Libertad Indeterminados',
            formula: '$$\\overrightarrow{AB} \\equiv \\overrightarrow{CD} \\iff B - A = D - C$$',
            sustitucion: 'Faltan datos para una solución única. Hay más incógnitas que ecuaciones independientes.',
            resultado: 'Introduce el vector guía $\\vec{u}$ o al menos 3 puntos completos.'
          }
        ],
        puntosRenderizables: [],
        vectoresRenderizables: [],
        sonEquipolentes: false,
        totalIncognitas,
        incognitasDetectadas,
        incognitasResueltas
      };
    }

    // Todos los puntos están determinados
    const puntoA = new Punto2D(valores.ax, valores.ay, 'A', incognitasDetectadas.ax || incognitasDetectadas.ay);
    const puntoB = new Punto2D(valores.bx, valores.by, 'B', incognitasDetectadas.bx || incognitasDetectadas.by);
    const puntoC = new Punto2D(valores.cx, valores.cy, 'C', incognitasDetectadas.cx || incognitasDetectadas.cy);
    const puntoD = new Punto2D(valores.dx, valores.dy, 'D', incognitasDetectadas.dx || incognitasDetectadas.dy);

    const vectorAB = Vector2D.desdeDosPuntos(puntoA, puntoB, 'AB', '#38bdf8');
    const vectorCD = Vector2D.desdeDosPuntos(puntoC, puntoD, 'CD', '#f59e0b');
    const sonEquipolentes = vectorAB.esEquipolente(vectorCD);

    // Si no había incógnitas iniciales (modo clásico 4 puntos conocidos), paso de verificación estándar
    if (totalIncognitas === 0) {
      pasos.push({
        titulo: '1. Cálculo del Vector $\\overrightarrow{AB}$',
        formula: '$$\\overrightarrow{AB} = (x_B - x_A, \\; y_B - y_A)$$',
        sustitucion: `$$\\overrightarrow{AB} = (${puntoB.x} - (${puntoA.x}), \\; ${puntoB.y} - (${puntoA.y}))$$`,
        resultado: `$$\\overrightarrow{AB} = (${vectorAB.x}, \\; ${vectorAB.y}) \\quad \\big| \\quad \\|\\overrightarrow{AB}\\| = ${vectorAB.modulo().toFixed(4)} \\text{ u} \\quad \\big| \\quad \\theta = ${vectorAB.direccionGrados().toFixed(2)}^\\circ$$`
      });

      pasos.push({
        titulo: '2. Cálculo del Vector $\\overrightarrow{CD}$',
        formula: '$$\\overrightarrow{CD} = (x_D - x_C, \\; y_D - y_C)$$',
        sustitucion: `$$\\overrightarrow{CD} = (${puntoD.x} - (${puntoC.x}), \\; ${puntoD.y} - (${puntoC.y}))$$`,
        resultado: `$$\\overrightarrow{CD} = (${vectorCD.x}, \\; ${vectorCD.y}) \\quad \\big| \\quad \\|\\overrightarrow{CD}\\| = ${vectorCD.modulo().toFixed(4)} \\text{ u} \\quad \\big| \\quad \\theta = ${vectorCD.direccionGrados().toFixed(2)}^\\circ$$`
      });

      pasos.push({
        titulo: '3. Comprobación de Condiciones de Equipolencia',
        formula: '$$\\overrightarrow{AB} \\equiv \\overrightarrow{CD} \\iff (AB_x = CD_x) \\land (AB_y = CD_y) \\land (\\|\\overrightarrow{AB}\\| = \\|\\overrightarrow{CD}\\|)$$',
        sustitucion: `$$AB_x = ${vectorAB.x} \\stackrel{?}{=} ${vectorCD.x} = CD_x \\; (${vectorAB.x === vectorCD.x ? '\\text{CUMPLE}' : '\\text{NO CUMPLE}'}) \\quad \\big| \\quad AB_y = ${vectorAB.y} \\stackrel{?}{=} ${vectorCD.y} = CD_y \\; (${vectorAB.y === vectorCD.y ? '\\text{CUMPLE}' : '\\text{NO CUMPLE}'})$$`,
        resultado: sonEquipolentes
          ? 'CONCLUSIÓN: SÍ son equipolentes. Representan el mismo vector libre trasladado en el plano.'
          : 'CONCLUSIÓN: NO son equipolentes. Difieren en magnitud, dirección o sentido.'
      });
    } else {
      // Paso final de síntesis con las incógnitas resueltas
      pasos.push({
        titulo: 'Comprobación Final de la Equipolencia Hallada',
        formula: '$$\\overrightarrow{AB} = \\overrightarrow{CD} \\implies (x_B - x_A, \\; y_B - y_A) = (x_D - x_C, \\; y_D - y_C)$$',
        sustitucion: `$$(${vectorAB.x}, \\; ${vectorAB.y}) = (${vectorCD.x}, \\; ${vectorCD.y})$$`,
        resultado: `$$\\overrightarrow{AB} \\equiv \\overrightarrow{CD} \\quad \\big| \\quad \\|\\overrightarrow{AB}\\| = \\|\\overrightarrow{CD}\\| = ${vectorAB.modulo().toFixed(4)} \\text{ u}$$`
      });
    }

    return {
      puntoA,
      puntoB,
      puntoC,
      puntoD,
      vectorAB,
      vectorCD,
      sonEquipolentes,
      totalIncognitas,
      incognitasDetectadas,
      incognitasResueltas,
      sistemaIndeterminado: false,
      pasos
    };
  }
}
