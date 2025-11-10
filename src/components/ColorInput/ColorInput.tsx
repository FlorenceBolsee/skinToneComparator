import { useAtom } from 'jotai';
import { FormEventHandler } from 'react';
import addingSwatchAtom from '../../atoms/addingSwatchAtom';
import swatchAtom, { defaultState } from '../../atoms/swatchAtom';
import { Color } from '../ColorInfo/ColorInfo';
import './ColorInput.scss';
import Steps from './Steps';

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
	const [state, setState] = useAtom(swatchAtom);
	const [addingSwatch, setAddingSwatch] = useAtom(addingSwatchAtom);

	const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		const newSwatch = { ...state };
		newSwatch.id = String(Date.now());
		onSubmit(newSwatch);
		setAddingSwatch(false);
		setState(defaultState);
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
					<Steps />
				</form>
			)}
		</div>
	);
};

export default ColorInput;
