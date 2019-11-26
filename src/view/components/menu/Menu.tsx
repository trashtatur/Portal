import * as React from "react";
import {Form} from "../form/Form";
import * as style from './menu.module.css';

export interface IMenuProps {

}

export interface IMenuState {

}

export class Menu extends React.Component<IMenuProps,IMenuState> {


    constructor(props) {
        super(props);
        this.addOnClick = this.addOnClick.bind(this);
        this.editOnClick = this.editOnClick.bind(this);
    }

    editOnClick() {

    }

    addOnClick() {

    }

    render(): any {
        return (
            <div className={style.menuContainer}>
                <Form
                    /*Icon from here https://icon-library.net/icon/white-edit-icon-5.html*/
                    modalTrigger={<img className={style.editButton} src={'images/menuButtons/edit.jpg'} onClick={this.editOnClick} alt={"editButton"}/>}
                    type={"edit"}
                />
                <Form
                    modalTrigger={<button className={style.addButton} onClick={this.addOnClick}>+</button>}
                    type={"create"}
                 />
            </div>
        )
    }
}