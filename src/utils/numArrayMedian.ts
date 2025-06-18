const orderNumbers = (a: number, b: number) => a - b;

export const numArrayMedian = (arr: number[]) => {
	const middleIndex = Math.round((arr.length - 1) / 2);
	const medianElement = arr.sort(orderNumbers)[middleIndex];
	if (!medianElement) throw new Error('median not found');
	return medianElement;
};
