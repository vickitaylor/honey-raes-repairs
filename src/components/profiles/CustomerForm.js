import { useEffect, useState } from "react"
import { getIndCustomers, saveCustomerEdit } from "../ApiManager"

// form to change customer state data. 

export const CustomerForm = () => {
    
    // TODO: Provide initial state for profile
    const [profile, updateProfile] = useState({
        address: "",
        phoneNumber: "",
        userId: 0
    })
    
    
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    
    const [feedback, setFeedback] = useState("")

    // TODO: Get customer profile info from API and update state
    useEffect(
        () => {
            getIndCustomers(honeyUserObject)
                .then((data) => {
                    const customerObject = data[0]
                    updateProfile(customerObject)
                })
        },
        []
    )

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */

        saveCustomerEdit(profile)
            .then(() => {
                setFeedback("Customer profile successfully saved")
            })

    }

    return (<>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <form className="profile">
            <h2 className="profile__title">Update Customer Information</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.address}
                        onChange={
                            (evt) => {
                                // TODO: Update address property
                                const copy = { ...profile }
                                copy.address = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="tel"
                        required autoFocus
                        className="form-control"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                // TODO: Update phoneNumber property
                                const copy = { ...profile }
                                copy.phoneNumber = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
    </>
    )

}
