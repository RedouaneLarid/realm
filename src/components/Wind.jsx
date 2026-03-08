const Wind = ({style , power}) => {
    const streaks = Array.from({ length: power }, (_, i) => ({
        top: Math.random() * 80,
        delay: -(i * (2 / 15)),   // evenly spread across 2s cycle
        scale: 0.8 + Math.random() * 1.4, // varied sizes
    }))

    return (
        <div className={`wind-container ${style}`}>
            {streaks.map((s, i) => (
                <div
                    key={i}
                    className="wind-streak"
                    style={{
                        top: `${s.top}%`,
                        animationDelay: `${s.delay}s, ${s.delay}s`,
                        transform: `scaleX(${s.scale})`,
                    }}
                />
            ))}
        </div>
    );
}

export default Wind;