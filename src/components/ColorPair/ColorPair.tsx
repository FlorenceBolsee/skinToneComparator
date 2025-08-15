import BrushStroke from '@assets/brush-stroke.svg?react';
import { ReactNode } from 'react';
import ColorInfo, { Color } from '../ColorInfo/ColorInfo';
import Tooltip from '../Tooltip/Tooltip';
import './ColorPair.scss';

export const getWhite = (cmyk: {
	c: number;
	m: number;
	y: number;
	k: number;
}) => 100 - Object.values(cmyk).reduce((acc, curr) => acc + curr, 0);

const getCorrector = (cmyk: {
	c: number;
	m: number;
	y: number;
	k: number;
	w: number;
}) => {
	const { c, m, y, k, w } = cmyk;
	const needsMagenta = m < 0;
	const needsYellow = y < 0;
	const needsBlack = Math.min(c, k) < 0;
	const needsWhite = w < 0;

	if (needsBlack && needsMagenta && needsYellow) {
		return needsWhite ? 'beige' : 'brown';
	}

	if (needsBlack && !needsMagenta && !needsYellow) {
		return 'blue';
	}

	if (needsYellow && !needsMagenta && !needsBlack) {
		return 'yellow';
	}

	if (needsMagenta && !needsYellow && !needsBlack) {
		return needsWhite ? 'pink' : 'magenta';
	}

	if (needsBlack && needsMagenta && !needsYellow) {
		return needsWhite ? 'lavender' : 'purple';
	}

	if (needsYellow && needsBlack && !needsMagenta) {
		return 'green';
	}

	if (needsYellow && needsMagenta && !needsBlack) {
		return needsWhite ? 'peach' : 'orange';
	}

	if (needsWhite) {
		const largest = Math.max(c, m, y, k);
		const restMagenta = Math.max(m - largest, -100);
		const restYellow = Math.max(y - largest, -100);
		const restBlack = Math.max(Math.max(c, k) - largest, -100);

		return getCorrector({
			c: 0,
			m: restMagenta,
			y: restYellow,
			k: restBlack,
			w,
		});
	}

	return '';
};

const ColorPair = ({
	title,
	onDelete,
	colorA,
	colorB,
	children,
}: {
	title: string;
	onDelete?: () => void;
	colorA: Color;
	colorB: Color;
	children: ReactNode[];
}) => {
	const differences = {
		c: colorA.cmyk.c - colorB.cmyk.c,
		m: colorA.cmyk.m - colorB.cmyk.m,
		y: colorA.cmyk.y - colorB.cmyk.y,
		k: colorA.cmyk.k - colorB.cmyk.k,
		w: getWhite(colorA.cmyk) - getWhite(colorB.cmyk),
	};

	console.log(differences);

	const corrector = getCorrector(differences);

	return (
		<div className="color-pair">
			{onDelete && (
				<button className="color-delete" onClick={onDelete}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						fill="currentColor"
						viewBox="0 0 490 490"
					>
						<path d="M11.387 490 245 255.832 478.613 490l10.826-10.826-233.63-234.178 233.63-234.185L478.613 0 245 234.161 11.387 0 .561 10.811l233.63 234.185L.561 479.174z" />
					</svg>
				</button>
			)}
			<h2>
				{title && <span>{title}</span>}
				<Tooltip>
					<ColorInfo colorA={colorA} colorB={colorB} />
				</Tooltip>
			</h2>
			{[...children][0]}
			{[...children][1]}
			{corrector !== '' && (
				<p className="corrector-info">
					<strong>Corrector shade: </strong>
					<span className="corrector-label cinzel-decorative-regular">
						{corrector}
					</span>
					<BrushStroke
						className={`corrector-preview corrector-preview--${corrector}`}
					/>
				</p>
			)}
		</div>
	);
};

export default ColorPair;
