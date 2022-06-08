import { Link } from "react-router-dom"

export const Ticket = ({ ticketObject, currentUser, employees, getAllTickets }) => {

    // getting the currently assigned employee to a ticket. if the ticketObject.employeeTickets.length is more than 0.  using the foreign key on the employee ticket to go find the full employee object. does the employee.id match the tER employeeId (find the assigned employee for the current ticket)
    let assignedEmployee = null

    if (ticketObject.employeeTickets.length > 0) {
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }

    //find the employee profile object for the current user 
    const userEmployee = employees.find(employee => employee.userId === currentUser.id)

    // defining function to have only employees see the claim button.  Nested ternary statements are bad.  A way to avoid using nested ternary conditions, as it makes code less readable.  When have a condition within a condition or multiple conditions avoid that and  make a function to do conditional logic.
    const buttonOrNoButton = () => {
        if (currentUser.staff) {
            return <button
                onClick={() => {
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
                        .then(() => {
                            // need to get the state from the API again, since the state has changed, without this the ticket still has a claim button.  
                            getAllTickets()
                        })

                }}>
                Claim</button>
        } else {
            return ""
        }
    }

    // functions to determine is a ticket closed, and if it is open, am I the one currently assigned to it?  it will display a closed button when the ticket is open only for the employee the ticket is assigned to
    // canClose- function that will determine if the current user can close the ticket. if statement to determine if the current user is the same as the user on the assigned ticket, and the ticket is an open ticket (not yet completed, no value in the property).  Button was also appearing on the customers tickets, so added additional staff property
    const canClose = () => {
        if (userEmployee?.id === assignedEmployee?.id && ticketObject.dateCompleted === "" && currentUser.staff) {
            return <button onClick={closeTicket} className="ticket__finish">Finish</button>
        } else {
            return ""
        }
    }

    // due to logic they are already only seeing their tickets, need to have not staff to return the button
    const deleteButton = () => {
        if (!currentUser.staff) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
                    method: "DELETE",
                })
                    .then(() => {
                        getAllTickets()
                    })
            }} className="ticket__delete">Delete</button>
        } else {
            return ""
        }

    }

    // function that updates the ticket with a new date completed, first have to create a copy of the state prior to sending to the API. then fetching the API, then calling the getAllTicket function to rerender the tickets.
    const closeTicket = () => {
        const copy = {
            userId: ticketObject.userId,
            description: ticketObject.description,
            emergency: ticketObject.emergency,
            dateCompleted: new Date()
        }

        return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
            .then(response => response.json())
            .then(getAllTickets)
    }



    return <section className="ticket">
        <header className="ticket__header">
            {
                currentUser.staff
                    ? `Ticket Number: ${ticketObject.id}`
                    : <Link to={`/tickets/${ticketObject.id}/edit`}>
                        Ticket Number: {ticketObject.id}</Link>
            }
        </header>

        <section>{ticketObject.description}</section>
        <section>Emergency: {ticketObject.emergency ? "🧨" : "No"}</section>
        {/* if the below if .length 0 javascript considers it to be a falsy value is not then it is true */}
        <footer className="ticket__footer">
            {
                ticketObject.employeeTickets.length
                    // using ternary statement so it will not show null. 
                    ? `Assigned to ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                    : buttonOrNoButton()
            }
            {
                canClose()
            }
            {
                deleteButton()
            }
        </footer>
    </section>
}