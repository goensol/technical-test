/* eslint-disable prettier/prettier */
import { MantineThemeColorsOverride, MantineThemeOverride } from '@mantine/core';

/**
 * Never export it!
 * Prefer using `const { colors } = useMantineTheme()`
 */
const colors = {
  blue: [
    '#F7F8FC',
    '#EFF0FB',
    '#EBECFA',
    '#E0E2FD',
    '#93AAFD',
    '#6D7BF2',
    '#5A64D6',
    '#3c4aa3',
    '#2A367F',
    '#06125C',
  ],
  purple: [
    '#FEFBFF',
    '#F8EFFB',
    '#F6EBFA',
    '#EDE0FD',
    '#D6BFFD',
    '#AD64D9',
    '#8a50ae',
    '#6f3f8a',
    '#4f2a5f',
    '#2e1a3a',
  ],
  pink: [
    '#FFFBFD',
    '#FFF4FE',
    '#FAEBF8',
    '#F9E0FD',
    '#F8BFFD',
    '#F98AAB',
    '#F95F8C',
    '#F93F6F',
    '#F92A5A',
    '#F90F3C',
  ],
  red: [
    '#FFF8F8',
    '#FCE8E8',
    '#FADDDD',
    '#F8C0C0',
    '#F58A8A',
    '#F55525',
    '#F13F0B',
    '#E92A0B',
    '#E01F0B',
    '#D60F0B',
  ],
} as const;

export type Color = keyof typeof colors;

export const theme: MantineThemeOverride = {
  // Colors
  colors: colors as MantineThemeColorsOverride,
  primaryShade: 5,
  primaryColor: 'blue',
};
