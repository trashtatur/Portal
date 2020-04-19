import * as React from 'react';
import {ReactNode} from 'react';
import Select from 'react-select';
import {selectableFormElement} from "../../componentTypes";
import Dropzone from 'react-dropzone-uploader';
import {BaseEntities} from "../../../model/enumeration/BaseEntities";
import axios from 'axios';
import * as style from "./csvImporter.css";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Popup = require("reactjs-popup");

export interface CSVImporterProps {
    modalTrigger: ReactNode;
}

export interface CSVImporterState {
    selectedType: BaseEntities;
    importedData: File;
}

const SELECTABLE_IMPORTS: selectableFormElement[] = [
    {
        label: BaseEntities.TALENT,
        value: BaseEntities.TALENT
    },
    {
        label: 'action - NOT WORKING YET',
        value: BaseEntities.ACTION
    },
    {
        label: 'skill - NOT WORKING YET',
        value: BaseEntities.SKILL,
    },
    {
        label: 'language - NOT WORKING YET',
        value: BaseEntities.LANGUAGE
    },
    {
        label: 'creature - NOT WORKING YET',
        value: BaseEntities.CREATURE
    }
];

export class CSVImporter extends React.Component<CSVImporterProps, CSVImporterState> {

    constructor(props) {
        super(props);
        this.state = {
            importedData: null,
            selectedType: BaseEntities.NONE
        }
    }

    handleUpload = async(): Promise<void> => {
        const route = `/V1/${this.state.selectedType}/csv`;
        const reader = new FileReader();
        let result;
        reader.onload = async (): Promise<any> => {
            result = reader.result;
            try {
                const response = await axios.post(route, {data: result});
                console.log(response);
            } catch (error) {
                console.log(error)
            }
        };
        reader.readAsText(this.state.importedData);
    };

    handleImportChange = ({meta, file}, status): void => {
        this.setState({importedData: file});
        if (status == "removed") {
            this.setState({importedData: null})
        }
    };

    handleImportSelectChange = (value): void => {
        this.setState({selectedType: value.value})
    };

    render(): ReactNode {
        return (
            <Popup modal trigger={this.props.modalTrigger}
                   position={"top center"}
                   closeOnDocumentClick={false}
            >
                {close => (
                    <div className={style.importerContainer}>
                        <div className={style.modalTopBar}>
                            <button className={style.modalCloseButton} onClick={() => close()}>X</button>
                            Import
                        </div>
                        <Select
                            options={SELECTABLE_IMPORTS}
                            onChange={this.handleImportSelectChange}
                            className={style.importTypeSelect}
                            value={{label: this.state.selectedType, value: this.state.selectedType}}
                        />
                        <Dropzone
                            onChangeStatus={this.handleImportChange}
                            maxFiles={1}
                            multiple={false}
                            canCancel={false}
                            accept="text/csv"
                            inputContent="Drop a File"
                            styles={{
                                dropzone: {
                                    width: "15em",
                                    height: "5em",
                                    color: "lightgrey",
                                    overflow: "hidden",
                                },
                                dropzoneActive: {borderColor: 'lightgrey'}
                            }}
                        />
                        <button onClick={this.handleUpload}> Submit </button>
                    </div>
                )}
            </Popup>
        )
    }
}