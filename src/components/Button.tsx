interface ButtonProps {
	children?: React.ReactNode;
	title?: string;
	onClick?: () => void;
}

export default function Button({ children, ...otherProps }: ButtonProps) {
	return (
		<button
			className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 rounded inline-flex items-center'
			{...otherProps}
		>
			{children}
		</button>
	);
}
