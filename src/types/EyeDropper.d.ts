export interface EyeDropper {
	open(arg: { signal?: AbortSignal }): Promise<{ sRGBHex: string }>;
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
