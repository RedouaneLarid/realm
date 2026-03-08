import { useEffect, useRef } from "react";

const Fire = ({style}) => {
    const ref = useRef(null);

    useEffect(() => {
        const fire = ref.current;

        fire.classList.add("fire-start");

        fire.addEventListener("animationend", () => {
            fire.classList.remove("fire-start");
            fire.classList.add("fire-loop")
        }, { once: true });

    }, [])

    return (
        <div ref={ref} className={`fire-container ${style}`}></div>
    );
}

export default Fire;