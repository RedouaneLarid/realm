import { createContext, useRef, useState } from "react";
import ArtFrame from "../ArtFrame";
import Settings from "../Settings";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import { Heart, HeartCrack } from "lucide-react";

export const AudioContext = createContext();

const App = () => {
  const rainPlayer = useRef(null);
  const firePlayer = useRef(null);
  const forestPlayer = useRef(null);
  const riverPlayer = useRef(null);
  const [volumes, setVolumes] = useState({ rain: 0, fire: 0, forest: 0, river: 0 });
  const [sliders, setSliders] = useState({ rain: 0, fire: 0, forest: 0, river: 0 });
  const [tasks, setTasks] = useState([]);

  return (
    <>
      <AudioContext.Provider value={{
        rainPlayer, firePlayer, forestPlayer, riverPlayer,
        volumes, setVolumes,
        sliders, setSliders,
        tasks, setTasks
      }}>
        <BrowserRouter>
          <div className="main-container relative flex flex-col justify-center items-center h-full w-full">
            <nav className="w-full flex justify-around items-center absolute top-10 text-mist-600 font-bold tracking-widest">
              <Link to="/">MAIN</Link>
              <Link to="/settings">AMBIENT</Link>
              <Link to="https://github.com/RedouaneLarid" target="_blank">
                <Heart className="text-pink-300"/>
              </Link>
            </nav>

            <Routes>
              <Route path="/" element={<MainPage />} />
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