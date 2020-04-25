import * as React from 'react';
import {ReactNode} from 'react';
import {SingleSceneForm} from "../singleSceneForm/SingleSceneForm";
import {SceneGraph} from "../sceneGraph/SceneGraph";
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
import {AdventureDataToViewModelMapper} from "../../../../mapping/AdventureDataToViewModelMapper";
import {AdventureViewModel} from "../../../../model/AdventureViewModel";
import {SingleAdventureTopBar} from "../singleAdventureTopbar/SingleAdventureTopBar";
import {FlyUpContainer} from "../../uiBasic/flyUpContainer/FlyUpContainer";
import * as style from './singleAdventure.css';

interface MatchParams {
    adventureId: string;
}
interface SingleAdventureProps extends RouteComponentProps<MatchParams> {}

interface SingleAdventureState {
    sceneFormOpen: boolean;
    adventure: AdventureViewModel;
}

export class SingleAdventure extends React.Component<SingleAdventureProps, SingleAdventureState> {

    constructor(props) {
        super(props);
        this.state = {
            sceneFormOpen: false,
            adventure: new AdventureViewModel(),
        }
    }

    componentDidMount = async(): Promise<void> => {
        try {
            const adventure = await axios.get(`V1/Adventure/id/${this.props.match.params.adventureId}`);
            const mapper = new AdventureDataToViewModelMapper();
            this.setState({adventure: mapper.mapSingle(adventure.data)});
        } catch (e) {
            console.log(e)
        }
    };

    openSceneOverview = (): void => {
    };

    openPersonsOverview = (): void => {
    };

    addScene = (): void => {
        this.setState({sceneFormOpen: true});
    };

    render(): ReactNode {
        return (
            <div className={style.singleAdventureContainer}>
                <div className={style.adventureName}>
                    {this.state.adventure.name}
                </div>
                <SingleAdventureTopBar openScenes={this.openSceneOverview} openPersons={this.openPersonsOverview} />
                <div className={style.adventureCore}>
                    {this.state.adventure.core}
                </div>
                <button
                    className={style.addSceneButton}
                    onClick={this.addScene}
                >Add Scene
                </button>
                <SceneGraph scenes={this.state.adventure.scenes}/>
                <FlyUpContainer
                    open={this.state.sceneFormOpen}
                    closeHandler={()=>{this.setState({sceneFormOpen: false})}}
                >
                    <SingleSceneForm
                        adventureId={this.state.adventure.id}
                        scenesToChoseFrom={this.state.adventure.scenes}/>
                </FlyUpContainer>
            </div>
        )
    }
}