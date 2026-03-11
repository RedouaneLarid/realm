import { Pause, Play, RefreshCcw, SkipForward } from "lucide-react";
import { useContext, useEffect, useCallback } from "react";
import { AudioContext } from "./App";

const MODES = [
    { label: "FOCUS", duration: 25 * 60, color: "#7ec8c8" },
    { label: "SHORT", duration: 5 * 60, color: "#a8c5a0" },
    { label: "LONG", duration: 15 * 60, color: "#b8a9c9" },
];

const pad = (num) => String(num).padStart(2, "0");

const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${pad(m)}:${pad(s)}`;
};

const Timer = () => {
    const {
        modeIdx, setModeIdx,
        timeLeft, setTimeLeft,
        running, setRunning,
        done, setDone,
        intervalRef,
    } = useContext(AudioContext);

    const mode = MODES[modeIdx];

    const circumference = 2 * Math.PI * 130;
    const progress = 1 - timeLeft / mode.duration;
    const dashOffset = circumference * (1 - progress);

    const stop = useCallback(() => {
        clearInterval(intervalRef.current);
        setRunning(false);
    }, []);

    const reset = useCallback(() => {
        stop();
        setTimeLeft(mode.duration);
        setDone(false);
    }, [stop, mode.duration]);

    const switchMode = (idx) => {
        stop();
        setModeIdx(idx);
        setTimeLeft(MODES[idx].duration);
        setDone(false);
    };

    return (
        <div className="timer-container flex flex-col justify-center items-center w-full h-full gap-4">
            {/* mode tabs */}
            <div style={{ display: "flex", gap: "0.4rem" }}>
                {MODES.map((m, i) => (
                    <button
                        key={m.label}
                        onClick={() => switchMode(i)}
                        style={{
                            fontFamily: "inherit",
                            fontSize: "0.55rem",
                            letterSpacing: "2px",
                            padding: "4px 10px",
                            border: `1px solid ${i === modeIdx ? m.color : "rgba(255,255,255,0.1)"}`,
                            borderRadius: "4px",
                            background: i === modeIdx ? `${m.color}22` : "transparent",
                            color: i === modeIdx ? m.color : "rgba(255,255,255,0.3)",
                            cursor: "pointer",
                            transition: "all 0.2s",
                        }}
                    >
                        {m.label}
                    </button>
                ))}
            </div>

            <div style={{ position: "relative", width: "300px", height: "300px" }}>
                <svg width="300" height="300" style={{ transform: "rotate(-90deg)" }}>
                    <circle
                        cx="150" cy="150" r="130"
                        fill="none"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="8"
                    />
                    <circle
                        cx="150" cy="150" r="130"
                        fill="none"
                        stroke={done ? "#c9a96e" : mode.color}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        style={{ transition: "stroke-dashoffset 0.8s ease, stroke 0.4s ease" }}
                    />
                </svg>

                <div style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "2px",
                }}>
                    <span style={{
                        fontSize: "2.8rem",
                        fontWeight: "700",
                        letterSpacing: "3px",
                        color: done ? "#c9a96e" : "rgba(255,255,255,0.9)",
                        transition: "color 0.4s",
                        fontVariantNumeric: "tabular-nums",
                    }}>
                        {formatTime(timeLeft)}
                    </span>
                    {done && (
                        <span style={{
                            fontSize: "0.55rem",
                            letterSpacing: "3px",
                            color: "#c9a96e",
                            animation: "pulse 1.5s ease-in-out infinite",
                        }}>
                            DONE
                        </span>
                    )}
                </div>
            </div>

            {/* controls */}
            <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                {!running &&
                    <button
                        onClick={reset}
                        style={{
                            borderRadius: "50%",
                            width: "32px", height: "32px",
                            cursor: "pointer",
                            color: "rgba(255,255,255,0.4)",
                            fontSize: "0.75rem",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.9)"}
                        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                    >
                        <RefreshCcw />
                    </button>}

                <button
                    onClick={() => { setRunning(r => !r); setDone(false); }}
                    style={{
                        borderRadius: "50%",
                        width: "32px", height: "32px",
                        cursor: "pointer",
                        color: mode.color,
                        fontSize: "1rem",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.2s",
                        /* boxShadow: running ? `0 0 16px ${mode.color}44` : "none", */
                    }}
                >
                    {running ? <Pause /> : <Play />}
                </button>

                {!running &&
                    <button
                        onClick={() => switchMode((modeIdx + 1) % MODES.length)}
                        style={{
                            borderRadius: "50%",
                            width: "32px", height: "32px",
                            cursor: "pointer",
                            color: "rgba(255,255,255,0.4)",
                            fontSize: "0.75rem",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.9)"}
                        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                    >
                        <SkipForward />
                    </button>}
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0.3; }
                }
            `}</style>
        </div>
    );
};

export default Timer;