import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import Router from 'next/router';
import { MdHome } from 'react-icons/md';
import NavLink from "./NavLink";
import NavSection from "./NavSection";

const SidebarNav = () => {
	return (
		<Box>
			<Flex
        	as="header"
        	alignItems="center"
        	justifyContent="center"
        	pt="10"
        	userSelect="none"
        	cursor="pointer"
        	onClick={() => {
          	Router.push('/');
        	}}
      	>
        	<Avatar
          	size="lg"
          	mr="4"
          	name='game'
          	pointerEvents="none"
          	bg="gray.50"
          	color="gray.900"
          	src='../../../images/logo.jpg'
        	/>
        	<Text
          	as="strong"
          	color="gray.700"
          	overflow="hidden"
          	textOverflow="ellipsis"
          	whiteSpace="nowrap"
          	textTransform="capitalize"
        	>
          	JOGO DE CARTAS
        	</Text>
      	</Flex>
			<NavSection>
				<NavLink href="/" icon={MdHome}>
					Cartas
				</NavLink>
				<NavLink href='#' icon={MdHome}>
					Histórico de batalha
				</NavLink>
			</NavSection>
		</Box>
	)
};

export default SidebarNav;