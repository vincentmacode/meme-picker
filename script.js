import { catsData } from '/data.js'

const emotionRadio = document.getElementById('emotion-radios')
const getImage = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

//Getting the emotion container to highlight
emotionRadio.addEventListener('change', highlightCheckedOption)

//Get image button event listener
getImage.addEventListener('click', renderCat)

//Close modal button event listener
memeModalCloseBtn.addEventListener('click', closeModal)

function closeModal(){
    memeModal.style.display = 'none'
}

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight') //removes class highlight
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight') //add highlight
}

//Getting the array when the button is clicked
function getMatchingCatsArray(){
    if (document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value //getting the value of the selected radio button
        const gifOnlyChecked= gifsOnlyOption.checked //boolean for GIFs only checkbox
        //return array with 'isGif: true' when GIFs only box is checked
        const matchingCatsArray = catsData.filter(function(cat){
            if (gifOnlyChecked){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            } else {
                return cat.emotionTags.includes(selectedEmotion)
            }
        })
        return matchingCatsArray
    }
}

//getting a single cat object from the array
function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()

    if (catsArray.length === 1){
        return catsArray[0]
    } else {
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }

}
//rendering the cat to the page
function renderCat(){
    const catObject = getSingleCatObject()
    memeModalInner.innerHTML = `
    <img
        class="cat-img"
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        />
        `
    memeModal.style.display = 'flex'

}

function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            // sorting out repeated arrays
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

//Rendering the string to the 'emotion-radios' div
function renderEmotionsRadios(cats){
    let radioItems = ''
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input 
                type="radio"
                id="${emotion}"
                value="${emotion}"
                name="emotions"
                >
        </div>
        ` //HTML with the radio buttons
    }
    emotionRadio.innerHTML = radioItems
}

renderEmotionsRadios(catsData)

