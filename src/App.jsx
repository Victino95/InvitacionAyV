import { useEffect, useMemo, useRef, useState } from 'react'
import { FiArrowRight, FiHeart } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const mediaBaseUrl = `${import.meta.env.BASE_URL}media/`
const flowerImageUrl = `${mediaBaseUrl}images/flower.png`
const siteBackgroundUrl = `${mediaBaseUrl}images/fondo.png`
const introVideoUrl = `${mediaBaseUrl}videos/sobre.mp4`

const targetDate = new Date('2027-08-14T19:30:00')

const invitationCover = {
  dateLabel: '20 · JUNIO · 2027',
  names: ['ALMUDENA', 'VÍCTOR'],
  quote: [
    'Hay historias que comienzan con una mirada.',
    "La nuestra continúa con un 'sí, quiero'.",
  ],
}

const agendaIcons = {
  ceremony: <img src={`${mediaBaseUrl}images/ceremony.svg`} alt="" loading="lazy" decoding="async" />,
  cocktail: <img src={`${mediaBaseUrl}images/cocktail.svg`} alt="" loading="lazy" decoding="async" />,
  dinner: <img src={`${mediaBaseUrl}images/dinner.svg`} alt="" loading="lazy" decoding="async" />,
  dance: <img src={`${mediaBaseUrl}images/party.svg`} alt="" loading="lazy" decoding="async" />,
  hotel: <img src={`${mediaBaseUrl}images/sleep.svg`} alt="" loading="lazy" decoding="async" />,
}

const weddingAgenda = [
  {
    time: '19:30 PM',
    title: 'Ceremonia',
    side: 'right',
    icon: 'ceremony',
  },
  {
    time: '20:00 PM',
    title: 'Cocktail',
    side: 'right',
    icon: 'cocktail',
  },
  {
    time: '21:30 PM',
    title: 'Cena y brindis',
    side: 'right',
    icon: 'dinner',
  },
  {
    time: '23:30 PM',
    title: 'First Dance',
    side: 'right',
    icon: 'dance',
  },
  {
    time: '06:00 AM',
    title: 'A dormir',
    side: 'right',
    icon: 'hotel',
  },
]

const weddingGallery = [
  {
    src: 'https://picsum.photos/id/1027/1200/1500',
    alt: 'Pareja caminando entre flores al atardecer',
  },
  {
    src: 'https://picsum.photos/id/1062/1200/1500',
    alt: 'Ramo de novia sobre vestido de encaje',
  },
  {
    src: 'https://picsum.photos/id/1074/1200/1500',
    alt: 'Detalle de manos con anillos y luz cálida',
  },
  {
    src: 'https://picsum.photos/id/1081/1200/1500',
    alt: 'Mesa de celebración con velas y flores',
  },
  {
    src: 'https://picsum.photos/id/1035/1200/1500',
    alt: 'Novios en ceremonia al aire libre',
  },
  {
    src: 'https://picsum.photos/id/1068/1200/1500',
    alt: 'Copas brindando en una cena elegante',
  },
]

