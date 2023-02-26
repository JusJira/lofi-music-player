import React, { useEffect} from 'react'
import axios from 'axios';
import './Record.css'
import './Slider.css'

import { useState } from 'react'
import ReactPlayer from 'react-player/youtube'

function Record() {
    const [playing, setPlaying] = useState(false)
    const [volume, setVolume] = useState(1)
    const [loaded, setLoaded] = useState(false)
    const [ready, setReady] = useState(false)
    const [title, setTitle] = useState('')

    const [url,setUrl] = useState('https://www.youtube.com/watch?v=jfKfPfyJRdk')

    const handleVolume = (e: { target: { value: string; }; }) => {
        setVolume(parseFloat(e.target.value))
    }

    const [show, setShow] = useState(true)


    const handlePlayPause = () => {
        // console.log('working')
        setPlaying(!playing)
        var element = document.getElementById("label");
        var button = document.getElementById("button");
        if (playing) {
            element!.classList.remove('playing')
            element!.classList.add('paused');
            button!.classList.remove('playing')
            button!.classList.add('paused');
        }
        else {
            element!.classList.remove('paused')
            element!.classList.add('playing')
            button!.classList.remove('paused')
            button!.classList.add('playing')
        }
    }

    useEffect(() => {
        var element = document.getElementById("label");
        var button = document.getElementById("button");
        element!.classList.remove('playing')
        element!.classList.add('paused');
        button!.classList.remove('playing')
        button!.classList.add('paused');
        setLoaded(true)

        axios.get('https://noembed.com/embed?url=' + url).then((res) => { setTitle(res.data.title) })


    }, [])

    useEffect(() => {
        // console.log(ready)
        var element = document.getElementById("label");
        var button = document.getElementById("button");
        if (playing && ready) {
            element!.classList.remove('paused')
            element!.classList.add('playing')
            button!.classList.remove('paused')
            button!.classList.add('playing')
        }
    }, [ready])


    function refreshPage() {
        // window.location.reload();
        setLoaded(false)
        setReady(false)
        setTimeout(() => {
            setLoaded(true)
        }, 1000)

        var element = document.getElementById("label");
        var button = document.getElementById("button");
        element!.classList.remove('playing')
        element!.classList.add('paused');
        button!.classList.remove('playing')
        button!.classList.add('paused');
    }

    const [animation, setAnimation] = useState('open')
    const [animationBut, setAnimationBut] = useState('close')

    const hide = async (ms: number | undefined) => {
        var element = document.getElementById("main-body");
        element!.classList.toggle('focused')

        var turn = document.getElementById("turntable");
        turn!.classList.toggle('focused')

        setAnimation('close')
        setAnimationBut('open')

        await new Promise(r => setTimeout(r, ms))

        setShow(false)

    }

    return (
        <div className='flex items-center justify-center h-screen flex-col'>
            {loaded ? <ReactPlayer onPlay={() => { setReady(true) }} playing={playing} height='0px' width='0px' volume={volume} url={url} /> : null}

            <center className=''>
                <div id="turntable">
                    <div id="table-shadow"></div>
                    <div id="table-feet"></div>
                    <div id="wood">
                        <div id="grain1"></div>
                        <div id="grain2"></div>
                        <div id="grain3"></div>
                        <div id="grain4"></div>
                        <div id="grain5"></div>
                        <div id="grain6"></div>
                    </div>
                    <div id="wood2">
                        <div id="grain7"></div>
                        <div id="grain8"></div>
                        <div id="grain9"></div>
                        <div id="grain10"></div>
                        <div id="grain11"></div>
                    </div>
                    <div id="table"></div>
                    <div id="button" onClick={handlePlayPause}></div>
                    <div id="disk">
                        <div id="label"></div>
                    </div>
                    <div id="axis-shadow"></div>
                    <div id="axis"></div>
                    <div id="arm-shadow"></div>
                    <div id="weight-shadow"></div>
                    <div id="base">
                        <div id="axle-shadow"></div>
                    </div>
                    <div id="lever"></div>
                    <div id="weight"></div>
                    <div id="axle"></div>
                    <div id="arm"></div>
                    <div id="head"></div>
                </div>

            </center>
            <div className='fixed bottom-10'>
                {show ?
                    <div className={`Modal ${animation}`}>
                        <div className='w-fit flex flex-col items-center justify-center bg-[#ac5151] py-3 px-4 rounded-lg gap-2'>
                            <p className='text-white text-lg'>Playing: <span className='text-[#FFF1DC]'>{title}</span></p>
                            <div>
                                <input className='slider w-full' type='range' min={0} max={1} step='any' value={volume} onChange={handleVolume} />
                            </div>
                            <p className='text-white text-xl'>Volume: {(volume * 100).toFixed(0)}</p>
                            <div className='flex gap-3 text-white'>
                                <button className='bg-[#40513B] p-2 rounded-md w-24' onClick={handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
                                <button className='bg-[#40513B] p-2 rounded-md w-24' disabled={!ready} onClick={refreshPage}>Reload</button>
                                <button className='bg-[#40513B] p-2 rounded-md w-24' onClick={() => hide(480)}>Hide</button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className={`Show ${animationBut}`}>
                        <button className='text-white bg-[#9dbc96] p-2 rounded-md w-24' onClick={() => {
                            setShow(true);
                            setAnimation('open');
                            var element = document.getElementById("main-body");
                            element!.classList.toggle('focused')
                            var turn = document.getElementById("turntable");
                            turn!.classList.toggle('focused')
                        }
                        }>Show</button>
                    </div>}
            </div>
        </div>

    )
}

export default Record