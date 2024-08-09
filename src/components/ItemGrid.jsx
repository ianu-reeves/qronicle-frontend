import {Grid} from "@mui/material";
import ItemCard from "./ItemCard";

export default function ItemGrid({ items }) {
  // determines width of cards in grid. operates such that rows have max of 3 items each (12/ 4 = 3)
  const getWidth = () => {
    switch (items.length) {
      case 0:
      case 1:
        return 12;
      case 2:
        return 6;
      default:
        return 4;
    }
  };

  return (
    <Grid
      id='item-grid-outer-layer'
      container
      justifyContent='center'
    >
      <Grid
        id='item-grid-container'
        container
        justifyContent='center'
        rowSpacing={2}
        columnSpacing={2}
        sx={{ margin: 2 }}
      >
        {items.map(item =>
          <Grid
            key={`item-grid-item-${item.id}`}
            item
            xs={getWidth()}
          >
            <ItemCard itemProperties={item} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}