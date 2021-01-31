import { findIndex, isUndefined } from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

import '../css/Home.scss';

/**
 * Query string to object
 */
export function fromQuery(url) {
  const question = url.indexOf('?');
  if (question < 0) {
    return {};
  }
  const object = {},
        hash = url.indexOf('#', question),
        query = url.substring(question + 1, (hash < 0) ? undefined : hash);
  query.split('&').forEach((pair) => {
    const [name, value] = pair.split('=');
    object[name] = isUndefined(value) ? true : decodeURIComponent(value);
  });
  return object;
}
/**
 * Home component
 */
export default class Home extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      busy: false,
      cats: [],
      breed: '',
      breeds: [],
      overflow: false,
      page: 1,
      ready: false
    }
  }

  render() {
    const { breed, breeds, busy, cats, overflow, page, ready } = this.state;
    return (
      <div className="Home">
        <Container>
          <h1>CATalogue</h1>
          <Row style={{ padding: '10px 0' }}>
            <Col md={3} sm={6} xs={12}>
              <Form.Group controlId="breed">
                <Form.Label>Breed</Form.Label>
                <Form.Control disabled={!ready || busy} as="select" value={breed} onChange={(e) => { this.select(e.target.value); }}>
                  <option value="">Select breed</option>
                  {breeds.map(({ id, name }) => (
                    <option key={id} value={id}>{name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            {(!cats.length ?
              <Col xs={12} style={{ marginBottom: '20px' }}>No cats available</Col> :
              cats.map(({ id, url }, i) => (
                <Col md={3} sm={6} xs={12} key={i}>
                  <Card>
                    <Card.Img variant="top" src={url} />
                    <Card.Body>
                      <Link className="btn btn-primary btn-block" to={'/' + id}>View details</Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
          {(overflow ? '' :
            <Row>
              <Col md={3} sm={6} xs={12}>
                <Button variant="success" disabled={!breed || busy} type="button" onClick={() => { this.load(page + 1) }}>
                  {busy ? 'Loading cats...' : 'Load more'}
                </Button>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    );
  }

  componentDidMount() {
    axios.get('//api.thecatapi.com/v1/breeds').then(({ data }) => {
      this.setState({
        breeds: data,
        ready: true
      });
      const query = fromQuery(this.props.location.search);
      if (query.breed) {
        this.select(query.breed);
      }
    });
  }

  /**
   * Select
   */
  select(breed) {
    this.setState({
      breed,
      cats: []
    });
    if (breed) {
      this.load(1, breed);
    }
  }

  /**
   * Load
   */
  load(page, breed = this.state.breed) {
    axios(`//api.thecatapi.com/v1/images/search?page=${page}&limit=10&breed_id=${breed}`).then(({ data }) => {
      const cats = [];
      data.forEach((cat) => {
        if (findIndex(this.state.cats, ({ id }) => (id === cat.id)) < 0) {
          cats.push(cat);
        }
      })
      this.setState({
        busy: false,
        cats: [
          ...this.state.cats,
          ...cats
        ],
        overflow: (cats.length === 0)
      });
    });
    this.setState({
      busy: true,
      page
    });
  }
}
