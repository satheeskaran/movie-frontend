import React, { useState, useEffect } from 'react'
import './Movie.css'
import { Toast } from 'react-lite-toast'
import 'react-lite-toast/dist/index.css'
import { useLocation, Redirect, useHistory } from "react-router-dom"
import { useSelector } from 'react-redux'

const AddMovie = () => {
    const [image, setImage] = useState({})
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [length, setLength] = useState('')
    const [description, setDescription] = useState('')
    const [year, setYear] = useState('')

    const user = useSelector(state => state.user)

    const [toast, setToast] = useState(false)
    const location = useLocation()
    const history = useHistory()

    const handleOnClickAdd = () => {
        if(id == '' || title == '' || year == '' || length == '' || category == '' || image.selectedFile == '' || image.selectedFile == null){

        }
        else{
            addMovie()
        }
    }

    const handleOnClickUpdate = () => {
        if(id == '' || title == '' || year == '' || length == '' || category == '' || image.selectedFile == '' || image.selectedFile == null){
            
        }
        else{
            updateMovie()
        }
    }

    const onFileChangeHandler = (e) => {
        setImage({selectedFile: e.target.files[0].name})
    };

    const addMovie = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                title: title,
                category: category,
                year: year,
                description: description,
                image: image.selectedFile,
                length: length
            })
        };
        fetch("http://localhost:8090/movie/addMovie", requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
                if(result.success == 1){
                    history.push('/home')
                }
            },
            (error) => {
                console.log(error)
            }
        )
    }

    const updateMovie = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                id: id,
                title: title,
                category: category,
                year: year,
                description: description,
                image: image.selectedFile,
                length: length
            })
        };
        fetch("http://localhost:8090/movie/updateMovie", requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
                if(result.success == 1){
                    history.push('/home')
                }
            },
            (error) => {
                console.log(error)
            }
        )
    }

    const getMovie = (id) => {
        fetch("http://localhost:8090/movie/getMovie/" + id)
        .then(res => res.json())
        .then(
            (result) => {
                setId(id)
                setTitle(result.title)
                setCategory(result.category)
                setLength(result.length)
                setYear(result.year)
                setDescription(result.description)
                setImage({selectedFile: result.image})
            },
            (error) => {
                console.log(error)
            }
        )
    }

    useEffect(() => {
        setId(location.type == 'add' ? 'new id' : '')
        if(location.type == 'edit'){
            getMovie(location.id)
        }
    }, [])

    if(location.type != null){
        return(
                <section className="addMovieContent" style={{paddingTop: 20}}>
                    <div className="container">
                        <div className="row">
                            <div className="movieWrap">
                                {location.type == 'add' ? (<h1>Add new movie</h1>) : (<h1>Edit movie</h1>)}
                                <div className="form">
                                    <div className="flex-row">
                                        <div className="formWrap">
                                            <div className="formLable">Movie Id</div>
                                            <div className="formControlWrap">
                                                <input 
                                                    className="formControl disable"
                                                    type="text"
                                                    disabled
                                                    value={id}
                                                    onChange={(event) => setId(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="formWrap">
                                            <div className="formLable">Title</div>
                                            <div className="formControlWrap">
                                                <input 
                                                    className="formControl"
                                                    type="text"
                                                    value={title}
                                                    onChange={(event) => setTitle(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="formWrap">
                                            <div className="formLable">Category</div>
                                            <div className="formControlWrap">
                                                <input 
                                                    className="formControl"
                                                    type="text"
                                                    value={category}
                                                    onChange={(event) => setCategory(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="formWrap">
                                            <div className="formLable">length (min)</div>
                                            <div className="formControlWrap">
                                                <input 
                                                    className="formControl"
                                                    type="text"
                                                    value={length}
                                                    onChange={(event) => setLength(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="formWrap">
                                            <div className="formLable">Description</div>
                                            <div className="formControlWrap">
                                                <input 
                                                    className="formControl"
                                                    type="text"
                                                    value={description}
                                                    onChange={(event) => setDescription(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="formWrap">
                                            <div className="formLable">Year</div>
                                            <div className="formControlWrap">
                                                <input 
                                                    className="formControl"
                                                    type="text"
                                                    value={year}
                                                    onChange={(event) => setYear(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="formWrap">
                                            <div className="formLable">Movie Id</div>
                                            <div className="formControlWrap">
                                                <input 
                                                    type="file"
                                                    className="formControl" 
                                                    name="file" 
                                                    onChange={(e) => onFileChangeHandler(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="formWrap">
                                            <div className="formLable" style={{color: '#ffffff'}}>Button</div>
                                            <div className="formControlWrap">
                                            {location.type == 'add' ? (
                                                <input 
                                                    className="loginBtn"
                                                    type="button"
                                                    value="Add new movie"
                                                    onClick={() => handleOnClickAdd()}
                                                />
                                            ) : (
                                                <input 
                                                    className="loginBtn"
                                                    type="button"
                                                    value="Update movie"
                                                    onClick={() => handleOnClickUpdate()}
                                                />
                                            )}
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        )
    }
    else{
        return(
             <Redirect to="/home"/>
        )
    }
    
}

export default AddMovie