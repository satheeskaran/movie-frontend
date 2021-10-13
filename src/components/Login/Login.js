
import React, {useState, useEffect} from 'react'
import '../Login.css'
import { NavLink, useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { UserDetail } from '../../store/actions/actions'
import Home from '../Pages/Home'
import LoginBG from '../../assets/c1xNqp.jpg'


const Login = () => {
    let history = useHistory()
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isRemember, setIsRemember] = useState(false)

    const [error, setError] = useState(false)
    const [top, setTop] = useState(0)

    const checkLogin = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        };
        fetch("http://localhost:8090/user/login", requestOptions)
        .then((res) => res.json())
        .then(result => {
                if(result.success == 0){
                    dispatch(UserDetail({
                        userid: result.userid,
                        username: result.username,
                        password: result.password,
                        isLogged: true,
                        isRememberPass: isRemember,
                        searchingTerm: ''
                    }))
                    history.push('/home')
                }
                else{
                    setError('username and password are incorrect')
                    setTop(1)
                }
            },
            (error) => {
                console.log(error)
            }
        )
    }

    const handleOnClick = () => {
        if(username == ''){
            setError('Please enter user name')
            setTop(1)
        }
        else if(password == ''){
            setError('Please enter password')
            setTop(1)
        }
        else{
            checkLogin()
        }
    }

    useEffect(() => {
         if(user.isRememberPass){
            setUsername(user.username)
            setPassword(user.password)
            setIsRemember(true)
        }
    }, [])

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
                                    <h2>Login to your account</h2>
                                    <p>Thank you for get back to Movies. Lets access our the best movie collections for you.</p>
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
                                        <div className="forgotWrap">
                                            <div className="checkBox">
                                                <input 
                                                    type="checkbox" 
                                                    id="remember" 
                                                    name="remember" 
                                                    value="remember"
                                                    checked={isRemember} 
                                                    onChange={() => setIsRemember(!isRemember)}
                                                />
                                                <label htmlFor="remember"> Remember</label>
                                            </div>
                                            <a className="forgotPass" href="">Forgot Password?</a>
                                        </div>
                                        <div className="forgotWrap">
                                            <input 
                                                className="loginBtn" 
                                                type="button" 
                                                value="Login"
                                                onClick={() => handleOnClick()}
                                            />
                                        </div>
                                        <div className="joinWrap">
                                            <p>Don't have an account yet?</p>
                                            <NavLink to="/register">Join Movies..</NavLink>
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

export default Login;