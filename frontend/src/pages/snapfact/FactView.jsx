import { Card, CardBody, CardHeader, Text, Box } from '@chakra-ui/react';

export function FactView({ fact_title, fact_text }) {
	if (fact_title === undefined) return;
	return (
		<Card
			border='none'
			bg='#FAEAC9'
			borderWidth='1px'
			borderColor='#E29C37'
			borderRadius='md'
		>
			<CardBody
				gap='2'
				fontFamily="'Montserrat', sans-serif"
				p='4'
			>
				<Text
					as="h3"
					color='#283237'
					fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
					lineHeight='1.3'
					letterSpacing='0.01em'
					fontWeight="bold"
					mb="2"
				>
					{fact_title}
				</Text>
				<Text
					color='#283237'
					fontSize={{ base: 'xs', md: 'sm', lg: 'sm' }}
				>
					{fact_text}
				</Text>
			</CardBody>
		</Card>
	);
}
