import { useState } from "react";

function GeneralInput({ label, value, handleChange }) {
    return (
        <div>
            <form>
                <label>
                    {label !== "Submit" && label}
                    {label === "Name" && <input type="text" name="name" onChange={handleChange} value={value} />}
                    {label === "Phone Number" && <input type="number" name="phone" onChange={handleChange} value={value} />}
                    {label === "Email" && <input type="email" name="email" onChange={handleChange} value={value} />}
                    {label === "Submit" && <input type="submit" value="Submit" onClick={handleChange} />}
                </label>
            </form>
        </div>
    )
}

export default GeneralInput;