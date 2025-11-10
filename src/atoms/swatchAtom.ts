import { atom } from 'jotai';
import { SwatchState } from '../components/ColorInput/ColorInput';

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
};

const swatchAtom = atom<SwatchState>(defaultState);

export default swatchAtom;
