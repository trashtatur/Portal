import * as React from "react";
import {SingleAction} from "./SingleAction";
import {CreatureSeparator} from "../separator/CreatureSeparator";
import {creatureAction} from "../../componentTypes";
import * as style from './creatureAction.css';


export interface ICreatureActionProps {
    actions: creatureAction[]
}

export interface ICreatureActionState {

}

export class CreatureActions extends React.Component<ICreatureActionProps, ICreatureActionState> {

    render(): any {
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