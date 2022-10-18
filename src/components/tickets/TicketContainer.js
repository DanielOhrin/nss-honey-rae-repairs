import { TicketList } from "./TicketList"
import { TicketSearch } from "./TicketSearch"
import { useState } from "react"

export const TicketContainer = () => {
    const [searchTerm, setSearchTerm] = useState("")

    return (
    <>
        <TicketSearch setterFunction={setSearchTerm} />
        <TicketList getterFunction={searchTerm} />
    </>
    )
}