import * as React from 'react';
import {CSSProperties, ReactNode} from 'react';
import {creature} from "../../componentTypes";
import {createSummonedCreature} from "./helper/summonedCreatureFactory";
import Dropzone from "react-dropzone-uploader";
import Switch from "react-switch";
import {setCreatureImageName, uploadImage} from "../../helper/helperFunctions";
import axios from "axios";
import * as style from './addSummon.css';

interface AddSummonProps {
    addToEncounter: Function;
}

interface AddSummonState {
    isDisplayed: boolean;
    summonedCreature: creature;
    submitToDB: boolean;
    howMany: number | string;
}

const IS_DISPLAYED: CSSProperties = {visibility: "visible", opacity: 1, maxHeight: "500px", marginTop: "20px"};
const IS_NOT_DISPLAYED: CSSProperties = {visibility: "hidden", opacity: 0, maxHeight: "0px", marginTop: "-200px"};

export class AddSummon extends React.Component<AddSummonProps, AddSummonState> {

    constructor(props) {
        super(props);
        this.state = {
            isDisplayed: false,
            summonedCreature: createSummonedCreature(),
            submitToDB: false,
            howMany: 1,
        }
    }

    handleSubmit = async (event): Promise<void> => {
        event.preventDefault();
        if (this.state.submitToDB) {
            uploadImage(
                this.state.summonedCreature.image,
                this.state.summonedCreature.name,
                this.state.summonedCreature.challenge
            );
            try {
                await axios.post('/V1/Creature', setCreatureImageName(this.state.summonedCreature));
                alert('Created entry in database');
            } catch (error) {
                console.log(error)
            }
        }
        this.addSummonsToEncounter();
        this.setState({summonedCreature: createSummonedCreature()})
    };

    addSummonsToEncounter = (): void => {
        for(let i=0; i < this.state.howMany; i++) {
            this.props.addToEncounter(this.state.summonedCreature);
        }
    }

    handleImageChange = ({meta, file}, status): void => {
        const creature = this.state.summonedCreature;
        creature.image = file;
        this.setState({summonedCreature: creature});
        if (status === "removed") {
            creature.image = null;
            this.setState({summonedCreature: creature})
        }
    };

    handleNameChange = (event): void => {
        const summonedCreature = this.state.summonedCreature;
        summonedCreature.name = event.target.value;
        this.setState({summonedCreature: summonedCreature})
    };

    handleHitpointsChange = (event): void => {
        const summonedCreature = this.state.summonedCreature;
        summonedCreature.hitpoints = '';
        if (!isNaN(parseInt(event.target.value))) summonedCreature.hitpoints = event.target.value;
        this.setState({summonedCreature: summonedCreature})
    };

    handleArmorClassChange = (event): void => {
        const summonedCreature = this.state.summonedCreature;
        summonedCreature.armorclass = '';
        if (!isNaN(parseInt(event.target.value))) summonedCreature.armorclass = event.target.value;
        this.setState({summonedCreature: summonedCreature})
    };

    handleIniChange = (event): void => {
        const summonedCreature = this.state.summonedCreature;
        summonedCreature.ini = '';
        if (!isNaN(parseInt(event.target.value))) summonedCreature.ini = event.target.value;
        this.setState({summonedCreature: summonedCreature})
    };

    handleSubmitToDBChange = (event): void => {
        this.setState({submitToDB: event})
    };

    handleHowManyChange = (event): void => {
        let howMany = '';
        if (!isNaN(parseInt(event.target.value))) howMany = event.target.value;
        this.setState({howMany: howMany})
    };

    shouldDisplay = (): CSSProperties => {
        if (this.state.isDisplayed) {
            return IS_DISPLAYED;
        }
        return IS_NOT_DISPLAYED;
    };

    toggleDisplayForm = (): void => {
        this.setState({isDisplayed: !this.state.isDisplayed})
    };

    render(): ReactNode {
        return (
            <div className={style.addSummonDialog}>
                <img
                    className={style.summonDialogButton} src={'images/summon-button.png'}
                    onClick={this.toggleDisplayForm}
                    alt={"open summon form"}
                />
                <div className={style.addSummonFormContainer} style={this.shouldDisplay()}>
                    <h3 className={style.summonFormHeader}>Summon a creature</h3>
                    <form className={style.summonForm} onSubmit={this.handleSubmit}>
                        <div className={style.summonFormSection}>
                            <label className={style.summonFormTextInputLabel}>
                                Name:
                                <input
                                    className={style.SummonFormTextInputField}
                                    value={this.state.summonedCreature.name}
                                    onChange={this.handleNameChange}
                                    required
                                />
                            </label>
                            <label className={style.summonFormTextInputLabel}>
                                Hitpoints:
                                <input
                                    className={style.SummonFormTextInputField}
                                    type={"number"}
                                    value={this.state.summonedCreature.hitpoints}
                                    onChange={this.handleHitpointsChange}
                                    required
                                />
                            </label>
                            <label className={style.summonFormTextInputLabel}>
                                Armorclass:
                                <input
                                    className={style.SummonFormTextInputField}
                                    type={"number"}
                                    value={this.state.summonedCreature.armorclass}
                                    onChange={this.handleArmorClassChange}
                                    required
                                />
                            </label>
                            <label className={style.summonFormTextInputLabel}>
                                Ini:
                                <input
                                    className={style.SummonFormTextInputField}
                                    type={"number"}
                                    value={this.state.summonedCreature.ini}
                                    onChange={this.handleIniChange}
                                    required
                                />
                            </label>
                        </div>
                        <div className={style.summonFormSection}>
                            <label>
                                <Dropzone
                                    onChangeStatus={this.handleImageChange}
                                    maxFiles={1}
                                    multiple={false}
                                    canCancel={false}
                                    accept="image/*"
                                    inputContent="Drop an Image"
                                    styles={{
                                        dropzone: {
                                            width: "12em",
                                            height: "6em",
                                            float: "right",
                                            color: "lightgrey",
                                            overflow: "hidden",
                                            margin: "0em"
                                        },
                                        dropzoneActive: {borderColor: 'purple'}
                                    }}
                                />
                            </label>
                        </div>
                        <div className={style.keepCreatureText}>
                            <span>Keep it forever?</span>
                        </div>
                        <Switch
                            checked={this.state.submitToDB}
                            onChange={this.handleSubmitToDBChange}
                            className={style.submitToDBSwitch}
                            onColor={'#8B008B'}
                        />
                        <button type={"submit"} className={style.summonSubmit}/>
                        <div className={style.howManyFormSection}>
                            <label className={style.howManyInputLabel}>
                                How many?
                                <input
                                    className={style.howManyInputField}
                                    type={"number"}
                                    value={this.state.howMany}
                                    onChange={this.handleHowManyChange}
                                    required
                                />
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}