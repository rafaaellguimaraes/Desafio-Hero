import Router from 'next/router';
import { MdMenu } from 'react-icons/md';

import {
	Box,
	Icon,
	IconButton,
	Image,
	useBreakpointValue
} from '@chakra-ui/react';

import { useSidebarDrawer } from '../../contexts/SidebarDrawerContexts';

const Header = () => {
  const { onOpen } = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  return (
    <Box
      as="header"
      display="flex"
      flexDirection="row"
      justifyContent={isWideVersion ? 'flex-end' : 'space-between'}
      h="150px"
      px={['5', '5', '10']}
      bg="black"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Abrir menu"
          icon={<Icon as={MdMenu} color='white' fontSize={30} />}
          variant="unstyled"
          alignSelf="center"
          onClick={onOpen}
        />
      )}

      <Box
        as="button"
        mt="5"
        h="60px"
        onClick={() =>
          Router.push({
            pathname: '/'
          })
        }
      >
        <Image
          src='../../../images/logo.jpg'
          alt="Logo Marvel"
          h="130px"
          objectFit="contain"
        />
      </Box>
    </Box>
  );
};

export default Header;
