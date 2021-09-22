import { DefaultTheme } from 'styled-components';

export const calcRem = (size: number) => `${size / 16}rem`;

export const theme: DefaultTheme = {
  color: {
    blue1: '#0C387B',
    blue2: '#1665C0',
    blue3: '#1E88E5',
    blue4: '#85B5DD',
    blue5: '#90CAF9',
    blue6: '#BBDEFB',
    blue7: '#EBF6FF',

    white: '#FFF',

    brown1: '#BA4200',

    yellow1: '#FFCC80',

    gray1: '#3e495c',
    gray2: '#8797AB',
    gray3: '#ABABB8',
    gray4: '#B9B4C0',
    gray5: '#EEE',

    red1: '#FF6969',
    red2: '#FFDBDB',
  },
  borderRadiusLarge: `${calcRem(10)}`,
  borderRadiusMedium: `${calcRem(7)}`,
  borderRadiusSmall: `${calcRem(5)}`,
};
