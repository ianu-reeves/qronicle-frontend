import React, {useState} from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog, DialogActions,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import useAuth from "../hooks/useAuth";
import { convertDateWithBreaksUS } from "../util/utils";
import { NavLink } from "react-router-dom";
import UndecoratedNavLink from "./UndecoratedNavLink";
import Tag from "./Tag";

export default function ItemCard({ itemProperties, onClickImage, onDeleteItem, imageHeight }) {
  const images = itemProperties.images;
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();

  const getCarouselProperties = () => {
    if (images.length <= 1) return {
      IndicatorIcon: null,
      navButtonsAlwaysInvisible: true,
    }
  }

  const handleDeleteItem = (item) => {
    onDeleteItem(item);
    setOpen(false);
  };

  return (
    <div style={{ height: '100%' }}>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>
          Delete '{itemProperties.name}'?
        </DialogTitle>
        <DialogContentText sx={{ padding: 2 }}>
          This action cannot be undone. If you choose to delete '{itemProperties.name}', it will be permanently deleted &
          cannot be recovered. Only proceed if you are sure you want to remove this item & its contents forever.
        </DialogContentText>
        <DialogActions>
          <Button
            variant='contained'
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant='outlined'
            onClick={handleDeleteItem}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Card id={`item-card-${itemProperties.id}`} sx={{ height: '100%', width: '100%' }}>
        <CardContent id={`item-card-content-${itemProperties.id}`}>
          {<Carousel
                duration={1000}
                height={imageHeight}
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
            <>
              <NavLink to={`/items/${itemProperties.id}/edit`}>
                <Button variant="outlined" sx={{ marginTop: 2, marginRight: 1 }}>Edit item</Button>
              </NavLink>
              <Button
                variant='outlined'
                sx={{ marginTop: 2, marginLeft: 1 }}
                color='error'
                onClick={() => setOpen(true)}
              >
                Delete item
              </Button>
            </>
          }
          <Typography color="grey" variant="body2" sx={{ padding: 0.5 }}>
            Uploaded by <UndecoratedNavLink to={`/profile/${itemProperties.owner.username}`}>{itemProperties.owner.username}
              </UndecoratedNavLink> on {convertDateWithBreaksUS(itemProperties.uploadDate)}
          </Typography>
          <Typography variant="body1">
            {itemProperties.description}
          </Typography>
          <Grid marginTop={1} container>
            {itemProperties.tags?.map(tag =>
              <Tag
                key={tag.description}
                tag={tag}
              />
            )}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};
