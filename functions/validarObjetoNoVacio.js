export function validarObjetoEsVacio(objeto) {
    for (let propiedad in objeto) {
        // Si alguna propiedad NO es nula regresa Falso
        if (objeto[propiedad] !== null) {
          return false;
        }
      }
      // Si TODAS son nulas, regresa Verdadero
    return true;
}