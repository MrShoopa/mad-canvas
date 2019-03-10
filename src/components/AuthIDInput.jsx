import React, { Component } from 'react';

import logo from './ui/assets/img/canvas_logos/Canvas/png/Canvas_color_web.png'

import credentials from '../auth/credentials.json'

class AuthIDInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      keySet: false
    }
  }
  setOAuthKey = async () => {
    let newCreds = await document.getElementById('user-id-input').value

    credentials.canvas.access_token = await newCreds;
    console.log(credentials.canvas.access_token)

    await this.setState({ keySet: true });

    await this.props.onClick()
  }


  checkInput = () => {
    if (credentials.canvas.access_token !== "")
      return true
    else
      return false;
  }

  render() {
    return (
      <div className=""
        style={{ alignItems: 'center' }}>

        <img src={logo} alt="Canvas Logo" style={{ transform: 'scale(.5)' }}>
        </img>

        <div>
          <label for="user-id-input">Access Token: </label>
          <input placeholder={credentials.canvas.access_token_sample} id="user-id-input"
            type="text" name="Input oAuthKey"
          ></input>
          <input type="submit" onClick={() => this.setOAuthKey()}></input>
        </div>
      </div>
    );
  }
}

export default AuthIDInput