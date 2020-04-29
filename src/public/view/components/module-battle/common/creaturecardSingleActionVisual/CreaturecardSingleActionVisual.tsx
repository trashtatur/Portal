import * as React from 'react';
import {ReactNode} from 'react';
import * as style from "./creaturecardSingleActionVisual.css";

interface CreaturecardSingleActionVisualProps {
    name: string;
    rangeType: string;
    attackBonus: number;
    range: number;
    fullDamageString: string;
    fullDamageTypeString: string;
    critMod: number;
    additionalInfo?: string;
}

export class CreaturecardSingleActionVisual extends React.Component<CreaturecardSingleActionVisualProps, {}> {

    render(): ReactNode {
        return (
            <>
                <span className={style.actionTitle}>{this.props.name}</span>
                <div className={style.action}>
                    <div className={style.actionLabelContainer}>
                     <span className={style.actionLabel}
                           style={{backgroundColor: 'coral', borderColor: 'coral'}}
                     >{this.props.rangeType}</span>
                        {this.props.attackBonus > 0 &&
                        <span className={style.actionLabel}
                              style={{backgroundColor: '#f24848', borderColor: '#f24848'}}
                        >+{this.props.attackBonus} to hit</span>
                        }
                        <span className={style.actionLabel}
                              style={{backgroundColor: '#e8de22', borderColor: '#e8de22'}}
                        >reach {this.props.range}</span>&nbsp;
                        <span className={style.actionLabel}
                              style={{backgroundColor: 'orange', borderColor: 'orange'}}
                        >{this.props.fullDamageString}(x{this.props.critMod})</span>
                        <span className={style.actionLabel}
                              style={{backgroundColor: '#ef2867', borderColor: '#ef2867'}}
                        >{this.props.fullDamageTypeString}</span>
                    </div>
                    { this.props.additionalInfo &&
                    <div className={style.additionalInfo}>
                        {this.props.additionalInfo}
                    </div>
                    }
                </div>
            </>
        )
    }
}