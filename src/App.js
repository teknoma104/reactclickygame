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
        currentCharacters: friends,
        lastPicked: "",
        score: 0,
        topScore: 0
    };

    componentDidMount() {
        this.selectTwelve();
    }

    selectTwelve = () => {
        console.log("selectTwelve function accessed");

        let rngNumbers = [];
        let randomCharacters = [];
        let foundTwelve = false;
        const min = 1;
        const max = 20;

        if (!this.state.lastPicked) {
            console.log("no character last picked, picking 12 random characters");
            console.log("confirming this.state.lastPicked:  " + this.state.lastPicked);

            do {
                let rand = Math.floor(Math.random() * (max - min) + min);
                // console.log("random number = " + rand);

                if (rngNumbers.length === 12) {
                    foundTwelve = true;
                }
                else if (rngNumbers.indexOf(rand) < 0) {
                    // console.log("else condition");
                    // console.log("rngNumbers.indexOf(" + rand + ") < 0:  " + rngNumbers.indexOf(rand));
                    rngNumbers.push(rand);
                }

            } while (!foundTwelve);

            console.log("testing rngNumbers array");
            console.log(rngNumbers);

            for (let x = 0; x < rngNumbers.length; x++) {
                // console.log("iteration #" + x);

                // Subtract one because the ID in friends.json begins with 1-20 although the array counts as 0-19
                // That way when we loop through rngNumbers[x] to get the character ID we want from friends, their actual array index is 1 less than their ID property
                randomCharacters.push(friends[rngNumbers[x] - 1]);
            }

            this.setState({ currentCharacters: randomCharacters });

        } else if (this.state.lastPicked) {
            console.log("character clicked before, adding that + picking 11 random characters");
            console.log("testing this.state.lastPicked:  " + this.state.lastPicked);

            rngNumbers.push(this.state.lastPicked);
            console.log("testing rngNumbers array after adding the lastPicked char to array");
            console.log(rngNumbers);

            do {
                let rand = Math.floor(Math.random() * (max - min) + min);
                // console.log("random number = " + rand);

                if (rngNumbers.length === 12) {
                    foundTwelve = true;
                }
                else if (rngNumbers.indexOf(rand) < 0) {
                    // console.log("else condition");
                    // console.log("rngNumbers.indexOf(" + rand + ") < 0:  " + rngNumbers.indexOf(rand));
                    rngNumbers.push(rand);
                }

            } while (!foundTwelve);

            console.log("testing rngNumbers array");
            console.log(rngNumbers);

            for (let x = 0; x < rngNumbers.length; x++) {
                // console.log("iteration #" + x);
                // console.log("testing rngNumbers["+x+"]:  " + rngNumbers[x] );
                // console.log("testing friends[rngNumbers["+x+"]]:  ");
                // console.log(friends[rngNumbers[x]-1]);

                // Subtract one because the ID in friends.json begins with 1-20 although the array counts as 0-19
                // That way when we loop through rngNumbers[x] to get the character ID we want from friends, their actual array index is 1 less than their ID property
                randomCharacters.push(friends[rngNumbers[x] - 1]);
            }

            console.log("testing randomCharacters");
            console.log(randomCharacters);


            this.setState({ currentCharacters: randomCharacters });
        }

    }

    clickCharacter = id => {
        // Destructure the name and value properties off of event.target
        // Update the appropriate state
        console.log("testing id clicked:  " + id);

        // if the clicked id matches the id in state's lastPicked, game is over
        if (id === this.state.lastPicked) {
            console.log("you clicked this character already, game over");
            console.log("resetting state")

            // if current score is higher than top score, replace top score with current score
            // if not, just reset current score to 0 and reset lastPicked to empty string
            if (this.state.score > this.state.topScore) {
                console.log("current score is higher than topScore");
                const newTopScore = this.state.score;

                this.setState({ lastPicked: "", score: 0, topScore: newTopScore });
                this.selectTwelve();

            } else {
                this.setState({ lastPicked: "", score: 0 });
                this.selectTwelve();
            }

        } else {
            console.log("congrats you clicked a character you didn't pick in the last click");
            console.log("adding 1 point to current score");
            console.log("testing id clicked again:  " + id);

            console.log("testing state");
            console.log(this.state);
            console.log("testing lastPicked state:  " + this.state.lastPicked);
            // return this.setState(({ lastPicked, score }) => ({lastPicked: id, score: this.state.score + 1}));
            this.setState((state) => { return { lastPicked: id, score: this.state.score + 1 } });
            this.selectTwelve();
        }

    };



    // Map over this.state.friends and render a FriendCard component for each friend object
    render() {
        // console.log("testing friends");
        // console.log(friends);
        console.log("page refreshed");
        console.log("test state");
        console.log(this.state);
        return (
            <div>
                <Nav
                    score={this.state.score}
                    topScore={this.state.topScore}
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
