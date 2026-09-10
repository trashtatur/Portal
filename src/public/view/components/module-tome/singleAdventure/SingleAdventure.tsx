import * as React from 'react';
import {ReactNode} from 'react';
import {SingleSceneForm} from "../singleSceneForm/SingleSceneForm";
import {SceneGraph} from "../sceneGraph/SceneGraph";
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {createAdventureViewModel} from "@/public/model/AdventureViewModel";
import type {AdventureViewModel} from "@/public/model/AdventureViewModel";
import {SingleAdventureTopBar} from "../singleAdventureTopbar/SingleAdventureTopBar";
import {FlyUpContainer} from "../../uiBasic/flyUpContainer/FlyUpContainer";
import {deserializeData} from "@/public/service/serializer.service";
import * as style from './singleAdventure.module.css';

interface MatchParams {
    adventureId: string;
}
interface SingleAdventureProps {
    adventureId: string;
}

interface SingleAdventureState {
    sceneFormOpen: boolean;
    adventure: AdventureViewModel;
}

export class SingleAdventure extends React.Component<SingleAdventureProps, SingleAdventureState> {

    constructor(props) {
        super(props);
        this.state = {
            sceneFormOpen: false,
            adventure: createAdventureViewModel(),
        }
    }

    componentDidMount = async(): Promise<void> => {
        try {
            const adventure = await axios.get(`V1/Adventure/id/${this.props.adventureId}`);
            this.setState({adventure: deserializeData(adventure.data, createAdventureViewModel)});
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

export function SingleAdventureRoute(): ReactNode {
    const {adventureId = ''} = useParams<{adventureId?: string}>();
    return <SingleAdventure adventureId={adventureId}/>;
}
