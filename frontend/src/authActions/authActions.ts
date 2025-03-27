import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
  deleteUser,
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
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (user) {
      await sendEmailVerification(user);
      dispatch(loginSuccess(user));
      alert("Registration successful. Please check your email for verification.");
    }
    return user;
  } catch (error) {
    dispatch(loginFailure(error.message));
    alert("Registration failed: " + error.message);
    throw error;
  }
};

export const forgotPassword = (email) => async () => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent successfully.");
  } catch (error) {
    alert("Password reset failed: " + error.message);
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(logout());
  } catch (error) {
    alert("Logout failed: " + error.message);
  }
};

export const signInWithEmail = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      await signOut(auth);
      throw new Error("Please verify your email before logging in.");
    }

    dispatch(loginSuccess(user));
    return user; // Ensure a valid user is returned on success
  } catch (error) {
    dispatch(loginFailure(error.message));
    throw error; // Throw the error so it can be caught in handleLogin
  }
};

export const checkAuthState = () => async (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const loggedUser = { user: user };
      try {
        const result = await dispatch(loginSlice.endpoints.verifyJwt.initiate(loggedUser));
        if (result?.data?.token) {
          localStorage.setItem("Token", result.data.token);
        }
        dispatch(setUser(user));
      } catch (error) {
        dispatch(logout());
      }
    } else {
      localStorage.removeItem("Token");
      dispatch(logout());
    }
  });
};

export const deleteAccount = () => async (dispatch) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await deleteUser(user);
      dispatch(logout());
      alert("User account deleted successfully.");
    } catch (error) {
      alert("Error deleting user account: " + error.message);
    }
  } else {
    alert("No user is currently signed in.");
  }
};