function App() {
  const videoRef = useRef(null)
  const carouselShellRef = useRef(null)
  const carouselViewportRef = useRef(null)
  const carouselTrackRef = useRef(null)
  const countdownSectionRef = useRef(null)
  const [showIntro, setShowIntro] = useState(true)
  const [experienceStarted, setExperienceStarted] = useState(false)
  const [introPlaybackStarted, setIntroPlaybackStarted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [videoCompleted, setVideoCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const distance = targetDate.getTime() - now.getTime()

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((distance / (1000 * 60)) % 60)
      const seconds = Math.floor((distance / 1000) % 60)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    updateCountdown()
    const timer = window.setInterval(updateCountdown, 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!experienceStarted) return

    const elements = document.querySelectorAll('.chapter')

    elements.forEach((element, index) => {
      const target = element.querySelector('.chapter__inner')
      if (!target) return

      const isCover = target.classList.contains('cover-hero')
      if (isCover) return

      gsap.fromTo(
        target,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 86%',
            onEnter: () => target.classList.add('chapter-frame--revealed'),
            onEnterBack: () => target.classList.add('chapter-frame--revealed'),
            onLeaveBack: () => target.classList.remove('chapter-frame--revealed'),
            toggleActions: 'play none none reverse',
          },
        },
      )

      if (index === 0) {
        gsap.fromTo(
          target,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' },
        )
      }
    })

    const cover = document.querySelector('.cover-hero')
    if (cover) {
      const coverDate = cover.querySelector('.cover-date')
      const coverNames = cover.querySelector('.cover-names-group')
      const coverQuote = cover.querySelector('.cover-quote')
      const coverOrnament = cover.querySelector('.cover-ornament')
      const coverScroll = cover.querySelector('.cover-scroll')

      gsap.set([coverDate, coverNames, coverQuote, coverOrnament, coverScroll], {
        opacity: 0,
        y: 18,
      })

      const coverTl = gsap.timeline({ defaults: { ease: 'power2.out' } })

      coverTl
        .to(coverDate, { opacity: 1, y: 0, duration: 0.9 })
        .to(coverNames, { opacity: 1, y: 0, duration: 1.25 }, '-=0.25')
        .to(coverQuote, { opacity: 1, y: 0, duration: 0.95 }, '-=0.15')
        .to(coverOrnament, { opacity: 1, y: 0, duration: 0.85 }, '-=0.2')
        .to(coverScroll, { opacity: 1, y: 0, duration: 0.85 }, '-=0.15')

      gsap.to('.cover-glow', {
        opacity: 0.55,
        duration: 1.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }

    const scheduleShell = document.querySelector('.schedule-shell')
    if (scheduleShell) {
      const scheduleItems = scheduleShell.querySelectorAll('.schedule-item')
      const scheduleIcons = scheduleShell.querySelectorAll('.schedule-icon')

      gsap.set(scheduleItems, { opacity: 0, y: 26 })
      gsap.set(scheduleIcons, { scale: 0.9, transformOrigin: '50% 50%' })

      ScrollTrigger.create({
        trigger: scheduleShell,
        start: 'top 78%',
        onEnter: () => scheduleShell.classList.add('schedule-shell--revealed'),
        onLeaveBack: () => scheduleShell.classList.remove('schedule-shell--revealed'),
      })

      gsap.to(scheduleItems, {
        opacity: 1,
        y: 0,
        duration: 0.95,
        ease: 'power2.out',
        stagger: 0.14,
        scrollTrigger: {
          trigger: scheduleShell,
          start: 'top 78%',
        },
      })

      gsap.to(scheduleIcons, {
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.14,
        scrollTrigger: {
          trigger: scheduleShell,
          start: 'top 78%',
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [experienceStarted])

  useEffect(() => {
    if (!experienceStarted) return

    const shell = carouselShellRef.current
    const viewport = carouselViewportRef.current
    const track = carouselTrackRef.current

    if (!shell || !viewport || !track) return

    let currentX = 0
    let isPointerDown = false
    let isHorizontalDrag = false
    let activePointerId = null
    let startX = 0
    let startY = 0
    let lastClientX = 0
    let activePointerType = 'mouse'
    let momentumTween = null
    let settleTween = null
    const samples = []

    const setTrackX = gsap.quickSetter(track, 'x', 'px')

    const getSlideStep = () => {
      const firstSlide = track.querySelector('.photo-carousel__slide')
      if (!firstSlide) return 0

      const slideWidth = firstSlide.getBoundingClientRect().width
      const trackStyles = window.getComputedStyle(track)
      const gap = Number.parseFloat(trackStyles.gap || '0')

      return slideWidth + gap
    }

    const render = () => {
      setTrackX(currentX)
    }

    const cycleSlides = () => {
      const step = getSlideStep()
      if (!step) return

      let guard = 0
      while (currentX <= -step && guard < 24) {
        const first = track.firstElementChild
        if (!first) break
        track.appendChild(first)
        currentX += step
        guard += 1
      }

      guard = 0
      while (currentX >= step && guard < 24) {
        const last = track.lastElementChild
        if (!last) break
        track.insertBefore(last, track.firstElementChild)
        currentX -= step
        guard += 1
      }

      render()
    }

    const pushSample = (x) => {
      const now = performance.now()
      samples.push({ x, now })

      while (samples.length > 8) {
        samples.shift()
      }
    }

    const stopMomentum = () => {
      if (momentumTween) momentumTween.kill()
      if (settleTween) settleTween.kill()
      momentumTween = null
      settleTween = null
    }

    const onPointerDown = (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return

      stopMomentum()
      isPointerDown = true
      isHorizontalDrag = false
      activePointerId = event.pointerId
      activePointerType = event.pointerType || 'mouse'
      startX = event.clientX
      startY = event.clientY
      lastClientX = event.clientX
      samples.length = 0
      pushSample(currentX)
    }

    const onPointerMove = (event) => {
      if (!isPointerDown || event.pointerId !== activePointerId) return

      const totalDx = event.clientX - startX
      const totalDy = event.clientY - startY

      if (!isHorizontalDrag) {
        if (Math.abs(totalDx) > Math.abs(totalDy) + 5) {
          isHorizontalDrag = true
          viewport.setPointerCapture(activePointerId)
        } else if (Math.abs(totalDy) > Math.abs(totalDx) + 5) {
          isPointerDown = false
          activePointerId = null
          return
        } else {
          return
        }
      }

      event.preventDefault()

      const deltaX = event.clientX - lastClientX
      lastClientX = event.clientX
      const dampedDeltaX =
        activePointerType === 'touch' ? gsap.utils.clamp(-26, 26, deltaX) : deltaX
      const dragFactor = activePointerType === 'touch' ? 0.72 : 0.86
      currentX += dampedDeltaX * dragFactor
      pushSample(currentX)
      cycleSlides()
    }

    const onPointerUpOrCancel = (event) => {
      if (event.pointerId !== activePointerId) return

      const wasHorizontalDrag = isHorizontalDrag

      isPointerDown = false
      isHorizontalDrag = false

      if (viewport.hasPointerCapture(event.pointerId)) {
        viewport.releasePointerCapture(event.pointerId)
      }

      activePointerId = null

      if (!wasHorizontalDrag) return

      pushSample(currentX)

      const step = getSlideStep()
      if (!step) return

      const recent = samples.filter((sample) => performance.now() - sample.now <= 130)
      const first = recent[0] || samples[0]
      const last = recent[recent.length - 1] || samples[samples.length - 1]

      const velocity =
        first && last && last.now !== first.now
          ? (last.x - first.x) / (last.now - first.now)
          : 0

      const isTouchLike = activePointerType === 'touch' || activePointerType === 'pen'
      const velocityProjection = isTouchLike ? 120 : 170
      const maxMomentumDistance = isTouchLike ? step * 0.72 : step * 1.05
      const projectedDistance = gsap.utils.clamp(
        -maxMomentumDistance,
        maxMomentumDistance,
        velocity * velocityProjection,
      )
      const projected = currentX + projectedDistance
      const rawTarget = Math.round(projected / step) * step
      const target = gsap.utils.clamp(-step, step, rawTarget)
      const tweenState = { x: currentX }

      momentumTween = gsap.to(tweenState, {
        x: target,
        duration: isTouchLike ? 0.48 : 0.44,
        ease: 'power2.out',
        onUpdate: () => {
          currentX = tweenState.x
          cycleSlides()
        },
        onComplete: () => {
          const settleTarget = Math.round(currentX / step) * step
          const settleState = { x: currentX }

          settleTween = gsap.to(settleState, {
            x: settleTarget,
            duration: 0.22,
            ease: 'power2.out',
            onUpdate: () => {
              currentX = settleState.x
              cycleSlides()
            },
          })
        },
      })
    }

    const onWheel = (event) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return

      event.preventDefault()
      stopMomentum()
      currentX -= event.deltaX
      cycleSlides()
    }

    const introTween = gsap.fromTo(
      shell,
      { autoAlpha: 0, y: 16 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: shell,
          start: 'top 88%',
          once: true,
        },
      },
    )

    viewport.addEventListener('pointerdown', onPointerDown)
    viewport.addEventListener('pointermove', onPointerMove, { passive: false })
    viewport.addEventListener('pointerup', onPointerUpOrCancel)
    viewport.addEventListener('pointercancel', onPointerUpOrCancel)
    viewport.addEventListener('wheel', onWheel, { passive: false })

    cycleSlides()

    return () => {
      stopMomentum()
      introTween.kill()
      viewport.removeEventListener('pointerdown', onPointerDown)
      viewport.removeEventListener('pointermove', onPointerMove)
      viewport.removeEventListener('pointerup', onPointerUpOrCancel)
      viewport.removeEventListener('pointercancel', onPointerUpOrCancel)
      viewport.removeEventListener('wheel', onWheel)
    }
  }, [experienceStarted])

  const countdownItems = useMemo(
    () => [
      { value: timeLeft.days, label: 'Días' },
      { value: timeLeft.hours, label: 'Horas' },
      { value: timeLeft.minutes, label: 'Min' },
      { value: timeLeft.seconds, label: 'Seg' },
    ],
    [timeLeft],
  )

  const handleEnterExperience = async () => {
    if (isTransitioning || introPlaybackStarted) return

    setIntroPlaybackStarted(true)

    if (videoRef.current) {
      try {
        videoRef.current.currentTime = 0
        await videoRef.current.play()
      } catch (error) {
        setIntroPlaybackStarted(false)
        console.warn('No se pudo iniciar el vídeo automáticamente.', error)
      }
    }
  }

  const handleIntroVideoEnded = () => {
    setVideoCompleted(true)
    setExperienceStarted(true)
    setIsTransitioning(true)

    window.setTimeout(() => {
      setShowIntro(false)
      setIsTransitioning(false)
    }, 1320)
  }

  const handleScrollToCountdown = (event) => {
    event.preventDefault()
    countdownSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const experienceMediaStyles = {
    '--fondo-image': `url("${siteBackgroundUrl}")`,
    '--flower-image': `url("${flowerImageUrl}")`,
  }

  return (
    <main className={`experience ${isTransitioning ? 'experience--transitioning' : ''}`} style={experienceMediaStyles}>
      {showIntro && (
        <section className="chapter chapter--intro">
          <div
            className={`intro-video ${videoCompleted ? 'is-faded' : ''}`}
            role="button"
            tabIndex={0}
            onClick={handleEnterExperience}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                handleEnterExperience()
              }
            }}
          >
            <video
              ref={videoRef}
              muted
              preload="auto"
              playsInline
              onEnded={handleIntroVideoEnded}
            >
              <source src={introVideoUrl} type="video/mp4" />
            </video>
            <div className="intro-overlay" />
            {!introPlaybackStarted && <span className="intro-action">Toca para entrar</span>}
          </div>
        </section>
      )}

      {experienceStarted && (
        <div className={`experience__content ${isTransitioning ? 'experience__content--entering' : 'experience__content--entered'}`}>
          <section className="chapter chapter--cover">
            <div className="chapter__inner cover-hero">
              <p className="cover-date">{invitationCover.dateLabel}</p>

              <div className="cover-names-group" aria-label="Nombres de la pareja">
                <h1 className="cover-name">{invitationCover.names[0]}</h1>
                <div className="cover-ampersand">&</div>
                <h1 className="cover-name">{invitationCover.names[1]}</h1>
                <span className="cover-glow" aria-hidden="true" />
              </div>

              <p className="cover-quote">
                {invitationCover.quote[0]}
                <br />
                {invitationCover.quote[1]}
              </p>

              <div className="cover-ornament" aria-hidden="true">
                <span className="cover-ornament-line" />
                <span className="cover-ornament-mark">A & V</span>
                <span className="cover-ornament-line" />
              </div>

              <div className="cover-scroll" aria-hidden="true">
                <span>Desliza para descubrir</span>
                <span className="cover-scroll-arrow">↓</span>
              </div>
            </div>
          </section>

          <section className="chapter">
            <div className="chapter__inner detail-shell chapter-frame frame-cyan section-bg-date">
              <p className="eyebrow">14 Agosto 2027</p>
              <h3>Nos reuniremos al caer la tarde, con el aire suave de la vera y la emoción de quien espera algo bonito.</h3>
              <a className="button button--primary" href="/" onClick={handleScrollToCountdown}>
                Continuar <FiArrowRight />
              </a>
            </div>
          </section>

          <section id="countdown" className="chapter" ref={countdownSectionRef}>
            <div className="chapter__inner countdown-shell chapter-frame frame-cyan section-bg-countdown">
              <h3 className="countdown-title">El tiempo se vuelve pequeño.</h3>
              <div className="countdown-grid">
                {countdownItems.map((item) => (
                  <div className="countdown-card" key={item.label}>
                    <span>{String(item.value).padStart(2, '0')}</span>
                    <small>{item.label}</small>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="chapter">
            <div className="chapter__inner chapter-frame frame-cyan section-bg-countdown">
              <div className="photo-carousel" ref={carouselShellRef} aria-label="Galería de recuerdos" role="region">
                <div className="photo-carousel__viewport" ref={carouselViewportRef}>
                  <div className="photo-carousel__track" ref={carouselTrackRef}>
                    {weddingGallery.map((photo) => (
                      <figure className="photo-carousel__slide" key={photo.src}>
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          loading="lazy"
                          decoding="async"
                          draggable="false"
                        />
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="chapter">
            <div className="chapter__inner schedule-shell chapter-frame frame-soft-pink section-bg-ceremony-celebration">
              <h3 className="schedule-title">La cronología del día</h3>
              <div className="schedule-timeline" role="list" aria-label="Agenda de ceremonia y celebración">
                {weddingAgenda.map((event) => (
                  <article
                    key={`${event.time}-${event.title}`}
                    className={`schedule-item schedule-item--${event.side}`}
                    role="listitem"
                  >
                    <p className="schedule-time">{event.time}</p>
                    <div className="schedule-node" aria-hidden="true" />
                    <div className="schedule-detail">
                      <span className="schedule-icon" aria-hidden="true">
                        {agendaIcons[event.icon]}
                      </span>
                      <p className="schedule-label">{event.title}</p>
                    </div>
                  </article>
                ))}
              </div>
              <a className="button button--secondary schedule-map" href="https://www.google.com/maps" target="_blank" rel="noreferrer">
                Ver ubicación principal
              </a>
            </div>
          </section>

          <section className="chapter">
            <div className="chapter__inner card-shell chapter-frame frame-teal section-bg-dresscode">
              <div className="card">
                <p className="eyebrow">Dress Code</p>
                <h3>Elegancia romántica</h3>
                <p>Colores suaves, tejidos fluidos y una estética que acompañe la noche.</p>
              </div>
            </div>
          </section>

          <section className="chapter">
            <div className="chapter__inner rsvp-shell chapter-frame frame-rose-deep section-bg-rsvp">
              <div className="rsvp-card">
                <p className="eyebrow">RSVP</p>
                <h3>Tu presencia será el mejor regalo.</h3>
                <form className="rsvp-form">
                  <label>
                    Nombre
                    <input type="text" placeholder="Tu nombre" />
                  </label>
                  <label>
                    Confirmación
                    <select defaultValue="">
                      <option value="" disabled>Selecciona una opción</option>
                      <option value="si">Sí, asistiré</option>
                      <option value="no">No podré asistir</option>
                    </select>
                  </label>
                  <label>
                    Mensaje
                    <textarea rows="4" placeholder="Un pequeño mensaje para nosotros" />
                  </label>
                  <button type="button" className="button button--primary">
                    Enviar respuesta <FiArrowRight />
                  </button>
                </form>
              </div>
            </div>
          </section>

          <section className="chapter chapter--final">
            <div className="chapter__inner final-shell chapter-frame frame-cyan-alt section-bg-final">
              <p className="eyebrow">Gracias</p>
              <h3>Nos vemos muy pronto.</h3>
              <div className="heart-icon"><FiHeart /></div>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}

export default App
