/**
 * Componente estructural de la barra superior (Navbar)
 * Gestiona la navegación jerárquica:
 * 1. Flujo de Trabajo (Calculadora interactiva vs Modo Ejercicios)
 * 2. Espacio Dimensional (Plano ℝ² vs Espacio ℝ³)
 * 3. Modos Matemáticos de Cálculo según el espacio activo
 * 4. Acciones globales (Poner a 0, Nuevo Reto, Guardar, Almacén, Fórmulas, Solución, Teoría)
 */
export class Navbar {
  /**
   * @param {Object} elementos
   * @param {NodeListOf<HTMLButtonElement>} [elementos.botonesFlujo]
   * @param {NodeListOf<HTMLButtonElement>} [elementos.botonesEspacio]
   * @param {NodeListOf<HTMLButtonElement>} elementos.botonesModo
   * @param {NodeListOf<HTMLButtonElement>} [elementos.botonesEntorno] - Compatibilidad previa
   * @param {HTMLButtonElement} elementos.btnPonerACero
   * @param {HTMLButtonElement} elementos.btnNuevoReto
   * @param {HTMLButtonElement} elementos.btnGuardar
   * @param {HTMLButtonElement} elementos.btnAlmacen
   * @param {HTMLButtonElement} elementos.btnFormulas
   * @param {HTMLButtonElement} elementos.btnSolucion
   * @param {HTMLButtonElement} [elementos.btnTeoria]
   * @param {EstadoApp} estadoApp
   * @param {Object} callbacks
   * @param {Function} [callbacks.alCambiarFlujo]
   * @param {Function} [callbacks.alCambiarEspacio]
   * @param {Function} [callbacks.alCambiarEntorno]
   * @param {Function} [callbacks.alCambiarModo]
   * @param {Function} callbacks.alPonerACero
   * @param {Function} callbacks.alNuevoReto
   * @param {Function} callbacks.alGuardarEjercicio
   * @param {Function} callbacks.alAbrirAlmacen
   * @param {Function} callbacks.alAbrirFormulas
   * @param {Function} callbacks.alAbrirSolucion
   * @param {Function} [callbacks.alAbrirTeoria]
   */
  constructor(elementos, estadoApp, callbacks) {
    this._elementos = elementos;
    this._estadoApp = estadoApp;
    this._callbacks = callbacks;

    this._inicializar();
  }

