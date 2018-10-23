import React, { Component } from "react";
import Nav from "./components/Nav";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
// import Container from "./components/Container";
import Footer from "./components/Footer";
import Title from "./components/Title";
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
        console.log("button clicked");
        let rngNumbers = [];
        let randomCharacters = [];
        let foundTwelve = false;
        const min = 1;
        const max = friends.length;

        if (!this.state.lastPicked) {
            console.log("no character last picked, picking 12 random characters");

            do {
                let rand = min + Math.floor(Math.random() * (max - min));
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
                randomCharacters.push(friends[rngNumbers[x]]);
            }


            this.setState({ currentCharacters: randomCharacters });

        } else if (this.state.lastPicked) {
            console.log("character clicked before, adding that + picking 11 random characters");
            console.log("testing this.state.lastPicked:  " + this.state.lastPicked);

            rngNumbers.push(this.state.lastPicked);
            console.log("testing rngNumbers array after adding the lastPicked char to array");
            console.log(rngNumbers);

            do {
                let rand = min + Math.floor(Math.random() * (max - min));
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
                randomCharacters.push(friends[rngNumbers[x]]);
            }


            this.setState({ currentCharacters: randomCharacters });
        }

    }


    removeFriend = id => {
        // Filter this.state.friends for friends with an id not equal to the id being removed
        const friends = this.state.currentCharacters.filter(friend => friend.id !== id);
        // Set this.state.friends equal to the new friends array
        this.setState({ friends });
    };

    clickCharacter = id => {
        // Destructure the name and value properties off of event.target
        // Update the appropriate state
        console.log("testing id clicked:  " + id);

        if (id === this.state.lastPicked) {
            console.log("you clicked this character already, game over");
            console.log("resetting state")

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
            this.setState({ lastPicked: id, score: this.state.score + 1 });
            console.log("testing lastPicked state:  " + this.state.lastPicked);
            this.selectTwelve();

        }
        // const { name, value } = event.target;
        // this.setState({
        //     [name]: value
        // });

    };



    // Map over this.state.friends and render a FriendCard component for each friend object
    render() {
        // console.log("testing friends");
        // console.log(friends);
        return (
            <div>
                <Nav
                    score={this.state.score}
                    topScore={this.state.topScore}
                />
                <Title>Friends List</Title>
                <Wrapper>
                    {/* <button
                    onClick={this.selectTwelve}
                    className="btn btn-primary"
                >RNG Numbers
                </button> */}
                    {this.state.currentCharacters.map(character => (
                        <FriendCard
                            removeFriend={this.removeFriend}
                            clickCharacter={this.clickCharacter}
                            id={character.id}
                            key={character.id}
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
