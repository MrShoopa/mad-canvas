import React, { Component } from 'react';
import axios from 'axios'

import logo from './ui/assets/img/canvas_logos/Canvas/png/Canvas_color_web.png'

class AuthButton extends Component {
  canvasAuth = () => {
    axios.get(
      `https://canvas.uw.edu/login/oauth2/auth?client_id=666&response_type=101&state=YYY&redirect_uri=https://google.com`
    )
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
      <div className="" onClick={() => this.canvasAuth()}
        style={{ display: 'inline-flex', alignItems: 'center' }}>
        <img src={logo} alt="Canvas Logo missin" style={{ transform: 'scale(.5)' }}>
        </img>
        <p>Log in!</p>
      </div>
    );
  }
}

export default AuthButton