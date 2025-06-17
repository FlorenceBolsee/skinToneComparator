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
					╳
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
