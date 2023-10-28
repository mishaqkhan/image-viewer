import { useState, useEffect, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
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
    <ImageList sx={{ width: "60%", height: "60%", margin: "0 auto" }}>
      {images ? (
        images.map((img) => (
          <ImageListItem key={img.url}>
            <img
              src={`${img.url}?w=248&fit=crop&auto=format`}
              alt={img.name}
              loading="lazy"
            />
            <ImageListItemBar
              title={img.name}
              subtitle={img.author}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${img.name}`}
                  onClick={() => navigate(`/images/${img.id}`)}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))
      ) : (
        <></>
      )}
    </ImageList>
  );
}

export default ImageTiles;
