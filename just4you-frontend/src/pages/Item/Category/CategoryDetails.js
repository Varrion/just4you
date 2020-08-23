import React, {useEffect, useState} from "react";
import {GetCategoryDetails} from "../../../services/categoryService";
import Button from "react-bootstrap/Button";
import {navigate} from "@reach/router";

function CategoryDetails(props) {

    const [category, setCategory] = useState(null);

    useEffect(() => {
        GetCategoryDetails(props.categoryId)
            .then(res => setCategory(res.data))
    }, [props.categoryId])

    return (
        <div>
            {category &&
            <div>
                <p>{category.name}</p>
                <p>{category.description}</p>

                <Button onClick={() => navigate("/items/add", {state: {categoryId: category.id}})}>Add Item</Button>
            </div>
            }
        </div>
    )
}

export default CategoryDetails;