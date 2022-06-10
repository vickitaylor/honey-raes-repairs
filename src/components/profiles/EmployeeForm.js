import { click } from "@testing-library/user-event/dist/click"
import { useEffect, useState } from "react"
import { getIndEmployees, saveEmployeeEdit } from "../ApiManager"


// form to change employee state data. 
// when originally done, the specialty and rate fields were pre-filled with the values from the api.  because the property was bound to the input fields, react knows that the state values changed so it was rerendered automatically.
// fetch call is a put- which means replace, it has to be targeted directly, for the put operation to replace the values changed in the request. 
// for the put, we are passing thru the state variable of profile

export const EmployeeForm = () => {
    
    // TODO: Provide initial state for profile
    const [profile, updateProfile] = useState({
        specialty: "",
        rate: 0,
        userId: 0
    })
    
    
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    
    const [feedback, setFeedback] = useState("")
    // TODO: Get employee profile info from API and update state
    useEffect(
        () => {
            getIndEmployees(honeyUserObject)
                .then((data) => {
                    const employeeObject = data[0]
                    updateProfile(employeeObject)
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
            saveEmployeeEdit(profile)
            .then(() => {
                setFeedback("Employee profile successfully saved")
            })

    }

    return (<>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <form className="profile">
            <h2 className="profile__title">Update Employee Information</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.specialty}
                        onChange={
                            (evt) => {
                                // TODO: Update specialty property
                                const copy = { ...profile }
                                copy.specialty = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="rate">Hourly rate:</label>
                    <input type="number"
                        className="form-control"
                        value={profile.rate}
                        onChange={
                            (evt) => {
                                // TODO: Update rate property
                                const copy = { ...profile }
                                copy.rate = parseFloat(evt.target.value, 2)
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
