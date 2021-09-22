import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      blue1: string;
      blue2: string;
      blue3: string;
      blue4: string;
      blue5: string;
      blue6: string;
      blue7: string;

      white: string;

      gray1: string;
      gray2: string;
      gray3: string;
      gray4: string;
      gray5: string;

      brown1: string;

      yellow1: string;

      red1: string;
      red2: string;
    };
    borderRadiusLarge: string;
    borderRadiusMedium: string;
    borderRadiusSmall: string;
  }
}
