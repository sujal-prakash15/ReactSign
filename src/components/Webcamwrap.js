import Webcam from "react-webcam";
import React from "react";
import {Fragment, useState,useRef} from 'react';
// import * as tf from "@tensorflow/tfjs";
// import { nextFrame } from "@tensorflow/tfjs";
// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";
// import {drawRect} from "./utilities"; 

const Webwrap=(props)=>{
    const webcamRef=useRef(null);
    const[isLoading,setIsLoading]=useState(true);
    const canvasRef = useRef(null);
    const mediaHandler=()=>{
        setTimeout(()=>setIsLoading(false),1_000);
      }
      let content=`Text\ Prediction\ here...`
      if(isLoading){
        content=`Webcam\ Is\ Loading...`
      }
      

      // // Main function
      // const runCoco = async () => {
      //   // 3. TODO - Load network 
      //   // e.g. const net = await cocossd.load();
      //   // https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json
      //   const net = await tf.loadGraphModel('https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json')
        
      //   //  Loop and detect hands
      //   setInterval(() => {
      //     detect(net);
      //   }, 16.7);
      // };
    
      // const detect = async (net) => {
      //   // Check data is available
      //   if (
      //     typeof webcamRef.current !== "undefined" &&
      //     webcamRef.current !== null &&
      //     webcamRef.current.video.readyState === 4
      //   ) {
      //     // Get Video Properties
      //     const video = webcamRef.current.video;
      //     const videoWidth = webcamRef.current.video.videoWidth;
      //     const videoHeight = webcamRef.current.video.videoHeight;
    
      //     // Set video width
      //     webcamRef.current.video.width = videoWidth;
      //     webcamRef.current.video.height = videoHeight;
    
      //     // Set canvas height and width
      //     canvasRef.current.width = videoWidth;
      //     canvasRef.current.height = videoHeight;
    
      //     // 4. TODO - Make Detections
      //     const img = tf.browser.fromPixels(video)
      //     const resized = tf.image.resizeBilinear(img, [640,480])
      //     const casted = resized.cast('int32')
      //     const expanded = casted.expandDims(0)
      //     const obj = await net.executeAsync(expanded)
      //     console.log(obj)
    
      //     const boxes = await obj[1].array()
      //     const classes = await obj[2].array()
      //     const scores = await obj[4].array()
          
      //     // Draw mesh
      //     const ctx = canvasRef.current.getContext("2d");
    
      //     // 5. TODO - Update drawing utility
      //     // drawSomething(obj, ctx)  
      //     requestAnimationFrame(()=>{drawRect(boxes[0], classes[0], scores[0], 0.8, videoWidth, videoHeight, ctx)}); 
    
      //     tf.dispose(img)
      //     tf.dispose(resized)
      //     tf.dispose(casted)
      //     tf.dispose(expanded)
      //     tf.dispose(obj)
    
      //   }
      // };
    
      // useEffect(()=>{runCoco()},[]);
    
    return(<Fragment>
        <span className="content">{content}
        <a onClick={props.Change}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="sv" viewBox="0 0 60 50" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" /></svg>
        </a>
        </span>
        <span>
      <Webcam ref={webcamRef} muted={true} className="wbcam" onUserMedia={mediaHandler}
    style={{position: "relative",float:"right",left: 0,right: 0, textAlign: "center", width:1200,height: 720,}}/>
        </span>
        </Fragment>)
}
export default Webwrap;