import React, {useEffect, useState} from "react";
import ControlledCarousel from "../components/ControlledCarousel";
import {GetItemsOnSale} from "../services/itemService";
import ItemCard from "../components/ItemCard";

function Dashboard() {

    const [itemsOnSale, setItemsOnSale] = useState(null);

    useEffect(() => {
        GetItemsOnSale(true)
            .then(res => setItemsOnSale(res.data))
    }, [])

    return (
        <>
            <h1 className="title-font text-center">Just 4 You</h1>
            <ControlledCarousel/>
            <h2 className={"title-font text-center mt-3"} style={{color: "red"}}>Items on sale</h2>
            <div className={"row m-auto"}>
                {itemsOnSale && itemsOnSale.length > 0 && itemsOnSale.map(item =>
                    <div key={item.id} className={"col-md-3 mb-4"}>
                        <ItemCard
                            title={item.name}
                            price={item.regularPrice}
                            id={item.id}
                            isOnSale={item.isOnSale}
                            image={item.picture}
                            description={item.description}
                            availableItems={item.availableItems}
                            saleStartDate={item.saleStartDate}
                            saleEndDate={item.saleEndDate}
                        />
                    </div>)
                }
            </div>
        </>
    )
}

export default Dashboard;