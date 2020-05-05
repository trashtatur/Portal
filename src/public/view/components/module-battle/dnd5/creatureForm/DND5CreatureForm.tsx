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

    };

    handleDexterityChange = (event): void => {

    };

    handleConstitutionChange = (event): void => {

    };

    handleIntelligenceChange = (event): void => {

    };

    handleWisdomChange = (event): void => {

    };

    handleCharismaChange = (event): void => {

    };

    render(): ReactNode {
        return (
            <div className={style.container}>
                <div className={style.creatureFormContainer}>
                    <div className={style.formSection}>
                        <InitialDND5CreatureFormFormSection
                            name={this.state.creature.name}
                            challenge={
                                this.state.creature.properties.getPrimitiveAttributeAsString(
                                    this.state.creature.properties.challenge
                                )}
                            changeName={this.handleNameChange}
                            changeChallenge={this.handleCRChange}
                        />
                    </div>
                    <div className={style.formSection}>
                        {
                            this.state.creature.properties.challenge !== null &&
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

                </div>
            </div>
        )
    }
}