let canvas;
let engine;
let scene;
let camera;

window.onload = startGame;

function startGame() {
    canvas = document.querySelector("#myCanvas");
    engine = new BABYLON.Engine(canvas, true);

    scene = createScene();

    //let sphere = scene.getMeshByName("mySphere");

    // main animation loop 60 times/s
    engine.runRenderLoop(() => {
        //sphere.position.z += 0.1
        //Déplace, gérer interactions...
        scene.render();
    });
}

function createScene() {
    let scene = new BABYLON.Scene(engine);
    
    // background
    scene.clearColor = new BABYLON.Color3(1, 0, 1);
    // Create some objects 
    // params = number of horizontal "stripes", diameter...
    let sphere = BABYLON.MeshBuilder.CreateSphere("mySphere", {diameter: 2, segments: 32}, scene);
    sphere.position.x = 0;
    sphere.position.y = 1;
    let sphere2 = BABYLON.MeshBuilder.CreateSphere("mySphere2", {diameter: 2, segments: 32}, scene);
    sphere2.position.x = 4;
    sphere2.position.y = 1;
    let sphere3 = BABYLON.MeshBuilder.CreateSphere("mySphere3", {diameter: 2, segments: 32}, scene);
    sphere3.position.x = -4;
    sphere3.position.y = 1;

    let roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter:1.3, height: 1.2, tessellation:20});
    roof.scaling.x = 0.75;
    roof.rotation.z = Math.PI / 2;
    roof.position.y = 5;
    roof.position.z = 5;

    // a plane
    let ground = BABYLON.MeshBuilder.CreateGround("myGround", {width: 60, height: 60}, scene);
    console.log(ground.name);

     let camera = new BABYLON.FreeCamera("myCamera", new BABYLON.Vector3(0, 30, 5), scene);
   // This targets the camera to scene origin
   camera.setTarget(BABYLON.Vector3.Zero());
   //for being able to move it with keys/mouse
   //camera.rotation.y = 0.3;
   camera.attachControl(canvas);
   
    let g = scene.getMeshByName("myGround");
    let light = new BABYLON.HemisphericLight("myLight", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.5;
    // color of the light
    light.diffuse = new BABYLON.Color3(1, 0, 0);

    let light2 = new BABYLON.HemisphericLight("myLight2", new BABYLON.Vector3(4, 1, 0), scene);
    light2.intensity = 0.5;
    // color of the light
    light2.diffuse = new BABYLON.Color3(0.7, 0, 0.7);

    let light3 = new BABYLON.HemisphericLight("myLight3", new BABYLON.Vector3(-4, 1, 0), scene);
    light3.intensity = 1;
    // color of the light
    light3.diffuse = new BABYLON.Color3.Green;

    return scene;
}

window.addEventListener("resize", () => {
    engine.resize()
})