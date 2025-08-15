import cmyk2hsl from '../../utils/cmyk2hsl';
import skinCategoryPicker from '../../utils/skinCategoryPicker';
import { getWhite } from '../ColorPair/ColorPair';
import './ColorInfo.scss';

export type Color = {
	name: string;
	cmyk: {
		c: number;
		m: number;
		y: number;
		k: number;
	};
};

const LABELS = {
	c: 'Cyan',
	m: 'Magenta',
	y: 'Yellow',
	k: 'Black',
	w: 'White',
};

const ColorInfo = ({ colorA, colorB }: { colorA: Color; colorB: Color }) => {
	const cmykString = ({
		c,
		m,
		y,
		k,
	}: {
		c: number;
		m: number;
		y: number;
		k: number;
	}) =>
		`<span class="cyan">${c}%</span> <span class="magenta">${m}%</span> <span class="yellow">${y}%</span> <span class="black">${k}%</span>`;

	const differences = {
		c: colorA.cmyk.c - colorB.cmyk.c,
		m: colorA.cmyk.m - colorB.cmyk.m,
		y: colorA.cmyk.y - colorB.cmyk.y,
		k: colorA.cmyk.k - colorB.cmyk.k,
		w: getWhite(colorA.cmyk) - getWhite(colorB.cmyk),
	};

	return (
		<div className="color-info">
			<h3>{colorA.name || 'Start color'}:</h3>
			<p>
				<strong>CMYK </strong>
				<span
					dangerouslySetInnerHTML={{ __html: cmykString(colorA.cmyk) }}
				></span>
			</p>
			<p>
				<strong>Skin tone: </strong>
				<span>{skinCategoryPicker(colorA.cmyk, cmyk2hsl(colorA.cmyk))}</span>
			</p>
			<h3>{colorB.name || 'Target color'}:</h3>
			<p>
				<strong>CMYK </strong>
				<span
					dangerouslySetInnerHTML={{ __html: cmykString(colorB.cmyk) }}
				></span>
			</p>
			<p>
				<strong>Skin tone: </strong>
				<span>{skinCategoryPicker(colorB.cmyk, cmyk2hsl(colorB.cmyk))}</span>
			</p>
			<h3>
				{colorA.name || 'Start color'} compared to{' '}
				{colorB.name || 'Target color'}:
			</h3>
			<ul>
				{Object.entries(differences).map(([key, value], idx) => (
					<li key={idx} className="color-line">
						<strong>{LABELS[key as 'c' | 'm' | 'y' | 'k' | 'w']}: </strong>
						<span
							className={`
                            ${key === 'c' ? 'cyan' : ''}
                            ${key === 'm' ? 'magenta' : ''}
                            ${key === 'y' ? 'yellow' : ''}
                            ${key === 'k' ? 'black' : ''}
                            ${key === 'w' ? 'white' : ''}
                        `}
						>
							{value === 0
								? 'Identical'
								: `${value > 0 ? `+${value}` : value}%`}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ColorInfo;
