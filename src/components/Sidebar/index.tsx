import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useBreakpointValue
} from '@chakra-ui/react';

import { useSidebarDrawer } from '../../contexts/SidebarDrawerContexts';
import SidebarNav from './SidebarNav';

const Sidebar = () => {
  const { isOpen, onClose } = useSidebarDrawer();

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false
  });

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="white">
            <DrawerBody pb="10" bg={'#000'}>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <Box
      as="aside"
      top={0}
      bottom={0}
      overflowY="scroll"
      overflowX="hidden"
      position="fixed"
      gridArea="sidebar"
      minH="100vh"
      overflow="auto"
      w="80"
      px="8"
      pb="10"
      bg="white"
      border="1px solid #000"
    >
      <SidebarNav />
    </Box>
  );
};

export default Sidebar;
