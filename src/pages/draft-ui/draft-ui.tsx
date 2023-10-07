import React from 'react';
import './draft-ui.scss';

import Captain from '../../components/captain/captain';
import Timer from '../../components/timer/timer';

interface Team {
  captain: string;
  top: string;
  jg: string;
  adc: string;
  mid: string;
}

const getUnpickedRoster = (): string[][] => [
  [
    "Autöpsy",
    "BludBathnBeyond",
    "Hippogriff",
    "Jbob06",
    "Jjazz Music",
    "Sirerin"
  ],
  [
    "1M TINY RICK",
    "Calbert",
    "Corridian",
    "Reformed Bully",
    "Rook Stout",
    "Spurg"
  ],
  [
    "Abarn",
    "CNTRL",
    "illtakeMid",
    "Sandy Snake",
    "Verd",
    "Tony"
  ],
  [
    "Loosive",
    "Rioklu",
    "SpeedyBandito",
    "tailwhip",
    "ToastyTG",
    "Wøjtek"
  ]]

const DraftUI = () => {
  var unpickedRoster = getUnpickedRoster();

  // Get captains and pick order
  const captains = ["Lemonilla", "Bush League ", "Espynn", "Rudy", "IREP", "SwissArmyCabinet"];
  const pickOrder = captains.concat(Object.assign([], captains).reverse()).concat(captains).concat(Object.assign([], captains).reverse());

  var teamsRaw = captains
    .map((captain: string) => {
      return {
        captain: captain,
        top: "",
        jg: "",
        mid: "",
        adc: ""
      } as Team
    });

  const [unpickedPlayers, setUnpickedPlayers] = React.useState<string[][]>(unpickedRoster)
  const [teams, setTeams] = React.useState<Team[]>(teamsRaw);
  const [activePickIndex, setActivePickIndex] = React.useState(0);

  // Functions
  const onClickUndraftedPlayer = (position: number, rank: number) => {
    let player = unpickedPlayers[position][rank];
    let thisTeam = teams.find(t => t.captain === pickOrder[activePickIndex])!;

    if (!player) return;

    // add to team
    var newTeams = [...teams]
    switch (position) {
      case 0:
        if (thisTeam.top) return;
        thisTeam.top = player;
        break;
      case 1:
        if (thisTeam.jg) return;
        thisTeam.jg = player;
        break;
      case 2:
        if (thisTeam.mid) return;
        thisTeam.mid = player;
        break
      case 3:
        if (thisTeam.adc) return;
        thisTeam.adc = player;
        break;
      default:
        return;
    }
    setTeams(newTeams);

    // Set list of unpicked players
    setUnpickedPlayers(
      unpickedPlayers.map((positionPlayers: string[]) => {
        let index = positionPlayers.indexOf(player);
        if (index > -1) {
          return [...positionPlayers.filter((_, i) => i !== index)];
        }
        return positionPlayers;
      })
    );

    // Set who is the next active pick
    setActivePickIndex(activePickIndex + 1);
  }

  const getTeam = (name: string): string[] => {
    const team = teams.find(t => t.captain === name)!;
    return [team.top, team.jg, team.mid, team.adc, team.captain];
  }

  return (
    <div className="app">
      <video autoPlay loop muted className='video'>
        <source src={'./BG.mp4'} type='video/webm' />
      </video>
      <div className='opaque'></div>
      <div className='container-fluid'>
        <img className='tcl-logo left' src='mini.png' />
        <img className='tcl-logo right' src='mini.png' />
        <div className='row header'>
          <h1 className="title">TCL Season 7 Draft</h1>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='row emcee-draft-data'>
              <div className='col-6'>
                <div className='camera emcee'></div>
                <h2 className="streamer-name">Bully</h2>
              </div>
              <div className='col-6'>
                <table className='draft-info'>
                  <tbody>
                    <tr>
                      <td>
                        <img src='./picking.png' className='role-icon' />
                        {pickOrder[activePickIndex]}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src='./timer.png' className='role-icon' />
                        <Timer />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src='./nextup.png' className='role-icon upnext' />
                        {pickOrder[activePickIndex + 1]}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='col'>
            <table className='undrafted-players'>
              <thead>
                <tr>
                  <th><img src={'./top.png'} /></th>
                  <th><img src={'./jg.png'} /></th>
                  <th><img src={'./mid.png'} /></th>
                  <th><img src={'./bot.png'} /></th>
                </tr>
              </thead>
              <tbody>
                {[0, 1, 2, 3, 4, 5].map((rank: number) => { // people
                  return <tr>
                    {[0, 1, 2, 3].map((position: number) => { // position
                      return <td onClick={() => onClickUndraftedPlayer(position, rank)} key={position.toString() + rank.toString()}>{unpickedPlayers[position][rank]}</td>
                    })}
                  </tr>
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className='row captains'>
          {captains.slice(0, 3).map((name) => {
            return (
              <div className='col'>
                <Captain name={name} team={getTeam(name)} isActivePick={pickOrder[activePickIndex] == name} />
              </div>
            )
          })}
        </div>
        <div className='row captains 2'>
          {captains.slice(3, 6).map((name) => {
            return (
              <div className='col'>
                <Captain name={name} team={getTeam(name)} isActivePick={pickOrder[activePickIndex] == name} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default DraftUI;
