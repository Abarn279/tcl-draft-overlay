import React from 'react';
import './captain.scss';

interface CaptainProps {
    name: string;
    team: string[];
    isActivePick: boolean;
}

const Captain = (props: CaptainProps) => {
    const rolePaths = ['./top.png', './jg.png', './mid.png', './bot.png', './sup.png']

    return (
        <div className={`captain-holder ${props.isActivePick ? 'active' : ' '}`}>
            <div className="camera-holder">
                <div className='camera emcee'></div>
                <h2 className="streamer-name captain-name">{props.name}</h2>
            </div>
            <div className="table-holder">
                <table className='captain-table'>
                    <tbody>
                        {props.team.map((name: string, ind: number) => {
                            return <tr><td>
                                <img src={rolePaths[ind]} className='role-icon'/>
                                {name}
                            </td></tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Captain;