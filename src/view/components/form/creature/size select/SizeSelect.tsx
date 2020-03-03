import * as React from "react";
import Select from 'react-select';
import {ReactElement} from "react";
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
                    {value: "fine", label: "fine"},
                    {value: "diminutive", label: "diminutive"},
                    {value: "tiny", label: "tiny"},
                    {value: "small", label: "small"},
                    {value: "medium", label: "medium"},
                    {value: "large", label: "large"},
                    {value: "huge", label: "huge"},
                    {value: "gargantuan", label: "gargantuan"},
                    {value: "colossal", label: "colossal"}
                ]}
                isClearable
                value={this.props.value}
                onChange={this.props.handleSizeChange}
                className={style.creatureFormSelect}
            />
        )
    }
}