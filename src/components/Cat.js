import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

import '../css/Cat.scss';

/**
 * Cat component
 */
class Cat extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      cat: {},
      ready: false
    }
  }

  render() {
    const { cat, ready } = this.state;
    if (ready && !cat.id) {
      return (
        <Redirect to="/" />
      );
    }
    if (!ready) {
      return (
        <div className="Cat">
          <Container>
            <h5>Loading...</h5>
          </Container>
        </div>
      );
    }
    const breed = cat.breeds[0];
    return (
      <div className="Cat">
        <Container>
          <Card>
            <Card.Header>
              <Link className="btn btn-primary" to={'/?breed=' + breed.id}>Back</Link>
            </Card.Header>
            <Card.Img src={cat.url} />
            <Card.Body>
              <h4>{breed.name}</h4>
              <h5>Origin: {breed.origin}</h5>
              <h6>{breed.temperament}</h6>
              <p>{breed.description}</p>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }

  componentDidMount() {
    axios('//api.thecatapi.com/v1/images/' + this.props.match.params.id).then(({ data }) => {
      this.setState({
        cat: data,
        ready: true
      });
    });
  }
}

export default withRouter(Cat);
