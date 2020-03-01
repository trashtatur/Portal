import * as React from "react";
import {Timeline, TimelineEvent} from "react-event-timeline";
import {round} from "../../componentTypes";
import {SingleRound} from "./single round/SingleRound";
import * as style from './roundOverview.css';

export interface IRoundOverviewProps {
    roundLog: round[]
    currentRound:round
}

export interface IRoundOverviewState {

}

export class RoundOverview extends React.Component<IRoundOverviewProps,IRoundOverviewState>{

    constructor(props) {
        super(props);

        this.ifActiveRoundColor = this.ifActiveRoundColor.bind(this);
        this.ifActiveRound = this.ifActiveRound.bind(this);

    }

    inactive_icon = "◌";
    active_icon = "⭗";
    active_color ="dodgerblue";
    inactive_color = "orange";


    ifActiveRound(round:round) {
        if (round.active) return this.active_icon;
        return this.inactive_icon
    }

    ifActiveRoundColor(round:round) {
        if (round.active) return this.active_color;
        return this.inactive_color
    }

    render():any {
        return (
            <Timeline orientation={"right"} style={{
                width:"25%",
                height:"100%",
                float:"right",
                marginRight: "0.5em"
            }}>
                <TimelineEvent
                    title={`Round ${this.props.currentRound.number}`}
                    createdAt={this.props.currentRound.startedAt.toLocaleTimeString()}
                    subtitle={`${this.ifActiveRound(this.props.currentRound)} active`}
                    subtitleStyle={{color:`${this.ifActiveRoundColor(this.props.currentRound)}`}}
                    contentStyle={{
                        boxShadow: '0 0 6px 1px #a09c98'
                    }}
                    bubbleStyle={{
                        backgroundColor: "slategrey",
                        borderColor:"darkslategrey"
                    }}
                    icon={<img src={"images/round/round.svg"} style={{height:20, width:20}}/>}>

                    <SingleRound roundData={this.props.currentRound} pastRounds={this.props.roundLog}/>

                </TimelineEvent>
                {
                    this.props.roundLog.map((round,i)=> {
                        return (
                            <TimelineEvent
                                key={i}
                                collapsible={true}
                                title={`Round ${round.number}`}
                                createdAt={round.startedAt.toLocaleTimeString()}
                                subtitle={`${this.ifActiveRound(round)} active`}
                                subtitleStyle={{color:`${this.ifActiveRoundColor(round)}`}}
                                contentStyle={{
                                    boxShadow: '0 0 6px 1px #a09c98'
                                }}
                                bubbleStyle={{
                                    backgroundColor: "slategrey",
                                    borderColor:"darkslategrey"
                                }}
                                icon={<img src={"images/round/round.svg"} style={{height:20, width:20}}/>}
                            >
                                <SingleRound roundData={round} pastRounds={this.props.roundLog}/>
                            </TimelineEvent>
                        )
                    }).reverse()
                }
            </Timeline>
        )
    }

}