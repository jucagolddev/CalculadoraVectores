/**
 * Funciones puras de utilidad para formateo matemático y numérico
 */
export class FormateadorMatematico {
  /**
   * Redondea un número para visualización limpia (evita 2.0000000000001).
   * @param {number} valor
   * @param {number} [decimales=2]
   * @returns {string}
   */
  static formatearNumero(valor, decimales = 2) {
    if (typeof valor !== 'number' || Number.isNaN(valor)) {
      return '0';
    }
    return Number.isInteger(valor) ? valor.toString() : valor.toFixed(decimales);
  }

  /**
   * Formatea un ángulo en grados con su símbolo sexagesimal.
   * @param {number} grados
   * @returns {string}
   */
  static formatearGrados(grados) {
    return `${this.formatearNumero(grados, 1)}°`;
  }

  /**
   * Genera el HTML semántico con la flecha matemática superior (→ o ←).
   * @param {string} nombre - Nombre del vector (ej. 'AB', 'BA', 'u', 'v', 'R')
   * @param {'derecha'|'izquierda'} [sentido='derecha'] - Dirección de la flecha superior
   * @returns {string} Fragmento HTML con clase .vector-flecha
   */
  static htmlVector(nombre, sentido = 'derecha') {
    const claseSentido = (sentido === 'izquierda' || nombre === 'BA') ? ' vector-flecha-izq' : '';
    return `<span class="vector-flecha${claseSentido}">${nombre}</span>`;
  }
}
