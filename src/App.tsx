import { useState } from 'react';
import { PiEyedropper } from 'react-icons/pi';
/* 
  Image by Pawel Czerwinski 
  https://unsplash.com/photos/pink-and-blue-abstract-painting-sxaYEsE12RM?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
*/

import exampleImage from '@/assets/pawel-czerwinski-sxaYEsE12RM-unsplash.jpg';

interface EyeDropperOpen {
	signal?: AbortSignal;
}

interface EyeDropper {
	open(arg: EyeDropperOpen): Promise<{ sRGBHex: string }>;
}

declare const EyeDropper: {
	prototype: EyeDropper;
	new (): EyeDropper;
};
declare global {
	interface Window {
		EyeDropper: EyeDropper;
	}
}

function App() {
	const [hex, setHex] = useState('#000000');
	const [rgb, setRGB] = useState({ r: 0, g: 0, b: 0 });

	const hexToRGB = (hex: string): { r: number; g: number; b: number } => {
		return {
			r: parseInt(hex.substring(1, 3), 16),
			g: parseInt(hex.substring(3, 5), 16),
			b: parseInt(hex.substring(5, 7), 16)
		};
	};

	const handleClickEyeDropper = async () => {
		if (!window.EyeDropper) {
			alert('Your browser does not support the EyeDropper API');
			return;
		}
		const eyeDropper = new EyeDropper();
		const abortController = new AbortController();

		try {
			const { sRGBHex } = await eyeDropper.open({
				signal: abortController.signal
			});
			const rgb = hexToRGB(sRGBHex);
			setHex(sRGBHex);
			setRGB(rgb);
		} catch (err) {
			console.error(err);
		}

		setTimeout(() => {
			abortController.abort();
		}, 30000);
	};

	return (
		<>
			<h1 className='text-3xl text-center font-bold m-8'>Color Picker</h1>
			<div className='m-8 flex justify-center align-center'>
				<div className='max-w-3xl rounded overflow-hidden shadow-lg'>
					<img className='w-full' src={exampleImage} alt='sample this' />
					<div className='px-6 py-4 flex justify-around items-center'>
						<div className='flex gap-5 w-60'>
							<div
								style={{ height: '5rem', width: '5rem', backgroundColor: hex }}
							/>
							<div>
								<p className='text-md font-bold'>Hex: {hex}</p>
								<p className='text-md font-bold'>
									RGB: ({rgb.r}, {rgb.g}, {rgb.b})
								</p>
							</div>
						</div>

						<button
							className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center'
							onClick={handleClickEyeDropper}
						>
							<PiEyedropper />
							<span>Eye Dropper</span>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
