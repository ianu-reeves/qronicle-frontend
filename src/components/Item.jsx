import React from 'react';
import { Card, CardContent, CardMedia, Grid, Link, Typography } from "@mui/material";
import TagContainer from "./TagContainer";
import Carousel from "react-material-ui-carousel";

export default function Item({ itemProperties }) {
  const images = itemProperties.images;
  const getCarouselProperties = () => {
    if (images.length <= 1) return {
      IndicatorIcon: null,
      navButtonsAlwaysInvisible: true,
    }
  }

  return (
    <>
      <Grid item xs={4}>
        <Card sx={{ maxWidth: '75%' }}>
          <CardContent>
            {
              itemProperties.images.length > 0
              ? <Carousel
                  duration={1000}
                  height={400}
                  {...getCarouselProperties()}
                >
                  {
                    itemProperties.images.map(image =>
                      <CardMedia key={image.imageUrl} image={image.imageUrl} sx={{ height: '100%' }} />
                    )
                  }
              </Carousel>
              : <CardMedia
                  image={"http://www.arideocean.com/wp-content/themes/arkahost/assets/images/default.png"}
                  sx={{ height: '100%' }}
                />
            }
            <Typography variant="h4">
              {itemProperties.name}
            </Typography>
            <Typography color="grey" variant="body2" sx={{ padding: 0.5 }}>
              Uploaded by <Link underline='hover' sx={{ cursor: "pointer" }}>{itemProperties.ownerName}</Link>
            </Typography>
            <Typography variant="body1">
              {itemProperties.description}
            </Typography>
            <TagContainer tags={itemProperties.tags} />
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};
