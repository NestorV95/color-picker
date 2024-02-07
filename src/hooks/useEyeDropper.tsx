import { useState } from 'react';
import { EyeDropper as EyeDropperType } from '@/types/EyeDropper';

interface OpenOutput {
	sRGBHex?: string| null;
	error?: Error | null;
}

export default function useEyeDropper() {
	const [abortController, setAbortController] = useState({ abort: () => {} });
	const isSupported = window.EyeDropper ? true : false;

	const open = async (): Promise<OpenOutput> => {
		const eyeDropper = new EyeDropper<EyeDropperType>();
		const abortController = new AbortController();
		setAbortController(abortController);
		try {
			const { sRGBHex } = await eyeDropper.open({
				signal: abortController.signal
			});
			return {
				sRGBHex,
				error: null
			};
		} catch (error) {
			return {
				sRGBHex: null,
				error: error as Error
			};
		}
	};

	const close = () => {
		abortController.abort();
	};

	return {
		isSupported,
		open,
		close
	};
}