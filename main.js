/* jshint esversion: 6 */

// ============= DOM Element References =============
// Navigation and page elements
const topinfo = document.querySelector("#topInfo");
const backbtn = document.querySelector("#backBtn");
const pagequiz = document.querySelector("#pageQuiz");
const pageG = document.querySelector("#pageGreek");
const pageN = document.querySelector("#pageNorse");
const pageC = document.querySelector("#pageChinese");
const pageMG = document.querySelector("#gameContainer");
const footer = document.querySelector("footer");
var allpage = document.querySelectorAll(".page");
var allbtn = document.querySelectorAll(".navBtn");

// ============= Page Navigation Functions =============
// Hide all myth content pages
function hideContent() {
for (let ipage of allpage) {
ipage.style.display = "none";
}
}

// Show selected myth page and hide footer
function showContent(pageElement) {
	pageElement.style.display = "block";
	footer.style.display = "none";
	}

	// Hide navigation elements when viewing myth pages
	function hideBtn() {
	topinfo.style.display = "none";
	pageMG.style.display = "none";
	for (let ibtn of allbtn) {
		ibtn.style.display = "none";
	}

	pagequiz.style.display = "none";
	backbtn.style.display = "block";
}

// Initialize page states
pagequiz.querySelector("h2").style.fontSize = "1.7em";
backbtn.style.display = "none";
hideContent();

// ============= Event Delegation for Navigation =============
// Parent nav handles clicks for all myth buttons
const nav = document.querySelector("nav");
nav.addEventListener("click", navMyth);

function navMyth(event) {
	const button = event.target.closest("button");
	if (!button || button.id == "backBtn") return;

	hideContent();
	hideBtn();

	// Show the selected mythology page
	switch (button.id) {
		case "greekBtn":
			showContent(pageG);
			break;

		case "norseBtn":
			showContent(pageN);
			break;

		case "chineseBtn":
			showContent(pageC);
			break;
	}
}

// ============= Back Button =============
// Return to main navigation page
backbtn.addEventListener("click", function () {
	hideContent();
	topinfo.style.display = "block";
	pageMG.style.display = "block";
	for (let ibtn of allbtn) {
		ibtn.style.display = "block";
	}
	pagequiz.style.display = "flex";
	backbtn.style.display = "none";
	footer.style.display = "block";
});

// ============= Quiz Elements =============
const submitbtn = document.querySelector("#submitBtn");
const tryagainbtn = document.querySelector("#tryAgainBtn");
const submittext = document.querySelector("#afrSubmitText");
pagequiz.style.display = "flex";
submittext.style.display = "none";

// Quiz event listeners
submitbtn.addEventListener("click", checkAns);
tryagainbtn.addEventListener("click", retestQuiz);

// Quiz variables
var gQ1, gQ2,
nQ1, nQ2,
cQ1, cQ2;
var score = 0;

// ============= Quiz Functions =============
// Reset quiz for retry
function retestQuiz() {
let allInputs = document.querySelectorAll("#quizForm input");
for (let iinput of allInputs) {
	iinput.checked = false;
}

pagequiz.querySelector("h2").style.textAlign = "center";

pagequiz.style.display = "block";
submittext.style.display = "none";
}

const scorebox = document.querySelector("#scorebox");

