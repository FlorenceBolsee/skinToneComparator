import { ReactNode, useState } from 'react';
import './Tooltip.scss';

const Tooltip = ({ children }: { children: ReactNode | ReactNode[] }) => {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<>
			<button
				className="tooltip-trigger"
				title="Detail"
				onMouseOver={() => setIsVisible(true)}
				onMouseLeave={() => setIsVisible(false)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlSpace="preserve"
					width="16"
					height="16"
					viewBox="0 0 416.979 416.979"
				>
					<path d="M356.004 61.156c-81.37-81.47-213.377-81.551-294.848-.182-81.47 81.371-81.552 213.379-.181 294.85 81.369 81.47 213.378 81.551 294.849.181 81.469-81.369 81.551-213.379.18-294.849zM237.6 340.786a5.821 5.821 0 0 1-5.822 5.822h-46.576a5.821 5.821 0 0 1-5.822-5.822V167.885a5.821 5.821 0 0 1 5.822-5.822h46.576a5.82 5.82 0 0 1 5.822 5.822v172.901zm-29.11-202.885c-18.618 0-33.766-15.146-33.766-33.765 0-18.617 15.147-33.766 33.766-33.766s33.766 15.148 33.766 33.766c0 18.619-15.149 33.765-33.766 33.765z" />
				</svg>
			</button>
			{isVisible && <div className="tooltip">{children}</div>}
		</>
	);
};

export default Tooltip;
