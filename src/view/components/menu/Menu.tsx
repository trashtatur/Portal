import * as React from "react";
import {Form} from "../form/Form";
import {ReactElement} from "react";
import * as style from './menu.css';
import {CSVImporter} from "../importer/CSVImporter";

export class Menu extends React.Component {

    render(): ReactElement {
        return (
            <div className={style.menuContainer}>
                <Form
                    modalTrigger={<button className={style.menuButton}>🖉</button>}
                    type={"edit"}
                />
                <Form
                    modalTrigger={<button className={style.menuButton}>+</button>}
                    type={"create"}
                />
                <CSVImporter modalTrigger={<button className={style.menuButton}>⇑</button> }/>
            </div>
        )
    }
}