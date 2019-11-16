import * as React from "react";
import * as style from './menu.module.css';
import {editButton} from "./menu.module.css";
import {Form} from "../form/Form";

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
                    modalTrigger={<img className={style.editButton} src={'images/menuButtons/edit.jpg'} onClick={this.editOnClick} alt={"editButton"}/>}
                    type={"edit"}
                />
                <Form
                    modalTrigger={<img className={style.addButton} src={'images/menuButtons/add.jpg'} onClick={this.addOnClick} alt={"addButton"}/>}
                    type={"create"}
                 />
            </div>
        )
    }
}