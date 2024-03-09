function fechaEntrega (){
    let fechaAlta = new Date();
    const dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let dia = dias[fechaAlta.getDay()];
    let diaNumero = fechaAlta.getDate();
    let mes = meses[fechaAlta.getMonth()];
    let year = fechaAlta.getFullYear();
    let fechaEntrega = dia + ", " + diaNumero + " de " + mes + " de " + year;

    return fechaEntrega;
}


function fechaRecoger(){
    const dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let fechaAlta = new Date();
    let fechaRecoger = new Date(fechaAlta);
    fechaRecoger.setDate(fechaRecoger.getDate() + 7);
    let diaRecoger = dias[fechaRecoger.getDay()];
    let diaNumeroRecoger = fechaRecoger.getDate();
    let mesRecoger = meses[fechaRecoger.getMonth()];
    let yearRecoger = fechaRecoger.getFullYear();
    let fechaRecogerString = diaRecoger + ", " + diaNumeroRecoger + " de " + mesRecoger + " de " + yearRecoger;
    return fechaRecogerString;
}


module.exports = {fechaEntrega, fechaRecoger}

