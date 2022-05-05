import React, { Component } from 'react'

import Video from '../assets/images/banner.mp4'
import Logo from '../assets/images/logo.png'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

class Form extends Component {

  state = {
    name: '',
    email: '',
    phone: '',
    best_time: '',
    message: '',
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    if (!this.refs.form.checkValidity()) return false

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": this.refs.form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => this.setState({result: 'success'}))
      .catch(error => this.setState({result: 'fail', msg: error}))
  }

  render() {
    let props = {
      ref: 'form',
      name: 'contact',
      className: 'form',
      onSubmit: this.handleSubmit,
      'data-netlify': 'true',
      'data-netlify-honeypot': 'bot-field',
    }

    if (this.state.result === 'success')
      return (
        <div className='contact-form__success'>
          <h4>Confirmation</h4>
          <p>Thanks your message has been sent.</p>
        </div>
      )

    return (
      <form {...props}>
        <p>P.O. Box 200<br>
          Doreen 3754 <br />
        <p>
          03 8600 9995 <br>
          paul@chwyla.com.au<br /></p>
        
        <div className='form__row'>
          <input type='text' name='first_name' placeholder='First Name' onChange={this.handleChange} required />
        </div>
        <div className='form__row'>
          <input type='text' name='last_name' placeholder='Last Name' onChange={this.handleChange} required />
        </div>
        <div className='form__row'>
          <input type='email' name='email' placeholder='Email' onChange={this.handleChange} required  />
        </div>
        <div className='form__row'>
          <input type='text' name='phone' placeholder='Phone' onChange={this.handleChange} required  />
        </div>
        <div className='form__row form__row--select'>
          <select name='id_like_to' onChange={this.handleChange}>
            <option>I'd like to</option>
            <option value='Make appointment at display'>Make appointment at display</option>
            <option value='Have a conversation'>Have a conversation</option>
          </select>
        </div>
        <div className='form__row form__row--submit'>
          <button type='submit'>Submit</button>
        </div>
      </form>
    )
  }
}

class VideoBanner extends Component {

  state = {
    formActive: false
  }

  _toggleForm() {
    let { formActive } = this.state
    this.setState({ formActive: !formActive })
  }

  _closeForm() {
    this.setState({ formActive: false })
  }

  render() {

    let { formActive } = this.state

    return(
      <>
        <div className="video-banner">
          <div className="video-banner__inner">
            <video autoplay="autoplay" muted="muted" playsinline="playsinline" loop="loop" src={Video}></video>
            <div className="content">
              <img className="image-first" src={Logo} alt="Chwyla"/>
            </div>
            <div className="text-first">
            <button className='btn' href="www.realestate.com.au">View Listing</button>
              <button className='btn' onClick={() => this._toggleForm()}>Contact</button>

              
            </div>
          </div>
        </div>
        <div className={`contact-form ${formActive ? 'active' : ''}`}>
          <div className='contact-form__inner'>
            <span className='contact-form__close' onClick={e => this._toggleForm()}>Close</span>
            <Form />
          </div>
        </div>
      </>
    )
  }
}

export default VideoBanner
