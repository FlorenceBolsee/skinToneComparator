import { ReactNode } from 'react';
import './ColorList.scss';

const ColorList = ({ children }: { children: ReactNode[] }) => {
	return (
		<ul className="color-list">
			{[...children].map((child, idx) => (
				<li key={idx}>{child}</li>
			))}
		</ul>
	);
};

export default ColorList;
