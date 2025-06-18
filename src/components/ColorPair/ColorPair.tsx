import { ReactNode } from 'react';
import ColorInfo, { Color } from '../ColorInfo/ColorInfo';
import Tooltip from '../Tooltip/Tooltip';
import './ColorPair.scss';

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
				{title}
				<Tooltip>
					<ColorInfo colorA={colorA} colorB={colorB} />
				</Tooltip>
			</h2>
			{[...children][0]}
			{[...children][1]}
		</div>
	);
};

export default ColorPair;
