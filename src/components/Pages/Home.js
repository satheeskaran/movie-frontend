import React, { useState, useEffect } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import AddCard from '../MovieCard/AddCard'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, Redirect } from 'react-router-dom'

const Home = () => {
    const user = useSelector(state => state.user)

    const [moviesData, setMoviesData] = useState([])
    const [filterData, setFilterData] = useState([])

    const getMovies = () => {
        fetch("http://localhost:8090/movie/getAllMovies")
        .then(res => res.json())
        .then(
            (result) => {
                setMoviesData(result)
                setFilterData(result)
            },
            (error) => {
                console.log(error)
            }
        )
    }

    const handleOnDelete = (id) => {
        fetch("http://localhost:8090/movie/deleteMovie/" + id)
        .then(res => res.json())
        .then(
            (result) => {
                if(result.success == 1){
                    getMovies()
                }
            },
            (error) => {
                console.log(error)
            }
        )
    }

    useEffect(() => {
        getMovies()
    }, [])



    useEffect(() => {
        if(user.searchingTerm != ''){
            let filtered = moviesData.filter(item => item.title.indexOf(user.searchingTerm) > -1);
            setFilterData(filtered)
        }
        else{
            setFilterData(moviesData)
        }
    }, [user.searchingTerm])

    return(
        <section className="homeContent" style={{paddingTop: 20}}>
            <div className="container">
                <div className="row">
                    <div className="cardWrap">
                        {user.searchingTerm == '' && (<AddCard/>)}
                        {filterData.map(item => 
                            <MovieCard key={item.id} data={item} handleDelete={handleOnDelete}/>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home