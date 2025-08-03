import { Card } from '@chakra-ui/react';

export function FactView({ fact_title, fact_text }) {
	if (fact_title === undefined) return;
	return (
		<Card.Root border='none'>
			<Card.Body
				bg='#FAEAC9'
				gap='2'
				fontFamily="'Montserrat', sans-serif"
				borderWidth='1px'
				borderColor='#E29C37'
				p='4'
				borderRadius='md'
			>
				<Card.Title
					color='#283237'
					fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
					lineHeight='1.3'
					letterSpacing='0.01em'
				>
					{fact_title}
				</Card.Title>
				<Card.Description
					color='#283237'
					fontSize={{ base: 'xs', md: 'sm', lg: 'sm' }}
				>
					{fact_text}
				</Card.Description>
			</Card.Body>
		</Card.Root>
	);
}
