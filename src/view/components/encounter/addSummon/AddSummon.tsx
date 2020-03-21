import * as React from 'react';
import {CSSProperties, ReactNode} from 'react';
import {creature} from "../../componentTypes";
import {createSummonedCreature} from "./helper/summonedCreatureFactory";
import Dropzone from "react-dropzone-uploader";
import * as style from './addSummon.css';

interface AddSummonState {
    isDisplayed: boolean;
    summonedCreature: creature;
}

const IS_DISPLAYED: CSSProperties = {visibility: "visible", opacity: 1, maxHeight: "500px", marginTop: "20px"};
const IS_NOT_DISPLAYED: CSSProperties = {visibility: "hidden", opacity: 0, maxHeight: "0px", marginTop: "-200px"};

export class AddSummon extends React.Component<{}, AddSummonState> {

    constructor(props) {
        super(props);
        this.state = {
            isDisplayed: false,
            summonedCreature: createSummonedCreature()
        }
    }

    handleImageChange = (): void => {
        console.log('')
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
                />
                    <div className={style.addSummonFormContainer} style={this.shouldDisplay()}>
                        <h3 className={style.summonFormHeader}>Summon a creature</h3>
                        <form className={style.summonForm}>
                            <div className={style.summonFormSection}>
                                <label className={style.summonFormTextInputLabel}>
                                    Name:
                                    <input
                                        className={style.SummonFormTextInputField}
                                    />
                                </label>
                                <label className={style.summonFormTextInputLabel}>
                                    Hitpoints:
                                    <input
                                        className={style.SummonFormTextInputField}
                                    />
                                </label>
                                <label className={style.summonFormTextInputLabel}>
                                    Armorclass:
                                    <input
                                        className={style.SummonFormTextInputField}
                                    />
                                </label>
                                <label className={style.summonFormTextInputLabel}>
                                    Ini:
                                    <input
                                        className={style.SummonFormTextInputField}
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
                            <button type={"submit"} className={style.summonSubmit}/>
                        </form>
                    </div>
            </div>
        )
    }
}