import React, { Component } from "react";
import Nav from "./components/Nav";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Title from "./components/Title";
import friends from "./friends.json";
import "./App.css";

class App extends Component {
    // Setting this.state.friends to the friends json array
    state = {
        currentCharacters: friends,
        lastPicked: ""
    };
    componentDidMount() {
        this.selectTwelve();
    }

    selectTwelve = () => {
        console.log("button clicked");
        let rngNumbers = [];
        let randomCharacters = [];

        if (!this.state.lastPicked) {
            const min = 1;
            const max = friends.length;
            var foundTwelve = false;

            do {
                var rand = min + Math.floor(Math.random() * (max - min));
                console.log("random number = " + rand);

                if (rngNumbers.length === 12) {
                    foundTwelve = true;
                }
                else if (rngNumbers.indexOf(rand) < 0) {
                    console.log("else condition");
                    console.log("rngNumbers.indexOf(" + rand + ") < 0:  " + rngNumbers.indexOf(rand));
                    rngNumbers.push(rand);
                }

            } while (!foundTwelve);

            console.log("testing rngNumbers array");
            console.log(rngNumbers);

            for (let x = 0; x < rngNumbers.length; x++) {
                console.log("iteration #" + x);
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

    // Map over this.state.friends and render a FriendCard component for each friend object
    render() {
        console.log("testing friends");
        console.log(friends);
        return (
            <div>
                <Nav />
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
