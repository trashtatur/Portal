import * as React from "react";
import {round} from "../../../../../types/frontendTypes";
import {SingleRound} from "../single round/SingleRound";
import {ReactElement} from "react";
import * as style from './roundOverview.css'
import {uuidv4} from "@/public/service/uuid.service";

interface RoundOverviewProps {
    roundLog: round[];
    currentRound: round;
    addRound: Function;
    resetRounds: Function;
}

interface RoundOverviewState {
    allRounds: Map<number,boolean>;
}

export class RoundOverview extends React.Component<RoundOverviewProps, RoundOverviewState> {

    constructor(props) {
        super(props);
        this.state = {
            allRounds: new Map<number, boolean>().set(1, true)
        }
    }

    singleRoundDetailsRef: HTMLElement = null;

    addNewRound = (): void => {
        const allRounds = this.state.allRounds;
        allRounds.set(this.props.currentRound.number +1, false);
        this.setState({allRounds: allRounds}, () => {
            this.props.addRound();
        })
    };

    resetRounds = (): void => {
        this.props.resetRounds();
    }

    selectRoundForRoundDetails = (roundNumber: number): void => {
        if (this.singleRoundDetailsRef === null) {
            return;
        }
        const allRounds = this.state.allRounds;
        [...allRounds.keys()].forEach((key) => {
            allRounds.set(key, false);
        });
        allRounds.set(roundNumber, true);
        this.setState({allRounds: allRounds});
    };

    determineIfRoundIsSelected = (roundNumber: number): boolean => {
        return this.state.allRounds.get(roundNumber) === true;
    };

    render(): ReactElement {
        return (
            <>
                <div className={style.roundOverviewContainer}>
                    <button
                        className={style.resetRoundsButton}
                        onClick={this.resetRounds}
                    >↺
                    </button>
                    <button
                        className={style.addRoundButton}
                        onClick={this.addNewRound}
                    >+
                    </button>
                    <SingleRound
                        key={uuidv4()}
                        roundData={this.props.currentRound}
                        pastRounds={this.props.roundLog}
                        roundDetailsPortal={this.singleRoundDetailsRef}
                        isActive={true}
                        isSelected={this.determineIfRoundIsSelected(this.props.currentRound.number)}
                        selectThisRound={this.selectRoundForRoundDetails}
                    />
                    {this.props.roundLog.map((round) => {
                        return <SingleRound
                            key={uuidv4()}
                            roundData={round}
                            pastRounds={this.props.roundLog}
                            roundDetailsPortal={this.singleRoundDetailsRef}
                            isActive={false}
                            isSelected={this.determineIfRoundIsSelected(round.number)}
                            selectThisRound={this.selectRoundForRoundDetails}
                        />
                    }).reverse()
                    }
                </div>
                <div className={style.singleRoundDetailsContainer} ref={ref => this.singleRoundDetailsRef = ref}>
                    {/** RoundDetails will be rendered here */}
                </div>
            </>
        )
    }
}