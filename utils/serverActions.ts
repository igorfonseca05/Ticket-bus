"use server"

import { ObjectId } from "mongodb"
import ClientPromise from "../database/db"
import { Ticket, User } from "./types"
import { updateTag } from "next/cache"

interface RemoveTicketsProps {
    id: string, 
    ticket: Ticket
}

export async function removeTickets({id, ticket}: RemoveTicketsProps) {
    if(!id || !ticket) return
    const db = (await ClientPromise).db('nextAuth')
    const user = db.collection<User>('users')

    await user.findOneAndUpdate(
        {_id: new ObjectId(id) as unknown as string}, 
        {
            $pull: {tickets: {_id: id }},
            $addToSet: {history: ticket }
        }
    )
}
export async function removeTicket(idUser:string, idDoc:string, field: string) {
    if(!idUser) return
    const db = (await ClientPromise).db('nextAuth')
    const user = db.collection<User>('users')

    await user.updateOne({_id: new ObjectId(idUser) as unknown as string}, {
        $pull: {
            [field]: {_id: idDoc}    
        }
    })

    updateTag('user')
}