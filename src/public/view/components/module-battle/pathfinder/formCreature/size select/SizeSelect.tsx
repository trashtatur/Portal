import * as React from "react";
import {ReactElement} from "react";
import Select from 'react-select';
import {CreatureSizeEnum} from "../../../../../../model/enumeration/CreatureSizeEnum";
import * as style from "../pathfinderCreatureForm.css";

export interface SizeSelectProps {
    handleSizeChange: Function;
    value;
}

export class SizeSelect extends React.Component<SizeSelectProps> {

    render(): ReactElement {
        return (
            <Select
                options={[
                    {value: CreatureSizeEnum.FINE, label: CreatureSizeEnum.FINE},
                    {value: CreatureSizeEnum.DIMINUTIVE, label: CreatureSizeEnum.DIMINUTIVE},
                    {value: CreatureSizeEnum.TINY, label: CreatureSizeEnum.TINY},
                    {value: CreatureSizeEnum.SMALL, label: CreatureSizeEnum.SMALL},
                    {value: CreatureSizeEnum.MEDIUM, label: CreatureSizeEnum.MEDIUM},
                    {value: CreatureSizeEnum.LARGE, label: CreatureSizeEnum.LARGE},
                    {value: CreatureSizeEnum.HUGE, label: CreatureSizeEnum.HUGE},
                    {value: CreatureSizeEnum.GARGANTUAN, label: CreatureSizeEnum.GARGANTUAN},
                    {value: CreatureSizeEnum.COLOSSAL, label: CreatureSizeEnum.COLOSSAL}
                ]}
                isClearable
                value={this.props.value}
                onChange={this.props.handleSizeChange}
                className={style.creatureFormSelect}
            />
        )
    }
}