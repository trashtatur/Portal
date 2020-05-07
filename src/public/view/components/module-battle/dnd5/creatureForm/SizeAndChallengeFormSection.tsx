import * as React from 'react';
import {ReactNode} from 'react';
import {TypeEnum} from "../../../../../model/enumeration/TypesEnum";
import Select from 'react-select';
import {selectable} from "../../../../../types/frontendTypes";
import {DND5CreatureSizesEnum} from "../../../../../model/enumeration/dnd5/DND5CreatureSizesEnum";
import * as style from "./formSectionGeneralStyles.css";

interface SizeAndChallengeFormSectionProps {
    size: DND5CreatureSizesEnum;
    changeSize: Function;
    challenge: string;
    changeChallenge: Function;
    type: TypeEnum;
}

const selectables: selectable[] = [
    {
        label: DND5CreatureSizesEnum.TINY,
        value: DND5CreatureSizesEnum.TINY
    },
    {
        label: DND5CreatureSizesEnum.SMALL,
        value: DND5CreatureSizesEnum.SMALL
    },
    {
        label: DND5CreatureSizesEnum.MEDIUM,
        value: DND5CreatureSizesEnum.MEDIUM
    },
    {
        label: DND5CreatureSizesEnum.LARGE,
        value: DND5CreatureSizesEnum.LARGE
    },
    {
        label: DND5CreatureSizesEnum.HUGE,
        value: DND5CreatureSizesEnum.HUGE
    },
    {
        label: DND5CreatureSizesEnum.GARGANTUAN,
        value: DND5CreatureSizesEnum.GARGANTUAN
    }
]

export class SizeAndChallengeFormSection extends React.Component<SizeAndChallengeFormSectionProps, {}> {

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
                        options={selectables}
                        maxMenuHeight={110}
                        className={style.selectMenu}
                        value={{value: this.props.size, label: this.props.size}}
                        onChange={this.props.changeSize}
                    />
                </div>
            </>
        )
    }
}