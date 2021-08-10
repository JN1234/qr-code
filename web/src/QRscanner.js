import React, { useState, useRef } from "react";
import {
  Container,
  Card,
  CardContent,
  makeStyles,
  Grid,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import QRCode from "qrcode";
import QrReader from "react-qr-reader";
import SignUp from "./components/pages/SignUp";
import axios from "axios";
import { Error } from "@material-ui/icons";
import store from "./redux/store";
import { SET_DONE_ADDINGENTRY } from "./redux/types";
import AddStudentEntry from "./components/pages/addStudentEntry";
import AddStaffEntry from "./components/pages/addStaffEntry";
import AddVisitorEntry from "./components/pages/addVisitorEntry";

import { postExhibit } from "./redux/actions/dataActions";

import { connect } from "react-redux";
import PropTypes from "prop-types";
const types = ["student", "staff", "visitor"];
function QRscanner(props) {
  const [scanType, setScanType] = useState("student");
  const [temperature, setTemperature] = useState(11);
  const [hasResult, setHasResult] = useState(false);
  const [scanResultWebCam, setScanResultWebCam] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [scanResultFeedback, setScanResultFeedback] = useState("");
  const [scanResultError, setScanResultError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [tag, setTag] = useState("student");
  const classes = useStyles();
  const [data, setData] = useState({
    fname: "jeremiah",
    sin: 18124066,
    staffId: "",
    nrc: "",
    lname: "ndalamei",
    location: "east gate",
    tag: tag,
    temperature: temperature,
    date: "2021-08-04",
  });
  const qrRef = useRef(null);

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddEntry = () => {
    let newData = data;
    let date = new Date().toISOString().split("T")[0];
    newData.location = props.user.credentials.location;

    if (tag === "student") {
      newData.sin = searchResults.sin;
    }
    if (tag === "staff") {
      newData.staffId = searchResults.id;
    }

    newData.date = date;
    newData.time = new Date().toISOString();
    console.log(newData);
    props.postExhibit(newData);
  };

  const handleErrorWebCam = (error) => {
    console.log(error);
    setScanResultError(error);
    setTimeout(setScanResultError(null), 10000);
  };
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
      axios
        .get(`/${scanType}/${result}`)
        .then((res) => {
          if (res.data.length > 0) {
            setSearchResults(res.data[0]);
            store.dispatch({ type: SET_DONE_ADDINGENTRY, payload: false });
            setHasResult(true);
            setScanResultWebCam("");
          } else {
            setHasResult(false);
            setScanResultFeedback(`${scanType.toUpperCase()} not found`);
          }
        })
        .catch((err) => console.log(err));
    }
    if (scanResultFeedback) {
      setTimeout(setScanResultFeedback(""), 10000);

      setScanResultWebCam("");
    }
  };
  const handleTagChange = (e) => {
    setTag(e);
    if (e !== "visitor") {
      setScanType(e);
    }
  };
  const scanMarkUp =
    hasResult && !props.doneAddingEntry ? (
      <Grid container>
        <Grid item xs={12}>
          {searchResults.sin && <h3>ID: {searchResults.sin}</h3>}

          {searchResults.id && <h3>ID: {searchResults.staffId}</h3>}

          {searchResults.fname && <h3>First Name: {searchResults.fname}</h3>}

          {searchResults.lname && <h3>Last Name : {searchResults.lname}</h3>}

          <div>
            <h3 style={{ display: "inline-block", paddingRight: 5 }}>
              Temperature:
            </h3>
            <input
              style={{ display: "inline-block", width: "20%" }}
              value={temperature}
              type="number"
              onChange={(e) => setTemperature(e.target.value)}
            />
            <Typography
              variant="button"
              style={{
                display: "inline-block",
                paddingLeft: 10,
                cursor: "pointer",
              }}
              onClick={() => console.log("sssh")}
            >
              Read Temp
            </Typography>
          </div>
          <Button
            type="button"
            variant="contained"
            onClick={() => setHasResult(false)}
          >
            Scan Again
          </Button>
          <Button
            style={{ display: "inline-block", marginLeft: 10 }}
            type="submit"
            variant="contained"
            onClick={() => handleAddEntry()}
          >
            Add Entry
          </Button>
        </Grid>
      </Grid>
    ) : (
      <Grid container>
        <Grid item xs={12}>
          <label>
            <Typography variant={"h6"}>Attend to</Typography>
          </label>

          <select
            style={{
              width: "100%",
              border: "2px solid black",
              padding: 7,
              fontSize: 16,
              textTransform: "capitalize",
            }}
            value={tag}
            onChange={(e) => handleTagChange(e.target.value)}
          >
            {types.map((type) => (
              <option value={type}>{type}</option>
            ))}
          </select>
          <TextField
            label="Enter Text Here"
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            className={classes.btn}
            variant="contained"
            color="primary"
            onClick={() => generateQrCode()}
          >
            Generate
          </Button>
          <br />
          <br />
          <br />
          {imageUrl ? (
            <a href={imageUrl} download>
              <img src={imageUrl} alt="img" />
            </a>
          ) : null}
          {tag !== "visitor" && (
            <div>
              <QrReader
                delay={300}
                style={{ width: "100%" }}
                onError={handleErrorWebCam}
                onScan={handleScanWebCam}
              />
              <h3>QRCode: {scanResultWebCam}</h3>

              {scanResultFeedback && (
                <h3 style={{ color: "red" }}>{scanResultFeedback}</h3>
              )}

              {scanResultError && (
                <h3 style={{ color: "red" }}>Error: {scanResultError}</h3>
              )}
            </div>
          )}
        </Grid>
      </Grid>
    );
  return (
    <Container className={classes.conatiner}>
      <Card>
        <CardContent>
          {scanMarkUp}
          <Grid container style={{ marginTop: 40 }}>
            <Grid item xs={12}>
              {tag === "student" && <AddStudentEntry />}
              {tag === "staff" && <AddStaffEntry />}
              {tag === "visitor" && <AddVisitorEntry />}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  conatiner: {
    marginTop: 10,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#3f51b5",
    color: "#fff",
    padding: 20,
  },
  btn: {
    marginTop: 10,
    marginBottom: 20,
  },
}));

QRscanner.propTypes = {
  postExhibit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  doneAddingEntry: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  exhibits: state.data.exhibits,
  doneAddingEntry: state.data.doneAddingEntry,
});

export default connect(mapStateToProps, { postExhibit })(QRscanner);
