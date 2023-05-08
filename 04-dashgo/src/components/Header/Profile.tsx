import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface IProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: IProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Willian S. Praciano</Text>
          <Text color="gray.300" fontSize="small">
            willian.s.praciano@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Willian Praciano"
        src="https://github.com/willianspraciano.png"
      />
    </Flex>
  );
}
