import * as React from "react";
import {Form} from "../form/Form";
import {ReactElement} from "react";
import * as style from './menu.css';

export class Menu extends React.Component {

    render(): ReactElement {
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