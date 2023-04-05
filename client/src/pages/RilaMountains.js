import { Hike } from "../components/Hike/Hike";

export const RilaMountains = ({
    hikes,
    onHikeDeleteClick,
}) => {
    return (
        <div className="module-container">
            <h1 className="page__title">Списък с всички маршрути</h1>
            <div className="list">
                {hikes.filter(hike => hike.mountain.includes('Рила' || 'рила')).map(filteredHike => (
                    <Hike key={filteredHike._id} {...filteredHike} onHikeDeleteClick={onHikeDeleteClick} />
                ))}
            </div>
        </div>
    );
};