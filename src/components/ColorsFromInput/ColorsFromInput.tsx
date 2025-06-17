import { useEffect, useState } from 'react';
import ColorInput, { SwatchState } from '../ColorInput/ColorInput';
import ColorList from '../ColorList/ColorList';
import ColorPair from '../ColorPair/ColorPair';
import ColorSwatch from '../ColorSwatch/ColorSwatch';

const ColorsFromInput = () => {
	const [swatches, setSwatches] = useState<SwatchState[]>([]);

	useEffect(() => {
		const storage = localStorage.getItem('color-swatch-comparator');
		if (!storage) return;
		setSwatches(JSON.parse(storage));
	}, []);

	const handleSubmit = (newSwatch: SwatchState) => {
		const newSwatches = [newSwatch, ...swatches];
		setSwatches(newSwatches);
		localStorage.setItem(
			'color-swatch-comparator',
			JSON.stringify(newSwatches),
		);
	};

	const removeSwatch = (id: string) => {
		const newSwatches = [...swatches].filter((swatch) => swatch.id !== id);
		setSwatches(newSwatches);
		localStorage.setItem(
			'color-swatch-comparator',
			JSON.stringify(newSwatches),
		);
	};

	return (
		<>
			<ColorInput onSubmit={handleSubmit} />
			{!!swatches.length && (
				<ColorList>
					{swatches.map(({ id, title, colorA, colorB }) => (
						<ColorPair
							title={title}
							onDelete={() => removeSwatch(id)}
							key={id}
							colorA={colorA}
							colorB={colorB}
						>
							<ColorSwatch
								name={colorA.name}
								cyan={colorA.cmyk.c}
								magenta={colorA.cmyk.m}
								yellow={colorA.cmyk.y}
								black={colorA.cmyk.k}
							/>
							<ColorSwatch
								name={colorB.name}
								cyan={colorB.cmyk.c}
								magenta={colorB.cmyk.m}
								yellow={colorB.cmyk.y}
								black={colorB.cmyk.k}
							/>
						</ColorPair>
					))}
				</ColorList>
			)}
		</>
	);
};

export default ColorsFromInput;
