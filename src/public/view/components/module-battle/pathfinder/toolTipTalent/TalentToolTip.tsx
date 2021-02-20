import * as React from 'react';
import {CSSProperties, ReactNode} from 'react';
import {PathfinderTalentTypesEnum} from "@/public/model/enumeration/pathfinder/PathfinderTalentTypesEnum";
import {PathfinderTalentViewModel} from "@/public/model/pathfinder/PathfinderTalentViewModel";
import * as style from './talentTooltip.css';

export interface TalentToolTipProps {
    talent: PathfinderTalentViewModel;
}

export class TalentToolTip extends React.Component<TalentToolTipProps> {

    attemptToBuildLink = (): string => {
        let url = 'https://www.d20pfsrd.com/feats/';
        let talentName = this.props.talent.name.trim();
        talentName = talentName.replace(/ /g, '-').toLowerCase();
        switch (this.props.talent.type) {
            case PathfinderTalentTypesEnum.GENERAL:
                url +='general-feats/';
                break;
            case PathfinderTalentTypesEnum.COMBAT:
                url +='combat-feats/';
                talentName+='-combat';
                break;
            case PathfinderTalentTypesEnum.MONSTER:
                url+='monster-feats/';
                break;
            case PathfinderTalentTypesEnum.ACHIEVEMENT:
                url+='achievement-feats/';
                talentName+='-achievement';
                break;
            case PathfinderTalentTypesEnum.ITEMCREATION:
                url+='item-creation-feats/';
                talentName+='-item-creation';
                break;
            case PathfinderTalentTypesEnum.METAMAGIC:
                url+='metamagic-feats/';
                talentName+='-metamagic';
                break;
            case PathfinderTalentTypesEnum.STORY:
                url+='story-feats/';
                talentName+='-story';
                break;
            case PathfinderTalentTypesEnum.MYTHIC:
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
          case PathfinderTalentTypesEnum.GENERAL:
              styleProperties.backgroundImage = 'url(images/pathfinder/talentTypeIcons/general-icon.png)';
              break;
          case PathfinderTalentTypesEnum.COMBAT:
              styleProperties.backgroundImage = 'url(images/pathfinder/talentTypeIcons/combat-icon.png)';
              break;
          case PathfinderTalentTypesEnum.MONSTER:
              styleProperties.backgroundImage = 'url(images/pathfinder/talentTypeIcons/monster-icon.png)';
              break;
          case PathfinderTalentTypesEnum.ACHIEVEMENT:
              styleProperties.backgroundImage = 'url(images/pathfinder/talentTypeIcons/achievement-icon.png)';
              break;
          case PathfinderTalentTypesEnum.ITEMCREATION:
              styleProperties.backgroundImage = 'url(images/pathfinder/talentTypeIcons/itemCreation-icon.png)';
              break;
          case PathfinderTalentTypesEnum.METAMAGIC:
              styleProperties.backgroundImage = 'url(images/pathfinder/talentTypeIcons/metamagic-icon.png)';
              break;
          case PathfinderTalentTypesEnum.STORY:
              styleProperties.backgroundImage = 'url(images/pathfinder/talentTypeIcons/story-icon.png)';
              break;
          case PathfinderTalentTypesEnum.MYTHIC:
              styleProperties.backgroundImage = 'url(images/pathfinder/talentTypeIcons/mythic-icon.png)';
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