import React, {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBomb, faCirclePause, faCirclePlay, faGear} from "@fortawesome/free-solid-svg-icons";
import styled from "./buttons.module.scss"

interface ButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    form?: string;
    value?: string;
    autoFocus?: boolean;
}

export const PauseButton: FC<ButtonProps> = (props) => {
    return (
        <button role={"pause-button"} title={"Pause"} className={styled.playpause} {...props}>
            <FontAwesomeIcon icon={faCirclePause}/>
        </button>
    )
}

export const PlayButton: FC<ButtonProps> = (props) => {

    return (<button role={"play-button"} title={"Play"} className={styled.playpause} {...props}>
            <FontAwesomeIcon icon={faCirclePlay} />
        </button>
    );
}

export const SettingsButton: FC<ButtonProps> = ({onClick}) => {
    return (
        <button role={"settings-button"} title={"Settings"} className={styled.settings} onClick={onClick}>
            <FontAwesomeIcon icon={faGear}/>
        </button>);
}
export const ResetButton: FC<ButtonProps> = ({onClick}) => {
    return (
        <button role={"reset-button"} title={"Reset"} className={styled.playpause} onClick={onClick}>
            <FontAwesomeIcon icon={faBomb}/>
        </button>);
}