import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {navigate} from "@reach/router";
import {AddCategory} from "../services/categoryService";

function AddUpdateCategory(props) {

    const initialCategory = {
        name: '',
        description: '',
    }

    console.log(props);
    const [category, setCategory] = useState(initialCategory);

    const [categoryPhoto, setCategoryPhoto] = useState(null);

    const handleChange = name => event => {
        setCategory({...category, [name]: event.target.value});
    };

    const handleDrop = event => {
        let file = event.target.files[0];
        setCategoryPhoto(file);
    }

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("categoryDto", new Blob([JSON.stringify({...category})], {
            type: "application/json"
        }));
        formData.append("categoryPicture", categoryPhoto);

        AddCategory(formData)
            .then(res => {
                navigate(`/categories/${res.data.id}`);
                setCategoryPhoto(null);
                setCategory(initialCategory);
            })
            .catch(err => console.log(err))
    };

    return (
        <div className="flex-column-center full-height add-category-background">
            <h3 className="title-font" style={{color:"black"}}>Add Category</h3>
            <Form onSubmit={handleSubmit} style={{width: '650px', height: '510px'}}>
                <Form.Group controlId="formCategoryName">
                    <Form.Label className="font-weight-bold font-italic">Name</Form.Label>
                    <Form.Control value={category.name} onChange={handleChange("name")} type="text"
                                  placeholder="Jeans"/>
                </Form.Group>

                <Form.Group controlId="formCategoryDescription">
                    <Form.Label className="font-weight-bold font-italic">Description</Form.Label>
                    <Form.Control value={category.description} onChange={handleChange("description")}
                                  as="textarea"
                                  rows="6"
                                  placeholder="Description"/>
                </Form.Group>

                <Form.Group>
                    <Form.Label className="font-weight-bold font-italic">Photo</Form.Label>
                    <Form.File id="formCustomerPicture" onChange={handleDrop}/>
                </Form.Group>

                <div className={"d-flex flex-column align-items-center"}>
                    <Button variant="primary" type="submit" className={"text-center justify-content-center"}>
                        Add
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default AddUpdateCategory;