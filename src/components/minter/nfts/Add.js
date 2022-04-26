/* eslint-disable react/jsx-filename-extension */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { uploadToIpfs } from "../../../utils/minter";

// basic attributes that can be added to NFT
// const METAL = ["Gold", "Pearl", "Brass", "Stainless steel", "Titanium"];
// const GLASS = ["Mineral Glass", "Plexi", "Sapphire"];
// const WATCH_MOVEMENT = ["Quartz", "Automatic", "Mechanical"]

const AddNfts = ({ save, address }) => {
  const [name, setName] = useState("");
  const [ipfsImage, setIpfsImage] = useState("");
  const [description, setDescription] = useState("");

  //store attributes of an NFT
  // const [attributes, setAttributes] = useState([]);
  const [show, setShow] = useState(false);


  // check if all form data has been filled
  const isFormFilled = () =>{
   return name && ipfsImage && description;
  }
      

  // close the popup modal
  const handleClose = () => {
    setShow(false);
    // setAttributes([]);
  };

  // display the popup modal
  const handleShow = () => setShow(true);

  // add an attribute to an NFT
  // const setAttributesFunc = (e, trait_type) => {
  //   const {value} = e.target;
  //   const attributeObject = {
  //     trait_type,
  //     value,
  //   };
  //   const arr = attributes;

  //   // check if attribute already exists
  //   const index = arr.findIndex((el) => el.trait_type === trait_type);

  //   if (index >= 0) {

  //     // update the existing attribute
  //     arr[index] = {
  //       trait_type,
  //       value,
  //     };
  //     setAttributes(arr);
  //     return;
  //   }

  //   // add a new attribute
  //   setAttributes((oldArray) => [...oldArray, attributeObject]);
  // };

  return (
    <>
      <Button
        onClick={handleShow}
        variant="dark"
        className="rounded-pill px-0"
        style={{ width: "38px" }}
      >
        <i className="bi bi-plus"></i>
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create NFT</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <FloatingLabel
              controlId="inputLocation"
              label="Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Name of NFT"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="inputDescription"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="description"
                style={{ height: "80px" }}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FloatingLabel>

            <Form.Control
              type="file"
              className={"mb-3"}
              onChange={async (e) => {
                const imageUrl = await uploadToIpfs(e);
                if (!imageUrl) {
                  alert("failed to upload image");
                  return;
                }
                setIpfsImage(imageUrl);
              }}
              placeholder="Product name"
            ></Form.Control>
            {/* <Form.Label>
              <h5>Properties</h5>
            </Form.Label>
            <Form.Control
              as="select"
              className={"mb-3"}
              onChange={async (e) => {
                setAttributesFunc(e, "materials");
              }}
              placeholder="Materials"
            >
              <option hidden>Materials</option>
              {METAL.map((metal) => (
                <option
                  key={`materials-${metal.toLowerCase()}`}
                  value={metal.toLowerCase()}
                >
                  {metal}
                </option>
              ))}
            </Form.Control>

            <Form.Control
              as="select"
              className={"mb-3"}
              onChange={async (e) => {
                setAttributesFunc(e, "movement");
              }}
              placeholder="Watch Movement"
            >
              <option hidden>Movement</option>
              {WATCH_MOVEMENT.map((movement) => (
                <option
                  key={`movement-${movement.toLowerCase()}`}
                  value={movement.toLowerCase()}
                >
                  {movement}
                </option>
              ))}
            </Form.Control>
            <Form.Control
              as="select"
              className={"mb-3"}
              onChange={async (e) => {
                setAttributesFunc(e, "glass");
              }}
              placeholder="Watch Glass"
            >
              <option hidden>Glass</option>
              {GLASS.map((glass) => (
                <option
                  key={`glass-${glass.toLowerCase()}`}
                  value={glass.toLowerCase()}
                >
                  {glass}
                </option>
              ))}
            </Form.Control> */}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="dark"
            disabled={!isFormFilled()}
            onClick={() => {
              save({
                name,
                ipfsImage,
                description,
                ownerAddress: address
              });
              handleClose();
            }}
            >
            Create NFT
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddNfts.propTypes = {

  // props passed into this component
  save: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
};

export default AddNfts;
