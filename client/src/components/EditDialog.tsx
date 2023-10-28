import { useState, ReactElement, ChangeEvent } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import LoadingAlert from "./LoadingAlert";
import { fetchWrapper } from "../utils/fetchWrapper";
import type { Image as ImageType } from "../types";

interface Props {
  initialValues: ImageType | undefined;
  isOpen: boolean;
  onSave: () => void;
  onClose: () => void;
}

function EditDialog({
  initialValues,
  isOpen,
  onSave,
  onClose,
}: Props): ReactElement {
  const [values, setValues] = useState<ImageType>();
  const [isLoading, setIsLoading] = useState(false);

  const handleValueChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const {
      target: { name, value },
    } = event;

    setValues((preValues) => {
      return { ...(preValues as ImageType), [name]: value };
    });
  };

  const handleSave = async () => {
    setIsLoading(true);

    await fetchWrapper(
      "PATCH",
      `${process.env.REACT_APP_API_BASE_URL}/images/${initialValues?.id}`,
      values
    );

    setIsLoading(false);
    onSave();
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} fullWidth>
        <DialogTitle>Update Image Meta</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="url">URL</InputLabel>
              <OutlinedInput
                id="url"
                label="URL"
                name="url"
                defaultValue={initialValues?.url}
                onChange={handleValueChange}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="name">Name</InputLabel>
              <OutlinedInput
                id="name"
                label="Name"
                name="name"
                defaultValue={initialValues?.name}
                onChange={handleValueChange}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="author">Author</InputLabel>
              <OutlinedInput
                id="author"
                label="Author"
                name="author"
                defaultValue={initialValues?.author}
                onChange={handleValueChange}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="description">Description</InputLabel>
              <OutlinedInput
                id="description"
                label="Description"
                name="description"
                defaultValue={initialValues?.description}
                onChange={handleValueChange}
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
      {isLoading && <LoadingAlert isOpen={isLoading} />}
    </>
  );
}

export default EditDialog;
