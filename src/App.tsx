import ColorsFromDataset from './components/ColorsFromDataset/ColorsFromDataset';
import ColorsFromInput from './components/ColorsFromInput/ColorsFromInput';

const App = () => {
	return (
		<div className="app">
			<h1>Skin Tones Comparator</h1>
			<p className="description">
				Helper to find what pigments are missing to adjust a product to your
				skin tone.
			</p>
			<p className="description">
				Provides a visualization in the CMYK color system, more information
				available under the 'i' symbol.
			</p>
			<p className="description">
				The first color should be the shade that you want to adjust (a
				foundation that doesn't match, discoloration...) The second color should
				be the desired shade.
			</p>
			<p className="description">
				For best results, pick the two colors from the same picture with good
				lighting on the selected area.
			</p>
			<ColorsFromInput />
			<ColorsFromDataset />
		</div>
	);
};

export default App;
