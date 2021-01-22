import React from "react";
import Button from "@material-ui/core/Button";
import { CartItemType } from "../containers/Main";
import { Wrapper } from "./CartItem.styles";
import { Item } from "../item/Item";

type IProps = {
    item: CartItemType,
    addToCart: (clickedItem: CartItemType) => void,
    removeFromCart: (id: number) => void,
};

export const CartItem = 
({item, addToCart, removeFromCart}: IProps): JSX.Element => {
    return (
        <Wrapper>
            <main>
                <h3>{item.title}</h3>
                <div className="information">
                    <p>Price: ${item.price}</p>
                    <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
                </div>
                <aside className="buttons">
                    <Button
                        size="small"
                        disableElevation
                        variant="contained"
                        onClick={() => removeFromCart(item.id)}
                        >-
                    </Button>
                    <p>{item.amount}</p>
                    <Button
                        size="small"
                        disableElevation
                        variant="contained"
                        onClick={() => addToCart(item)}
                        >+
                    </Button>
                </aside>
            </main>
            <img src={item.image} alt={item.title} />
        </Wrapper>
    );
};



