import { AUTH_API } from "@/api/API";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    try {
      const { data } = await axios.post(`${AUTH_API}/register`, formData, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Some internal error");
    }
  }
);

export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  try {
    const { data } = await axios.post(`${AUTH_API}/login`, formData, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Some internal error");
  }
});

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  try {
    const { data } = await axios.get(`${AUTH_API}/logout`,{withCredentials:true});
    toast.success(data?.message)
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Some internal error");
  }
});

export const checkAuth = createAsyncThunk("/auth/check-auth", async () => {
    try {
      const { data } = await axios.get(`${AUTH_API}/check-auth`, {
        withCredentials: true,
        headers:{
            'Cache-Control':'no-store, no-cache ,must-revalidate, proxy-revalidate',
        }
      });
    //   console.log(data)
      return data;
    } catch (error) {
        console.log(error)
    }
  });

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      //   login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = !action?.payload?.success ? null : action?.payload?.user;
        state.isAuthenticated = action?.payload?.success ? true : false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      
    //   check-auth
    .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = !action?.payload?.success ? null : action?.payload?.user;
        state.isAuthenticated = action?.payload?.success ? true : false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // logout
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = state.user;
        state.isAuthenticated = state.isAuthenticated;
      })
      
      ;
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
