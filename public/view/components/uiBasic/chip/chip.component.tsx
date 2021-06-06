import * as React from "react";
import * as style from './chip.component.less';
import {ReactNode} from "react";
import {classNames} from "../../../../service/class-names.service";
import {ColorModeEnum} from "../../../../enumeration/ColorModeEnum";

interface Props {
    image?: string;
    hoverEffect?: boolean;
    colorMode?: ColorModeEnum;
    children: ReactNode;
}

const defaultProps = {
    hoverEffect: false,
}
export const Chip = ({image, hoverEffect, colorMode, children}: Props) => (
    <span className={classNames(style.component, hoverEffect ? style.hover : '')} style={colorMode ? {backgroundColor: colorMode}: {}}>
        {children}
        { image &&
            <img src={image} className={style.chipImage}/>
        }
    </span>
)

Chip.defaultProps = defaultProps;