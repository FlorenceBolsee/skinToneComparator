import debounce from 'debounce';
import {
	ChangeEvent,
	CSSProperties,
	MouseEventHandler,
	useRef,
	useState,
	WheelEventHandler,
} from 'react';
import lab2rgb from '../../utils/lab2rgb';
import { numArrayAverage } from '../../utils/numArrayAverage';
import { numArrayMedian } from '../../utils/numArrayMedian';
import rgb2hex from '../../utils/rgb2hex';
import { rgb2lab } from '../../utils/rgb2lab';
import './ColorFromImage.scss';

const IMAGE_HEIGHT = 354;
const CLASS_FREEZE_BODY = 'prevent-scroll';

const ColorFromImage = ({
	onInput,
}: {
	onInput: (value: string, currentColor: 'colorA' | 'colorB') => void;
}) => {
	const [selecting, setSelecting] = useState<'colorA' | 'colorB' | null>(null);
	const [picture, setPicture] = useState('');
	const [viewFinder, setViewFinder] = useState({
		background: 'transparent',
		x: 5,
		y: 5,
	});
	const [imageData, setImageData] =
		useState<Uint8ClampedArray<ArrayBufferLike>>();
	const [sampleSize, setSampleSize] = useState(10);
	const [useAverage, setUserAverage] = useState(false);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const containerRef = useRef<HTMLFieldSetElement>(null);

	const getScrollbarWidth = () =>
		window.innerWidth - document.documentElement.clientWidth;

	const freezeBody = (freeze: boolean) => {
		const { body } = document;

		if (freeze) {
			body.style.top = `-${window.scrollY}px`;
			body.style.paddingRight = `${getScrollbarWidth()}px`;
		}

		body.classList.toggle(CLASS_FREEZE_BODY, freeze);

		if (freeze) return;

		const scrollY = body.style.top;

		body.style.top = '';
		body.style.paddingRight = '';

		window.scrollTo({
			top: parseInt(scrollY) * -1,
			behavior: 'instant',
		});
	};

	const adjustSample: WheelEventHandler<HTMLCanvasElement> = (event) => {
		if (!selecting || !document.body.classList.contains(CLASS_FREEZE_BODY))
			return;
		const newSize = sampleSize + (event.deltaY > 0 ? 4 : -4);
		setSampleSize(Math.min(Math.max(newSize - (newSize % 2), 6), 64));
	};

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
		if (scaleY > scaleX) {
			scale = scaleY;
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
		setViewFinder({
			...viewFinder,
			background: 'transparent',
		});
		setSelecting(currentColor);
	};

	const handleCanvasClick: MouseEventHandler<HTMLCanvasElement> = (event) => {
		if (!selecting) return;

		const backgroundColor =
			viewFinder.background === 'transparent'
				? getCanvasColor(event)
				: viewFinder.background;

		onInput(backgroundColor, selecting);
	};

	const getCanvasColor = (
		event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
	) => {
		if (!selecting || !canvasRef.current || !imageData)
			return viewFinder.background;

		const { pageX, pageY } = event;

		const { top, left, width, height } =
			canvasRef.current.getBoundingClientRect();

		const x = Math.round(Math.min(Math.max(pageX - left - scrollX, 0), width));
		const y = Math.round(Math.min(Math.max(pageY - top - scrollY, 0), height));

		const dataLine = width * 4;
		const dataStartCol = Math.max(x * 4 - (4 * sampleSize) / 2, 0);
		const dataStartIndex =
			Math.max(y * dataLine - (sampleSize / 2) * dataLine, 0) + dataStartCol;
		const dataSampleWidth = sampleSize * 4;
		const dataEndCol = Math.min(dataStartCol + dataSampleWidth, dataLine);
		const dataEndIndex =
			dataStartIndex + sampleSize * dataLine + dataSampleWidth;

		const ls: number[] = [];
		const as: number[] = [];
		const bs: number[] = [];

		let pixels = 0;

		for (let i = dataEndIndex; i >= dataStartIndex; i -= 4) {
			const dataX = i % dataLine;
			if (dataX > dataStartCol && dataX <= dataEndCol) {
				pixels += 1;
				if (imageData[i] && imageData[i + 1] && imageData[i + 2]) {
					const { l, a, b } = rgb2lab({
						r: imageData[i] as number,
						g: imageData[i + 1] as number,
						b: imageData[i + 2] as number,
					});
					ls.push(l);
					as.push(a);
					bs.push(b);
				}
			}
		}

		const lAverage = numArrayAverage(ls);
		const aAverage = numArrayAverage(as);
		const bAverage = numArrayAverage(bs);

		const lMedian = numArrayMedian(ls);
		const aMedian = numArrayMedian(as);
		const bMedian = numArrayMedian(bs);

		const {
			r: rAverage,
			g: gAverage,
			b: blueAverage,
		} = lab2rgb({ l: lAverage, a: aAverage, b: bAverage });
		const {
			r: rMedian,
			g: gMedian,
			b: blueMedian,
		} = lab2rgb({ l: lMedian, a: aMedian, b: bMedian });
		const hexAverage = rgb2hex(rAverage, gAverage, blueAverage);
		const hexMedian = rgb2hex(rMedian, gMedian, blueMedian);

		setViewFinder({
			background: useAverage ? hexAverage : hexMedian,
			x: Math.min(Math.max(x, sampleSize / 2), width - sampleSize / 2),
			y: Math.min(Math.max(y, sampleSize / 2), height - sampleSize / 2),
		});
		return useAverage ? hexAverage : hexMedian;
	};

	const handleCanvasHover = debounce(getCanvasColor, 5);

	return (
		<>
			<label htmlFor="image">Load image (optional)</label>
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

				<div className="checkbox-input">
					<label
						htmlFor="useAverage"
						title="By default, the output is the median value of the selected area"
					>
						<input
							type="checkbox"
							id="useAverage"
							name="useAverage"
							value={`${useAverage}`}
							onChange={(event) => setUserAverage(event.target.checked)}
						/>
						Use average
					</label>
				</div>

				<div
					className="color-preview"
					style={{ '--color-input': viewFinder.background } as CSSProperties}
				></div>

				{!!selecting && (
					<>
						<button
							onClick={(event) => {
								event.preventDefault();
								setSampleSize(Math.min(sampleSize + 12, 64));
							}}
							disabled={sampleSize === 64}
							className="target-sizing"
						>
							+
						</button>
						<button
							onClick={(event) => {
								event.preventDefault();
								setSampleSize(Math.max(sampleSize - 12, 6));
							}}
							disabled={sampleSize === 6}
							className="target-sizing"
						>
							-
						</button>
					</>
				)}

				<div className="radio-input">
					<label htmlFor="selectingColorA">
						<input
							type="radio"
							id="selectingColorA"
							name="selecting"
							value="colorA"
							checked={selecting === 'colorA'}
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
							checked={selecting === 'colorB'}
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
					onWheel={adjustSample}
					onPointerEnter={() => freezeBody(true)}
					onPointerLeave={() => freezeBody(false)}
				></canvas>
				<div
					className="color-viewfinder"
					style={
						{
							'--viewfinder-x': `${viewFinder.x}px`,
							'--viewfinder-y': `${viewFinder.y}px`,
							'--viewfinder-width': `${sampleSize}px`,
						} as CSSProperties
					}
				></div>
			</fieldset>
			<img className="image-pick" ref={imageRef} alt="" onLoad={getImageData} />
		</>
	);
};

export default ColorFromImage;
