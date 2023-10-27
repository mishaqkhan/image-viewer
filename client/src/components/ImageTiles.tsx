import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { fetchWrapper } from "../utils/fetchWrapper";
import type { Image } from "../types";

function ImageTiles() {
  const navigate = useNavigate();

  const [images, setImages] = useState<Image[]>();

  useEffect(() => {
    const getImages = async () => {
      const images: Image[] = await fetchWrapper(
        "GET",
        `${process.env.REACT_APP_API_BASE_URL}/images`
      );

      setImages(images);
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
