import { TicketsDao } from "../DAO/ticket.dao.js";

export class TicketSerice {
    static async getAllTicketAsync () {
        return await TicketsDao.getAllTicketAsync()
    }

    static async getTicketByIdAsync(tid) {
        return await TicketsDao.getTicketByIdAsync(tid)
    }

    static async deleteTicketById(tid){
        return await TicketsDao.deleteTicketById(tid)
    }
}