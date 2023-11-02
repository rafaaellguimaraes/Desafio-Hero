import Link from "next/link";
import { useRouter } from "next/router";

import {
	Link as ChakraLink,
	LinkProps as ChakraLinkProps,
	Icon,
	Text
} from '@chakra-ui/react';

interface INavLinkProps extends ChakraLinkProps {
  href: string;
  icon: React.ElementType;
  children: string;
}

const NavLink = ({ href, icon, children, ...rest }: INavLinkProps) => {
	const { asPath } = useRouter();

	let isActive = false;

	if (asPath === '/' && href === '/') {
		isActive = true;
	} else if (
		asPath.substring(1) !== '' && 
		href.substring(1) !== '' && 
		asPath.substring(1).includes(href.substring(1))
	) {
		isActive = true;
	}

	return (
		<Link href={href} passHref>
			<ChakraLink
				display='flex'
				alignItems='center'
				h='12'
				pl='6'
				borderRadius='4'
				bg={isActive ? 'gray.700' : 'transparent'}
				textDecoration='none'
				_hover={{
					bg: isActive ? '' : 'gray.500'
				}}
				{...rest}
			>
				<Icon color={isActive ? 'white' : 'gray.400'} as={icon} fontSize={24} />
				<Text 
					ml='4' 
					fontWeight='medium'
					color={isActive ? 'white' : 'gray.700'}
				>
					{children}
				</Text>
			</ChakraLink>
		</Link>
	);
};

export default NavLink;