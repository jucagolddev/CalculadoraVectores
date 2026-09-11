/**
 * Renderizador del Modo Plano: Hoja de Papel Técnico de Ingeniería (R2 c R3).
 * Dibuja el folio técnico milimetrado, marco perimetral, regla graduada y ejes cartesianos planos.
 */
export class RenderizadorPlanoPapel {
  static calcularLimitesFolio(anchoLogico, altoLogico, escala, panX, panY) {
    const cx = anchoLogico / 2 + panX;
    const cy = altoLogico / 2 + panY;
    const anchoFolio = Math.max(840, escala * 26);
    const altoFolio = Math.max(640, escala * 20);
    const x0 = cx - anchoFolio / 2;
    const y0 = cy - altoFolio / 2;

    return { cx, cy, anchoFolio, altoFolio, x0, y0 };
  }

  static dibujarHojaPapel(ctx, anchoLogico, altoLogico, escala, panX, panY) {
    const { anchoFolio, altoFolio, x0, y0 } = this.calcularLimitesFolio(anchoLogico, altoLogico, escala, panX, panY);

    // Mesa de trabajo oscura de fondo
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, anchoLogico, altoLogico);

    ctx.save();
    // Sombra del folio técnico
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 12;

    // Cuerpo de la hoja de papel técnico (azul pizarra de ingeniería)
    ctx.fillStyle = '#090d1a';
    ctx.beginPath();
    ctx.roundRect(x0, y0, anchoFolio, altoFolio, 8);
    ctx.fill();

