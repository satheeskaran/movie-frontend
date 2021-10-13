import react from 'react'
import './Card.css'
import { FiPlus } from "react-icons/fi";
import { NavLink, useHistory  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

const AddCard = () => {
    const history = useHistory()
        return(
            <div className="cardContainer">
                <div className="card">
                    <div 
                        onClick={() => history.push({
                            pathname: '/addMovie',
                            type: 'add'
                        })}
                        className="addBtn">
                            <FiPlus style={{color: 'rgba(255,255,255,0.7)'}} size={60}/>
                            <p>Add New Movie</p>
                    </div>
                    <div className="card-header">
                        <img src="https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg" alt="rover" />
                    </div>
                    <div className="card-body">
                        <div className="title">test</div>
                        <div className="tag tag-teal">test</div>
                        <p style={{WebkitBoxOrient: 'vertical', WebkitLineClamp: 3}} className="description">test</p>
                    </div>
                </div>
            </div>
        )
}

export default AddCard