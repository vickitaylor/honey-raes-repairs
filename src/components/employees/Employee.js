import { Link } from "react-router-dom"

// component for the EmployeeList. It will be receiving props.  This is a child of employee list.  Many reasons to do this, or if you wanted the employee information render in multiple places than just the employee list. added keys to the EmployeeList for the name and email.
// changing the name of the employee to a link


export const Employee = ({ id, fullName, email }) => {
    return <section className="employee">
        <div>
            <Link to={`/employees/${id}`}>Name: {fullName}</Link>
        </div>
        <div>Email: {email}</div>
    </section>


}