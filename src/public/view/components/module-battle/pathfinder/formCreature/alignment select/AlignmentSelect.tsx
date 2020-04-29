import * as React from "react";
import Select from 'react-select';
import {ReactElement} from "react";
import {selectableAlignment} from "../../../../../../types/frontendTypes";
import * as style from "../creatureForm.css";

export interface AlignmentSelectProps {
    handleAlignmentChange: Function;
    value;
}

export class AlignmentSelect extends React.Component<AlignmentSelectProps> {

    constructor(props) {
        super(props);
        this.determineCurrentValue = this.determineCurrentValue.bind(this);
    }


    options: selectableAlignment[] = [
        {
            value: "chaotic evil",
            label: <div><img src={"/images/alignments/chaotic-evil.png"}
                             alt={"chaotic evil"}
                             height={"20 px"} width={"20px"}/>chaotic evil</div>
        },
        {
            value: "neutral evil",
            label: <div><img src={"/images/alignments/neutral-evil.png"}
                             alt={"neutral evil"}
                             height={"20 px"} width={"20px"}/>neutral evil</div>
        },
        {
            value: "lawful evil",
            label: <div><img src={"/images/alignments/lawful-evil.png"} height={"20 px"}
                             alt={"lawful evil"}
                             width={"20px"}/>lawful evil</div>
        },
        {
            value: "chaotic neutral",
            label: <div><img src={"/images/alignments/chaotic-neutral.png"}
                             alt={"chaotic neutral"}
                             height={"20 px"} width={"20px"}/>chaotic neutral</div>
        },
        {
            value: "neutral",
            label: <div><img src={"/images/alignments/neutral-neutral.png"}
                             alt={"neutral"}
                             height={"20 px"} width={"20px"}/>neutral</div>
        },
        {
            value: "lawful neutral",
            label: <div><img src={"/images/alignments/lawful-neutral.png"}
                             alt={"lawful neutral"}
                             height={"20 px"} width={"20px"}/>lawful neutral</div>
        },
        {
            value: "chaotic good",
            label: <div><img src={"/images/alignments/chaotic-good.png"}
                             alt={"chaotic good"}
                             height={"20 px"} width={"20px"}/>chaotic good</div>
        },
        {
            value: "neutral good",
            label: <div><img src={"/images/alignments/neutral-good.png"}
                             alt={"neutral good"}
                             height={"20 px"} width={"20px"}/>neutral good</div>
        },
        {
            value: "lawful good",
            label: <div><img src={"/images/alignments/lawful-good.png"} height={"20 px"}
                             alt={"lawful good"}
                             width={"20px"}/>lawful good</div>
        }
    ];

    determineCurrentValue(): selectableAlignment {
        const value = this.options.find(elem=> {
            return elem.value == this.props.value
        });
        if (value==undefined) return null;
        return value;
    }

    render(): ReactElement {
        return (<Select
            options={this.options}
            isClearable
            value={this.determineCurrentValue()}
            onChange={this.props.handleAlignmentChange}
            className={style.creatureFormSelect}
        />)
    }

}