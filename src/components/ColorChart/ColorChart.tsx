import { toneTable } from '../../dataset/generate-dataset';
import { arrayRange } from '../../utils/arrayRange';
import hsl2rgb from '../../utils/hsl2rgb';
import rgb2hex from '../../utils/rgb2hex';
import './ColorChart.scss';

const WARM_OLIVE_HUE = 38;
const COOL_OLIVE_HUE = 24;
const COOL_HUE = 13;
const WARM_HUE = 30;

const ColorHue = ({
	h,
	s,
	l,
	idx,
}: {
	h: number;
	s: number;
	l: number;
	idx: number;
}) => {
	const { r, g, b } = hsl2rgb({ h, s, l });
	const hex = rgb2hex(r, g, b);
	return (
		<div className="chart-hue" style={{ background: hex }}>
			<span>{idx}</span>
		</div>
	);
};

const ColorRow = ({
	label,
	startHsl,
	endHsl,
}: {
	label: string;
	startHsl: { h: number; s: number; l: number };
	endHsl: { h: number; s: number; l: number };
}) => {
	const generateRow = (
		startHsl: { h: number; s: number; l: number },
		endHsl: { h: number; s: number; l: number },
	) => {
		const hues = arrayRange(startHsl.h, endHsl.h, 5);
		const saturations = arrayRange(startHsl.s, endHsl.s, 5);
		const luminances = arrayRange(startHsl.l, endHsl.l, 5);

		return hues.map((h, idx) => ({
			h,
			s: saturations[idx] as number,
			l: luminances[idx] as number,
		}));
	};

	return (
		<>
			<hr />
			<h3>{label}</h3>
			<div className="chart-row">
				{generateRow(startHsl, endHsl).map(({ h, s, l }, idx) => (
					<ColorHue key={`${idx}`} h={h} s={s} l={l} idx={idx + 1} />
				))}
			</div>
		</>
	);
};

const ColorChart = () => {
	return (
		<>
			<ul className="color-chart">
				{toneTable.map(({ lightness: l, saturationValues }, mainIdx) => {
					const saturated = saturationValues[
						saturationValues.length - 1
					] as number;
					const muted = saturationValues[0] as number;
					const saturationRange = arrayRange(muted, saturated, 3);
					return (
						<>
							{saturationRange.map((s, idx) => (
								<ColorRow
									key={idx}
									label={`W${mainIdx + 1}-${idx + 1}`}
									startHsl={{
										h: WARM_HUE,
										s,
										l,
									}}
									endHsl={{
										h: WARM_OLIVE_HUE,
										s,
										l,
									}}
								/>
							))}
							{saturationRange.map((s, idx) => (
								<ColorRow
									label={`C${mainIdx + 1}-${idx + 1}`}
									key={idx}
									startHsl={{
										h: COOL_HUE,
										s,
										l,
									}}
									endHsl={{
										h: COOL_OLIVE_HUE,
										s,
										l,
									}}
								/>
							))}
						</>
					);
				})}
			</ul>
			<div className="gradient-grid">
				<div className="gradient gradient-deep"></div>
				<div className="gradient gradient-tan"></div>
				<div className="gradient gradient-medium"></div>
				<div className="gradient gradient-light"></div>
				<div className="gradient gradient-pale"></div>
			</div>
		</>
	);
};

export default ColorChart;
