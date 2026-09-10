/**
 * Repositorio de infraestructura para persistencia de ejercicios en LocalStorage.
 * Maneja serialización, validación y gestión de excepciones de cuota o parseo.
 */
export class RepositorioEjerciciosLocal {
  static CLAVE_STORAGE = 'vectorlab_ejercicios_guardados_v1';

  /**
   * Obtiene todos los ejercicios guardados.
   * @returns {Array<Object>}
   */
  static obtenerTodos() {
    try {
      const serializado = localStorage.getItem(this.CLAVE_STORAGE);
      if (!serializado) return [];
      const datos = JSON.parse(serializado);
      return Array.isArray(datos) ? datos : [];
    } catch (err) {
      console.error('Error al recuperar ejercicios de LocalStorage:', err);
      return [];
    }
  }

  /**
   * Guarda un nuevo ejercicio en LocalStorage.
   * @param {Object} ejercicio
   * @param {string} ejercicio.modo - 'dos-puntos' | 'operaciones' | 'equipolencia'
   * @param {string} ejercicio.titulo - Descripción legible
   * @param {Object|Array} ejercicio.datos - Coordenadas y parámetros del ejercicio
   * @returns {Object} El ejercicio guardado con su id y timestamp
   */
  static guardar(ejercicio) {
    try {
      const lista = this.obtenerTodos();
      const nuevoItem = {
        id: 'ej_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        fechaISO: new Date().toISOString(),
        fechaLegible: new Date().toLocaleString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        modo: ejercicio.modo,
        titulo: ejercicio.titulo || 'Ejercicio de Vectores',
        datos: ejercicio.datos
      };

      lista.unshift(nuevoItem); // El más reciente primero
      localStorage.setItem(this.CLAVE_STORAGE, JSON.stringify(lista));
      return nuevoItem;
    } catch (err) {
      console.error('Error al persistir ejercicio en LocalStorage:', err);
      throw new Error('No se pudo guardar el ejercicio en el almacenamiento local.');
    }
  }

  /**
   * Elimina un ejercicio por su identificador único.
   * @param {string} id
   * @returns {boolean}
   */
  static eliminarPorId(id) {
    try {
      const lista = this.obtenerTodos();
      const filtrada = lista.filter(item => item.id !== id);
      localStorage.setItem(this.CLAVE_STORAGE, JSON.stringify(filtrada));
      return true;
    } catch (err) {
      console.error('Error al eliminar ejercicio de LocalStorage:', err);
      return false;
    }
  }

  /**
   * Elimina todos los ejercicios almacenados.
   */
  static limpiarTodos() {
    try {
      localStorage.removeItem(this.CLAVE_STORAGE);
    } catch (err) {
      console.error('Error al limpiar LocalStorage:', err);
    }
  }
}
