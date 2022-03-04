import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', showSubmitError: false, errorMsg: ''}

  onSubmitSuccuss = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
    console.log(jwtToken)
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    console.log(userId, pin)
    const userDetails = {user_id: userId, pin}
    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccuss(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangePassword = event => {
    this.setState({pin: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({userId: event.target.value})
  }

  renderPasswordField = () => {
    const {pin} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PIN
        </label>
        <input
          type="password"
          id="password"
          className="input-field"
          placeholder="pin"
          value={pin}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {userId} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          User ID
        </label>
        <input
          type="text"
          id="username"
          className="input-field"
          placeholder="UserId"
          value={userId}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
          alt="website login"
          className="login-image"
        />
        <div className="form-main-container">
          <h1>Welcome Back</h1>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
