import React, { Component } from 'react';

import logo from './ui/assets/img/canvas_logos/Canvas/png/Canvas_color_web.png'

import credentials from '../auth/credentials.json'

class AuthIDInput extends Component {
  setOAuthKey = async () => {
    let newCreds = await document.getElementById('user-id-input').value

    credentials.canvas.access_token = await newCreds;
    console.log(credentials.canvas.access_token)
  }


  render() {
    return (
      <div className=""
        style={{ alignItems: 'center' }}>

        <img src={logo} alt="Canvas Logo missin" style={{ transform: 'scale(.5)' }}>
        </img>

        <div>
          <input placeholder="Input Access Token here!" id="user-id-input"
            type="text" name="Input oAuthKey"
          ></input>
          <input type="submit" onClick={() => this.setOAuthKey()}></input>
        </div>
      </div>
    );
  }
}

export default AuthIDInput