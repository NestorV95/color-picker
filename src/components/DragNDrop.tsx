interface DragNDropProps {
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DragNDrop({ onChange }: DragNDropProps) {
	return (
		<div className='border border-dashed border-gray-500 relative'>
			<input
				type='file'
				className='cursor-pointer relative block opacity-0 w-full h-full p-20 z-50'
				onChange={onChange}
			/>
			<div className='text-center text-md p-10 absolute top-10 right-0 left-0 m-auto'>
				<p>Drag &amp; Drop image or click to upload</p>
				<p className='text-sm'>Only .jpeg, .jpg &amp; .png are accepted</p>
			</div>
		</div>
	);
}
