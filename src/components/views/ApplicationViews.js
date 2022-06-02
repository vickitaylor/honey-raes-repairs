import { EmployeeViews } from "./EmployeeViews"
import { CustomerViews } from "./CustomerViews"


// if statement for if the customer or the employee view will show, depending on who is logged in
export const ApplicationViews = () => {

	const localHoneyUser = localStorage.getItem("honey_user")
	const honeyUserObject = JSON.parse(localHoneyUser)

	if (honeyUserObject.staff) {
		// return employee view
		return < EmployeeViews />
	} else {
		// return customer view
		return <CustomerViews />
	}
	
}
