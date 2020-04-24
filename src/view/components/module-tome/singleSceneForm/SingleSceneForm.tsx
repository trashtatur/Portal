import * as React from 'react';
import {ReactNode} from 'react';
import {SceneViewModel} from "../../../model/SceneViewModel";
import Select from 'react-select';
import axios from 'axios';
import {selectable} from "../../componentTypes";
import {SelectEventTypesEnum} from "../../../model/enumeration/SelectEventTypesEnum";
import * as style from './singleSceneForm.css';

interface SingleSceneFormProps {
    adventureId: string;
    scenesToChoseFrom: Array<SceneViewModel>;
}

interface SingleSceneFormState {
    scene: SceneViewModel;
}

export class SingleSceneForm extends React.Component<SingleSceneFormProps, SingleSceneFormState> {

    constructor(props) {
        super(props);
        this.state = {
            scene: new SceneViewModel()
        }
    }

    handleSubmit = async (event): Promise<void> => {
        event.preventDefault()
        try {
            const scene = this.state.scene;
            scene.adventureId = this.props.adventureId;
            this.setState({scene: scene});
            axios.post('/V1/Scene', scene);
        } catch (e) {
            console.log(e)
        }
    };

    composeScenesToChooseFrom = (): selectable[] => {
        const selectables: selectable[] = [];
        this.props.scenesToChoseFrom.forEach(scene => {
            selectables.push({
                label: `${scene.number} - ${scene.name}`,
                value: scene.name,
            })
        });
        return selectables;
    };

    handleNumberChange = (event): void => {
        const scene = this.state.scene;
        if (event.target.value === '') {
            scene.number = null;
        } else {
            scene.number = Number(event.target.value);
        }
        this.setState({scene: scene});
    };

    handleNameChange = (event): void => {
        const scene = this.state.scene;
        scene.name = event.target.value;
        this.setState({scene: scene});
    };

    handleHookChange = (event): void => {
        const scene = this.state.scene;
        scene.hook = event.target.value;
        this.setState({scene: scene});
    };

    handleTokenChange = (event): void => {
        const scene = this.state.scene;
        scene.token = event.target.value;
        this.setState({scene: scene});
    };

    handleTreasureChange = (event): void => {
        const scene = this.state.scene;
        scene.treasure = event.target.value;
        this.setState({scene: scene});
    };

    handleActChange = (event): void => {
        const scene = this.state.scene;
        if (event.target.value === '') {
            scene.act = null
        } else {
            scene.act = Number(event.target.value);
        }
        this.setState({scene: scene});
    };

    handleResolveChange = (event): void => {
        const scene = this.state.scene;
        scene.resolve = event.target.value;
        this.setState({scene: scene});
    };

    handleParentSceneSelect = (value: Array<selectable>, option): void => {
        const scene = this.state.scene;
        if (option.action == SelectEventTypesEnum.SELECT_OPTION) {
            const parentScenes: Array<SceneViewModel> =
                this.props.scenesToChoseFrom.filter(scene => {
                    const valueFilter = value.find(elem => {
                        if (elem.value === scene.name) {
                            return elem;
                        }
                    });
                    if (valueFilter) {
                        return scene;
                    }
                });
            scene.parentScenes = parentScenes;
        } else if (option.action == SelectEventTypesEnum.REMOVE_OPTION) {
            scene.parentScenes = scene.parentScenes.filter(elem => {
                return elem.name !== option.removedValue.value
            })
        }
        this.setState({scene: scene})
    };

    handleAdditionalDescriptionChange = (event): void => {
        const scene = this.state.scene;
        scene.additionalDescription = event.target.value;
        this.setState({scene: scene});
    };

    render(): ReactNode {
        return (
            <form className={style.singleSceneFormContainer} onSubmit={this.handleSubmit}>
                <label htmlFor={'singleSceneForm-number'}>Number</label>
                <input
                    id={'singleSceneForm-number'}
                    required
                    type={'number'}
                    min={1}
                    onChange={this.handleNumberChange}
                    value={this.state.scene.getNumberAsString()}
                />
                <label htmlFor={'singleSceneForm-name'}>Name</label>
                <input
                    id={'singleSceneForm-name'}
                    required
                    onChange={this.handleNameChange}
                    value={this.state.scene.name}
                />
                <label htmlFor={'singleSceneForm-hook'}>Hook</label>
                <textarea
                    id={'singleSceneForm-hook'}
                    required
                    onChange={this.handleHookChange}
                    value={this.state.scene.hook}
                />
                <label htmlFor={'singleSceneForm-token'}>Token</label>
                <textarea
                    id={'singleSceneForm-token'}
                    required
                    onChange={this.handleTokenChange}
                    value={this.state.scene.token}
                />
                <label htmlFor={'singleSceneForm-treasure'}>Treasure</label>
                <textarea
                    id={'singleSceneForm-treasure'}
                    onChange={this.handleTreasureChange}
                    value={this.state.scene.treasure}
                />
                <label htmlFor={'singleSceneForm-resolve'}>Resolve</label>
                <textarea
                    id={'singleSceneForm-resolve'}
                    onChange={this.handleResolveChange}
                    value={this.state.scene.resolve}
                />
                <label htmlFor={'singleSceneForm-act'}>Act</label>
                <input
                    id={'singleSceneForm-act'}
                    required
                    type={'number'}
                    min={1}
                    onChange={this.handleActChange}
                    value={this.state.scene.getActAsString()}
                />
                <label htmlFor={'singleSceneForm-childScenes'}>Previous scene(s)</label>
                <Select
                    id={'singleSceneForm-childScenes'}
                    options={this.composeScenesToChooseFrom()}
                    isSearchable={true}
                    isMulti={true}
                    onChange={this.handleParentSceneSelect}
                    closeMenuOnSelect={false}
                    className={style.parentSceneSelect}
                />
                <label htmlFor={'singleSceneForm-additionalDescription'}>Additional description</label>
                <textarea
                    id={'singleSceneForm-additionalDescription'}
                    onChange={this.handleAdditionalDescriptionChange}
                    value={this.state.scene.additionalDescription}
                />
                <button type={'submit'}>Submit</button>
            </form>
        )
    }
}