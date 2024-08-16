import React from 'react';
import {Button, Card, CardContent, CardMedia, Grid, Link, Typography} from "@mui/material";
import TagContainer from "./TagContainer";
import Carousel from "react-material-ui-carousel";
import useAuth from "../hooks/useAuth";
import {convertDateWithBreaksUS, convertDateWithLongMonth} from "../util/formatUtils";

export default function ItemCard({ itemProperties, onClickImage }) {
  const images = itemProperties.images;
  const { currentUser } = useAuth();
  const MEDIA_HEIGHT = 400;

  const getCarouselProperties = () => {
    if (images.length <= 1) return {
      IndicatorIcon: null,
      navButtonsAlwaysInvisible: true,
    }
  }

  return (
    <div style={{ height: '100%' }}>
      <Card id={`item-card-${itemProperties.id}`} sx={{ height: '100%', width: '100%' }}>
        <CardContent id={`item-card-content-${itemProperties.id}`}>
          {
            itemProperties?.images?.length > 0
            ? <Carousel
                duration={1000}
                height={MEDIA_HEIGHT}
                {...getCarouselProperties()}
              >
                {
                  itemProperties.images.map(image =>
                    <CardMedia
                      key={image.imageUrl}
                      image={image.imageUrl}
                      sx={{ height: '100%' }}
                      onClick={onClickImage
                        ? () => onClickImage(image)
                        : () => {}  // do nothing
                      }
                    />
                  )
                }
            </Carousel>
            :
              <CardMedia
                image={"http://www.arideocean.com/wp-content/themes/arkahost/assets/images/default.png"}
                sx={{ height: MEDIA_HEIGHT }}
              />
          }
          <Typography variant="h4">
            <Link
              href={`/items/${itemProperties.id}`}
              underline='hover'
              sx={{ cursor: 'pointer', color: 'black' }}
            >
              {itemProperties.name}
            </Link>
          </Typography>
          {currentUser.username === itemProperties.owner.username &&
            <Button
              variant="outlined"
              sx={{ marginTop: 2 }}
              href={`/items/${itemProperties.id}/edit`}
            >
              Edit item
            </Button>
          }
          <Typography color="grey" variant="body2" sx={{ padding: 0.5 }}>
            Uploaded by <Link
              href={`/profile/${itemProperties.owner.username}`}
              underline='hover'
              sx={{ cursor: "pointer" }}
            >
              {itemProperties.owner.username}</Link> on {convertDateWithBreaksUS(itemProperties.uploadDate)}
          </Typography>
          <Typography variant="body1">
            {itemProperties.description}
          </Typography>
          <TagContainer tags={itemProperties.tags} />
        </CardContent>
      </Card>
    </div>
  );
};
