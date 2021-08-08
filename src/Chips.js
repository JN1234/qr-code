import React from "react";
import Chip from "@material-ui/core/Chip";
import FilterCenterFocusIcon from "@material-ui/icons/FilterCenterFocus";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import AboutDialog from "./AboutDialog";
import ImageIcon from "@material-ui/icons/Image";
const styles = {
  root: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 10,
    margin: 10,
  },
  chip: {
    margin: 10,
  },
};
const chipData = [
  { key: 0, label: "Scan" },
  { key: 1, label: "Upload File to scan" },

  { key: 2, label: "Generate QRcode" },
];
export default function ChipsArray(props) {
  const handleDelete = (chipToDelete) => () => {
    if (chipToDelete.key === 0) {
      props.setFunc("scan");
    }
    if (chipToDelete.key === 1) {
      props.setFunc("upload");
    }
    if (chipToDelete.key === 2) {
      props.setFunc("generate");
    }
  };

  return (
    <div style={styles.root}>
      {chipData.map((data) => {
        let icon;

        if (data.label === "Upload File to scan") {
          icon = <AddAPhotoIcon />;
        }
        if (data.label === "Scan") {
          icon = <FilterCenterFocusIcon />;
        }
        if (data.label === "Generate QRcode") {
          icon = <ImageIcon />;
        }

        return (
          <li key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
              onClick={handleDelete(data)}
              style={styles.chip}
            />
          </li>
        );
      })}
      <AboutDialog />
    </div>
  );
}
