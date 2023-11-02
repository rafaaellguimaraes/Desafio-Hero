import { Stack } from '@chakra-ui/react';

interface INavSectionProps {
	children: React.ReactNode;
}

const NavSection = ({children}: INavSectionProps) => {
	return (
		<Stack as='nav' spacing="4" mt='8' align="stretch">
			{children}
		</Stack>
	);
};

export default NavSection;