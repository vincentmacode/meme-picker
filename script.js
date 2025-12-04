import { catsData } from '/data.js'

const emotionRadio = document.getElementById('emotion-radios')

function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            emotionsArray.push(emotion)
        }
    }
    return emotionsArray
}


/*Rendering the string to the 'emotion-radios' div*/
function renderEmotionsRadios(c){
    let radioItems = ''
    const emotions = getEmotionsArray(c)
    for (let emotion of emotions){
        radioItems += `<p>${emotion}</p>`
    }
    emotionRadio.innerHTML = radioItems
}

renderEmotionsRadios(catsData)

