import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";

function PersonalInformation({ formik }) {
  return (
    <>
      <Typography variant="body2" sx={{ padding: "3rem 0rem" }}>
        Personal Information
      </Typography>
      <form>
        <FormControl>
          <Grid container spacing={2}>
            <Grid item md={3}>
              <InputLabel>Title</InputLabel>
              <Select fullWidth value="" label="Title">
                <MenuItem value="Mr">Mr.</MenuItem>
                <MenuItem value="Mrs">Mrs.</MenuItem>
                <MenuItem value="Ms">Ms.</MenuItem>
              </Select>
            </Grid>
            <Grid item md={5}>
              <TextField label="First Name" required fullWidth name="first_name" {...formik.getFieldProps("first_name")} />
            </Grid>
            <Grid item md={4}>
              <TextField label="Middle Name" fullWidth name="middle_name" {...formik.getFieldProps("middle_name")} />
            </Grid>
            <Grid item md={4}>
              <TextField label="Last Name" required fullWidth name="last_name" {...formik.getFieldProps("last_name")} />
            </Grid>
            <Grid item md={4}>
              <TextField label="Home Address" required fullWidth name="home_address" {...formik.getFieldProps("home_address")} />
            </Grid>
            <Grid item md={4}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth"
                    fullWidth
                    {...formik.getFieldProps("dob")}
                    onChange={(value) => {
                      formik.setFieldValue("dob", dayjs(value));
                    }}
                  />
                </LocalizationProvider>{" "}
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <TextField label="Email Address" required fullWidth name="email" {...formik.getFieldProps("email")} />
            </Grid>
            <Grid item md={4}>
              <TextField label="Phone Number" required fullWidth name="phone" {...formik.getFieldProps("phone")} />
            </Grid>
            <Grid item md={2}>
              <TextField
                label="Passport"
                type="file"
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="image"
                onChange={(event) => {
                  formik.setFieldValue("image", event.target.files[0]);
                }}
              />
            </Grid>

            <Grid item md={2}>
              <TextField
                label="Resume"
                type="file"
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="resume"
                onChange={(event) => {
                  formik.setFieldValue("resume", event.target.files[0]);
                }}
              />
            </Grid>
          </Grid>
        </FormControl>
      </form>
    </>
  );
}

export default PersonalInformation;