// Check quiz answers and calculate score
function checkAns() {
// Validate all required questions are answered
if(
!document.querySelector("input[name='question1']:checked") ||
!document.querySelector("input[name='question2']:checked") ||
!document.querySelector("input[name='question4']:checked") ||
!document.querySelector("input[name='question5']:checked") ||
!document.querySelector("input[name='question7']:checked") ||
!document.querySelector("input[name='question8']:checked")
)
{
	alert("Answer all the questions.");
	return;
}

score = 0;

//====== Greek Questions ======
// Question 1: What two beings emerged from Chaos?
gQ1 = document.querySelector("input[name='question1']:checked").value;
console.log(gQ1);
if (gQ1 == "B") score++;

// Question 2: Who helped Cronus overthrow Uranus?
gQ2 = document.querySelector("input[name='question2']:checked").value;
console.log(gQ2);
if (gQ2 == "B") score++;

// Question 3: Titanomachy (Select all that apply)
let gQ3a = document.querySelector("#q3choice1").checked;
let gQ3b = document.querySelector("#q3choice2").checked;
let gQ3c = document.querySelector("#q3choice3").checked;
let gQ3d = document.querySelector("#q3choice4").checked;
if (gQ3a == true && gQ3b == true && gQ3c == false && gQ3d == true) score++;

//====== Norse Questions ======
// Question 4: Origin of Norse mythology
nQ1 = document.querySelector("input[name='question4']:checked").value;
console.log(nQ1);
if (nQ1 == "A") score++;

// Question 5: What is Fimbulwinter?
nQ2 = document.querySelector("input[name='question5']:checked").value;
console.log(nQ2);
if (nQ2 == "B") score++;

// Question 6: Norse gods mentioned (Select all that apply)
let nQ3a = document.querySelector("#q6choice1").checked;
let nQ3b = document.querySelector("#q6choice2").checked;
let nQ3c = document.querySelector("#q6choice3").checked;
let nQ3d = document.querySelector("#q6choice4").checked;
if (nQ3a == true && nQ3b == true && nQ3c == true && nQ3d == false) score++;

//====== Chinese Questions ======
// Question 7: Who taught humans in the Three Sovereigns Era?
cQ1 = document.querySelector("input[name='question7']:checked").value;
console.log(cQ1);
if (cQ1 == "B") score++;

// Question 8: Pangu's role in Chinese mythology
cQ2 = document.querySelector("input[name='question8']:checked").value;
console.log(cQ2);
if (cQ2 == "A") score++;

// Question 9: Battle of Zhuolu elements (Select all that apply)
let cQ3a = document.querySelector("#q9choice1").checked;
let cQ3b = document.querySelector("#q9choice2").checked;
let cQ3c = document.querySelector("#q9choice3").checked;
let cQ3d = document.querySelector("#q9choice4").checked;
if (cQ3a == true && cQ3b == true && cQ3c == true && cQ3d == false) score++;

// Display results
pagequiz.style.display = "none";
submittext.style.display = "block";

if (score == 9)
{
	scorebox.innerHTML = `Score: ${score} out of 9 (Perfect score!!!)`;
}
else
{
	scorebox.innerHTML = `Score: ${score} out of 9`;
}
}

// ============= Game Elements =============
const player = document.querySelector("#player");
const item = document.querySelector("#item");
const scoreText = document.querySelector("#gameScore");
const startgame = document.querySelector("#startGame");
const restartgame = document.querySelector("#restartGame");
const timeText = document.querySelector("#timeText");

// ============= Game Position Variables =============
let playerX = 260;
let itemX = 280;
let itemY = 0;
let otheritemX1 = 30;
let otheritemY1 = 0;
let otheritemX2 = 160;
let otheritemY2 = 0;
let otheritemX3 = 400;
let otheritemY3 = 0;
let otheritemX4 = 530;
let otheritemY4 = 0;

// Other items (red items to avoid)
const otherItem1 = document.querySelector("#otherItem1");
const otherItem2 = document.querySelector("#otherItem2");
const otherItem3 = document.querySelector("#otherItem3");
const otherItem4 = document.querySelector("#otherItem4");

// Game state variables
let gameScore = 0;
let targetScore = 25;
let gameLoop;
let gameRunning = false;

// ============= Game Event Listeners =============
document.addEventListener("keydown", movePlayer);
startgame.addEventListener("click", startGame);
restartgame.addEventListener("click", restartGame);
restartgame.style.display = "none";

const leftBtn = document.querySelector("#moveLeft");
const rightBtn = document.querySelector("#moveRight");
const winText = document.querySelector("#winText");
winText.style.display = "none";

