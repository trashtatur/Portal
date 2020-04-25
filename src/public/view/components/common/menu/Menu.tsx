import * as React from "react";
import {FormBattleModal} from "../../module-battle/formBattleModal/FormBattleModal";
import {ReactElement} from "react";
import {CSVImporter} from "../importer/CSVImporter";
import {Link} from 'react-router-dom'
import {RoutesEnum} from "../../../../service/RoutesEnum";
import * as style from './menu.css';

export class Menu extends React.Component {

    render(): ReactElement {
        return (
            <div className={style.menuContainer}>
                <FormBattleModal
                    modalTrigger={<button className={style.menuButton}>🖉</button>}
                    type={"edit"}
                />
                <FormBattleModal
                    modalTrigger={<button className={style.menuButton}>+</button>}
                    type={"create"}
                />
                <CSVImporter modalTrigger={<button className={style.menuButton}>⇑</button> }/>
                <Link to={RoutesEnum.BATTLE}>⚔</Link>
                <Link to={RoutesEnum.TOME}>🕮</Link>
            </div>
        )
    }
}