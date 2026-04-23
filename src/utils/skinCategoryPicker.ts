import { BLUE, COOL, NEUTRAL, OLIVE, PURPLE, WARM } from '../consts';

const SKIN_CATEGORIES = [
	{
		label: 'Fair',
		lightness: { min: 75, max: 100 },
		expectedBlack: 0.56,
	},
	{
		label: 'Light',
		lightness: { min: 70, max: 75 },
		expectedBlack: 0.51,
	},
	{
		label: 'Medium',
		lightness: { min: 63, max: 70 },
		expectedBlack: 0.48,
	},
	{
		label: 'Tan',
		lightness: { min: 40, max: 63 },
		expectedBlack: 0.55,
	},
	{
		label: 'Deep',
		lightness: { min: 0, max: 40 },
		expectedBlack: 0.84,
	},
];

const skinCategoryPicker = (
	cmyk: {
		c: number;
		m: number;
		y: number;
		k: number;
	},
	hsl: { h: number; s: number; l: number },
) => {
	let skinCategory = '';
	let undertone: string | undefined = '';

	const { l } = hsl;

	SKIN_CATEGORIES.forEach(({ label, lightness, expectedBlack }) => {
		if (l < lightness.min || l >= lightness.max) return;

		skinCategory = label;

		const magentaRatio = cmyk.m / cmyk.y;
		const isOlive = magentaRatio < 0.5;
		const isMuted = cmyk.k / (100 - l) > expectedBlack;

		if (isOlive) {
			undertone = OLIVE;
		} else if (isMuted) {
			undertone = magentaRatio >= 0.65 ? PURPLE : BLUE;
		} else if (magentaRatio < 0.55) {
			undertone = WARM;
		} else if (magentaRatio < 0.65) {
			undertone = NEUTRAL;
		} else {
			undertone = COOL;
		}
	});

	skinCategory += undertone ? ` ${undertone}` : '';

	return skinCategory;
};

export default skinCategoryPicker;
