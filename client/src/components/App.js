import React, { Component } from "react";
import { Grid, Row } from "react-bootstrap";
import Movie from "./Movie";
import SaveButton from "./SaveButton";
import LoginModal from "./LoginModal";
import Header from "./Header";
import { afiMovies } from "./afiMovies";
//import { RenderMovies } from "./RenderMovies";

class App extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      moviesWatched: 0,
      moviesWatchedList: []
    };
  }
  isModal = () => {
    if (this.state.modal) {
      return <LoginModal closeModal={this.closeModal} />;
    } else {
      return null;
    }
  };

  addMovie = (add, movie) => {
    if (add) {
      this.setState({
        moviesWatched: this.state.moviesWatched + 1,
        moviesWatchedList: [...this.state.moviesWatchedList, movie]
      });
    } else {
      let array = [...this.state.moviesWatchedList];
      let movieIndex = array.indexOf(movie);
      array.splice(movieIndex, 1);
      this.setState({
        moviesWatched: this.state.moviesWatched - 1,
        moviesWatchedList: array
      });
    }
  };

  closeModal = () => {
    this.setState({
      modal: false
    });
  };

  saveInfo = () => {
    console.log(this.state.moviesWatchedList);
  };

  renderMovies = afiMovies => {
    return afiMovies.map((movie, i) => (
      <Row key={i}>
        <Movie
          addMovie={this.addMovie}
          movieName={movie.title}
          movieYear={movie.year}
          ranking={i + 1}
        />
      </Row>
    ));
  };

  render() {
    return (
      <Grid>
        <Row>
          <Header />
        </Row>
        <div style={styles.movieContainer}>{this.renderMovies(afiMovies)}</div>
        <div style={styles.moviesWatched}>
          <p>You have watched: {this.state.moviesWatched} out of 100</p>
        </div>
        <SaveButton saveInfo={this.saveInfo} />
        {this.isModal()}
      </Grid>
    );
  }
}

const styles = {
  moviesWatched: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px"
  },
  movieContainer: {
    borderTop: "1px solid black",
    borderBottom: "1px solid black"
  }
};

export default App;
