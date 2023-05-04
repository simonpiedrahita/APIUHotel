import { modeloHabitacion } from "../models/modeloHabitacion.js";
export class ServicioHabitaciones {

    constructor() { }

    async registrarHabitacion(datosHabitacion) {
        let habitacionNueva = new modeloHabitacion(datosHabitacion)
        return await habitacionNueva.save()
    }

    async buscarTodasHabitaciones() {
        let habitacionesConsultadas = await modeloHabitacion.find()
        return habitacionesConsultadas
    }

    async buscarHabitacion(idHabitacion) {
        let habitacionConsultada = await modeloHabitacion.findById(idHabitacion)
        return habitacionConsultada
    }

    async editarHabitacion(idHabitacion, datosHabitacion) {
        return await modeloHabitacion.findByIdAndUpdate(idHabitacion, datosHabitacion)
    }

    async calcularValor(idHabitacion, numeroDias) {
        let habitacionConsultada = await modeloHabitacion.findById(idHabitacion)
        const valor = habitacionConsultada.precioNoche * numeroDias
        return valor
    }

    async existeHabitacion(idHabitacion) {
        let habitacionConsultada = await modeloHabitacion.findById(idHabitacion)
        const valido = (habitacionConsultada != null)
        return valido
    }

}