import { useState, useEffect } from "react"
import { Employee } from "./Employee"
import "./Employee.css"

// component to show the customers a list of the employees
export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])


    // fetching the user array from the API, and only getting users whose isStaff property is true
    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=true`)
                .then(response => response.json())
                // placing a parameter to capture the array after json processing
                .then((employeeArray) => {
                    // then calling the setter function of setEmployees and passing the value of employeeArray 
                    setEmployees(employeeArray)
                })
        },
        []
    )

    // passing thru the Employee component to display the employee details and added 3 props for id, name and email
    return <article className="employees">
        {
            employees.map((employee) => <Employee key={`employee--${employee.id}`}
            id={employee.id}
            fullName={employee.fullName} 
            email={employee.email} /> )
        }
    </article>
}
