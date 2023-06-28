import { ACCENT, LIGHTNESS, NEUTRAL } from '../constants/StyleConstants';
import Color from 'color';

export const THEMES = {
  light: {
    ISLIGHTACTIVE: true,
    PRIMARY: `hsl(${ACCENT.HS}, ${LIGHTNESS.L_40})`,
    PRIMARY_1: `hsl(${ACCENT.HS}, ${LIGHTNESS.L_60})`,
    SECONDARY: 'white',
    TEXT: `hsl(${NEUTRAL.HS}, ${LIGHTNESS.L_10})`,
    TEXT_1: `hsl(${NEUTRAL.HS}, ${LIGHTNESS.L_25})`,
    TEXT_2: `hsl(${NEUTRAL.HS}, ${LIGHTNESS.L_50})`,
    BACKGROUND: `hsl(${NEUTRAL.HS}, ${LIGHTNESS.L_95})`,
    BACKGROUND_1: `white`,
    BACKGROUND_2: `white`,
    ACCENT: `blue`,
    ACCENT_1: '',
    BORDER: `hsl(${NEUTRAL.HS}, ${LIGHTNESS.L_85})`,
    BORDER_1: `hsl(${NEUTRAL.HS}, ${LIGHTNESS.L_40})`,
    TRANSPARENT_ACTIVE: `hsla(${NEUTRAL.HS}, ${LIGHTNESS.L_90}, 1)`,
  },
  dark: {
    ISLIGHTACTIVE: false,
    PRIMARY: `hsl(${ACCENT.HS}, ${LIGHTNESS.L_40})`,
    SECONDARY: 'white',
    TEXT: `hsl(${NEUTRAL.HS}, ${LIGHTNESS.L_90})`,
    TEXT_1: `hsl(${NEUTRAL.HS}, ${LIGHTNESS.L_65})`,
    TEXT_2: `hsl(${NEUTRAL.HS}, ${LIGHTNESS.L_40})`,
    BACKGROUND: `hsl(${NEUTRAL.HS}, ${LIGHTNESS.L_15})`,
    BACKGROUND_1: `hsl(${NEUTRAL.HS}, ${LIGHTNESS.L_20})`,
    BACKGROUND_2: `hsl(${NEUTRAL.HS}, ${LIGHTNESS.L_30})`,
    ACCENT: `hsl(${ACCENT.HS}, ${LIGHTNESS.L_30})`,
    BORDER: `hsl(${NEUTRAL.HS}, ${LIGHTNESS.L_30})`,
    BORDER_1: `hsl(${NEUTRAL.HS}, ${LIGHTNESS.L_70})`,
    TRANSPARENT_ACTIVE: `hsla(${NEUTRAL.HS}, ${LIGHTNESS.L_30}, 1)`,

    // TRANSPARENT_ACTIVE_BUTTON: `red`,
  },
};
