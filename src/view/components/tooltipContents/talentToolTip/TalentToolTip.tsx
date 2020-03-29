import * as React from 'react';
import {ReactNode} from 'react';
import {talent} from "../../componentTypes";
import * as style from './talentTooltip.css';

export interface TalentToolTipProps {
    talent: talent;
}

export class TalentToolTip extends React.Component<TalentToolTipProps> {

    attemptToBuildLink = (): string => {
        let url = 'https://www.d20pfsrd.com/feats/';
        let talentName = this.props.talent.name.trim();
        if (this.props.talent.name.substr(this.props.talent.name.length - 8) === '(combat)') {
            talentName = this.props.talent.name.substr(0, this.props.talent.name.length - 8);
            talentName = talentName.trim();
            talentName+='-combat';
            url +='combat-feats/'
        } else {
            url +='general-feats/'
        }
        talentName = talentName.replace(/ /g, '-').toLowerCase();
        url +=talentName;
        return url;
    };


    render(): ReactNode {
        return (
            <div className={style.talentTooltipContainer}>
                <p className={style.talentPartParagraph}>
                    <span className={style.talentPart}>
                        Name: <span className={style.talentPartValue}>{this.props.talent.name}</span>
                    </span>
                </p>
                <p className={style.talentPartParagraph}>
                    <span className={style.talentPart}>
                        Type: <span className={style.talentPartValue}>{this.props.talent.type}</span>
                    </span>
                </p>
                <p className={style.talentPartParagraph}>
                    <span className={style.talentPart}>
                        Benefits: <span className={style.talentPartValue}>{this.props.talent.benefits}</span>
                    </span>
                </p>
                {this.props.talent.conditions &&
                <p className={style.talentPartParagraph}>
                    <span className={style.talentPart}>
                        Conditions: <span className={style.talentPartValue}>{this.props.talent.conditions}</span>
                    </span>
                </p>
                }
                <p className={style.talentPartParagraph}>
                    <span className={style.talentPart}>
                        More: <span className={style.talentPartValue}>
                            <a
                                href={this.attemptToBuildLink()}
                                rel={'noopener noreferrer'}
                                target={'_blank'}
                            >click here...</a>
                    </span>
                    </span>
                </p>
            </div>
        )
    }
}