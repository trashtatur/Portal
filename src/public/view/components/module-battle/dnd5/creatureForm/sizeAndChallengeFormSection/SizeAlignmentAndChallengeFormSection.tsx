import * as React from 'react';
import {ReactNode} from 'react';
import {TypeEnum} from "@/public/model/enumeration/TypesEnum";
import Select from 'react-select';
import {selectable} from "@/public/types/frontendTypes";
import {DND5CreatureSizeEnum} from "@/public/model/enumeration/dnd5/DND5CreatureSizeEnum";
import {AlignmentEnum} from "@/public/model/enumeration/AlignmentEnum";
import {AlignmentSelect} from "@/public/view/components/module-battle/common/alignment select/AlignmentSelect";
import * as style from "../formSectionGeneralStyles.css";

interface SizeAndChallengeFormSectionProps {
    size: DND5CreatureSizeEnum;
    changeSize: Function;
    challenge: string;
    changeChallenge: Function;
    alignment: AlignmentEnum;
    changeAlignment: Function;
    type: TypeEnum;
}

const selectableSizes: selectable[] = [
    {
        label: DND5CreatureSizeEnum.TINY,
        value: DND5CreatureSizeEnum.TINY
    },
    {
        label: DND5CreatureSizeEnum.SMALL,
        value: DND5CreatureSizeEnum.SMALL
    },
    {
        label: DND5CreatureSizeEnum.MEDIUM,
        value: DND5CreatureSizeEnum.MEDIUM
    },
    {
        label: DND5CreatureSizeEnum.LARGE,
        value: DND5CreatureSizeEnum.LARGE
    },
    {
        label: DND5CreatureSizeEnum.HUGE,
        value: DND5CreatureSizeEnum.HUGE
    },
    {
        label: DND5CreatureSizeEnum.GARGANTUAN,
        value: DND5CreatureSizeEnum.GARGANTUAN
    }
]

export class SizeAlignmentAndChallengeFormSection extends React.Component<SizeAndChallengeFormSectionProps, {}> {

    render(): ReactNode {
        return (
            <>
                {
                    this.props.type !== TypeEnum.PLAYER
                    && this.props.type !== TypeEnum.ALLY
                    &&
                    <div className={style.formInputSection}>
                        <label htmlFor={'creatureFormNameInput'}>Challenge</label>
                        <input
                            id={'creatureFormNameInput'}
                            type={'text'}
                            value={this.props.challenge}
                            onChange={e => this.props.changeChallenge(e)}
                        />
                    </div>
                }
                <div className={style.formInputSection}>
                    <label htmlFor={'creatureFormNameInput'}>Size</label>
                    <Select
                        options={selectableSizes}
                        maxMenuHeight={110}
                        className={style.selectMenu}
                        value={{value: this.props.size, label: this.props.size}}
                        onChange={this.props.changeSize}
                    />
                </div>
                <div className={style.formInputSection}>
                    <label htmlFor={'dnd5--creatureFormAlignmentInput'} >Alignment</label>
                    <AlignmentSelect
                        handleAlignmentChange={this.props.changeAlignment}
                        className={style.selectMenu}
                        value={this.props.alignment}
                        id={'dnd5--creatureFormAlignmentInput'}
                    />
                </div>
            </>
        )
    }
}