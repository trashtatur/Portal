import * as React from "react";
import {PathfinderFormMenu} from "../../module-battle/pathfinder/formMenu/PathfinderFormMenu";
import {ReactElement} from "react";
import {PathfinderCSVImporter} from "../importer/PathfinderCSVImporter";
import {Modal} from "../modal/Modal";
import * as style from './menu.css';

export class PathfinderMenu extends React.Component {

    render(): ReactElement {
        return (
            <>
                <Modal triggerButtonClassName={style.menuButton} triggerButtonContent={'+'}>
                    <PathfinderFormMenu
                        type={"create"}
                    />
                </Modal>
                <Modal triggerButtonClassName={style.menuButton} triggerButtonContent={'🖉'}>
                    <PathfinderFormMenu
                        type={"edit"}
                    />
                </Modal>
                <Modal triggerButtonClassName={style.menuButton} triggerButtonContent={'⇑'}>
                    <PathfinderCSVImporter/>
                </Modal>
            </>
        )
    }
}