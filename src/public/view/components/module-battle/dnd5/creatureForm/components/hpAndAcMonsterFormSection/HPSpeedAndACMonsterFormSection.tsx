import * as React from 'react';
import {ReactNode} from 'react';
import {DiceRollSpecification} from "@/public/model/DiceRollSpecification";
import {DND5CreatureSizeEnum} from "@/public/model/enumeration/dnd5/DND5CreatureSizeEnum";
import {SpeedViewModel} from "@/public/model/SpeedViewModel";
import {calculateAverageHP, calculateMatchingHitDice} from "@/public/service/dnd5/averageHP.service";
import {SpeedFormSection} from "@/public/view/components/module-battle/dnd5/creatureForm/components/speedFormSection/SpeedFormSection";
import * as style from "../formSectionGeneralStyles.css";

interface HPAndACMonsterFormSectionProps {
    hp: string;
    changeHP: Function;
    ac: string;
    changeAC: Function;
    constitutionMod: number;
    speed: SpeedViewModel;
    changeLandSpeed: Function;
    changeAirSpeed: Function;
    changeWaterSpeed: Function;
    size: DND5CreatureSizeEnum;
    hitDice: DiceRollSpecification;
    changeHitDiceCount: Function;
    changeHitDiceBonus: Function;
    averageAC: number;
    averageHP: [number, number];
}

export class HPSpeedAndACMonsterFormSection extends React.Component<HPAndACMonsterFormSectionProps, {}> {

    constructor(props) {
        super(props);
    }

    setToAverageAC = (): void => {
        this.props.changeAC({target: {value: this.props.averageAC}})
    }

    setToAverageHP = (): void => {
        const pickedAverageHPValue =
            Math.floor(Math.random() * (this.props.averageHP[1] - this.props.averageHP[0]) + this.props.averageHP[0]);
        this.props.changeHP({target: {value: pickedAverageHPValue}});
        const calculatedHitDice = calculateMatchingHitDice(
            pickedAverageHPValue,
            this.props.hitDice.diceType,
            this.props.constitutionMod
        );
        this.props.changeHitDiceCount({target: {value: calculatedHitDice.diceCount}});
        this.props.changeHitDiceBonus({target: {value: calculatedHitDice.bonus}});
    }

    setHitDiceCountAndHitPoints = (event): void => {
        const diceCount = isNaN(event.target.value) ? null : parseInt(event.target.value);
        if (!diceCount) {
            return;
        }
        const bonus = diceCount * this.props.constitutionMod;
        const hitDice = new DiceRollSpecification(
            diceCount,
            this.props.hitDice.diceType,
            bonus
        );
        const hp = calculateAverageHP(hitDice);
        this.props.changeHP({target: {value: hp}});
        this.props.changeHitDiceCount({target: {value: diceCount}});
        this.props.changeHitDiceBonus({target: {value: bonus}});
    }

    render(): ReactNode {
        return (
            <>
                <div className={style.formInputSection}>
                    <label htmlFor={'dnd5CreatureForm--ac'}>Armorclass</label>
                    <span
                        className={style.averageIndicator}
                        onClick={() => this.setToAverageAC()}
                    >
                        Average: {this.props.averageAC}
                    </span>
                    <input
                        id={'dnd5CreatureForm--ac'}
                        value={this.props.ac}
                        type={'number'}
                        min={0}
                        onChange={e => this.props.changeAC(e)}
                    />
                </div>
                <div className={style.formInputSection}>
                    <label htmlFor={'dnd5CreatureForm--hitDice'}>Hit Dice</label>
                    <div id={'dnd5CreatureForm--hitDice'} className={style.hitDiceFieldContainer}>
                        <input
                            type={'number'}
                            max={999}
                            min={1}
                            value={this.props.hitDice.getFormattedDiceCount()}
                            onChange={e => this.setHitDiceCountAndHitPoints(e)}
                        />
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                        <span style={{fontSize: '7pt', width: '20px'}}>
                        d{this.props.hitDice.getFormattedDiceType()}
                        </span>
                            {
                                this.props.hitDice.bonus !== null
                                && this.props.hitDice.bonus > 0
                                &&
                                <span style={{fontSize: '7pt', width: '20px'}}>
                                +
                                </span>
                            }
                        </div>
                        <input
                            type={'number'}
                            max={999}
                            min={0}
                            value={this.props.hitDice.getFormattedDiceBonus()}
                            disabled
                        />
                    </div>
                </div>
                <div className={style.formInputSection}>
                    <label htmlFor={'dnd5CreatureForm--hp'}>Hitpoints</label>
                    <span
                        className={style.averageIndicator}
                        onClick={() => this.setToAverageHP()}
                    >
                        Average: {this.props.averageHP[0]} - {this.props.averageHP[1]}
                    </span>
                    <input
                        disabled
                        value={this.props.hp}
                        type={'number'}
                        id={'dnd5CreatureForm--hp'}
                    />
                </div>
                <div className={style.formInputSection}>
                    <SpeedFormSection
                        speed={this.props.speed}
                        changeLandSpeed={this.props.changeLandSpeed}
                        changeAirSpeed={this.props.changeAirSpeed}
                        changeWaterSpeed={this.props.changeWaterSpeed}
                    />
                </div>
            </>
        )
    }
}