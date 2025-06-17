import cmyk2rgb from './cmyk2rgb';
import rgb2Hsl from './rgb2hsl';

const cmyk2hsl = ({
	c,
	m,
	y,
	k,
}: {
	c: number;
	m: number;
	y: number;
	k: number;
}) => {
	return rgb2Hsl(cmyk2rgb(c, m, y, k));
};

export default cmyk2hsl;
