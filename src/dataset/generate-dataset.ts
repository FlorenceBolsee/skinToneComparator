import { randomClamp } from '../utils/randomClamp';

export const generateTone = () => {
	const h = randomClamp(10, 27);
	const s = randomClamp(30, 60);
	const l = randomClamp(20, 85);

	return { h, s, l };
};

export const hueValues = [10, 20, 30, 34, 37];
export const saturationValues = [30, 31, 32, 35, 37, 41, 47, 50, 60];
export const lightnessValues = [20, 26, 33, 39, 45, 52, 59, 65, 72, 78, 85];
