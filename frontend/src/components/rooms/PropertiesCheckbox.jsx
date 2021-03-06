import React from "react";
import {Form} from "react-bootstrap";


export default function PropertiesCheckbox(props) {

  return (
    <>
      <Form.Group name="properties" >
        <Form.Check
          type="checkbox"
          label="Heating/AC"
          name="has_heating"
          checked={props.formData.has_heating}          
          onChange={props.handleInput}
        />
        <Form.Check
          type="checkbox"
          label="Parking"
          name="has_parking"
          checked={props.formData.has_parking}
          onChange={props.handleInput}
        />
        <Form.Check
          type="checkbox"
          label="Pet Friendly"
          name="is_pet_friendly"
          checked={props.formData.is_pet_friendly}
          onChange={props.handleInput}
        />
        <Form.Check
          type="checkbox"
          label="Private Bath"
          name="has_private_bath"
          checked={props.formData.has_private_bath}
          onChange={props.handleInput}
        />
      </Form.Group>
    </>
  )
}