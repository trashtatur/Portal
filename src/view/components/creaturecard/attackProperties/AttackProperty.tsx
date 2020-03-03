import * as React from "react";
import {ReactElement} from "react";
import * as style from './creatureAttackProperties.css';

export interface AttackPropertyProps {
    name: string;
    property: string;
}

export class AttackProperty extends React.Component<AttackPropertyProps> {

    render(): ReactElement {
        return <p className={style.attackPropertyName}>{this.props.name} <span
            className={style.attackPropertyValue}>{this.props.property}</span></p>
    }
}