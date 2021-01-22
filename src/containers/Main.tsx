import React from "react";
import { useQuery } from "react-query";
// Components
import { Item } from "../item/Item";
import { Cart } from "../cart/Cart";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
// Styles
import { Wrapper, StyledButton } from "./Main.styles";

export type CartItemType = {
    id: number,
    category: string,
    description: string,
    image: string,
    price: number,
    title: string,
    amount: number
};

const getProducts = async (): Promise<CartItemType[]> => {
    const res = await fetch("https://fakestoreapi.com/products");
    return res.json();
};

export const Main = (): JSX.Element => {
    const [cartOpen, setCartOpen] = React.useState(false);
    const [cartItems, setCartItems] = React.useState([] as CartItemType[]);

    const { data, isLoading, error } = useQuery<CartItemType[]>(
        "products", getProducts
    );    

    const getTotalItems = (items: CartItemType[]) => {
        return items.reduce((accumulator: number, item) => 
            accumulator + item.amount, 0);
    };    

    const handleAddToCart = (clickedItem: CartItemType) => {
        setCartItems((previous) => {
            // 1. Is the item already in the cart?
            const isItemInCart = previous.find((item) => item.id === clickedItem.id);
            if (isItemInCart) {
                return previous.map((item) => (
                    item.id === clickedItem.id
                    ? { ...item, amount: item.amount + 1 }
                    : item
                ))
            }
            // First time the item is added.
            return [...previous, {...clickedItem, amount: 1}];
        })
    };

    const handleRemoveFromCart = (id: number) => {
        setCartItems((previous) => (
            previous.reduce((accumulator, item) => {
                if (item.id === id) {
                    if (item.amount === 1) return accumulator;
                    return [...accumulator, {
                        ...item, amount: item.amount - 1
                    }];
                } else {
                    return [...accumulator, item];
                }
            }, [] as CartItemType[])
        ))
    };

    if (isLoading) return <LinearProgress />;
    if (error) return <aside>Something went wrong....</aside>

    return (
        <React.Fragment>
            <Wrapper>
                <Drawer 
                    anchor="right" 
                    open={cartOpen} 
                    onClose={() => setCartOpen(false)}
                    >
                        <Cart
                            cartItems={cartItems}
                            addToCart={handleAddToCart}
                            removeFromCart={handleRemoveFromCart}
                        />
                </Drawer>
                <StyledButton onClick={() => setCartOpen(true)}>
                    <Badge badgeContent={getTotalItems(cartItems)} color="error">
                        <AddShoppingCartIcon />
                    </Badge>
                </StyledButton>
                <Grid container spacing={3}>
                    {data?.map((item) => (
                        <Grid item key={item.id} xs={12} sm={4}>
                            <Item 
                                item={item} 
                                handleAddToCart={handleAddToCart} 
                            />
                        </Grid>
                    ))}
                </Grid>
            </Wrapper>
        </React.Fragment>
    );
};



