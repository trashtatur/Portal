import * as React from 'react';
import {ReactNode} from 'react';
import {DND5CreaturePropertiesViewModel} from "@/public/model/dnd5/DND5CreaturePropertiesViewModel";
import {CreatureViewModel} from "@/public/model/CreatureViewModel";
import {DND5LanguageViewModel} from "@/public/model/dnd5/DND5LanguageViewModel";
import {DND5SpellViewModel} from "@/public/model/dnd5/DND5SpellViewModel";
import {DND5TalentViewModel} from "@/public/model/dnd5/DND5TalentViewModel";
import {DND5ActionViewModel} from "@/public/model/dnd5/DND5ActionViewModel";
import {DND5SkillViewModel} from "@/public/model/dnd5/DND5SkillViewModel";
import {CreatureViewModelFactory} from "@/public/factory/CreatureViewModelFactory";
import {CRToExperiencePointsConverterService} from "@/public/service/dnd5/CRToExperiencePointsConverterService";
import {CRToProficiencyConverterService} from "@/public/service/dnd5/CRToProficiencyConverterService";
import {NameAndTypeFormSection} from "./nameAndTypeFormSection/NameAndTypeFormSection";
import {StatBlockFormSection} from "./statBlockFormSection/StatBlockFormSection";
import {NameAndTypeFormSectionHeader} from "./headers/NameAndTypeFormSectionHeader";
import {StatBlockFormSectionHeader} from "./headers/StatBlockFormSectionHeader";
import {SizeAlignmentAndChallengeFormSection} from "./sizeAndChallengeFormSection/SizeAlignmentAndChallengeFormSection";
import {SizeAlignmentAndChallengeFormSectionHeader} from "./headers/SizeAlignmentAndChallengeFormSectionHeader";
import {SelectEventTypesEnum} from "@/public/model/enumeration/SelectEventTypesEnum";
import {DND5CreatureSizeEnum} from "@/public/model/enumeration/dnd5/DND5CreatureSizeEnum";
import {DND5CreatureCard} from "../creatureCard/DND5CreatureCard";
import {TypeEnum} from "@/public/model/enumeration/TypesEnum";
import {AlignmentEnum} from "@/public/model/enumeration/AlignmentEnum";
import {ClassesAndLevelsFormSectionHeader} from "@/public/view/components/module-battle/dnd5/creatureForm/headers/ClassesAndLevelsFormSectionHeader";
import {ClassesAndLevelsFormSection} from "@/public/view/components/module-battle/dnd5/creatureForm/classesAndLevelsFormSection/ClassesAndLevelsFormSection";
import {ClassAndLevelViewModel} from "@/public/model/dataModel/ClassAndLevelViewModel";
import {AverageStatsTable} from "@/public/model/dataModel/dnd5/AverageStatsTable";
import {HPSpeedAndACPlayerFormSection} from "@/public/view/components/module-battle/dnd5/creatureForm/hpAndAcPlayerFormSection/HPSpeedAndACPlayerFormSection";
import {HPAndACMonsterFormSection} from "@/public/view/components/module-battle/dnd5/creatureForm/hpAndAcMonsterFormSection/HPAndACMonsterFormSection";
import {HPSpeedAndACFormSectionHeader} from "@/public/view/components/module-battle/dnd5/creatureForm/headers/HPSpeedAndACFormSectionHeader";
import {SpeedModel} from "@/public/model/dataModel/SpeedModel";
import * as style from './dnd5CreatureForm.css';

interface CreatureFormState {
    languagesToSelectFrom: DND5LanguageViewModel[];
    skillsToSelectFrom: DND5SkillViewModel[];
    spellsToSelectFrom: DND5SpellViewModel[];
    talentsToSelectFrom: DND5TalentViewModel[];
    actionsToSelectFrom: DND5ActionViewModel[];
    creatureToSelectFromAsTemplates: CreatureViewModel<DND5CreaturePropertiesViewModel>[];
    creature: CreatureViewModel<DND5CreaturePropertiesViewModel>;
}

export class DND5CreatureForm extends React.Component<{}, CreatureFormState> {
    private crToXPService: CRToExperiencePointsConverterService;
    private creatureViewModelFactory: CreatureViewModelFactory;
    private crToProficiencyService: CRToProficiencyConverterService;
    private averageStatsTable: AverageStatsTable;

