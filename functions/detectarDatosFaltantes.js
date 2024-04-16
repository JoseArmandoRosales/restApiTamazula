export function datosfaltantes(input) {
    const nombre = (typeof input['nombre'] !== 'undefined') ? input['nombre'] : null;
    const apellidopaterno = (typeof input['apellidopaterno'] !== 'undefined') ? input['apellidopaterno'] : null;
    const apellidomaterno = (typeof input['apellidomaterno'] !== 'undefined') ? input['apellidomaterno'] : null;
    const coloniaid = (typeof input['coloniaid'] !== 'undefined') ? input['coloniaid'] : null;
    const calle = (typeof input['calle'] !== 'undefined') ? input['calle'] : null;
    const telefono = (typeof input['telefono'] !== 'undefined') ? input['telefono'] : null;
    const telefonoalt = (typeof input['telefonoalt'] !== 'undefined') ? input['telefonoalt'] : null;

    return {nombre, apellidopaterno, apellidomaterno, coloniaid, calle, telefono, telefonoalt}
}