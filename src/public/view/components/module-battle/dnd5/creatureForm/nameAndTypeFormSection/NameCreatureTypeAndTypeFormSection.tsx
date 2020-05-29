import * as React from 'react';
import {ReactNode} from 'react';
import Select from 'react-select';
import {selectable} from "@/public/types/frontendTypes";
import {TypeEnum} from "@/public/model/enumeration/TypesEnum";
import {DND5CreatureTypeEnum} from "@/public/model/enumeration/dnd5/DND5CreatureTypeEnum";
import * as style from '../formSectionGeneralStyles.css'

interface InitialDND5CreatureFormFormSectionProps {
    name: string;
    type: string;
    creatureType: DND5CreatureTypeEnum;
    changeCreatureType: Function;
    changeName: Function;
    changeType: Function;
}

const selectableCreatureTypes: selectable[] = [
    {
        label: DND5CreatureTypeEnum.ABBERATION,
        value: DND5CreatureTypeEnum.ABBERATION
    },
    {
        label: DND5CreatureTypeEnum.BEAST,
        value: DND5CreatureTypeEnum.BEAST
    },
    {
        label: DND5CreatureTypeEnum.CELESTIAL,
        value: DND5CreatureTypeEnum.CELESTIAL
    },
    {
        label: DND5CreatureTypeEnum.CONSTRUCT,
        value: DND5CreatureTypeEnum.CONSTRUCT
    },
    {
        label: DND5CreatureTypeEnum.DRAGON,
        value: DND5CreatureTypeEnum.DRAGON
    },
    {
        label: DND5CreatureTypeEnum.ELEMENTAL,
        value: DND5CreatureTypeEnum.ELEMENTAL
    },
    {
        label: DND5CreatureTypeEnum.FEY,
        value: DND5CreatureTypeEnum.FEY
    },
    {
        label: DND5CreatureTypeEnum.FIEND,
        value: DND5CreatureTypeEnum.FIEND
    },
    {
        label: DND5CreatureTypeEnum.GIANT,
        value: DND5CreatureTypeEnum.GIANT
    },
    {
        label: DND5CreatureTypeEnum.HUMANOID,
        value: DND5CreatureTypeEnum.HUMANOID
    },
    {
        label: DND5CreatureTypeEnum.MONSTROSITY,
        value: DND5CreatureTypeEnum.MONSTROSITY
    },
    {
        label: DND5CreatureTypeEnum.OOZE,
        value: DND5CreatureTypeEnum.OOZE
    },
    {
        label: DND5CreatureTypeEnum.PLANT,
        value: DND5CreatureTypeEnum.PLANT
    },
    {
        label: DND5CreatureTypeEnum.UNDEAD,
        value: DND5CreatureTypeEnum.UNDEAD
    }
]

const selectableTypes: selectable[] = [
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
export class NameCreatureTypeAndTypeFormSection extends React.Component<InitialDND5CreatureFormFormSectionProps, {}> {


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
                       options={selectableTypes}
                       id={'dnd5CreatureForm--type'}
                       className={style.selectMenu}
                       maxMenuHeight={110}
                       value={{value: this.props.type, label: this.props.type}}
                       onChange={this.props.changeType}
                    />
                </div>
                {
                    (this.props.type === TypeEnum.MONSTER || this.props.type === TypeEnum.SUMMON)
                    &&
                    <div className={style.formInputSection}>
                        <label htmlFor={'dnd5CreatureForm--creatureType'}>Creature Type</label>
                        <Select
                            options={selectableCreatureTypes}
                            id={'dnd5CreatureForm--creatureType'}
                            className={style.selectMenu}
                            maxMenuHeight={110}
                            value={{value: this.props.creatureType, label: this.props.creatureType}}
                            onChange={this.props.changeCreatureType}
                        />
                    </div>
                }
            </>
        )
    }
}