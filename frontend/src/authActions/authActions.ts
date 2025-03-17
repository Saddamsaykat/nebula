import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  setUser,
} from "../redux/slice/authSlice";
import auth from "../firebase/firebase";
import { loginSlice } from "../redux/slice/loginSlice";

export const registerWithEmail = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await sendEmailVerification(user);
    // console.log("Verification email sent!");
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const forgotPassword = (email) => async () => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent!");
  } catch (error) {
    // console.error("Password Reset Error: ", error.message);
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(logout());
  } catch (error) {
    // console.error("Logout Error: ", error);
  }
};

export const signInWithEmail = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    dispatch(loginSuccess(userCredential.user));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const checkAuthState = () => async (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const loggedUser = { user: user };

      try {
        // Call RTK Query mutation correctly
        const result = await dispatch(
          loginSlice.endpoints.verifyJwt.initiate(loggedUser)
        );
        // console.log(result);
        if (result?.data?.token) {
          localStorage.setItem("Token", result.data.token);
        }

        dispatch(setUser(user));
      } catch (error) {
        // console.error("JWT Authentication Error:", error);
      }
    } else {
      localStorage.removeItem("Token");
      dispatch(logout());
    }
  });
};
