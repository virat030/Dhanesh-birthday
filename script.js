// SCENE
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 5, 30);

// CAMERA
const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);
camera.position.set(0,2,10);

// RENDERER
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

// LIGHTS
const light = new THREE.PointLight(0xff0000,2);
light.position.set(5,5,5);
scene.add(light);

const ambient = new THREE.AmbientLight(0x222222);
scene.add(ambient);

// ===== SPACE STARS =====
let starsGeo = new THREE.BufferGeometry();
let positions = [];

for(let i=0;i<2000;i++){
positions.push(
(Math.random()-0.5)*60,
(Math.random()-0.5)*60,
(Math.random()-0.5)*60
);
}

starsGeo.setAttribute("position",new THREE.Float32BufferAttribute(positions,3));

let stars = new THREE.Points(
starsGeo,
new THREE.PointsMaterial({color:0xffffff,size:0.05})
);

scene.add(stars);

// ===== MARVEL PORTAL EFFECT =====
let portalGeo = new THREE.TorusGeometry(3,0.5,16,100);
let portalMat = new THREE.MeshBasicMaterial({color:0xff0000,wireframe:true});
let portal = new THREE.Mesh(portalGeo,portalMat);
scene.add(portal);

// ===== CAKE (HERO REVEAL) =====
let cake = new THREE.Group();
scene.add(cake);

let base = new THREE.Mesh(
new THREE.CylinderGeometry(2,2,1,64),
new THREE.MeshStandardMaterial({color:0xff4d6d})
);

let top = new THREE.Mesh(
new THREE.CylinderGeometry(1.5,1.5,0.8,64),
new THREE.MeshStandardMaterial({color:0xffd166})
);

top.position.y = 0.9;

cake.add(base);
cake.add(top);

// ===== PARTICLES =====
function explosion(){
for(let i=0;i<120;i++){
let p = new THREE.Mesh(
new THREE.SphereGeometry(0.05),
new THREE.MeshBasicMaterial({color:Math.random()*0xffffff})
);

p.position.set(0,0,0);
scene.add(p);

let v = {
x:(Math.random()-0.5)*0.5,
y:(Math.random())*0.5,
z:(Math.random()-0.5)*0.5
};

function move(){
p.position.x += v.x;
p.position.y += v.y;
p.position.z += v.z;
v.y -= 0.01;
requestAnimationFrame(move);
}
move();
}
}

// CLICK MARVEL FLASH
window.addEventListener("click",()=>{
explosion();

let flash = document.createElement("div");
flash.className="flash";
document.body.appendChild(flash);
setTimeout(()=>flash.remove(),300);
});

// CAMERA CINEMATIC MOVE
function animate(){
requestAnimationFrame(animate);

portal.rotation.x += 0.01;
portal.rotation.y += 0.01;

cake.rotation.y += 0.005;

stars.rotation.y += 0.0005;

// cinematic zoom in-out
camera.position.z = 10 + Math.sin(Date.now()*0.001)*2;

renderer.render(scene,camera);
}
animate();

// RESIZE
window.addEventListener("resize",()=>{
renderer.setSize(window.innerWidth,window.innerHeight);
camera.aspect = window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
});

// MUSIC
window.onload=()=>{
setTimeout(()=>{
document.getElementById("music").play();
},6000);
}