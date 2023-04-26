import React, { useEffect, useState } from "react";

import "./view.css";

// importing Components
import {styled,Card, CardMedia, Box, CardContent} from "@mui/material"
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
// importing
import {DataArray} from "../data.js/data.js";



const MainCard = styled(Card)`
    height: 50vh;
    width: 80vw;
    display: flex;
    padding: 10px;
    background-color: rgba(99,99,98,0.5);
    margin-top: 20px;
`;

const Image = styled(CardMedia)`
    height: 100%;
    max-width: 45%;
    object-fit: fill;
    border-radius: 10px;
`;

const ImageContainer = styled(Box)`
    height: 25vh;
    width: 65vw;
    padding: 0px 40px;
    display: flex;
    align-items: center;
    gap: 5%;
    margin-top: 2vh;
    overflow-x: scroll;
    /* padding: 0px 10px; */
    border: 1px solid gray;

    &::-webkit-scrollbar{
        display: none;
    }

`; 

const SmallImages = styled('img')({
    height: '65%',
    width: '20%',
    cursor: "pointer",
    borderRadius: 10,
    objectFit: "fill",
    transition:"transform 0.6s ease-in-out",
    "&:hover":{
        transform:"scale(1.1)",
        zIndex: 2,
    },
    zIndex:1,
    filter:"grayscale(100%)",
});
  
const SameImg = styled(SmallImages)`
    border: 3px solid black;
    z-index: 2;
    box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.5);
    /* transition: transform 2s ease-in-out; */
    transform: scale(1.2);
    z-index: 2;
    filter:grayscale(0);
    animation: scaling 0.6s ease-in-out;

    @keyframes scaling {
        0%{
            transform: scale(1);
        }  
        
        100%{
            transform: scale(1.2);
        }
    }
`;

const Content = styled(CardContent)`
    overflow-y: scroll;
    &::-webkit-scrollbar{
        display: none;
    }
`;



function View(){

    const [istimerOn, setisTimerOn] = useState(false);
    
    // state of index of the array
    const [idx, setIdx] = useState(0);

    const [pic, setPic] = useState(DataArray[0]);

   
    // for the state of the pic being changed
    function SettingthePic(pic){
        setIdx(pic.id - 1);
        setPic(pic);
    }

    // on clicking right arrow
    function Forward(){
        if(idx === DataArray.length-1){
            setIdx(0);
            return;
        }else{
            setIdx((prevstate)=> prevstate + 1);
            return;
        }

    }

    // on clicking left arrow
    function Backward(){
        if(idx <= 0){
            setIdx(DataArray.length-1);
            return;
        }else{
            console.log("here")
            setIdx((prevstate)=> prevstate - 1);
            return;
        }
    }

    // everytime the idx changed the useEffect runs
    useEffect(()=>{
        setPic(DataArray[idx])
    }, [idx]);
    
    // for time controlled change
    useEffect(()=>{
        let timer;
        if(istimerOn){
            let index = idx;
            timer = setInterval(() => {
                index = index + 1;
                if(index === DataArray.length){
                    index = 0;
                }
                setIdx(index);
            }, 2000);
        }
        if(istimerOn === false){
            clearInterval(timer);
        }
        return ()=>{
            clearInterval(timer)
        }
    }, [istimerOn, idx])


    return(
        <Box className="mainbox" style={{padding: '10'}}>
            <MainCard className="maincard" >
                <Image 
                    component="img"
                    image={pic.image}
                    />
                <Content>
                    <h1 style={{textAlign:"center", marginBottom: 20}}>{pic.heading}</h1>
                    {pic.info}
                </Content>
            </MainCard>

            { istimerOn ?
                <PauseCircleIcon style={{marginLeft:"50%", fontSize:50, marginTop:20, cursor:"pointer"}} onClick={()=>setisTimerOn(false)}/>
                :
                <PlayCircleIcon style={{marginLeft:"50%", fontSize:50,  marginTop:20, cursor:"pointer"}} onClick={()=> setisTimerOn(true)}/>
            }
        
            <Box style={{display: "flex", alignItems:"center", gap:20}}>
                {/* left arrow */}
                <ArrowCircleLeftIcon style={{fontSize: 40, cursor:"pointer"}} onClick={Backward}/>

                <ImageContainer className="img-container">

                    {/* mapping over the data */}
                    {DataArray.map((info)=>{
                        return ( info === pic ?
                            <SameImg className="images" key={info.id} src={info.image} onClick={()=>SettingthePic(info)} />
                            :  
                            <SmallImages className="images" key={info.id} src={info.image} onClick={()=>SettingthePic(info)} />
                        )
                    }
                    )}
                </ImageContainer>

                {/* right arrow */}
                <ArrowCircleRightIcon style={{fontSize: 40, cursor:"pointer"}} onClick={Forward} />
            </Box>

        </Box>
    )
}

export default View;