import { useState, useEffect } from "react"
import { getAllEmployees } from "../ApiManager"
import { Employee } from "./Employee"
import "./Employees.css"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getAllEmployees()
            .then(
                (data) => {
                    setEmployees(data)
                }
            )
    }, [])

    return (
        <article id="employees">
            {
                employees.map(employee => <Employee key={`employee--${employee.id}`}
                id={employee.id}
                fullName={employee.fullName}
                email={employee.email}
                />)
            }
        </article>
    )
}