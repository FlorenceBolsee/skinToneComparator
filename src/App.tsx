import BrushStroke from '@assets/brush-stroke.svg?react';
import { useAtomValue } from 'jotai';
import addingSwatchAtom from './atoms/addingSwatchAtom';
import ColorsFromDataset from './components/ColorsFromDataset/ColorsFromDataset';
import ColorsFromInput from './components/ColorsFromInput/ColorsFromInput';

const App = () => {
	const addingSwatch = useAtomValue(addingSwatchAtom);

	return (
		<div className="app">
			<h1 className="cinzel-decorative-regular">
				<span>Color Corrector Helper</span>
				<BrushStroke />
			</h1>
			{!addingSwatch && (
				<>
					<p className="description">
						Helper to find what pigments are missing to adjust a makeup product
						to your skin tone or to pick a color corrector shade.
					</p>
					<p className="description">
						Provides a visualization in the CMYK color system, a detailed
						overview and a color corrector suggestion.
					</p>
					<p className="description">
						The start color should be the shade that you want to adjust (a
						foundation that doesn't match, discoloration...)
					</p>
					<p className="description">
						The target color should be the desired shade.
					</p>
					<p className="description">
						For best results, pick the two colors from the same picture with
						good lighting on the selected area.
					</p>
				</>
			)}
			<ColorsFromInput />
			<h2>Examples</h2>
			<ColorsFromDataset />
		</div>
	);
};

export default App;
