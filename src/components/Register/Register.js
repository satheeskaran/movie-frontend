
import React, {useState, useEffect} from 'react'
import '../Login.css'
import LoginBG from '../../assets/c1xNqp.jpg';
import { NavLink, useHistory  } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { useDispatch, useSelector } from 'react-redux'
import { UserDetail } from '../../store/actions/actions'

const Register = () => {
    let history = useHistory()
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ConPassword, setConPassword] = useState('')
    const [isAgree, setIsAgree] = useState(false)

    const [error, setError] = useState(false)
    const [top, setTop] = useState(0)

    const Register = () => {
        let userid = uuidv4()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: username,
                password: password,
                userid: userid
            })
        };
        fetch("http://localhost:8090/user/add", requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
                if(result.success == 1){
                    dispatch(UserDetail({
                        userid: result.userid,
                        username: username,
                        password: password,
                        isLogged: true,
                        isRememberPass: false,
                        searchingTerm: ''
                    }))

                    setError('')
                    setTop(0)
                    setUsername('')
                    setPassword('')
                    setConPassword('')
                    history.push('/home')
                }
                else{
                    setError('username already exist')
                    setTop(1)
                }
            },
            (error) => {
                console.log(error)
            }
        )
    }

    const handleOnClick = () => {
        if(username === ''){
            setError('Please enter user name')
            setTop(1)
        }
        else if(password === ''){
            setError('Please enter password')
            setTop(1)
        }
        else if(ConPassword === ''){
            setError('Please enter confirm password')
            setTop(1)
        }
        else if(ConPassword != password){
            setError('Passwords are does not match. Please check it')
            setTop(1)
        }
        else if(!isAgree){
            setError('Please agree to all the term and privacy policy')
            setTop(1)
        }
        else{
            Register()
        }
    }

    return(
        <div className="content">
            <div className="mb-backImage">
                <div className="overlay"></div>
                <img className="backImage" src={LoginBG} />
            </div>
            <div className="container">
                <div className="row">
                    <div className="login">
                        <div className="loginWrap">
                            <div className="imageContainer">
                                <div className="overlay"></div>
                                <div className="overlayContent">
                                    <h1><span className="logo-m">M</span>ovies...</h1>
                                    <p>The best movie collections for you</p>
                                </div>
                                <img className="backImage" src={LoginBG} />                    
                            </div>
                            <div className="loginContainer">
                                <div className="error" style={{transform: `scaleY(${top})`}}>
                                    <p>{error}</p>
                                    <a className="close" onClick={() => setTop(0)}>+</a>
                                </div>
                                <div className="header">
                                    <h1><span className="logo-m">M</span>ovies...</h1>
                                </div>
                                <div className="loginContent">
                                    <h2>Create new account</h2>
                                    <p>Let's get your all set up so you can verify your personal account and begin setting up your profile</p>
                                    <div className="sa-form">
                                        <div className="formWrap">
                                            <div className="formLable">User name</div>
                                            <div className="formControlWrap">
                                                <input 
                                                    className="formControl"
                                                    type="text"
                                                    value={username}
                                                    onChange={(event) => setUsername(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="registerForm">
                                            <div className="formWrap">
                                                <div className="formLable">Password</div>
                                                <div className="formControlWrap">
                                                    <input 
                                                        className="formControl"
                                                        type="Password" 
                                                        value={password}
                                                        onChange={(event) => setPassword(event.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="formWrap">
                                                <div className="formLable">Confirm Password</div>
                                                <div className="formControlWrap">
                                                    <input 
                                                        className="formControl"
                                                        type="Password" 
                                                        value={ConPassword}
                                                        onChange={(event) => setConPassword(event.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="forgotWrap">
                                            <div className="checkBox">
                                                <input 
                                                    type="checkbox" 
                                                    id="term" 
                                                    name="term" 
                                                    value="term"
                                                    checked={isAgree} 
                                                    onChange={() => setIsAgree(!isAgree)}
                                                />
                                                <label htmlFor="remember">I agree to all the <NavLink to="#">Term and Privacy Policy</NavLink></label>
                                            </div>
                                        </div>
                                        <div className="forgotWrap">
                                            <input 
                                                className="loginBtn" 
                                                type="button" 
                                                value="Create Account"
                                                onClick={() => handleOnClick()}
                                            />
                                        </div>
                                        <div className="joinWrap">
                                            <p>Already have an account?</p>
                                            <NavLink to="/login">Login the Movies..</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;