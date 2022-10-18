import { Link } from "react-router-dom";
import { closeOpenTicket, DeleteTicket, getAllTickets, PostEmployeeTicket } from "../ApiManager";

export const Ticket = ({ setTickets, ticketObj, employees, userObj }) => {

    const claimTicket = (employeeTicketObj) => {
        const body = {
            ...employeeTicketObj,
            dateCompleted: ""
        }

        PostEmployeeTicket(body)
            .then(() => getAllTickets()
                .then(data => setTickets(data))
            )
    }

    const canClose = () => {
        if (ticketObj.employeeTickets[0].dateCompleted === "" && employees.find(emp => emp.user.id === userObj.id)?.id === ticketObj.employeeTickets[0].employeeId) {
            return (
                <button onClick={closeTicket}>Close</button>
            )
        } else {
            return ""
        }
    }

    const deleteButton = () => {
        return (
            <button onClick={() => {
                DeleteTicket(ticketObj.id)
                    .then(() => getAllTickets())
            }}>Delete</button>
        )
    }

    const closeTicket = () => {
        const body = {
            ...ticketObj.employeeTickets[0],
            dateCompleted: new Date()
        }

        closeOpenTicket(ticketObj.employeeTickets[0].id, body)
            .then(() => getAllTickets())
    }

    let assignedEmployee = null

    if (ticketObj.employeeTickets?.length) {
        let employeeTicketObj = ticketObj.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === employeeTicketObj.employeeId)?.user?.fullName
    }

    return (
        <section className="ticket">
            <header>
                {
                    !userObj.staff
                        ? <Link to={`/tickets/${ticketObj.id}/edit`}>Ticket {ticketObj.id}</Link>
                        : <>Ticket {ticketObj.id}</>
                }
            </header>
            <div>{ticketObj.description}</div>
            <div><strong>Emergency:</strong> {ticketObj.emergency ? "Yes" : "No"}</div>
            <footer>
                {
                    userObj.staff
                        ? ticketObj.employeeTickets?.length
                            ? <>{`Assigned to ${typeof assignedEmployee === "string" ? assignedEmployee : ""}`} {canClose()}</>
                            : <button onClick={() => { const claimedTicket = { serviceTicketId: ticketObj.id, employeeId: employees.find(emp => emp.userId === userObj.id).id }; claimTicket(claimedTicket) }}>Claim</button>
                        : <>{`Assigned to ${typeof assignedEmployee === "string" ? assignedEmployee : ""}`} {deleteButton()}</>
                }
            </footer>
        </section>
    );
}