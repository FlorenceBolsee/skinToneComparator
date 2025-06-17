import {
	ChangeEvent,
	CSSProperties,
	MouseEventHandler,
	useRef,
	useState,
} from 'react';
import rgb2hex from '../../utils/rgb2hex';
import './ColorFromImage.scss';

const IMAGE_HEIGHT = 354;

const ColorFromImage = ({
	onInput,
}: {
	onInput: (value: string, currentColor: 'colorA' | 'colorB') => void;
}) => {
	const [selecting, setSelecting] = useState<'colorA' | 'colorB' | null>(null);
	const [picture, setPicture] = useState('');
	const [magnifier, setMagnifier] = useState({
		background: 'transparent',
		x: 0,
		y: 0,
	});
	const [imageData, setImageData] =
		useState<Uint8ClampedArray<ArrayBufferLike>>();
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const containerRef = useRef<HTMLFieldSetElement>(null);

	const showImage = (fileReader: FileReader) => {
		if (
			!imageRef.current ||
			!fileReader.result ||
			typeof fileReader.result !== 'string'
		)
			return;
		imageRef.current.src = fileReader.result;
	};

	const handlePicture = (event: ChangeEvent<HTMLInputElement>) => {
		setPicture(event.target.value);
		const files = event.target.files;

		if (FileReader && files && files.length) {
			const fileReader = new FileReader();
			fileReader.onload = () => showImage(fileReader);
			if (files[0]) fileReader.readAsDataURL(files[0]);
		}
	};

	const getImageData = () => {
		if (!imageRef.current || !canvasRef.current || !containerRef.current)
			return;
		const { clientWidth: width } = containerRef.current;
		const { naturalWidth, naturalHeight } = imageRef.current;
		canvasRef.current.width = width;
		canvasRef.current.height = IMAGE_HEIGHT;
		const scaleX = width / naturalWidth;
		const scaleY = IMAGE_HEIGHT / naturalHeight;
		let scale = scaleX;
		if (scaleY < scaleX) {
			scale = scaleX;
		}

		const x = ((naturalWidth * scale - width) / 2) * -1;
		const y = ((naturalHeight * scale - IMAGE_HEIGHT) / 2) * -1;
		const ctx = canvasRef.current.getContext('2d', {
			willReadFrequently: true,
		});
		if (!ctx) return;
		ctx.rect(0, 0, width, IMAGE_HEIGHT);
		ctx.fillStyle = '#333';
		ctx.fill();
		ctx.drawImage(
			imageRef.current,
			x,
			y,
			naturalWidth,
			naturalHeight,
			x,
			y,
			naturalWidth * scale,
			naturalHeight * scale,
		);
		setImageData(ctx.getImageData(0, 0, width, IMAGE_HEIGHT).data);
	};

	const handleSelectionClick = (currentColor: 'colorA' | 'colorB') => {
		setSelecting(currentColor);
	};

	const handleCanvasClick: MouseEventHandler<HTMLCanvasElement> = () => {
		if (!selecting || magnifier.background === 'transparent') return;

		onInput(magnifier.background, selecting);
	};

	const handleCanvasHover: MouseEventHandler<HTMLCanvasElement> = (event) => {
		if (!selecting || !canvasRef.current || !imageData) return;

		const { pageX, pageY } = event;

		const { top, left, width, height } =
			canvasRef.current.getBoundingClientRect();

		const x = Math.round(Math.min(Math.max(pageX - left - scrollX, 0), width));
		const y = Math.round(Math.min(Math.max(pageY - top - scrollY, 0), height));

		const dataLine = width * 4;
		const dataStartCol = Math.max(x * 4 - 3 * 4, 0);
		const dataStartIndex = y * dataLine + dataStartCol;
		const dataSampleWidth = 6 * 4;
		const dataEndCol = Math.min(dataStartCol + dataSampleWidth, dataLine);
		const dataEndIndex = dataStartIndex + 5 * dataLine + dataSampleWidth;

		const reds: number[] = [];
		const greens: number[] = [];
		const blues: number[] = [];

		let pixels = 0;

		for (let i = dataEndIndex; i >= dataStartIndex; i -= 4) {
			const dataX = i % dataLine;
			if (dataX > dataStartCol && dataX <= dataEndCol) {
				pixels += 1;
				if (imageData[i]) reds.push(imageData[i] as number);
				if (imageData[i + 1]) greens.push(imageData[i + 1] as number);
				if (imageData[i + 2]) blues.push(imageData[i + 2] as number);
			}
		}

		const r = reds.reduce((acc, curr) => acc + curr, 0) / reds.length;
		const g = greens.reduce((acc, curr) => acc + curr, 0) / greens.length;
		const b = blues.reduce((acc, curr) => acc + curr, 0) / blues.length;

		const hex = rgb2hex(r, g, b);
		setMagnifier({
			background: hex,
			x: Math.min(Math.max(x + 10, 0), width - 24),
			y: Math.min(Math.max(y - 32, 0), height - 24),
		});
	};

	return (
		<>
			<label htmlFor="image">Load image</label>
			<input
				className="file-upload"
				type="file"
				name="image"
				id="image"
				value={picture}
				onChange={handlePicture}
			/>
			<fieldset
				ref={containerRef}
				className={`image-container${selecting ? ' color-picking' : ''}${picture.length > 0 ? ' show' : ''}`}
			>
				<legend>Select from Picture</legend>

				<div className="radio-input">
					<label htmlFor="selectingColorA">
						<input
							type="radio"
							id="selectingColorA"
							name="selecting"
							value="colorA"
							onChange={(event) => {
								if (event.target.checked) handleSelectionClick('colorA');
							}}
						/>
						First color
					</label>
					<label htmlFor="selectingColorB">
						<input
							type="radio"
							id="selectingColorB"
							name="selecting"
							value="colorB"
							onChange={(event) => {
								if (event.target.checked) handleSelectionClick('colorB');
							}}
						/>
						Second color
					</label>
				</div>
				<canvas
					ref={canvasRef}
					height="0"
					onClick={handleCanvasClick}
					onMouseMove={handleCanvasHover}
				></canvas>
				<div
					className="color-magnifier"
					style={
						{
							'--magnifier-background': magnifier.background,
							'--magnifier-x': `${magnifier.x}px`,
							'--magnifier-y': `${magnifier.y}px`,
						} as CSSProperties
					}
				></div>
			</fieldset>
			<img className="image-pick" ref={imageRef} alt="" onLoad={getImageData} />
		</>
	);
};

export default ColorFromImage;
