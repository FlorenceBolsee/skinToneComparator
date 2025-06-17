import { COOL, MUTED, NEUTRAL, OLIVE, WARM } from '../consts';

const SKIN_CATEGORIES = [
	{
		label: 'Lightest',
		lightness: { min: 79, max: 100 },
		expectedBlack: 0.38,
	},
	{
		label: 'Light',
		lightness: { min: 73, max: 79 },
		expectedBlack: 0.51,
	},
	{
		label: 'Light Medium',
		lightness: { min: 67, max: 73 },
		expectedBlack: 0.55,
	},
	{
		label: 'Medium Light',
		lightness: { min: 61, max: 67 },
		expectedBlack: 0.61,
	},
	{
		label: 'Medium',
		lightness: { min: 55, max: 61 },
		expectedBlack: 0.63,
	},
	{
		label: 'Medium Tan',
		lightness: { min: 51, max: 55 },
		expectedBlack: 0.66,
	},
	{
		label: 'Tan Medium',
		lightness: { min: 43, max: 51 },
		expectedBlack: 0.74,
	},
	{
		label: 'Tan',
		lightness: { min: 37, max: 43 },
		expectedBlack: 0.8,
	},
	{
		label: 'Deep Tan',
		lightness: { min: 31, max: 37 },
		expectedBlack: 0.83,
	},
	{
		label: 'Deep',
		lightness: { min: 25, max: 31 },
		expectedBlack: 0.87,
	},
	{
		label: 'Darkest',
		lightness: { min: 0, max: 25 },
		expectedBlack: 0.9,
	},
];

const UNDERTONES_THRESHOLDS = {
	regular: {
		warm: { min: 0, max: 0.55, label: WARM },
		neutral: { min: 0.55, max: 0.65, label: NEUTRAL },
		cool: { min: 0.65, max: 1, label: COOL },
	},
	olive: {
		warm: { min: 0, max: 0.34, label: WARM },
		neutral: { min: 0.34, max: 0.4, label: NEUTRAL },
		cool: { min: 0.4, max: 1, label: COOL },
	},
};

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
	let isOlive = false;
	let isMuted = false;

	const { l } = hsl;

	SKIN_CATEGORIES.forEach(({ label, lightness, expectedBlack }) => {
		if (l < lightness.min || l >= lightness.max) return;

		skinCategory = label;

		const isMutedOrOlive = cmyk.k / (100 - l) > expectedBlack;

		let undertoneThreshold = UNDERTONES_THRESHOLDS.regular;

		const magentaRatio = cmyk.m / cmyk.y;

		if (isMutedOrOlive && magentaRatio < 0.5) {
			// Olive
			isOlive = true;
			undertoneThreshold = UNDERTONES_THRESHOLDS.olive;
		}

		if (isMutedOrOlive && magentaRatio >= 0.5) {
			// Muted
			isMuted = true;
		}

		undertone = Object.values(undertoneThreshold).find(
			({ min, max }) => magentaRatio >= min && magentaRatio < max,
		)?.label;
	});

	skinCategory += `${undertone ? ` ${undertone}` : ''}${isMuted ? ` ${MUTED}` : ''}${isOlive ? ` ${OLIVE}` : ''}`;

	return skinCategory;
};

export default skinCategoryPicker;
