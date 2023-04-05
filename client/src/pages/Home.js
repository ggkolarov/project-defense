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
                            <h3>{hike.title}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                )}
            </Carousel>
        </div>
    );
};