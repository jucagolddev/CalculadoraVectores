import { Configuracion } from '../constants/Configuracion.js';

// Casos de Uso (Application Layer)
import { CalcularCadenaUseCase } from '../../features/cadena-vectores/application/CalcularCadenaUseCase.js';
import { CalcularOperacionesUseCase } from '../../features/operaciones/application/CalcularOperacionesUseCase.js';
import { EvaluarEquipolenciaUseCase } from '../../features/equipolencia/application/EvaluarEquipolenciaUseCase.js';
import { VerificarRespuestaUseCase } from '../../features/solucionador/application/VerificarRespuestaUseCase.js';

// Controladores de Presentación (Presentation Layer)
import { ControladorCadena } from '../../features/cadena-vectores/presentation/ControladorCadena.js';
import { ControladorOperaciones } from '../../features/operaciones/presentation/ControladorOperaciones.js';
import { ControladorEquipolencia } from '../../features/equipolencia/presentation/ControladorEquipolencia.js';
import { ControladorSolucion } from '../../features/solucionador/presentation/ControladorSolucion.js';
import { ControladorFormulas } from '../../features/formulas/presentation/ControladorFormulas.js';
import { ControladorAlmacenamiento } from '../../features/ejercicios/presentation/ControladorAlmacenamiento.js';
import { ControladorTeoria } from '../../features/teoria/presentation/ControladorTeoria.js';

/**
 * Contenedor de Inversión de Control (IoC) y Factoría de Controladores.
 * Desacopla la instanciación de dependencias del ciclo de vida de la aplicación.
 */
export class FactoriaControladores {
  /**
   * @param {Object} domElements - Referencias a elementos del DOM
   * @param {EstadoApp} estadoApp - Store central reactivo
   * @param {PlanoCartesiano} plano - Motor de renderizado en Canvas
   * @returns {Object} Diccionario con los controladores instanciados
   */
  static fabricar(domElements, estadoApp, plano) {
    // 1. Instanciación de Casos de Uso (Capa de Aplicación)
    const cadenaUseCase = new CalcularCadenaUseCase();
    const operacionesUseCase = new CalcularOperacionesUseCase();
    const equipolenciaUseCase = new EvaluarEquipolenciaUseCase();
    const verificarUseCase = new VerificarRespuestaUseCase();

    // 2. Controladores Transversales
    const ctrlSolucion = new ControladorSolucion(
      domElements.contenedorComprobacion,
      domElements.cajonSolucion,
      domElements.cuerpoSolucion,
      verificarUseCase,
      estadoApp
    );

    const ctrlFormulas = new ControladorFormulas(domElements.modalFormulas);

    // 3. Controladores de Modos de Cálculo
    const ctrlCadena = new ControladorCadena(
      domElements.contenedorFormulario,
      domElements.contenedorResumen,
      cadenaUseCase,
      estadoApp,
      (autoAjustar) => {
        ctrlSolucion.renderizarFormularioComprobacion(Configuracion.MODOS_APP.CADENA_PUNTOS, ctrlCadena.puntos);
        if (autoAjustar) plano.autoAjustarVista();
      }
    );

    const ctrlOperaciones = new ControladorOperaciones(
      domElements.contenedorFormulario,
      domElements.contenedorResumen,
      operacionesUseCase,
      estadoApp
    );

    const ctrlEquipolencia = new ControladorEquipolencia(
      domElements.contenedorFormulario,
      domElements.contenedorResumen,
      equipolenciaUseCase,
      estadoApp
    );

    // 4. Controlador de Persistencia y Almacenamiento Local
    const ctrlAlmacenamiento = new ControladorAlmacenamiento(
      domElements.modalAlmacen,
      estadoApp,
      {
        ctrlCadena,
        ctrlOperaciones,
        ctrlEquipolencia
      },
      (modo) => {
        ctrlSolucion.renderizarFormularioComprobacion(modo, ctrlCadena.puntos);
        plano.autoAjustarVista();
      }
    );

    // 5. Controlador de la Sección Teórica Interactiva
    const ctrlTeoria = new ControladorTeoria(
      domElements.modalTeoria,
      ({ modo, datos, construccion, entorno }) => {
        estadoApp.actualizar({
          entornoActivo: entorno,
          modoActivo: modo,
          respuestasVisibles: entorno === 'calculadora',
          construccionGeometrica: construccion || 'paralelogramo'
        });

        if (modo === Configuracion.MODOS_APP.CADENA_PUNTOS) {
          ctrlCadena.cargarEjercicio(datos);
        } else if (modo === Configuracion.MODOS_APP.OPERACIONES) {
          ctrlOperaciones.cargarEjercicio(datos);
        } else if (modo === Configuracion.MODOS_APP.EQUIPOLENCIA) {
          ctrlEquipolencia.cargarEjercicio(datos);
        }

        ctrlSolucion.renderizarFormularioComprobacion(modo, ctrlCadena.puntos);
        plano.autoAjustarVista();
      }
    );

    return {
      ctrlSolucion,
      ctrlFormulas,
      ctrlCadena,
      ctrlOperaciones,
      ctrlEquipolencia,
      ctrlAlmacenamiento,
      ctrlTeoria
    };
  }
}
