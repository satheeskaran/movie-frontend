import react from 'react'
import './Card.css'
import { FiTrash2 } from "react-icons/fi";
import { NavLink, useHistory  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

const MovieCard = ({data, handleDelete}) => {
    const history = useHistory()

    return(
        <div className="cardContainer">
            <div className="card">
                <div 
                    className="card-header"
                    onClick={() => history.push({
                        pathname: '/addMovie',
                        type: 'edit',
                        id: data.id
                    })}
                >
                    <img src={window.location.origin + '/img/' + data.image} alt="rover" />
                </div>
                <div className="card-body">
                    <div className="title">{data.title}</div>
                    <div className="tag tag-teal">{data.length} min</div>
                    <p style={{WebkitBoxOrient: 'vertical', WebkitLineClamp: 3}} className="description">{data.description}</p>
                    <div className="deleteIcon" onClick={() => handleDelete(data.id)}>
                        <FiTrash2  size={22}/>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default MovieCard