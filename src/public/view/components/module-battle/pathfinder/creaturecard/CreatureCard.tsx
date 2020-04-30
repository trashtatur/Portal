import * as React from "react";
import {CreaturecardHeader} from "../../common/creaturecardHeader/CreaturecardHeader";
import {CreaturecardProperties} from "../creaturecardProperties/CreaturecardProperties";
import {CreaturecardACHP} from "../../common/creaturecardACHP/CreaturecardACHP";
import {CreaturecardStats} from "../creaturecardStats/CreaturecardStats";
import {CreaturecardImage} from "../../common/creaturecardImage/CreaturecardImage";
import {RedFadeLine} from "../../../uiBasic/redFadeLine/RedFadeLine";
import {CreaturecardAttributes} from "../creaturecardAttributes/CreaturecardAttributes";
import {CreaturecardAttackProperties} from "../../common/creaturecardAttackProperties/CreaturecardAttackProperties";
import {CreaturecardActions} from "../creaturecardActions/CreaturecardActions";
import {ReactElement} from "react";
import {PathfinderStatsViewModel} from "../../../../../model/dataModel/pathfinder/PathfinderStatsViewModel";
import {CreatureSizesEnum} from "../../../../../model/enumeration/CreatureSizesEnum";
import {AttackPropertyViewModel} from "../../../../../model/dataModel/AttackPropertyViewModel";
import {PathfinderSavingThrowsViewModel} from "../../../../../model/dataModel/pathfinder/PathfinderSavingThrowsViewModel";
import {TalentViewModel} from "../../../../../model/pathfinder/TalentViewModel";
import {ActionViewModel} from "../../../../../model/pathfinder/ActionViewModel";
import {SkillViewModel} from "../../../../../model/pathfinder/SkillViewModel";
import {LanguageViewModel} from "../../../../../model/pathfinder/LanguageViewModel";
import {AlignmentEnum} from "../../../../../model/enumeration/AlignmentEnum";
import * as style from "./creatureCard.css";


export interface CreatureCardProps {
    name: string;
    hitpoints: number;
    armorclass: number;
    label?: number;
    alignment: AlignmentEnum;
    creatureClass: string;
    attackProperties?: AttackPropertyViewModel[];
    challenge: number;
    movement: number;
    ini: number;
    image?: string;
    baseAtk: number;
    xp?: number;
    size: CreatureSizesEnum;
    stats: PathfinderStatsViewModel;
    saveThrows: PathfinderSavingThrowsViewModel;
    foldable?: boolean;
    languages?: LanguageViewModel[];
    skills?: SkillViewModel[];
    talents?: TalentViewModel[];
    actions?: ActionViewModel[];
    preview?: boolean;
}

export interface CreatureCardState {
    isFolded: boolean;
    foldable: boolean;
}

export class CreatureCard extends React.Component<CreatureCardProps, CreatureCardState> {

    constructor(props) {
        super(props);
        this.state = {
            isFolded: this.props.foldable || false,
            foldable: this.props.foldable || false
        }
    }

    determineFolding(): object {
        if (this.state.isFolded) return {visibility: "hidden", opacity: 0, display: "none"};
        return {visibility: "visible", opacity: 1, display: "inline-block"};
    }

    toggleFold(): void {
        if (this.state.foldable) {
            if (this.state.isFolded) {
                this.setState({isFolded: false})
            } else {
                this.setState({isFolded: true})
            }
        }
    }

    render(): ReactElement {
        return (
            <div className={style.creatureCardContainer} onClick={() => this.toggleFold()}>
                <CreaturecardHeader name={this.props.name} alignment={this.props.alignment}
                                    challenge={this.props.challenge} label={this.props.label}
                />
                <div className={style.foldInContainer} style={this.determineFolding()}>
                    <CreaturecardProperties
                        size={this.props.size}
                        movement={this.props.movement}
                        ini={this.props.ini}
                        creatureClass={this.props.creatureClass}
                        baseAtk={this.props.baseAtk}
                        xp={this.props.xp}
                    />
                    <CreaturecardACHP armorclass={this.props.armorclass} tp={this.props.hitpoints}/>
                    <CreaturecardImage imagePath={this.props.image}/>
                    <CreaturecardStats statsVM={this.props.stats}
                    />
                    <RedFadeLine/>
                    <CreaturecardAttributes skills={this.props.skills}
                                            talents={this.props.talents}
                                            languages={this.props.languages}
                                            saveThrows={this.props.saveThrows}
                                            preview={this.props.preview}
                    />
                    <CreaturecardAttackProperties
                        attackProperties={this.props.attackProperties}/>
                    <CreaturecardActions actions={this.props.actions}/>
                </div>
            </div>
        );
    }
}