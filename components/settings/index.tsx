import React, {FC, useContext} from "react";
import {PomodoroContext} from "context/state";
import Switch from "react-switch";
import styles from "./settings.module.scss"
import {ActionType} from "@/context/types";
import {ResetButton} from "@/components/buttons";


const Settings: FC = () => {
    const {state, dispatch} = useContext(PomodoroContext);
    return (
        <div role="settings" className={styles.settings}>
            <div>Work Minutes
                <input
                    type="number"
                    min={15}
                    max={25}
                    value={state.workMinutes}
                    onChange={(e) => {
                        const payload = parseInt(e.target.value)
                        if (isNaN(payload)) return
                        dispatch({type: ActionType.SetWorkMinutes, payload})
                    }}
                />
            </div>
            <div>
                Break Minutes
                <input
                    type="number"
                    min={5}
                    max={25}
                    value={state.breakMinutes}
                    onChange={(e) => {
                        const payload = parseInt(e.target.value)
                        if (isNaN(payload)) return
                        dispatch({type: ActionType.SetBreakMinutes, payload})
                    }}
                />
            </div>
            <div>
                Long Break Minutes
                <input
                    type="number"
                    min={15}
                    max={30}
                    value={state.longBreakMinutes}
                    onChange={(e) => {
                        const payload = parseInt(e.target.value)
                        if (isNaN(payload)) return
                        dispatch({type: ActionType.SetLongBreakMinutes, payload})
                    }}
                />
            </div>
            <div className={styles.fastmode}>
                <p>Fast Mode
                    (1 sec = 10 millisec)
                </p>
                <div className={styles.switch}>
                    <Switch
                        onHandleColor="#2693e6"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={20}
                        width={48}
                        className="react-switch"
                        onColor={"#EA3368"} onChange={(e) => {
                        dispatch({type: ActionType.SetFastMode, payload: !state.fastModeOn})
                    }} checked={state.fastModeOn}/>
                </div>
            </div>
            <div>
                <ResetButton onClick={() => {
                    dispatch({type:ActionType.Reset})
                }} />
            </div>
        </div>
    )
}

export default Settings