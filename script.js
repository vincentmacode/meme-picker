import { catsData } from '/data.js'

const emotionRadio = document.getElementById('emotion-radios')

//Getting the array of emotions to highlight
emotionRadio.addEventListener('change', highlightCheckedOption)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight') //removes class highlight
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight') //add highlight
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

