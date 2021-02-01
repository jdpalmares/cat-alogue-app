import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

import '../css/CatDetails.scss';

/**
 * CatDetails component
 * (Single Cat Page requirement)
 */
class CatDetails extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      cat: {},
      ready: false
    }
  }

  /**
   * Render page components
   */
  render() {
    const { cat, ready } = this.state;
    if (ready && !cat.id) {
      return (
        <Redirect to="/" />
      );
    }
    if (!ready) {
      return (
        <div className="CatDetails">
          <Container>
            <h5>Loading...</h5>
          </Container>
        </div>
      );
    }
    const breed = cat.breeds[0];
    return (
      <div className="CatDetails">
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

  /**
   * Process after a component (CatDetails) is mounted
   */
  componentDidMount() {
    axios('//api.thecatapi.com/v1/images/' + this.props.match.params.id).then(({ data }) => {
      this.setState({
        cat: data,
        ready: true
      });
    })
    .catch(err => {
      //Alert prompt for API error handling to load cat imge
      let errMsg = "Apologies but we could not load this cat image for you at this time! Miau!";
      errMsg += "\r\nPlease reload the page or try again later";
      alert(errMsg);
      console.log(err);
    });
  }
}

export default withRouter(CatDetails);
