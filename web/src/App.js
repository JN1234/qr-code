import React, { useState, useRef, Fragment } from "react";
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
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import ChipsArray from "./Chips";
const types = ["jpeg", "png"];
const errorCorrectionLevelTypes = ["L", "M", "Q", "H"];
function QRscanner(props) {
  const [imageType, setImageType] = useState("jpeg");
  const [hasResult, setHasResult] = useState(false);
  const [scanResultWebCam, setScanResultWebCam] = useState("");

  const [genError, setGenError] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [text, setText] = useState("");
  const [scanResultError, setScanResultError] = useState(null);
  const [funcType, setFuncType] = useState("scan");
  const classes = useStyles();
  const [errorCorrection, setErrorCorrection] = useState("L");
  const qrRef = useRef(null);

  const generateQrCode = async () => {
    try {
      var opts = {
        errorCorrectionLevel: { errorCorrection },
        type: `image/${imageType}`,
        quality: 0.92,
        margin: 1,
        width: 100,
      };
      const response = await QRCode.toDataURL(text, opts);
      setImageUrl(response);
      if (response) {
        setGenError(null);
      }
    } catch (error) {
      setGenError(error.toString());
      setImageUrl(null);
    }
  };

  const handleFuncTypeChange = (data) => {
    if (data === "generate") {
      setHasResult(false);
    }
    setFuncType(data);
    setImageUrl("");
  };
  const handleErrorFile = (error) => {
    console.log(error);
  };
  const handleScanFile = (result) => {
    if (result) {
      setScanResultWebCam(result);
      setHasResult(true);
    }
  };
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  };
  const handleErrorWebCam = (error) => {
    setScanResultError(error.toString());
  };
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
      setScanResultError(null);
      setHasResult(true);
    }
  };

  const scanMarkUp = hasResult ? (
    <Grid container>
      <Grid item xs={12} style={{ padding: 20 }}>
        <button
          style={{
            display: "block",
            margin: "10px 0",
            cursor: "pointer",
            padding: 10,
            border: "none",
            color: "white",
            backgroundColor: "green",
            borderRadius: 7,
          }}
          onClick={() => setHasResult(false)}
        >
          Scan Again
        </button>
        <label>
          <Typography variant={"h6"}>Scanned Code</Typography>
        </label>
        <Typography
          style={{
            display: "block",
            border: "2px dotted black",
            padding: 10,
          }}
        >
          {scanResultWebCam}
        </Typography>
      </Grid>
    </Grid>
  ) : (
    <Grid container>
      <Grid item xs={12}>
        {funcType === "upload" && (
          <Fragment>
            <Button
              className={classes.btn}
              variant="contained"
              color="secondary"
              onClick={onScanFile}
            >
              <AddAPhotoIcon />
            </Button>
            <QrReader
              ref={qrRef}
              delay={300}
              style={{ width: "100%" }}
              onError={handleErrorFile}
              onScan={handleScanFile}
              legacyMode
            />
          </Fragment>
        )}
        {funcType === "scan" && (
          <div>
            {scanResultError && (
              <h3 style={{ color: "red" }}>{scanResultError}</h3>
            )}
            <QrReader
              delay={300}
              style={{ width: "100%" }}
              onError={handleErrorWebCam}
              onScan={handleScanWebCam}
            />
          </div>
        )}
        {funcType === "generate" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <label>
                  <Typography variant={"subtitle1"}>Image Type</Typography>
                </label>

                <select
                  style={{
                    width: "100%",
                    border: "2px solid black",
                    borderRadius: 7,
                    padding: 7,
                    fontSize: 12,
                    marginBottom: 7,
                  }}
                  value={imageType}
                  onChange={(e) => setImageType(e.target.value)}
                >
                  {types.map((type) => (
                    <option value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>
                  <Typography variant={"subtitle1"}>
                    Error Correction Level
                  </Typography>
                </label>

                <select
                  style={{
                    width: "100%",
                    border: "2px solid black",
                    borderRadius: 7,
                    padding: 7,
                    fontSize: 12,
                    marginBottom: 7,
                  }}
                  value={errorCorrection}
                  onChange={(e) => setErrorCorrection(e.target.value)}
                >
                  {errorCorrectionLevelTypes.map((type) => (
                    <option value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            <TextField
              placeholder="Enter Text Here"
              fullWidth
              style={{ margin: "15px 0" }}
              variant="outlined"
              onChange={(e) => setText(e.target.value)}
            />
            {genError && <div style={{ color: "red" }}>{genError}</div>}
            <button
              style={{
                display: "block",
                margin: "10px 0",
                cursor: "pointer",
                padding: 10,
                border: "none",
                color: "white",
                backgroundColor: "green",
                borderRadius: 7,
              }}
              onClick={() => generateQrCode()}
            >
              Generate QrCode
            </button>
            <br />
            <br />
            <br />
            {imageUrl ? (
              <div>
                <p style={{ textAlign: "center" }}>Click to download</p>
                <a href={imageUrl} download>
                  <img src={imageUrl} alt="img" style={{ width: "100%" }} />
                </a>
              </div>
            ) : null}
          </div>
        )}
      </Grid>
    </Grid>
  );
  return (
    <Container maxWidth={"sm"} className={classes.conatiner}>
      <Card>
        <CardContent>
          <ChipsArray setFunc={handleFuncTypeChange} />
          {scanMarkUp}
          <Grid container style={{ marginTop: 40 }}>
            <Grid item xs={12}></Grid>
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

export default QRscanner;
