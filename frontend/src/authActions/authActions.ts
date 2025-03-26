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
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    if (user) {
      await sendEmailVerification(user); // Send email verification
      dispatch(loginSuccess(user)); // Update Redux state
    }

    return user;
  } catch (error) {
    dispatch(loginFailure(error.message)); // Notify Redux state of failure
    throw error; // Rethrow error to handle it in caller function
  }
};

export const forgotPassword = (email) => async () => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Password reset email failed:");
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(logout());
  } catch (error) {}
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
      console.log("User account deleted successfully.");
      dispatch(logout());
    } catch (error) {
      console.error("Error deleting user account:", error.message);
    }
  } else {
    console.error("No user is currently signed in.");
  }
};