  _inicializar() {
    // 1. Selector de Flujo Principal (Calculadora vs Ejercicios)
    if (this._elementos.botonesFlujo) {
      this._elementos.botonesFlujo.forEach(btn => {
        btn.addEventListener('click', () => {
          const flujo = btn.dataset.flujo;
          this.establecerFlujoActivo(flujo);
          if (this._callbacks.alCambiarFlujo) {
            this._callbacks.alCambiarFlujo(flujo);
          }
        });
      });
    }

    // 2. Selector de Espacio Dimensional (Plano 2D vs Espacio 3D)
    if (this._elementos.botonesEspacio) {
      this._elementos.botonesEspacio.forEach(btn => {
        btn.addEventListener('click', () => {
          const espacio = btn.dataset.espacio;
          this.establecerEspacioActivo(espacio);
          if (this._callbacks.alCambiarEspacio) {
            this._callbacks.alCambiarEspacio(espacio);
          }
        });
      });
    }

    // Compatibilidad previa con botonesEntorno
    if (this._elementos.botonesEntorno) {
      this._elementos.botonesEntorno.forEach(btn => {
        btn.addEventListener('click', () => {
          const entorno = btn.dataset.entorno;
          if (this._callbacks.alCambiarEntorno) {
            this._callbacks.alCambiarEntorno(entorno);
          }
        });
      });
    }

    // 3. Botones de Modos de Operación
    this._elementos.botonesModo.forEach(btn => {
      btn.addEventListener('click', () => {
        const modo = btn.dataset.modo;
        this.establecerModoActivo(modo);
        if (this._callbacks.alCambiarModo) {
          this._callbacks.alCambiarModo(modo);
        } else {
          this._estadoApp.actualizar({ modoActivo: modo });
        }
      });
    });

    // 4. Botones de Acción Global
    if (this._elementos.btnPonerACero) {
      this._elementos.btnPonerACero.addEventListener('click', () => {
        if (this._callbacks.alPonerACero) this._callbacks.alPonerACero();
      });
    }

    if (this._elementos.btnNuevoReto) {
      this._elementos.btnNuevoReto.addEventListener('click', () => {
        if (this._callbacks.alNuevoReto) this._callbacks.alNuevoReto();
      });
    }

    if (this._elementos.btnGuardar) {
      this._elementos.btnGuardar.addEventListener('click', () => {
        if (this._callbacks.alGuardarEjercicio) this._callbacks.alGuardarEjercicio();
      });
    }

    if (this._elementos.btnAlmacen) {
      this._elementos.btnAlmacen.addEventListener('click', () => {
        if (this._callbacks.alAbrirAlmacen) this._callbacks.alAbrirAlmacen();
      });
    }

    if (this._elementos.btnFormulas) {
      this._elementos.btnFormulas.addEventListener('click', () => {
        if (this._callbacks.alAbrirFormulas) this._callbacks.alAbrirFormulas();
      });
    }

    if (this._elementos.btnSolucion) {
      this._elementos.btnSolucion.addEventListener('click', () => {
        if (this._callbacks.alAbrirSolucion) this._callbacks.alAbrirSolucion();
      });
    }

    if (this._elementos.btnTeoria) {
      this._elementos.btnTeoria.addEventListener('click', () => {
        if (this._callbacks.alAbrirTeoria) this._callbacks.alAbrirTeoria();
      });
    }

    // 5. Suscripciones reactivas al estado
    this._estadoApp.suscribir('flujoActivo', (nuevoEstado) => {
      this.establecerFlujoActivo(nuevoEstado.flujoActivo);
    });

    this._estadoApp.suscribir('espacioActivo', (nuevoEstado) => {
      this.establecerEspacioActivo(nuevoEstado.espacioActivo);
    });

    this._estadoApp.suscribir('modoActivo', (nuevoEstado) => {
      this.establecerModoActivo(nuevoEstado.modoActivo);
    });

    // Compatibilidad previa
    this._estadoApp.suscribir('entornoActivo', (nuevoEstado) => {
      this.establecerEntornoActivo(nuevoEstado.entornoActivo);
    });
  }

  establecerFlujoActivo(flujo) {
    if (!this._elementos.botonesFlujo) return;
    this._elementos.botonesFlujo.forEach(b => {
      if (b.dataset.flujo === flujo) {
        b.classList.add('activo');
      } else {
        b.classList.remove('activo');
      }
    });

    // Actualizar visualización del botón 'Nuevo Reto'
    if (this._elementos.btnNuevoReto) {
      this._elementos.btnNuevoReto.style.display = flujo === 'ejercicios' ? 'inline-flex' : 'none';
    }
  }

  establecerEspacioActivo(espacio) {
    if (this._elementos.botonesEspacio) {
      this._elementos.botonesEspacio.forEach(b => {
        if (b.dataset.espacio === espacio) {
          b.classList.add('activo');
        } else {
          b.classList.remove('activo');
        }
      });
    }

    const grupo2D = document.getElementById('grupo-modos-2d');
    const grupo3D = document.getElementById('grupo-modos-3d');
    if (grupo2D && grupo3D) {
      if (espacio === '3d') {
        grupo2D.style.display = 'none';
        grupo3D.style.display = 'contents';
      } else {
        grupo2D.style.display = 'contents';
        grupo3D.style.display = 'none';
      }
    }
  }

  establecerModoActivo(modo) {
    this._elementos.botonesModo.forEach(b => {
      if (b.dataset.modo === modo) {
        b.classList.add('activo');
      } else {
        b.classList.remove('activo');
      }
    });
  }

  establecerEntornoActivo(entorno) {
    if (this._elementos.botonesEntorno) {
      this._elementos.botonesEntorno.forEach(b => {
        if (b.dataset.entorno === entorno) {
          b.classList.add('activo');
        } else {
          b.classList.remove('activo');
        }
      });
    }
  }
}
