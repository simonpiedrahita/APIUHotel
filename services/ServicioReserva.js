import { modeloHabitacion } from "../models/modeloHabitacion.js";
import { modeloReserva } from "../models/modeloReserva.js";
export class ServicioReserva {

    constructor() { }

    async registrarReserva(datosReserva) {
        let reservaNueva = new modeloReserva(datosReserva)
        return await reservaNueva.save()
    }

    async validarFechas(datosReserva) {
        let fechaInicial = new Date(datosReserva.fechaInicial)
        let fechaFinal = new Date(datosReserva.fechaFinal)
        let valido = (fechaFinal > fechaFinal)
        let habitacion = modeloHabitacion.find({ habitacion: datosReserva.habitacion }, { fechaInicial: { "$gte": fechaInicial, "$lte": fechaFinal } })
        let cantidad = (await habitacion).length
        return (cantidad == 0 && valido)
    }


}