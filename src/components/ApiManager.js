// component for fetch calls used in the application. 

// GET requests
export const getAllCustomers = () => {
    return fetch(`http://localhost:8088/customers?_expand=user`)
        .then(res => res.json())
}

export const getAllEmployees = () => {
    return fetch(`http://localhost:8088/users?isStaff=true`)
        .then(res => res.json())
}

export const getTickets = () => {
    return fetch(`http://localhost:8088/serviceTickets?&_embed=employeeTickets`)
        .then(res => res.json())
}

export const getEmployeesWithUsers = () => {
    return fetch(`http://localhost:8088/employees?_expand=user`)
        .then(response => response.json())
}

export const getCustomerDetails = (customerId) => {
    return fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
        .then(response => response.json())
}

export const getEmployeeDetails = (employeeId) => {
    return fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
        .then(response => response.json())
}

export const getIndCustomers = (honeyUserObject) => {
    return fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
        .then(response => response.json())
}

export const getIndEmployees = (honeyUserObject) => {
    return fetch(`http://localhost:8088/employees?userId=${honeyUserObject.id}`)
        .then(response => response.json())
}

export const getTicketEdits = (ticketId) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
        .then(response => response.json())
}

// POST requests
export const saveTicket = (ticketToSendToAPI) => {
    return fetch(`http://localhost:8088/serviceTickets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ticketToSendToAPI)
    })
        .then(response => response.json())
}

export const saveEmployeeToTicket = (userEmployee, ticketObject) => {
    return fetch(`http://localhost:8088/employeeTickets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            employeeId: userEmployee.id,
            serviceTicketId: ticketObject.id
        })
    })
        .then(response => response.json())
}

// PUT requests
export const saveCustomerEdit = (profile) => {
    return fetch(`http://localhost:8088/customers/${profile.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    })
        .then(response => response.json())
}

export const saveEmployeeEdit = (profile) => {
    return fetch(`http://localhost:8088/employees/${profile.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    })
        .then(response => response.json())
}

export const saveTicketEdit = (ticketId, ticket) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ticket)
    })
        .then(response => response.json())
}

export const saveCloseTicket = (copy, ticketObject) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(copy)
    })
    .then(response => response.json())
}

export const saveTicketComplete = (ticketObject, copy) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
            .then(response => response.json())
}

// Delete requests
export const deleteTicket = (ticketObject) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
        method: "DELETE",
    })
}

