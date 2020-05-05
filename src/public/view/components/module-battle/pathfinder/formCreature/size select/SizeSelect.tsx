import * as React from "react";
import {ReactElement} from "react";
import Select from 'react-select';
import {PathfinderCreatureSizeEnum} from "../../../../../../model/enumeration/pathfinder/PathfinderCreatureSizeEnum";
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
                    {value: PathfinderCreatureSizeEnum.FINE, label: PathfinderCreatureSizeEnum.FINE},
                    {value: PathfinderCreatureSizeEnum.DIMINUTIVE, label: PathfinderCreatureSizeEnum.DIMINUTIVE},
                    {value: PathfinderCreatureSizeEnum.TINY, label: PathfinderCreatureSizeEnum.TINY},
                    {value: PathfinderCreatureSizeEnum.SMALL, label: PathfinderCreatureSizeEnum.SMALL},
                    {value: PathfinderCreatureSizeEnum.MEDIUM, label: PathfinderCreatureSizeEnum.MEDIUM},
                    {value: PathfinderCreatureSizeEnum.LARGE, label: PathfinderCreatureSizeEnum.LARGE},
                    {value: PathfinderCreatureSizeEnum.HUGE, label: PathfinderCreatureSizeEnum.HUGE},
                    {value: PathfinderCreatureSizeEnum.GARGANTUAN, label: PathfinderCreatureSizeEnum.GARGANTUAN},
                    {value: PathfinderCreatureSizeEnum.COLOSSAL, label: PathfinderCreatureSizeEnum.COLOSSAL}
                ]}
                isClearable
                value={this.props.value}
                onChange={this.props.handleSizeChange}
                className={style.creatureFormSelect}
            />
        )
    }
}