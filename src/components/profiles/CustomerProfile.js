import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCustomerByUserID } from "../ApiManager"

export const CustomerProfile = ({ userObj }) => {
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

    // TODO: Get customer profile info from API and update state
    useEffect(() => {
        getCustomerByUserID(userObj.id)
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

            updateProfile(profile.id, profile)
                .then(() => {
                    setFeedback("Customer profile successfully saved")
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
                        <label htmlFor="address">Address:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder={placeholders.address}
                            onChange={
                                (evt) => {
                                    const copy = { ...profile }
                                    copy.address = evt.target.value

                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Phone:</label>
                        <input type="text"
                            maxLength={12}
                            className="form-control"
                            placeholder={placeholders.phoneNumber}
                            onChange={
                                (evt) => {
                                    const copy = { ...profile }
                                    copy.phoneNumber = evt.target.value

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