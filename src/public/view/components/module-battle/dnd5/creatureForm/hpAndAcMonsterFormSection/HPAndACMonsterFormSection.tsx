import * as React from 'react';
import {ReactNode} from 'react';
import {DiceRollSpecification} from "@/public/model/dataModel/DiceRollSpecification";
import {DND5CreatureSizeEnum} from "@/public/model/enumeration/dnd5/DND5CreatureSizeEnum";

interface HPAndACMonsterFormSectionProps {
    hp: string;
    changeHP: Function;
    ac: string;
    changeAC: Function;
    size: DND5CreatureSizeEnum;
    hitDice: DiceRollSpecification;
    changeHitDice: Function;
    averageAC: number;
    averageHP: [number, number];
}

export class HPAndACMonsterFormSection extends React.Component<HPAndACMonsterFormSectionProps, {}> {

    render(): ReactNode {
        return (
            <>
            </>
        )
    }
}