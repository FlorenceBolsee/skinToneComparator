import { useAtom } from 'jotai';
import { useRef, useState } from 'react';
import { ColorResult } from 'react-color';
import swatchAtom from '../../atoms/swatchAtom';
import hex2cmyk from '../../utils/hex2cmyk';
import rgb2cmyk from '../../utils/rgb2cmyk';
import ColorFromImage from '../ColorFromImage/ColorFromImage';
import './ColorInput.scss';
import OverviewStep from './OverviewStep';

const STEPS: { title: string; step: 'colorA' | 'colorB' | 'overview' }[] = [
	{ title: 'Start Color', step: 'colorA' },
	{ title: 'Target Color', step: 'colorB' },
	{ title: 'Overview', step: 'overview' },
];

const Step = ({
	step,
	isActive,
}: {
	step: 'colorA' | 'colorB' | 'overview';
	isActive: boolean;
}) => {
	const isColorStep = step !== 'overview';
	const [state, setState] = useAtom(swatchAtom);

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
		<>
			{isColorStep ? (
				<fieldset className="image-picker">
					<ColorFromImage
						currentColor={step}
						handleInput={handleInput}
						handleChange={handleChange}
						handleNames={handleNames}
						isActive={isActive}
					/>
				</fieldset>
			) : (
				<OverviewStep
					handleInput={handleInput}
					handleChange={handleChange}
					handleNames={handleNames}
				/>
			)}
		</>
	);
};

const Steps = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const lastStep = STEPS.length - 1;

	const stepChange = (amount: number) => {
		if (!containerRef.current) return false;

		const inputs = containerRef.current.querySelectorAll('input');

		const invalidInputs = [...inputs].filter((input) => {
			if (input.checkValidity() || input.closest('[ inert ]')) return false;
			return true;
		});

		if (invalidInputs.length) return false;

		setCurrentStep(amount);

		return false;
	};

	return (
		<div ref={containerRef}>
			{STEPS.map(({ title, step }, idx) => (
				<div
					style={{ display: currentStep === idx ? 'block' : 'none' }}
					inert={idx !== currentStep}
					key={`${step}-${idx}`}
				>
					<h2>{title}</h2>
					<Step step={step} isActive={currentStep === idx} />
				</div>
			))}
			<div className="navigation">
				{currentStep !== 0 && (
					<button type="button" onClick={() => stepChange(currentStep - 1)}>
						Previous
					</button>
				)}
				{currentStep < lastStep && (
					<button type="button" onClick={() => stepChange(currentStep + 1)}>
						Next
					</button>
				)}
				{currentStep === lastStep && <button type="submit">Add Swatch</button>}
			</div>
		</div>
	);
};

export default Steps;
