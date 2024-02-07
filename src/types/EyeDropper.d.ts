export interface EyeDropper {
	open(arg: { signal?: AbortSignal }): Promise<{ sRGBHex: string }>;
}
