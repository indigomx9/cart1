import React from "react";
import { useQuery } from "react-query";
// Components
import { Item } from "../item/Item";
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

    const getTotalItems = () => null;
    const handleAddToCart = (clickedItem: CartItemType) => null;
    const handleRemoveFromCart = () => null;

    if (isLoading) return <LinearProgress />;
    if (error) return <aside>Something went wrong....</aside>

    return (
        <Wrapper>
            <Drawer 
                anchor="right" 
                open={cartOpen} 
                onClose={() => setCartOpen(false)}
                >Cart goes Here!
            </Drawer>
            
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
    );
};



