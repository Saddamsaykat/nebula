/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
  deleteUser,
  User,
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
import { AppDispatch } from "../redux/store";

// Define types for user authentication actions
export type AuthAction = (dispatch: Dispatch) => Promise<User | void>;

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const registerWithEmail =
  (email: string, password: string): AuthAction =>
  async (dispatch) => {
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
    } catch (error: any) {
      dispatch(loginFailure(error.message));
      alert("Registration failed: " + error.message);
      throw error;
    }
  };

export const forgotPassword =
  (email: string): AuthAction =>
  async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent successfully.");
    } catch {
      alert("Password reset failed:");
    }
  };

export const logoutUser = (): AuthAction => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(logout());
  } catch {
    alert("Logout failed: ");
  }
};

export const signInWithEmail =
  (email: string, password: string): AuthAction =>
  async (dispatch) => {
    dispatch(loginStart());
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        await signOut(auth);
        throw new Error("Please verify your email before logging in.");
      }

      dispatch(loginSuccess(user));
      return user;
      
    } catch (error: any) {
      dispatch(loginFailure(error.message));
      throw error;
    }
  };

// export const checkAuthState = (): AuthAction => async (dispatch) => {
//   onAuthStateChanged(auth, async (user) => {
//     if (user) {
//       const loggedUser = { user: user };
//       try {
//         const result = await dispatch(loginSlice.endpoints.verifyJwt.initiate(loggedUser));
//         if (result?.data?.token) {
//           localStorage.setItem("Token", result.data.token);
//         }
//         dispatch(setUser(user));
//       } catch (error) {
//         dispatch(logout());
//       }
//     } else {
//       localStorage.removeItem("Token");
//       dispatch(logout());
//     }
//   });
// };


export const checkAuthState = (): any => async (dispatch: AppDispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const loggedUser = { user: user };
      try {
        const result = await dispatch(
          loginSlice.endpoints.verifyJwt.initiate(loggedUser)
        ).unwrap(); // <-- this solves the type issue
        if (result?.token) {
          localStorage.setItem('Token', result.token);
        }
        dispatch(setUser(user));
      } catch (error) {
        console.error("JWT verification failed", error);
        dispatch(logout());
      }
    } else {
      localStorage.removeItem('Token');
      dispatch(logout());
    }
  });
};

// export const deleteAccount = (userEmail: string) => async (dispatch: any) => {
export const deleteAccount = (_userEmail: string): AuthAction => async (dispatch: any) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await deleteUser(user);
      dispatch(logout());
      alert("User account deleted successfully.");
    } catch (error: any) {
      alert("Error deleting user account: " + error.message);
    }
  } else {
    alert("No user is currently signed in.");
  }
};
