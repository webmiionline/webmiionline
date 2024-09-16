const overlayImage = document.querySelector('.overlay-image');
const overlayImageButton = document.querySelector('.overlay-image-button');
const journalShowMore = document.querySelector('.subcontent-journal .subcontent-more button');
const journalSpoilerButtons = document.querySelectorAll('.subcontent-journal .content-spoiler button');
const journalContentList = document.querySelector('.subcontent-journal .subcontent-content');
const journalTemplate = document.querySelector('.journal-template');
const contents = document.querySelectorAll('.subcontent-journal .content, .subcontent-draw .content')
const imageLoadLimit = 6;

const imagesLink = [
  "https://lh3.googleusercontent.com/M9r2h1OWxZmxV-6ene6vcJQwpHs1T7ZMABxFK8ZNseMZP7W06QkWWoTQ0Uag3qm4zDy_OmmkeKPoOYcejsOAV2hXXXoCuU2wiDEIXddITTMW0uCtBg9cQe_l7Oeei7qFAFttfKdXHA=w2400",
  "https://lh3.googleusercontent.com/7fKMkpmFJWhQFR4P4Z52utGtOJwbZr5y4Toz-4TRaM-e5g0Ta1QnzjP_3WPL_12fy8Jam7V96PV95expD0Q1qC3uVn0AX_eWAxcEremWFVoFA5Lh0N9wXwmxiZi9xMyVDipN06l8Fw=w2400",
  "https://via.placeholder.com/1028x800/e2e2e2/cbcbcb/?text=No+Image"
]

let journalTime = 1;

journalShowMore.addEventListener('click', function() {
  generateRndJournal(journalTemplate, journalContentList, imagesLink, journalTime)
})

for(let button of journalSpoilerButtons) {
  button.addEventListener('click', function(e) {
    e.target.parentElement.remove();
  })
}

for(let card of contents) {
  let image = Object.values(card.children).find(el => el.tagName === 'IMG');
  displayOverlay(image, overlayImage);
}

// hide overlay
overlayImageButton.addEventListener('click', function() {
  overlayImage.style.display = "none";
  document.body.classList.remove("stop-scrolling");
})

async function generateRndJournal(journalTemplate, journalContentList, imagesLink, journalTime) {
  for (let i = 0; i < imageLoadLimit; i++) {
    let elCard = cloning(journalTemplate).children[0];
    let elSpoilerWarn =  cloning(journalTemplate).children[1];
    let elImage = Object.values(elCard.children).find(el => el.tagName === 'IMG');
    let contentText = await fetchJoke()
    let countLike = randomInt(100);
    let countComment = Math.min(randomInt(30), Math.max(countLike - randomInt(10), 0));
    journalTime += Math.random();
    rndSpoilerWarning(elCard, elSpoilerWarn)
    randomImg(elImage, imagesLink);
    displayOverlay(elImage, overlayImage);
    elCard.querySelector('.content-text').innerText = `${contentText.substr(0, 50)} ...`
    elCard.querySelector('.mii span').innerText = countLike;
    elCard.querySelector('.comment span').innerText = countComment;
    elCard.querySelector('.content-time').innerText = `${Math.floor(journalTime)} hours ago`;
    journalContentList.appendChild(elCard);
  }
}

async function fetchJoke() {
  const res = await axios.get(`https://v2.jokeapi.dev/joke/Pun,Spooky,Christmas?blacklistFlags=political,racist&type=single`);
  return res.data.joke;
}

function cloning(element) {
  const clone = element.content.cloneNode(true);
  return clone;
}

function rndSpoilerWarning(element, spoilerEl) {
  if (randomInt(2)) {
    element.prepend(spoilerEl)
    spoilerEl.children[0].addEventListener('click', function(e) {
      e.target.parentElement.remove();
    })
  }
}

function randomImg(imageElement, imagesLink) {
  imageElement.src = imagesLink[Math.floor(Math.random() * imagesLink.length)];
}

function displayOverlay(element, overlay) {
  element.addEventListener('click', function() {
    document.body.classList.add("stop-scrolling");
    overlay.children[0].src = element.src;
    overlay.style.display = "flex";
  })
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}