import React, { Component } from "react";
import Nav from "./components/Nav";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import Footer from "./components/Footer";
import friends from "./friends.json";
import "./App.css";

class App extends Component {
    // Setting this.state.friends to the friends json array
    state = {
        charactersClicked: [],
        currentCharacters: [],
        score: 0,
        topScore: 0,
        answer: "neutral"
    };

    componentDidMount() {
        console.log("mounting on load");
        this.selectTwelve();
    }

    selectTwelve = () => {
        console.log("selectTwelve function accessed");

        let rngNumbers = [];
        let randomCharacters = [];
        let foundTwelve = false;
        const min = 1;
        const max = 20;

        // Do while loop to get random 12 characters from the character roster (20 characters)
        do {
            // Variable to store a randomly generated number between 1-20
            let rand = Math.floor(Math.random() * (max - min) + min);
            // console.log("random number = " + rand);

            // if array is 12 in length, set foundTwelve to true to break the do..while loop
            // else if the randomly generated number between 1-20 is not found in the the array, add it to the array
            if (rngNumbers.length === 12) {
                foundTwelve = true;
            }
            else if (rngNumbers.indexOf(rand) < 0) {
                rngNumbers.push(rand);
            }

        } while (!foundTwelve);

        // Uses the array of 12 RNG numbers above to now get the characters from the roster and store it into a new array of objects
        for (let x = 0; x < rngNumbers.length; x++) {

            // Subtract one because the ID in friends.json begins with 1-20 but accessing the array requires starting 0-19
            // That way when we loop through rngNumbers[x] to get the character ID we want from friends, their actual array index is 1 less than their ID property
            randomCharacters.push(friends[rngNumbers[x] - 1]);
        }

        this.setState({ currentCharacters: randomCharacters });

    }

    shuffleCharacters = () => {
        console.log("Shuffle function called");
        
        let array = this.state.currentCharacters;
        console.log("testing currentCharacters array - pre shuffled");
        console.log(array);

        // Using Durstenfield shuffle, a computer-optimized version of Fisher-Yates
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
        }

        console.log("testing currentCharacters array - after shuffled");
        console.log(array);

        this.setState({ currentCharacters: array });
    }

    clickCharacter = id => {
        const newTopScore = this.state.score;

        console.log("testing id clicked:  " + id);

        // if the clicked character's ID can be found in the charactersClicked array via indexOf(possible value of 0 and above)
        // then the game is over
        if (this.state.charactersClicked.indexOf(id) >= 0) {
            console.log("character id#" + id + " has been clicked already");
            console.log("resetting score");

            // if current score is higher than top score, replace top score with current score and reset current score to 0 
            // if not, only reset current score to 0 
            // both conditions should reset charactersClicked back to empty array
            if (this.state.score > this.state.topScore) {
                console.log("current score is higher than topScore");        

                this.setState({ charactersClicked: [], score: 0, topScore: newTopScore, answer: "incorrect" });
                this.selectTwelve();

            } else {
                this.setState({ charactersClicked: [], score: 0, answer: "incorrect" });
                this.selectTwelve();
            }

        }
        // if the clicked character's ID can not be found in the charactersClicked array,
        // then user can keep progressing with the game that clicked character's ID will be pushed to state's charactersClicked
        // and score will be incremented by 1 before we shuffle the currentCharacters array of 12 characters
        else if (this.state.charactersClicked.indexOf(id) < 0) {
            console.log("character id#" + id + " has not been clicked yet");
            console.log("adding +1 score, adding clicked id to characterClicked array");

            let clickedCharactersArray = this.state.charactersClicked;

            console.log("testing array before push");
            console.log(clickedCharactersArray)

            clickedCharactersArray.push(id);

            console.log("testing array after push");
            console.log(clickedCharactersArray);

            if (clickedCharactersArray.length === 12) {
                console.log("User guessed all 12 characters without clicking a duplicate image, user wins");
                this.setState({ charactersClicked: [], score: 0, topScore: newTopScore + 1, answer: "winner" });
            }
            else {
                this.setState((state) => { return { charactersClicked: clickedCharactersArray, score: this.state.score + 1, answer: "correct" } });
                this.shuffleCharacters();
            }
        }

    };

    // Map over this.state.friends and render a FriendCard component for each friend object
    render() {
        // console.log("testing friends");
        // console.log(friends);
        console.log("page loaded");
        console.log("checking state values");
        console.log(this.state);
        return (
            <div>
                <Nav
                    score={this.state.score}
                    topScore={this.state.topScore}
                    answer={this.state.answer}
                />
                <Header backgroundImage="/assets/images/SFIII3rdStrike_logo.png">
                    <h1>React Clicky Game - SFIII 3rd Strike edition!</h1>
                    <h2>Click on an image to earn points, but don't click the same image twice or it's game over for you! </h2>
                </Header>
                <Wrapper>
                    {this.state.currentCharacters.map(character => (
                        <FriendCard
                            clickCharacter={this.clickCharacter}
                            id={character.id}
                            key={character.id}
                            name={character.name}
                            image={character.image}
                        />
                    ))}
                </Wrapper>
                <Footer />
            </div>
        );
    }
}

export default App;
