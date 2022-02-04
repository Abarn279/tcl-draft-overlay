import React from 'react';

const Timer = () => {
    var [time, setTime] = React.useState<number>(120);
    var [active, setActive] = React.useState<boolean>(false);

    const handleClick = (e: any) => {
        e.preventDefault();
        if (e.button == 0) {
            setActive(true);
        }
        else if (e.button == 2) {
            setActive(false);
        }
    }

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (active) {
                setTime(Math.max(time - 1, 0));
            }
            else {
                setTime(120);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [active, time]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <div className='timer' onClick={handleClick} onContextMenu={handleClick}>{minutes}:{seconds === 0 ? '00' : seconds}</div>
    );
}

export default Timer;