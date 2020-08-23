import React, {useEffect, useState} from "react";
import ItemCard from "../../components/ItemCard";
import {GetAllItems} from "../../services/itemService";

function Items(props) {
    const [items, setItems] = useState(null);

    useEffect(() => {
        GetAllItems()
            .then(res => setItems(res.data))
    }, [])
    console.log(props.loggedUser);
    return (
        <div>
            test
            {props.loggedUser?.username}
            {items && items.length && items.map((item) =>
                <ItemCard
                    id={item.id}
                    title={item.name}
                    price={item.isOnSale ? item.salePrice : item.regularPrice}
                    category={item.category ? item.category.name : "none"}
                    image={item.image}
                />)}
        </div>
    )
}

export default Items;