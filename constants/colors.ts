export const colors = {
	'Purple-100': '#F1E5FF',
	'Purple-200': '#E3CCFF',
	'Purple-300': '#D2B2FF',
	'Purple-400': '#A875FF',
	'Purple-500': '#7D40FF',
	'Purple-600': '#671ADB',
	'Purple-700': '#432499',
	'Purple-800': '#2E2159',
	White: '#FFFFFF',
	'Gray-100': '#F3F3F3',
	'Gray-200': '#E8E8E8',
	'Gray-300': '#BBBBBB',
	'Gray-400': '#787878',
	'Gray-500': '#1E1E1E',
	Red: '#FF4A4A',
	Kakao: '#FBE300',
	Naver: '#03C75A',
};

export type Color = keyof typeof colors;
export type ColorValue = (typeof colors)[Color];
