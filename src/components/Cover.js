import React from 'react';
import { Button } from "react-bootstrap";
import PropTypes from 'prop-types';

const myStyle={
  backgroundImage: 
  "url('https://i.ibb.co/rc7Yf20/smil.jpg')",
  height:'100vh',
  marginTop:'-70px',
  fontSize:'18px',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};
const Cover = ({ name, coverDescription,connect }) => {
  if (name) {
    return (
      <div
          className="text-center "
          style={myStyle}
        >

          <div className="mt-auto text-light mb-5">
            <div
              className=" ratio ratio-1x1 mx-auto mb-2"
              style={{ maxWidth: "320px" }}
            >
            </div>
            <h1>{name}</h1>
            <p>{coverDescription}</p>
            <br></br>
            <p>Please connect your wallet to continue.</p>
            <Button
              onClick={() => connect().catch((e) => console.log(e))}
              variant="outline-light"
              className="rounded-pill px-3 mt-3"
            >
              Connect Wallet
            </Button>
          </div>

          <p className="mt-auto text-dark">Powered by Celo</p>
        </div>
    );
  }

  return null;
};


Cover.propTypes = {
  // props passed into this component
  name: PropTypes.string,
};

Cover.defaultProps = {
  name: '',
};

export default Cover;
