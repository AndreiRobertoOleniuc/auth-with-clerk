import { useClerk } from "@clerk/clerk-expo";
import { TouchableOpacity, Text } from "react-native";

export const SignOutButton = () => {
  const { signOut } = useClerk();

  return (
    <TouchableOpacity onPress={() => signOut({ redirectUrl: "/" })}>
      <Text>Sign-out</Text>
    </TouchableOpacity>
  );
};
