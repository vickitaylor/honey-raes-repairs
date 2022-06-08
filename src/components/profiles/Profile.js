import { CustomerForm } from "./CustomerForm"
import { EmployeeForm } from "./EmployeeForm"


// component verifies if a customer of employee is logged in
export const Profile = () => {

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    if (honeyUserObject.staff) {
        // returns the employee navigation view
        return < EmployeeForm />
    } else {
        // returns the customer navigation view
        return < CustomerForm />
    }
}


