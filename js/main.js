import { EstadoApp } from './core/state/EstadoApp.js';
import { Configuracion } from './core/constants/Configuracion.js';
import { PlanoCartesiano } from './shared/canvas/PlanoCartesiano.js';
import { MotorGrafico3D } from './shared/canvas/MotorGrafico3D.js';
import { FactoriaControladores } from './core/di/FactoriaControladores.js';
import { GeneradorEjerciciosService } from './features/ejercicios/domain/GeneradorEjerciciosService.js';
import { GeneradorInputs } from './shared/utils/GeneradorInputs.js';
import { Navbar } from './layout/Navbar.js';
import { Hud } from './layout/Hud.js';

/**
 * Punto de entrada y orquestador maestro de la aplicación VectorLab
 */
class Bootstrap {
  static iniciar() {
    // Inicialización del manejador global de steppers numéricos
    GeneradorInputs.inicializarManejadorSteppers();

    // 1. Instanciación del Estado Global Centralizado
    const estadoApp = new EstadoApp();

    // 2. Referencias a elementos del DOM
    const lienzo = document.getElementById('lienzo-cartesiano');
    const domControladores = {
      contenedorFormulario: document.getElementById('contenedor-formulario-dinamico'),
      contenedorResumen: document.getElementById('contenedor-resumen-rapido'),
      contenedorComprobacion: document.getElementById('contenedor-comprobacion-dinamica'),
      cajonSolucion: document.getElementById('cajon-solucion'),
      cuerpoSolucion: document.getElementById('cuerpo-solucion'),
      modalFormulas: document.getElementById('modal-formulas'),
      modalAlmacen: document.getElementById('modal-almacen-ejercicios'),
      modalTeoria: document.getElementById('modal-teoria')
    };

    // 3. Motores Gráficos (2D y 3D)
    const plano = new PlanoCartesiano(lienzo);
    let hud = null;
    const motor3D = new MotorGrafico3D(lienzo, (infoCam) => {
      if (hud) hud.actualizarCoordenadas3D(infoCam);
    });

    // 4. Fabricación e Inyección de Dependencias (IoC)
    const ctrls = FactoriaControladores.fabricar(domControladores, estadoApp, plano, motor3D);

    // 5. Acciones Globales
    const reejecutarControladorActivo = () => {
      const modo = estadoApp.obtener().modoActivo;
      if (modo === Configuracion.MODOS_APP.CADENA_PUNTOS) {
        ctrls.ctrlCadena.procesarYActualizar();
      } else if (modo === Configuracion.MODOS_APP.OPERACIONES) {
        ctrls.ctrlOperaciones.procesarYActualizar();
      } else if (modo === Configuracion.MODOS_APP.EQUIPOLENCIA) {
        ctrls.ctrlEquipolencia.procesarYActualizar();
      } else if (modo === Configuracion.MODOS_APP.OPERACIONES_3D) {
        ctrls.ctrlOperaciones3D.procesarYActualizar();
      } else if (modo === Configuracion.MODOS_APP.PUNTOS_3D) {
        ctrls.ctrlPuntos3D.procesarYActualizar();
      }
    };

    const ponerACero = () => {
      const modo = estadoApp.obtener().modoActivo;
      if (modo === Configuracion.MODOS_APP.CADENA_PUNTOS) {
        ctrls.ctrlCadena.reiniciarACero();
        ctrls.ctrlSolucion.renderizarFormularioComprobacion(modo, ctrls.ctrlCadena.puntos);
        plano.centrarOrigen();
      } else if (modo === Configuracion.MODOS_APP.OPERACIONES) {
        ctrls.ctrlOperaciones.reiniciarACero();
        ctrls.ctrlSolucion.renderizarFormularioComprobacion(modo);
        plano.centrarOrigen();
      } else if (modo === Configuracion.MODOS_APP.EQUIPOLENCIA) {
        ctrls.ctrlEquipolencia.reiniciarACero();
        ctrls.ctrlSolucion.renderizarFormularioComprobacion(modo);
        plano.centrarOrigen();
      } else if (modo === Configuracion.MODOS_APP.OPERACIONES_3D) {
        ctrls.ctrlOperaciones3D.reiniciarACero();
        ctrls.ctrlSolucion.renderizarFormularioComprobacion(modo);
        motor3D.centrarOrigen();
      } else if (modo === Configuracion.MODOS_APP.PUNTOS_3D) {
        ctrls.ctrlPuntos3D.reiniciarACero();
        ctrls.ctrlSolucion.renderizarFormularioComprobacion(modo);
        motor3D.centrarOrigen();
      }
    };

    const generarNuevoReto = () => {
      const modo = estadoApp.obtener().modoActivo;
      estadoApp.actualizar({
        entornoActivo: Configuracion.ENTORNOS_APP.EJERCICIO,
        respuestasVisibles: false
      });

      if (modo === Configuracion.MODOS_APP.CADENA_PUNTOS) {
        const puntos = GeneradorEjerciciosService.generarPuntosCadena(2);
        ctrls.ctrlCadena.cargarEjercicio(puntos);
        ctrls.ctrlSolucion.renderizarFormularioComprobacion(modo, ctrls.ctrlCadena.puntos);
      } else if (modo === Configuracion.MODOS_APP.OPERACIONES) {
        const ops = GeneradorEjerciciosService.generarOperaciones();
        ctrls.ctrlOperaciones.cargarEjercicio(ops);
        ctrls.ctrlSolucion.renderizarFormularioComprobacion(modo);
      } else if (modo === Configuracion.MODOS_APP.EQUIPOLENCIA) {
        const eq = GeneradorEjerciciosService.generarEquipolencia();
        ctrls.ctrlEquipolencia.cargarEjercicio(eq);
        ctrls.ctrlSolucion.renderizarFormularioComprobacion(modo);
      } else if (modo === Configuracion.MODOS_APP.OPERACIONES_3D) {
        const ops3D = {
          ux: Math.floor(Math.random() * 7) - 3,
          uy: Math.floor(Math.random() * 7) - 3,
          uz: Math.floor(Math.random() * 7) - 3,
          vx: Math.floor(Math.random() * 7) - 3,
          vy: Math.floor(Math.random() * 7) - 3,
          vz: Math.floor(Math.random() * 7) - 3,
          k: (Math.floor(Math.random() * 4) + 1) * 0.5
        };
        ctrls.ctrlOperaciones3D.cargarEjercicio(ops3D);
        ctrls.ctrlSolucion.renderizarFormularioComprobacion(modo);
        motor3D.autoAjustar();
      } else if (modo === Configuracion.MODOS_APP.PUNTOS_3D) {
        const pts3D = {
          ax: Math.floor(Math.random() * 7) - 3,
          ay: Math.floor(Math.random() * 7) - 3,
          az: Math.floor(Math.random() * 7) - 3,
          bx: Math.floor(Math.random() * 7) - 3,
          by: Math.floor(Math.random() * 7) - 3,
          bz: Math.floor(Math.random() * 7) - 3
        };
        ctrls.ctrlPuntos3D.cargarEjercicio(pts3D);
        ctrls.ctrlSolucion.renderizarFormularioComprobacion(modo);
        motor3D.autoAjustar();
      }

      if (modo !== Configuracion.MODOS_APP.OPERACIONES_3D && modo !== Configuracion.MODOS_APP.PUNTOS_3D) {
        plano.autoAjustarVista();
      }
    };

    const cambiarEntorno = (nuevoEntorno) => {
      const esEjercicio = nuevoEntorno === Configuracion.ENTORNOS_APP.EJERCICIO;
      const es3D = nuevoEntorno === Configuracion.ENTORNOS_APP.ESPACIO_3D;

      plano.establecerActivo(!es3D);
      motor3D.establecerActivo(es3D);

      let nuevoModo = estadoApp.obtener().modoActivo;
      if (es3D) {
        if (nuevoModo !== Configuracion.MODOS_APP.OPERACIONES_3D && nuevoModo !== Configuracion.MODOS_APP.PUNTOS_3D) {
          nuevoModo = Configuracion.MODOS_APP.OPERACIONES_3D;
        }
      } else {
        if (nuevoModo === Configuracion.MODOS_APP.OPERACIONES_3D || nuevoModo === Configuracion.MODOS_APP.PUNTOS_3D) {
          nuevoModo = Configuracion.MODOS_APP.CADENA_PUNTOS;
        }
      }

      estadoApp.actualizar({
        entornoActivo: nuevoEntorno,
        modoActivo: nuevoModo,
        dimensionActiva: es3D ? '3d' : '2d',
        respuestasVisibles: !esEjercicio
      });

      activarModo(nuevoModo);
    };

    // 6. Componentes Estructurales de Layout y HUD
    new Navbar(
      {
        botonesModo: document.querySelectorAll('.boton-modo'),
        botonesEntorno: document.querySelectorAll('.btn-entorno'),
        btnPonerACero: document.getElementById('btn-poner-a-cero'),
        btnNuevoReto: document.getElementById('btn-nuevo-reto'),
        btnGuardar: document.getElementById('btn-guardar-ejercicio'),
        btnAlmacen: document.getElementById('btn-abrir-almacen'),
        btnFormulas: document.getElementById('btn-abrir-formulas'),
        btnSolucion: document.getElementById('btn-abrir-solucion'),
        btnTeoria: document.getElementById('btn-abrir-teoria')
      },
      estadoApp,
      {
        alAbrirFormulas: () => ctrls.ctrlFormulas.abrir(),
        alAbrirSolucion: () => ctrls.ctrlSolucion.abrir(null),
        alAbrirTeoria: () => ctrls.ctrlTeoria.abrir(),
        alPonerACero: ponerACero,
        alNuevoReto: generarNuevoReto,
        alCambiarEntorno: cambiarEntorno,
        alGuardarEjercicio: () => ctrls.ctrlAlmacenamiento.guardarEjercicioActual(),
        alAbrirAlmacen: () => ctrls.ctrlAlmacenamiento.abrir()
      }
    );

    hud = new Hud(
      {
        textoCoords: document.getElementById('hud-coords-texto'),
        btnToggleTodo: document.getElementById('btn-toggle-todo'),
        btnVectores: document.getElementById('btn-toggle-vectores'),
        btnPuntos: document.getElementById('btn-toggle-puntos'),
        btnEtiquetas: document.getElementById('btn-toggle-etiquetas'),
        btnConstrucciones: document.getElementById('btn-toggle-construcciones'),
        btnProyecciones: document.getElementById('btn-toggle-proyecciones'),
        btnCuadricula: document.getElementById('btn-toggle-cuadricula'),
        btnEjes: document.getElementById('btn-toggle-ejes'),
        btnZoomIn: document.getElementById('btn-zoom-in'),
        btnZoomOut: document.getElementById('btn-zoom-out'),
        btnCentrar: document.getElementById('btn-centrar'),
        btnAjustar: document.getElementById('btn-ajustar'),
        btnExportar: document.getElementById('btn-exportar')
      },
      plano,
      estadoApp,
      motor3D
    );

    // 7. Sincronización Reactiva (Estado -> Motor Gráfico)
    estadoApp.suscribir('*', (nuevoEstado) => {
      plano.actualizarElementos(
        nuevoEstado.vectoresRenderizables,
        nuevoEstado.puntosRenderizables,
        nuevoEstado.construccionGeometrica
      );
    });

    estadoApp.suscribir('respuestasVisibles', () => {
      reejecutarControladorActivo();
    });

    // 8. Manejo del Cambio de Modo
    const activarModo = (modo) => {
      const esModo3D = modo === Configuracion.MODOS_APP.OPERACIONES_3D || modo === Configuracion.MODOS_APP.PUNTOS_3D;
      plano.establecerActivo(!esModo3D);
      motor3D.establecerActivo(esModo3D);

      if (modo === Configuracion.MODOS_APP.CADENA_PUNTOS) {
        ctrls.ctrlCadena.renderizar();
        ctrls.ctrlCadena.procesarYActualizar();
        ctrls.ctrlSolucion.renderizarFormularioComprobacion(modo, ctrls.ctrlCadena.puntos);
      } else if (modo === Configuracion.MODOS_APP.OPERACIONES) {
        ctrls.ctrlOperaciones.renderizar();
        ctrls.ctrlOperaciones.procesarYActualizar();
        ctrls.ctrlSolucion.renderizarFormularioComprobacion(modo);
      } else if (modo === Configuracion.MODOS_APP.EQUIPOLENCIA) {
        ctrls.ctrlEquipolencia.renderizar();
        ctrls.ctrlEquipolencia.procesarYActualizar();
        ctrls.ctrlSolucion.renderizarFormularioComprobacion(modo);
      } else if (modo === Configuracion.MODOS_APP.OPERACIONES_3D) {
        ctrls.ctrlOperaciones3D.renderizar();
        ctrls.ctrlOperaciones3D.procesarYActualizar();
        ctrls.ctrlSolucion.renderizarFormularioComprobacion(modo);
      } else if (modo === Configuracion.MODOS_APP.PUNTOS_3D) {
        ctrls.ctrlPuntos3D.renderizar();
        ctrls.ctrlPuntos3D.procesarYActualizar();
        ctrls.ctrlSolucion.renderizarFormularioComprobacion(modo);
      }
    };

    estadoApp.suscribir('modoActivo', (nuevoEstado) => {
      activarModo(nuevoEstado.modoActivo);
    });

    // 9. Teclado Global (Escape para cerrar paneles)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        ctrls.ctrlFormulas.cerrar();
        ctrls.ctrlSolucion.cerrar();
        ctrls.ctrlAlmacenamiento.cerrar();
        ctrls.ctrlTeoria.cerrar();
        ctrls.popoverInfo.cerrar();
      }
    });

    // Inicialización del modo inicial
    activarModo(Configuracion.MODOS_APP.CADENA_PUNTOS);
  }
}

document.addEventListener('DOMContentLoaded', () => Bootstrap.iniciar());
