import { useEffect, useState } from 'react';
import ColorList from '../ColorList/ColorList';
import ColorPair from '../ColorPair/ColorPair';
import ColorSwatch from '../ColorSwatch/ColorSwatch';

export type ColorData = {
	label: string;
	cmyk: {
		c: number;
		m: number;
		y: number;
		k: number;
	};
};

export type ColorDataset = {
	category: string;
	items: ColorData[];
};

export type ColorDataPair = {
	title: string;
	swatches: [ColorData, ColorData];
};

const generateLabel = (label: string, title: string) => {
	const generatedLabel = label.replace(title, '');
	return generatedLabel.length ? generatedLabel : 'Regular';
};

const ColorsFromDataset = () => {
	const [dataSwatches, setDataSwatches] = useState<ColorDataPair[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			let json: ColorDataset[] = [];
			await fetch('./skin-dataset.json', {
				headers: {
					accept: 'application/json',
				},
			})
				.then((response) => {
					if (response.ok) {
						return response.json();
					}
					return [];
				})
				.then((response) => {
					json = response;
				});

			const pairings: ColorDataPair[] = [];

			json.forEach(({ category, items }) => {
				const isOlive = category.includes('Olive');
				const isMuted = category.includes('Muted');

				if (!isOlive && !isMuted) return;

				const trimmedLabel = category.replace(/Olive|Muted/g, '').trim();

				const pairCategory = json.find(
					({ category }) => category === trimmedLabel,
				);

				if (pairCategory) {
					const orderedPairItems = [...pairCategory.items].sort(
						(a, b) => a.cmyk.k - b.cmyk.k,
					);
					orderedPairItems.forEach((item, idx) => {
						if (items[idx]) {
							pairings.push({
								title: trimmedLabel,
								swatches: [item, items[idx]],
							});
						}
					});
				}
			});

			setDataSwatches(pairings);
		};

		fetchData();
	}, []);

	return (
		<ColorList>
			{dataSwatches.map(({ title, swatches }, idx) => (
				<ColorPair
					key={`dataset-pair-${idx}`}
					title={title}
					colorA={{
						name: generateLabel(swatches[0].label, title),
						cmyk: swatches[0].cmyk,
					}}
					colorB={{
						name: generateLabel(swatches[1].label, title),
						cmyk: swatches[1].cmyk,
					}}
				>
					{swatches.map((data, idx) => {
						const { c, m, y, k } = data.cmyk;
						const label = generateLabel(data.label, title);

						return (
							<ColorSwatch
								key={`dataset-swatch-${idx}`}
								name={label}
								cyan={c}
								magenta={m}
								yellow={y}
								black={k}
							/>
						);
					})}
				</ColorPair>
			))}
		</ColorList>
	);
};

export default ColorsFromDataset;
