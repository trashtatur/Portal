import * as React from 'react'
import Select from 'react-select';
import {selectable, selectableAlignment, selectableCreatures} from "../../componentTypes";
import {ReactElement} from "react";

export interface DamageTypeSelectProps {
    handleSelectChange: Function;
    selectables: Array<selectable> | Array<selectableCreatures> | Array<selectableAlignment>;
    value?: Array<selectable> | Array<selectableCreatures> | Array<selectableAlignment>;
    className: string;
}

export class MultiSelectNoCreate extends React.Component<DamageTypeSelectProps> {

    render(): ReactElement {
        return (
            <Select
                options={this.props.selectables}
                isMulti
                isClearable
                className={this.props.className}
                maxMenuHeight={150}
                onChange={this.props.handleSelectChange}
                value={this.props.value}
            />
        )
    }
}