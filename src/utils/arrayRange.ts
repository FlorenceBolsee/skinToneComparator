import { clamp } from './clamp';

export const arrayRange = (start: number, end: number, steps?: number) => {
	const arrayLength = end - start;
	const stepSize = steps
		? Math.ceil(clamp(arrayLength / steps, 1, arrayLength))
		: 1;
	return Array.from(
		{ length: steps ? steps : arrayLength },
		(_, idx) => start + idx * stepSize,
	);
};
