//fetch map data มาแสดงแต่ละ Card
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid } from "@mui/material";
import ReadMore from "./ReadMore";

function Item({ item, handleAddToCart }) {
  const [isReadMore, setIsReadMore] = useState(false);

  const toggleReadMore = () => {
    setIsReadMore((prevIsReadMore) => !prevIsReadMore);
  };

  return (
      <Grid item key={item.id}>
        <Card className={`relative ${isReadMore ? "h-auto" : "h-[430px]"}`}>
          {item.popularity >= 300 ? (
            <>
              <iframe
                src="https://giphy.com/embed/J2awouDsf23R2vo2p5"
                className="absolute z-10 right-[-10px] top-[-55px] w-[80px]"
              />
              <p className="absolute z-10 text-[red] right-[16px] top-5 drop-shadow-md">
                Hot
              </p>
            </>
          ) : null}
          <CardActionArea>
            <CardMedia
              className="h-[180px]"
              component="img"
              height="140"
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.original_title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.original_title}
              </Typography>
              <Typography variant="body2" color="rgb(163 163 163)">
                Release Date: {item.release_date}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <ReadMore
                  text={item.overview}
                  maxLength={70}
                  isReadMore={isReadMore}
                  toggleReadMore={() => toggleReadMore(toggleReadMore)}
                />
              </Typography>
            </CardContent>
          </CardActionArea>
          <div className="mt-10">
            <CardActions className="absolute bottom-0 left-0">
              <p className="text-[#e25450] text-lg font-medium">
                {item.vote_count} THB
              </p>
            </CardActions>
            <Button
              variant="contained"
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                bgcolor: "#1976d2",
              }}
              onClick={() => handleAddToCart(item)}
            >
              Add To Cart
            </Button>
          </div>
        </Card>
      </Grid>
  );
}
export default Item;
