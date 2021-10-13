import React, {useState, useEffect} from 'react'
import './TopBar.css'
import { FiSearch, FiChevronDown, FiUser, FiMenu, FiXCircle, FiLogOut } from "react-icons/fi";
import { NavLink, useHistory, Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import { Searching, Logout } from '../../store/actions/actions'

const TopBar = () => {
    const [showSearch, setShowSearch] = useState('none')
    const [term, setTerm] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()

    const handleOnChange = (text) => {
        history.push('/home')
        setTerm(text)
        dispatch(Searching(text))
    }

    const MobileSearch = () => {
        return(
            <div className="mb-search" style={{display: `${showSearch}`}}>
                <div id="mydiv" className="search-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="input-group">
                                <input 
                                    /* value={term}  */
                                    id="tag" 
                                    type="text" 
                                    className="formControl" 
                                    /* onChange={(event) => handleOnChange(event.target.value)} */
                                />
                                <FiXCircle onClick={() => setShowSearch('none')} className="close" size={22}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <>
            <div className="top">
                <div className="container">
                    <div className="row">
                        <div className="saNav">
                            <div className="menuContainer">
                                <div className="logo">
                                    <NavLink to="/home"><h1><span className="logo-m">M</span>ovies...</h1></NavLink>
                                </div>
                            </div>
                            <div className="searchContainer">
                                <div className="searchWrap">
                                    <FiSearch className="searchIcon" size={25} />
                                    <input 
                                        className="formControl" 
                                        id="search" 
                                        type="text" 
                                        onChange={(event) => handleOnChange(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div 
                                onClick={() => dispatch(Logout())}
                                className="accountWrap">
                                    <FiLogOut style={{color: '#cd0000'}} size={18}/>
                                    <h2>Logout</h2>
                            </div>
                            <div className="mb-sideIcon">
                                <FiSearch onClick={() => setShowSearch('block')} className="searchIcon" size={24} />
                                <div 
                                    onClick={() => dispatch(Logout())}
                                    className="logout">
                                        <FiLogOut style={{color: '#cd0000'}} size={18}/>
                                        <h2>Logout</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MobileSearch/>
        </>
    )
}

export default TopBar