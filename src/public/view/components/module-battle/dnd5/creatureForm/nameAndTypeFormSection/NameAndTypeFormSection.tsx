import * as React from 'react';
import {ReactNode} from 'react';
import Select from 'react-select';
import {selectable} from "../../../../../../types/frontendTypes";
import {TypeEnum} from "../../../../../../model/enumeration/TypesEnum";
import * as style from '../formSectionGeneralStyles.css'

interface InitialDND5CreatureFormFormSectionProps {
    name: string;
    type: string;
    changeName: Function;
    changeType: Function;
}


const selectables: selectable[] = [
    {
        label: TypeEnum.ALLY,
        value: TypeEnum.ALLY
    },
    {
        label: TypeEnum.MONSTER,
        value: TypeEnum.MONSTER
    },
    {
        label: TypeEnum.PLAYER,
        value: TypeEnum.PLAYER
    },
    {
        label: TypeEnum.SUMMON,
        value: TypeEnum.SUMMON
    }
]
export class NameAndTypeFormSection extends React.Component<InitialDND5CreatureFormFormSectionProps, {}> {


    render(): ReactNode {
        return (
            <>
                <div className={style.formInputSection}>
                    <label htmlFor={'creatureFormNameInput'}>Name</label>
                    <input
                        id={'creatureFormNameInput'}
                        type={'text'}
                        value={this.props.name}
                        onChange={e => this.props.changeName(e)}
                    />
                </div>
                <div className={style.formInputSection}>
                    <label htmlFor={'creatureFormNameInput'}>Type</label>
                    <Select
                       options={selectables}
                       className={style.selectMenu}
                       maxMenuHeight={110}
                       value={{value: this.props.type, label: this.props.type}}
                       onChange={this.props.changeType}
                    />
                </div>
            </>
        )
    }
}