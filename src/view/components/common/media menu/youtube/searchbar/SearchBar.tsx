import * as React from 'react'
import {ReactElement} from "react";

export interface SearchBarProps {
    onSearchTermChange: Function;
}

export interface SearchBarState {
    term: string;
}

export class SearchBar extends React.Component<SearchBarProps, SearchBarState> {

    constructor(props) {
        super(props);
        this.state={
            term:''
        };

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(term): void {
        this.setState({ term });
        this.props.onSearchTermChange(term);
    }


    render(): ReactElement {
        return (
            <div className="search-bar" style={{margin: "20px", textAlign: "center"}}>
                <input
                    value={this.state.term}
                    onChange={event => this.onInputChange(event.target.value)}
                    style = {{ width: "75%" }}
                />
            </div>
        )
    }
}