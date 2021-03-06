import * as React from 'react';
import {ReactNode} from 'react';
import {ClassAndLevelViewModel} from "@/public/model/ClassAndLevelViewModel";
import {SpeedViewModel} from "@/public/model/SpeedViewModel";
import {SpeedFormSection} from "@/public/view/components/module-battle/dnd5/creatureForm/components/speedFormSection/SpeedFormSection";
import * as style from "@/public/view/components/module-battle/dnd5/creatureForm/components/formSectionGeneralStyles.css";

interface HPSpeedAndACPlayerFormSectionProps {
    hp: string;
    changeHP: Function;
    ac: string;
    changeAC: Function;
    speed: SpeedViewModel;
    changeLandSpeed: Function;
    changeAirSpeed: Function;
    changeWaterSpeed: Function;
    classesAndLevels: ClassAndLevelViewModel[];
}

export class HPSpeedAndACPlayerFormSection extends React.Component<HPSpeedAndACPlayerFormSectionProps, {}> {

    render(): ReactNode {
        return (
            <>
                <div className={style.formInputSection}>
                    <label htmlFor={'dnd5CreatureForm--ac'}>Armorclass</label>
                    <input
                        id={'dnd5CreatureForm--ac'}
                        value={this.props.ac}
                        type={'number'}
                        min={0}
                        onChange={e => this.props.changeAC(e)}
                    />
                </div>
                <div className={style.formInputSection}>
                    <label htmlFor={'dnd5CreatureForm--hp'}>Hitpoints</label>
                    <input
                        onChange={e => this.props.changeHP(e)}
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