import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getEmployeeByUserID, UpdateEmployee } from "../ApiManager"

export const EmployeeProfile = ({ userObj }) => {
    // TODO: Provide initial state for profile
    const [profile, updateProfile] = useState({}),
        [placeholders, updatePlaceholders] = useState({}),
        [feedback, setFeedback] = useState(""),
        navigate = useNavigate()

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element dissapear after 3 seconds
            setTimeout(() => setFeedback(""), 3000)
        }
    }, [feedback])

    // TODO: Get employee profile info from API and update state
    useEffect(() => {
        getEmployeeByUserID(userObj.id)
            .then(
                (data) => {
                    updateProfile(data[0])
                    updatePlaceholders({ ...data[0] })
                }
            )
    }, [userObj])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
        if (Object.values(profile).length === 4) {
            document.getElementById("update-profile").disabled = true

            UpdateEmployee(profile.id, profile)
                .then(() => {
                    setFeedback("Employee profile successfully saved")
                })
                .then(() => {
                    setTimeout(() => navigate("/"), 1500)
                })
        }
    }

    return (
        <>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <form className="profile">
                <h2 className="profile__title">New Service Ticket</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="specialty">Specialty:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder={placeholders.specialty}
                            onChange={
                                (evt) => {
                                    const copy = { ...profile }
                                    copy.specialty = evt.target.value

                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Hourly rate:</label>
                        <input type="number"
                            className="form-control"
                            placeholder={placeholders.rate}
                            onChange={
                                (evt) => {
                                    const copy = { ...profile }
                                    copy.rate = parseFloat(evt.target.value, 2)

                                    updateProfile(copy)
                                }
                            }
                        />
                    </div>
                </fieldset>
                <button
                    onClick={(evt) => handleSaveButtonClick(evt)}
                    className="btn btn-primary"
                    id="update-profile">
                    Save Profile
                </button>
            </form>
        </>
    )
}