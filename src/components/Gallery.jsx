import React, { useEffect, useState } from 'react'
import "../App.css"
import { useNavigate } from "react-router-dom";
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

function Gallery() {
    let navigate = useNavigate();

    let images;
    const initStorage = JSON.parse(localStorage.getItem("photos") || [])
    const [local, setLocal] = useState(initStorage)
    
    if(local.length !== 0){
        images = local;
    }
    
    const deleteStorage = (key,data) => {
        const updatedImages =  local.filter(i => data.id !== i.id)
        setLocal([...updatedImages])
    }
    useEffect(() => {
        localStorage.setItem('photos', JSON.stringify(local))
    },[local])

return (
    
    <div className='Gallery'>
        
        <h1>Photo Gallery</h1>
        <div className="backButton__Container">
        <ArrowBackRoundedIcon style={{fontSize: 40,color:"hotpink",cursor:"pointer"}} onClick={() => {navigate("/")}}/>
        <h2 onClick={() => {navigate("/")}}>BACK</h2>
        </div>
        <div className='picture__Grid' >
        {local.length > 0 ?
        
        images.map((image,index) => (
            
            <div className="picture__box" key={index}>
            <div className="image__container">
            
            <div className="deleteButton__Container">
                <HighlightOffTwoToneIcon style={{ fontSize:40,color: 'hotpink', cursor:'pointer' }} onClick={() => deleteStorage(index,image)}/>
                </div>
                
            <img  src={image.src} alt=""/>
            </div>
        </div>
        ))
            : <h3>Take some photos!</h3>
        }
        </div>
    </div>
)
}

export default Gallery