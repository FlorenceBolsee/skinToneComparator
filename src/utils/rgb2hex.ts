const rgb2hex = (r: number, g: number, b: number) => {
	return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
};

export default rgb2hex;
