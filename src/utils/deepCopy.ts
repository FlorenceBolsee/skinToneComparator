const deepCopy = <TCopy extends object>(ref: TCopy) => {
	return JSON.parse(JSON.stringify(ref)) as TCopy;
};

export default deepCopy;
