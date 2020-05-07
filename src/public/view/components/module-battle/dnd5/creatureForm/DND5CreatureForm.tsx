import * as React from 'react';
import {ReactNode} from 'react';
import {DND5CreaturePropertiesViewModel} from "../../../../../model/dnd5/DND5CreaturePropertiesViewModel";
import {CreatureViewModel} from "../../../../../model/CreatureViewModel";
import {DND5LanguageViewModel} from "../../../../../model/dnd5/DND5LanguageViewModel";
import {DND5SpellViewModel} from "../../../../../model/dnd5/DND5SpellViewModel";
import {DND5TalentViewModel} from "../../../../../model/dnd5/DND5TalentViewModel";
import {DND5ActionViewModel} from "../../../../../model/dnd5/DND5ActionViewModel";
import {DND5SkillViewModel} from "../../../../../model/dnd5/DND5SkillViewModel";
import {CreatureViewModelFactory} from "../../../../../factory/CreatureViewModelFactory";
import {CRToExperiencePointsConverterService} from "../../../../../service/dnd5/CRToExperiencePointsConverterService";
import {CRToProficiencyConverterService} from "../../../../../service/dnd5/CRToProficiencyConverterService";
import {InitialDND5CreatureFormFormSection} from "./InitialDND5CreatureFormFormSection";
import {StatBlockFormSection} from "./StatBlockFormSection";
import {InitialDND5CreatureFormSectionHeader} from "./headers/InitialDND5CreatureFormSectionHeader";
import {StatBlockFormSectionHeader} from "./headers/StatBlockFormSectionHeader";
import {SizeAndChallengeFormSection} from "./SizeAndChallengeFormSection";
import {SizeAndChallengeFormSectionHeader} from "./headers/SizeAndChallengeFormSectionHeader";
import {TypeEnum} from "../../../../../model/enumeration/TypesEnum";
import {SelectEventTypesEnum} from "../../../../../model/enumeration/SelectEventTypesEnum";
import {DND5CreatureSizesEnum} from "../../../../../model/enumeration/dnd5/DND5CreatureSizesEnum";
import {DND5CreatureCard} from "../creatureCard/DND5CreatureCard";
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

    constructor(props) {
        super(props);
        this.crToXPService = new CRToExperiencePointsConverterService();
        this.crToProficiencyService = new CRToProficiencyConverterService();
        this.creatureViewModelFactory = new CreatureViewModelFactory();
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
            this.setState({creature: creature})
        }
    }

    handleCRChange = (event): void => {
        const creature = this.state.creature;
        creature.properties.challenge = null;
        if (!isNaN(parseInt(event.target.value))) {
            const valueAsNumber = parseInt(event.target.value);
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

    render(): ReactNode {
        return (
            <div className={style.container}>
                <div className={style.creatureFormContainer}>
                    <div className={style.formSection}>
                        <InitialDND5CreatureFormSectionHeader
                            name={this.state.creature.name}
                            type={this.state.creature.properties.type}
                        />
                        <InitialDND5CreatureFormFormSection
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
                        <SizeAndChallengeFormSectionHeader
                            size={this.state.creature.properties.size}
                            challenge={this.state.creature.properties.challenge}
                            type={this.state.creature.properties.type}
                        />
                        {
                            this.state.creature.name !== ''
                            && this.state.creature.properties.type !== TypeEnum.NONE
                            &&
                            <SizeAndChallengeFormSection
                                size={this.state.creature.properties.size}
                                changeSize={this.handleSizeChange}
                                challenge={this.state.creature.properties.getPrimitiveAttributeAsString(
                                    this.state.creature.properties.challenge
                                )}
                                changeChallenge={this.handleCRChange}
                                type={this.state.creature.properties.type}
                            />
                        }
                    </div>
                    <div className={style.formSection}>
                        <StatBlockFormSectionHeader stats={this.state.creature.properties.stats}/>
                        {
                            this.state.creature.properties.size !== DND5CreatureSizesEnum.NONE
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

                </div>
                <div className={style.creatureCardContainer}>
                    <DND5CreatureCard creature={this.state.creature} />
                </div>
            </div>
        )
    }
}