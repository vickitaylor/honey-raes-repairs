import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Tickets.css"



export const TicketList = () => {
    // declared new variable and function using the useState function.   it created an empty array called tickets and a function called setTickets
    const [tickets, setTickets] = useState([])

    // we do not want to modify the array of tickets from the api, but still want to display a list of tickets. creating another state variable of filteredTickets
    const [filteredTickets, setFiltered] = useState([])

    // Created another state variable to display only the emergencies.  by default we do not want to see emergency tickets, so it is set to false. 
    const [emergency, setEmergency] = useState(false)
    // created new state variable for cutomer open tickets 
    const [openOnly, updateOpenOnly] = useState(false)

    // added the useNavigate hook for the user create ticket button
    const navigate = useNavigate()

    // getting the honeyUserObject from local storage (the honey user object is from the login page of who logged in and is the key shown on the local storage in application under devtools) localHoneyUser returns as a string because on the login page it is converted to a string when JSON.stringify is used.
    const localHoneyUser = localStorage.getItem("honey_user")

    // converting it from a string to an object
    const honeyUserObject = JSON.parse(localHoneyUser)

    // this useEffect is fetching the tickets from the api
    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets`)
                .then(response => response.json())
                // placing a parameter to capture the array after json processing
                .then((ticketArray) => {
                    // then calling the setter function of setTickets and passing the value of ticketArray
                    setTickets(ticketArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    // determines if all tickets should be shown or some tickets based on the staff property of the local user object (which shorted isStaff to staff).  if a customer it will show only the customer tickets.  done so by observing tickets state
    useEffect(
        () => {
            // determining if the current user an employee or customer
            if (honeyUserObject.staff) {
                // for employees, calling on the copied state variable to display all tickets
                setFiltered(tickets)
            } else {
                // for customers, declared a new variable to filter the tickets by the signed in customer. It is filtering the complete ticket list and then comparing the ticket userId from the serviceTickets to the honeyUserObject id from the logged in customer.
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)

                // setting the state variable filteredTickets the new array just created, by using setFiltered function
                setFiltered(myTickets)
            }
        },
        // observing array being watched for changes
        [tickets]
    )

    // defined useEffect for when the emergency button is clicked, the onclick sets the emergency value to true and we want the emergency filtered tickets.  
    useEffect(
        () => {
            if (emergency) {
                // defined a new variable to store the filtered emergency tickets, taking the original ticket array and filtering for emergencies.
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)

                // since displaying filteredTickets on the jsx, updating the filteredTickets variable to show only the emergency tickets.
                setFiltered(emergencyTickets)
            } else {
                // with the addition of the show all button, added else statement to display all tickets when that button is clicked.
                setFiltered(tickets)
            }
        },
        // observing emergency tickets.  
        [emergency]
    )

    // for the openOnly state variable customer side only button.
    useEffect(
        () => {
            if (openOnly) {
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
                })
                setFiltered(openTicketArray)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [openOnly]
    )




    // JSX to display the state
    // creating button to display emergencies only.  It is a user interaction and they want to change the state of the component, tracking wether of not emergencies only should be listed.  
    // added onClick to button, so the function will run when clicked.  Setting the state to true. 
    // using ternary statement prior to the button to determine if this is a staff or customer account. only if this is an employee will the emergency button will show.
    // with the ternary statements, dont need if, and it evaluates to true or false, ? is for if true display button, 
    // : for if false and displays a button for the user to click on to create a new form, and that button will navigate them to another page in the browser in this case it is http://localhost:3000/ticket/create
    // creating a second button for employees to show all service requests.  due to react syntax it does not like 2 siblings next to each other, need to make a new fragment for both buttons to be returned if true.
    // added 2 new buttons to the customer side
    return <>
        {
            honeyUserObject.staff
                ? <>
                    <button onClick={() => setEmergency(true)}>Emergency Only</button>
                    <button onClick={() => setEmergency(false)}>Show All</button>
                </>
                : <>
                    <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                    <button onClick={() => updateOpenOnly(true)}>Open Tickets</button>
                    <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
                </>
        }

        <h2>List of Tickets</h2>

        <article className="tickets">
            {
                // Converting objects to html representation.  And changed the variable being mapped from tickets to filteredTickets to show the customized view.
                filteredTickets.map(
                    (ticket) => {
                        return <section className="ticket">
                            <header>{ticket.description}</header>
                            <footer>Emergency: {ticket.emergency ? "🧨" : "No"}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}

