/**
 * Renderizador de Ejes Tridimensionales, Malla de Suelo y Graduación Métrica Espacial.
 */
export class RenderizadorEjes3D {
  /**
   * Dibuja la malla horizontal del suelo XY (z = 0)
   * @param {CanvasRenderingContext2D} ctx
   * @param {Function} proyectarFn
   */
  static dibujarMallaSueloXY(ctx, proyectarFn) {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';

    const rango = 8;
    for (let i = -rango; i <= rango; i++) {
      // Líneas paralelas al eje Y
      const p1 = proyectarFn(i, -rango, 0);
      const p2 = proyectarFn(i, rango, 0);
      ctx.beginPath();
      ctx.moveTo(p1.px, p1.py);
      ctx.lineTo(p2.px, p2.py);
      ctx.stroke();

      // Líneas paralelas al eje X
      const p3 = proyectarFn(-rango, i, 0);
      const p4 = proyectarFn(rango, i, 0);
      ctx.beginPath();
      ctx.moveTo(p3.px, p3.py);
      ctx.lineTo(p4.px, p4.py);
      ctx.stroke();
    }
    ctx.restore();
  }

  /**
   * Dibuja los ejes coordenados espaciales X, Y, Z con graduación métrica y etiquetas
   * @param {CanvasRenderingContext2D} ctx
   * @param {Function} proyectarFn
   * @param {number} escalaPx
   * @param {boolean} mostrarEtiquetas
   * @param {Function} dibujarFlechaFn
   */
  static dibujarEjes3D(ctx, proyectarFn, escalaPx, mostrarEtiquetas, dibujarFlechaFn) {
    const lEje = 9;
    const o = proyectarFn(0, 0, 0);

    const ejes = [
      { id: 'X', fin: proyectarFn(lEje, 0, 0), color: '#ef4444', colorTexto: '#fca5a5', dir: { x: 1, y: 0, z: 0 }, etiqueta: 'Eje X (+i)' },
      { id: 'Y', fin: proyectarFn(0, lEje, 0), color: '#10b981', colorTexto: '#6ee7b7', dir: { x: 0, y: 1, z: 0 }, etiqueta: 'Eje Y (+j)' },
      { id: 'Z', fin: proyectarFn(0, 0, lEje), color: '#8b5cf6', colorTexto: '#c4b5fd', dir: { x: 0, y: 0, z: 1 }, etiqueta: 'Eje Z (+k)' }
    ];

    const paso = escalaPx >= 26 ? 1 : (escalaPx >= 14 ? 2 : 5);

    // Ejes negativos discontinuos
    ctx.save();
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 4]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    [
      { id: '-X', dir: { x: -1, y: 0, z: 0 } },
      { id: '-Y', dir: { x: 0, y: -1, z: 0 } },
      { id: '-Z', dir: { x: 0, y: 0, z: -1 } }
    ].forEach(ejeNeg => {
      const pNeg = proyectarFn(ejeNeg.dir.x * lEje, ejeNeg.dir.y * lEje, ejeNeg.dir.z * lEje);
      ctx.beginPath();
      ctx.moveTo(o.px, o.py);
      ctx.lineTo(pNeg.px, pNeg.py);
      ctx.stroke();

      const dx = pNeg.px - o.px;
      const dy = pNeg.py - o.py;
      const len = Math.hypot(dx, dy);
      if (len > 0.001) {
        const nx = -dy / len;
        const ny = dx / len;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        for (let k = paso; k <= lEje - 1; k += paso) {
          const pk = proyectarFn(ejeNeg.dir.x * k, ejeNeg.dir.y * k, ejeNeg.dir.z * k);
          ctx.beginPath();
          ctx.moveTo(pk.px - 2.5 * nx, pk.py - 2.5 * ny);
          ctx.lineTo(pk.px + 2.5 * nx, pk.py + 2.5 * ny);
          ctx.stroke();
        }
      }
    });
    ctx.restore();

    // Ejes positivos sólidos con graduación métrica y etiquetas
    ejes.forEach(eje => {
      ctx.save();
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = eje.color;
      ctx.fillStyle = eje.color;

      ctx.beginPath();
      ctx.moveTo(o.px, o.py);
      ctx.lineTo(eje.fin.px, eje.fin.py);
      ctx.stroke();

      dibujarFlechaFn(o.px, o.py, eje.fin.px, eje.fin.py, eje.color, 9);

      const dx = eje.fin.px - o.px;
      const dy = eje.fin.py - o.py;
      const len = Math.hypot(dx, dy);
      const nx = len > 0.001 ? -dy / len : 0;
      const ny = len > 0.001 ? dx / len : 0;

      ctx.font = '9px var(--fuente-mono, monospace)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let k = paso; k <= lEje - 1; k += paso) {
        const pk = proyectarFn(eje.dir.x * k, eje.dir.y * k, eje.dir.z * k);

        ctx.lineWidth = 1.3;
        ctx.strokeStyle = eje.color;
        ctx.beginPath();
        ctx.moveTo(pk.px - 3.5 * nx, pk.py - 3.5 * ny);
        ctx.lineTo(pk.px + 3.5 * nx, pk.py + 3.5 * ny);
        ctx.stroke();

        if (mostrarEtiquetas) {
          ctx.fillStyle = eje.colorTexto;
          const posTextoX = pk.px + 9 * nx;
          const posTextoY = pk.py + 9 * ny;
          ctx.fillText(k.toString(), posTextoX, posTextoY);
        }
      }

      if (mostrarEtiquetas) {
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.fillStyle = eje.color;
        const normDx = len > 0.001 ? dx / len : 1;
        const normDy = len > 0.001 ? dy / len : 0;
        ctx.fillText(eje.etiqueta, eje.fin.px + 12 * normDx, eje.fin.py + 12 * normDy);
      }
      ctx.restore();
    });

    if (mostrarEtiquetas) {
      ctx.save();
      ctx.font = '9px var(--fuente-mono, monospace)';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.fillText('0(0, 0, 0)', o.px - 7, o.py + 11);
      ctx.restore();
    }
  }
}
