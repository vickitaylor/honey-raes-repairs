import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

// component to allow the customers to edit their service tickets. 

export const TicketEdit = () => {
    const { ticketId } = useParams()

    // state for individual ticket
    const [ticket, updateTicket] = useState({
        description: "",
        emergency: false,
    })

    const navigate = useNavigate()

    // to get ticket from API and update state, observing ticketId
    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
                .then(response => response.json())
                .then((data) => {
                    updateTicket(data)
                })
        },
        [ticketId]
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // put for the service request edit. 
        return fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/tickets")
            })
    }

    // ticket edit form
    return (
    <form className="ticketForm">
        <h2 className="ticketForm__title">Update Service Request</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    placeholder="Brief description of problem"
                    value={ticket.description}
                    onChange={
                        (event) => {
                            const copy = { ...ticket }
                            copy.description = event.target.value
                            updateTicket(copy)
                        }
                    }> {ticket.description}</textarea>
            </div>
        </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        checked={ticket.emergency}
                        onChange={
                            (event) => {
                                const copy = { ...ticket }
                                copy.emergency = event.target.checked
                                updateTicket(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit
            </button>
        </form >
    )
}



