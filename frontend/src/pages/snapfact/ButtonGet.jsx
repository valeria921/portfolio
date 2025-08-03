import { Button } from '@chakra-ui/react';

export function ButtonGet({
	text = 'Default text',
	onClickCalledOutside,
	disabled = false,
}) {
	function onClicked() {
		if (onClickCalledOutside !== undefined) {
			return onClickCalledOutside();
		}
	}
	return (
		<Button
			onClick={onClicked}
			disabled={disabled}
			bg='#E29C37'
			color='white'
			fontFamily="'Montserrat', sans-serif"
			fontWeight='600'
			fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}
			size={{ base: 'xs', md: 'md' }}
			width='100%'
			border='1px solid #C8822E'
			borderRadius='md'
			boxShadow='0px 4px 8px rgba(200, 130, 46, 0.3)'
			transition='all 0.3s ease'
			_hover={{
				bg: '#C8822E',
				boxShadow: '0px 4px 8px rgba(200, 130, 46, 0.5)',
				transform: 'scale(1.03)',
			}}
		>
			{text}
		</Button>
	);
}
