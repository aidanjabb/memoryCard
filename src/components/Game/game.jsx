import Card from "../Card/card.jsx"
import { useState, useEffect } from "react";

export default function Game() {
    let [clicked, setClicked] = useState(Array(9).fill(false));
    let [score, setScore] = useState(0);
    let [bestScore, setBestScore] = useState(0);
    let [board, setBoard] = useState([])

    // TODO make sure useEffect is only called once (only need to fetch APIs once)

    // TODO if useEffect is called after render, does that mean that on the first render, our board will be empty? (since we haven't fetched the APIs yet)

    /*
    TODO inside useEffect:
        fetch all APIs
        add to board
    */

    useEffect(() => {
        // let params = ["dog", "cat"];

        /*
        async function getUrls(param, idx) {
            let apiUrl = "https://api.giphy.com/v1/gifs/search?api_key=zbfkEK4GgP5FAn40a0vIVmqii0fssvpX&q=" + param;

            const response = await fetch(apiUrl);
            console.log("response: ");
            console.log(response);

            const json = await response.json();
            console.log("json: ");
            console.log(json);
            return {url: json.data[0].images.original.url, id: idx};
        }
        */

        async function fetchPic(idx) {
            let apiUrl = "https://dog.ceo/api/breeds/image/random";
            const response = await fetch(apiUrl);
            const json = await response.json();
            return {url: json.message, id: idx};
        }

        // fetch pics
        const pics = [];
        for (let i = 0; i < 9; i++) {
            let pic = fetchPic(i);
            pics.push(pic);
        }

        Promise.all(pics).then(pics => {
            shuffle(pics);
            let newBoard = addToBoard(pics);
            setBoard(newBoard);
            // TODO shuffle, add to board
        });
    }, [])

    function handleClick(key) {
        if (!clicked[key]) {  
            console.log("not already clicked") 
            // increment score, update best score if nec., mark card "clicked"
            setScore(score + 1);
            if (score + 1 > bestScore) {
                setBestScore(score + 1);
            }
            clicked[key] = true;
        } else {      
            // reset score, mark all cards as "not clicked"
            setScore(0);
            setClicked([Array(9).fill(false)]);
        }

        
    }

    function shuffle(array) {
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {
            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    }

    function addToBoard(arr) {
        let newBoard = [];
        for (let i = 0; i < 3; i++) {
            let row = []
            for (let j = 0; j < 3; j++) {
                let k = 3*i + j;
                row.push(<Card key={arr[k].id} url={arr[k].url}
                    onCardClick={() => handleClick(arr[k].id)} 
                />)
            }
            newBoard.push(<div key={i}>{row}</div>)
        }
        console.log(newBoard);
        return newBoard
    }

    /*
    let gifs = [{url: "https://giphy.com/gifs/moodman-reaction-Fu3OjBQiCs3s0ZuLY3", id: 0}, {url: "https://upload.wikimedia.org/wikipedia/en/3/39/Arya_Stark-Maisie_Williams.jpg", id: 1}, {url: "https://upload.wikimedia.org/wikipedia/en/7/74/SophieTurnerasSansaStark.jpg", id: 2}, {url: "https://upload.wikimedia.org/wikipedia/en/f/fa/Bran_Stark_-_Isaac_Hempstead-Wright.jpeg", id: 3} , {url: "https://upload.wikimedia.org/wikipedia/en/0/0e/Rickon_Stark-Art_Parkinson.jpg", id: 4}, {url: "https://upload.wikimedia.org/wikipedia/en/5/50/Tyrion_Lannister-Peter_Dinklage.jpg", id: 5}, {url: "https://upload.wikimedia.org/wikipedia/en/b/b9/Tywin_Lannister_Profile_Charles_Dance.jpg", id: 6}, {url: "https://upload.wikimedia.org/wikipedia/en/b/b4/Jaime_Lannister-Nikolaj_Coster-Waldau.jpg?20171214060902", id: 7}, {url: "https://upload.wikimedia.org/wikipedia/en/2/22/Cersei_Lannister_in_Black_Dress_in_Season_5.jpg", id: 8}];
    */

    return (
    <>
        {board}
        <>{score}</>
        <>{bestScore}</>
    </>);
}

