const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

words = [
    "APPLE", "BERRY", "MANGO", "LEMON", "GRAPE", "KIWI", "PEACH", "PLUMS", "MELON", "ORANGE", "CHERRY", "PINEY", "BANJO", "BLIMP", "CLOVE", "CRANE", "DELTA", "EAGLE", "FLARE", "GLIDE", "HELLO", "IGLOO", "JUMPS", "KITES", "LEAPT", "MUSIC", "NESTY", "OCEAN", "PLANT", "QUEST", "RAISE", "SWING", "TRUCK", "UMBRA", "VOLTS", "WATCH", "XENON", "YACHT", "ZEBRA", "FAIRY", "BREAD", "CRUMB", "DIVER", "EIGHT", "FUDGE", "GLOVE", "HUMPS", "IVORY", "JUMBO", "KNIFE", "LIMBS", "MARCH", "NURSE", "OVERT", "PINKY", "QUART", "RACER", "SCALE", "TOWER", "ULTRA", "VOWEL", "WAGON", "XYLOP", "YACHT", "ZEBRA", "TABLE", "BLINK", "FRUIT", "GRAND", "HAPPY", "JOKER", "KNOCK", "LAUGH", "MOUSE", "NURSE", "OBESE", "PUNCH", "QUIRK", "ROCKS", "SMILE", "TRICK", "UNZIP", "VIVID", "WALKS", "XYLAN", "YACHT", "ZEBRA", "ALBUM", "BRISK", "CRAFT", "DRINK", "EAGLE", "FLAME", "GRUMP", "HOUSE", "INPUT", "JUMBO", "KNIFE", "LUNCH", "MOUSE", "NIXON", "ORBIT", "PLUMB", "QUOTE", "ROCKS", "SHAPE", "TRAIN", "UMBER", "VOICE", "WHALE", "XENON", "YACHT", "ZEBRA", "ABIDE", "BLACK", "CRUSH", "DANCE", "EVOKE", "FLUFF", "GRAND", "HAPPY", "IDIOT", "JUMBO", "KNACK", "LUNCH", "MOUNT", "NECKS", "OPENS", "PLUMB", "QUIRK", "ROCKS", "SENSE", "TABLE", "UMBER", "VISIT", "WOVEN", "XENON", "YACHT", "ZEBRA", "ADAPT", "BLOOM", "CRUSH", "DAILY", "EVOKE", "FLUSH", "GRAFT", "HOUSE", "IRONY", "JUMBO", "KNIFE", "LAUGH", "MOUNT", "NIXON", "ORBIT", "PLUMB", "QUIRK", "ROCKS", "SHADE", "TABLE", "UPSET", "VIVID", "WOMAN", "XENON", "YACHT", "ZEBRA", "ALIVE", "BLISS", "CRANE", "DAIRY", "ELBOW", "FABLE", "GRANT", "HUMOR", "IVORY", "JUMBO", "KNAVE", "LUNCH", "MOUSE", "NIXON", "ORBIT", "PUNCH", "QUOTE", "ROCKS", "SHADE", "TABLE", "UNDER", "VOWEL", "WIDEN", "XENON", "YACHT", "ZEBRA", "AGILE", "BLOOM", "CRATE", "DAILY", "EVOKE", "FLUSH", "GRAIN", "HUMOR", "INPUT", "JUMBO", "KNAVE", "LAUGH", "MOUNT", "NIXON", "ORBIT", "PLUMB", "QUIRK", "ROCKS", "SHADE", "TABLE", "UNDER", "VIVID", "WHALE", "XENON", "YACHT", "ZEBRA", "ALIVE", "BLISS", "CRANE", "DAILY", "EVOKE", "FLUSH", "GRAIN", "HOUSE", "INPUT", "JUMBO", "KNAVE", "LAUGH", "MOUSE", "NIXON", "ORBIT", "PLUMB", "QUIRK", "ROCKS", "SHADE", "TABLE", "UNDER", "VIVID", "WHALE", "XENON", "YACHT", "ZEBRA", "ALIVE", "BLISS", "CRANE", "DAILY", "EVOKE", "FLUSH", "GRAIN", "HOUSE", "INPUT", "JUMBO", "KNAVE", "LAUGH", "MOUSE", "NIXON", "ORBIT", "PLUMB", "QUIRK", "ROCKS", "SHADE", "TABLE", "UNDER", "VIVID", "WHALE", "XENON", "YACHT", "ZEBRA", "ALIVE", "BLISS", "CRANE"
]



const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

let wordle = getRandomWord();

const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '«',
]

const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

let currentRow = 0
let currentTile = 0
let isGameOver = false


guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement)
})



keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})

const handleClick = (letter) => {
    console.log("clicked", letter)
    if (letter === '«') {
        deleteLetter()
        console.log('guessRows', guessRows)

        return
    }
    if (letter === 'ENTER') {
        checkRow()
        console.log('guessRows', guessRows)
        return
    }
    addLetter(letter)
    console.log('guessRows', guessRows)

}

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
    }
}

const deleteLetter = () => {
    if(currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')

    if(currentTile === 5) {
        console.log('guess is ' + guess, 'wordle is ' + wordle)
        flipTile()
        if (wordle == guess) {
            showMessage('Magnificent!')
            isGameOver = true
            return
        } else { 
            if (currentRow >= 5 ) {
                isGameOver = true
                showMessage('Game Over')
                return
            }
            if (currentRow < 5 ) {
                 currentRow++
                 currentTile = 0
            }
        }
    }
}


const showMessage = (message) => {
   const messageElement =  document.createElement('p')
   messageElement.textContent = message
   messageDisplay.append(messageElement)
   setTimeout(() => messageDisplay.removeChild(messageElement), 2000)
}

const addColorToKey = (keyLetter, color) => {
       const key = document.getElementById(keyLetter)
       key.classList.add(color)

}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordle = wordle
    const guess = []

    rowTiles.forEach(tile => {
        guess.push({letter: tile.getAttribute('data'), color: 'grey-overlay'})
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if(checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })


    rowTiles.forEach((tile, index) => {
        const dataLetter = tile.getAttribute('data')


        setTimeout(()=> {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
/*             tile.classList.add('flip')
            if (dataLetter == wordle[index]) {
                tile.classList.add('green-overlay')
                addColorToKey(dataLetter, 'green-overlay')
            } else if (wordle.includes(dataLetter)) {
                tile.classList.add('yellow-overlay')
                addColorToKey(dataLetter, 'yellow-overlay')
            } else {
                tile.classList.add('grey-overlay')
                addColorToKey(dataLetter, 'grey-overlay')
            }
            */
        }, 500 * index)
    })
}

