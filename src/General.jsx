import { useState } from "react";

function GeneralInput({ label, value, handleChange, error }) {
    return (
        <div>
            <form>
                <label>
                    {label !== "Submit" && label}
                    {label === "Name" && <input type="text" name="name" onChange={handleChange} value={value} required />}
                    {label === "Phone Number" && <input type="number" name="phone" onChange={handleChange} value={value} required />}
                    {label === "Email" && <input type="email" name="email" onChange={handleChange} value={value} required />}
                    {label === "Submit" && <input type="submit" value="Submit" onClick={handleChange} />}
                </label>
            </form>
            {error !== '' && label === "Submit" && <p className="form-error">*{error}</p>}
        </div>
    )
}

export default GeneralInput;