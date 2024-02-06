import { useState } from 'react';
/* 
  Image by Pawel Czerwinski 
  https://unsplash.com/photos/pink-and-blue-abstract-painting-sxaYEsE12RM?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
*/
import exampleImage from '@/assets/pawel-czerwinski-sxaYEsE12RM-unsplash.jpg';
import { ACCEPTED_MIME_TYPES, DEFAULT_IMAGE_STATE } from '@/config/constants';

export default function useImage() {
	const [state, setState] = useState(DEFAULT_IMAGE_STATE);

	const resetImage = () => () => setState(DEFAULT_IMAGE_STATE);

	const setUploadedImage = (e: React.SyntheticEvent) => {
		const fileInput = e.target as HTMLInputElement;
		const file: File | null = fileInput.files ? fileInput.files[0] : null;

		if (!file) return;

		if (!ACCEPTED_MIME_TYPES.includes(file.type)) return;
		setState({
			src: URL.createObjectURL(file),
			alt: file.name
		});
	};

	const setExampleImage = () => {
		setState({
			src: exampleImage,
			alt: 'Example Image'
		});
	};

	return {
		image: state,
		setUploadedImage,
		setExampleImage,
		resetImage
	};
}
