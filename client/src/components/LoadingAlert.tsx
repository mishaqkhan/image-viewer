import { ReactElement } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  isOpen: boolean;
}

function LoadingAlert({ isOpen }: Props): ReactElement {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Loading...</DialogTitle>
      <DialogContent sx={{ margin: "0 auto" }}>
        <CircularProgress />
      </DialogContent>
    </Dialog>
  );
}

export default LoadingAlert;
