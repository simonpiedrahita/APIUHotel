import { ServicioHabitaciones } from "../services/ServicioHabitaciones.js"

export class ControladorHabitaciones{

    constructor(){}

    async registrandoHabitacion(peticion,respuesta){
        let datosHabitacion=peticion.body
        let servicioHabitacion = new ServicioHabitaciones()
        try{

            if(datosHabitacion.precioNoche < 100 && datosHabitacion.cantidadMaxima < 2) {
                respuesta.status(400).json({
                    'mensaje': 'Revisa la cantidad de personas ingresadas'
                })
            }else if( datosHabitacion.precioNoche < 100.){
                respuesta.status(400).json({
                    'mensaje': 'Revisa el precio por noche'
                })

            }else if(datosHabitacion.cantidadMaxima < 2){
                respuesta.status(400).json({
                    'mensaje': 'Muy poca gente'
                })
            } else {
                await servicioHabitacion.registrarHabitacion(datosHabitacion)
                respuesta.status(200).json({
                    "mensaje":"Exito agregando los datos"
                })
            }
        }catch(errorPeticion){
            respuesta.status(400).json({
                "mensaje":"No se ha podido registrar la habitación, error:  "+ errorPeticion
            })
        }
    }


    async buscandoUnaHabitacion(peticion,respuesta){
        let idHabitacion=peticion.params.idhabitacion
        let servicioHabitacion= new ServicioHabitaciones()
        try{
            if(idHabitacion){

            }
            respuesta.status(200).json({
                "mensaje":"Exito buscando la habitacion "+idHabitacion,
                "habitacion":await servicioHabitacion.buscarHabitacion(idHabitacion)

            })
        }catch(errorPeticion){
            respuesta.status(400).json({
                "mensaje":"Fallamos "+errorPeticion
            })
        }
    }

    async buscandoTodasHabitaciones(peticion,respuesta){
        let servicioHabitacion=new ServicioHabitaciones()
        try{
            respuesta.status(200).json({

                "mensaje":"Exito buscando habitaciones",
                "habitaciones":await servicioHabitacion.buscarTodasHabitaciones()
            })
        }catch(errorPeticion){
            respuesta.status(400).json({
                "mensaje":"Fallamos "+errorPeticion
            })
        }
    }

    async editandoHabitacion(peticion,respuesta){
        let idHabitacion=peticion.params.idhabitacion
        let datosHabitacion=peticion.body
        let servicioHabitacion= new ServicioHabitaciones()
        try{
            await servicioHabitacion.editarHabitacion(idHabitacion,datosHabitacion)
            respuesta.status(200).json({
                "mensaje":"Exito editando la habitacion"
            })
        }catch(errorPeticion){
            respuesta.status(400).json({
                "mensaje":"Fallamos "+errorPeticion
            })
        }
    }

}