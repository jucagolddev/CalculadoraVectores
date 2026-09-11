/**
 * Renderizador de Objetos Geométricos Tridimensionales en Canvas HTML5.
 * Dibuja vectores espaciales, paralelogramos sustentados con cálculo de área,
 * proyecciones ortogonales al suelo con cotas y nodos de puntos.
 */
export class RenderizadorGeometria3D {
  static dibujarVectores3D(ctx, vectores, proyectarFn, capas, dibujarFlechaFn, dibujarInsigniaFn) {
    vectores.forEach(v => {
      const orig = proyectarFn(v.origen.x, v.origen.y, v.origen.z);
      const ext = proyectarFn(v.extremo.x, v.extremo.y, v.extremo.z);

      ctx.save();
      const esProductoCruz = v.etiqueta.includes('×');
      ctx.lineWidth = esProductoCruz ? 3.5 : 2.6;
      ctx.strokeStyle = v.color;
      ctx.fillStyle = v.color;

      ctx.shadowColor = v.color;
      ctx.shadowBlur = esProductoCruz ? 12 : 6;

      ctx.beginPath();
      ctx.moveTo(orig.px, orig.py);
      ctx.lineTo(ext.px, ext.py);
      ctx.stroke();

      ctx.shadowBlur = 0;
      dibujarFlechaFn(orig.px, orig.py, ext.px, ext.py, v.color, esProductoCruz ? 12 : 10);

      if (capas.etiquetas) {
        const midX = (orig.px + ext.px) / 2;
        const midY = (orig.py + ext.py) / 2;
        const mod = Math.hypot(v.x, v.y, v.z);
        const modStr = Number.isInteger(mod) ? mod.toString() : mod.toFixed(2);
        dibujarInsigniaFn(
          `${v.etiqueta}: (${v.x}, ${v.y}, ${v.z}) | |${v.etiqueta}| = ${modStr} u`,
          midX + 10, midY - 10, v.color
        );
      }

      ctx.restore();
    });
  }

