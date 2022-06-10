import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { saveTicket } from "../ApiManager"

export const TicketForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    // for each form field in the initial state below, assigned default values  
    const [ticket, update] = useState({
        description: "",
        emergency: false

    })
    /*
    TODO: Use the useNavigation() hook so you can redirect
    the user to the ticket list
    */
    // assigning useNavigate to a variable, (navigate is a function)
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    // this is the function to run the instructions when the submit button is clicked. function has a parameter. 
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        // creating an object to send to the API when the button is clicked
        const ticketToSendToAPI = {
            userId: honeyUserObject.id, 
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: ""
        }
        // TODO: Perform the fetch() to POST the object to the API
        // copied the url of the serviceTickets from the API, second argument to fetch is options, that is in the {} after the url, added method of POST and header, for body, turned the object ticketToSendToAPI to a string. when json serve response the user will be directed back to the ticket page, via navigate("/tickets")
        saveTicket(ticketToSendToAPI)
            .then(() => {
                navigate("/tickets")
            })
    }

    // onChange event will update the two ticket properties when changed.  updating state each time it is changed and it will update the copy and property listed. in the callback function in the onChange, parameter of event, and set a target.  cannot use value for checkboxes, so checked is used and will return true or false. 
    // Then calling the update function to change the new state
    // added onclick to the submit button, passed clickEvent into the argument for the handleSaveButtonFunction
    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={
                            (event) => {
                                const copy = {...ticket}
                                copy.description = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        onChange={
                            (event) => {
                               const copy = {...ticket}
                               copy.emergency = event.target.checked
                               update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}