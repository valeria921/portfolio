import { Box, Text, Select } from '@chakra-ui/react';

export function Dropdown({ list, onItemSelect }) {
	function onListItemSelect(event) {
		onItemSelect(Number(event.target.value));
	}
	return (
		<Select
			placeholder={
				list.length === 0 ? 'Loading...' : 'Choose a category:'
			}
			onChange={onListItemSelect}
			color='#283237'
			fontFamily="'Montserrat', sans-serif"
			fontSize={{ base: 'xs', lg: 'md' }}
			fontWeight='medium'
			border='1px solid #738999'
			boxShadow='0px 4px 8px rgba(73, 89, 99, 0.3)'
			size={{ base: 'sm', md: 'md' }}
		>
			{list.map((each) => {
				return (
					<option key={each.id} value={each.id}>
						{each.category_title}
					</option>
				);
			})}
		</Select>
	);
}

