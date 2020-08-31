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
                console.log("res", res.data)
                setItems(res.data)
            });
    }, [props.categoryId])

    return (
        <div>
            {category &&
            <div>
                <p>{category.name}</p>
                <p>{category.description}</p>

                <div className="row m-auto">
                    {items && items.length > 0 && items.map(item =>
                        <div className="col-md-3 mb-3" key={item.id}>
                            <ItemCard
                                title={item.name}
                                price={item.regularPrice}
                                id={item.id}
                                image={item.picture}
                                description={item.description}
                                availableItems={item.availableItems}
                            />
                        </div>)}
                </div>


                <Button onClick={() => navigate("/items/add", {state: {categoryId: category.id}})}>Add Item</Button>
            </div>
            }
        </div>
    )
}

export default CategoryDetails;