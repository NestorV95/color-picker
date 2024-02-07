import { PiEyedropper, PiImages } from 'react-icons/pi';
import { FaUndo } from 'react-icons/fa';
import Button from './components/Button';
import DragNDrop from './components/DragNDrop';
import useImage from './hooks/useImage';
import useColors from './hooks/useColors';
import useEyeDropper from './hooks/useEyeDropper';

function App() {
	const { hex, rgb, setColors } = useColors();
	const { image, setUploadedImage, setExampleImage, resetImage } = useImage();
	const { isSupported, open, close } = useEyeDropper();

	const handleClickEyeDropper = async () => {
		if (!isSupported) {
			alert('Your browser does not support the EyeDropper API');
			return;
		}
		const { sRGBHex, error } = await open();

		if (error) {
			alert('Something went wrong.');
			return;
		}

		if (sRGBHex) setColors(sRGBHex);

		setTimeout(() => {
			close();
		}, 30000);
	};

	return (
		<>
			<h1 className='text-3xl text-center font-bold m-8'>Color Picker</h1>
			<div className='m-8 flex justify-center align-center'>
				<div className='max-w-3xl rounded overflow-hidden shadow-lg'>
					{image.src ? (
						<img className='w-full' src={image.src} alt={image.alt} />
					) : (
						<DragNDrop onChange={setUploadedImage} />
					)}

					<div className='px-6 py-4 flex justify-around items-center'>
						<div className='flex gap-2 w-60'>
							<div
								style={{ height: '5rem', width: '5rem', backgroundColor: hex }}
							/>
							<div className='text-md font-bold'>
								<p>Hex: {hex}</p>
								<p>
									RGB: ({rgb.r}, {rgb.g}, {rgb.b})
								</p>
							</div>
						</div>
						<div className='flex flex-row gap-1'>
							<Button title='Eye Dropper' onClick={handleClickEyeDropper}>
								<PiEyedropper />
							</Button>
							<Button title='Example Image' onClick={setExampleImage}>
								<PiImages />
							</Button>
							{image.src && (
								<Button title='Restart' onClick={resetImage}>
									<FaUndo />
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
