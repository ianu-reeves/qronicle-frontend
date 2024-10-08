import React from 'react';
import {Button, Card, CardContent, CardMedia, Grid, Link, Typography} from "@mui/material";
import TagContainer from "./TagContainer";
import Carousel from "react-material-ui-carousel";
import useAuth from "../hooks/useAuth";
import {convertDateWithBreaksUS, convertDateWithLongMonth} from "../util/formatUtils";
import {NavLink} from "react-router-dom";
import UndecoratedNavLink from "./UndecoratedNavLink";

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
          {<Carousel
                duration={1000}
                height={MEDIA_HEIGHT}
                {...getCarouselProperties()}
              >
                {itemProperties?.images?.length > 0
                  ? itemProperties.images.map(image =>
                    <CardMedia
                      key={`${itemProperties.id}-${image.imageUrl}`}
                      image={image.imageUrl}
                      sx={{ height: '100%' }}
                      onClick={onClickImage
                        ? () => onClickImage(image)
                        : () => {}  // do nothing
                      }
                    />
                  )
                  // turn into array so Carousel generates empty item selector div to maintain spacing
                  : Array.of(
                    // card with placeholder image
                    <CardMedia
                      key={`${itemProperties.id}-placeholder-image`}
                      image="http://www.arideocean.com/wp-content/themes/arkahost/assets/images/default.png"
                      sx={{ height: '100%' }}
                    />
                  )
                }
            </Carousel>
          }
          <Typography variant="h4">
            <NavLink
              to={`/items/${itemProperties.id}`}
              style={{ cursor: 'pointer', color: 'black', textDecoration: 'none' }}
            >
              {itemProperties.name}
            </NavLink>
          </Typography>
          {currentUser.username === itemProperties.owner.username &&
            <NavLink to={`/items/${itemProperties.id}/edit`}>
              <Button variant="outlined" sx={{ marginTop: 2 }}>Edit item</Button>
            </NavLink>
          }
          <Typography color="grey" variant="body2" sx={{ padding: 0.5 }}>
            Uploaded by <UndecoratedNavLink to={`/profile/${itemProperties.owner.username}`}>{itemProperties.owner.username}
              </UndecoratedNavLink>
            on {convertDateWithBreaksUS(itemProperties.uploadDate)}
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
