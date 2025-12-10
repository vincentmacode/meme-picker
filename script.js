import { catsData } from '/data.js'

const emotionRadio = document.getElementById('emotion-radios')
const getImage = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')

//Getting the emotion containerto highlight
emotionRadio.addEventListener('change', highlightCheckedOption)
getImage.addEventListener('click', getMatchingCatsArray)

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
        console.log(matchingCatsArray)
    }
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

