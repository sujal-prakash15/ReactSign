import Webcam from "react-webcam";
import React from "react";
import {Fragment, useState,useRef,useEffect} from 'react';
import * as tf from '@tensorflow/tfjs';
import {loadGraphModel} from '@tensorflow/tfjs-converter';
// const url = {
//   model: 'https://realtimesignlang.s3.ap-south-1.amazonaws.com/model.json',
//   };
// import * as cocoSsd from "@tensorflow-models/coco-ssd";
// import { nextFrame } from "@tensorflow/tfjs";
// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";
import {drawRect} from "./utilities"; 

const Webwrap=(props)=>{
    const webcamRef=useRef(null);
    const[isLoading,setIsLoading]=useState(true);
    const [model, setModel] = useState();
    const canvasRef = useRef(null);
    const mediaHandler=()=>{
        setTimeout(()=>setIsLoading(false),1_000);
      }
      let content=`Text\ Prediction\ here...`
      if(isLoading){
        content=`Webcam\ Is\ Loading...`
      }
      //---------------------------
      // async function loadModel(url) {
      //   // For layered model
      //   try{
      //   console.log("reached")
      //   const model = await tf.loadLayersModel(url.model);
        
      //   // For graph model
      //   // const model = await tf.loadGraphModel(url.model);
        
      //   setModel(model);
      //   console.log("Load model success")}
      //   catch (err) {
      //   console.log(err);
        
      //   }
      //   }
      //   //React Hook
      //   // const [model, setModel] = useState();
      //   useEffect(()=>{
      //   tf.ready().then(()=>{
      //   loadModel(url)
      //   });
      //   },[])
 //---------------------------------------------     
        // async function loadModel() {
        // try {
        // const model = await cocoSsd.load();
        // setModel(model);
        // console.log("set loaded Model");
        // } 
        // catch (err) {
        // console.log(err);
        // console.log("failed load model");
        // }
        // }
        // useEffect(() => {
        // tf.ready().then(() => {
        // loadModel();
        // });
        // }, []);
//---------------------------------------------
        // async function predictionFunction() {
        //   const predictions = await model.detect(document.getElementById("img"));
        //   // setVideoHeight(webcamRef.current.video.videoHeight);
        //   // setVideoWidth(webcamRef.current.video.videoWidth);
        //   var cnvs = document.getElementById("myCanvas");
        //   cnvs.width =  webcamRef.current.video.videoWidth;
        //   cnvs.height = webcamRef.current.video.videoHeight;
        //   // cnvs.style.position = "absolute";

        //   var ctx = cnvs.getContext("2d");
        //   ctx.clearRect(
        //     0,
        //     0,
        //     webcamRef.current.video.videoWidth,
        //     webcamRef.current.video.videoHeight
        //   );

        //   if (predictions.length > 0) {
        //     // setPredictionData(predictions);
        //     console.log(predictions);
        //     for (let n = 0; n < predictions.length; n++) {
        //       // Check scores
        //       console.log(n);
        //       if (predictions[n].score > 0.8) {
        //         let bboxLeft = predictions[n].bbox[0];
        //         let bboxTop = predictions[n].bbox[1];
        //         let bboxWidth = predictions[n].bbox[2];
        //         let bboxHeight = predictions[n].bbox[3]; // - bboxTop;

        //         console.log("bboxLeft: " + bboxLeft);
        //         console.log("bboxTop: " + bboxTop);

        //         console.log("bboxWidth: " + bboxWidth);

        //         console.log("bboxHeight: " + bboxHeight);

        //         ctx.beginPath();
        //         ctx.font = "28px Arial";
        //         ctx.fillStyle = "red";

        //         ctx.fillText(
        //           predictions[n].class +
        //             ": " +
        //             Math.round(parseFloat(predictions[n].score) * 100) +
        //             "%",
        //           bboxLeft,
        //           bboxTop
        //         );

        //         ctx.rect(bboxLeft, bboxTop, bboxWidth, bboxHeight);
        //         ctx.strokeStyle = "#FF0000";

        //         ctx.lineWidth = 3;
        //         ctx.stroke();

        //         console.log("detected");
        //       }
        //     }
        //   }

        //   setTimeout(() => predictionFunction(), 500);
        // }
  //------------------------------------------------------
      // Main function
      const runCoco = async () => {
        // 3. TODO - Load network 
        // e.g. const net = await cocossd.load();
        // https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json
        const net = await tf.loadLayersModel('https://realtimesignlang.s3.ap-south-1.amazonaws.com/model.json')
        console.log("model loaded");
        //  Loop and detect hands
        setInterval(() => {
          detect(net);
        }, 16.7);
      };
    
      const detect = async (net) => {
        // Check data is available
        if (
          typeof webcamRef.current !== "undefined" &&
          webcamRef.current !== null &&
          webcamRef.current.video.readyState === 4
        ) {
          // Get Video Properties
          const video = webcamRef.current.video;
          const videoWidth = webcamRef.current.video.videoWidth;
          const videoHeight = webcamRef.current.video.videoHeight;
    
          // Set video width
          webcamRef.current.video.width = videoWidth;
          webcamRef.current.video.height = videoHeight;
    
          // Set canvas height and width
          canvasRef.current.width = videoWidth;
          canvasRef.current.height = videoHeight;
    
          // 4. TODO - Make Detections
          const img = tf.browser.fromPixels(video)
          const resized = tf.image.resizeBilinear(img, [680,400])
          const casted = resized.cast('int32')
          const expanded = casted.expandDims(0)
          const obj = await net.executeAsync(expanded)
          console.log(obj)
    
          const boxes = await obj[1].array()
          const classes = await obj[2].array()
          const scores = await obj[4].array()
          
          // Draw mesh
          const ctx = canvasRef.current.getContext("2d");
    
          // 5. TODO - Update drawing utility
          // drawSomething(obj, ctx)  
          requestAnimationFrame(()=>{drawRect(boxes[0], classes[0], scores[0], 0.8, videoWidth, videoHeight, ctx)}); 
    
          tf.dispose(img)
          tf.dispose(resized)
          tf.dispose(casted)
          tf.dispose(expanded)
          tf.dispose(obj)
    
        }
      };
    
      useEffect(()=>{runCoco()},[]);
    
    return(<Fragment>
        <span className="content">{content}
        <a onClick={props.Change}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="sv" viewBox="0 0 60 50" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" /></svg>
        </a>
        </span>
        <span>
      <Webcam ref={webcamRef} muted={true} className="wbcam" onUserMedia={mediaHandler}
    style={{position: "relative",float:"right",zindex:1,left: 0,right: 0, textAlign: "center", width:1200,height: 720,}}/>
        <canvas ref={canvasRef}
        style={{position: "relative",left: 0,right: 0,textAlign: "center",  zindex: 0,width: 1200,height: 720}}/>
        </span>
        </Fragment>)
}
export default Webwrap;