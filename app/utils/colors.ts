export const colors = {
  primary: '#Feac02',
  textPrimary: '#Feac02',
  secondary: '#Ff5a5f',
  textSecondary: '#Ff5a5f',
  black: '#000',
  bgBlack: '#121212',
  bgLightBlack: '#222222',
  white: '#fff',
  gray: '#6e6969',
  textGray: '#AEAEAE',
  light: '#f8f4f4',
  danger: '#ff5252',
  success: '#4ecdc4',
  warning: '#ffe66d',
  lightBlack: '#333',
  lightGray: '#f6f6f6',
  drawerBg: '#3B3B3B',
  green: '#3ACF6B',
  red: '#DC0024',
  pastMeetingColor: '#121212',
  nextMeetingColor: '#FFAC00',
  greenMeeting: '#03C988',
  redMeeting: '#DC0000',
};
export const colorsOpacity = {
  primary0: (p: number) => `${colors.primary}${p}`,
  textPrimary0: (p: number) => `${colors.primary}${p}`,
  secondary0: (p: number) => `${colors.secondary}${p}`,
};
export const gradientColors = ['#3B3B3B', '#121212'];
export type Colors = keyof typeof colors;
