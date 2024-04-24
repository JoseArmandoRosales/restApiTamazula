export function datosFaltantesRenta(input) {
    const clienteid = (typeof input['clienteid'] !== 'undefined') ? input['clienteid'] : null;
    const fechaentrega = (typeof input['fechaentrega'] !== 'undefined') ? input['fechaentrega'] : null;
    const fecharecoger = (typeof input['fecharecoger'] !== 'undefined') ? input['fecharecoger'] : null;
    const estatusid = (typeof input['estatusid'] !== 'undefined') ? input['estatusid'] : null

    return {clienteid, fechaentrega, fecharecoger, estatusid}
}