  static dibujarVectoresPapel(ctx, vectores, proyectarFn, capas, dibujarFlechaFn, dibujarInsigniaFn) {
    vectores.forEach(v => {
      const orig = proyectarFn(v.origen.x, v.origen.y, 0);
      const ext = proyectarFn(v.extremo.x, v.extremo.y, 0);
      const esProductoCruz = v.etiqueta.includes('×');
      const dist2D = Math.hypot(ext.px - orig.px, ext.py - orig.py);

      ctx.save();
      ctx.lineWidth = esProductoCruz ? 3.5 : 2.6;
      ctx.strokeStyle = v.color;
      ctx.fillStyle = v.color;
      ctx.shadowColor = v.color;
      ctx.shadowBlur = esProductoCruz ? 12 : 6;

      if (dist2D < 2) {
        // Vector perpendicular al plano de la hoja (como u x v cuando ambos yacen en XY)
        ctx.shadowBlur = 0;
        const radio = 14;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(orig.px, orig.py, radio, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = v.color;
        if (v.z >= 0) {
          // Símbolo ⊙ (apuntando hacia el observador)
          ctx.beginPath();
          ctx.arc(orig.px, orig.py, 3.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Símbolo ⊗ (apuntando hacia el interior de la hoja)
          const d = 8;
          ctx.beginPath();
          ctx.moveTo(orig.px - d, orig.py - d);
          ctx.lineTo(orig.px + d, orig.py + d);
          ctx.moveTo(orig.px + d, orig.py - d);
          ctx.lineTo(orig.px - d, orig.py + d);
          ctx.stroke();
        }

        if (capas.etiquetas) {
          const mod = Math.hypot(v.x, v.y, v.z);
          const modStr = Number.isInteger(mod) ? mod.toString() : mod.toFixed(2);
          const sentido = v.z >= 0 ? '⊙ Hacia afuera' : '⊗ Hacia adentro';
          dibujarInsigniaFn(
            `${v.etiqueta}: z=${v.z} (${sentido}) | |${v.etiqueta}| = ${modStr} u`,
            orig.px + 18, orig.py - 14, v.color
          );
        }
      } else {
        // Vector proyectado con longitud finita sobre el plano XY
        ctx.beginPath();
        ctx.moveTo(orig.px, orig.py);
        ctx.lineTo(ext.px, ext.py);
        ctx.stroke();

        ctx.shadowBlur = 0;
        dibujarFlechaFn(orig.px, orig.py, ext.px, ext.py, v.color, esProductoCruz ? 12 : 10);

        if (capas.etiquetas) {
          const midX = (orig.px + ext.px) / 2;
          const midY = (orig.py + ext.py) / 2;
          const mod = Math.hypot(v.x, v.y, v.z);
          const modStr = Number.isInteger(mod) ? mod.toString() : mod.toFixed(2);
          const infoCota = v.z !== 0 ? ` (z=${v.z > 0 ? '+' : ''}${v.z})` : '';
          dibujarInsigniaFn(
            `${v.etiqueta}: (${v.x}, ${v.y})${infoCota} | |${v.etiqueta}| = ${modStr} u`,
            midX + 10, midY - 10, v.color
          );
        }
      }
      ctx.restore();
    });
  }

  static dibujarPuntos3D(ctx, puntos, proyectarFn, capas) {
    puntos.forEach(p => {
      const proy = proyectarFn(p.x, p.y, p.z);
      ctx.save();
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(proy.px, proy.py, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      if (capas.etiquetas) {
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${p.id}(${p.x}, ${p.y}, ${p.z})`, proy.px + 8, proy.py - 6);
      }
      ctx.restore();
    });
  }

  static dibujarParalelogramo3D(ctx, pts, proyectarFn, capas, dibujarInsigniaFn) {
    if (!pts || pts.length < 4) return;
    const proys = pts.map(p => proyectarFn(p.x, p.y, p.z));

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(proys[0].px, proys[0].py);
    for (let i = 1; i < proys.length; i++) {
      ctx.lineTo(proys[i].px, proys[i].py);
    }
    ctx.closePath();

    ctx.fillStyle = 'rgba(192, 132, 252, 0.18)';
    ctx.fill();

    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(192, 132, 252, 0.75)';
    ctx.stroke();

    // Medida del área superficial rotulada en el centroide geométrico
    if (capas.etiquetas) {
      const p0 = pts[0];
      const p1 = pts[1];
      const p3 = pts[3];
      const v1 = { x: p1.x - p0.x, y: p1.y - p0.y, z: p1.z - p0.z };
      const v2 = { x: p3.x - p0.x, y: p3.y - p0.y, z: p3.z - p0.z };
      const cruzX = v1.y * v2.z - v1.z * v2.y;
      const cruzY = v1.z * v2.x - v1.x * v2.z;
      const cruzZ = v1.x * v2.y - v1.y * v2.x;
      const area = Math.hypot(cruzX, cruzY, cruzZ);

      if (area > 0.05) {
        const centroide = proyectarFn(
          (pts[0].x + pts[1].x + pts[2].x + pts[3].x) / 4,
          (pts[0].y + pts[1].y + pts[2].y + pts[3].y) / 4,
          (pts[0].z + pts[1].z + pts[2].z + pts[3].z) / 4
        );
        const areaStr = Number.isInteger(area) ? area.toString() : area.toFixed(2);
        dibujarInsigniaFn(`Área = ${areaStr} u²`, centroide.px, centroide.py, '#c084fc');
      }
    }
    ctx.restore();
  }

  static dibujarProyeccionesSuelo(ctx, vectores, proyectarFn, capas) {
    ctx.save();
    ctx.setLineDash([3, 3]);
    ctx.lineWidth = 1.2;

    vectores.forEach(v => {
      const ext = v.extremo;
      const pExt = proyectarFn(ext.x, ext.y, ext.z);
      const pSuelo = proyectarFn(ext.x, ext.y, 0);
      const pX = proyectarFn(ext.x, 0, 0);
      const pY = proyectarFn(0, ext.y, 0);
      const pZ = proyectarFn(0, 0, ext.z);

      // Traza vertical hacia el plano del suelo (z = 0)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
      ctx.beginPath();
      ctx.moveTo(pExt.px, pExt.py);
      ctx.lineTo(pSuelo.px, pSuelo.py);
      ctx.stroke();

      // Proyecciones horizontales sobre el suelo hacia X e Y
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.beginPath();
      ctx.moveTo(pSuelo.px, pSuelo.py);
      ctx.lineTo(pX.px, pX.py);
      ctx.moveTo(pSuelo.px, pSuelo.py);
      ctx.lineTo(pY.px, pY.py);
      ctx.stroke();

      // Proyección hacia el eje vertical Z
      ctx.beginPath();
      ctx.moveTo(pExt.px, pExt.py);
      ctx.lineTo(pZ.px, pZ.py);
      ctx.stroke();

      // Cotas de medida espacial rotuladas
      if (capas.etiquetas && Math.abs(ext.z) >= 0.5) {
        ctx.save();
        ctx.font = '8px var(--fuente-mono, monospace)';
        ctx.fillStyle = '#c4b5fd';
        const midVertX = (pExt.px + pSuelo.px) / 2;
        const midVertY = (pExt.py + pSuelo.py) / 2;
        ctx.fillText(`z=${ext.z > 0 ? '+' : ''}${ext.z}`, midVertX + 4, midVertY);
        ctx.restore();
      }
    });

    ctx.restore();
  }

  static dibujarPuntaFlecha2D(ctx, x1, y1, x2, y2, color, tamaño = 10) {
    const angulo = Math.atan2(y2 - y1, x2 - x1);

    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(
      x2 - tamaño * Math.cos(angulo - Math.PI / 6),
      y2 - tamaño * Math.sin(angulo - Math.PI / 6)
    );
    ctx.lineTo(
      x2 - tamaño * Math.cos(angulo + Math.PI / 6),
      y2 - tamaño * Math.sin(angulo + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  static dibujarInsigniaEtiqueta(ctx, texto, x, y, colorBorde) {
    ctx.save();
    ctx.font = '10px var(--fuente-mono, monospace)';
    const metrica = ctx.measureText(texto);
    const paddingX = 6;
    const paddingY = 3;
    const ancho = metrica.width + paddingX * 2;
    const alto = 16;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.strokeStyle = colorBorde;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.roundRect(x - paddingX, y - alto + paddingY, ancho, alto, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.fillText(texto, x, y - 2);
    ctx.restore();
  }
}
