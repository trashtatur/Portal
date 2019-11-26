import * as React from 'react'
import {round} from "../../../componentTypes";
import {RoundCreature} from "./round creature/RoundCreature";

export interface ISingleRoundProps {
    roundData:round
    pastRounds:round[]
}

export interface ISingleRoundState {

}

export class SingleRound extends React.Component<ISingleRoundProps, ISingleRoundState> {

    render(): any {
        return (
            <div>
                {this.props.roundData.creatureEvents.map((elem,i)=> {
                    return <RoundCreature
                        key={i}
                        id={elem.id}
                        name={elem.name}
                        entryHP={elem.entryHP}
                        currentHP={elem.currentHP}
                        entryAC={elem.entryAC}
                        currentAC={elem.currentAC}
                        entryIni={elem.entryIni}
                        currentIni={elem.currentIni}
                        entryType={elem.entryType}
                        currentType={elem.currentType}
                        />
                })}
            </div>
        )

    }

}