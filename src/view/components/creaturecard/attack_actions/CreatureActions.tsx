import * as React from "react";
import {SingleAction} from "./SingleAction";
import {CreatureSeparator} from "../separator/CreatureSeparator";
import {creatureAction} from "../../componentTypes";
import {ReactElement} from "react";
import * as style from './creatureAction.css';

export interface CreatureActionProps {
    actions: creatureAction[];
}

export class CreatureActions extends React.Component<CreatureActionProps> {

    render(): ReactElement {
        return (
            <div>
                <p className={style.preSeparator}>
                    Actions:
                </p>
                <CreatureSeparator/>
                <div className={style.actionContainer}>
                    {this.props.actions.map((action, i) => {
                        return <SingleAction action={action} key={i}/>
                    })}
                </div>
            </div>
        )
    }
}