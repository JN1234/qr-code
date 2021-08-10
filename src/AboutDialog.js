import React, { Component, Fragment } from "react";
import Me from "./images/me.jpg";

//MUI STUFF
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
//Icons
import InfoIcon from "@material-ui/icons/Info";
import { DialogContent, Typography } from "@material-ui/core";

const styles = {
  infoButton: {
    float: "right",
    marginTop: "9px",
    marginRight: "40px",
  },
};
class DeleteExhibit extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClosed = () => {
    this.setState({ open: false });
  };
  deleteExhibit = () => {
    this.props.deleteExhibit(this.props.exhibitId);
    this.setState({ open: false });
  };
  render() {
    return (
      <Fragment>
        <Typography
          tip="Info about website"
          onClick={this.handleOpen}
          btnClassName={styles.infoButton}
        >
          <InfoIcon
            color="green"
            style={{
              color: "green",
              cursor: "pointer",
              position: "relative",
              top: 15,
            }}
          />
        </Typography>
        <Dialog
          open={this.state.open}
          onClose={this.handleClosed}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>About</DialogTitle>
          <DialogContent>
            <Typography variant={"subtitle2"}>
              Author : Jeremiah Ndalamei{" "}
            </Typography>
            <Typography variant={"subtitle2"}>
              Email : pilgrimrnd@gmail.com
            </Typography>
            <img src={Me} alt="me" style={{ width: "100%" }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClosed} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default DeleteExhibit;