// ============= Player Movement (A, D) ================
function movePlayer(event){
if (gameRunning)
{
	// Move left with 'A' key
	if(event.key == "a" || event.key == "A")
	{
		playerX = playerX - 40;
	}

	// Move right with 'D' key
	if(event.key == "d" || event.key == "D")
	{
		playerX = playerX + 40;
	}

	// Boundary checks to keep player in game area
	if(playerX < 0)
	{
		playerX = 0;
	}

	if(playerX > 540)
	{
		playerX = 540;
	}
}

player.style.left = playerX + "px";
}

// ============= Mobile Touch/Button Controls =============
// Left button for mobile
leftBtn.addEventListener("click", function () {
playerX = playerX - 40;
player.style.left = playerX + "px";
});

// Right button for mobile
rightBtn.addEventListener("click", function () {
playerX = playerX + 40;
player.style.left = playerX + "px";
});

// ============= Animation Function =============
// Trigger CSS animation on an element
function playAnimation(element, className) {	
    element.classList.add(className);
    setTimeout(removeAnimation, 300);
    
    function removeAnimation() {
        element.classList.remove(className);
    }
}

// ============= Item Spawning Functions =============
// Random X position for items
function respawnItemX(itemElement){
let randomX = Math.floor(Math.random() * 560);

itemElement.style.left = randomX + "px";
itemElement.style.top = "0px";

return randomX;
}

// Random Y position for items
function respawnItemY(itemElement){
let randomY = Math.floor(Math.random() * 50);

itemElement.style.top = randomY + "px";

return randomY;
}

// ============= Item Movement =============
// Move all items down every frame
function moveItem(){
	// Gold item (Zeus' Lightning Bolt)
	itemY += 5;
	item.style.top = itemY + "px";

	if(itemY > 500)
	{
		itemY = respawnItemY(item);
		itemX = respawnItemX(item);
	}

	// Red item 1
	otheritemY1 += 5;
	otherItem1.style.top = otheritemY1 + "px";

	if(otheritemY1 > 500)
	{
		otheritemY1 = respawnItemY(otherItem1);
		otheritemX1 = respawnItemX(otherItem1);
	}

	// Red item 2
	otheritemY2 += 5;
	otherItem2.style.top = otheritemY2 + "px";

	if(otheritemY2 > 500)
	{
		otheritemY2 = respawnItemY(otherItem2);
		otheritemX2 = respawnItemX(otherItem2);
	}

	// Red item 3
	otheritemY3 += 5;
	otherItem3.style.top = otheritemY3 + "px";

	if(otheritemY3 > 500)
	{
		otheritemY3 = respawnItemY(otherItem3);
		otheritemX3 = respawnItemX(otherItem3);
	}

	// Red item 4
	otheritemY4 += 5;
	otherItem4.style.top = otheritemY4 + "px";

	if(otheritemY4 > 500)
	{
		otheritemY4 = respawnItemY(otherItem4);
		otheritemX4 = respawnItemX(otherItem4);
	}

	checkCollision();
}

// ============= Audio Setup =============
const collectAudio = new Audio("./audio/itemCollect.mp3");
const wrongItemAudio = new Audio("./audio/wrongItemCollect.mp3");
const winAudio = new Audio("./audio/win.mp3");
const winApplauseAudio = new Audio("./audio/applause.mp3");

