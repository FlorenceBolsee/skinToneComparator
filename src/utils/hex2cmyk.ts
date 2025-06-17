const hex2cmyk = (hex: string) => {
	let computedC = 0;
	let computedM = 0;
	let computedY = 0;
	let computedK = 0;

	hex = hex.charAt(0) == '#' ? hex.substring(1, 7) : hex;

	if (hex.length != 6) return;
	if (/[0-9a-f]{6}/i.test(hex) != true) return;

	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);

	// Case Black
	if (r == 0 && g == 0 && b == 0) {
		computedK = 100;
		return { c: computedC, m: computedM, y: computedY, k: computedK };
	}

	computedC = 1 - r / 255;
	computedM = 1 - g / 255;
	computedY = 1 - b / 255;

	const minCMY = Math.min(computedC, Math.min(computedM, computedY));

	computedC = (computedC - minCMY) / (1 - minCMY);
	computedM = (computedM - minCMY) / (1 - minCMY);
	computedY = (computedY - minCMY) / (1 - minCMY);
	computedK = minCMY;

	return {
		c: Math.round(computedC * 100),
		m: Math.round(computedM * 100),
		y: Math.round(computedY * 100),
		k: Math.round(computedK * 100),
	};
};

export default hex2cmyk;
