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
import {NameCreatureTypeAndTypeFormSection} from "./components/nameAndTypeFormSection/NameCreatureTypeAndTypeFormSection";
import {StatBlockFormSection} from "./components/statBlockFormSection/StatBlockFormSection";
import {NameCreatureTypeAndTypeFormSectionHeader} from "./components/headers/NameCreatureTypeAndTypeFormSectionHeader";
import {StatBlockFormSectionHeader} from "./components/headers/StatBlockFormSectionHeader";
import {SizeAlignmentAndChallengeFormSection} from "./components/sizeAndChallengeFormSection/SizeAlignmentAndChallengeFormSection";
import {SizeAlignmentAndChallengeFormSectionHeader} from "./components/headers/SizeAlignmentAndChallengeFormSectionHeader";
import {SelectEventTypesEnum} from "@/public/model/enumeration/SelectEventTypesEnum";
import {DND5CreatureSizeEnum} from "@/public/model/enumeration/dnd5/DND5CreatureSizeEnum";
import {DND5CreatureCard} from "../creatureCard/DND5CreatureCard";
import {TypeEnum} from "@/public/model/enumeration/TypesEnum";
import {ClassesAndLevelsFormSectionHeader} from "@/public/view/components/module-battle/dnd5/creatureForm/components/headers/ClassesAndLevelsFormSectionHeader";
import {ClassesAndLevelsFormSection} from "@/public/view/components/module-battle/dnd5/creatureForm/components/classesAndLevelsFormSection/ClassesAndLevelsFormSection";
import {ClassAndLevelViewModel} from "@/public/model/ClassAndLevelViewModel";
import {DND5AverageStatsTable} from "@/public/model/dnd5/DND5AverageStatsTable";
import {HPSpeedAndACPlayerFormSection} from "@/public/view/components/module-battle/dnd5/creatureForm/components/hpAndAcPlayerFormSection/HPSpeedAndACPlayerFormSection";
import {HPSpeedAndACMonsterFormSection} from "@/public/view/components/module-battle/dnd5/creatureForm/components/hpAndAcMonsterFormSection/HPSpeedAndACMonsterFormSection";
import {HPSpeedAndACFormSectionHeader} from "@/public/view/components/module-battle/dnd5/creatureForm/components/headers/HPSpeedAndACFormSectionHeader";
import {LanguagesFeatsSensesAndSkillsFormSection} from "@/public/view/components/module-battle/dnd5/creatureForm/components/languagesFeatsSensesAndSkills/LanguagesFeatsSensesAndSkillsFormSection";
import {LanguagesFeatsSensesAndSkillsFormSectionHeader} from "@/public/view/components/module-battle/dnd5/creatureForm/components/headers/LanguagesFeatsSensesAndSkillsFormSectionHeader";
import {DND5SenseViewModel} from "@/public/model/dnd5/DND5SenseViewModel";
import {AverageHPCalculatorService} from "@/public/service/dnd5/AverageHPCalculatorService";
import {FormSectionDisplayRuleService} from "@/public/service/dnd5/FormSectionDisplayRuleService";
import {SpellsFormSectionHeader} from "@/public/view/components/module-battle/dnd5/creatureForm/components/headers/SpellsFormSectionHeader";
import {SpellsFormSection} from "@/public/view/components/module-battle/dnd5/creatureForm/components/spellFormSection/SpellsFormSection";
import {DND5InnateSpellViewModel} from "@/public/model/dnd5/DND5InnateSpellViewModel";
import * as style from './dnd5CreatureForm.css';

interface CreatureFormState {
    enforceClassLevels: boolean;
    innateSpellCasting: boolean;
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
    private averageStatsTable: DND5AverageStatsTable;
    private formSectionDisplayRuleService: FormSectionDisplayRuleService;

