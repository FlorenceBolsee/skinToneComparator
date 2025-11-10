import { CSSProperties, useEffect, useState } from 'react';
import './ColorBar.scss';

const ColorBar = ({
	height,
	background,
	label,
}: {
	height: number;
	background: string;
	label: string;
}) => {
	const [barHeight, setBarHeight] = useState(0);
	const shortLabel = label.charAt(0);
	const barWidth = 9;
	const fullHeight = 58;

	useEffect(() => {
		setBarHeight(height * 0.6);
	}, []);

	return (
		<div className="color-bar" aria-label={`${label}: ${height}%`}>
			<svg
				width={barWidth}
				height={fullHeight}
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect
					style={{ '--bar-height': Math.round(barHeight) } as CSSProperties}
					className="color-bar-background"
					width={barWidth}
					height={fullHeight}
					x="0"
					y="0"
					fill="var(--color-crust)"
				/>
				<rect
					style={{ '--bar-height': Math.round(barHeight) } as CSSProperties}
					className="color-bar-foreground"
					width={barWidth}
					height="0"
					x="0"
					y="0"
					rx="2"
					ry="2"
					fill={background}
				/>
			</svg>
			<span>{shortLabel}</span>
		</div>
	);
};

export default ColorBar;
