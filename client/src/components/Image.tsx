import { useState, useEffect, ReactElement } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { fetchWrapper } from "../utils/fetchWrapper";
import type { Image as ImageType } from "../types";

type Response = {
  success: boolean;
  data: ImageType;
};

function Image(): ReactElement {
  const params = useParams();

  const [imageData, setImageData] = useState<ImageType>();

  useEffect(() => {
    async function fetchData() {
      const response: Response = await fetchWrapper(
        "GET",
        `${process.env.REACT_APP_API_BASE_URL}/images/${params.id}`
      );

      setImageData(response.data);
    }

    fetchData();
  }, [params.id]);

  return (
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
        <Grid item>edit</Grid>
        <Grid item>delete</Grid>
      </Grid>
    </Grid>
  );
}

export default Image;
