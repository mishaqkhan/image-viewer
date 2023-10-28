import { useState, useEffect, useCallback, ReactElement } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditDialog from "./EditDialog";
import LoadingAlert from "./LoadingAlert";
import { fetchWrapper } from "../utils/fetchWrapper";
import type { Image as ImageType } from "../types";

type Response = {
  success: boolean;
  data: ImageType;
};

function Image(): ReactElement {
  const params = useParams();
  const navigate = useNavigate();

  const [imageData, setImageData] = useState<ImageType>();

  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    const response: Response = await fetchWrapper(
      "GET",
      `${process.env.REACT_APP_API_BASE_URL}/images/${params.id}`
    );

    setImageData(response.data);
    setIsLoading(false);
  }, [params.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async () => {
    setIsLoading(true);

    await fetchWrapper(
      "DELETE",
      `${process.env.REACT_APP_API_BASE_URL}/images/${imageData?.id}`
    );

    setIsLoading(false);

    navigate("/");
  };

  const handleEditDialogSave = () => {
    fetchData();
    setIsOpenEditDialog(false);
  };

  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Card sx={{ maxWidth: 600 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="340"
                image={imageData?.url}
                alt={imageData?.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {imageData?.name}
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                  {imageData?.author}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {imageData?.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              color="info"
              onClick={() => navigate("/")}
            >
              Go Back
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              endIcon={<EditIcon />}
              color="success"
              onClick={() => setIsOpenEditDialog(true)}
            >
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {isLoading && <LoadingAlert isOpen={isLoading} />}
      {isOpenEditDialog && (
        <EditDialog
          initialValues={imageData}
          isOpen={isOpenEditDialog}
          onSave={handleEditDialogSave}
          onClose={() => setIsOpenEditDialog(false)}
        />
      )}
    </>
  );
}

export default Image;
