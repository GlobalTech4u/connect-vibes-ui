import { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import {
  Card,
  CardHeader,
  CardContent,
  Select,
  MenuItem,
  TextField,
  Tab,
  Tabs,
} from "@mui/material";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import OutlinedFlagRoundedIcon from "@mui/icons-material/OutlinedFlagRounded";
import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TransgenderOutlinedIcon from "@mui/icons-material/TransgenderOutlined";
import MaleOutlinedIcon from "@mui/icons-material/MaleOutlined";
import FemaleOutlinedIcon from "@mui/icons-material/FemaleOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditOffOutlinedIcon from "@mui/icons-material/EditOffOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import { updateUser } from "reduxStore/slices/usersSlice";
import {
  ABOUT_SECTION_TABS_MENU_ITEMS,
  REDUX_ACTION,
} from "constants/common.constant";

import "./ProfileDetailsCard.css";

const ProfileDetailsCard = (props) => {
  const { user, isEditing, isCurrentUser, onEdit, getProfileUser } = props;
  const [currentTab, setCurrentTab] = useState("basic");
  const dispatch = useDispatch();

  const onUpdateUser = async (values) => {
    const payload = {
      firstName: values?.firstName,
      lastName: values?.lastName,
      email: values?.email,
      gender: values?.gender,
      jobTitle: values?.jobTitle,
      aboutMe: values?.aboutMe,
      relationshipStatus: values?.relationshipStatus,
      city: values?.city,
      state: values?.state,
      country: values?.country,
      phone: {
        areaCode: values?.areaCode,
        number: values?.number,
      },
      _id: user?._id,
    };

    dispatch(updateUser(payload)).then((res) => {
      if (res?.meta?.requestStatus === REDUX_ACTION.FULFILLED) {
        onEdit();
        getProfileUser();
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      gender: user?.gender,
      jobTitle: user?.jobTitle,
      aboutMe: user?.aboutMe,
      relationshipStatus: user?.relationshipStatus,
      city: user?.city,
      state: user?.state,
      country: user?.country,
      areaCode: user?.phone?.areaCode,
      number: user?.phone?.number,
    },
    validateOnChange: true,
    onSubmit: onUpdateUser,
  });

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const { values, handleChange, handleSubmit } = formik;

  return (
    <Card
      className="about-tab-card"
      key={`about-tab-card`}
      data-testid="profile-details-card"
    >
      <CardHeader
        className="card-header"
        title={`About`}
        action={
          isCurrentUser &&
          (isEditing ? (
            <div className="card-header-actions">
              <EditOffOutlinedIcon
                className="cursor-pointer"
                onClick={onEdit}
              />
              <SaveOutlinedIcon
                className="cursor-pointer"
                onClick={handleSubmit}
              />
            </div>
          ) : (
            <EditOutlinedIcon className="cursor-pointer" onClick={onEdit} />
          ))
        }
      />
      <CardContent className="about-card-content">
        <div className="about-tab-contents">
          <Tabs
            value={currentTab}
            aria-label="tabs"
            indicatorColor={"primary"}
            onChange={handleTabChange}
            orientation="vertical"
          >
            <Tab label={ABOUT_SECTION_TABS_MENU_ITEMS.BASIC} value="basic" />
            <Tab
              label={ABOUT_SECTION_TABS_MENU_ITEMS.CONTACT}
              value="contact"
            />
            <Tab label={ABOUT_SECTION_TABS_MENU_ITEMS.ABOUT} value="aboutMe" />
          </Tabs>
          {currentTab === "basic" && (
            <div
              className="about-section-tab-panel"
              value={currentTab}
              index={"basic"}
            >
              {(isEditing ||
                isCurrentUser ||
                user?.firstName ||
                user?.lastName) && (
                <div className="about-tab-content">
                  <BadgeOutlinedIcon />
                  {isEditing ? (
                    <div className="about-tab-content-editing">
                      <TextField
                        id="firstName"
                        label="First name"
                        required={true}
                        autoComplete="first-name"
                        value={values?.firstName}
                        onChange={handleChange}
                        variant="standard"
                      />
                      <TextField
                        id="lastName"
                        label="Last name"
                        autoComplete="last-name"
                        value={values?.lastName}
                        onChange={handleChange}
                        variant="standard"
                      />
                    </div>
                  ) : (
                    <div className="about-tab-displaying">
                      <span className="content-text-displaying">
                        {user?.firstName || "-"}
                      </span>
                      <span className="content-text-displaying">
                        {user?.lastName || (user?.firstName ? "-" : "")}
                      </span>
                    </div>
                  )}
                </div>
              )}
              {(isEditing || isCurrentUser || user?.gender) && (
                <div className="about-tab-content">
                  {user?.gender === "male" && <MaleOutlinedIcon />}
                  {user?.gender === "female" && <FemaleOutlinedIcon />}
                  {user?.gender === "other" && <TransgenderOutlinedIcon />}
                  {isEditing ? (
                    <Select
                      id="gender"
                      label="Gender"
                      value={values?.gender}
                      onChange={(event) =>
                        formik.setFieldValue("gender", event?.target?.value)
                      }
                    >
                      <MenuItem
                        className="options"
                        value={"select"}
                        disabled={true}
                      >
                        Select Gender
                      </MenuItem>
                      <MenuItem className="options" value={"male"}>
                        Male
                      </MenuItem>
                      <MenuItem className="options" value={"female"}>
                        Female
                      </MenuItem>
                      <MenuItem className="options" value={"other"}>
                        Other
                      </MenuItem>
                    </Select>
                  ) : (
                    <span className="content-text-displaying">
                      {user?.gender?.toUpperCase() || "-"}
                    </span>
                  )}
                </div>
              )}
              {(isEditing || isCurrentUser || user?.jobTitle) && (
                <div className="about-tab-content">
                  <WorkOutlineRoundedIcon />
                  {isEditing ? (
                    <TextField
                      id="jobTitle"
                      label="Job title"
                      autoComplete="job-title"
                      value={values?.jobTitle}
                      onChange={handleChange}
                      variant="standard"
                    />
                  ) : (
                    <span className="content-text-displaying">
                      {user?.jobTitle || "-"}
                    </span>
                  )}
                </div>
              )}
              {(isEditing || isCurrentUser || user?.relationshipStatus) && (
                <div className="about-tab-content">
                  <FavoriteBorderRoundedIcon />
                  {isEditing ? (
                    <TextField
                      id="relationshipStatus"
                      label="Relationship status"
                      autoComplete="relationship-status"
                      value={values?.relationshipStatus}
                      onChange={handleChange}
                      variant="standard"
                    />
                  ) : (
                    <span className="content-text-displaying">
                      {user?.relationshipStatus || "-"}
                    </span>
                  )}
                </div>
              )}
              {(isEditing || isCurrentUser || user?.city) && (
                <div className="about-tab-content">
                  <HomeOutlinedIcon />
                  {isEditing ? (
                    <TextField
                      id="city"
                      label="City"
                      autoComplete="city"
                      value={values?.city}
                      onChange={handleChange}
                      variant="standard"
                    />
                  ) : (
                    <span className="content-text-displaying">
                      {user?.city || "-"}
                    </span>
                  )}
                </div>
              )}
              {(isEditing || isCurrentUser || user?.state) && (
                <div className="about-tab-content">
                  <LocationCityRoundedIcon />
                  {isEditing ? (
                    <TextField
                      id="state"
                      label="State"
                      autoComplete="state"
                      value={values?.state}
                      onChange={handleChange}
                      variant="standard"
                    />
                  ) : (
                    <span className="content-text-displaying">
                      {user?.state || "-"}
                    </span>
                  )}
                </div>
              )}
              {(isEditing || isCurrentUser || user?.country) && (
                <div className="about-tab-content">
                  <OutlinedFlagRoundedIcon />
                  {isEditing ? (
                    <TextField
                      id="country"
                      label="Country"
                      autoComplete="country"
                      value={values?.country}
                      onChange={handleChange}
                      variant="standard"
                    />
                  ) : (
                    <span className="content-text-displaying">
                      {user?.country || "-"}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
          {currentTab === "contact" && (
            <div
              className="about-section-tab-panel"
              value={currentTab}
              index={"contact"}
            >
              {(isEditing || isCurrentUser || user?.email) && (
                <div className="about-tab-content">
                  <EmailOutlinedIcon />
                  {isEditing ? (
                    <TextField
                      id="email"
                      label="Email"
                      autoComplete="email"
                      value={values?.email}
                      onChange={handleChange}
                      variant="standard"
                    />
                  ) : (
                    <span className="content-text-displaying">
                      {user?.email || "-"}
                    </span>
                  )}
                </div>
              )}
              {(isEditing || isCurrentUser || user?.phone?.number) && (
                <div className="about-tab-content">
                  <CallOutlinedIcon />
                  {isEditing ? (
                    <div className="about-tab-content-editing">
                      <TextField
                        className="area-code-text"
                        id="areaCode"
                        label="Area code"
                        autoComplete="area-code"
                        value={values?.areaCode}
                        onChange={handleChange}
                        variant="standard"
                      />
                      <TextField
                        className="number-text"
                        id="number"
                        label="Mobile number"
                        autoComplete="number"
                        value={values?.number}
                        onChange={handleChange}
                        variant="standard"
                      />
                    </div>
                  ) : (
                    <div className="about-tab-displaying">
                      <span className="content-text-displaying">
                        {user?.phone?.areaCode || "-"}
                      </span>
                      <span className="content-text-displaying">
                        {user?.phone?.number ||
                          (user?.phone?.areaCode ? "-" : "")}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {currentTab === "aboutMe" && (
            <div
              className="about-section-tab-panel"
              value={currentTab}
              index={"aboutMe"}
            >
              {(isEditing || isCurrentUser || user?.aboutMe) && (
                <div className="about-tab-content">
                  <InfoOutlinedIcon />
                  {isEditing ? (
                    <TextField
                      id="aboutMe"
                      label="About me"
                      autoComplete="about-me"
                      value={values?.aboutMe}
                      onChange={handleChange}
                      variant="standard"
                      multiline
                      maxRows={3}
                    />
                  ) : (
                    <span className="content-text-displaying">
                      {user?.aboutMe || "-"}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileDetailsCard;
