import * as React from 'react';
import {CSSProperties, ReactNode} from 'react';
import {SceneViewModel} from "../../../model/scene/SceneViewModel";
import {SingleSceneForm} from "../singleSceneForm/SingleSceneForm";
import {SceneGraph} from "../sceneGraph/SceneGraph";
import * as style from './singleAdventure.css';

interface SingleAdventureProps {
    adventureId: string;
    name: string;
    core: string;
    scenes: Array<SceneViewModel>;
}

interface SingleAdventureState {
    sceneFormOpen: boolean;
}

export class SingleAdventure extends React.Component<SingleAdventureProps, SingleAdventureState> {

    constructor(props) {
        super(props);
        this.state = {
            sceneFormOpen: false,
        }
    }

    openSceneFormStyleChange = (): CSSProperties => {
        if (this.state.sceneFormOpen) {
            return {
                top: '30%',
                height: '70%',
                boxShadow: '0px -5px 33px -4px rgba(0,0,0,0.75)',
            }
        }
    };

    addScene = (): void => {
        this.setState({sceneFormOpen: true});
    };

    render(): ReactNode {
        return (
            <>
                <div className={style.adventureName}>
                    {this.props.name}
                </div>
                <div className={style.adventureCore}>
                    {this.props.core}
                </div>
                <button
                    className={style.addSceneButton}
                    onClick={this.addScene}
                >Add Scene
                </button>
                <div className={style.singleSceneFormContainer} style={this.openSceneFormStyleChange()}>
                    {this.state.sceneFormOpen &&
                    <SingleSceneForm
                        adventureId={this.props.adventureId}
                        scenesToChoseFrom={this.props.scenes}/>
                    }
                </div>
                <SceneGraph scenes={this.props.scenes}/>
            </>
        )
    }
}