    constructor(props) {
        super(props);
        this.crToXPService = new CRToExperiencePointsConverterService();
        this.creatureViewModelFactory = new CreatureViewModelFactory();
        this.averageStatsTable = DND5AverageStatsTable.create();
        this.formSectionDisplayRuleService = new FormSectionDisplayRuleService();
        this.state = {
            creature: this.creatureViewModelFactory.createEmpty(DND5CreaturePropertiesViewModel),
            enforceClassLevels: false,
            innateSpellCasting: false,
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
            creature.creatureProperties.type = value.value;
            this.setState({creature: creature})
        }
    }

    handleEnforceClassLevelsChange = (value): void => {
        this.setState({enforceClassLevels: value})
    }

    handleCreatureTypeChange = (value, option): void => {
        if (option.action === SelectEventTypesEnum.SELECT_OPTION) {
            const creature = this.state.creature;
            creature.creatureProperties.creatureType = value.value;
            this.setState({creature: creature})
        }
    }

    handleSizeChange = (value, option): void => {
        if (option.action === SelectEventTypesEnum.SELECT_OPTION) {
            const creature = this.state.creature;
            creature.creatureProperties.size = value.value;
            this.setState({creature: creature}, () => {
                if (
                    this.state.creature.creatureProperties.type === TypeEnum.SUMMON
                    || this.state.creature.creatureProperties.type === TypeEnum.MONSTER
                ) {
                    let hitDiceType = null;
                    switch (this.state.creature.creatureProperties.size) {
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
                    creature.creatureProperties.hitDice.diceType = hitDiceType;

                    if (creature.creatureProperties.hitDice.diceCount !== null) {
                        const averageHPCalculatorService = new AverageHPCalculatorService();
                        creature.creatureProperties.hitpoints =
                            averageHPCalculatorService.calculateAverageHP(creature.creatureProperties.hitDice);
                    }

                    this.setState({creature: creature});
                }
            });
        }
    }

    handleAlignmentChange = (value, option): void => {
        if (option.action === SelectEventTypesEnum.SELECT_OPTION) {
            const creature = this.state.creature;
            creature.creatureProperties.alignment = value.value;
            this.setState({creature: creature})
        }
    }

    handleCRChange = (event): void => {
        const creature = this.state.creature;
        creature.creatureProperties.challenge = null;
        if (!isNaN(parseInt(event.target.value))) {
            let valueAsNumber = parseInt(event.target.value);
            if (valueAsNumber > 30) {
                valueAsNumber = 30;
            }
            if (valueAsNumber < 0.125) {
                valueAsNumber = 0;
            }
            creature.creatureProperties.challenge = valueAsNumber;
            creature.creatureProperties.xp = this.crToXPService.getExperiencePointsByCRValue(valueAsNumber);
            creature.creatureProperties.proficiencyBonus =
                this.averageStatsTable.getMatchingEntriesByChallengeRating(valueAsNumber).proficiencyBonus;
        }
        this.setState({creature: creature})
    }

    handleStrengthChange = (event): void => {
        const creature = this.state.creature;
        creature.creatureProperties.stats.strength = null;
        if (!isNaN(parseInt(event.target.value))) {
            creature.creatureProperties.stats.strength = parseInt(event.target.value)
        }
        this.setState({creature: creature})
    };

    handleDexterityChange = (event): void => {
        const creature = this.state.creature;
        creature.creatureProperties.stats.dexterity = null;
        if (!isNaN(parseInt(event.target.value))) {
            creature.creatureProperties.stats.dexterity = parseInt(event.target.value)
        }
        this.setState({creature: creature})
    };

    handleConstitutionChange = (event): void => {
        const creature = this.state.creature;
        creature.creatureProperties.stats.constitution = null;
        if (!isNaN(parseInt(event.target.value))) {
            creature.creatureProperties.stats.constitution = parseInt(event.target.value)
        }
        if (creature.creatureProperties.hitDice.diceCount !== null) {
            creature.creatureProperties.hitDice.bonus =
                creature.creatureProperties.stats.getStatModifierForStatValue(
                    creature.creatureProperties.stats.constitution
                ) * creature.creatureProperties.hitDice.diceCount
        }
        if (creature.creatureProperties.hitDice.diceCount !== null
            && creature.creatureProperties.hitDice.diceType !== null
        ) {
            const averageHPCalculatorService = new AverageHPCalculatorService();
            creature.creatureProperties.hitpoints = averageHPCalculatorService.calculateAverageHP(creature.creatureProperties.hitDice)
        }
        this.setState({creature: creature})
    };

    handleIntelligenceChange = (event): void => {
        const creature = this.state.creature;
        creature.creatureProperties.stats.intelligence = null;
        if (!isNaN(parseInt(event.target.value))) {
            creature.creatureProperties.stats.intelligence = parseInt(event.target.value)
        }
        this.setState({creature: creature})
    };

    handleWisdomChange = (event): void => {
        const creature = this.state.creature;
        creature.creatureProperties.stats.wisdom = null;
        if (!isNaN(parseInt(event.target.value))) {
            creature.creatureProperties.stats.wisdom = parseInt(event.target.value)
        }
        this.setState({creature: creature})
    };

    handleCharismaChange = (event): void => {
        const creature = this.state.creature;
        creature.creatureProperties.stats.charisma = null;
        if (!isNaN(parseInt(event.target.value))) {
            creature.creatureProperties.stats.charisma = parseInt(event.target.value)
        }
        this.setState({creature: creature})
    };

    handleClassesAndLevelsChange = (classesAndLevels: ClassAndLevelViewModel[]): void => {
        const creature = this.state.creature;
        creature.creatureProperties.classesAndLevels = classesAndLevels;
        this.setState({creature: creature});
    };

    handleHitpointsChange = (event): void => {
        const creature = this.state.creature;
        creature.creatureProperties.hitpoints = null;
        if (!isNaN(parseInt(event.target.value))) {
            creature.creatureProperties.hitpoints = parseInt(event.target.value)
        }
        this.setState({creature: creature})
    };

    handleArmorClassChange = (event): void => {
        const creature = this.state.creature;
        creature.creatureProperties.armorclass = null;
        if (!isNaN(parseInt(event.target.value))) {
            let valueAsNumber = parseInt(event.target.value);
            if (valueAsNumber < 0) {
                valueAsNumber = 0;
            }
            creature.creatureProperties.armorclass = valueAsNumber;
        }
        this.setState({creature: creature})
    }

    handleLandSpeedChange = (event): void => {
        const creature = this.state.creature;
        if (!isNaN(parseInt(event.target.value))) {
            creature.creatureProperties.speed.land = parseInt(event.target.value);
        }
        this.setState({creature: creature});
    };

    handleAirSpeedChange = (event): void => {
        const creature = this.state.creature;
        if (!isNaN(parseInt(event.target.value))) {
            creature.creatureProperties.speed.air = parseInt(event.target.value);
        }
        this.setState({creature: creature});
    };

    handleWaterSpeedChange = (event): void => {
        const creature = this.state.creature;
        if (!isNaN(parseInt(event.target.value))) {
            creature.creatureProperties.speed.water = parseInt(event.target.value);
        }
        this.setState({creature: creature});
    };

    handleHitDiceTypeChange = (event): void => {
        const creature = this.state.creature;
        if (!isNaN(parseInt(event.target.value))) {
            creature.creatureProperties.hitDice.diceType = parseInt(event.target.value);
        }
        this.setState({creature: creature});
    };

    handleHitDiceCountChange = (event): void => {
        const creature = this.state.creature;
        if (!isNaN(parseInt(event.target.value))) {
            creature.creatureProperties.hitDice.diceCount = parseInt(event.target.value);
        }
        this.setState({creature: creature});
    }

    handleHitDiceBonusChange = (event): void => {
        const creature = this.state.creature;
        if (!isNaN(parseInt(event.target.value))) {
            creature.creatureProperties.hitDice.bonus = parseInt(event.target.value);
        }
        this.setState({creature: creature});
    }

    handleLanguagesChange = (value, option): void => {
        const creature = this.state.creature;
        if (
            option.action === SelectEventTypesEnum.CREATE_OPTION
            || option.action === SelectEventTypesEnum.SELECT_OPTION
        ) {
            creature.creatureProperties.languages = value.map(elem => {
                const alreadyKnownLanguage = this.state.creature.creatureProperties.languages.find(language => {
                    if (language.name === elem.value) {
                        return language;
                    }
                })
                if (alreadyKnownLanguage) {
                    return alreadyKnownLanguage;
                }
                const alreadyExistingLanguage = this.state.languagesToSelectFrom.find(language => {
                    if (language.name === elem.value) {
                        return language;
                    }
                })
                if (alreadyExistingLanguage) {
                    return new DND5LanguageViewModel(alreadyExistingLanguage.id, alreadyExistingLanguage.name)
                }
                return new DND5LanguageViewModel(null, elem.value)
            });
            this.setState({creature: creature})
        } else if (option.action === SelectEventTypesEnum.REMOVE_OPTION) {
            creature.creatureProperties.languages = creature.creatureProperties.languages.filter(language => {
                const possibleRemovalMatch = value.find(elem => {
                    if (elem.value === language.name) {
                        return elem;
                    }
                });
                if (!possibleRemovalMatch) {
                    return language;
                }
            })
        }
    };

    handleFeatsChange = (value, option): void => {
        const creature = this.state.creature;
        if (
            option.action === SelectEventTypesEnum.CREATE_OPTION
            || option.action === SelectEventTypesEnum.SELECT_OPTION
        ) {
            creature.creatureProperties.languages = value.map(elem => {
                const alreadyKnown = this.state.creature.creatureProperties.talents.find(talent => {
                    if (talent.name === elem.value) {
                        return talent;
                    }
                })
                if (alreadyKnown) {
                    return alreadyKnown;
                }
                const alreadyExisting = this.state.talentsToSelectFrom.find(talent => {
                    if (talent.name === elem.value) {
                        return talent;
                    }
                })
                return new DND5TalentViewModel(
                    alreadyExisting.id,
                    alreadyExisting.name,
                    alreadyExisting.condition,
                    alreadyExisting.benefit
                );
            });
            this.setState({creature: creature})
        } else if (option.action === SelectEventTypesEnum.REMOVE_OPTION) {
            creature.creatureProperties.talents = creature.creatureProperties.talents.filter(talent => {
                const possibleRemovalMatch = value.find(elem => {
                    if (elem.value === talent.name) {
                        return elem;
                    }
                });
                if (!possibleRemovalMatch) {
                    return talent;
                }
            });
        }
    };

    handleSkillsChange = (value, option): void => {
        const creature = this.state.creature;
        if (
            option.action === SelectEventTypesEnum.CREATE_OPTION
            || option.action === SelectEventTypesEnum.SELECT_OPTION
        ) {
            creature.creatureProperties.skills = value.map(elem => {
                const alreadyKnown = this.state.creature.creatureProperties.skills.find(skill => {
                    if (skill.name === elem.value) {
                        return skill;
                    }
                })
                if (alreadyKnown) {
                    return alreadyKnown;
                }
                const alreadyExisting = this.state.skillsToSelectFrom.find(skill => {
                    if (skill.name === elem.value) {
                        return skill;
                    }
                })
                return new DND5SkillViewModel(
                    alreadyExisting.id,
                    alreadyExisting.name,
                );
            });
            this.setState({creature: creature})
        } else if (option.action === SelectEventTypesEnum.REMOVE_OPTION) {
            creature.creatureProperties.skills = creature.creatureProperties.skills.filter(skill => {
                const possibleRemovalMatch = value.find(elem => {
                    if (elem.value === skill.name) {
                        return elem;
                    }
                });
                if (!possibleRemovalMatch) {
                    return skill;
                }
            });
        }
    };

    handleSensesChange = (senses: DND5SenseViewModel[]): void => {
        const creature = this.state.creature;
        creature.creatureProperties.senses = senses;
        this.setState({creature})
    };

    handleAddSpell = (spellModel: DND5SpellViewModel): void => {
        const creature = this.state.creature;
        creature.creatureProperties.spells.push(spellModel);
        this.setState({creature: creature});
    }

    handleRemoveSpell = (spellId: string): void => {
        const creature = this.state.creature;
        creature.creatureProperties.spells = creature.creatureProperties.spells.filter(spell => {
            return spell.id !== spellId
        })
        this.setState({creature: creature});
    }

    handleAddInnateSpell = (innateSpell: DND5InnateSpellViewModel): void => {
        const creature = this.state.creature;
        creature.creatureProperties.innateSpells.addInnateSpell(innateSpell);
        this.setState({creature: creature});
    }

    handleRemoveInnateSpell = (innateSpell: DND5InnateSpellViewModel): void => {
        const creature = this.state.creature;
        creature.creatureProperties.innateSpells.removeInnateSpell(innateSpell);
        this.setState({creature: creature});
    }

    render(): ReactNode {
        return (
            <div className={style.container}>
                <div className={style.creatureFormContainer}>
                    {/*Name Creaturetype and Type*/}
                    <div className={style.formSection}>
                        <NameCreatureTypeAndTypeFormSectionHeader
                            name={this.state.creature.name}
                            type={this.state.creature.creatureProperties.type}
                        />
                        <NameCreatureTypeAndTypeFormSection
                            name={this.state.creature.name}
                            creatureType={this.state.creature.creatureProperties.creatureType}
                            changeCreatureType={this.handleCreatureTypeChange}
                            type={this.state.creature.creatureProperties.type}
                            changeName={this.handleNameChange}
                            changeType={this.handleTypeChange}
                            changeEnforceClassLevels={this.handleEnforceClassLevelsChange}
                            classLevelsEnforced={this.state.enforceClassLevels}
                        />
                    </div>
                    {/*Size Alignment and Challenge*/}
                    <div className={style.formSection}>
                        <SizeAlignmentAndChallengeFormSectionHeader
                            size={this.state.creature.creatureProperties.size}
                            challenge={this.state.creature.creatureProperties.challenge}
                            alignment={this.state.creature.creatureProperties.alignment}
                            type={this.state.creature.creatureProperties.type}
                        />
                        {
                            this.formSectionDisplayRuleService.shouldDisplaySizeAndAlignmentSection(this.state.creature.name, this.state.creature.creatureProperties.type)
                            &&
                            <SizeAlignmentAndChallengeFormSection
                                size={this.state.creature.creatureProperties.size}
                                changeSize={this.handleSizeChange}
                                challenge={this.state.creature.creatureProperties.getPrimitiveAttributeAsString(
                                    this.state.creature.creatureProperties.challenge
                                )}
                                changeChallenge={this.handleCRChange}
                                alignment={this.state.creature.creatureProperties.alignment}
                                changeAlignment={this.handleAlignmentChange}
                                type={this.state.creature.creatureProperties.type}
                            />
                        }
                    </div>
                    {/*Abilities*/}
                    <div className={style.formSection}>
                        <StatBlockFormSectionHeader stats={this.state.creature.creatureProperties.stats}/>
                        {
                            this.formSectionDisplayRuleService.shouldDisplayStatBlockSection(this.state.creature.creatureProperties.size, this.state.creature.creatureProperties.alignment)
                            &&
                            <StatBlockFormSection
                                strength={this.state.creature.creatureProperties.getPrimitiveAttributeAsString(
                                    this.state.creature.creatureProperties.stats.strength
                                )}
                                changeStrength={this.handleStrengthChange}
                                dexterity={this.state.creature.creatureProperties.getPrimitiveAttributeAsString(
                                    this.state.creature.creatureProperties.stats.dexterity
                                )}
                                changeDexterity={this.handleDexterityChange}
                                constitution={this.state.creature.creatureProperties.getPrimitiveAttributeAsString(
                                    this.state.creature.creatureProperties.stats.constitution
                                )}
                                changeConstitution={this.handleConstitutionChange}
                                intelligence={this.state.creature.creatureProperties.getPrimitiveAttributeAsString(
                                    this.state.creature.creatureProperties.stats.intelligence
                                )}
                                changeIntelligence={this.handleIntelligenceChange}
                                wisdom={this.state.creature.creatureProperties.getPrimitiveAttributeAsString(
                                    this.state.creature.creatureProperties.stats.wisdom
                                )}
                                changeWisdom={this.handleWisdomChange}
                                charisma={this.state.creature.creatureProperties.getPrimitiveAttributeAsString(
                                    this.state.creature.creatureProperties.stats.charisma
                                )}
                                changeCharisma={this.handleCharismaChange}
                            />
                        }
                    </div>
                    {/*Classes and levels*/}
                    <div className={style.formSection}>
                        <ClassesAndLevelsFormSectionHeader
                            classesAndLevels={this.state.creature.creatureProperties.classesAndLevels}
                            type={this.state.creature.creatureProperties.type}
                            enforced={this.state.enforceClassLevels}
                        />
                        {
                            this.formSectionDisplayRuleService.shouldDisplayClassesAndLevelsSection(
                                this.state.enforceClassLevels,
                                this.state.creature.creatureProperties.type,
                                this.state.creature.creatureProperties.stats
                            ) &&
                            <ClassesAndLevelsFormSection
                                classesAndLevels={this.state.creature.creatureProperties.classesAndLevels}
                                changeClassesAndLevels={this.handleClassesAndLevelsChange}
                                changeHitDiceCount={this.handleHitDiceCountChange}
                                changeHitDiceType={this.handleHitDiceTypeChange}
                            />
                        }
                    </div>
                    {/*HP Speed and AC*/}
                    <div className={style.formSection}>
                        <HPSpeedAndACFormSectionHeader
                            hp={this.state.creature.creatureProperties.hitpoints}
                            ac={this.state.creature.creatureProperties.armorclass}
                            speed={this.state.creature.creatureProperties.speed}
                            hitDice={this.state.creature.creatureProperties.hitDice}
                        />
                        {
                            this.formSectionDisplayRuleService.shouldDisplayHPSpeedAndACPlayerSection(
                                this.state.creature.creatureProperties.type,
                                this.state.creature.creatureProperties.stats
                            ) &&
                            <HPSpeedAndACPlayerFormSection
                                hp={this.state.creature.creatureProperties.getPrimitiveAttributeAsString(
                                    this.state.creature.creatureProperties.hitpoints
                                )}
                                changeHP={this.handleHitpointsChange}
                                ac={this.state.creature.creatureProperties.getPrimitiveAttributeAsString(
                                    this.state.creature.creatureProperties.armorclass
                                )}
                                changeAC={this.handleArmorClassChange}
                                speed={this.state.creature.creatureProperties.speed}
                                changeLandSpeed={this.handleLandSpeedChange}
                                changeAirSpeed={this.handleAirSpeedChange}
                                changeWaterSpeed={this.handleWaterSpeedChange}
                                classesAndLevels={this.state.creature.creatureProperties.classesAndLevels}
                            />
                        }
                        {
                            this.formSectionDisplayRuleService.shouldDisplayHPSpeedAndACMonsterSection(
                                this.state.creature.creatureProperties.type,
                                this.state.creature.creatureProperties.stats
                            ) &&
                            <HPSpeedAndACMonsterFormSection
                                hp={this.state.creature.creatureProperties.getPrimitiveAttributeAsString(
                                    this.state.creature.creatureProperties.hitpoints
                                )}
                                changeHP={this.handleHitpointsChange}
                                ac={this.state.creature.creatureProperties.getPrimitiveAttributeAsString(
                                    this.state.creature.creatureProperties.armorclass
                                )}
                                changeAC={this.handleArmorClassChange}
                                constitutionMod={this.state.creature.creatureProperties.stats.getStatModifierForStatValue(
                                    this.state.creature.creatureProperties.stats.constitution
                                )}
                                speed={this.state.creature.creatureProperties.speed}
                                changeLandSpeed={this.handleLandSpeedChange}
                                changeAirSpeed={this.handleAirSpeedChange}
                                changeWaterSpeed={this.handleWaterSpeedChange}
                                size={this.state.creature.creatureProperties.size}
                                hitDice={this.state.creature.creatureProperties.hitDice}
                                changeHitDiceCount={this.handleHitDiceCountChange}
                                changeHitDiceBonus={this.handleHitDiceBonusChange}
                                averageAC={this.averageStatsTable.getMatchingEntriesByChallengeRating(
                                    this.state.creature.creatureProperties.challenge
                                ).armorClass}
                                averageHP={this.averageStatsTable.getMatchingEntriesByChallengeRating(
                                    this.state.creature.creatureProperties.challenge
                                ).hitPointsRange}
                            />
                        }
                    </div>
                    {/*Languages Feats Senses and Skills*/}
                    <div className={style.formSection}>
                        <LanguagesFeatsSensesAndSkillsFormSectionHeader/>
                        {
                            this.formSectionDisplayRuleService.shouldDisplayLanguagesFeatsSensesAndSkillsSection(
                                this.state.creature.creatureProperties.hitpoints,
                                this.state.creature.creatureProperties.armorclass,
                                this.state.creature.creatureProperties.speed,
                                this.state.creature.creatureProperties.hitDice
                            ) &&
                            <LanguagesFeatsSensesAndSkillsFormSection
                                languages={this.state.creature.creatureProperties.languages}
                                selectableLanguages={this.state.languagesToSelectFrom}
                                changeLanguages={this.handleLanguagesChange}
                                feats={this.state.creature.creatureProperties.talents}
                                selectableFeats={this.state.talentsToSelectFrom}
                                changeFeats={this.handleFeatsChange}
                                senses={this.state.creature.creatureProperties.senses}
                                changeSenses={this.handleSensesChange}
                                skills={this.state.creature.creatureProperties.skills}
                                selectableSkills={this.state.skillsToSelectFrom}
                                changeSkills={this.handleSkillsChange}
                            />
                        }
                    </div>
                    {/*Spells and/or innate spell casting*/}
                    <div className={style.formSection}>
                        <SpellsFormSectionHeader />
                        <SpellsFormSection
                            handleAddSlotSpell={this.handleAddSpell}
                            handleAddInnateSpell={this.handleAddInnateSpell}
                            handleRemoveSlotSpell={this.handleRemoveSpell}
                            handleRemoveInnateSpell={this.handleRemoveInnateSpell}
                            chosenSlotSpells={this.state.creature.creatureProperties.spells}
                            chosenInnateSpells={this.state.creature.creatureProperties.innateSpells}
                            shouldDisplaySpellsSection={this.formSectionDisplayRuleService.shouldDisplaySpellsSection(
                                this.state.creature.creatureProperties.hitpoints,
                                this.state.creature.creatureProperties.armorclass,
                                this.state.creature.creatureProperties.speed,
                                this.state.creature.creatureProperties.hitDice
                            )}
                            shouldDisplaySpellsWithSlotsSection={
                                this.formSectionDisplayRuleService.shouldDisplaySpellsWithSlotsSection(
                                    this.state.enforceClassLevels,
                                    this.state.creature.creatureProperties.type
                                )
                            }
                            shouldDisplaySwitchForInnateSpellCasting={
                                this.formSectionDisplayRuleService.shouldDisplayInnateSpellCastingOrSpellChoiceSwitch(
                                    this.state.creature.creatureProperties.type
                                )
                            }
                        />
                    </div>
                    {/*Actions*/}
                    <div className={style.formSection}>
                    </div>
                    {/*Attack Properties and Reactions*/}
                    <div className={style.formSection}>
                    </div>
                    {/*Damage Vuln/Res/immununities and Condition immunities*/}
                    <div className={style.formSection}>
                    </div>
                    {/*Legendary Actions*/}
                    <div className={style.formSection}>
                    </div>
                </div>
                <div className={style.creatureCardContainer}>
                    <DND5CreatureCard creature={this.state.creature}/>
                </div>
            </div>
        )
    }
}