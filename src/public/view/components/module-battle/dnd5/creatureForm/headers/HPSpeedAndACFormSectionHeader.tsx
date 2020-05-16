import * as React from 'react';
import {ReactNode} from 'react';
import {DiceRollSpecification} from "@/public/model/dataModel/DiceRollSpecification";
import * as style from "@/public/view/components/module-battle/dnd5/creatureForm/dnd5CreatureForm.css";
import {SpeedModel} from "@/public/model/dataModel/SpeedModel";

interface HPAndACMonsterFormSectionHeaderProps {
    hp: number;
    ac: number;
    speed: SpeedModel;
    hitDice: DiceRollSpecification;
}

export class HPSpeedAndACFormSectionHeader extends React.Component<HPAndACMonsterFormSectionHeaderProps, {}> {

    render(): ReactNode {
        return (
            <>
                {
                    (this.props.hp === null
                    || this.props.ac === null
                    || this.props.hitDice === null)
                    &&
                    <span className={style.formSectionCompletion}>
                        ☐<span className={style.formSectionHeader}>Hitpoints, Speed & Armorclass</span>
                    </span>

                }
                {
                    this.props.hp !== null
                    && this.props.ac !== null
                    && this.props.hitDice !== null
                    &&
                    <span className={style.formSectionCompletion}>
                        ☑<span className={style.formSectionHeader}>Hitpoints, Speed & Armorclass</span>
                    </span>
                }
            </>
        )
    }
}