import { useState } from 'react';

const DEFAULT_COLORS_STATE = { hex: '#000000', rgb: { r: 0, g: 0, b: 0 } };

export default function useColors() {
	const [state, setState] = useState(DEFAULT_COLORS_STATE);

	const parseHex = (hex: string, start: number, finish: number): number => {
		return parseInt(hex.substring(start, finish), 16);
	};

	const hexToRGB = (hex: string): { r: number; g: number; b: number } => {
		return {
			r: parseHex(hex, 1, 3),
			g: parseHex(hex, 3, 5),
			b: parseHex(hex, 5, 7)
		};
	};

	const setColors = (hex: string) => {
		setState({ hex, rgb: hexToRGB(hex) });
	};

	return {
		...state,
		setColors
	};
}
