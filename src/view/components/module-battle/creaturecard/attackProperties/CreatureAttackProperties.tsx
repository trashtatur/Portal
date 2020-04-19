import * as React from "react";
import {CreatureSeparator} from "../separator/CreatureSeparator";
import {AttackProperty} from "./AttackProperty";
import {ReactElement} from "react";
import * as style from './creatureAttackProperties.css';

type attackProperty = {
    name: string;
    property: string;
}

export interface CreatureAttackPropertiesProps {
    attackProperties: attackProperty[];
}

export class CreatureAttackProperties extends React.Component<CreatureAttackPropertiesProps> {

    render(): ReactElement {
        return (
            <div>
                <CreatureSeparator/>
                <div className={style.creatureAttackPropertyContainer}>
                    {this.props.attackProperties.map((attackProperty, i) => {
                        return (<AttackProperty name={attackProperty.name} property={attackProperty.property} key={i}/>)
                    })}
                </div>
            </div>
        )
    }
}