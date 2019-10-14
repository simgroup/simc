import React, { Component } from 'react';
// First way to import
import { BounceLoader } from 'react-spinners';

const Loader = (props) => {
    return (
        <div className = "loader">
           <BounceLoader
        //   css={override}
          sizeUnit={"px"}
          size={100}
          color={'#763ed0'}
          loading={true}
        />
        </div>
    )
}
export default Loader;