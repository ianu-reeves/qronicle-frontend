import {Grid} from "@mui/material";
import ItemCard from "./ItemCard";
import useResize from "../hooks/useResize";

export default function ItemGrid({ items, onClickImage, onDeleteItem }) {
  const size = useResize();

  // determines width of cards in grid. operates such that rows have max of 3 items each (12/ 4 = 3)
  const getWidth = () => {
    if (size.width >= 1600) return 3; // 4 cards
    if (size.width >= 1200) return 4; // 3 cards
    if (size.width >= 800) return 6; // 2 cards
    return 12; // 1 card
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
            <ItemCard
              itemProperties={item}
              onClickImage={onClickImage}
              onDeleteItem={() => onDeleteItem(item)}
              imageHeight={400}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}