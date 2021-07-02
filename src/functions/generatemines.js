export const numMap = { 
    '10': 'A',
    '11': 'B',
    '12': 'C',
    '13': 'D',
    '14': 'E',
    '15': 'F',
    '16': 'G'

}


const revNumMap = {
    'A': '10',
    'B': '11',
    'C': '12',
    'D': '13',
    'E': '14',
    'F': '15',
    'G': '16'

}

function List_string(list){
    let mes = ''
    for(let i of list){
        mes += `${i}`
    }
    return mes
}

function permutate(list1, list2, list3){
    let returnList = []
    for(let i = 1; i <  list1.length; i++){
        let num = `${list1[0] < 10? list1[0]:numMap[`${list1[0]}`]}${list1[i] < 10? list1[i]:numMap[`${list1[i]}`]}`
        returnList.push(num)
    }
    for(let i = 1; i <  list2.length; i++){
        let num = `${list2[0] < 10? list2[0]:numMap[`${list2[0]}`]}${list2[i] < 10? list2[i]:numMap[`${list2[i]}`]}`
        returnList.push(num)
    }
    for(let i = 1; i <  list3.length; i++){
        let num = `${list3[0] < 10? list3[0]:numMap[`${list3[0]}`]}${list3[i] < 10? list3[i]:numMap[`${list3[i]}`]}`
        returnList.push(num)
    }
    return returnList
}

let generateRandomNum = (limit) => {
    let ranum
    do{
        ranum = Math.floor(Math.random() * 100)
    }while(ranum >= limit)

    return ranum
}
export const remove = (list) => {
    let newList = []
    for(let i of list){
        if(!newList.includes(i)){
            newList.push(i)
        }
        
    }
    return newList
}
export const generateMines = (mines, limit, num) => {

    let mineArray = []
    let around = splitArray(num, limit)

    for(let i = 0; i < mines; i++){
        let mineIndex
        do{
            let index = generateRandomNum(limit)
            let index2 = generateRandomNum(limit)
            mineIndex = `${index < 10 ? index : numMap[`${index}`]}${index2 < 10 ? index2 : numMap[`${index2}`]}`
        }while(mineArray.includes(mineIndex) || (mineIndex === num) || around.includes(mineIndex))
    
        mineArray.push(mineIndex)
    }

    return mineArray
}

export function splitArray(id, limit){
    const numArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']



    let x = Number(numArray.includes(id[0]) ? id[0] : revNumMap[id[0]])
    let y = Number(numArray.includes(id[1])  ? id[1] : revNumMap[id[1]])

    let x_above = (x - 1) < 0 ? -1: (x -1)
    let x_below = (x + 1) >= limit ? -1: (x +1)
    let y_left = (y - 1) < 0 ? -1: (y -1)
    let y_right =(y + 1) >= limit ? -1: (y + 1)


   let permArray = permutate(
       x_above !== -1 ? [x_above, y_left, y_right, y].filter(x => x >= 0):[],
       x_below !== -1 ? [x_below, y_left, y_right, y].filter(x => x >= 0):[],
       [x,y_left,y_right].filter(x => x >= 0)
   )

   return permArray
}

export const countAround = (id, limit, mineArray) => {
    let count = 0
    
    let permArray = splitArray(id, limit)
   
    for(let i of permArray ){
        if(mineArray.includes(i)){
            count++
        }
    }

    return count
}

export function zeroButtonArray(id, limit, mineArray){
    let originalArray = splitArray(id, limit)
    for(let i of originalArray){
        if(countAround(i,limit, mineArray) === 0){
            for(let j of splitArray(i, limit)){
                if(!originalArray.includes(j)){
                    originalArray.push(j)
                }
            }
        }
    } 
    return originalArray
}


export function SaveGame(mines, opened, time, level){
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.open('POST','http://127.0.0.1:8000/api/savedgames')

    let gameDetail = {
        'Access-Control-Allow-Origin':true,
        level: level,
        mines_array: List_string(mines),
        opened_array: List_string(opened),
        time: time
    }

    console.log(JSON.stringify(gameDetail))

    xhr.onload = () => {
        console.log(xhr.status)
    }

    xhr.send(JSON.stringify(gameDetail))
}