import * as React from "react";
import {RedFadeLine} from "../../uiBasic/redFadeLine/RedFadeLine";
import {CreaturecardSingleAttackProperty} from "./CreaturecardSingleAttackProperty";
import {ReactElement} from "react";
import * as style from './creaturecardAttackProperties.css';

type attackProperty = {
    name: string;
    property: string;
}

export interface CreatureAttackPropertiesProps {
    attackProperties: attackProperty[];
}

export class CreaturecardAttackProperties extends React.Component<CreatureAttackPropertiesProps> {

    render(): ReactElement {
        return (
            <div>
                <RedFadeLine/>
                <div className={style.creatureAttackPropertyContainer}>
                    {
                        this.props.attackProperties &&
                        this.props.attackProperties.map((attackProperty, i) => {
                            return (<CreaturecardSingleAttackProperty name={attackProperty.name}
                                                                      property={attackProperty.property} key={i}/>)
                        })
                    }
                </div>
            </div>
        )
    }
}