    // Borde exterior técnico
    ctx.shadowBlur = 0;
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.28)';
    ctx.stroke();

    // Marco técnico perimetral interior
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x0 + 12, y0 + 12, anchoFolio - 24, altoFolio - 24);

    // Cabecera formal del plano técnico
    ctx.font = 'bold 10px var(--fuente-mono, monospace)';
    ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
    ctx.fillText('HOJA DE TRABAJO TÉCNICA: PLANO CARTESIANO ℝ² (z = 0)', x0 + 24, y0 + 26);

    ctx.fillStyle = 'rgba(56, 189, 248, 0.8)';
    ctx.fillText(`ESCALA: 1 u = ${Math.round(escala)} px | EJE NORMAL Z ⊙`, x0 + anchoFolio - 260, y0 + 26);

    // Cajetín técnico en la esquina inferior derecha
    const anchoCajetin = 260;
    const altoCajetin = 42;
    const xCajetin = x0 + anchoFolio - anchoCajetin - 16;
    const yCajetin = y0 + altoFolio - altoCajetin - 16;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
    ctx.beginPath();
    ctx.roundRect(xCajetin, yCajetin, anchoCajetin, altoCajetin, 4);
    ctx.fill();
    ctx.stroke();

    ctx.font = '9px var(--fuente-mono, monospace)';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('PROYECCIÓN PLANA ORTOGONAL', xCajetin + 10, yCajetin + 16);
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('MODO PAPEL TÉCNICO ℝ² ⊂ ℝ³', xCajetin + 10, yCajetin + 32);

    ctx.restore();
  }

  static dibujarCuadriculaPapel(ctx, anchoLogico, altoLogico, escala, panX, panY) {
    const { cx, cy, anchoFolio, altoFolio, x0, y0 } = this.calcularLimitesFolio(anchoLogico, altoLogico, escala, panX, panY);

    ctx.save();
    ctx.beginPath();
    ctx.rect(x0, y0, anchoFolio, altoFolio);
    ctx.clip();

    const pasoMayor = escala;
    const pasoMenor = escala / 5;

    // Cuadrícula fina milimetrada
    if (pasoMenor >= 4) {
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = cx % pasoMenor; x <= x0 + anchoFolio; x += pasoMenor) {
        if (x >= x0) {
          ctx.moveTo(x, y0);
          ctx.lineTo(x, y0 + altoFolio);
        }
      }
      for (let y = cy % pasoMenor; y <= y0 + altoFolio; y += pasoMenor) {
        if (y >= y0) {
          ctx.moveTo(x0, y);
          ctx.lineTo(x0 + anchoFolio, y);
        }
      }
      ctx.stroke();
    }

    // Cuadrícula principal de 1 unidad
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = cx % pasoMayor; x <= x0 + anchoFolio; x += pasoMayor) {
      if (x >= x0) {
        ctx.moveTo(x, y0);
        ctx.lineTo(x, y0 + altoFolio);
      }
    }
    for (let y = cy % pasoMayor; y <= y0 + altoFolio; y += pasoMayor) {
      if (y >= y0) {
        ctx.moveTo(x0, y);
        ctx.lineTo(x0 + anchoFolio, y);
      }
    }
    ctx.stroke();
    ctx.restore();
  }

  static dibujarEjesPapel(ctx, anchoLogico, altoLogico, escala, panX, panY, mostrarEtiquetas, dibujarFlechaFn) {
    const { cx, cy, anchoFolio, altoFolio, x0, y0 } = this.calcularLimitesFolio(anchoLogico, altoLogico, escala, panX, panY);

    ctx.save();
    ctx.beginPath();
    ctx.rect(x0, y0, anchoFolio, altoFolio);
    ctx.clip();

    // Eje X Positivo (Rojo)
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x0 + anchoFolio - 25, cy);
    ctx.stroke();
    dibujarFlechaFn(cx, cy, x0 + anchoFolio - 25, cy, '#ef4444', 9);

    // Eje X Negativo (Discontinuo)
    ctx.setLineDash([3, 4]);
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x0 + 44, cy);
    ctx.stroke();
    ctx.setLineDash([]);

    // Eje Y Positivo (Verde)
    ctx.strokeStyle = '#10b981';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx, y0 + 35);
    ctx.stroke();
    dibujarFlechaFn(cx, cy, cx, y0 + 35, '#10b981', 9);

    // Eje Y Negativo (Discontinuo)
    ctx.setLineDash([3, 4]);
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.35)';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx, y0 + altoFolio - 25);
    ctx.stroke();
    ctx.setLineDash([]);

    // Graduación métrica y marcas numéricas de escala
    const pasoPapel = escala >= 26 ? 1 : (escala >= 14 ? 2 : 5);
    ctx.font = '9px var(--fuente-mono, monospace)';

    // Marcas numéricas en Eje X
    const limIzqX = Math.floor((x0 - cx) / escala);
    const limDerX = Math.ceil((x0 + anchoFolio - cx) / escala);
    for (let k = limIzqX; k <= limDerX; k++) {
      if (k === 0 || k % pasoPapel !== 0) continue;
      const px = cx + k * escala;
      if (px < x0 + 18 || px > x0 + anchoFolio - 35) continue;

      ctx.lineWidth = 1;
      ctx.strokeStyle = k > 0 ? '#ef4444' : 'rgba(239, 68, 68, 0.45)';
      ctx.beginPath();
      ctx.moveTo(px, cy - 3.5);
      ctx.lineTo(px, cy + 3.5);
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = k > 0 ? '#fca5a5' : 'rgba(248, 113, 113, 0.6)';
      ctx.fillText(k.toString(), px, cy + 12);
    }

    // Marcas numéricas en Eje Y
    const limInfY = Math.floor((cy - (y0 + altoFolio)) / escala);
    const limSupY = Math.ceil((cy - y0) / escala);
    for (let k = limInfY; k <= limSupY; k++) {
      if (k === 0 || k % pasoPapel !== 0) continue;
      const py = cy - k * escala;
      if (py < y0 + 35 || py > y0 + altoFolio - 18) continue;

      ctx.lineWidth = 1;
      ctx.strokeStyle = k > 0 ? '#10b981' : 'rgba(16, 185, 129, 0.45)';
      ctx.beginPath();
      ctx.moveTo(cx - 3.5, py);
      ctx.lineTo(cx + 3.5, py);
      ctx.stroke();

      ctx.textAlign = 'right';
      ctx.fillStyle = k > 0 ? '#6ee7b7' : 'rgba(52, 211, 153, 0.6)';
      ctx.fillText(k.toString(), cx - 6, py + 3);
    }

    // Origen 0
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
    ctx.fillText('0(0, 0, 0)', cx - 6, cy + 12);

    // Etiquetas de los ejes
    if (mostrarEtiquetas) {
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillStyle = '#ef4444';
      ctx.fillText('Eje X (+i)', x0 + anchoFolio - 70, cy - 8);

      ctx.fillStyle = '#10b981';
      ctx.fillText('Eje Y (+j)', cx + 10, y0 + 45);

      // Eje Z en el origen (Símbolo de física perpendicular al papel)
      ctx.fillStyle = 'rgba(139, 92, 246, 0.2)';
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Punto central ⊙
      ctx.fillStyle = '#8b5cf6';
      ctx.beginPath();
      ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = 'bold 10px Inter, sans-serif';
      ctx.fillText('Eje Z ⊙ (+k)', cx + 14, cy + 18);
    }

    ctx.restore();
  }
}
