import * as React from "react";
import {ReactElement} from "react";
import Select from 'react-select';
import {CreatureSizesEnum} from "../../../../../model/dataModel/CreatureSizesEnum";
import * as style from "../creatureForm.css";

export interface SizeSelectProps {
    handleSizeChange: Function;
    value;
}

export class SizeSelect extends React.Component<SizeSelectProps> {

    render(): ReactElement {
        return (
            <Select
                options={[
                    {value: CreatureSizesEnum.FINE, label: CreatureSizesEnum.FINE},
                    {value: CreatureSizesEnum.DIMINUTIVE, label: CreatureSizesEnum.DIMINUTIVE},
                    {value: CreatureSizesEnum.TINY, label: CreatureSizesEnum.TINY},
                    {value: CreatureSizesEnum.SMALL, label: CreatureSizesEnum.SMALL},
                    {value: CreatureSizesEnum.MEDIUM, label: CreatureSizesEnum.MEDIUM},
                    {value: CreatureSizesEnum.LARGE, label: CreatureSizesEnum.LARGE},
                    {value: CreatureSizesEnum.HUGE, label: CreatureSizesEnum.HUGE},
                    {value: CreatureSizesEnum.GARGANTUAN, label: CreatureSizesEnum.GARGANTUAN},
                    {value: CreatureSizesEnum.COLOSSAL, label: CreatureSizesEnum.COLOSSAL}
                ]}
                isClearable
                value={this.props.value}
                onChange={this.props.handleSizeChange}
                className={style.creatureFormSelect}
            />
        )
    }
}