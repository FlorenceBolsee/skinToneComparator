import { useAtomValue } from 'jotai';
import { ColorResult } from 'react-color';
import swatchAtom from '../../atoms/swatchAtom';
import ColorFieldWithPicker from '../ColorFieldWithPicker/ColorFieldWithPicker';

const OverviewStep = ({
	handleChange,
	handleInput,
	handleNames,
}: {
	handleChange: (color: ColorResult, currentColor: 'colorA' | 'colorB') => void;
	handleInput: (value: string, currentColor: 'colorA' | 'colorB') => void;
	handleNames: (value: string, stateKey: 'colorA' | 'colorB' | 'title') => void;
}) => {
	const state = useAtomValue(swatchAtom);

	return (
		<fieldset className="form-part">
			<label htmlFor="overview-color-title">Swatch title</label>
			<input
				id="overview-color-title"
				name="color-title"
				type="text"
				value={state.title}
				onChange={(event) => handleNames(event.target.value, 'title')}
			/>
			<ColorFieldWithPicker
				label="Start color *"
				name="colorA"
				value={state.colorA.value}
				onChange={(color) => handleChange(color, 'colorA')}
				onInput={(event) => handleInput(event.target.value, 'colorA')}
			/>
			<label htmlFor="overview-color-a-name">Start color name</label>
			<input
				id="overview-color-a-name"
				name="overview-color-a-name"
				type="text"
				value={state.colorA.name}
				onChange={(event) => handleNames(event.target.value, 'colorA')}
			/>
			<ColorFieldWithPicker
				label="Target color *"
				name="colorB"
				value={state.colorB.value}
				onChange={(color) => handleChange(color, 'colorB')}
				onInput={(event) => handleInput(event.target.value, 'colorB')}
			/>
			<label htmlFor="overview-color-b-name">Target color name</label>
			<input
				id="overview-color-b-name"
				name="overview-color-b-name"
				type="text"
				value={state.colorB.name}
				onChange={(event) => handleNames(event.target.value, 'colorB')}
			/>
		</fieldset>
	);
};

export default OverviewStep;
