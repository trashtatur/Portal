import * as React from "react";
import Select from 'react-select';
import * as style from "../creatureForm.module.css";


export interface IAlignmentSelectProps {
    handleAlignmentChange:Function
}

export interface IAlignmentSelectState {

}

export class AlignmentSelect extends React.Component<IAlignmentSelectProps,IAlignmentSelectState> {


    render():any {
        return (<Select
            options={[
                {
                    value: "chaotic evil",
                    label: <div><img src={"/images/alignments/chaotic-evil.png"}
                                     height={"20 px"} width={"20px"}/>chaotic evil</div>
                },
                {
                    value: "neutral evil",
                    label: <div><img src={"/images/alignments/neutral-evil.png"}
                                     height={"20 px"} width={"20px"}/>neutral evil</div>
                },
                {
                    value: "lawful evil",
                    label: <div><img src={"/images/alignments/lawful-evil.png"} height={"20 px"}
                                     width={"20px"}/>lawful evil</div>
                },
                {
                    value: "chaotic neutral",
                    label: <div><img src={"/images/alignments/chaotic-neutral.png"}
                                     height={"20 px"} width={"20px"}/>chaotic neutral</div>
                },
                {
                    value: "neutral",
                    label: <div><img src={"/images/alignments/neutral-neutral.png"}
                                     height={"20 px"} width={"20px"}/>neutral</div>
                },
                {
                    value: "lawful neutral",
                    label: <div><img src={"/images/alignments/lawful-neutral.png"}
                                     height={"20 px"} width={"20px"}/>lawful neutral</div>
                },
                {
                    value: "chaotic good",
                    label: <div><img src={"/images/alignments/chaotic-good.png"}
                                     height={"20 px"} width={"20px"}/>chaotic good</div>
                },
                {
                    value: "neutral good",
                    label: <div><img src={"/images/alignments/neutral-good.png"}
                                     height={"20 px"} width={"20px"}/>neutral good</div>
                },
                {
                    value: "lawful good",
                    label: <div><img src={"/images/alignments/lawful-good.png"} height={"20 px"}
                                     width={"20px"}/>lawful good</div>
                }
            ]}
            onChange={this.props.handleAlignmentChange}
            className={style.creatureFormSelect}
        />)
    }

}