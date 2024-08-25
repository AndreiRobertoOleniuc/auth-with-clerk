import * as React from "react";
import { TextInput, Button, View, Text, TouchableOpacity } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  SignInWithOAuthApple,
  SignInWithOAuthGoogle,
} from "../../shared/components/SignInWithOAuth";
import DismissKeyboard from "../../shared/components/DismissKeyboard";

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView>
      {!pendingVerification && (
        <DismissKeyboard>
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
                Sign up
              </Text>
              <TextInput
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Email..."
                onChangeText={(email) => setEmailAddress(email)}
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
                onPress={onSignUpPress}
              >
                <Text
                  style={{
                    fontSize: 14,
                    alignSelf: "center",
                    color: "white",
                  }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
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
              <SignInWithOAuthGoogle title="Sign up with Google" />
              <SignInWithOAuthApple title="Sign up with Apple" />
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Text>You have an account?</Text>
                <Link href="/sign-in">
                  <Text
                    style={{
                      color: "#0000EE",
                    }}
                  >
                    Log In
                  </Text>
                </Link>
              </View>
            </View>
          </View>
        </DismissKeyboard>
      )}
      {pendingVerification && (
        <DismissKeyboard>
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
                Verify your email address
              </Text>
              <TextInput
                value={code}
                placeholder="Code..."
                onChangeText={(code) => setCode(code)}
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
                onPress={onPressVerify}
              >
                <Text
                  style={{
                    fontSize: 14,
                    alignSelf: "center",
                    color: "white",
                  }}
                >
                  Verify Email
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </DismissKeyboard>
      )}
    </SafeAreaView>
  );
}
