import { useContext, useState } from "react";
import { AudioContext } from "./App";

const MainPage = () => {
    const [value, setValue] = useState("");
    const { tasks, setTasks } = useContext(AudioContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (tasks.length < 3 && !tasks.includes(value)) {
            setTasks(prev => [...prev, value]);
            setValue("")
        }
    }

    return (
        <div className="main-page flex flex-col justify-center items-center gap-10 h-full w-full">
            <h1 className="font-bold text-4xl tracking-wide text-mist-300">Set a maximum of three tasks</h1>

            <div className="task-list w-1/2 max-w-[530px] flex flex-col justify-evenly items-center gap-1.5">
                {tasks.map((task, i) => {
                    return (<h2 className="text-mist-600 font-semibold self-start text-[1.1rem] !p-2 w-full hover:bg-mist-800" key={i}>{task}</h2>)
                })}
            </div>
            <form onSubmit={handleSubmit} className="w-1/2 max-w-[530px]">
                <input type="text" value={value} onChange={(e) => { setValue(e.target.value) }} className="border-2 border-mist-600 rounded-lg w-full h-10 focus:ring-0 focus:outline-none !p-4 text-mist-600"
                />
            </form>
            <div className="lower-buttons w-1/2 max-w-[530px] flex justify-evenly items-center">

                {tasks.length > 0 &&
                    <>
                        <button onClick={(e) => {
                            e.preventDefault();
                            setTasks([]);
                        }} className="text-mist-400 border-2 border-mist-600 !p-2 !pr-4 !pl-4 rounded-lg cursor-pointer">Clear</button>
                        <button className="text-mist-400 border-2 border-mist-600 !p-2 !pr-4 !pl-4 rounded-lg cursor-pointer hover:text-[#ec73ce] hover:border-[#ec73ce]">Start</button>
                    </>}
            </div>
        </div>
    );
}

export default MainPage;