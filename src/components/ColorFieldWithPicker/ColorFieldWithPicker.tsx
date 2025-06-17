import { ChangeEventHandler, CSSProperties, useState } from 'react';
import { ColorChangeHandler, SketchPicker } from 'react-color';
import './ColorFieldWithPicker.scss';

const ColorFieldWithPicker = ({
	label,
	name,
	value,
	onChange,
	onInput,
}: {
	label: string;
	name: string;
	value: string;
	onChange: ColorChangeHandler;
	onInput: ChangeEventHandler<HTMLInputElement>;
}) => {
	const [showPicker, setShowPicker] = useState(false);
	const presetColors = [
		'#f8dabe',
		'#e9b992',
		'#e8ae7c',
		'#c57c41',
		'#b66c2d',
		'#a36639',
		'#965324',
		'#522a11',
	];

	return (
		<fieldset
			className="color-field"
			style={{ '--color-input': value } as CSSProperties}
		>
			<label htmlFor={name}>
				{label}
				<input
					id={name}
					name={name}
					type="text"
					value={value}
					onChange={onInput}
					onClick={() => setShowPicker(!showPicker)}
					required={true}
				/>
			</label>
			{showPicker && (
				<div className="picker-popover">
					<button onClick={() => setShowPicker(false)}>╳</button>
					<div className="picker-cover" onClick={() => setShowPicker(false)} />
					<SketchPicker
						color={value}
						disableAlpha={true}
						onChange={onChange}
						onChangeComplete={onChange}
						presetColors={presetColors}
					/>
				</div>
			)}
		</fieldset>
	);
};

export default ColorFieldWithPicker;
