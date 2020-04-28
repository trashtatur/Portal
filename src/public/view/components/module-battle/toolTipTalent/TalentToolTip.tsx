import * as React from 'react';
import {CSSProperties, ReactNode} from 'react';
import {TalentTypesEnum} from "../../../../model/enumeration/TalentTypesEnum";
import {TalentViewModel} from "../../../../model/pathfinder/TalentViewModel";
import * as style from './talentTooltip.css';

export interface TalentToolTipProps {
    talent: TalentViewModel;
}

export class TalentToolTip extends React.Component<TalentToolTipProps> {

    attemptToBuildLink = (): string => {
        let url = 'https://www.d20pfsrd.com/feats/';
        let talentName = this.props.talent.name.trim();
        talentName = talentName.replace(/ /g, '-').toLowerCase();
        switch (this.props.talent.type) {
            case TalentTypesEnum.GENERAL:
                url +='general-feats/';
                break;
            case TalentTypesEnum.COMBAT:
                url +='combat-feats/';
                talentName+='-combat';
                break;
            case TalentTypesEnum.MONSTER:
                url+='monster-feats/';
                break;
            case TalentTypesEnum.ACHIEVEMENT:
                url+='achievement-feats/';
                talentName+='-achievement';
                break;
            case TalentTypesEnum.ITEMCREATION:
                url+='item-creation-feats/';
                talentName+='-item-creation';
                break;
            case TalentTypesEnum.METAMAGIC:
                url+='metamagic-feats/';
                talentName+='-metamagic';
                break;
            case TalentTypesEnum.STORY:
                url+='story-feats/';
                talentName+='-story';
                break;
            case TalentTypesEnum.MYTHIC:
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
          case TalentTypesEnum.GENERAL:
              styleProperties.backgroundImage = 'url(images/talentTypeIcons/general-icon.png)';
              break;
          case TalentTypesEnum.COMBAT:
              styleProperties.backgroundImage = 'url(images/talentTypeIcons/combat-icon.png)';
              break;
          case TalentTypesEnum.MONSTER:
              styleProperties.backgroundImage = 'url(images/talentTypeIcons/monster-icon.png)';
              break;
          case TalentTypesEnum.ACHIEVEMENT:
              styleProperties.backgroundImage = 'url(images/talentTypeIcons/achievement-icon.png)';
              break;
          case TalentTypesEnum.ITEMCREATION:
              styleProperties.backgroundImage = 'url(images/talentTypeIcons/itemCreation-icon.png)';
              break;
          case TalentTypesEnum.METAMAGIC:
              styleProperties.backgroundImage = 'url(images/talentTypeIcons/metamagic-icon.png)';
              break;
          case TalentTypesEnum.STORY:
              styleProperties.backgroundImage = 'url(images/talentTypeIcons/story-icon.png)';
              break;
          case TalentTypesEnum.MYTHIC:
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