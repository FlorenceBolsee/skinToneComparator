import { writeFileSync } from 'fs';
import path from 'path';
import hsl2rgb from '../utils/hsl2rgb';
import rgb2cmyk from '../utils/rgb2cmyk';
import skinCategoryPicker from '../utils/skinCategoryPicker';
import {
	hueValues,
	lightnessValues,
	saturationValues,
} from './generate-dataset';

const __dirname = path.resolve();

export type DatasetItem = {
	label: string;
	cmyk: {
		c: number;
		m: number;
		y: number;
		k: number;
	};
};

let minLight = 100;
let maxLight = 0;
let minCyan = 100;
let maxCyan = 0;
let minMagenta = 100;
let maxMagenta = 0;
let minYellow = 100;
let maxYellow = 0;
let minKey = 100;
let maxKey = 0;

const json: DatasetItem[] = [];

const labelRecords: Record<string, boolean> = {};

hueValues.forEach((h) => {
	saturationValues.forEach((s) => {
		lightnessValues.forEach((l) => {
			const datasetItem: DatasetItem = {
				label: '',
				cmyk: {
					c: 0,
					m: 0,
					y: 0,
					k: 0,
				},
			};

			const { r, g, b } = hsl2rgb({ h, s, l });

			const { c, m, y, k } = rgb2cmyk(r, g, b);

			datasetItem.label = skinCategoryPicker({ c, m, y, k }, { h, s, l });

			if (l > maxLight) maxLight = l;
			if (l < minLight) minLight = l;
			if (c > maxCyan) maxCyan = c;
			if (c < minCyan) minCyan = c;
			if (m > maxMagenta) maxMagenta = m;
			if (m < minMagenta) minMagenta = m;
			if (y > maxYellow) maxYellow = y;
			if (y < minYellow) minYellow = y;
			if (k > maxKey) maxKey = k;
			if (k < minKey) minKey = k;

			datasetItem.cmyk = { c, m, y, k };

			if (labelRecords[datasetItem.label]) return;

			labelRecords[datasetItem.label] = true;

			json.push(datasetItem);
		});
	});
});

const jsonByCategories: { category: string; items: DatasetItem[] }[] = [];

json.forEach(({ label }) => {
	if (jsonByCategories.find(({ category }) => category === label)) return;

	jsonByCategories.push({
		category: label,
		items: json.filter(({ label: itemLabel }) => itemLabel === label),
	});
});

console.log({
	minLight,
	maxLight,
	minCyan,
	maxCyan,
	minMagenta,
	maxMagenta,
	minYellow,
	maxYellow,
	minKey,
	maxKey,
});

const outPath = path.join(__dirname, '/public/skin-dataset.json');
// Convert object to string, write json to file
writeFileSync(outPath, JSON.stringify(jsonByCategories), 'utf8');
