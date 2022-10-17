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
