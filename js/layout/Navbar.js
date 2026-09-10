/**
 * Componente estructural de la barra superior (Navbar)
 */
export class Navbar {
  /**
   * @param {Object} elementos
   * @param {NodeListOf<HTMLButtonElement>} elementos.botonesModo
   * @param {NodeListOf<HTMLButtonElement>} elementos.botonesEntorno
   * @param {HTMLButtonElement} elementos.btnPonerACero
   * @param {HTMLButtonElement} elementos.btnNuevoReto
   * @param {HTMLButtonElement} elementos.btnFormulas
   * @param {HTMLButtonElement} elementos.btnSolucion
   * @param {HTMLButtonElement} [elementos.btnTeoria]
   * @param {EstadoApp} estadoApp
   * @param {Object} callbacks
   * @param {Function} callbacks.alAbrirFormulas
   * @param {Function} callbacks.alAbrirSolucion
   * @param {Function} [callbacks.alAbrirTeoria]
   * @param {Function} callbacks.alPonerACero
   * @param {Function} callbacks.alNuevoReto
   * @param {Function} callbacks.alCambiarEntorno
   */
  constructor(elementos, estadoApp, callbacks) {
    this._elementos = elementos;
    this._estadoApp = estadoApp;
    this._callbacks = callbacks;

    this._inicializar();
  }

  _inicializar() {
    this._elementos.botonesModo.forEach(btn => {
      btn.addEventListener('click', () => {
        const modo = btn.dataset.modo;
        this.establecerModoActivo(modo);
        this._estadoApp.actualizar({ modoActivo: modo });
      });
    });

    if (this._elementos.botonesEntorno) {
      this._elementos.botonesEntorno.forEach(btn => {
        btn.addEventListener('click', () => {
          const entorno = btn.dataset.entorno;
          this.establecerEntornoActivo(entorno);
          if (this._callbacks.alCambiarEntorno) {
            this._callbacks.alCambiarEntorno(entorno);
          }
        });
      });
    }

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

    this._estadoApp.suscribir('modoActivo', (nuevoEstado) => {
      this.establecerModoActivo(nuevoEstado.modoActivo);
    });

    this._estadoApp.suscribir('entornoActivo', (nuevoEstado) => {
      this.establecerEntornoActivo(nuevoEstado.entornoActivo);
    });
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
    if (!this._elementos.botonesEntorno) return;
    this._elementos.botonesEntorno.forEach(b => {
      if (b.dataset.entorno === entorno) {
        b.classList.add('activo');
      } else {
        b.classList.remove('activo');
      }
    });

    const grupo2D = document.getElementById('grupo-modos-2d');
    const grupo3D = document.getElementById('grupo-modos-3d');
    if (grupo2D && grupo3D) {
      if (entorno === 'espacio-3d') {
        grupo2D.style.display = 'none';
        grupo3D.style.display = 'contents';
      } else {
        grupo2D.style.display = 'contents';
        grupo3D.style.display = 'none';
      }
    }
  }
}
