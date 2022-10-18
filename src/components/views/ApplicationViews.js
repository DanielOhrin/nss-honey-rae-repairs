import { CustomerView } from "./CustomerView"
import { EmployeeView } from "./EmployeeView"

export const ApplicationViews = () => {
	const user = localStorage.getItem("honey_user")
	const userObj = JSON.parse(user)
	
	if (userObj.staff) {
		// Return Employee View
		return <EmployeeView />
	} else {
		// Return Customer View
		return <CustomerView />
	}
}

