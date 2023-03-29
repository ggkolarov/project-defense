import { Hike } from "../components/Hike/Hike";

export const AllHikings = ({
    hikes,
    onHikeDeleteClick,
}) => {
    return (
        <div className="module-container">
            <h1 className="page__title">Списък с всички маршрути</h1>
            <div className="list">
                {hikes.map(hike => <Hike key={hike._id} {...hike} onHikeDeleteClick={onHikeDeleteClick} />)}
            </div>
        </div>
    );
};