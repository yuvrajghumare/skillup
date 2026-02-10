document.addEventListener("DOMContentLoaded",function(){

const intro=document.getElementById("intro");
const pass=document.getElementById("passwordScreen");
const main=document.getElementById("main");
const music=document.getElementById("music");

/* INTRO COUNTDOWN */
let count=5;
let countEl=document.getElementById("count");

let timer=setInterval(()=>{
count--;
if(count>=0) countEl.innerText=count;
if(count<0){
clearInterval(timer);
intro.style.display="none";
pass.style.display="flex";
}
},1000);

/* UNLOCK */
window.unlock=function(){
if(document.getElementById("passInput").value==="love123"){
pass.style.display="none";
main.classList.remove("hidden");
fadeMusic();
fireworks();
typeLetter();
setTimeout(()=>{
document.getElementById("proposalBtn").classList.remove("hidden");
},7000);
}else{
document.getElementById("error").innerText="Wrong code 💔";
}
}

/* MUSIC FADE */
function fadeMusic(){
music.volume=0;
music.play();
let v=0;
let fade=setInterval(()=>{
if(v<0.5){
v+=0.05;
music.volume=v;
}else clearInterval(fade);
},300);
}

window.toggleMusic=function(){
if(music.paused) fadeMusic();
else music.pause();
}

/* SCROLL REVEAL */
const sections=document.querySelectorAll(".section");
window.addEventListener("scroll",()=>{
sections.forEach(sec=>{
if(sec.getBoundingClientRect().top<window.innerHeight-100){
sec.classList.add("show");
}
});
});

/* SLIDESHOW */
let currentSlide = 0;
const slides = document.querySelectorAll(".slides");
const dots = document.querySelectorAll(".dot");
let slideInterval;

function startAutoSlide(){
slideInterval = setInterval(()=>{
changeSlide(1);
},5000);
}

function changeSlide(direction){
slides[currentSlide].classList.remove("active");
dots[currentSlide].classList.remove("active-dot");

currentSlide += direction;

if(currentSlide >= slides.length) currentSlide = 0;
if(currentSlide < 0) currentSlide = slides.length - 1;

slides[currentSlide].classList.add("active");
dots[currentSlide].classList.add("active-dot");
}

window.changeSlide = changeSlide;

window.goToSlide = function(index){
slides[currentSlide].classList.remove("active");
dots[currentSlide].classList.remove("active-dot");

currentSlide = index;

slides[currentSlide].classList.add("active");
dots[currentSlide].classList.add("active-dot");
}

startAutoSlide();

const slideshow = document.querySelector(".slideshow");
slideshow.addEventListener("mouseenter", ()=>clearInterval(slideInterval));
slideshow.addEventListener("mouseleave", startAutoSlide);

/* LOVE LETTER TYPING */
function typeLetter(){
const text="My love, you are my peace, my joy, my dream come true. I promise to cherish you today and always. Happy Birthday 💖";
let i=0;
let el=document.getElementById("typing");
let typing=setInterval(()=>{
if(i<text.length){
el.innerHTML+=text[i];
i++;
}else clearInterval(typing);
},40);
}

/* FIREWORKS */
window.fireworks=function(){
for(let k=0;k<100;k++){
let p=document.createElement("div");
p.className="particle";
p.style.background=`hsl(${Math.random()*360},100%,50%)`;
p.style.left=window.innerWidth/2+"px";
p.style.top=window.innerHeight/2+"px";
document.body.appendChild(p);

let angle=Math.random()*2*Math.PI;
let velocity=Math.random()*6+2;
let x=0,y=0;

let interval=setInterval(()=>{
x+=Math.cos(angle)*velocity;
y+=Math.sin(angle)*velocity;
p.style.transform=`translate(${x}px,${y}px)`;
p.style.opacity-=0.02;
if(p.style.opacity<=0){
clearInterval(interval);
p.remove();
}
},20);
}
}

/* PROPOSAL */
window.openProposal=function(){
document.getElementById("proposal").style.display="flex";
}

window.sayYes=function(){
fireworks();
alert("You just made me the happiest man alive ❤️");
}

/* CANVAS GLOW BACKGROUND */
const canvas=document.getElementById("bgCanvas");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let dotsArr=[];
for(let d=0;d<100;d++){
dotsArr.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*2});
}

function draw(){
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.fillStyle="rgba(255,255,255,0.4)";
dotsArr.forEach(dot=>{
ctx.beginPath();
ctx.arc(dot.x,dot.y,dot.r,0,Math.PI*2);
ctx.fill();
});
requestAnimationFrame(draw);
}
draw();

});
