import * as React from 'react';
import {ReactNode} from 'react';
import * as style from "@/public/view/components/module-battle/dnd5/creatureForm/dnd5CreatureForm.css";


export class SpellsFormSectionHeader extends React.Component {

    render(): ReactNode {
        return (
            <span className={style.optionalFormSectionCompletion}>
                ☑<span className={style.formSectionHeader}>Spell casting</span>
            </span>
        )
    }
}