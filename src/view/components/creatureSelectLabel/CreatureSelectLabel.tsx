import * as React from 'react';
import {ReactElement} from 'react';
import {ToolTip} from "../tooltip/ToolTip";
import {CreatureToolTip} from "../tooltip/creatureToolTip/CreatureToolTip";
import axios from "axios";

export interface CreatureSelectLabelProps {
    image: string;
    id: string;
    labelText: string;
}

export interface CreatureSelectLabelState {
    creatureData;
    hasData: boolean;
}

export class CreatureSelectLabel extends React.Component<CreatureSelectLabelProps, CreatureSelectLabelState> {

    constructor(props) {
        super(props);
        this.state = {
            creatureData: null,
            hasData: false,
        }
    }

    retrieveData = async (): Promise<any> => {
        const creatureData = await axios.get(`/V1/creature/id/${this.props.id}`);
        this.setState({creatureData: creatureData.data},
            () => this.setState({hasData: true}, () => console.log(this.state.creatureData)));
    };

    render(): ReactElement {
        return (
            <div>
                <img src={`images/selectableLabelIcons/${this.props.image}`}
                     height="20px"
                     width="20px"
                     alt={"Selectable creature entry type"}
                />
                {this.props.labelText}
                <ToolTip retrieveData={this.retrieveData} parentHasData={this.state.hasData}>
                    <CreatureToolTip creatureData={this.state.creatureData}/>
                </ToolTip>
            </div>
        )
    }
}