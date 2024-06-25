import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props)=> {
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const email = event.target.loginEmail.value;
    const password = event.target.loginPassword.value;
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
    alert('Login information saved');
  }

 const handleSignupSubmit = (event) => {
    event.preventDefault();
    const email = event.target.signupEmail.value;
    const password = event.target.signupPassword.value;
    const confirmPassword = event.target.signupConfirmPassword.value;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    localStorage.setItem('signupEmail', email);
    localStorage.setItem('signupPassword', password);
    alert('Signup information saved');
  }

    return (
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">NewsApp</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/general">General</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/business">Business</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/entertainment">Entertainment</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/health">Health</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/science">Science</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sports">Sports</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/technology">Technology</Link>
                </li>
              
              </ul>
              <div className="d-flex">
                <form className="d-flex me-2">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-success" type="submit">Search</button>
                  
                </form>
                <button type="button" className="btn btn-outline-light me-2" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
                <button type="button" className="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#signupModal">Signup</button>
                
              </div>
            </div>
          </div>
        </nav>

        {/* Login Modal */}
        <div className="modal fade bg-dark" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-primary">
                <h5 className="modal-title" id="loginModalLabel"><h3>Login</h3></h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleLoginSubmit}>
                  <div className="mb-3">
                    <label htmlFor="loginEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="loginEmail" name="loginEmail" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="loginPassword" name="loginPassword" />
                  </div>
                  <button type="submit" className="btn btn-primary">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Signup Modal */}
        <div className="modal fade bg-dark" id="signupModal" tabIndex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-primary">
                <h5 className="modal-title" id="signupModalLabel">Signup</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSignupSubmit}>
                  <div className="mb-3">
                    <label htmlFor="signupEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="signupEmail" name="signupEmail" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="signupPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="signupPassword" name="signupPassword" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="signupConfirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="signupConfirmPassword" name="signupConfirmPassword" />
                  </div>
                  <button type="submit" className="btn btn-primary">Signup</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


export default Navbar;
