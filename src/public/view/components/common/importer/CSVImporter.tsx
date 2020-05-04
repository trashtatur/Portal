import * as React from 'react';
import {ReactNode} from 'react';
import Select from 'react-select';
import {selectable} from "../../../../types/frontendTypes";
import Dropzone from 'react-dropzone-uploader';
import {BaseEntitiesEnum} from "../../../../model/enumeration/BaseEntitiesEnum";
import axios from 'axios';
import * as style from "./csvImporter.css";

export interface CSVImporterState {
    selectedType: BaseEntitiesEnum;
    importedData: File;
}

const SELECTABLE_IMPORTS: selectable[] = [
    {
        label: BaseEntitiesEnum.TALENT,
        value: BaseEntitiesEnum.TALENT
    },
    {
        label: 'action - NOT WORKING YET',
        value: BaseEntitiesEnum.ACTION
    },
    {
        label: 'skill - NOT WORKING YET',
        value: BaseEntitiesEnum.SKILL,
    },
    {
        label: 'language - NOT WORKING YET',
        value: BaseEntitiesEnum.LANGUAGE
    },
    {
        label: 'creature - NOT WORKING YET',
        value: BaseEntitiesEnum.CREATURE
    }
];

export class CSVImporter extends React.Component<{}, CSVImporterState> {

    constructor(props) {
        super(props);
        this.state = {
            importedData: null,
            selectedType: BaseEntitiesEnum.NONE
        }
    }

    handleUpload = async (): Promise<void> => {
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
            <div className={style.importerContainer}>
                <div className={style.modalTopBar}>
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
                <button onClick={this.handleUpload}> Submit</button>
            </div>
        )
    }
}