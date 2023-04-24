import React, {FC, useContext} from "react";
import {PomodoroContext} from "context/state";

const Settings: FC = () => {
    const { workMinutes, setWorkMinutes,breakMinutes,setBreakMinutes } = useContext(PomodoroContext);
    return (
        <div>
            <input
                type="number"
                value={workMinutes}
                onChange={(e) => {setWorkMinutes(parseInt(e.target.value))}}
            />
            <input
                type="number"
                value={breakMinutes}
                onChange={(e) => {setBreakMinutes(parseInt(e.target.value))}}
            />
        </div>
    )
}

export default Settings