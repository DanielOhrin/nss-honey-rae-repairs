import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getTicketByID, updateTicket } from "../ApiManager"

export const TicketEdit = () => {
    const { ticketId } = useParams()
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [ticket, update] = useState({
        description: "",
        emergency: false
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

    const navigate = useNavigate()
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    //Grab the ticket they are currently editing:
    useEffect(() => {
        getTicketByID(ticketId)
            .then(data => update(data))
    }, [ticketId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        const newTicket = { ...ticket }
        newTicket.userId = honeyUserObject.id
        newTicket.dateCompleted = ""


        // TODO: Perform the fetch() to PUT the object to the API
        updateTicket(ticketId, newTicket)
            .then(response => response.json())
            .then(() => {
                navigate("/tickets")
            })
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={(event) => {
                            const copy = { ...ticket }
                            copy.description = event.target.value

                            update(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        checked={ticket.emergency}
                        onChange={(event) => {
                            const copy = { ...ticket }
                            copy.emergency = event.target.checked

                            update(copy)
                        }} />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={(event) => handleSaveButtonClick(event)}>
                Submit Ticket
            </button>
        </form>
    )
}