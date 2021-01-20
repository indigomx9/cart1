import React from "react";
import Button from "@material-ui/core/Button";
import { CartItemType } from "../containers/Main";
import { Wrapper } from "./Item.styles";

type Props = {
    item: CartItemType,
    handleAddToCart: (clickedItem: CartItemType) => void;
};

export const Item = ({item, handleAddToCart}: Props): JSX.Element => {
    return (
        <Wrapper>
            <img src={item.image} alt={item.title} />
            <main>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <h3>${item.price}</h3>
            </main>
            <Button onClick={() => handleAddToCart(item)}
                >Add to Cart
            </Button>
        </Wrapper>
    );
};


