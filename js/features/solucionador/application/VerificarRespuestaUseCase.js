import { Configuracion } from '../../../core/constants/Configuracion.js';
import { FormateadorMatematico } from '../../../shared/utils/FormateadorMatematico.js';

/**
 * Caso de uso: Verificar y comparar las respuestas numéricas introducidas
 * por el usuario contra los resultados exactos del modelo matemático.
 */
export class VerificarRespuestaUseCase {
  /**
   * @param {Object} respuestasUsuario
   * @param {Object} solucionExacta
   * @param {number} [tolerancia=Configuracion.TOLERANCIA_NUMERICA]
   * @returns {Array<{campo: string, correcto: boolean, esperado: string, recibido: string|number, mensaje: string}>}
   */
  ejecutar(respuestasUsuario, solucionExacta, tolerancia = Configuracion.TOLERANCIA_NUMERICA) {
    const correcciones = [];

    for (const clave of Object.keys(respuestasUsuario)) {
      if (!(clave in solucionExacta)) continue;

      const valorUsuario = Number(respuestasUsuario[clave]);
      const valorEsperado = Number(solucionExacta[clave]);

      if (Number.isNaN(valorUsuario)) {
        correcciones.push({
          campo: clave,
          correcto: false,
          esperado: FormateadorMatematico.formatearNumero(valorEsperado),
          recibido: 'Sin respuesta o valor no numérico',
          mensaje: 'Debes introducir un valor numérico válido.'
        });
        continue;
      }

      const diferencia = Math.abs(valorUsuario - valorEsperado);
      const esCorrecto = diferencia <= tolerancia;

      correcciones.push({
        campo: clave,
        correcto: esCorrecto,
        esperado: FormateadorMatematico.formatearNumero(valorEsperado),
        recibido: valorUsuario,
        mensaje: esCorrecto
          ? '¡Excelente trabajo! Tu cálculo coincide con la solución exacta.'
          : `Discrepancia detectada. El valor teórico esperado es ${FormateadorMatematico.formatearNumero(valorEsperado)}.`
      });
    }

    return correcciones;
  }
}
