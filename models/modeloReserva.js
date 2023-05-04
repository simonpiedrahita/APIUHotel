import mongoose, { mongo } from 'mongoose'

const Schema = mongoose.Schema;

//construimos el esquema persdonalizando la informacion
const Reserva = new Schema({
    nombre: {
        type: String,
        required: true
    },
    fechaInicial: {
        type: Date,
        required: true
    },
    fechaFinal: {
        type: Date,
        required: true
    },
    habitacion: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'habitacion'
    }],
})


export const modeloReserva = mongoose.model('reserva', Reserva)