import Character from "../Character";
import FallingStar from "../FallingStar";
import Fire from "../Fire";
import Landscape from "../Landscape";
import Rain from "../Rain";
import Settings from "../Settings";
import Tree from "../Tree";
import Wind from "../Wind";

const App = () => {
  return (
    <>
      <Settings />
      <div className="art-frame overflow-hidden relative flex justify-evenly items-center h-[70%] w-160 border-2 border-mist-700 rounded-2xl">
        <Landscape style="absolute bottom-0" />
        <Fire style="absolute bottom-8 left-30" />
        <Tree style="absolute bottom-8 left-96" />
        <Character style="absolute bottom-[-8%]" />
        <FallingStar style="absolute top-30 left-30" />
        <Rain density={100} />
        <Wind power={2} style="absolute opacity-[0.3] left-40" />
        <div className="star absolute top-5 left-9 h-0.5 w-0.5 bg-white rounded-[50%]"></div>
        <div className="star absolute top-16 left-16 h-0.5 w-0.5 bg-white rounded-[50%]"></div>
        <div className="star absolute top-7 left-60 h-0.5 w-0.5 bg-white rounded-[50%]"></div>
        <div className="star absolute top-20 right-28 h-1 w-1 bg-white rounded-[50%]"></div>
        <div className="star absolute top-48 h-0.5 w-0.5 bg-white rounded-[50%]"></div>
        <div className="star absolute top-50 left-4 h-0.5 w-0.5 bg-white rounded-[50%]"></div>
      </div>
    </>
  )
}

export default App;
