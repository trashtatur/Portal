import * as React from 'react';
import {CSSProperties, ReactNode} from 'react';
import {talent} from "../../../componentTypes";
import {TalentTypes} from "../../../../model/enumeration/TalentTypes";
import * as style from './talentTooltip.css';

export interface TalentToolTipProps {
    talent: talent;
}

export class TalentToolTip extends React.Component<TalentToolTipProps> {

    attemptToBuildLink = (): string => {
        let url = 'https://www.d20pfsrd.com/feats/';
        let talentName = this.props.talent.name.trim();
        talentName = talentName.replace(/ /g, '-').toLowerCase();
        switch (this.props.talent.type) {
            case TalentTypes.GENERAL:
                url +='general-feats/';
                break;
            case TalentTypes.COMBAT:
                url +='combat-feats/';
                talentName+='-combat';
                break;
            case TalentTypes.MONSTER:
                url+='monster-feats/';
                break;
            case TalentTypes.ACHIEVEMENT:
                url+='achievement-feats/';
                talentName+='-achievement';
                break;
            case TalentTypes.ITEMCREATION:
                url+='item-creation-feats/';
                talentName+='-item-creation';
                break;
            case TalentTypes.METAMAGIC:
                url+='metamagic-feats/';
                talentName+='-metamagic';
                break;
            case TalentTypes.STORY:
                url+='story-feats/';
                talentName+='-story';
                break;
            case TalentTypes.MYTHIC:
                url='https://www.d20pfsrd.com/alternative-rule-systems/mythic/mythic-feats/';
                talentName+='-mythic';
                break;
            default:
                break;
        }
        url +=talentName;
        return url;
    };

    determineTalentTypeBackground = (): CSSProperties => {
      const styleProperties: CSSProperties = {};
      switch (this.props.talent.type) {
          case TalentTypes.GENERAL:
              styleProperties.backgroundImage = 'url(images/talentTypeIcons/general-icon.png)';
              break;
          case TalentTypes.COMBAT:
              styleProperties.backgroundImage = 'url(images/talentTypeIcons/combat-icon.png)';
              break;
          case TalentTypes.MONSTER:
              styleProperties.backgroundImage = 'url(images/talentTypeIcons/monster-icon.png)';
              break;
          case TalentTypes.ACHIEVEMENT:
              styleProperties.backgroundImage = 'url(images/talentTypeIcons/achievement-icon.png)';
              break;
          case TalentTypes.ITEMCREATION:
              styleProperties.backgroundImage = 'url(images/talentTypeIcons/itemCreation-icon.png)';
              break;
          case TalentTypes.METAMAGIC:
              styleProperties.backgroundImage = 'url(images/talentTypeIcons/metamagic-icon.png)';
              break;
          case TalentTypes.STORY:
              styleProperties.backgroundImage = 'url(images/talentTypeIcons/story-icon.png)';
              break;
          case TalentTypes.MYTHIC:
              styleProperties.backgroundImage = 'url(images/talentTypeIcons/mythic-icon.png)';
              break;
          default:
              break;
      }
      return styleProperties;
    };


    render(): ReactNode {
        return (
            <div className={style.talentTooltipContainer}>
                <span className={style.typeIndicator} style={this.determineTalentTypeBackground()}>
                    <div className={style.typeIndicatorText}>{this.props.talent.type}</div>
                </span>
                <p className={style.talentPartParagraph}>
                    <span className={style.talentPart}>
                        Name: <span className={style.talentPartValue}>{this.props.talent.name}</span>
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