export const numArrayAverage = (arr: number[]) =>
	arr.reduce((acc, curr) => acc + curr, 0) / arr.length;
