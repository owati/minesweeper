import React, { useState, useEffect } from 'react'
import Footer from './Footer'
import '../css/Savedgames.css'
import { API_URL } from '../functions/generatemines'

var confirm_id = 0
var confirm_name = ''


window.onclick = (event) => {
    let mode = document.getElementById('mode')
    if (event.target === mode) {
        mode.style.display = 'none'
    }

}

function openSave(id, name) {
    let mode = document.getElementById('mode')
    mode.style.display = 'flex';
    confirm_id = id
    confirm_name = name
}

function open_game() {
    window.location.replace('/minesweeper/#/game/' + confirm_id)

}

function delete_game() {
    fetch(API_URL + 'savedgames/' + confirm_id, {
        method: 'DELETE'
    })
        .then((response) => response.json())
        .then((data) => console.log(data))

    window.location.reload()
}

function OptionBox(props) {
    return (
        <div className="modal" id="mode">
            <div className="modalClass">
                <div className="modal-head"><h4>what do you want to do to with this game ? </h4></div>
                <div className="d-flex justify-content-between">
                    <button className="butane grow shadow-5" onClick={open_game}>play</button>
                    <button className="butane grow shadow-5" onClick={delete_game}>delete</button>

                </div>


            </div>
        </div>
    )
}


function Savedgames(props) {
    const [savedList, savedListChange] = useState([])

    useEffect(() => {
        fetch(API_URL + 'savedgames/' + `${props.user.id}`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => {
                savedListChange(data.reverse())
            })
            .catch(() => savedListChange(-1))
    }, [])

    function arrange() {
        let list = []
        let count = 1
        for (let i of savedList) {
            const date = new Date(Number(i.time_saved))
            list.push(<button className="savedbut grow shadow-5" onClick={() => { openSave(i.id, i.name) }}>
                <div className="d-flex justify-content-between ">
                    <div><h1>{count}</h1></div>
                    <div><h1>{i.name}</h1></div>
                    <div id={i.id}><h4>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}</h4></div>
                </div>
            </button>)
            count++

        }
        return list
    }

    return (
        <div>
            <OptionBox name={confirm_name} />
            <div className="headersave">
                <div className="d-flex justify-content-center"><h1> welcome {props.user.nick_name ? props.user.nick_name : 'Guest'}</h1></div>
                <div className="d-flex justify-content-center"><h4> your saved games </h4></div>
            </div>

            {savedList === -1 ? <div className="error"><h1> 😢Oopss...there is a problem with the server</h1></div> :
                (savedList.length === 0) ? <div className="error"><h1>  you have no saved game, try saving a game or two😉</h1></div> :
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="saved">
                            {arrange()}
                        </div>
                    </div>}

            <Footer />

        </div>
    )
}

export default Savedgames;