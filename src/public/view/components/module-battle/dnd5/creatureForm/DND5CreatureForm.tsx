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
import {ClassAndLevelViewModel} from "@/public/model/dataModel/ClassAndLevelViewModel";
import {AverageStatsTable} from "@/public/model/dataModel/dnd5/AverageStatsTable";
import {HPSpeedAndACPlayerFormSection} from "@/public/view/components/module-battle/dnd5/creatureForm/components/hpAndAcPlayerFormSection/HPSpeedAndACPlayerFormSection";
import {HPSpeedAndACMonsterFormSection} from "@/public/view/components/module-battle/dnd5/creatureForm/components/hpAndAcMonsterFormSection/HPSpeedAndACMonsterFormSection";
import {HPSpeedAndACFormSectionHeader} from "@/public/view/components/module-battle/dnd5/creatureForm/components/headers/HPSpeedAndACFormSectionHeader";
import {LanguagesFeatsSensesAndSkillsFormSection} from "@/public/view/components/module-battle/dnd5/creatureForm/components/languagesFeatsSensesAndSkills/LanguagesFeatsSensesAndSkillsFormSection";
import {LanguagesFeatsSensesAndSkillsFormSectionHeader} from "@/public/view/components/module-battle/dnd5/creatureForm/components/headers/LanguagesFeatsSensesAndSkillsFormSectionHeader";
import {SenseViewModel} from "@/public/model/dataModel/dnd5/SenseViewModel";
import {AverageHPCalculatorService} from "@/public/service/dnd5/AverageHPCalculatorService";
import {FormSectionDisplayRuleService} from "@/public/service/dnd5/FormSectionDisplayRuleService";
import {SpellsFormSectionHeader} from "@/public/view/components/module-battle/dnd5/creatureForm/components/headers/SpellsFormSectionHeader";
import {SpellsFormSection} from "@/public/view/components/module-battle/dnd5/creatureForm/components/spellFormSection/SpellsFormSection";
import {InnateSpellViewModel} from "@/public/model/dataModel/dnd5/InnateSpellViewModel";
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
    private averageStatsTable: AverageStatsTable;
    private formSectionDisplayRuleService: FormSectionDisplayRuleService;

    constructor(props) {
        super(props);
        this.crToXPService = new CRToExperiencePointsConverterService();
        this.creatureViewModelFactory = new CreatureViewModelFactory();
        this.averageStatsTable = AverageStatsTable.create();
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
            creature.properties.type = value.value;
            this.setState({creature: creature})
        }
    }

    handleEnforceClassLevelsChange = (value): void => {
        this.setState({enforceClassLevels: value})
    }

    handleCreatureTypeChange = (value, option): void => {
        if (option.action === SelectEventTypesEnum.SELECT_OPTION) {
            const creature = this.state.creature;
            creature.properties.creatureType = value.value;
            this.setState({creature: creature})
        }
    }

    handleSizeChange = (value, option): void => {
        if (option.action === SelectEventTypesEnum.SELECT_OPTION) {
            const creature = this.state.creature;
            creature.properties.size = value.value;
            this.setState({creature: creature}, () => {
                if (
                    this.state.creature.properties.type === TypeEnum.SUMMON
                    || this.state.creature.properties.type === TypeEnum.MONSTER
                ) {
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

                    if (creature.properties.hitDice.diceCount !== null) {
                        const averageHPCalculatorService = new AverageHPCalculatorService();
                        creature.properties.hitpoints =
                            averageHPCalculatorService.calculateAverageHP(creature.properties.hitDice);
                    }

                    this.setState({creature: creature});
                }
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
            creature.properties.proficiencyBonus =
                this.averageStatsTable.getMatchingEntriesByChallengeRating(valueAsNumber).proficiencyBonus;
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
        if (creature.properties.hitDice.diceCount !== null) {
            creature.properties.hitDice.bonus =
                creature.properties.stats.getStatModifierForStatValue(
                    creature.properties.stats.constitution
                ) * creature.properties.hitDice.diceCount
        }
        if (creature.properties.hitDice.diceCount !== null
            && creature.properties.hitDice.diceType !== null
        ) {
            const averageHPCalculatorService = new AverageHPCalculatorService();
            creature.properties.hitpoints = averageHPCalculatorService.calculateAverageHP(creature.properties.hitDice)
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

    handleLandSpeedChange = (event): void => {
        const creature = this.state.creature;
        if (!isNaN(parseInt(event.target.value))) {
            creature.properties.speed.land = parseInt(event.target.value);
        }
        this.setState({creature: creature});
    };

    handleAirSpeedChange = (event): void => {
        const creature = this.state.creature;
        if (!isNaN(parseInt(event.target.value))) {
            creature.properties.speed.air = parseInt(event.target.value);
        }
        this.setState({creature: creature});
    };

    handleWaterSpeedChange = (event): void => {
        const creature = this.state.creature;
        if (!isNaN(parseInt(event.target.value))) {
            creature.properties.speed.water = parseInt(event.target.value);
        }
        this.setState({creature: creature});
    };

    handleHitDiceTypeChange = (event): void => {
        const creature = this.state.creature;
        if (!isNaN(parseInt(event.target.value))) {
            creature.properties.hitDice.diceType = parseInt(event.target.value);
        }
        this.setState({creature: creature});
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

    handleLanguagesChange = (value, option): void => {
        const creature = this.state.creature;
        if (
            option.action === SelectEventTypesEnum.CREATE_OPTION
            || option.action === SelectEventTypesEnum.SELECT_OPTION
        ) {
            creature.properties.languages = value.map(elem => {
                const alreadyKnownLanguage = this.state.creature.properties.languages.find(language => {
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
            creature.properties.languages = creature.properties.languages.filter(language => {
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
            creature.properties.languages = value.map(elem => {
                const alreadyKnown = this.state.creature.properties.talents.find(talent => {
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
            creature.properties.talents = creature.properties.talents.filter(talent => {
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
            creature.properties.skills = value.map(elem => {
                const alreadyKnown = this.state.creature.properties.skills.find(skill => {
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
            creature.properties.skills = creature.properties.skills.filter(skill => {
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

    handleSensesChange = (senses: SenseViewModel[]): void => {
        const creature = this.state.creature;
        creature.properties.senses = senses;
        this.setState({creature})
    };

    handleAddSpell = (spellModel: DND5SpellViewModel): void => {
        const creature = this.state.creature;
        creature.properties.spells.push(spellModel);
        this.setState({creature: creature});
    }

    handleRemoveSpell = (spellId: string): void => {
        const creature = this.state.creature;
        creature.properties.spells = creature.properties.spells.filter(spell => {
            return spell.id !== spellId
        })
        this.setState({creature: creature});
    }

    handleAddInnateSpell = (innateSpell: InnateSpellViewModel): void => {
        const creature = this.state.creature;
        creature.properties.innateSpells.addInnateSpell(innateSpell);
        this.setState({creature: creature});
    }

    handleRemoveInnateSpell = (innateSpell: InnateSpellViewModel): void => {
        const creature = this.state.creature;
        creature.properties.innateSpells.removeInnateSpell(innateSpell);
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
                            type={this.state.creature.properties.type}
                        />
                        <NameCreatureTypeAndTypeFormSection
                            name={this.state.creature.name}
                            creatureType={this.state.creature.properties.creatureType}
                            changeCreatureType={this.handleCreatureTypeChange}
                            type={this.state.creature.properties.type}
                            changeName={this.handleNameChange}
                            changeType={this.handleTypeChange}
                            changeEnforceClassLevels={this.handleEnforceClassLevelsChange}
                            classLevelsEnforced={this.state.enforceClassLevels}
                        />
                    </div>
                    {/*Size Alignment and Challenge*/}
                    <div className={style.formSection}>
                        <SizeAlignmentAndChallengeFormSectionHeader
                            size={this.state.creature.properties.size}
                            challenge={this.state.creature.properties.challenge}
                            alignment={this.state.creature.properties.alignment}
                            type={this.state.creature.properties.type}
                        />
                        {
                            this.formSectionDisplayRuleService.shouldDisplaySizeAndAlignmentSection(this.state.creature.name, this.state.creature.properties.type)
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
                    {/*Abilities*/}
                    <div className={style.formSection}>
                        <StatBlockFormSectionHeader stats={this.state.creature.properties.stats}/>
                        {
                            this.formSectionDisplayRuleService.shouldDisplayStatBlockSection(this.state.creature.properties.size, this.state.creature.properties.alignment)
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
                    {/*Classes and levels*/}
                    <div className={style.formSection}>
                        <ClassesAndLevelsFormSectionHeader
                            classesAndLevels={this.state.creature.properties.classesAndLevels}
                            type={this.state.creature.properties.type}
                            enforced={this.state.enforceClassLevels}
                        />
                        {
                            this.formSectionDisplayRuleService.shouldDisplayClassesAndLevelsSection(
                                this.state.enforceClassLevels,
                                this.state.creature.properties.type,
                                this.state.creature.properties.stats
                            ) &&
                            <ClassesAndLevelsFormSection
                                classesAndLevels={this.state.creature.properties.classesAndLevels}
                                changeClassesAndLevels={this.handleClassesAndLevelsChange}
                                changeHitDiceCount={this.handleHitDiceCountChange}
                                changeHitDiceType={this.handleHitDiceTypeChange}
                            />
                        }
                    </div>
                    {/*HP Speed and AC*/}
                    <div className={style.formSection}>
                        <HPSpeedAndACFormSectionHeader
                            hp={this.state.creature.properties.hitpoints}
                            ac={this.state.creature.properties.armorclass}
                            speed={this.state.creature.properties.speed}
                            hitDice={this.state.creature.properties.hitDice}
                        />
                        {
                            this.formSectionDisplayRuleService.shouldDisplayHPSpeedAndACPlayerSection(
                                this.state.creature.properties.type,
                                this.state.creature.properties.stats
                            ) &&
                            <HPSpeedAndACPlayerFormSection
                                hp={this.state.creature.properties.getPrimitiveAttributeAsString(
                                    this.state.creature.properties.hitpoints
                                )}
                                changeHP={this.handleHitpointsChange}
                                ac={this.state.creature.properties.getPrimitiveAttributeAsString(
                                    this.state.creature.properties.armorclass
                                )}
                                changeAC={this.handleArmorClassChange}
                                speed={this.state.creature.properties.speed}
                                changeLandSpeed={this.handleLandSpeedChange}
                                changeAirSpeed={this.handleAirSpeedChange}
                                changeWaterSpeed={this.handleWaterSpeedChange}
                                classesAndLevels={this.state.creature.properties.classesAndLevels}
                            />
                        }
                        {
                            this.formSectionDisplayRuleService.shouldDisplayHPSpeedAndACMonsterSection(
                                this.state.creature.properties.type,
                                this.state.creature.properties.stats
                            ) &&
                            <HPSpeedAndACMonsterFormSection
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
                                changeLandSpeed={this.handleLandSpeedChange}
                                changeAirSpeed={this.handleAirSpeedChange}
                                changeWaterSpeed={this.handleWaterSpeedChange}
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
                    {/*Languages Feats Senses and Skills*/}
                    <div className={style.formSection}>
                        <LanguagesFeatsSensesAndSkillsFormSectionHeader/>
                        {
                            this.formSectionDisplayRuleService.shouldDisplayLanguagesFeatsSensesAndSkillsSection(
                                this.state.creature.properties.hitpoints,
                                this.state.creature.properties.armorclass,
                                this.state.creature.properties.speed,
                                this.state.creature.properties.hitDice
                            ) &&
                            <LanguagesFeatsSensesAndSkillsFormSection
                                languages={this.state.creature.properties.languages}
                                selectableLanguages={this.state.languagesToSelectFrom}
                                changeLanguages={this.handleLanguagesChange}
                                feats={this.state.creature.properties.talents}
                                selectableFeats={this.state.talentsToSelectFrom}
                                changeFeats={this.handleFeatsChange}
                                senses={this.state.creature.properties.senses}
                                changeSenses={this.handleSensesChange}
                                skills={this.state.creature.properties.skills}
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
                            chosenSlotSpells={this.state.creature.properties.spells}
                            chosenInnateSpells={this.state.creature.properties.innateSpells}
                            shouldDisplaySpellsSection={this.formSectionDisplayRuleService.shouldDisplaySpellsSection(
                                this.state.creature.properties.hitpoints,
                                this.state.creature.properties.armorclass,
                                this.state.creature.properties.speed,
                                this.state.creature.properties.hitDice
                            )}
                            shouldDisplaySpellsWithSlotsSection={
                                this.formSectionDisplayRuleService.shouldDisplaySpellsWithSlotsSection(
                                    this.state.enforceClassLevels,
                                    this.state.creature.properties.type
                                )
                            }
                            shouldDisplaySwitchForInnateSpellCasting={
                                this.formSectionDisplayRuleService.shouldDisplayInnateSpellCastingOrSpellChoiceSwitch(
                                    this.state.creature.properties.type
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