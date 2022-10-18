import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import "./Customers.css"
import { getCustomer } from "../ApiManager";

export const CustomerDetails = () => {
    const {customerId} = useParams()
    const [customer, setCustomer] = useState({})

    useEffect(() => {
        getCustomer(customerId)
            .then(
                (data) => {
                    setCustomer(data[0])
                }
            )
    }, [customerId])

    return <section className="customer" id="customerDetails">
        <header>Name: {customer?.user?.fullName}</header>
        <div>Email: {customer?.user?.email}</div>
        <div>Phone: {customer?.phoneNumber}</div>
        <div>Address: {customer?.address}</div>
    </section>
}