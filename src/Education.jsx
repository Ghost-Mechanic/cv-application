import { useState } from "react";

function EducationInput({ label, value, handleChange, error }) {
    return (
        <div>
            <form>
                <label>
                    {label !== "Submit" && label}
                    {label === "School Name" && <input type="text" name="school" onChange={handleChange} value={value} required />}
                    {label === "Study Title" && <input type="text" name="degree" onChange={handleChange} value={value} required />}
                    {label === "From" && <input type="month" name="from" onChange={handleChange} value={value} required />}
                    {label === "To" && <input type="month" name="to" onChange={handleChange} value={value} required />}
                    {label === "Submit" && <input type="submit" value="Submit" onClick={handleChange} />}
                </label>
            </form>
            {error !== '' && label === "Submit" && <p className="form-error">*{error}</p>}
        </div>
    )
}

export default EducationInput;