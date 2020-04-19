import * as React from 'react';
import {ReactNode} from 'react';
import {SceneViewModel} from "../../../model/scene/SceneViewModel";
import Select from 'react-select';
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

    render(): ReactNode {
        return (
            <form className={style.singleSceneFormContainer}>
                <label htmlFor={'singleSceneForm-number'}>Number</label>
                <input
                    id={'singleSceneForm-number'}
                    required
                    type={'number'}
                    min={1}
                    value={this.state.scene.getNumberAsString()}
                />
                <label htmlFor={'singleSceneForm-name'}>Name</label>
                <input
                    id={'singleSceneForm-name'}
                    required
                    value={this.state.scene.name}
                />
                <label htmlFor={'singleSceneForm-hook'}>Hook</label>
                <textarea
                    id={'singleSceneForm-hook'}
                    required
                    value={this.state.scene.hook}
                />
                <label htmlFor={'singleSceneForm-token'}>Token</label>
                <textarea
                    id={'singleSceneForm-token'}
                    required
                    value={this.state.scene.token}
                />
                <label htmlFor={'singleSceneForm-treasure'}>Treasure</label>
                <textarea
                    id={'singleSceneForm-treasure'}
                    value={this.state.scene.treasure}
                />
                <label htmlFor={'singleSceneForm-act'}>Act</label>
                <input
                    id={'singleSceneForm-act'}
                    required
                    type={'number'}
                    min={1}
                    value={this.state.scene.getActAsString()}
                />
                <label htmlFor={'singleSceneForm-childScenes'}>Following scene(s)</label>
                <Select id={'singleSceneForm-childScenes'}/>
                <label htmlFor={'singleSceneForm-additionalDescription'}>Additional description</label>
                <textarea
                    id={'singleSceneForm-additionalDescription'}
                    value={this.state.scene.additionalDescription}
                />
            </form>
        )
    }
}