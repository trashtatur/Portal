import * as React from 'react';
import {ReactNode} from 'react';
import {DiceRollSpecification} from "@/public/model/dataModel/DiceRollSpecification";
import * as style from "@/public/view/components/module-battle/dnd5/creatureForm/dnd5CreatureForm.css";

interface HPAndACMonsterFormSectionHeaderProps {
    hp: number;
    ac: number;
    hitDice: DiceRollSpecification;
}

export class HPAndACFormSectionHeader extends React.Component<HPAndACMonsterFormSectionHeaderProps, {}> {

    render(): ReactNode {
        return (
            <>
                {
                    (this.props.hp === null
                    || this.props.ac === null
                    || this.props.hitDice === null)
                    &&
                    <span className={style.formSectionCompletion}>
                        ☐<span className={style.formSectionHeader}>Hitpoints & Armorclass</span>
                    </span>

                }
                {
                    this.props.hp !== null
                    && this.props.ac !== null
                    && this.props.hitDice !== null
                    &&
                    <span className={style.formSectionCompletion}>
                        ☑<span className={style.formSectionHeader}>Hitpoints & Armorclass</span>
                    </span>
                }
            </>
        )
    }
}