import React from "react";
import { Form } from "react-bootstrap";
/**
 * @author
 * @function UI
 **/

const UI = (props) => {
  return (
    <div>
      <Form.Group>
        {props.label ? <Form.Label>{props.label}</Form.Label> : null}
        <Form.Control
          type={props.type}
          placeholder={props.holder}
          value={props.value}
          onChange={props.onChange}
        />
      </Form.Group>
    </div>
  );
};

export default UI;