    constructor(props) {
        super(props);
        this.crToXPService = new CRToExperiencePointsConverterService();
        this.crToProficiencyService = new CRToProficiencyConverterService();
        this.creatureViewModelFactory = new CreatureViewModelFactory();
        this.averageStatsTable = AverageStatsTable.create();
        this.state = {
            creature: this.creatureViewModelFactory.createEmpty(DND5CreaturePropertiesViewModel),
            languagesToSelectFrom: [],
            skillsToSelectFrom: [],
            spellsToSelectFrom: [],
            talentsToSelectFrom: [],
            actionsToSelectFrom: [],
            creatureToSelectFromAsTemplates: []
        }
    }

    handleNameChange = (event): void => {
        const creature = this.state.creature;
        creature.name = event.target.value;
        this.setState({creature: creature})
    }

    handleTypeChange = (value, option): void => {
        if (option.action === SelectEventTypesEnum.SELECT_OPTION) {
            const creature = this.state.creature;
            creature.properties.type = value.value;
            this.setState({creature: creature})
        }
    }

    handleSizeChange = (value, option): void => {
        if (option.action === SelectEventTypesEnum.SELECT_OPTION) {
            const creature = this.state.creature;
            creature.properties.size = value.value;
            this.setState({creature: creature}, () => {
                let hitDiceType = null;
                switch (this.state.creature.properties.size) {
                    case DND5CreatureSizeEnum.GARGANTUAN:
                        hitDiceType = 20;
                        break;
                    case DND5CreatureSizeEnum.HUGE:
                        hitDiceType = 12;
                        break;
                    case DND5CreatureSizeEnum.LARGE:
                        hitDiceType = 10;
                        break;
                    case DND5CreatureSizeEnum.MEDIUM:
                        hitDiceType = 8;
                        break;
                    case DND5CreatureSizeEnum.SMALL:
                        hitDiceType = 6;
                        break;
                    case DND5CreatureSizeEnum.TINY:
                        hitDiceType = 4;
                        break;
                    default:
                        break;
                }
                creature.properties.hitDice.diceType = hitDiceType;
                this.setState({creature: creature});
            });
        }
    }

    handleAlignmentChange = (value, option): void => {
        if (option.action === SelectEventTypesEnum.SELECT_OPTION) {
            const creature = this.state.creature;
            creature.properties.alignment = value.value;
            this.setState({creature: creature})
        }
    }

    handleCRChange = (event): void => {
        const creature = this.state.creature;
        creature.properties.challenge = null;
        if (!isNaN(parseInt(event.target.value))) {
            let valueAsNumber = parseInt(event.target.value);
            if (valueAsNumber > 30) {
                valueAsNumber = 30;
            }
            if (valueAsNumber < 0.125) {
                valueAsNumber = 0;
            }
            creature.properties.challenge = valueAsNumber;
            creature.properties.xp = this.crToXPService.getExperiencePointsByCRValue(valueAsNumber);
            creature.properties.proficiencyBonus = this.crToProficiencyService.getProficiencyByCRValue(valueAsNumber);
        }
        this.setState({creature: creature})
    }

    handleStrengthChange = (event): void => {
        const creature = this.state.creature;
        creature.properties.stats.strength = null;
        if (!isNaN(parseInt(event.target.value))) {
            creature.properties.stats.strength = parseInt(event.target.value)
        }
        this.setState({creature: creature})
    };

    handleDexterityChange = (event): void => {
        const creature = this.state.creature;
        creature.properties.stats.dexterity = null;
        if (!isNaN(parseInt(event.target.value))) {
            creature.properties.stats.dexterity = parseInt(event.target.value)
        }
        this.setState({creature: creature})
    };

    handleConstitutionChange = (event): void => {
        const creature = this.state.creature;
        creature.properties.stats.constitution = null;
        if (!isNaN(parseInt(event.target.value))) {
            creature.properties.stats.constitution = parseInt(event.target.value)
        }
        this.setState({creature: creature})
    };

    handleIntelligenceChange = (event): void => {
        const creature = this.state.creature;
        creature.properties.stats.intelligence = null;
        if (!isNaN(parseInt(event.target.value))) {
            creature.properties.stats.intelligence = parseInt(event.target.value)
        }
        this.setState({creature: creature})
    };

    handleWisdomChange = (event): void => {
        const creature = this.state.creature;
        creature.properties.stats.wisdom = null;
        if (!isNaN(parseInt(event.target.value))) {
            creature.properties.stats.wisdom = parseInt(event.target.value)
        }
        this.setState({creature: creature})
    };

