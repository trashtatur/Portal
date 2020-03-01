import * as React from "react";
import * as style from './creatureAttackProperties.css';

export interface IAttackPropertyProps {
    name:string,
    property:string
}

export interface IAttackPropertyState {

}

export class AttackProperty extends React.Component<IAttackPropertyProps,IAttackPropertyState> {

    render(): any {
        return <p className={style.attackPropertyName}>{this.props.name} <span className={style.attackPropertyValue}>{this.props.property}</span></p>
    }
}