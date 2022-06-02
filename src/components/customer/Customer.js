import { Link } from "react-router-dom"

// component for CustomerList that will display a list of customers. It has a link in the customer name that will take them to CustomerDetails.
export const Customer = ({ id, fullName, phone, address }) => {
    return <section className="customer">
        <div>
            <Link to={`/customers/${id}`}>Name: {fullName}</Link>
        </div> 
        <div>Address: {address}</div>
        <div>Phone: {phone}</div>
    </section>
}