const Rain = ({density}) => {
    const drops =
        Array.from({ length: density }, () => ({
            left: Math.random() * 100,
            delay: -(Math.random() * 10),
        }))


    return (
        <div className="rain-container">
            {drops.map((drop, i) => (
                <div
                    key={i}
                    className="rain-drop"
                    style={{
                        left: `${drop.left}%`,
                        animationDelay: `${drop.delay}s, ${drop.delay}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default Rain;