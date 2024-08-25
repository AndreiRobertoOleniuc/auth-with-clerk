import React from "react";
import * as WebBrowser from "expo-web-browser";
import { TouchableOpacity, Text, View, Image } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import images from "../constants/images";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export const SignInWithOAuthGoogle = ({ title }: { title: string }) => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const signInWith = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/", { scheme: "auth-with-clerk" }),
        });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        borderWidth: 1,
        borderColor: "#c3c3c3",
        padding: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginBottom: 10,
      }}
      onPress={signInWith}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Image
          source={images.googleIcon}
          style={{
            width: 20,
            height: 20,
            marginRight: 10,
          }}
          resizeMode="contain"
        />
        <Text style={{ fontWeight: 400 }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const SignInWithOAuthApple = ({ title }: { title: string }) => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_apple" });

  const signInWith = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/", { scheme: "auth-with-clerk" }),
        });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        borderWidth: 1,
        borderColor: "#c3c3c3",
        padding: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginBottom: 10,
      }}
      onPress={signInWith}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Image
          source={images.appleIcon}
          style={{
            width: 20,
            height: 15,
            marginRight: 10,
          }}
          resizeMode="contain"
        />
        <Text style={{ fontWeight: 400 }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
