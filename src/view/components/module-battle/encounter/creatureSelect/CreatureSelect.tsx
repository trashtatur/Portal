import * as React from "react";
import Select from 'react-select';
import {ReactElement} from "react";
import {selectableCreatures} from "../../../componentTypes";
import * as style from './creatureSelect.css'

interface CreatureSelectProps {
    selectableOptions: selectableCreatures[];
    onSelect;
}

export class CreatureSelect extends React.Component<CreatureSelectProps> {

    render(): ReactElement {
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