import React, {useEffect, useState} from "react";
import {GetCategoryDetails} from "../../../services/categoryService";
import Button from "react-bootstrap/Button";
import {navigate} from "@reach/router";
import {GetAllItemsByCategory} from "../../../services/itemService";
import ItemCard from "../../../components/ItemCard";

function CategoryDetails(props) {

    const [category, setCategory] = useState(null);
    const [items, setItems] = useState(null);

    useEffect(() => {
        GetCategoryDetails(props.categoryId)
            .then(res => setCategory(res.data))

        GetAllItemsByCategory(props.categoryId)
            .then(res => {
                setItems(res.data)
            });
    }, [props.categoryId])

    return (
        <div className={"container-fluid mt-3"}>
            {category &&
            <div>
                <h1 className={"title-font text-center"}>{category.name}</h1>
                <h5 className={"text-center mt-4"}>{category.description}</h5>

                <div className="row m-auto">
                    {items && items.length > 0 && items.map(item =>
                        <div className="col-md-3 mt-4" key={item.id}>
                            <ItemCard
                                title={item.name}
                                isOnSale={item.isOnSale}
                                price={item.isOnSale ? item.isOnSale : item.regularPrice}
                                id={item.id}
                                image={item.picture}
                                description={item.description}
                                availableItems={item.availableItems}
                                saleStartDate={item.saleStartDate}
                                saleEndDate={item.saleEndDate}
                            />
                        </div>)}
                </div>
                <div className={"flex-justify-center mt-4 mb-3"}>
                    <Button style={{width:"25%"}} onClick={() => navigate("/items/add", {state: {categoryId: category.id}})}>Add Item</Button>
                </div>
            </div>
            }
        </div>
    )
}

export default CategoryDetails;