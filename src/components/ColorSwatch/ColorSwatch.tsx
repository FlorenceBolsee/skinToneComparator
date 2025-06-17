import { CSSProperties } from 'react';
import cmyk2rgb from '../../utils/cmyk2rgb';
import ColorBar from '../ColorBar/ColorBar';
import './ColorSwatch.scss';

const ColorSwatch = ({
	name,
	cyan,
	magenta,
	yellow,
	black,
}: {
	name: string;
	cyan: number;
	magenta: number;
	yellow: number;
	black: number;
}) => {
	const { r, g, b } = cmyk2rgb(cyan, magenta, yellow, black);
	return (
		<div
			className="color-swatch"
			aria-label={`CMYK(${cyan}%, ${magenta}%, ${yellow}%, ${black}%)`}
		>
			<p className="color-name">{name}</p>
			<div
				className="color-preview"
				style={{ '--swatch': `rgb(${r}, ${g}, ${b})` } as CSSProperties}
			></div>
			<div className="color-levels">
				<ColorBar height={cyan} background={'cyan'} label={'Cyan'} />
				<ColorBar height={magenta} background={'magenta'} label={'Magenta'} />
				<ColorBar height={yellow} background={'yellow'} label={'Yellow'} />
				<ColorBar height={black} background={'black'} label={'Key'} />
			</div>
		</div>
	);
};

export default ColorSwatch;
