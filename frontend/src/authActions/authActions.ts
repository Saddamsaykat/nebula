import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail,
  } from "firebase/auth";
  import {
    loginFailure,
    loginStart,
    loginSuccess,
    logout,
  } from "../redux/slice/authSlice";
  import auth from "../firebase/firebase";
  
  export const registerWithEmail = (email, password) => async (dispatch) => {
    dispatch(loginStart());
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
  
      // Send email verification
      // await sendEmailVerification(user);
      // console.log("Verification email sent!");
  
      dispatch(loginSuccess(user));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
  
  // Sign in with Email and Password
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
  
  export const forgotPassword = (email) => async (dispatch) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent!");
    } catch (error) {
      console.error("Password Reset Error: ", error.message);
    }
  };
  
  // Logout User
  export const logoutUser = () => async (dispatch) => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      console.error("Logout Error: ", error);
    }
  };
  