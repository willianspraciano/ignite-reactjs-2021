import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Willian S. Praciano</Text>
        <Text color="gray.300" fontSize="small">
          willian.s.praciano@gmail.com
        </Text>
      </Box>

      <Avatar
        size="md"
        name="Willian Praciano"
        src="https://github.com/willianspraciano.png"
      />
    </Flex>
  );
}
