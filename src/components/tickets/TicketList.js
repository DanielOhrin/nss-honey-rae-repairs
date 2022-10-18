import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTickets, getEmployeesAndUsers } from "../ApiManager";
import { Ticket } from "./Ticket"
import "./tickets.css";

export const TicketList = ({ getterFunction }) => {
    const [tickets, setTickets] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [emergency, setEmergency] = useState(false);
    const [openOnly, setOpen] = useState(false)
    const [userObj, setUserObj] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getAllTickets()
            .then((serviceTicketArr) => {
                setTickets(serviceTicketArr)
            })

        getEmployeesAndUsers()
            .then(data => setEmployees(data))

        setUserObj(JSON.parse(localStorage.getItem("honey_user")))
    }, []);

    useEffect(() => {

        if (userObj.staff === true) {
            setFilteredTickets(tickets);
        } else {
            const ticketArr = tickets.filter(
                (ticket) => ticket.userId === userObj.id
            );
            setFilteredTickets(ticketArr);
        }
    }, [tickets, userObj]);

    useEffect(() => {
        if (emergency) {
            setFilteredTickets(tickets.filter(ticket => ticket.emergency === true))
        } else {
            setFilteredTickets(tickets)
        }
    }, [emergency, tickets])

    useEffect(() => {
        openOnly ? setFilteredTickets(tickets.filter(ticket => {
            return ticket.dateCompleted === "" && ticket.userId === userObj.id ? true : false
        })) : setFilteredTickets(tickets.filter(ticket => {
            return ticket.userId === userObj.id ? true : false
        }))
    }, [openOnly, tickets, userObj])

    useEffect(() => {
        if (userObj.staff) {
            setFilteredTickets(tickets.filter(ticket => ticket.description.toLowerCase().startsWith(getterFunction.trim().toLowerCase())))
        }
    }, [getterFunction, tickets, userObj])

    return (
        <>
            {
                userObj.staff ?
                    <>
                        <button
                            id="emergency-btn"
                            onClick={() => {
                                setEmergency(true)
                            }}
                        >
                            Emergency Only
                        </button>
                        <button onClick={() => { setEmergency(false) }}>Show All</button>
                    </>
                    : <>
                        <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                        <button onClick={() => setOpen(true)}>Open Tickets</button>
                        <button onClick={() => setOpen(false)}>All Tickets</button>
                    </>
            }
            <h2>List of Tickets</h2>

            <section id="tickets">
                {filteredTickets.map(ticket => <Ticket key={ticket.id} setTickets={setTickets} userObj={userObj} employees={employees} ticketObj={ticket} />)}
            </section>
        </>
    );
};
