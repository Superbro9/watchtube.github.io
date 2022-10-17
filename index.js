function setupCarousel(selector, things, type) {
  let current = 0
  const next = document.querySelector(
    `.carousel-container.${selector} .button.next`
  )
  const prev = document.querySelector(
    `.carousel-container.${selector} .button.prev`
  )

  for (let i in things) {
    const it = things[i]
    if (type == 'images') {
      const full = document.createElement('div')
      full.classList.add('item')

      const inner = document.createElement('img')
      inner.src = it

      full.append(inner)

      document
        .querySelector(`.carousel-container.${selector} .carousel`)
        .append(full)

      const thumbnail = document.createElement('div')
      thumbnail.classList.add('item')
      thumbnail.dataset.index = i
      thumbnail.onclick = () => {
        changePage(parseInt(i))
      }

      const thumbInner = document.createElement('img')
      thumbInner.src = it
      thumbnail.append(thumbInner)

      document
        .querySelector(`.carousel-container.${selector} .preview`)
        .append(thumbnail)
    } else if (type == 'articles') {
      const div = document.createElement('div')
      div.classList.add('item')

      const inner = document.createElement('span')
      inner.classList.add('review')
      inner.innerHTML = `
                <span class="text">${it.review}</span>
                <span class="author">- ${it.author}</span>
            `
      inner.onclick = () => {
        window.open(it.link)
      }
      div.append(inner)
      document
        .querySelector(`.carousel-container.${selector} .carousel`)
        .append(div)
    }
  }

  const items = document.querySelectorAll(
    `.carousel-container.${selector} .carousel .item`
  )

  function changePage(type) {
    if (type === true) {
      current == items.length - 1 ? (current = 0) : current++
    } else if (type === false) {
      current == 0 ? (current = items.length - 1) : current--
    } else if (typeof type == 'number') {
      current = type
    }
    items.forEach((item, i) => {
      item.style.transform = `translateX(${(i - current) * 100}%)`
    })
    if (document.querySelector(`.carousel-container.${selector} .preview`)) {
      document
        .querySelectorAll(`.carousel-container.${selector} .preview .item`)
        .forEach(e => e.classList.remove('active'))
      document
        .querySelector(
          `.carousel-container.${selector} .preview .item[data-index="${current}"]`
        )
        .classList.add('active')
    }
  }

  next.onclick = () => changePage(true)
  prev.onclick = () => changePage(false)
  setInterval(() => changePage(true), 5000)
  changePage()
}

const screenshots = [
  'assets/Channel.png',
  'assets/Home.png',
  'assets/Library.png',
  'assets/Player.png',
  'assets/PrePlay.png',
  'assets/Search.png'
]

const articles = [
  {
    review: 'Surprisingly good for a platform as complex as YouTube',
    author: '9to5Mac',
    link: 'https://9to5mac.com/2022/06/21/watch-youtube-videos-on-your-apple-watch-with-watchtube/'
  },
  {
    review: 'The app is almost as feature-filled as the official YouTube app',
    author: 'KnowTechie',
    link: 'https://knowtechie.com/watchtube-app-youtube-videos/'
  },
  {
    review: 'The ridiculousness of WatchTube knows no bounds',
    author: 'Digital Trends',
    link: 'https://www.digitaltrends.com/mobile/this-youtube-apple-watch-app-is-just-as-ridiculous-as-youd-expect/'
  },
  {
    review: "It's a novel use of the Apple Watch",
    author: 'Gizmodo',
    link: 'https://gizmodo.com/youtube-apple-watch-free-app-video-smartwatch-watchtube-1849092679'
  },
  {
    review: "Isn't quite the ideal viewing experience, but it's a cool idea",
    author: 'MacWorld',
    link: 'https://www.macworld.com/article/793590/apple-watch-youtube-videos-watchtube-app.html'
  },
  {
    review:
      "It's pretty neat how the app was able to replicate so many of YouTube's interface features",
    author: "Tom's Guide",
    link: 'https://www.tomsguide.com/news/how-to-watch-youtube-on-your-apple-watch-if-you-really-want-to'
  }
  // {
  //     review: "",
  //     author: "",
  //     link: ""
  // }
]

setupCarousel('screenshots', screenshots, 'images')
setupCarousel('articles', articles, 'articles')

const manifest = 'https://manifest.watchtube.app'

async function fetchServers() {
  return await (await fetch(manifest + '/index.json')).json()
}

async function fetchFAQ() {
  return await (await fetch(manifest + '/faq.json')).json()
}

async function faqSetup() {
  const faqList = await fetchFAQ()
  faqList.forEach((f, i) => {
    const item = document.createElement('div')
    item.classList.add('item')
    item.dataset.index = i
    item.innerHTML = `
        <div class="info">
            <span class="title">${f.title}</span>
            <i class="expand fa-solid fa-chevron-down"></i>
            <i class="collapse fa-solid fa-chevron-up"></i>
        </div>
        <div class="more">
            ${f.contents
              .map(c => {
                if (c.type == 'image') {
                  return `
                    <div class="section">
                        <img src="${c.content}" alt="">
                    </div>
                    `
                } else {
                  return `
                    <div class="section">
                        <span>${c.content}</span>
                    </div>
                    `
                }
              })
              .join('')}
        </div>
        `
    item.onclick = () => {
      const section = document.querySelector(`.faq .item[data-index="${i}"]`)
      const more = section.querySelector('.more')
      if (!section) return
      if (section.classList.contains('expanded')) {
        more.style.height = '0px'
        section.classList.remove('expanded')
      } else {
        const height = more.scrollHeight
        more.style.height = height + 'px'
        section.classList.add('expanded')
      }
    }
    document.querySelector('.faq').append(item)
  })
}

faqSetup()

document.querySelector('.nav .hamburger').onclick = () => {
  document.querySelector('.nav').classList.toggle('hamburger-active')
}

window.onclick = e => {
  if (
    document.querySelector('.nav').classList.contains('hamburger-active') &&
    (e.target.tagName === 'A' || e.target.classList.contains('nav'))
  )
    document.querySelector('.nav').classList.remove('hamburger-active')
}

window.onresize = () => {
  if (document.body.scrollWidth > 550)
    document.querySelector('.nav').classList.remove('hamburger-active')
}
