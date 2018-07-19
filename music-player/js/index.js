let playing = () => {
    let a = e('audio')
    a.addEventListener('canplay', function(event) {
        a.play()
    })
}

let updateSrc = (index) => {
    let a = e('audio')
    a.dataset.index = String(index)
    a.src = `./src/${index}.mp3`
}

let nameAndSinger = () => {
    let a = e('audio')
    let index = Number(a.dataset.index)
    let songs = [
        {index: 0, singer: '李荣浩', name: '戒烟',},
        {index: 1, singer: 'Rachael Yamaga', name: 'Keep Going',},
        {index: 2, singer: '花儿乐队', name: '花',},
    ]
    let songName = e('.song-name')
    songName.innerHTML = songs[index].name
    let singer = e('.singer')
    singer.innerHTML = songs[index].singer
}

let picChange = (index) => {
    let cover = e('.music-cover')
    cover.src = `./images/${index}.jpg`

    let bcPic = e('.background-pic')
    bcPic.style.backgroundImage = `url('./images/${index}.jpg')`
}

let updateMusicInfo = (index) => {
    updateSrc(index)
    nameAndSinger()
    picChange(index)
}

let totalTime = () => {
    let a = e('audio')
    let t = e('.total-time')
    a.addEventListener('canplay', (event) => {
        let time = Math.floor(a.duration)
        log('time change', time)
        t.innerHTML = timeTransform(time)
    })
}

let currentTime = () => {
    let a = e('audio')
    let c = e('.current-time')
    setInterval(function() {
        let time = Math.floor(a.currentTime)
        c.innerHTML = timeTransform(time)
    }, 1000)
}

let songEnd = () => {
    let a = e('audio')
    a.addEventListener('ended', (event) => {
        let index = Number(a.dataset.index)
        index = (index + 1) % 3
        playing()
        updateMusicInfo(index)
    })
}

class PlayBtn {
    constructor() {
        this.btnPlay = [
            'btnPlay',
            'btnPause',
            function (a) {
                a.play()
            }
        ];
        this.btnPause = [
            'btnPause',
            'btnPlay',
            function (a) {
                a.pause()
            }
        ];
    }

    clickPlayBTn(a, self, className) {
        let n = className
        this[n][2](a)
        self.classList.remove(this[n][0])
        self.classList.add(this[n][1])
    }
}

let bindEventPlay = () => {
    let a = e('audio')
    let playBtn = e('.btn-play')
    playBtn.addEventListener('click', (event) => {
        let self = event.target
        let className = self.classList.value
        let p = new PlayBtn()
        p.clickPlayBTn(a, self, className)
    })
}

let bindEventNext = () => {
    let a = e('audio')
    let btnNext = e('.btnNext')
    btnNext.addEventListener('click', (event) => {
        let index = Number(a.dataset.index)
        index = (index + 1) % 3
        updateMusicInfo(index)
        playing()
        let playBtn = e('.btn-play')
        let element = playBtn.querySelector('div')
        element.classList.remove('btnPlay')
        element.classList.add('btnPause')
    })
}


let timeProgress = () => {
    let a = e('audio')
    let bar = e('.music-progress-bar')
    setInterval(() => {
        let prcnt = a.currentTime / a.duration
        bar.style.width = `${prcnt * 100}%`
    }, 1000/24)
}

let volumeProgress = () => {
    let a = e('audio')
    let bar = e('.volume-progress-bar')
    let point = e('.volume-progress-point')
    let range = e('.volume-progress-range')

    point.addEventListener('mousedown', (event) => {
        let initialX = range.getBoundingClientRect().left + range.offsetWidth
        let callback = (event) => {
            let overX = event.clientX
            let l = initialX - overX
            if (l < 0) {
                l = 0
            } else if (l > 60) {
                l = 60
            }
            a.volume = 1 - l / 60
            point.style.left = `${55 - l}px`
            bar.style.width = `${((60 - l) / 60) * 100}%`
        }
        window.addEventListener('mousemove', callback)
        window.addEventListener('mouseup', (event) => {
            window.removeEventListener('mousemove', callback)
        })
    })

}

let progress = () => {
    timeProgress()
    volumeProgress()
}

let bindEvents = () => {
    bindEventPlay()
    bindEventNext()
}

let __main = () => {
    currentTime()
    songEnd()
    totalTime()
    nameAndSinger()
    bindEvents()
    progress()
}

__main()
