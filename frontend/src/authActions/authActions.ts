import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
  import {
    loginFailure,
    loginStart,
    loginSuccess,
    logout,
  } from "../redux/slice/authSlice";
  import auth from "../firebase/firebase";
  
  // Register with Email and Password
  export const registerWithEmail = (email, password) => async (dispatch) => {
    dispatch(loginStart());
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(loginSuccess(userCredential.user));
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
  
  // Logout User
  export const logoutUser = () => async (dispatch) => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      console.error("Logout Error: ", error);
    }
  };
  