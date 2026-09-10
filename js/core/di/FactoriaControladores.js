import { Configuracion } from '../constants/Configuracion.js';

// Casos de Uso (Application Layer)
import { CalcularCadenaUseCase } from '../../features/cadena-vectores/application/CalcularCadenaUseCase.js';
import { CalcularOperacionesUseCase } from '../../features/operaciones/application/CalcularOperacionesUseCase.js';
import { EvaluarEquipolenciaUseCase } from '../../features/equipolencia/application/EvaluarEquipolenciaUseCase.js';
import { VerificarRespuestaUseCase } from '../../features/solucionador/application/VerificarRespuestaUseCase.js';
import { CalcularOperaciones3DUseCase } from '../../features/espacio-3d/application/CalcularOperaciones3DUseCase.js';
import { CalcularPuntos3DUseCase } from '../../features/espacio-3d/application/CalcularPuntos3DUseCase.js';

// Controladores de Presentación (Presentation Layer)
import { ControladorCadena } from '../../features/cadena-vectores/presentation/ControladorCadena.js';
import { ControladorOperaciones } from '../../features/operaciones/presentation/ControladorOperaciones.js';
import { ControladorEquipolencia } from '../../features/equipolencia/presentation/ControladorEquipolencia.js';
import { ControladorSolucion } from '../../features/solucionador/presentation/ControladorSolucion.js';
import { ControladorFormulas } from '../../features/formulas/presentation/ControladorFormulas.js';
import { ControladorAlmacenamiento } from '../../features/ejercicios/presentation/ControladorAlmacenamiento.js';
import { ControladorTeoria } from '../../features/teoria/presentation/ControladorTeoria.js';
import { PopoverInfoContextual } from '../../features/teoria/presentation/PopoverInfoContextual.js';
import { ControladorOperaciones3D } from '../../features/espacio-3d/presentation/ControladorOperaciones3D.js';
import { ControladorPuntos3D } from '../../features/espacio-3d/presentation/ControladorPuntos3D.js';

/**
 * Contenedor de Inversión de Control (IoC) y Factoría de Controladores.
 * Desacopla la instanciación de dependencias del ciclo de vida de la aplicación.
 */
export class FactoriaControladores {
  /**
   * @param {Object} domElements - Referencias a elementos del DOM
   * @param {Object} domElements - Referencias a elementos del DOM
   * @param {EstadoApp} estadoApp - Store central reactivo
   * @param {PlanoCartesiano} plano - Motor de renderizado en Canvas 2D
   * @param {MotorGrafico3D} motor3D - Motor de renderizado en Canvas 3D
   * @returns {Object} Diccionario con los controladores instanciados
   */
  static fabricar(domElements, estadoApp, plano, motor3D) {
    // 1. Instanciación de Casos de Uso (Capa de Aplicación)
    const cadenaUseCase = new CalcularCadenaUseCase();
    const operacionesUseCase = new CalcularOperacionesUseCase();
    const equipolenciaUseCase = new EvaluarEquipolenciaUseCase();
    const verificarUseCase = new VerificarRespuestaUseCase();
    const operaciones3DUseCase = new CalcularOperaciones3DUseCase();
    const puntos3DUseCase = new CalcularPuntos3DUseCase();

    // 2. Controladores Transversales
    const ctrlSolucion = new ControladorSolucion(
      domElements.contenedorComprobacion,
      domElements.cajonSolucion,
      domElements.cuerpoSolucion,
      verificarUseCase,
      estadoApp
    );

    const ctrlFormulas = new ControladorFormulas(domElements.modalFormulas);

    // 3. Controladores de Modos de Cálculo 2D
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

    // 4. Controladores de Modos de Cálculo 3D
    const ctrlOperaciones3D = new ControladorOperaciones3D(
      domElements.contenedorFormulario,
      domElements.contenedorResumen,
      operaciones3DUseCase,
      estadoApp,
      motor3D
    );

    const ctrlPuntos3D = new ControladorPuntos3D(
      domElements.contenedorFormulario,
      domElements.contenedorResumen,
      puntos3DUseCase,
      estadoApp,
      motor3D
    );

    // 5. Controlador de Persistencia y Almacenamiento Local
    const ctrlAlmacenamiento = new ControladorAlmacenamiento(
      domElements.modalAlmacen,
      estadoApp,
      {
        ctrlCadena,
        ctrlOperaciones,
        ctrlEquipolencia,
        ctrlOperaciones3D,
        ctrlPuntos3D
      },
      (modo) => {
        ctrlSolucion.renderizarFormularioComprobacion(modo, ctrlCadena.puntos);
        plano.autoAjustarVista();
      }
    );

    // 6. Controlador de la Sección Teórica Interactiva
    const ctrlTeoria = new ControladorTeoria(
      domElements.modalTeoria,
      ({ modo, datos, construccion, entorno }) => {
        const es3D = entorno === Configuracion.ENTORNOS_APP.ESPACIO_3D;
        plano.establecerActivo(!es3D);
        if (motor3D) motor3D.establecerActivo(es3D);

        estadoApp.actualizar({
          entornoActivo: entorno,
          modoActivo: modo,
          dimensionActiva: es3D ? '3d' : '2d',
          respuestasVisibles: entorno === 'calculadora' || entorno === 'espacio-3d',
          construccionGeometrica: construccion || 'paralelogramo'
        });

        if (modo === Configuracion.MODOS_APP.CADENA_PUNTOS) {
          ctrlCadena.cargarEjercicio(datos);
          ctrlSolucion.renderizarFormularioComprobacion(modo, ctrlCadena.puntos);
          plano.autoAjustarVista();
        } else if (modo === Configuracion.MODOS_APP.OPERACIONES) {
          ctrlOperaciones.cargarEjercicio(datos);
          ctrlSolucion.renderizarFormularioComprobacion(modo);
          plano.autoAjustarVista();
        } else if (modo === Configuracion.MODOS_APP.EQUIPOLENCIA) {
          ctrlEquipolencia.cargarEjercicio(datos);
          ctrlSolucion.renderizarFormularioComprobacion(modo);
          plano.autoAjustarVista();
        } else if (modo === Configuracion.MODOS_APP.OPERACIONES_3D) {
          ctrlOperaciones3D.cargarEjercicio(datos);
        } else if (modo === Configuracion.MODOS_APP.PUNTOS_3D) {
          ctrlPuntos3D.cargarEjercicio(datos);
        }
      }
    );

    // 7. Popover de Información Contextual en tiempo real
    const popoverInfo = new PopoverInfoContextual((temaId) => {
      ctrlTeoria.abrir(temaId);
    });

    return {
      ctrlSolucion,
      ctrlFormulas,
      ctrlCadena,
      ctrlOperaciones,
      ctrlEquipolencia,
      ctrlOperaciones3D,
      ctrlPuntos3D,
      ctrlAlmacenamiento,
      ctrlTeoria,
      popoverInfo
    };
  }
}
