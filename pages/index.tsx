import styles from "./home.module.scss"
import Head from 'next/head';
import ProgressBar from "components/progressbar";
import Settings from "components/settings";
import {useContext, useEffect, useRef, useState} from "react";
import {PomodoroContext} from "context/state";
import {PauseButton, PlayButton, SettingsButton} from "@/components/buttons";


const MINUTE_IN_SECONDS = 60
const workingColor = 'rgb(234,51,104)';
const breakColor = '#4aec8c';

enum ModeType {
    Working = 1,
    Break,
}

const Home = () => {
    const [settings, setSettings] = useState(false)
    const [isPause, setIsPause] = useState(true)
    const [secondsLeft, setSecondsLeft] = useState(0)
    const [mode, setMode] = useState<number>(ModeType.Working)
    const context = useContext(PomodoroContext)

    const secondsLeftRef = useRef(secondsLeft)
    const isPauseRef = useRef(isPause)
    const modeRef = useRef(mode)

    function initTimer() {
        setSecondsLeft(context.workMinutes * MINUTE_IN_SECONDS)
    }


    function tick() {
        secondsLeftRef.current--
        setSecondsLeft(secondsLeftRef.current)
    }

    useEffect(() => {
        function switchMode() {
            const nextMode = modeRef.current === ModeType.Working ? ModeType.Break : ModeType.Working
            const nextSeconds = (nextMode === ModeType.Working ? context.workMinutes : context.breakMinutes) * MINUTE_IN_SECONDS
            setMode(nextMode)
            modeRef.current = nextMode
            setSecondsLeft(nextSeconds)
            secondsLeftRef.current = nextSeconds
        }

        secondsLeftRef.current = context.workMinutes * MINUTE_IN_SECONDS;
        setSecondsLeft(secondsLeftRef.current);
        const intervalID = setInterval(() => {
            if (isPauseRef.current) {
                return;
            }

            if (secondsLeftRef.current === 0) {
                return switchMode()
            }

            tick()
        }, 1000)
        return () => clearInterval(intervalID)

    }, [context,])

    const totalSeconds = mode === ModeType.Working
        ? context.workMinutes * MINUTE_IN_SECONDS
        : context.breakMinutes * MINUTE_IN_SECONDS
    const percentage = Math.round(secondsLeft / totalSeconds * 100)

    const minutes = Math.floor(secondsLeft / MINUTE_IN_SECONDS)
    let seconds = (secondsLeft % MINUTE_IN_SECONDS).toString()
    if (parseInt(seconds) < 10) seconds = "0" + seconds
    const text = `${minutes}:${seconds}`
    return (
        <div className={styles.home}>
            <Head>
                <title>{isPause ? '⏸️' : ''}{mode === ModeType.Working ? '👨‍💻' : '💆'}{text}</title>
            </Head>
            <div>
                <h1>NeuralClocks <div className={styles.tomato}>🍅</div></h1>
                <div className={styles.timer}>
                    <ProgressBar styles={{pathColor: mode === ModeType.Working ? workingColor : breakColor}}
                                 totalTime={percentage}
                                 text={text}/>
                    <div className={styles.buttons}>
                        {
                            isPause
                                ? <PlayButton onClick={() => {
                                    setIsPause(false)
                                    isPauseRef.current = false
                                }}/>
                                : <PauseButton onClick={() => {
                                    setIsPause(true)
                                    isPauseRef.current = true
                                }}/>
                        }
                        <SettingsButton onClick={() => {
                            setSettings(!settings)
                        }}/>
                    </div>
                    <div>
                        {settings && <Settings/>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;