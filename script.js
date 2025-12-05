import { catsData } from '/data.js'

const emotionRadio = document.getElementById('emotion-radios')

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
        radioItems += `<p>${emotion}</p>`
    }
    emotionRadio.innerHTML = radioItems
}

renderEmotionsRadios(catsData)

