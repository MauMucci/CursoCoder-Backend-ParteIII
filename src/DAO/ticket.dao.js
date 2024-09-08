import { ticketModel } from "../Mongo/Models/ticket.model.js";

export class TicketsDao {


    static async createTicketAsync(ticketData) {
        try {
            const newTicket = await ticketModel.create(ticketData)
            console.log("Ticket creado exitosamente",newTicket)

            return newTicket

        } catch (error) {
            console.error("Error al crear el ticket",error)
            throw new Error("No se pudo crear el ticket")
            
        }
    }

    static async getTicketByIdAsync(tid){
        try {
            const ticket = await ticketModel.findById(tid)
            if(!ticket) throw new Error(`No se encontro el ticket con el id ${tid}`)

            return ticket

        } catch (error) {
            console.error("Error al obtener el ticket:", error);
            throw new Error("No se pudo obtener el ticket");
            
        }
    }

    static async deleteTicketById(tid) {
        try {
          const result = await TicketModel.findByIdAndDelete(tid);
          if (!result) {
            throw new Error(`No se encontró el ticket con ID ${tid} para eliminar`);
          }
          console.log("Ticket eliminado exitosamente:", result);
          return result;
        } catch (error) {
          console.error("Error al eliminar el ticket:", error);
          throw new Error("No se pudo eliminar el ticket");
        }
      }


}