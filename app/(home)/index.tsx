import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SignOutButton } from "../../shared/components/SignOut";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useUser();

  return (
    <SafeAreaView>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
            }}
          >
            You are currently logged out
          </Text>
          <Link
            href="/sign-in"
            style={{
              padding: 10,
              backgroundColor: "#496cc4",
              borderRadius: 5,
              marginTop: 10,
              color: "white",
              borderWidth: 1,
              overflow: "hidden",
              borderColor: "#496cc4",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <Text>Sign In</Text>
          </Link>
          <Link
            href="/sign-up"
            style={{
              padding: 10,
              backgroundColor: "#496cc4",
              borderRadius: 5,
              marginTop: 10,
              color: "white",
              flexGrow: 0,
              overflow: "hidden",
              borderColor: "#496cc4",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <Text>Sign Up</Text>
          </Link>
        </View>
      </SignedOut>
    </SafeAreaView>
  );
}
