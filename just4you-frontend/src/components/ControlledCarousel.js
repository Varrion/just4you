import Carousel from "react-bootstrap/Carousel";
import React, {useState} from "react";
import Picture1 from "./../assets/images/117590465_887095415034022_7257920476514904458_n.jpg"
import Picture2 from "./../assets/images/117907581_319186485798765_3377768891425164189_n.jpg"
import Picture3 from "./../assets/images/117710169_3516755705009636_1068284605800946776_n.jpg"
import Picture4 from "./../assets/images/winter-travel-outfits-11-WSTYLE1216.jpg"

function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}
        >
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Picture1}
                    alt="First slide"
                    width={1200}
                    height={600}
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Picture2}
                    alt="Second slide"
                    width={1200}
                    height={600}
                />

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Picture3}
                    alt="Third slide"
                    width={1200}
                    height={600}
                />

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default ControlledCarousel;