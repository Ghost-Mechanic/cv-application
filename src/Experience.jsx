import { useState } from "react";

function Experience({ label, value, handleChange, error, handleCheckbox, isPresent }) {
    const textBox = value === '' ? "Duties..." : value;

    return (
        <div>
            <form>
                <label>
                    {label !== "Submit" && label}
                    {label === "Company" && <input type="text" name="company" onChange={handleChange} value={value} required />}
                    {label === "Position" && <input type="text" name="position" onChange={handleChange} value={value} required />}
                    {label === "From" && <input type="month" name="from" onChange={handleChange} value={value} required />}
                    {label === "To" && 
                    <>
                        <input type="month" name="to" onChange={handleChange} disabled={isPresent} value={value} required />
                        <label>
                            I currently work here
                            <input type="checkbox" checked={isPresent} onChange={handleCheckbox} />
                        </label>
                    </>
                    }
                    {label === "Submit" && <input type="submit" value="Submit" onClick={handleChange} />}
                </label>
            </form>
            {label === "Duties" && <textarea rows="6" cols="80" name="duties" form="usrform" onChange={handleChange}>{textBox}</textarea>}
            {error !== '' && label === "Submit" && <p className="form-error">*{error}</p>}
        </div>
    )
}

export default Experience;