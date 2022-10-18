import { CustomerProfile } from "./CustomerProfile"
import { EmployeeProfile } from "./EmployeeProfile"

export const Profile = () => {
    const user = localStorage.getItem("honey_user")
	const userObj = JSON.parse(user)
	
	if (userObj.staff) {
		return <EmployeeProfile userObj={userObj} />
	} else {
		return <CustomerProfile userObj={userObj} />
	}
}

