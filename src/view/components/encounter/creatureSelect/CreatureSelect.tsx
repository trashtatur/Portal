import * as React from "react";
import Select from 'react-select';
import * as style from './creatureSelect.module.css'

type selectable = {
    value: string,
    label: string
}

interface ICreatureSelectProps {
    selectableOptions: selectable[]
    onSelect;
}

interface ICreatureSelectState {

}

export class CreatureSelect extends React.Component<ICreatureSelectProps,ICreatureSelectState> {



    render(): any {
        return (
            <Select
                options={this.props.selectableOptions}
                isSearchable={true}
                isMulti={true}
                onChange={this.props.onSelect}
                closeMenuOnSelect={false}
                className={style.creatureSelectContainer}
            />
        )
    }

}