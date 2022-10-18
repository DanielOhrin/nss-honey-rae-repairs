import { useState, useEffect } from "react"
import { getAllCustomers } from "../ApiManager"
import { Customer } from "./Customer"
import "./Customers.css"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        getAllCustomers()
            .then(
                (data) => {
                    setCustomers(data)
                }
            )
    }, [])

    return <article id="customers">
        {
            customers.map(customer => <Customer key={`customer--${customer.id}`}
            id={customer.id}            
            name={customer.fullName}
            email={customer.email}
            />)
        }
    </article>
}