import Card from "../Card/card.jsx"
import { useState, useEffect } from "react";

export default function Game() {
    let [clicked, setClicked] = useState(Array(9).fill(false));
    let [score, setScore] = useState(0);
    let [bestScore, setBestScore] = useState(0);
    let [board, setBoard] = useState([])

    // when is useEffect called w.r.t rest of code?
    
    useEffect(() => {
        console.log("here");

        let params = ["dog", "cat", "mouse", "squirrel", "pigeon", "rat", "fish", "bear", "lizard"];

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

        // fetch GIFs

        const gifPromises = [];
        for (let i = 0; i < params.length; i++) {
            let url = getUrls(params[i], i);
            console.log("url: ");
            console.log(url);
            gifPromises.push(url);
        }

        // randomly rearrange gifs, add to board
        /*
        Promise.all(gifPromises).then(function(gifs) {
            shuffle(gifs);
            let newBoard = [];
            for (let i = 0; i < 3; i++) {
                let row = []
                for (let j = 0; j < 3; j++) {
                    let k = 3*i + j;
                    row.push(<Card key={gifs[k].id} url={gifs[k].url}
                        onCardClick={() => handleClick(gifs[k].id)} 
                    />)
                }
                newBoard.push(<div key={i}>{row}</div>)
            }  

            setBoard(newBoard);
        });
        */
    }, [])

    function handleClick(key) {
        if (!clicked[key]) {   
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

