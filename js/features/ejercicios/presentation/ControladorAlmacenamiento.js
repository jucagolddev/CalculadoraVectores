import { RepositorioEjerciciosLocal } from '../infrastructure/RepositorioEjerciciosLocal.js';
import { Configuracion } from '../../../core/constants/Configuracion.js';

/**
 * Controlador de presentación para el almacenamiento local de ejercicios y su modal interactivo.
 */
export class ControladorAlmacenamiento {
  /**
   * @param {HTMLElement} modalElement
   * @param {EstadoApp} estadoApp
   * @param {Object} controladores - { ctrlCadena, ctrlOperaciones, ctrlEquipolencia }
   * @param {Function} alCargarEjercicio - Callback invocado tras cargar un ejercicio
   */
  constructor(modalElement, estadoApp, controladores, alCargarEjercicio) {
    this._modal = modalElement;
    this._estadoApp = estadoApp;
    this._ctrls = controladores;
    this._alCargarEjercicio = alCargarEjercicio;

    this._vincularEventosBase();
  }

  _vincularEventosBase() {
    const btnCerrar = this._modal.querySelector('.btn-cerrar-modal-almacen');
    if (btnCerrar) {
      btnCerrar.addEventListener('click', () => this.cerrar());
    }

    this._modal.addEventListener('click', (e) => {
      if (e.target === this._modal) this.cerrar();
    });
  }

  abrir() {
    this.renderizarLista();
    this._modal.classList.add('activo');
  }

  cerrar() {
    this._modal.classList.remove('activo');
  }

