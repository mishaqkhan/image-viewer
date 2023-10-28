import { useState, useEffect, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { fetchWrapper } from "../utils/fetchWrapper";
import type { Image as ImageType } from "../types";

type Response = {
  success: boolean;
  data: ImageType[];
};

function ImageTiles(): ReactElement {
  const navigate = useNavigate();

  const [images, setImages] = useState<ImageType[]>();

  useEffect(() => {
    const getImages = async () => {
      const response: Response = await fetchWrapper(
        "GET",
        `${process.env.REACT_APP_API_BASE_URL}/images`
      );

      setImages(response.data);
    };

    getImages();
  }, []);

  return (
    <Grid container spacing={3} sx={{ width: "50%", margin: "0 auto" }}>
      {images?.map((img) => (
        <Grid item>
          <Card sx={{ maxWidth: 350 }}>
            <CardMedia component="img" alt={img.name} image={img.url} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {img.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {img.author}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => navigate(`/images/${img.id}`)}
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ImageTiles;
