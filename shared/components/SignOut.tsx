import { useClerk } from "@clerk/clerk-expo";
import { TouchableOpacity, Text } from "react-native";

export const SignOutButton = () => {
  const { signOut } = useClerk();

  return (
    <TouchableOpacity
      onPress={() => signOut({ redirectUrl: "/" })}
      style={{
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
        marginTop: 10,
      }}
    >
      <Text>Sign-out</Text>
    </TouchableOpacity>
  );
};
