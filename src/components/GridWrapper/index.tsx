import { Flex, Grid, Stack } from '@chakra-ui/react';

import Header from '../Header';
import Sidebar from '../Sidebar';

interface IGridWrapperProps {
  children: React.ReactNode;
}

const GridWrapper = ({ children }: IGridWrapperProps) => {
  return (
    <Grid>
      <Sidebar />
      <Flex gridArea="content" flexDirection="column">
        <Header />
        <Stack>
          {children}
        </Stack>
      </Flex>
    </Grid>
  );
};

export default GridWrapper;
