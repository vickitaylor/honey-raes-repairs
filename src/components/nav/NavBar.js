import { EmployeeNav } from "./EmployeeNav"
import { CustomerNav } from "./CustomerNav"
import "./NavBar.css"

export const NavBar = () => {

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    if (honeyUserObject.staff) {
        // returns the employee navigation view
        return < EmployeeNav /> 
    } else { 
        // returns the customer navigation view
        return < CustomerNav /> 
    }
}


