import { COOL, MUTED, NEUTRAL, OLIVE, WARM } from '../consts';

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

const UNDERTONES_THRESHOLDS = {
	regular: {
		warm: { min: 0, max: 0.55, label: WARM },
		neutral: { min: 0.55, max: 0.65, label: NEUTRAL },
		cool: { min: 0.65, max: 1, label: COOL },
	},
	olive: {
		warm: { min: 0, max: 0.4, label: WARM },
		neutral: { min: 0.4, max: 0.45, label: NEUTRAL },
		cool: { min: 0.45, max: 1, label: COOL },
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

		const magentaRatio = cmyk.m / cmyk.y;

		isMuted = cmyk.k / (100 - l) > expectedBlack;
		isOlive = magentaRatio < 0.5;

		let undertoneThreshold = UNDERTONES_THRESHOLDS.regular;

		if (isOlive) {
			undertoneThreshold = UNDERTONES_THRESHOLDS.olive;
		}

		undertone = Object.values(undertoneThreshold).find(
			({ min, max }) => magentaRatio >= min && magentaRatio < max,
		)?.label;
	});

	skinCategory += `${undertone ? ` ${undertone}` : ''}${isMuted ? ` ${MUTED}` : ''}${isOlive ? ` ${OLIVE}` : ''}`;

	return skinCategory;
};

export default skinCategoryPicker;
