import * as React from 'react'

export interface ISearchBarProps {
    onSearchTermChange:Function
}

export interface ISearchBarState {
    term:string
}

export class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {

    constructor(props) {
        super(props);
        this.state={
            term:''
        }

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(term) {
        this.setState({ term });
        this.props.onSearchTermChange(term);
    }


    render(): any {
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