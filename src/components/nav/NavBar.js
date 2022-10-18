import { EmployeeNav } from "./EmployeeNav"
import { CustomerNav } from "./CustomerNav"
import "./NavBar.css"

export const NavBar = () => {
    const user = localStorage.getItem("honey_user")
	const userObj = JSON.parse(user)
	
	if (userObj.staff) {
		// Return Employee Nav
		return <EmployeeNav />
	} else {
		// Return Customer Nav
		return <CustomerNav />
	}
}

