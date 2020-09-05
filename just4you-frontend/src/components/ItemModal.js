import React, {useState} from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {Sizes, UpdateItem} from "../services/itemService";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Button from "react-bootstrap/Button";

function ItemModal(props) {

    const [item, setItem] = useState(props.item ?? null);
    const [itemPhoto, setItemPhoto] = useState(null);

    const itemSizes = Object.entries(Sizes).map(value => {
        let sizes = "";
        item.sizes.find(name => name === value[0] ? sizes += value[1] : "");
        return sizes;
    }).filter(size => size !== "").map(item => parseInt(item));


    const [checkedItems, setCheckedItems] = useState(itemSizes && itemSizes.length > 0 ? new Set(itemSizes) : new Set());
    const startDate = new Date(item.saleStartDate)
    const endDate = new Date(item.saleEndDate)

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
        if (checkedItems.has(parseInt(event.target.id)) && event.target.checked === false) {
            checkedItems.delete(parseInt(event.target.id));
        } else {
            setCheckedItems(checkedItems.add(parseInt(event.target.id)));
        }

        setItem({...item, sizes: Array.from(checkedItems)});
    }

    const handleCallback = (start, end) => {
        setItem({...item, saleStartDate: start._d, saleEndDate: end._d})
    }

    const handleSubmit = event => {
        event.preventDefault();
        item.sizes = Array.from(checkedItems);

        if (item.isOnSale && item.discountPercentage) {
            setItem({...item, salePrice: item.regularPrice % item.discountPercentage})
        }

        const formData = new FormData();
        formData.append("itemDto", new Blob([JSON.stringify({...item})], {
            type: "application/json"
        }));
        formData.append("itemPicture", itemPhoto);

        UpdateItem(item.id, formData)
            .then(() => window.location.reload())
    }

    return (
        <Modal show={props.show} onHide={() => props.setShow(false)}>
            {item &&
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Change details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                        <Form.Check id="itemSwitch" checked={item.isOnSale} value={item.isOnSale ?? false}
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
                            initialSettings={{
                                startDate: startDate,
                                endDate: endDate
                            }}
                        >
                            <Form.Group controlId="formItemOnSaleFromTo">
                                <Form.Label className="font-weight-bold font-italic">Date Range</Form.Label>
                                <InputGroup className="mb-2 mr-sm-2">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><i className="far fa-calendar-alt"/></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text"
                                                  placeholder={startDate.getDate() + "/" + startDate.getMonth() + "/" + startDate.getFullYear() + " - " + endDate.getDate() + "/" + endDate.getMonth() + "/" + endDate.getFullYear()}/>
                                </InputGroup>
                            </Form.Group>
                        </DateRangePicker>

                    </>}
                    <div key={`custom-inline-checkbox`} style={{display: "inline-flex"}} className="mb-3">
                        {Object.keys(Sizes).map((size, index) =>
                            <div key={index + 1} className={"form-check mr-3"}>
                                <input className="form-check-input" onChange={handleCheck}
                                       checked={itemSizes.find((item) => item === index + 1)}
                                       type={"checkbox"} value={size} id={index + 1}/>
                                <label className={"form-check-label"} htmlFor={index + 1}>{size}</label>
                            </div>)}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>}
        </Modal>
    )
}

export default ItemModal;