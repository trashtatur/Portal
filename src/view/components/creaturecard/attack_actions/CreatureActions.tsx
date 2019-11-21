import * as React from "react";
import * as style from './creatureAction.module.css';
import {SingleAction} from "./SingleAction";
import {CreatureSeparator} from "../separator/CreatureSeparator";

export type creatureAction = {
    name: string,
    rangeType: string,
    attackBonus: number,
    range?: number,
    damage: string,
    critmod: string,
    damageType: string,
    additionalInfo: string
}

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