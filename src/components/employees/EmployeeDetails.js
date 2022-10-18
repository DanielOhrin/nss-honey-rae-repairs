import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getEmployee } from "../ApiManager"
import "./Employees.css"

export const EmployeeDetails = () => {
    const {employeeId} = useParams()
    const [employee, setEmployee] = useState({})

    useEffect(() => {
        getEmployee(employeeId)
            .then(
                (employeeArr) => {
                    const singleEmployee = employeeArr[0]
                    setEmployee(singleEmployee)
                }
            )
    }, [employeeId])

        return <section className="employee" id="employeeDetails" key={`employee--${employeeId}`}>
            <header>Name: {employee?.user?.fullName}</header>
            <div>Email: {employee?.user?.email}</div>
            <div>Specialty: {employee?.specialty}</div>
            <div>Rate: ${employee?.rate}</div>
            <footer>{employee?.user?.fullName.split(" ")[0]} is working on {employee?.employeeTickets?.length} tickets</footer>
        </section>
}