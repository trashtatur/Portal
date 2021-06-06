import * as React from 'react';
import {ReactNode} from 'react';
import CreatableSelect from 'react-select/creatable';
import {selectable, selectableAlignment, selectableCreatures} from "../../../../types/frontendTypes";

interface MultiSelectWithCreateProps {
    handleSelectChange: Function;
    selectables: Array<selectable> | Array<selectableCreatures> | Array<selectableAlignment>;
    value?: Array<selectable> | Array<selectableCreatures> | Array<selectableAlignment>;
    className: string;
    id?: string;
}

export class MultiSelectWithCreate extends React.Component<MultiSelectWithCreateProps> {

    render(): ReactNode {
        return (
            <CreatableSelect
                id={this.props.id}
                onChange={this.props.handleSelectChange}
                options={this.props.selectables}
                isMulti
                isClearable
                maxMenuHeight={150}
                value={this.props.value}
                className={this.props.className}
            />
        )
    }
}