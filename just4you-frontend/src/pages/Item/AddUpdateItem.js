import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {AddItem, Sizes} from "../../services/itemService";
import DateRangePicker from "react-bootstrap-daterangepicker";
import 'bootstrap-daterangepicker/daterangepicker.css';
import InputGroup from "react-bootstrap/InputGroup";


function AddUpdateItem(props) {

    const halfMonthFromNow = new Date();
    halfMonthFromNow.setDate(halfMonthFromNow.getDate() + 15);

    const initialItem = {
        name: '',
        description: '',
        regularPrice: 1,
        salePrice: 0,
        categoryId: props.location.state.categoryId ? props.location.state.categoryId : null,
        availableItems: 0,
        saleStartDate: new Date(),
        saleEndDate: halfMonthFromNow,
        discountPercentage: 0,
        isOnSale: false,
        sizes: []
    }

    const [item, setItem] = useState(initialItem);
    const [itemPhoto, setItemPhoto] = useState(null);
    const [checkedItems, setCheckedItems] = useState(new Set());

    useEffect(() => {
    },)

    const handleChange = name => event => {
        if (name === "isOnSale") {
            setItem({...item, [name]: event.target.checked});
        } else {
            setItem({...item, [name]: event.target.value});
        }
    };

    const handleDrop = event => {
        let file = event.target.files[0];
        setItemPhoto(file);
    }

    const handleCheck = event => {
        if (checkedItems.has(event.target.id) && event.target.checked === false) {
            checkedItems.delete(event.target.id);
        } else {
            setCheckedItems(checkedItems.add(event.target.id));
            setItem({...item, sizes: Array.from(checkedItems)});
        }
    }

    const handleCallback = (start, end) => {
        setItem({...item, saleStartDate: start._d, saleEndDate: end._d})
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (item.isOnSale && item.discountPercentage) {
            setItem({...item, salePrice: item.regularPrice % item.discountPercentage})
        }

        const formData = new FormData();
        formData.append("itemDto", new Blob([JSON.stringify({...item})], {
            type: "application/json"
        }));
        formData.append("itemPicture", itemPhoto);

        AddItem(formData)
            .then(res => console.log(res.data))
    }

    return (
        <div className="flex-column-center full-height add-item-background">
            <h2 className="title-font mb-2" style={{color: "black"}}>Add Item</h2>
            <Form onSubmit={handleSubmit} style={{width: '450px'}}>
                <Form.Group controlId="formItemName">
                    <Form.Label className="font-weight-bold font-italic">Name</Form.Label>
                    <Form.Control value={item.name} onChange={handleChange("name")} type="text"
                                  placeholder="Item name"/>
                </Form.Group>

                <Form.Group controlId="formItemDescription">
                    <Form.Label className="font-weight-bold font-italic">Description</Form.Label>
                    <Form.Control value={item.description} onChange={handleChange("description")} as="textarea"
                                  rows="3"
                                  placeholder="Item description"/>
                </Form.Group>

                <Form.Group>
                    <Form.Label className="font-weight-bold font-italic">Photo</Form.Label>
                    <Form.File id="formItemPicture" onChange={handleDrop}/>
                </Form.Group>

                <Form.Row className="flex-row-space_between">
                    <Form.Group controlId="formItemRegularPrice" style={{width: '200px'}}>
                        <Form.Label className="font-weight-bold font-italic">Regular Price</Form.Label>
                        <InputGroup className="mb-2 mr-sm-2">
                            <InputGroup.Prepend>
                                <InputGroup.Text><i className="fas fa-euro-sign"/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control value={item.regularPrice} onChange={handleChange("regularPrice")}
                                          type="number"/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formItemAvailableItems">
                        <Form.Label className="font-weight-bold font-italic">Quantity</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text><i className="fas fa-warehouse"/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control value={item.availableItems} onChange={handleChange("availableItems")}
                                          type="number"
                                          placeholder="On Stock"/>
                        </InputGroup>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formItemIsOnSale">
                    <Form.Check id="itemSwitch" checked={item.isOnSale} value={item.isOnSale}
                                onChange={handleChange("isOnSale")}
                                type="switch"
                                label="Is Item on Sale"/>
                </Form.Group>
                {item.isOnSale &&
                <>
                    <Form.Group controlId="formUserPassword">
                        <Form.Label className="font-weight-bold font-italic">Discount percentage</Form.Label>
                        <InputGroup className="mb-2 mr-sm-2">
                            <InputGroup.Prepend>
                                <InputGroup.Text><i className="fas fa-percent"/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control value={item.discountPercentage}
                                          onChange={handleChange("discountPercentage")}
                                          type="number" min={0} max={100}/>
                        </InputGroup>
                    </Form.Group>
                    <DateRangePicker
                        onCallback={handleCallback}
                        initialSettings={{startDate: item.saleStartDate, endDate: item.saleEndDate}}
                    >
                        <Form.Group controlId="formItemOnSaleFromTo">
                            <Form.Label className="font-weight-bold font-italic">Date Range</Form.Label>
                            <InputGroup className="mb-2 mr-sm-2">
                                <InputGroup.Prepend>
                                    <InputGroup.Text><i className="far fa-calendar-alt"/></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="text"
                                              placeholder={item.saleStartDate.getDate() + "/" + item.saleStartDate.getMonth() + "/" + item.saleStartDate.getFullYear() + " - " + item.saleEndDate.getDate() + "/" + item.saleEndDate.getMonth() + "/" + item.saleEndDate.getFullYear()}/>
                            </InputGroup>
                        </Form.Group>
                    </DateRangePicker>
                </>}

                <div key={`custom-inline-checkbox`} className="mb-3">
                    {Object.keys(Sizes).map((size, index) =>
                        <Form.Check
                            onChange={handleCheck}
                            value={size}
                            key={index + 1}
                            custom
                            inline
                            label={size}
                            id={index + 1}
                            type={"checkbox"}
                        />)}
                </div>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default AddUpdateItem;