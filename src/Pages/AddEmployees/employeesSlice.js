import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeeData: [],
  getEmployee: [],
  status: "idle",
  error: null,
};
const token = localStorage.getItem("token");
export const getEmployees = createAsyncThunk("employees/get", async () => {
  const data = await fetch(`${process.env.REACT_APP_API_URL}/employee`, {
    headers: {
      authorization: `bearer ${token}`,
    },
  });
  const result = await data.json();
  return result;
});

export const postEmployees = createAsyncThunk("employees/post", async (body) => {
  const response = fetch(`${process.env.REACT_APP_API_URL}/employee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
});
export const getEmployee = createAsyncThunk("employee/get", async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/employee/search?query=${id}`, {
    headers: {
      authorization: `bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
});

export const postFile = createAsyncThunk("resume/post", async (file) => {
  const resume = new FormData();
  resume.append("file", file);
  console.log("triggered");
  const response = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data",
      authorization: `bearer ${token}`,
    },
    body: resume,
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.error);
  }
});
export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmployees.fulfilled, (state, action) => {
      state.employeeData = action.payload;
      console.log("fulfilled");
    });
    builder.addCase(getEmployee.fulfilled, (state, action) => {
      console.log("fulfiled");
      state.getEmployee = action.payload;
    });
    builder.addCase(postEmployees.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(postEmployees.fulfilled, (state, action) => {
      state.status = "successful";
    });
    builder.addCase(postEmployees.rejected, (state, action) => {
      console.log(action.error);
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(postFile.fulfilled, (state, action) => {
      console.log("fulfilled");
    });
    builder.addCase(postFile.rejected, (state, action) => {
      console.log("rejected");
      console.log(action.error);
    });
  },
});
export default employeesSlice.reducer;
