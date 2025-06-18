import { arrayRange } from '../utils/arrayRange';
import { randomClamp } from '../utils/randomClamp';

export const generateTone = () => {
	const h = randomClamp(10, 27);
	const s = randomClamp(30, 60);
	const l = randomClamp(20, 85);

	return { h, s, l };
};

export const hueValues = Array.from({ length: 24 }, (_, idx) => 13 + idx);
export const toneTable = [
	{
		lightness: 20,
		saturationValues: arrayRange(38, 80),
	},
	{
		lightness: 45,
		saturationValues: arrayRange(36, 75),
	},
	{
		lightness: 65,
		saturationValues: arrayRange(34, 70),
	},
	{
		lightness: 72,
		saturationValues: arrayRange(32, 65),
	},
	{
		lightness: 85,
		saturationValues: arrayRange(30, 60),
	},
];
