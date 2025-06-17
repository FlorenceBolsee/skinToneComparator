import { clamp } from './clamp';

export const randomClamp = (min: number, max: number) => {
	return clamp(Math.round(Math.random() * max + min), min, max);
};
