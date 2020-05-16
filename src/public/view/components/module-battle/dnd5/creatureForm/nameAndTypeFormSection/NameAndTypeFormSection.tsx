import * as React from 'react';
import {ReactNode} from 'react';
import Select from 'react-select';
import {selectable} from "@/public/types/frontendTypes";
import {TypeEnum} from "@/public/model/enumeration/TypesEnum";
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
                    <label htmlFor={'dnd5CreatureForm--name'}>Name</label>
                    <input
                        id={'dnd5CreatureForm--name'}
                        type={'text'}
                        value={this.props.name}
                        onChange={e => this.props.changeName(e)}
                    />
                </div>
                <div className={style.formInputSection}>
                    <label htmlFor={'dnd5CreatureForm--type'}>Type</label>
                    <Select
                       options={selectables}
                       id={'dnd5CreatureForm--type'}
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