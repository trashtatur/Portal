import * as React from "react";
import {CSSProperties} from "react";
import * as style from './creatureImage.module.css'

export interface ICreatureImageProps {
    imagePath?:string
    preview?:boolean
}

export interface ICreatureState {

}

export class CreatureImage extends React.Component<ICreatureImageProps,ICreatureState> {

    constructor(props) {
        super(props);
        this.ifPreview = this.ifPreview.bind(this);
    }


    ifPreview():CSSProperties {
        if(this.props.preview) return {visibility:"hidden", width:"10em"};
        return {}
    }

    render(): any {
        return (
            <img
                className={style.creatureImage}
                src={this.props.imagePath || 'images/creatureImages/__unknown/__unknown.png'}
                style={this.ifPreview()}
            />
        )
    }
}