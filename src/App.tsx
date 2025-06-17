import ColorsFromDataset from './components/ColorsFromDataset/ColorsFromDataset';
import ColorsFromInput from './components/ColorsFromInput/ColorsFromInput';

const App = () => {
	return (
		<div className="app">
			<h1>Skin Tones Comparisons</h1>
			<p className="description">
				Swatches picked from various skin tones with visualization using the
				CMYK color system to understand the difference in pigments.
			</p>
			<ColorsFromInput />
			<ColorsFromDataset />
		</div>
	);
};

export default App;
