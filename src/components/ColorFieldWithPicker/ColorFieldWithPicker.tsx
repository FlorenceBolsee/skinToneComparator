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
					<button onClick={() => setShowPicker(false)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							fill="#fff"
							viewBox="0 0 490 490"
						>
							<path d="M11.387 490 245 255.832 478.613 490l10.826-10.826-233.63-234.178 233.63-234.185L478.613 0 245 234.161 11.387 0 .561 10.811l233.63 234.185L.561 479.174z" />
						</svg>
					</button>
					<div
						className="picker-cover"
						onClick={() => setShowPicker(false)}
					></div>
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
