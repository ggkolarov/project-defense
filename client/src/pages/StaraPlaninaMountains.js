import { Hike } from "../components/Hike/Hike";

export const StaraPlaninaMountains = ({
    hikes,
    onHikeDeleteClick,
}) => {
    return (
        <div className="module-container">
            <h1 className="page__title">Списък с всички маршрути</h1>
            <div className="list">
                {hikes.filter(hike => hike.mountain.includes('Стара планина' || 'стара планина')).map(filteredHike => (
                    <Hike key={filteredHike._id} {...filteredHike} onHikeDeleteClick={onHikeDeleteClick} />
                ))}

                {hikes.length === 0 && (
                    <h3 className="no-hikes">Все още няма добавени маршрути</h3>
                )}
            </div>
        </div>
    );
};