  renderizarLista() {
    const contenedorLista = this._modal.querySelector('#lista-ejercicios-guardados');
    if (!contenedorLista) return;

    const ejercicios = RepositorioEjerciciosLocal.obtenerTodos();

    if (ejercicios.length === 0) {
      contenedorLista.innerHTML = `
        <div class="almacen-vacio">
          <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
          </svg>
          <h4>No hay ejercicios guardados</h4>
          <p>Puedes guardar cualquier ejercicio o configuración pulsando "Guardar Ejercicio" en la cabecera.</p>
        </div>
      `;
      return;
    }

    contenedorLista.innerHTML = ejercicios.map(ej => {
      let badgeModo = '';
      if (ej.modo === Configuracion.MODOS_APP.CADENA_PUNTOS) {
        badgeModo = '<span class="badge-modo badge-cadena">Puntos de Unión</span>';
      } else if (ej.modo === Configuracion.MODOS_APP.OPERACIONES) {
        badgeModo = '<span class="badge-modo badge-operaciones">Operaciones u y v</span>';
      } else if (ej.modo === Configuracion.MODOS_APP.EQUIPOLENCIA) {
        badgeModo = '<span class="badge-modo badge-equipolencia">Equipolencia</span>';
      } else if (ej.modo === Configuracion.MODOS_APP.OPERACIONES_3D) {
        badgeModo = '<span class="badge-modo" style="background:rgba(192,132,252,0.15); color:#c084fc; border:1px solid rgba(192,132,252,0.3);">Vectores 3D u × v</span>';
      } else if (ej.modo === Configuracion.MODOS_APP.PUNTOS_3D) {
        badgeModo = '<span class="badge-modo" style="background:rgba(56,189,248,0.15); color:#38bdf8; border:1px solid rgba(56,189,248,0.3);">Puntos 3D & Cosenos</span>';
      }

      return `
        <div class="tarjeta-ejercicio-guardado" data-id="${ej.id}">
          <div class="info-ejercicio">
            <div class="cabecera-item-ejercicio">
              ${badgeModo}
              <span class="fecha-ejercicio">${ej.fechaLegible}</span>
            </div>
            <div class="titulo-item-ejercicio">${ej.titulo}</div>
          </div>
          <div class="acciones-item-ejercicio">
            <button class="btn-item-accion btn-cargar-ej" data-id="${ej.id}" title="Cargar este ejercicio en el simulador">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Cargar
            </button>
            <button class="btn-item-accion btn-eliminar-ej" data-id="${ej.id}" title="Eliminar del almacenamiento local">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Eventos de botones Cargar y Eliminar
    contenedorLista.querySelectorAll('.btn-cargar-ej').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        this.cargarPorId(id);
      });
    });

    contenedorLista.querySelectorAll('.btn-eliminar-ej').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        RepositorioEjerciciosLocal.eliminarPorId(id);
        this.renderizarLista();
      });
    });
  }

  cargarPorId(id) {
    const ejercicios = RepositorioEjerciciosLocal.obtenerTodos();
    const item = ejercicios.find(e => e.id === id);
    if (!item) return;

    const es3D = item.modo === Configuracion.MODOS_APP.OPERACIONES_3D || item.modo === Configuracion.MODOS_APP.PUNTOS_3D;

    this._estadoApp.actualizar({
      modoActivo: item.modo,
      entornoActivo: es3D ? Configuracion.ENTORNOS_APP.ESPACIO_3D : Configuracion.ENTORNOS_APP.EJERCICIO,
      dimensionActiva: es3D ? '3d' : '2d',
      respuestasVisibles: false
    });

    if (item.modo === Configuracion.MODOS_APP.CADENA_PUNTOS) {
      this._ctrls.ctrlCadena.cargarEjercicio(item.datos);
    } else if (item.modo === Configuracion.MODOS_APP.OPERACIONES) {
      this._ctrls.ctrlOperaciones.cargarEjercicio(item.datos);
    } else if (item.modo === Configuracion.MODOS_APP.EQUIPOLENCIA) {
      this._ctrls.ctrlEquipolencia.cargarEjercicio(item.datos);
    } else if (item.modo === Configuracion.MODOS_APP.OPERACIONES_3D) {
      this._ctrls.ctrlOperaciones3D?.cargarEjercicio(item.datos);
    } else if (item.modo === Configuracion.MODOS_APP.PUNTOS_3D) {
      this._ctrls.ctrlPuntos3D?.cargarEjercicio(item.datos);
    }

    if (this._alCargarEjercicio) {
      this._alCargarEjercicio(item.modo);
    }

    this.cerrar();
    this._mostrarNotificacion(`Ejercicio "${item.titulo}" cargado correctamente.`);
  }

  guardarEjercicioActual() {
    const estado = this._estadoApp.obtener();
    const modo = estado.modoActivo;
    let datos = null;
    let titulo = '';

    if (modo === Configuracion.MODOS_APP.CADENA_PUNTOS) {
      datos = this._ctrls.ctrlCadena.puntos;
      const puntosStr = datos.map(p => `${p.id}(${p.x},${p.y})`).join(' -> ');
      titulo = `Cadena de Vectores: ${puntosStr}`;
    } else if (modo === Configuracion.MODOS_APP.OPERACIONES) {
      datos = { ...this._ctrls.ctrlOperaciones._valores };
      titulo = `Operaciones con u(${datos.ux}, ${datos.uy}) y v(${datos.vx}, ${datos.vy}), k=${datos.k}`;
    } else if (modo === Configuracion.MODOS_APP.EQUIPOLENCIA) {
      datos = { ...this._ctrls.ctrlEquipolencia._puntos };
      titulo = `Test Equipolencia: A(${datos.ax},${datos.ay}) B(${datos.bx},${datos.by}) vs C(${datos.cx},${datos.cy}) D(${datos.dx},${datos.dy})`;
    } else if (modo === Configuracion.MODOS_APP.OPERACIONES_3D) {
      datos = { ...this._ctrls.ctrlOperaciones3D._valores };
      titulo = `Vectores 3D: u(${datos.ux},${datos.uy},${datos.uz}) v(${datos.vx},${datos.vy},${datos.vz}), k=${datos.k}`;
    } else if (modo === Configuracion.MODOS_APP.PUNTOS_3D) {
      datos = { ...this._ctrls.ctrlPuntos3D._puntos };
      titulo = `Puntos 3D: A(${datos.ax},${datos.ay},${datos.az}) -> B(${datos.bx},${datos.by},${datos.bz})`;
    }

    if (!datos) return;

    const guardado = RepositorioEjerciciosLocal.guardar({
      modo,
      titulo,
      datos
    });

    this._mostrarNotificacion(`Ejercicio guardado en el almacenamiento local.`);
    return guardado;
  }

  _mostrarNotificacion(mensaje) {
    let toast = document.getElementById('toast-notificacion');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notificacion';
      toast.className = 'toast-notificacion';
      document.body.appendChild(toast);
    }

    toast.textContent = mensaje;
    toast.classList.add('visible');

    setTimeout(() => {
      toast.classList.remove('visible');
    }, 3200);
  }
}
