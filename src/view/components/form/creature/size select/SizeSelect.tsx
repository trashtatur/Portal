import * as React from "react";
import Select from 'react-select';
import * as style from "../creatureForm.module.css";




export interface ISizeSelectProps {
    handleSizeChange: Function
    value
}

export interface ISizeSelectState {

}

export class SizeSelect extends React.Component<ISizeSelectProps,ISizeSelectState>{


    render(): any {
        return(
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