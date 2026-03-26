import { atom } from 'jotai';
import { SwatchState } from '../components/ColorInput/ColorInput';
import deepCopy from '../utils/deepCopy';

export const defaultState: SwatchState = {
	id: '',
	title: '',
	colorA: {
		name: '',
		value: '',
		cmyk: {
			c: 0,
			m: 0,
			y: 0,
			k: 0,
		},
	},
	colorB: {
		name: '',
		value: '',
		cmyk: {
			c: 0,
			m: 0,
			y: 0,
			k: 0,
		},
	},
} as const;

const swatchAtom = atom<SwatchState>(deepCopy(defaultState));

export default swatchAtom;
