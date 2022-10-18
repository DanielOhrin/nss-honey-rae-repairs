export const getCustomer = (customerId) => {
    return fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
        .then(response => response.json())
}

export const getAllCustomers = () => {
    return fetch(`http://localhost:8088/users?isStaff=false`)
        .then(response => response.json())
}

export const getEmployee = (employeeId) => {
    return fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
        .then(response => response.json())
}

export const getAllEmployees = () => {
    return fetch(`http://localhost:8088/users?isStaff=true`)
        .then(response => response.json())
}

export const getEmployeeByUserID = (userId) => {
    fetch(`http://localhost:8088/employees?userId=${userId}`)
        .then(res => res.json())
}

export const UpdateEmployee = (employeeId, body) => {
    return fetch(`http://localhost:8088/employees/${employeeId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
}

export const PostEmployeeTicket = (body) => {
    return fetch(`http://localhost:8088/employeeTickets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
}

export const DeleteTicket = (ticketId) => {
    fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
        method: "DELETE"
    })
}

export const closeOpenTicket = (employeeTicketId, body) => {
    return fetch(`http://localhost:8088/employeeTickets/${employeeTicketId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
}

export const getTicketByID = (ticketId) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
        .then(res => res.json())
}

export const updateTicket = (ticketId, body) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
}

export const postTicket = (body) => {
    fetch(`http://localhost:8088/serviceTickets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
}

export const getCustomerByUserID = (userId) => {
    return fetch(`http://localhost:8088/customers?userId=${userId}`)
        .then(res => res.json())
}

export const updateProfile = (profileId, body) => {
    return fetch(`http://localhost:8088/customers/${profileId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
}

export const getAllTickets = () => {
    return fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
        .then(res => res.json())
}

export const getEmployeesAndUsers = () => {
    fetch(`http://localhost:8088/employees?_expand=user`)
            .then(res => res.json())
}

// I much preferred writing the unique fetches inside their components, however, I will continue to try it this way and see how I can better organize it.