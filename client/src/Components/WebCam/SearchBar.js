// import React from 'react'
// import ReactDOM from 'react-dom'


// const posenet = require('@tensorflow-models/posenet');

// export const singlePose =()=>{async function estimatePoseOnImage(imageElement) {
//   // load the posenet model from a checkpoint
//   const net = await posenet.load();

//   const pose = await net.estimateSinglePose(imageElement, {
//     flipHorizontal: false
//   });
//   return pose;
// }

// const imageElement = document.getElementById('cat');

// const pose = estimatePoseOnImage(imageElement);
// console.log("hello" + pose);
// return pose
// }


import './App.css';
import ReactDOM from 'react-dom';
import React, {useRef} from 'react';
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";
const bodyPose = null;
function WebcamPose() {

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  
  

  // load posenet
  const runPosenet = async () =>{
    const net = await posenet.load({
      inputResolution:{width: 340, height:240},
      scale:0.2
    })
    // setInterval
   
    const capture = (() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);
    
    setInterval(()=>{
        detect(net)

        // .current.getScreenshot();
  
    }, 100)
    
    
  }

  //start detecting 
  const detect = async(net) =>{
    if(typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState ===4) {
      
      // get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // set video with
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;


      // make the detection
      const pose = await net.estimateSinglePose(video);
      
      // bodyPose = pose["keypoints"][5]["position"]["x"] - pose["keypoints"][6]["position"]["x"]
      // drawCanvas(pose, video, videoWidth, videoHeight, canvasRef)
      
      // const yFrame = pose["keypoints"][2]["position"]["y"] + pose["keypoints"][6]["position"]["y"]

      const xCounter = 4
      // const xAvg = 0
      const xFrame = pose["keypoints"][5]["position"]["x"] - pose["keypoints"][6]["position"]["x"]
      
      
      console.log(xFrame)
      

       
  
  
          // console.log("Good")
          // console.log(pose)
        
      
      }
    
  }

  // const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
  //   const ctx = canvas.current.getContext("2d");
  //   canvas.current.width = videoWidth;
  //   canvas.current.height = videoHeight;

  //   drawKeypoints(pose["keypoints"], 0.6, ctx);
  //   drawSkeleton(pose["keypoints"], 0.7, ctx);

  // };

  runPosenet()
  // function myStopFunction(){
  //   clearInterval(runPosenet())
  // }
  // myStopFunction()
  // setInterval(runPosenet(), 10000)
  return (
    <>
         
          <Webcam 
            ref = {webcamRef}
            style = {{
              position: "absolute",
              marginRight: "auto",
              marginLeft: "auto",
              
              left: "0",
              right: "0",
              textAlign: "center",
              zIndex:9,
              width: 380,
              height: 240
              
            }
          } audio={false} screenshotFormat="image/jpeg"
          />
          {/* <canvas 
          ref = {canvasRef}
          style ={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: "0",
            right: "0",
            textAlign: "center",
           
            zIndex:9,
            width: 380,
            height: 240
          }} 
          /> */}
    </>
   
  );
}


export default WebcamPose;
