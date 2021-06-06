import * as React from 'react';
import {ReactNode} from 'react';
import * as style from './singleAdventureTopBar.css'

interface SingleAdventureTopbarProps {
    openScenes: Function;
    openPersons: Function;
}

export class SingleAdventureTopBar extends React.Component<SingleAdventureTopbarProps> {

    render(): ReactNode {
        return (
            <div className={style.singleAdventureTopBarContainer}>
                <button
                    className={style.topBarButton}
                    onClick={() => this.props.openScenes()}
                >
                    Scenes
                </button>
                <button
                    className={style.topBarButton}
                    onClick={() => this.props.openPersons()}
                >
                    Persons
                </button>
            </div>
        )
    }
}