import * as React from "react";
import {CreatureSeparator} from "../separator/CreatureSeparator";
import {AttackProperty} from "./AttackProperty";
import * as style from './creatureAttackProperties.module.css'

type attackProperty = {
    name:string,
    property:string
}

export interface ICreatureAttackPropertiesProps {
    attackProperties:attackProperty[]
}

export interface ICreatureAttackPropertiesState {

}

export class CreatureAttackProperties extends React.Component<ICreatureAttackPropertiesProps,ICreatureAttackPropertiesState> {

    render(): any {
        return (
            <div>
            <CreatureSeparator/>
            <div className={style.creatureAttackPropertyContainer}>
                {this.props.attackProperties.map((atkp, i) => {
                    return (<AttackProperty name={atkp.name} property={atkp.property} key={i} />)
                })}
            </div>
            </div>
        )
    }
}