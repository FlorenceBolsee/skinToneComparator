import { FormEventHandler, useState } from 'react';
import { ColorResult } from 'react-color';
import hex2cmyk from '../../utils/hex2cmyk';
import rgb2cmyk from '../../utils/rgb2cmyk';
import ColorFieldWithPicker from '../ColorFieldWithPicker/ColorFieldWithPicker';
import ColorFromImage from '../ColorFromImage/ColorFromImage';
import { Color } from '../ColorInfo/ColorInfo';
import './ColorInput.scss';

export type ColorSwatch = Color & {
	value: string;
};

export type SwatchState = {
	id: string;
	title: string;
	colorA: ColorSwatch;
	colorB: ColorSwatch;
};

const ColorInput = ({
	onSubmit,
}: {
	onSubmit: (newSwatch: SwatchState) => void;
}) => {
	const defaultState: SwatchState = {
		id: '',
		title: '',
		colorA: {
			name: '',
			value: '',
			cmyk: {
				c: 0,
				m: 0,
				y: 0,
				k: 0,
			},
		},
		colorB: {
			name: '',
			value: '',
			cmyk: {
				c: 0,
				m: 0,
				y: 0,
				k: 0,
			},
		},
	};

	const [state, setState] = useState(defaultState);
	const [addingSwatch, setAddingSwatch] = useState(false);

	const handleChange = (
		color: ColorResult,
		currentColor: 'colorA' | 'colorB',
	) => {
		const newState = { ...state };
		newState[currentColor].value = color.hex;
		const { r, g, b } = color.rgb;
		newState[currentColor].cmyk = rgb2cmyk(r, g, b);
		setState(newState);
	};

	const handleInput = (value: string, currentColor: 'colorA' | 'colorB') => {
		const newState = { ...state };
		newState[currentColor].value = value;
		const cmyk = hex2cmyk(value);
		if (cmyk) newState[currentColor].cmyk = cmyk;
		setState(newState);
	};

	const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		const newSwatch = { ...state };
		newSwatch.id = String(Date.now());
		onSubmit(newSwatch);
		setAddingSwatch(false);
		setState(defaultState);
	};

	const handleNames = (
		value: string,
		stateKey: 'colorA' | 'colorB' | 'title',
	) => {
		const newState = { ...state };
		if (stateKey === 'title') {
			newState.title = value;
		} else {
			newState[stateKey].name = value;
		}
		setState(newState);
	};

	return (
		<div className="color-input">
			{!addingSwatch && (
				<button
					className="color-add cinzel-decorative-regular"
					onClick={() => setAddingSwatch(true)}
				>
					Start creating a swatch
				</button>
			)}
			{addingSwatch && (
				<form onSubmit={handleSubmit}>
					<h2>Enter a new swatch</h2>
					<fieldset className="image-picker">
						<ColorFromImage onInput={handleInput} />
					</fieldset>
					<fieldset className="form-part">
						<label htmlFor="color-title">Swatch title</label>
						<input
							id="color-title"
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
						<label htmlFor="color-a-name">Start color name</label>
						<input
							id="color-a-name"
							name="color-a-name"
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
						<label htmlFor="color-b-name">Target color name</label>
						<input
							id="color-b-name"
							name="color-b-name"
							type="text"
							value={state.colorB.name}
							onChange={(event) => handleNames(event.target.value, 'colorB')}
						/>
					</fieldset>
					<button type="submit">Add Swatch</button>
				</form>
			)}
		</div>
	);
};

export default ColorInput;
