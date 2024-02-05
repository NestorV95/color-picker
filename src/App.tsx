import { useState } from 'react';
import { PiEyedropper, PiImages } from 'react-icons/pi';
import { FaUndo } from 'react-icons/fa';
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

const ACCEPTED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

function App() {
	const [hex, setHex] = useState('#000000');
	const [rgb, setRGB] = useState({ r: 0, g: 0, b: 0 });
	const [image, setImage] = useState({ src: '', alt: '' });

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

	const handleUploadImage = e => {
		const file = e.target.files[0];

		if (!file) return;

		if (!ACCEPTED_MIME_TYPES.includes(file.type)) return;
		setImage({
			src: URL.createObjectURL(file),
			alt: file.name
		});
	};

	const handleUseExampleImage = () => {
		setImage({
			src: exampleImage,
			alt: 'Example Image'
		});
	};

	const handleClickUndo = () => {
		setImage({ src: '', alt: '' });
	};

	return (
		<>
			<h1 className='text-3xl text-center font-bold m-8'>Color Picker</h1>
			<div className='m-8 flex justify-center align-center'>
				<div className='max-w-3xl rounded overflow-hidden shadow-lg'>
					{image.src ? (
						<img className='w-full' src={image.src} alt={image.alt} />
					) : (
						<div className='border border-dashed border-gray-500 relative'>
							<input
								type='file'
								className='cursor-pointer relative block opacity-0 w-full h-full p-20 z-50'
								onChange={handleUploadImage}
							/>
							<div className='text-center text-md p-10 absolute top-10 right-0 left-0 m-auto'>
								<p>Drag &amp; Drop image or click to upload</p>
								<p className='text-sm'>
									Only .jpeg, .jpg &amp; .png are accepted
								</p>
							</div>
						</div>
					)}

					<div className='px-6 py-4 flex justify-around items-center'>
						<div className='flex gap-2 w-60'>
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
						<div className='flex flex-row gap-1'>
							<button
								className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 rounded inline-flex items-center'
								title='Eye Dropper'
								onClick={handleClickEyeDropper}
							>
								<PiEyedropper />
							</button>
							<button
								className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 rounded inline-flex items-center'
								title='Example Image'
								onClick={handleUseExampleImage}
							>
								<PiImages />
							</button>
							{image.src && (
								<button
									className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 rounded inline-flex items-center'
									title='Example Image'
									onClick={handleClickUndo}
								>
									<FaUndo />
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
