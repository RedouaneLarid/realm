import { useContext } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AudioContext } from "./main/App";
import Character from "./Character";
import FallingStar from "./FallingStar";
import Fire from "./Fire";
import Landscape from "./Landscape";
import Rain from "./Rain";
import Stars from "./Stars";
import Tree from "./Tree";
import Tree2 from "./Tree2";
import Wind from "./Wind";
import Bird1 from "./Bird1";
import Bird2 from "./Bird2";
import River from "./River";

const ArtFrame = () => {
    const { volumes } = useContext(AudioContext);
    return (
        <div className="art-frame-container h-screen w-screen flex justify-center items-center">
            <div className="art-frame overflow-hidden relative flex justify-evenly items-center h-[70%] min-w-[630px] w-160 border-2 border-mist-700 rounded-2xl">
                <Landscape style="absolute bottom-0" />

                <AnimatePresence>
                    {volumes.fire > 0 && (
                        <motion.div
                            key="fire"
                            className="absolute bottom-8 left-30"
                            exit={{ scaleY: 0, opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            style={{ transformOrigin: "bottom center" }}
                        >
                            <Fire />
                        </motion.div>
                    )}

                    {volumes.forest > 0 && (
                        <motion.div
                            key="tree1"
                            className="absolute bottom-8 left-96"
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 100, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            <Tree />
                        </motion.div>
                    )}

                    {volumes.forest > 0 && (
                        <motion.div
                            key="bird1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            <Bird1 style="absolute right-20 bottom-55" />
                        </motion.div>
                    )}

                    {volumes.forest > 50 && (
                        <motion.div
                            key="tree2"
                            className="absolute bottom-8 left-[-170px]"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            <Tree2 />
                        </motion.div>
                    )}

                    {volumes.forest > 50 && (
                        <motion.div
                            key="bird2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            <Bird2 style="absolute left-0 bottom-70" />
                        </motion.div>
                    )}

                    {
                        volumes.river > 0 && 
                        <motion.div
                            key="river"
                            className="absolute w-full h-full"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        >
                            <River style="absolute bottom-[-34px]" />
                        </motion.div>
                    }
                </AnimatePresence>

                <Character style="absolute bottom-[-60px]" />
                <FallingStar style="absolute top-30 left-30" />
                <Rain density={volumes.rain * 2} />
                <Wind power={0} style="absolute opacity-[0.3] left-40" />
                <Stars />
            </div>
        </div>
    ); 20
}

export default ArtFrame;