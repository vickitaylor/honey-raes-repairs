import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCustomerDetails } from "../ApiManager"


// component to display the individual customer information when their name link is clicked
export const CustomerDetails = () => {
    const {customerId} = useParams()
    // creating state variable for individual customer
    const [customer, updateCustomer] = useState({})

    useEffect(
        () => {
            getCustomerDetails(customerId)
            // parameter to capture the data returned from json
            .then((data) => {
                // declaring a variable to hold the single customer data 
                const singleCustomer = data[0]
                // calling setter function to store variable holding the single customer data
                updateCustomer(singleCustomer)
            })
        }, 
        [customerId] //observing customerId
    )
    
    return <section className="customer">
        <header className="customer__header">Name: {customer?.user?.fullName}</header> 
        <div>Email: {customer?.user?.email}</div>
        <div>Phone: {customer.phoneNumber}</div>
        <div>Address: {customer.address}</div>
    </section>

}