    handleCharismaChange = (event): void => {
        const creature = this.state.creature;
        creature.properties.stats.charisma = null;
        if (!isNaN(parseInt(event.target.value))) {
            creature.properties.stats.charisma = parseInt(event.target.value)
        }
        this.setState({creature: creature})
    };

    handleClassesAndLevelsChange = (classesAndLevels: ClassAndLevelViewModel[]): void => {
        const creature = this.state.creature;
        creature.properties.classesAndLevels = classesAndLevels;
        this.setState({creature: creature});
    };

    handleHitpointsChange = (event): void => {
        const creature = this.state.creature;
        creature.properties.hitpoints = null;
        if (!isNaN(parseInt(event.target.value))) {
            creature.properties.hitpoints = parseInt(event.target.value)
        }
        this.setState({creature: creature})
    };

    handleArmorClassChange = (event): void => {
        const creature = this.state.creature;
        creature.properties.armorclass = null;
        if (!isNaN(parseInt(event.target.value))) {
            let valueAsNumber = parseInt(event.target.value);
            if (valueAsNumber < 0) {
                valueAsNumber = 0;
            }
            creature.properties.armorclass = valueAsNumber;
        }
        this.setState({creature: creature})
    }

    handleSpeedChange = (speedModel: SpeedModel): void => {

    };

    handleHitDiceCountChange = (event): void => {
        const creature = this.state.creature;
        if (!isNaN(parseInt(event.target.value))) {
            creature.properties.hitDice.diceCount = parseInt(event.target.value);
        }
        this.setState({creature: creature});
    }

    handleHitDiceBonusChange = (event): void => {
        const creature = this.state.creature;
        if (!isNaN(parseInt(event.target.value))) {
            creature.properties.hitDice.bonus = parseInt(event.target.value);
        }
        this.setState({creature: creature});
    }

