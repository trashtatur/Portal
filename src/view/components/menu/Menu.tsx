import * as React from "react";
import {Form} from "../form/Form";
import * as style from './menu.module.css';

export interface IMenuProps {

}

export interface IMenuState {

}

export class Menu extends React.Component<IMenuProps,IMenuState> {

    render(): any {
        return (
            <div className={style.menuContainer}>
                <Form
                    modalTrigger={<button className={style.menuEditButton}>🖉</button>}
                    type={"edit"}
                />
                <Form
                    modalTrigger={<button className={style.menuAddButton}>+</button>}
                    type={"create"}
                 />
            </div>
        )
    }
}