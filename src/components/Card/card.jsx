export default function Card({url, onCardClick}) {
    return <img src = {url} onClick={onCardClick}/>;
}