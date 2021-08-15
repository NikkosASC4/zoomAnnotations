//Create a Gesture object

class Gesture {
  constructor(x){
    this.fadeOut = x;
  }
}

let imGood = new Gesture(0);
let good;

let theWorld = new Gesture(0);
let world;

//https://teachablemachine.withgoogle.com/models/57KF1811I/
//goes in preload() > good = loadImage("jothumb.png");

// goes in draw
// if(label == "I'm Good"){
//   imGood.fadeOut = 255;
// }
// if(imGood.fadeOut>0){
// image(good,0,0);
// imGood.fadeOut -=10;
// }

// Classifier Variable
let classifier;
// Model URL - Get this from teachable machine resource
let imageModelURL = '';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  //Assign your images in here
  
}

function setup() {
  createCanvas(640, 480);
  // Create the video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  if(label == "ZaWarudo"){
  theWorld.fadeOut = 255;
  }
  if(theWorld.fadeOut>0){
  image(world,-50,50,300,400);
  theWorld.fadeOut -=10;
  }
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}
