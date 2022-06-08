import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"


// this component is for the link in the Employee component that will display the details for the employee.
// this component is only displayed when the route matches employee id x.  The hook to do this is useParams


export const EmployeeDetails = () => { 
    // the employeeId is what was created in the route. useParams is the hook, variable was defined in the route, it pulls in the object created by the route parameters, and you extract the variable defined here
    const {employeeId} = useParams()
    // creating state variable for the employee 
    const [employee, updateEmployee] =useState({})


    // useEffect to get user, employee, and ticket details.  Started with the employees, then expanded to add the users, and then embedded to add the tickets, the url returns an array, and since we want the userId as that is what the url it is linked to is using for the id
    // in the return because the information is an array in the employee object, it cannot be read, because react reads the initial state first then the use effect kicks in, and fetches the data which update the state and it renders again. and since at the initial state there is no value.  because it is a property of a property, specialty and rate is a direct property.  ?. is an optional chaining operator, only keep going down this path if the properties exist.
    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
                .then(response => response.json())
                // placing a parameter to capture the array after json processing
                .then((data) => {
                    // storing the single employee array in a variable, since only one employee is returned it is position 0
                    const singleEmployee = data[0]
                    // then calling the setter function of updateEmployee and passing the value of singleEmployee object
                    updateEmployee(singleEmployee)
                })
        },
        [employeeId] // observing employeeId
    )


    
    return <section className="employee">
        <header className="employee__header">{employee?.user?.fullName}</header>
        <div>Email: {employee?.user?.email}</div>
        <div>Specialty: {employee.specialty}</div>
        <div>Rate: {employee.rate}</div>
        <footer className="employee__footer">Currently working on {employee?.employeeTickets?.length} tickets.</footer>
    </section>
}





