import * as React from 'react';
import {CSSProperties, ReactNode} from 'react';
import axios from "axios";
import {AdventureViewModel} from "../../../model/adventure/AdventureViewModel";
import {AdventureDataToViewModelMapper} from "../../../mapping/AdventureDataToViewModelMapper";
import {AdventureForm} from "../adventureForm/AdventureForm";
import {AdventureCard} from "../adventureCard/AdventureCard";
import {SingleAdventure} from "../singleAdventure/SingleAdventure";
import * as style from './adventureOverview.css'

interface AdventureOverviewProps {

}

interface AdventureOverviewState {
    adventureFormIsOpen: boolean;
    adventures: Array<AdventureViewModel>;
    openedAdventure: AdventureViewModel;
}

export class AdventureOverview extends React.Component<AdventureOverviewProps, AdventureOverviewState> {

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
            const adventureDataMapper = new AdventureDataToViewModelMapper();
            return adventureDataMapper.mapMultiple(adventureData.data);
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

    collapseAdventureOverview = (): CSSProperties => {
        const overflowX = this.state.adventures.length > 5 ? 'auto' : 'hidden';
        if (this.state.openedAdventure) {
            return {
                height: "250px",
                overflowX: overflowX,
                flexWrap: "nowrap",
                width: "100%",
                alignItems: 'center',
            }
        }
    };

    openSingleAdventureEntry = (): CSSProperties => {
        if (this.state.openedAdventure) {
            return {
                opacity: 1
            }
        }
        return {
            opacity: 0
        }
    };

    toggleAdventureFormOpen = (): void => {
        this.setState({adventureFormIsOpen: !this.state.adventureFormIsOpen})
    };


    openAdventure = (adventureId: string): void => {
        const openedAdventure = this.state.adventures.find(adventure => {
            if (adventure.id === adventureId) {
                return adventure
            }
        });
        this.setState({openedAdventure: openedAdventure});
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
                <div className={style.adventureCardsContainer} style={this.collapseAdventureOverview()}>
                    {
                        this.state.adventures.map(adventure => {
                            return (
                                <AdventureCard
                                    key={adventure.id}
                                    adventureId={adventure.id}
                                    name={adventure.name}
                                    core={adventure.core}
                                    openAdventure={this.openAdventure}
                                />
                            )
                        })
                    }
                </div>
                <div style={this.openSingleAdventureEntry()} className={style.singleAdventureContainer}>
                {
                    this.state.openedAdventure &&
                        <SingleAdventure
                            adventureId={this.state.openedAdventure.id}
                            name={this.state.openedAdventure.name}
                            core={this.state.openedAdventure.core}
                            scenes={this.state.openedAdventure.scenes}
                        />
                }
                </div>
            </div>
        )
    }
}