// ============= Collision Detection =============
function checkCollision(){
// Gold item collision (Zeus' Lightning Bolt)
if(itemY >= 430 && itemX + 40 >= playerX && itemX <= playerX + 60)
{
	collectAudio.play();
	gameScore++;
	scoreText.innerHTML = "Score: " + gameScore;
	itemY = respawnItemY(item);
	itemX = respawnItemX(item);
	playAnimation(player, "collectPulse");
}

// Red item 1 collision
if(otheritemY1 >= 430 && otheritemX1 + 40 >= playerX && otheritemX1 <= playerX + 60)
{
	wrongItemAudio.play();
	if (gameScore > 0)
	{
		gameScore--;
	}
	scoreText.innerHTML = "Score: " + gameScore;
	otheritemY1 = respawnItemY(otherItem1);
	otheritemX1 = respawnItemX(otherItem1);
	playAnimation(player, "shake");
}

// Red item 2 collision
if(otheritemY2 >= 430 && otheritemX2 + 40 >= playerX && otheritemX2 <= playerX + 60)
{
	wrongItemAudio.play();
	if (gameScore > 0)
	{
		gameScore--;
	}
	scoreText.innerHTML = "Score: " + gameScore;
	otheritemY2 = respawnItemY(otherItem2);
	otheritemX2 = respawnItemX(otherItem2);
	playAnimation(player, "shake");
}

// Red item 3 collision
if(otheritemY3 >= 430 && otheritemX3 + 40 >= playerX && otheritemX3 <= playerX + 60)
{
	wrongItemAudio.play();
	if (gameScore > 0)
	{
		gameScore--;
	}
	scoreText.innerHTML = "Score: " + gameScore;
	otheritemY3 = respawnItemY(otherItem3);
	otheritemX3 = respawnItemX(otherItem3);
	playAnimation(player, "shake");
}

// Red item 4 collision
if(otheritemY4 >= 430 && otheritemX4 + 40 >= playerX && otheritemX4 <= playerX + 60)
{
	wrongItemAudio.play();
	if (gameScore > 0)
	{
		gameScore--;
	}
	scoreText.innerHTML = "Score: " + gameScore;
	otheritemY4 = respawnItemY(otherItem4);
	otheritemX4 = respawnItemX(otherItem4);
	playAnimation(player, "shake");
}

// Win condition
if(gameScore >= targetScore)
{
	winAudio.play();
	winApplauseAudio.play();
	winText.style.display = "block";
	endGame();
}
}

// ============= Timer =============
let sec = 0;
let timeLoop;

function time(){
	sec++;
	timeText.innerHTML = `Timer: ${sec}s`;
}

// ============= Game Control Functions =============
// Start the game
function startGame()
{
	gameRunning = true;
	startgame.style.display = "none";
	
	// Initialize item positions
	itemY = respawnItemY(item);
	itemX = respawnItemX(item);

	otheritemY1 = respawnItemY(otherItem1);
	otheritemX1 = respawnItemX(otherItem1);

	otheritemY2 = respawnItemY(otherItem2);
	otheritemX2 = respawnItemX(otherItem2);

	otheritemY3 = respawnItemY(otherItem3);
	otheritemX3 = respawnItemX(otherItem3);

	otheritemY4 = respawnItemY(otherItem4);
	otheritemX4 = respawnItemX(otherItem4);

	// Start game loops
	gameLoop = setInterval(moveItem, 20);
	timeLoop = setInterval(time, 1000);
}

// Restart the game
function restartGame()
{
	// Stop all game loops
	clearInterval(gameLoop);
	clearInterval(timeLoop);
	
	// Reset scores and timer
	gameScore = 0;
	sec = 0;
	scoreText.innerHTML = "Score: 0";
	timeText.innerHTML = "Timer: 0s";

	// Reset buttons
	restartgame.style.display = "none";
	winText.style.display = "none";
	startgame.style.display = "block";

	// Reset item positions
	itemX = 280;
	itemY = 0;
	item.style.left = itemX + "px";
	item.style.top = itemY + "px";

	otheritemY1 = 0;
	otheritemX1 = 30;
	otherItem1.style.left = otheritemX1 + "px";
	otherItem1.style.top = otheritemY1 + "px";

	otheritemY2 = 0;
	otheritemX2 = 160;
	otherItem2.style.left = otheritemX2 + "px";
	otherItem2.style.top = otheritemY2 + "px";

	otheritemY3 = 0;
	otheritemX3 = 400;
	otherItem3.style.left = otheritemX3 + "px";
	otherItem3.style.top = otheritemY3 + "px";

	otheritemY4 = 0;
	otheritemX4 = 530;
	otherItem4.style.left = otheritemX4 + "px";
	otherItem4.style.top = otheritemY4 + "px";

	// Reset player position
	playerX = 270;
	player.style.left = playerX + "px";
}

// End the game
function endGame(){
	gameRunning = false;
	clearInterval(gameLoop);
	clearInterval(timeLoop);
	restartgame.style.display = "block";
}