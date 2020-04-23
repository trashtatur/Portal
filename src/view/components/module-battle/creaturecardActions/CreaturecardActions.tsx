import * as React from "react";
import {CreaturecardSingleAction} from "./CreaturecardSingleAction";
import {RedFadeLine} from "../../uiBasic/redFadeLine/RedFadeLine";
import {creatureAction} from "../../componentTypes";
import {ReactElement} from "react";
import * as style from './creaturecardAction.css';

export interface CreatureActionProps {
    actions: creatureAction[];
}

export class CreaturecardActions extends React.Component<CreatureActionProps> {

    render(): ReactElement {
        return (
            <div>
                <p className={style.preSeparator}>
                    Actions:
                </p>
                <RedFadeLine/>
                <div className={style.actionContainer}>
                    {this.props.actions.map((action, i) => {
                        return <CreaturecardSingleAction action={action} key={i}/>
                    })}
                </div>
            </div>
        )
    }
}