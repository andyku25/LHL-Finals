import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button, Card, FormCheck } from "react-bootstrap";
import AddressField from "../rooms/AddressField"

import "./ProfileInfoCard.scss"


export default function ProfileInfoEditCard(props) {
  console.log(props.user);

  const [userData, setUserData] = useState(props.user)

  const handleChange = (e) => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;
    setUserData({ ...userData,
      [target.name]: value
    })
  }

  const handleOptionChange = (e) => {
    const target = e.target;
    const value = target.value;
    setUserData({
      ...userData,
      [target.name]: value
    })
  }

  const editPath = `/api/users/${props.user.id}`;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("updated userData: ", userData)
    console.log(props.user)
    axios({
      method: "PUT",
      url: editPath,
      data: userData
    })
    .then(res => {
      console.log(res);
      props.setUser({
        ...userData
      })
      props.onSubmit();
      
    })
    .catch(err => console.error("update error: ", err))
  }

  console.log(props.user);

  const level1 = (<Card border="success">
                  <Card.Header>Level 1</Card.Header>
                  <Card.Body >
                      <ul>
                        <li>Light cleaning</li>
                        <li>Grocery shopping</li>
                        <li>Running Errands</li>
                      </ul>
                  </Card.Body>
                </Card>)
  const level2 = (<Card border="success">
                    <Card.Header>Level 2</Card.Header>
                    <Card.Body >
                        <ul>
                          <li>Yard maintenance</li>
                          <li>Shovelling snow</li>
                          <li>Deep cleaning</li>
                        </ul>
                    </Card.Body>
                  </Card>)
  const level3 = (<Card border="success">
                    <Card.Header>Level 3</Card.Header>
                    <Card.Body >
                        <ul>
                          <li>House maintenance</li>
                          <li>Yard maintenance</li>
                          <li>Transportation</li>
                        </ul>
                    </Card.Body>
                  </Card>)

  return (
    <>
      <div className="profile__card" >
        <Form onSubmit={handleSubmit} >
          <Row className="content-spacing">
          <div className="profile__card-label col-4" >First Name:</div>
            <Col>
              <Form.Control 
                type="text"
                name="firstname"
                value={userData.firstname}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row className="content-spacing">
            <div className="profile__card-label col-4" >Last Name:</div>
            <Col>
              <Form.Control 
                type="text"
                name="lastname"
                value={userData.lastname}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row className="content-spacing">
            <div className="profile__card-label col-4" >Description:</div>
            <Col>
            <Form.Control 
                as="textarea"
                name="description"
                rows={3}
                value={userData.description}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row className="content-spacing">
            <div className="profile__card-label col-4" >Address:</div>
            <Col>
              {/* <Form.Control 
                type="text"
                name="address"
                value={userData.address}
                onChange={handleChange}
              /> */}
              <AddressField formData={userData} setFormData={setUserData} handleInput={handleChange} />
            </Col>
          </Row>
          <Row className="content-spacing">
            <div className="profile__card-label col-4" >Level:</div>
          </Row>

            <Col>
              {/* <Row> */}
              <FormCheck>
                <FormCheck.Input
                  type="radio"
                  value={1}
                  onChange={handleOptionChange}
                  checked={userData.level == 1}
                  name="level"
                >
                </FormCheck.Input>
                <FormCheck.Label className="radio">
                  {level1}
                </FormCheck.Label>
              </FormCheck>

              <FormCheck>
                <FormCheck.Input
                  type="radio"
                  value={2}
                  onChange={handleOptionChange}
                  checked={userData.level == 2}
                  name="level"
                >
                </FormCheck.Input>
                <FormCheck.Label className="radio">
                  {level2}
                </FormCheck.Label>

              </FormCheck>

              <FormCheck>
                <FormCheck.Input
                  type="radio"
                  value={3}
                  onChange={handleOptionChange}
                  checked={userData.level == 3}
                  name="level"
                >
                </FormCheck.Input>
                <FormCheck.Label className="radio">
                  {level3}
                </FormCheck.Label>
              </FormCheck>
                
              {/* <Form.Check 
                type="radio"
                label={level2}
                value={2}
                onChange={handleOptionChange}
                checked={userData.level == 2}
                name="level"
                className="radio"
              />
              <Form.Check 
                type="radio"
                label={level3}
                value={3}
                onChange={handleOptionChange}
                checked={userData.level == 3}
                name="level"
                className="radio"
              /> */}
            </Col>
            {/* </Row> */}
          <Row className="btn-row">
            {/* <Col className="center"> */}
            {/* </Col> */}
            {/* <Col className="center"> */}
              <Button className="btn-danger btn-spacing" onClick={props.onCancel} >
                Cancel
              </Button>
              <Button className="btn-success btn-spacing" type="submit" >
                Save
              </Button>
            {/* </Col> */}
          </Row>
          
        </Form>
        
      </div>
    </>
  )
}