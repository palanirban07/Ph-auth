import {
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";
import { defineStore } from "pinia";
import { auth } from "../firebase";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useAuthstore = defineStore("authstore", () => {
  const user = ref({});
  const router = useRouter();
  const init = () => {
    onAuthStateChanged(auth, (userDetails) => {
      if (userDetails) {
        const uid = userDetails.uid;
        user.value = {
          email: userDetails.email,
          phone: userDetails.phoneNumber,
          uid,
        };
        router.push({ name: "index" });
      } else {
        user.value = {};
        router.replace(
          {
            name: "Phone",
            // params: {
            //   id: 1,
            // },
          },
          // {
          //   name: "Phone",
          //   params: {
          //     id: 2,
          //   },
          // }
        );
      }
    });
  };

  const registerUser = (credentials) => {
    createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
        // ..
      });
  };

  const loginUser = (credentials) => {
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const phoneUser = () => {
    window.RecaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log(response);
        onSignInSubmit();
      },
    });
  };

  const onSignInSubmit = async (Credential) => {
    // const phoneNumber = ref(); // Replace with actual phone number
    signInWithPhoneNumber(auth, Credential.phone, window.RecaptchaVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to enter the code from the SMS
        // For example:
        const code = prompt("Enter the verification code sent to your phone:");
        return confirmationResult.confirm(code);
      })
      .then((result) => {
        // User signed in successfully
        console.log("User signed in:", result.user);
      })
      .catch((error) => {
        // Error handling
        console.error("Sign in error:", error.message);
      });
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        console.log("Signout succesfully");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return {
    registerUser,
    loginUser,
    phoneUser,
    onSignInSubmit,
    logoutUser,
    init,
    user,
  };
});
