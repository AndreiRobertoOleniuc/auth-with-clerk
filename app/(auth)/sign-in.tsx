import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, Button, View, TouchableOpacity } from "react-native";
import React from "react";
import {
  SignInWithOAuthApple,
  SignInWithOAuthGoogle,
} from "../../shared/components/SignInWithOAuth";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <SafeAreaView>
      <View
        style={{
          height: "95%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              marginBottom: 20,
              fontWeight: 500,
              alignSelf: "center",
            }}
          >
            Log In or Sign up
          </Text>
          <View>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
              style={{
                width: "100%",
                borderWidth: 0,
                borderColor: "black",
                padding: 10,
                backgroundColor: "#e0e0e0",
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                marginBottom: 10,
              }}
            />
            <TextInput
              value={password}
              placeholder="Password..."
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              style={{
                width: "100%",
                borderWidth: 0,
                borderColor: "black",
                padding: 10,
                backgroundColor: "#e0e0e0",
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                marginBottom: 10,
              }}
            />
            <TouchableOpacity
              style={{
                width: "100%",
                borderWidth: 0,
                borderColor: "black",
                padding: 10,
                backgroundColor: "#070707",
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                marginBottom: 10,
              }}
              onPress={onSignInPress}
            >
              <Text
                style={{
                  fontSize: 14,
                  alignSelf: "center",
                  color: "white",
                }}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              marginTop: 5,
              marginBottom: 5,
              alignSelf: "center",
              color: "#696969",
              fontSize: 12,
            }}
          >
            Or
          </Text>
          <View>
            <SignInWithOAuthGoogle />
            <SignInWithOAuthApple />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text>Don't have an account?</Text>
            <Link href="/sign-up">
              <Text
                style={{
                  color: "#0000EE",
                }}
              >
                Sign up
              </Text>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
