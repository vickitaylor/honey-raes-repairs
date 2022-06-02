import { Outlet, Route, Routes } from "react-router-dom"
import { TicketContainer} from "../tickets/TicketContainer"
import { EmployeeList } from "../employees/EmployeeList"
import { EmployeeDetails } from "../employees/EmployeeDetails"
import { CustomerList } from "../customer/CustomerList"
import { CustomerDetails } from "../customer/CustomerDetails"

// component for what will display for employees only.  
// the employee and customer view are called higher order component, a component that will return other components.  can use them to customize the routes depending on the user type
// added a third route to EmployeeDetails, that will show only the employee details with an id of x.  for react router to handle that route, it will be captured into a variable, using a /:

export const EmployeeViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Honey Rae Repairs</h1>
					<div>Your one-stop-shop to get all your electronics fixed</div>

					<Outlet />
				</>
			}>

				<Route path="tickets" element={ <TicketContainer /> } />
				<Route path="employees" element={ <EmployeeList /> } />
				<Route path="employees/:employeeId" element={ <EmployeeDetails /> } />
                <Route path="customers" element={< CustomerList />} />
                <Route path="customers/:customerId" element={< CustomerDetails />} />

			</Route>
		</Routes>
	)
}