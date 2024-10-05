import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let users = [];

// Simuler une API
const api = {
  register: async (user) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        users.push(user);
        resolve(user);
      }, 1000);
    });
  },
  login: async (user) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = users.find(
          (u) => u.username === user.username && u.password === user.password
        );
        if (foundUser) {
          resolve(foundUser);
        } else {
          reject(new Error("Nom d'utilisateur ou mot de passe incorrect"));
        }
      }, 1000);
    });
  },
  logout: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({});
      }, 1000);
    });
  },
};

export const registerUser = createAsyncThunk('auth/register', async (user) => {
  const response = await api.register(user);
  return response;
});

export const loginUser = createAsyncThunk('auth/login', async (user) => {
  const response = await api.login(user);
  return response;
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await api.logout();
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
