import * as React from 'react'
import {round} from "../../../../componentTypes";
import {RoundCreature} from "./round creature/RoundCreature";
import {ReactElement} from "react";

export interface SingleRoundProps {
    roundData: round;
    pastRounds: round[];
}

export class SingleRound extends React.Component<SingleRoundProps> {

    render(): ReactElement {
        return (
            <div>
                {this.props.roundData.creatureEvents.map((elem, i) => {
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