    render(): ReactNode {
        return (
            <div className={style.container}>
                <div className={style.creatureFormContainer}>
                    <div className={style.formSection}>
                        <NameAndTypeFormSectionHeader
                            name={this.state.creature.name}
                            type={this.state.creature.properties.type}
                        />
                        <NameAndTypeFormSection
                            name={this.state.creature.name}
                            type={
                                this.state.creature.properties.getPrimitiveAttributeAsString(
                                    this.state.creature.properties.type
                                )}
                            changeName={this.handleNameChange}
                            changeType={this.handleTypeChange}
                        />
                    </div>
                    <div className={style.formSection}>
                        <SizeAlignmentAndChallengeFormSectionHeader
                            size={this.state.creature.properties.size}
                            challenge={this.state.creature.properties.challenge}
                            alignment={this.state.creature.properties.alignment}
                            type={this.state.creature.properties.type}
                        />
                        {
                            this.state.creature.name !== ''
                            && this.state.creature.properties.type !== TypeEnum.NONE
                            &&
                            <SizeAlignmentAndChallengeFormSection
                                size={this.state.creature.properties.size}
                                changeSize={this.handleSizeChange}
                                challenge={this.state.creature.properties.getPrimitiveAttributeAsString(
                                    this.state.creature.properties.challenge
                                )}
                                changeChallenge={this.handleCRChange}
                                alignment={this.state.creature.properties.alignment}
                                changeAlignment={this.handleAlignmentChange}
                                type={this.state.creature.properties.type}
                            />
                        }
                    </div>
                    <div className={style.formSection}>
                        <StatBlockFormSectionHeader stats={this.state.creature.properties.stats}/>
                        {
                            this.state.creature.properties.size !== DND5CreatureSizeEnum.NONE
                            && this.state.creature.properties.alignment !== AlignmentEnum.NONE
                            &&
                            <StatBlockFormSection
                                strength={this.state.creature.properties.getPrimitiveAttributeAsString(
                                    this.state.creature.properties.stats.strength
                                )}
                                changeStrength={this.handleStrengthChange}
                                dexterity={this.state.creature.properties.getPrimitiveAttributeAsString(
                                    this.state.creature.properties.stats.dexterity
                                )}
                                changeDexterity={this.handleDexterityChange}
                                constitution={this.state.creature.properties.getPrimitiveAttributeAsString(
                                    this.state.creature.properties.stats.constitution
                                )}
                                changeConstitution={this.handleConstitutionChange}
                                intelligence={this.state.creature.properties.getPrimitiveAttributeAsString(
                                    this.state.creature.properties.stats.intelligence
                                )}
                                changeIntelligence={this.handleIntelligenceChange}
                                wisdom={this.state.creature.properties.getPrimitiveAttributeAsString(
                                    this.state.creature.properties.stats.wisdom
                                )}
                                changeWisdom={this.handleWisdomChange}
                                charisma={this.state.creature.properties.getPrimitiveAttributeAsString(
                                    this.state.creature.properties.stats.charisma
                                )}
                                changeCharisma={this.handleCharismaChange}
                            />
                        }
                    </div>
                    <div className={style.formSection}>
                        <ClassesAndLevelsFormSectionHeader
                            classesAndLevels={this.state.creature.properties.classesAndLevels}
                            type={this.state.creature.properties.type}
                        />
                        {
                            this.state.creature.properties.type === TypeEnum.PLAYER
                            && this.state.creature.properties.stats.strength !== null
                            && this.state.creature.properties.stats.dexterity !== null
                            && this.state.creature.properties.stats.constitution !== null
                            && this.state.creature.properties.stats.wisdom !== null
                            && this.state.creature.properties.stats.intelligence !== null
                            && this.state.creature.properties.stats.charisma !== null
                            &&
                            <ClassesAndLevelsFormSection
                                classesAndLevels={this.state.creature.properties.classesAndLevels}
                                changeClassesAndLevels={this.handleClassesAndLevelsChange}
                            />
                        }
                    </div>
                    <div className={style.formSection}>
                        <HPSpeedAndACFormSectionHeader
                            hp={this.state.creature.properties.hitpoints}
                            ac={this.state.creature.properties.armorclass}
                            speed={this.state.creature.properties.speed}
                            hitDice={this.state.creature.properties.hitDice}
                        />
                        {
                            this.state.creature.properties.stats.strength !== null
                            && this.state.creature.properties.stats.dexterity !== null
                            && this.state.creature.properties.stats.constitution !== null
                            && this.state.creature.properties.stats.wisdom !== null
                            && this.state.creature.properties.stats.intelligence !== null
                            && this.state.creature.properties.stats.charisma !== null
                            && this.state.creature.properties.type === TypeEnum.PLAYER
                            &&
                            <HPSpeedAndACPlayerFormSection
                                hp={this.state.creature.properties.getPrimitiveAttributeAsString(
                                    this.state.creature.properties.hitpoints
                                )}
                                changeHP={this.handleHitpointsChange}
                                ac={this.state.creature.properties.getPrimitiveAttributeAsString(
                                    this.state.creature.properties.hitpoints
                                )}
                                changeAC={this.handleArmorClassChange}
                                speed={this.state.creature.properties.speed}
                                changeSpeed={this.handleSpeedChange}
                                classesAndLevels={this.state.creature.properties.classesAndLevels}
                                changeHitDice={this.handleHitDiceCountChange}
                            />
                        }
                        {
                            this.state.creature.properties.type !== TypeEnum.PLAYER
                            && this.state.creature.properties.stats.strength !== null
                            && this.state.creature.properties.stats.dexterity !== null
                            && this.state.creature.properties.stats.constitution !== null
                            && this.state.creature.properties.stats.wisdom !== null
                            && this.state.creature.properties.stats.intelligence !== null
                            && this.state.creature.properties.stats.charisma !== null
                            &&
                            <HPAndACMonsterFormSection
                                hp={this.state.creature.properties.getPrimitiveAttributeAsString(
                                    this.state.creature.properties.hitpoints
                                )}
                                changeHP={this.handleHitpointsChange}
                                ac={this.state.creature.properties.getPrimitiveAttributeAsString(
                                    this.state.creature.properties.armorclass
                                )}
                                changeAC={this.handleArmorClassChange}
                                constitutionMod={this.state.creature.properties.stats.getStatModifierForStatValue(
                                    this.state.creature.properties.stats.constitution
                                )}
                                speed={this.state.creature.properties.speed}
                                changeSpeed={this.handleSpeedChange}
                                size={this.state.creature.properties.size}
                                hitDice={this.state.creature.properties.hitDice}
                                changeHitDiceCount={this.handleHitDiceCountChange}
                                changeHitDiceBonus={this.handleHitDiceBonusChange}
                                averageAC={this.averageStatsTable.getMatchingEntriesByChallengeRating(
                                    this.state.creature.properties.challenge
                                ).armorClass}
                                averageHP={this.averageStatsTable.getMatchingEntriesByChallengeRating(
                                    this.state.creature.properties.challenge
                                ).hitPointsRange}
                            />
                        }
                    </div>
                </div>
                <div className={style.creatureCardContainer}>
                    <DND5CreatureCard creature={this.state.creature}/>
                </div>
            </div>
        )
    }
}