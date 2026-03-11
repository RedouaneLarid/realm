import { createContext, useRef, useState, useEffect } from "react";
import ArtFrame from "../ArtFrame";
import Settings from "../Settings";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import { Heart } from "lucide-react";
import Timer from "./Timer";

export const AudioContext = createContext();

const App = () => {
  const rainPlayer = useRef(null);
  const firePlayer = useRef(null);
  const forestPlayer = useRef(null);
  const riverPlayer = useRef(null);
  const [volumes, setVolumes] = useState({ rain: 0, fire: 0, forest: 0, river: 0 });
  const [sliders, setSliders] = useState({ rain: 0, fire: 0, forest: 0, river: 0 });
  const [tasks, setTasks] = useState([]);

  const [modeIdx, setModeIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            setDone(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  return (
    <>
      <AudioContext.Provider value={{
        rainPlayer, firePlayer, forestPlayer, riverPlayer,
        volumes, setVolumes,
        sliders, setSliders,
        tasks, setTasks,
        modeIdx, setModeIdx,
        timeLeft, setTimeLeft,
        running, setRunning,
        done, setDone,
        intervalRef,
      }}>
        <BrowserRouter>
          <div className="main-container relative flex flex-col justify-center items-center h-full w-full">
            <nav className="w-full flex justify-around items-center absolute top-10 text-mist-600 font-bold tracking-widest">
              <Link to="/">MAIN</Link>
              <Link to="/timer">TIMER</Link>
              <Link to="/settings">AMBIENT</Link>
              <Link to="https://github.com/RedouaneLarid" target="_blank">
                <Heart className="text-pink-300" />
              </Link>
            </nav>

            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/timer" element={<Timer />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </BrowserRouter>
        <ArtFrame />
        <audio ref={rainPlayer} src="/sounds/rain.wav" loop />
        <audio ref={firePlayer} src="/sounds/fire.mp3" loop />
        <audio ref={forestPlayer} src="/sounds/forest2.mp3" loop />
        <audio ref={riverPlayer} src="/sounds/river.mp3" loop />
      </AudioContext.Provider>
    </>
  );
};

export default App;