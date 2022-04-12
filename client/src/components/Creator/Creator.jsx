import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres, postGame, getAllPlatforms } from "../../actions";
import Style from "./Creator.module.css";

export default function Creator() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const genres = useSelector((state) => state.genres);
    const platforms = useSelector((state) => state.platforms);
    const [input, setInput] = useState({
        name: '',
        description: '',
        released: '',
        rating: '',
        image: '',
        genres: [],
        platforms: [],
    });

    useEffect(() => {
        dispatch(getAllGenres());
        dispatch(getAllPlatforms());
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        setErrors(validationForm({
            ...input,
            [e.target.name]: e.target.value,
        }))
        console.log(input)
    }

    function handleSelect(e) {
        setInput({
            ...input,
            [e.target.name]: [...input[e.target.name], e.target.value],
        })
        setErrors(validationForm({
            ...input,
            [e.target.name]: e.target.value
        })
        )
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input);
        dispatch(postGame(input));
        alert('Game added');
        setInput({
            name: '',
            description: '',
            released: '',
            rating: '',
            image: '',
            genres: [],
            platforms: [],
        })
        history.push('/home');
    }

    function handleDeleteGenres(e){
        setInput({
            ...input,
            genres: input.genres.filter(genre => genre !== e.target.value)
        })
    }

    function handleDeletePlatforms(e){
        setInput({
            ...input,
            platforms: input.platforms.filter(platform => platform !== e.target.value)
        })
    }
    

const url = (url) => {
  // Función para validar la url
  try {
    new URL(url);
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
};

function validationForm(input) {
  // Función para validar el formulario
  var errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  } else if (input.name.length < 100) {
    errors.name = "Name must be at least 100 characters";
  }

  if (!input.description) {
    errors.description = "Description is required";
  } else if (input.description.length < 1000) {
    errors.description = "Description must be at least 1000 characters";
  }

  if (!input.rating) {
    errors.rating = "Rating is required";
  } else if (input.rating < 0 || input.rating > 5) {
    errors.rating = "Rating must be between 0 and 5";
  }

  if (!input.released) {
    errors.released = "Released is required";
  } else if (input.released.length < 10) {
    errors.released = "Released must be 00-00-0000";
  }

  if (!input.image) {
    errors.image = "Image is required";
  } else if (!url(input.image)) {
    errors.image = "Image must be a valid URL";
  }

  if (!input.genres[0]) {
    errors.genres = "Genres is required";
  }

  if (!input.platforms[0]) {
    errors.platforms = "Platforms is required";
  }
  return errors;
}

return(
    <div className={Style.background}>
        <div className={Style.div1}>
            <div className={Style.div2}>
                <Link className={Style.link} to="/home">
                    <button className={Style.button}>⏪</button>
                </Link>
            </div>
        </div>

        <div className={Style.div2}>
            <div className={Style.header}>
                <div className={Style.header2}>Create a new video game</div>
            </div>
        </div>

        <div className={Style.div1}>
            <form className={Style.form} onSubmit={handleSubmit}>
                <label className={Style.label}>Name:</label>
                <input className={Style.input && errors.name && 'danger'} type='text' value={input.name} name='name' onChange={e=>handleChange(e)}/>
                {errors.name && (<div className={Style.divError}>{errors.name}</div>)} 

                <label className={Style.label}>Description:</label>
                <input className={Style.input2 && errors.description && 'danger'} type='text' value={input.description} name='description' onChange={e=>handleChange(e)}/>
                {errors.description && (<div className={Style.divError}>{errors.description}</div>)}

                <div className={Style.div3}>
                    <div className={Style.div4}>
                    <label className={Style.label}>Rating:</label>
                    <input className={Style.input3 && errors.rating && 'danger'} type='number'
                    step='0.1' value={input.rating} name='rating' onChange={e=>handleChange=(e)}/>
                    {errors.rating && (<div className={Style.divError}>{errors.rating}</div>)}
                    </div>

                    <div className={Style.div4}>
                    <label className={Style.label}>Released:</label>
                        <input className={Style.input3 && errors.released && 'danger'} type='date' value={input.released} name='released' onChange={e=>handleChange(e)}/>
                        {errors.released && (<div className={Style.divError}>{errors.released}</div>)}
                    </div>
                </div>

                <label className={Style.label}>Image:</label>
                <input className={Style.input && errors.image && 'danger'} type='text' value={input.image} name='image' onChange={e=>handleChange(e)}/>
                {errors.image && (<div className={Style.divError}>{errors.image}</div>)}

                <label className={Style.label}>Genres:</label>
                <select className={Style.select && errors.genres && 'danger'} name='genres' onChange={e=>handleSelect(e)}>
                    <option hidden value='selected'>Select a genre</option>
                    {genres?.map(genre => (
                        <option key={genre.id} value={genre.name} >{genre.name}</option>
                    ))}
                </select>
                <div>
                    {errors.genres && (<div className={Style.divError}>{errors.genres}</div>)}
                </div>
                <div className={Style.div5}>
                    {input.genres.map(genre=>
                    <div className={Style.div6} key={genre}>
                        <div>{genre}</div>
                        <button className={Style.button2} onClick={()=>handleDeleteGenres(genre)}>X</button>
                    </div>)}
                </div>

                <label className={Style.label}>Platforms:</label>
                <select className={Style.select && errors.platforms && 'danger'} name='platforms' onChange={e=>handleSelect(e)}>
                    <option hidden value='selected'>Select a platform</option>
                    {platforms?.map(platform => (
                        <option key={platform.id} value={platform.name} >{platform.name}</option>
                    ))}
                </select>
                <div>{errors.platforms && (<div className={Style.divError}>{errors.platforms}</div>)}</div>
                <div className={Style.div5}>
                    {input.platforms.map(platforms=>
                    <div className={Style.div6} key={platforms}>
                        <div>{platforms}</div>
                        <button className={Style.button2} onClick={()=>handleDeletePlatforms(platforms)}>X</button>
                    </div>)}
                </div>

                <button className={Style.button3} disabled={input.name === '' || errors.name ||
                                                           input.description === '' || errors.description ||
                                                           input.rating === '' || errors.rating ||
                                                           input.released === '' || errors.released ||
                                                           input.image === '' || errors.image ||
                                                           input.genres[0] === '' || errors.genres ||
                                                           input.platforms[0] === '' || errors.platforms} type='submit'>Create</button>
            </form>

        </div>
        <img src="Añadir una imagen" alt=""/>

    </div>
)

}
// ⮨