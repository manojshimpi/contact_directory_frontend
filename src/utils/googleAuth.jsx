import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "./api";


/**
 * ✅ Global function to handle Google authentication
 * @param {Function} onSuccess - Callback function when login succeeds
 * @param {Function} onError - Callback function when login fails
 */
export const useGoogleAuth = (onSuccess, onError) => {
  return useGoogleLogin({
    onSuccess: async (authResult) => {
      try {
        if (authResult.code) {
          const result = await googleAuth(authResult.code);
          const { user, token } = result.data;

          //console.log("✅ Google Login Successful:", token);

          // Store token
          localStorage.setItem("token", token);

          // Call onSuccess callback (e.g., navigate to dashboard)
          if (onSuccess){
            onSuccess(user, token);
          } 
        } else {
          console.error("❌ Google Login Failed: No code received", authResult);
          if (onError) onError("No code received");
        }
      } catch (error) {
        console.error("❌ Error during Google authentication:", error);
        if (onError) onError(error.message);
      }
    },
    onError: (error) => {
      console.error("❌ Google Login Error:", error);
      if (onError) onError(error);
    },
    flow: "auth-code",
  });
};
