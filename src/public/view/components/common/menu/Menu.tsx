import * as React from "react";
import {FormMenu} from "../../module-battle/pathfinder/formBattleModal/FormMenu";
import {ReactElement} from "react";
import {CSVImporter} from "../importer/CSVImporter";
import {Link} from 'react-router-dom'
import {RoutesEnum} from "../../../../service/RoutesEnum";
import {Modal} from "../modal/Modal";
import * as style from './menu.css';

export class Menu extends React.Component {

    render(): ReactElement {
        return (
            <div className={style.menuContainer}>
                <Modal triggerButtonClassName={style.menuButton} triggerButtonContent={'+'}>
                    <FormMenu
                        type={"create"}
                    />
                </Modal>
                <Modal triggerButtonClassName={style.menuButton} triggerButtonContent={'🖉'}>
                    <FormMenu
                        type={"edit"}
                    />
                </Modal>
                <Modal triggerButtonClassName={style.menuButton} triggerButtonContent={'⇑'}>
                    <CSVImporter />
                </Modal>
                <Link to={RoutesEnum.BATTLE}>⚔</Link>
                <Link to={RoutesEnum.TOME}>🕮</Link>
            </div>
        )
    }
}