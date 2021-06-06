import * as React from 'react';
import {classNames} from "@/public/service/class-names.service";
import * as styles from './tooltip-bubble.component.less'
import {ReactNode} from "react";

interface Props {
  position: 'left'|'right'|'top'|'bottom'|'topLeft'|'topRight'|'bottomLeft'|'bottomRight'|'covering';
  adjustments?: object;
  arrowAdjustments?: object;
  children: ReactNode;
}

const defaultProps = {
  adjustments: {},
  arrowAdjustments: {}
}

export const UiBasicTooltipBubble = ({
  arrowAdjustments,
  adjustments,
  position,
  children
}: Props) => (
  <div className={styles.component} style={adjustments}>
    {position !== 'covering' && <div className={classNames(styles.arrow, styles[position])} style={arrowAdjustments} />}
    {children}
  </div>
);

UiBasicTooltipBubble.defaultProps = defaultProps;