export default function Card({url, onCardClick}) {
    return <img height={100} width={100} src = {url} onClick={onCardClick}/>;
}