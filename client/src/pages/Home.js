import Carousel from 'react-bootstrap/Carousel';

export const Home = ({
    hikes
}) => {
    return (
        <>
            <Carousel>
            {hikes.map(hike =>
                <Carousel.Item key={hike._id} style={{maxHeight: "400px", background: "#00000054"}}>
                    <img
                        className="d-block w-100"
                        src={hike.imageUrl}
                        alt={hike.title}
                    />
                    <Carousel.Caption style={{background: "#00000054"}}>
                        <h3>{hike.title}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                )}
            </Carousel>
        </>
    );
};