import { useEffect, useState } from "react"
import { Customer } from "./Customer"
import { getAllCustomers } from "../ApiManager"
import "./Customer.css"



export const CustomerList = () =>{
    const [customers, setCustomers] = useState([])

    // fetching the customers from the API, with the user data
    useEffect(
        () => {
            getAllCustomers()
                // capturing the data from the fetch into the customer array 
                .then((customerArray) => {
                    // calling the setter function and passing the customer array into it to set state
                    setCustomers(customerArray)
                })
        },
        // observing initial state
        []  
    )

    // passing thru the Customer component to display the customers, using 3 props for the data
    return <article className="customers">
        {
            customers.map((customer) => <Customer key={`customer--${customer.id}`}
            id={customer.userId}
            fullName={customer?.user?.fullName}
            address={customer.address} 
            phone={customer.phoneNumber} 
            email={customer?.user?.email}
            /> )
        }
    </article>
    

}