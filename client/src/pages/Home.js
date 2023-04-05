import { Link } from 'react-router-dom';

import Carousel from 'react-bootstrap/Carousel';

export const Home = ({
    hikes
}) => {
    return (
        <div className="slider">
            <Carousel>
                {hikes.map(hike =>
                    <Carousel.Item key={hike._id}>
                        <img
                            className="d-block w-100"
                            src={hike.imageUrl}
                            alt={hike.title}
                        />
                        <Carousel.Caption>
                            <h3><Link to={`/catalog/${hike._id}`}>{hike.title}</Link></h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                )}
            </Carousel>
        </div>
    );
};