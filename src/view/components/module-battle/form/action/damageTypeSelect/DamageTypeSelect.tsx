import * as React from 'react'
import Select from 'react-select';
import {DamageTypesEnum} from "../../../../../model/dataModel/DamageTypesEnum";
import {selectableFormElement} from "../../../../componentTypes";
import {ReactElement} from "react";
import {DamageType} from "../../../../../model/dataModel/DamageType";

export interface DamageTypeSelectProps {
    damageTypeValue: DamageType;
    handleSelectChange: Function;
    className: string;
}

export class DamageTypeSelect extends React.Component<DamageTypeSelectProps> {

    constructor(props) {
        super(props);
        this.composeSelectables = this.composeSelectables.bind(this);
    }

    composeSelectables(): selectableFormElement[] {
        const selectables = [];
        Object.values(DamageTypesEnum).forEach(elem => {
            selectables.push({label: elem, value: elem});
        });
        return selectables;
    }

    render(): ReactElement {
        return (
            <Select
                options={this.composeSelectables()}
                isMulti
                isClearable
                className={this.props.className}
                maxMenuHeight={150}
                onChange={this.props.handleSelectChange}
                value={this.props.damageTypeValue.damageType.map(elem=> {
                    return {label: elem, value: elem}
                })}
            />
        )
    }
}