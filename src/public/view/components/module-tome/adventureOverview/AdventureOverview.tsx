import * as React from 'react';
import {CSSProperties, ReactNode} from 'react';
import axios from "axios";
import {AdventureViewModel} from "@/public/model/AdventureViewModel";
import {AdventureForm} from "../adventureForm/AdventureForm";
import {AdventureCard} from "../adventureCard/AdventureCard";
import {deserializeMultiple} from "@/public/service/SerializerService";
import * as style from './adventureOverview.css'

interface AdventureOverviewState {
    adventureFormIsOpen: boolean;
    adventures: Array<AdventureViewModel>;
    openedAdventure: AdventureViewModel;
}

export class AdventureOverview extends React.Component<{}, AdventureOverviewState> {

    constructor(props) {
        super(props);
        this.state = {
            adventureFormIsOpen: false,
            adventures: [],
            openedAdventure: null
        }
    }

    fetchAllAdventures = async(): Promise<AdventureViewModel[]> => {
        try {
            const adventureData = await axios.get('/V1/Adventure');
            return deserializeMultiple(adventureData.data, AdventureViewModel);
        } catch (e) {
            console.log(e)
        }
        return [];
    };

    componentDidMount = async(): Promise<void> => {
        this.setState({adventures:await this.fetchAllAdventures()})
    };

    openCloseFormStyle = (): CSSProperties => {
      if (this.state.adventureFormIsOpen) {
          return {
              opacity: 1,
              minHeight: "150px",
          }
      }
        return {
            opacity: 0,
            height: "0px",
            minHeight: "0px"
        }
    };

    toggleAdventureFormOpen = (): void => {
        this.setState({adventureFormIsOpen: !this.state.adventureFormIsOpen})
    };

    render(): ReactNode {
        return (
            <div className={style.adventureOverviewContainer}>
                <h1>Your adventures</h1>
                <button
                    className={style.addNewAdventureButton}
                    onClick={this.toggleAdventureFormOpen}
                >+</button>
                <div className={style.adventureFormContainer} style={this.openCloseFormStyle()}>
                    {this.state.adventureFormIsOpen &&
                        <AdventureForm />
                    }
                </div>
                <div className={style.adventureCardsContainer}>
                    {
                        this.state.adventures.map(adventure => {
                            return (
                                <AdventureCard
                                    key={adventure.id}
                                    adventureId={adventure.id}
                                    name={adventure.name}
                                    core={adventure.core}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}