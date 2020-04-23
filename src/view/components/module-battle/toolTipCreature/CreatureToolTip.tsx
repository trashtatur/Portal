import * as React from 'react';
import {ReactNode} from 'react';
import * as style from './creatureToolTip.css';

export interface CreatureToolTipProps {
    creature;
}

export class CreatureToolTip extends React.Component<CreatureToolTipProps> {

    render(): ReactNode {
        return (
            <div className={style.creatureToolTipContainer}>
                <div className={style.toolTipStatBlock}>
                    <span className={style.toolTipStatEntry}>AC:
                        <span className={style.toolTipStatEntryValue}>
                            {this.props.creature.armorclass}
                        </span>
                    </span>
                    <span className={style.toolTipStatEntry}>HP:
                        <span className={style.toolTipStatEntryValue}>
                            {this.props.creature.hitpoints}
                        </span>
                    </span>
                </div>
                <img
                    src={this.props.creature.image}
                    className={style.creatureImage}
                />
            </div>
        )
    }
}