
// EXIST

// FECHA < FECHA FINAL

// NUM DIAS

// COSTO * DIAS
import { ServicioHabitaciones } from "../services/ServicioHabitaciones.js"
import { ServicioHabitaciones } from "../services/Serv.js"
import { ServicioReserva } from "../services/ServicioReserva.js"

export class ControladorReserva {

    constructor() {

    }

    async registrandoReserva(peticion, respuesta) {
        let habitacion = peticion.params.idhabitacion
        let datosReserva = peticion.body
        let servicioHabitacion = new ServicioHabitaciones()
        let servicioReserva = new ServicioReserva()
        try {
            const existe = await servicioHabitacion.existeHabitacion(habitacion)
            if (!existe) { throw new Error("La habitacion no existe")}
            const disponible = await servicioReserva.validarFechas(habitacion, datosReserva)
            if (!disponible) { throw new Error("La habitacion no esta disponible")}
            const valor = await servicioHabitacion.calcularValor(habitacion, datosReserva.numeroDias)
            const reserva = {
                nombre: "",
                fechaInicial: new Date(datosReserva.fechaInicial),
                fechaFinal: new Date(datosReserva.fechaFinal),
                habitacion: habitacion,
                numeroDias: datosReserva.numeroDias
            }
            const nuevaReserva = await servicioReserva.registrarReserva(reserva)
            respuesta.status(200).json({
                "mensaje": "Exito registrando la reserva", data: {
                    existe,
                    disponible,
                    valor,
                    nuevaReserva
                }

            })
        } catch (errorPeticion) {
            respuesta.status(400).json({
                "mensaje": "Fallamos " + errorPeticion
            })
        }
    }
}