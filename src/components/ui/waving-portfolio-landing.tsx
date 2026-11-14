"use client"

// Waving Portfolio Landing — a red-on-paper poster landing page. A storm of
// condensed capitals streams across the screen, shutters away, and every letter
// of the headline rolls into place like a slot reel; the giant shared letter
// lands last and the poster thumps. Then the rules draw, the labels decode, the
// dice corners slide in, and a hand-inked character rises from behind the
// baseline, raises his arm, waves, and leans into the pose.
//
// Hover a letter and it re-rolls. Hover or click the character and he waves
// back (his eyes follow the pointer). Click the dice to roll them, click the
// paper to throw letters, click the signature to replay the whole intro.
// Everything is drawn in this file — no fonts, images or packages load.
import * as React from "react"

// #region glyphs
// Monoline condensed capitals, drawn as centre-line paths and stroked with
// square caps, so every letter fills its [0, w] x [0, h] box exactly at any
// stroke weight. Round letters are stadiums, like the poster face they mimic.
const WIDE: Record<string, number> = { A: 1.04, M: 1.3, N: 1.04, Q: 1.02, V: 1.04, W: 1.44, X: 1.02 }

function glyphWidth(ch: string, w: number, s: number): number {
  if (ch === "I") return s
  if (ch === " ") return w * 0.5
  return w * (WIDE[ch] ?? 1)
}

function glyphPath(ch: string, w: number, h: number, s: number): string {
  const i = s / 2
  const x0 = i
  const x1 = w - i
  const y0 = i
  const y1 = h - i
  const xm = w / 2
  const ym = h / 2
  const bw = x1 - x0
  const bh = y1 - y0
  const r = bw / 2
  const c = Math.min(bw * 0.62, bh / 4)
  const q = (...parts: (string | number)[]) =>
    parts.map((p) => (typeof p === "number" ? String(Math.round(p * 10) / 10) : p)).join(" ")
  const arc = (rad: number, sweep: 0 | 1, x: number, y: number) => q("A", rad, rad, 0, 0, sweep, x, y)
  const stadium = q("M", x0, y0 + r) + arc(r, 1, x1, y0 + r) + q("L", x1, y1 - r) + arc(r, 1, x0, y1 - r) + "Z"
  const open = q("M", x1, y0 + r) + arc(r, 0, x0, y0 + r) + q("L", x0, y1 - r) + arc(r, 0, x1, y1 - r)
  const bowl = (yb: number) => {
    const k = Math.min(c, (yb - y0) / 2)
    return q("M", x0, y1, "L", x0, y0, "L", x1 - k, y0) + arc(k, 1, x1, y0 + k) + q("L", x1, yb - k) + arc(k, 1, x1 - k, yb) + q("L", x0, yb)
  }
  switch (ch) {
    case "A": {
      const ay = y0 + bh * 0.64
      const t = (y1 - ay) / bh
      return q("M", x0, y1, "L", xm, y0, "L", x1, y1, "M", x0 + (xm - x0) * t, ay, "L", x1 - (x1 - xm) * t, ay)
    }
    case "B": {
      const yb = y0 + bh * 0.47
      const xt = x1 - s * 0.4
      const ct = Math.min(c, (yb - y0) / 2, xt - x0)
      const cb = Math.min(c, (y1 - yb) / 2, bw)
      return (
        q("M", x0, yb, "L", xt - ct, yb) + arc(ct, 0, xt, yb - ct) + q("L", xt, y0 + ct) + arc(ct, 0, xt - ct, y0) +
        q("L", x0, y0, "L", x0, y1, "L", x1 - cb, y1) + arc(cb, 0, x1, y1 - cb) + q("L", x1, yb + cb) + arc(cb, 0, x1 - cb, yb) +
        q("L", x0, yb)
      )
    }
    case "C":
      return open
    case "D": {
      const k = Math.min(bw * 0.75, bh / 2)
      return q("M", x0, y0, "L", x1 - k, y0) + arc(k, 1, x1, y0 + k) + q("L", x1, y1 - k) + arc(k, 1, x1 - k, y1) + q("L", x0, y1) + "Z"
    }
    case "E":
      return q("M", x1, y0, "L", x0, y0, "L", x0, y1, "L", x1, y1, "M", x0, ym, "L", x1 - bw * 0.12, ym)
    case "F":
      return q("M", x1, y0, "L", x0, y0, "L", x0, y1, "M", x0, ym - bh * 0.02, "L", x1 - bw * 0.12, ym - bh * 0.02)
    case "G":
      return open + q("L", x1, ym + bh * 0.04, "L", xm, ym + bh * 0.04)
    case "H":
      return q("M", x0, y0, "L", x0, y1, "M", x1, y0, "L", x1, y1, "M", x0, ym, "L", x1, ym)
    case "I":
      return q("M", xm, y0, "L", xm, y1)
    case "J":
      return q("M", x1, y0, "L", x1, y1 - r) + arc(r, 1, x0, y1 - r) + q("L", x0, y1 - r - bh * 0.06)
    case "K":
      return q("M", x0, y0, "L", x0, y1, "M", x1, y0, "L", x0, y0 + bh * 0.62, "M", x0 + bw * 0.28, y0 + bh * 0.47, "L", x1, y1)
    case "L":
      return q("M", x0, y0, "L", x0, y1, "L", x1, y1)
    case "M":
      return q("M", x0, y1, "L", x0, y0, "L", xm, y0 + bh * 0.55, "L", x1, y0, "L", x1, y1)
    case "N":
      return q("M", x0, y1, "L", x0, y0, "L", x1, y1, "L", x1, y0)
    case "O":
      return stadium
    case "P":
      return bowl(y0 + bh * 0.52)
    case "Q":
      return stadium + q("M", xm + bw * 0.1, y1 - bh * 0.16, "L", x1 + s * 0.2, y1 + s * 0.3)
    case "R":
      return bowl(y0 + bh * 0.5) + q("M", x0 + bw * 0.42, y0 + bh * 0.5, "L", x1, y1)
    case "S":
      return q("M", x1, y0 + r) + arc(r, 0, x0, y0 + r) + q("C", x0, ym - bh * 0.02, x1, ym + bh * 0.02, x1, y1 - r) + arc(r, 1, x0, y1 - r)
    case "T":
      return q("M", x0, y0, "L", x1, y0, "M", xm, y0, "L", xm, y1)
    case "U":
      return q("M", x0, y0, "L", x0, y1 - r) + arc(r, 0, x1, y1 - r) + q("L", x1, y0)
    case "V":
      return q("M", x0, y0, "L", xm, y1, "L", x1, y0)
    case "W": {
      const k = bw * 0.24
      return q("M", x0, y0, "L", x0 + k, y1, "L", xm, y0 + bh * 0.3, "L", x1 - k, y1, "L", x1, y0)
    }
    case "X":
      return q("M", x0, y0, "L", x1, y1, "M", x1, y0, "L", x0, y1)
    case "Y":
      return q("M", x0, y0, "L", xm, ym - bh * 0.04, "L", x1, y0, "M", xm, ym - bh * 0.04, "L", xm, y1)
    case "Z":
      return q("M", x0, y0, "L", x1, y0, "L", x0, y1, "L", x1, y1)
    default:
      return ""
  }
}
// #endregion glyphs

// #region layout
// The poster reads as two rows sharing one giant letter:  P [O] RT / F [O] LIO.
// Left rows hug the giant letter, right rows start after the character's gap.
type Cell = { ch: string; x: number; y: number; w: number; h: number; s: number; row: number; giant: boolean }

const LH = 230 // letter height
const LW = 115 // base letter width
const LS = 22 // stroke
const LGAP = 30 // letter spacing
const ROWGAP = 20
const GW = 220 // giant letter base width
const GS = 42 // giant stroke
const MARGIN = 100
const CHAR_GAP = 520 // room between the giant letter and the right rows
const TOP = 100

const cleanRow = (s: string) => s.toUpperCase().replace(/[^A-Z ]/g, "").trim()

function rowWidth(str: string): number {
  let t = 0
  ;[...str].forEach((ch, i) => {
    t += glyphWidth(ch, LW, LS) + (i ? LGAP : 0)
  })
  return t
}

function layoutPoster(left: string[], giant: string, right: string[], compact = false) {
  // Tall containers get a tighter gap and a smaller character, so the poster
  // can fill a phone's width instead of floating in the middle.
  const margin = compact ? 30 : MARGIN
  const charGap = compact ? 390 : CHAR_GAP
  const charScale = compact ? 0.84 : 1
  const l = [cleanRow(left[0] ?? ""), cleanRow(left[1] ?? "")]
  const r = [cleanRow(right[0] ?? ""), cleanRow(right[1] ?? "")]
  const g = cleanRow(giant).replace(/ /g, "").slice(0, 1) || "O"
  const lw = Math.max(rowWidth(l[0]), rowWidth(l[1]))
  const rw = Math.max(rowWidth(r[0]), rowWidth(r[1]))
  const cells: Cell[] = []
  const place = (str: string, x0: number, row: number) => {
    let x = x0
    for (const ch of str) {
      const w = glyphWidth(ch, LW, LS)
      if (ch !== " ") cells.push({ ch, x, y: TOP + row * (LH + ROWGAP), w, h: LH, s: LS, row, giant: false })
      x += w + LGAP
    }
  }
  l.forEach((row, i) => place(row, margin + lw - rowWidth(row), i))
  const gx = margin + lw + (lw ? LGAP : 0)
  const gw = g === "I" ? GS : GW * (WIDE[g] ?? 1)
  const gapStart = gx + gw
  const rx = gapStart + charGap
  r.forEach((row, i) => place(row, rx, i))
  cells.push({ ch: g, x: gx, y: TOP, w: gw, h: LH * 2 + ROWGAP, s: GS, row: 0, giant: true })
  const width = rx + rw + margin
  return { cells, width, height: 700, margin, charScale, gapStart, charX: gapStart + charGap * 0.36, bottom: TOP + LH * 2 + ROWGAP }
}
// #endregion layout

const AZ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}
const LABEL = 30 // label font size, poster units
const labelWidth = (s: string) => s.length * LABEL * 0.72

// Intro timeline, ms. The CSS below carries the same beats.
const SCRAMBLE_AT = 2650
const WAVE_AT = 4950
const READY_AT = 7000
const WAVE_MS = 1500

function useScramble(text: string, startAt: number, token: number, active: boolean) {
  const [out, setOut] = React.useState(active ? "" : text)
  React.useEffect(() => {
    if (!active) {
      setOut(text)
      return
    }
    setOut("")
    let raf = 0
    let last = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const t = now - t0 - startAt
      if (t >= (text.length - 1) * 30 + 320) {
        setOut(text)
        return
      }
      if (t >= 0 && now - last > 45) {
        last = now
        let s = ""
        for (let i = 0; i < text.length && t >= i * 30; i++) {
          const ch = text[i]
          s += ch === " " || t > i * 30 + 320 ? ch : AZ[(Math.random() * 26) | 0]
        }
        setOut(s)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, startAt, token, active])
  return out
}

export type WavingPortfolioLandingProps = {
  /** Top-left label. */
  name?: string
  /** Top-right label. */
  year?: string
  /** Bottom labels, left and right. */
  roles?: [string, string]
  /** Letters left of the giant letter, top row and bottom row. */
  lettersLeft?: [string, string]
  /** The one tall letter both rows share. */
  giantLetter?: string
  /** Letters right of the character, top row and bottom row. */
  lettersRight?: [string, string]
  /** What the drawn headline says, for screen readers. */
  title?: string
  /** Signature badge text; a "/" breaks the line. Defaults to the first name split in two. */
  signature?: string
  /** Speech bubble shown while she waves. */
  greeting?: string
  accent?: string
  paper?: string
  ink?: string
  /** Play the cinematic intro on mount. */
  intro?: boolean
  height?: string
  className?: string
}

type Burst = { id: number; x: number; y: number; bits: { ch: string; dx: number; dy: number; rot: number }[] }

export default function WavingPortfolioLanding({
  name = "Kedhareswer",
  year = "2026",
  roles = ["Graphic Designer", "Illustrator"],
  lettersLeft = ["P", "F"],
  giantLetter = "O",
  lettersRight = ["RT", "LIO"],
  title = "Portfolio",
  signature,
  greeting = "Hi there!",
  accent = "#e5262c",
  paper = "#f6f4f0",
  ink = "#141414",
  intro = true,
  height = "100svh",
  className = "",
}: WavingPortfolioLandingProps) {
  const uid = React.useId().replace(/:/g, "")
  const rootRef = React.useRef<HTMLDivElement>(null)
  const headRef = React.useRef<SVGGElement>(null)
  const frame = React.useRef(0)
  const timers = React.useRef<number[]>([])
  const lastRoll = React.useRef<number[]>([])
  const burstId = React.useRef(0)
  const wavingRef = React.useRef(false)

  const [run, setRun] = React.useState(0)
  const [reduced, setReduced] = React.useState(false)
  const [ready, setReady] = React.useState(!intro)
  const [waving, setWaving] = React.useState(false)
  const [rolls, setRolls] = React.useState<number[]>([])
  const [dice, setDice] = React.useState<[number, number]>([2, 1])
  const [diceSpin, setDiceSpin] = React.useState<[number, number]>([0, 0])
  const [bursts, setBursts] = React.useState<Burst[]>([])
  const [compact, setCompact] = React.useState(false)

  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms)
    timers.current.push(id)
    return id
  }

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => {
      mq.removeEventListener("change", sync)
      timers.current.forEach(clearTimeout)
      cancelAnimationFrame(frame.current)
    }
  }, [])

  React.useEffect(() => {
    const el = rootRef.current
    if (!el || typeof ResizeObserver === "undefined") return
    const ro = new ResizeObserver(([e]) => {
      const { width, height: h } = e.contentRect
      if (width && h) setCompact(width / h < 0.9)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const wave = React.useCallback(() => {
    if (wavingRef.current) return
    wavingRef.current = true
    setWaving(true)
    later(() => {
      wavingRef.current = false
      setWaving(false)
    }, WAVE_MS)
  }, [])

  const playing = intro && !reduced
  React.useEffect(() => {
    if (!playing) {
      setReady(true)
      return
    }
    setReady(false)
    const a = later(wave, WAVE_AT)
    const b = later(() => setReady(true), READY_AT)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [run, playing, wave])

  const L = React.useMemo(
    () => layoutPoster(lettersLeft, giantLetter, lettersRight, compact),
    [lettersLeft.join("|"), giantLetter, lettersRight.join("|"), compact],
  )
  const letters = L.cells.map((c) => c.ch).join("") || "ABC"

  const nameU = name.toUpperCase()
  const yearU = year.toUpperCase()
  const roleL = (roles[0] ?? "").toUpperCase()
  const roleR = (roles[1] ?? "").toUpperCase()
  const nameT = useScramble(nameU, SCRAMBLE_AT, run, playing)
  const yearT = useScramble(yearU, SCRAMBLE_AT + 250, run, playing)
  const roleLT = useScramble(roleL, SCRAMBLE_AT + 150, run, playing)
  const roleRT = useScramble(roleR, SCRAMBLE_AT + 400, run, playing)

  const sig = React.useMemo(() => {
    if (signature) return signature.toUpperCase().split("/").slice(0, 2)
    const first = (name.trim().split(/\s+/)[0] ?? "").toUpperCase().replace(/[^A-Z]/g, "")
    const cut = Math.ceil(first.length / 2)
    return first.length > 3 ? [first.slice(0, cut), first.slice(cut)] : [first]
  }, [signature, name])

  const storm = React.useMemo(() => {
    const pool = letters + letters + AZ
    return Array.from({ length: 7 }, (_, row) => {
      let x = 0
      const half: { ch: string; x: number; w: number }[] = []
      for (let k = 0; k < 34; k++) {
        const ch = pool[Math.floor(hash(row * 97 + k * 13) * pool.length)]
        const w = glyphWidth(ch, 62, 12)
        half.push({ ch, x, w })
        x += w + 26
      }
      return { row, half, span: x }
    })
  }, [letters])

  const onMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType === "touch") return
    const px = e.clientX
    const py = e.clientY
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const root = rootRef.current
      if (!root) return
      const r = root.getBoundingClientRect()
      const k = (v: number, d: number) => Math.max(-1, Math.min(1, v / d))
      root.style.setProperty("--wpl-mx", (((px - r.left) / r.width) * 2 - 1).toFixed(3))
      root.style.setProperty("--wpl-my", (((py - r.top) / r.height) * 2 - 1).toFixed(3))
      const h = headRef.current?.getBoundingClientRect()
      if (!h) return
      const dx = px - (h.left + h.width / 2)
      const dy = py - (h.top + h.height / 2)
      root.style.setProperty("--wpl-ex", (k(dx, 260) * 4.5).toFixed(2))
      root.style.setProperty("--wpl-ey", (k(dy, 260) * 3.5).toFixed(2))
      root.style.setProperty("--wpl-hr", (k(dx, 700) * 7).toFixed(2))
    })
  }

  const onLeave = () => {
    const root = rootRef.current
    if (!root) return
    for (const v of ["--wpl-mx", "--wpl-my", "--wpl-ex", "--wpl-ey", "--wpl-hr"]) root.style.setProperty(v, "0")
  }

  const onDown = (e: React.PointerEvent) => {
    if (reduced) return
    if ((e.target as Element).closest("button,.wpl-char,.wpl-cell")) return
    const r = rootRef.current?.getBoundingClientRect()
    if (!r) return
    const bits = Array.from({ length: 10 }, (_, i) => {
      const a = (i / 10) * Math.PI * 2 + Math.random() * 0.5
      const d = 50 + Math.random() * 90
      return {
        ch: letters[(Math.random() * letters.length) | 0],
        dx: Math.cos(a) * d,
        dy: Math.sin(a) * d - 24,
        rot: (Math.random() - 0.5) * 260,
      }
    })
    const id = ++burstId.current
    setBursts((b) => [...b.slice(-5), { id, x: e.clientX - r.left, y: e.clientY - r.top, bits }])
    later(() => setBursts((b) => b.filter((q) => q.id !== id)), 1100)
  }

  const reroll = (i: number) => {
    if (!ready || reduced) return
    const now = performance.now()
    if (now - (lastRoll.current[i] ?? 0) < 750) return
    lastRoll.current[i] = now
    setRolls((r) => {
      const n = [...r]
      n[i] = (n[i] ?? 0) + 1
      return n
    })
  }

  const rollDie = (k: 0 | 1) => {
    setDice((d) => {
      const n: [number, number] = [d[0], d[1]]
      let v = n[k]
      while (v === n[k]) v = 1 + ((Math.random() * 6) | 0)
      n[k] = v
      return n
    })
    setDiceSpin((s) => (k === 0 ? [s[0] + 1, s[1]] : [s[0], s[1] + 1]))
  }

  const replay = () => {
    setRolls([])
    setBursts([])
    wavingRef.current = false
    setWaving(false)
    if (playing) setRun((r) => r + 1)
    else wave()
  }

  const onCharKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      wave()
    }
  }

  const stage = !intro ? "off" : ready ? "done" : "on"
  const nameEnd = L.margin + labelWidth(nameU) + 26
  const yearStart = L.width - L.margin - labelWidth(yearU) - 26
  const roleLEnd = L.margin + labelWidth(roleL) + 26
  const roleRStart = L.width - L.margin - labelWidth(roleR) - 26
  const bubbleW = greeting.length * 19 + 48
  const k = L.charScale
  const charLeft = L.charX - 205 * k

  return (
    <div
      ref={rootRef}
      className={"wpl-root " + className}
      data-intro={stage}
      style={{ height, "--wpl-accent": accent, "--wpl-paper": paper, "--wpl-ink": ink } as React.CSSProperties}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerDown={onDown}
    >
      <style>{WPL_CSS}</style>
      <h1 className="wpl-sr">{title}</h1>
      <p className="wpl-sr">
        {name}, {roles.filter(Boolean).join(" and ")}, {year}
      </p>

      <div className="wpl-stage" key={run}>
        <svg className="wpl-poster" viewBox={"0 0 " + L.width + " " + L.height} preserveAspectRatio="xMidYMid meet">
          <g className="wpl-par-lines" aria-hidden="true">
            <text className="wpl-label" x={L.margin} y={73}>{nameT}</text>
            <text className="wpl-label" x={L.width - L.margin} y={73} textAnchor="end">{yearT}</text>
            <Rule a={nameEnd} b={yearStart} y={62} mid delay={2.55} color={accent} />
            <text className="wpl-label" x={L.margin} y={663}>{roleLT}</text>
            <text className="wpl-label" x={L.width - L.margin} y={663} textAnchor="end">{roleRT}</text>
            <Rule a={roleLEnd} b={roleRStart} y={652} delay={2.75} color={accent} />
          </g>

          <g className="wpl-par-letters" aria-hidden="true">
            {L.cells.map((c, i) => (
              <LetterCell
                key={i}
                c={c}
                i={i}
                roll={rolls[i] ?? 0}
                intro={playing}
                delay={c.giant ? 1.75 : 1 + (c.x / L.width) * 0.55 + c.row * 0.1}
                color={accent}
                onEnter={() => reroll(i)}
              />
            ))}
          </g>

          <g className="wpl-par-char">
            <svg x={charLeft} y={605 - 600 * k} width={460 * k} height={600 * k} viewBox="0 0 460 600" overflow="hidden">
              <g
                className={"wpl-char" + (waving ? " is-waving" : "")}
                role="button"
                tabIndex={0}
                aria-label="Wave hello"
                onPointerEnter={(e) => {
                  if (ready && e.pointerType !== "touch") wave()
                }}
                onClick={wave}
                onKeyDown={onCharKey}
              >
                <Character ink={ink} paper={paper} accent={accent} shirtId={"wpl-" + uid + "-shirt"} headRef={headRef} />
              </g>
            </svg>
          </g>

          {waving && (
            <g className="wpl-bubble" aria-hidden="true">
              <path
                d={
                  "M " + (charLeft + 340 * k) + " 20 h " + bubbleW + " v 56 h " + -(bubbleW - 34) +
                  " l -30 22 l 6 -22 h -10 Z"
                }
                fill={paper}
                stroke={accent}
                strokeWidth={4}
                strokeLinejoin="round"
              />
              <text className="wpl-label wpl-bubble-text" x={charLeft + 340 * k + bubbleW / 2} y={58} textAnchor="middle">
                {greeting.toUpperCase()}
              </text>
            </g>
          )}
        </svg>

        {playing && !ready && (
          <div className="wpl-storm" aria-hidden="true">
            {storm.map(({ row, half, span }) => (
              <div
                key={row}
                className="wpl-srow"
                data-dir={row % 2 ? "r" : "l"}
                style={{ animationDelay: row * 0.04 + "s, " + (1.25 + row * 0.06) + "s" }}
              >
                <svg
                  className="wpl-strip"
                  data-dir={row % 2 ? "r" : "l"}
                  viewBox={"0 -6 " + span * 2 + " 152"}
                  style={{ animationDuration: 4.6 + (row % 3) * 1.5 + "s" }}
                  fill="none"
                  strokeLinecap="square"
                  strokeMiterlimit={4}
                >
                  {[0, span].map((off) =>
                    half.map((g, k) => {
                      const d = glyphPath(g.ch, g.w, 140, 12)
                      const hollow = row % 3 !== 0
                      return (
                        <g key={off + "-" + k} transform={"translate(" + (off + g.x) + " 0)"}>
                          <path d={d} stroke={row % 3 === 2 ? ink : accent} strokeWidth={12} />
                          {hollow && <path d={d} stroke={paper} strokeWidth={5} />}
                        </g>
                      )
                    }),
                  )}
                </svg>
              </div>
            ))}
          </div>
        )}

        {([0, 1] as const).map((k) => (
          <button
            key={k}
            type="button"
            className={"wpl-corner " + (k ? "wpl-corner-r" : "wpl-corner-l")}
            aria-label={"Roll the dice, showing " + dice[k]}
            onClick={() => rollDie(k)}
          >
            <svg viewBox="0 0 170 170" aria-hidden="true">
              {[108, 124, 140].map((v) => (
                <path key={v} d={"M 0 " + v + " L " + v + " " + v + " L " + v + " 0"} fill="none" stroke={accent} strokeWidth={2} />
              ))}
              <rect x={0} y={0} width={92} height={92} fill={accent} />
              <g key={diceSpin[k]} className={"wpl-pips" + (diceSpin[k] ? " is-rolled" : "")}>
                <rect x={10} y={8} width={76} height={76} fill="none" />
                {pips(dice[k]).map(([px, py], n) => (
                  <circle key={n} cx={48 + px * 20} cy={46 + py * 20} r={7.5} fill={paper} />
                ))}
              </g>
            </svg>
          </button>
        ))}

        <button type="button" className="wpl-sign" aria-label={playing ? "Replay the intro" : "Wave again"} onClick={replay}>
          <Signature lines={sig} color={accent} />
        </button>
      </div>

      {bursts.map((b) => (
        <div key={b.id} className="wpl-burst" style={{ left: b.x, top: b.y }} aria-hidden="true">
          {b.bits.map((bit, n) => (
            <svg
              key={n}
              className="wpl-bit"
              viewBox="-3 -3 26 38"
              style={{ "--dx": bit.dx + "px", "--dy": bit.dy + "px", "--rot": bit.rot + "deg" } as React.CSSProperties}
            >
              <path
                d={glyphPath(bit.ch, glyphWidth(bit.ch, 14, 3.4), 32, 3.4)}
                fill="none"
                stroke={n % 3 ? accent : ink}
                strokeWidth={3.4}
                strokeLinecap="square"
              />
            </svg>
          ))}
        </div>
      ))}
    </div>
  )
}

function pips(n: number): [number, number][] {
  const m: Record<number, [number, number][]> = {
    1: [[0, 0]],
    2: [[-1, -1], [1, 1]],
    3: [[-1, -1], [0, 0], [1, 1]],
    4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
    5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
    6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]],
  }
  return m[n] ?? m[1]
}

function Rule({ a, b, y, mid, delay, color }: { a: number; b: number; y: number; mid?: boolean; delay: number; color: string }) {
  if (b - a < 40) return null
  const dots = mid ? [a, (a + b) / 2, b] : [a, b]
  return (
    <g>
      <path className="wpl-draw" pathLength={1} d={"M " + a + " " + y + " L " + b + " " + y} stroke={color} strokeWidth={3} style={{ animationDelay: delay + "s" }} />
      {dots.map((x, k) => (
        <circle key={k} className="wpl-dot" cx={x} cy={y} r={6.5} fill={color} style={{ animationDelay: delay + k * 0.35 + "s" }} />
      ))}
    </g>
  )
}

function LetterCell({
  c,
  i,
  roll,
  intro,
  delay,
  color,
  onEnter,
}: {
  c: Cell
  i: number
  roll: number
  intro: boolean
  delay: number
  color: string
  onEnter: () => void
}) {
  const pad = c.s
  const pitch = c.h + c.s * 2 + 24
  const n = roll > 0 ? 6 : c.giant ? 14 : 10
  const base = c.giant ? GW : LW
  const rolling = intro || roll > 0
  const reel: { ch: string; w: number }[] = []
  if (rolling) {
    for (let k = 1; k < n; k++) {
      const ch = AZ[Math.floor(hash(i * 131 + roll * 977 + k * 53) * 26)]
      reel.push({ ch, w: Math.min(glyphWidth(ch, base, c.s), c.w * 1.25) })
    }
  }
  const style = {
    "--dist": (n - 1) * pitch + "px",
    "--delay": (roll > 0 ? 0 : delay) + "s",
    "--dur": roll > 0 ? "0.7s" : c.giant ? "0.85s" : "1s",
  } as React.CSSProperties
  return (
    <g className={"wpl-cell" + (c.giant ? " wpl-giant" : "")} onPointerEnter={onEnter}>
      <rect x={c.x} y={c.y} width={c.w} height={c.h} fill="transparent" />
      <svg
        x={c.x - pad}
        y={c.y - pad}
        width={c.w + pad * 2}
        height={c.h + pad * 2}
        viewBox={-pad + " " + -pad + " " + (c.w + pad * 2) + " " + (c.h + pad * 2)}
        overflow="hidden"
      >
        <g
          key={roll}
          className={"wpl-reel" + (rolling ? " is-rolling" : "")}
          style={style}
          fill="none"
          stroke={color}
          strokeWidth={c.s}
          strokeLinecap="square"
          strokeMiterlimit={4}
        >
          <path d={glyphPath(c.ch, c.w, c.h, c.s)} />
          {reel.map((g, k) => (
            <path key={k} transform={"translate(" + (c.w - g.w) / 2 + " " + -(k + 1) * pitch + ")"} d={glyphPath(g.ch, g.w, c.h, c.s)} />
          ))}
        </g>
      </svg>
    </g>
  )
}

function Signature({ lines, color }: { lines: string[]; color: string }) {
  const H = 26
  const S = 3.6
  const G = 4
  const rows = lines.map((line) => {
    const chars = [...line.replace(/[^A-Z ]/g, "")]
    let x = 0
    const items = chars.map((ch) => {
      const w = glyphWidth(ch, 15, S)
      const it = { ch, x, w }
      x += w + G
      return it
    })
    return { items, width: Math.max(0, x - G) }
  })
  const widest = Math.max(1, ...rows.map((r) => r.width))
  const k = Math.min(1, 80 / widest)
  const ys = rows.length > 1 ? [30, 66] : [48]
  let n = 0
  return (
    <svg viewBox="-10 -18 140 140" aria-hidden="true">
      <path
        className="wpl-draw"
        pathLength={1}
        d="M 60 8 C 96 6 116 30 114 62 C 112 96 88 114 58 112 C 26 110 6 88 8 58 C 10 28 30 10 66 12"
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        style={{ animationDelay: "3s" }}
      />
      {rows.map((row, ri) => (
        <g key={ri} transform={"translate(" + (60 - (row.width * k) / 2) + " " + (ys[ri] - (H * k) / 2) + ") scale(" + k + ")"}>
          {row.items.map((it, ii) => {
            const j = n++
            const rot = (hash(j * 7 + 3) - 0.5) * 16
            const dy = (hash(j * 11 + 5) - 0.5) * 5
            return (
              <path
                key={ii}
                className="wpl-draw"
                pathLength={1}
                transform={"translate(" + it.x + " " + dy + ") rotate(" + rot + " " + it.w / 2 + " " + H / 2 + ")"}
                d={glyphPath(it.ch, it.w, H, S)}
                fill="none"
                stroke={color}
                strokeWidth={S}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ animationDelay: 3.2 + j * 0.07 + "s" }}
              />
            )
          })}
        </g>
      ))}
      {["M 110 2 L 118 -8", "M 118 16 L 130 11", "M 100 -2 L 101 -14"].map((d, i) => (
        <path key={d} className="wpl-draw wpl-spark" pathLength={1} d={d} stroke={color} strokeWidth={4} strokeLinecap="round" style={{ animationDelay: 3.8 + i * 0.08 + "s" }} />
      ))}
    </svg>
  )
}

// #region character
// Local frame 0 0 460 600; the bottom edge is the baseline she walks on.
// A girl mid-stride, snapping a selfie with one hand, the other in her jacket
// pocket. Rig pivots (mirrored in the CSS transform-origins): tilt/bob at the
// feet (205, 600), hips (236, 335), shoulder (205, 238), elbow (112, 292),
// wrist (106, 196), neck (236, 190).
function Character({
  ink,
  paper,
  accent,
  shirtId,
  headRef,
}: {
  ink: string
  paper: string
  accent: string
  shirtId: string
  headRef: React.Ref<SVGGElement>
}) {
  const grid = (x0: number, x1: number, y0: number, y1: number, sx: number, sy: number) => {
    let d = ""
    for (let x = x0; x <= x1; x += sx) d += "M " + x + " " + y0 + " L " + x + " " + y1 + " "
    for (let y = y0; y <= y1; y += sy) d += "M " + x0 + " " + y + " L " + x1 + " " + y + " "
    return d
  }
  const limb = (d: string, w: number, fill: string) => (
    <>
      <path d={d} fill="none" stroke={ink} strokeWidth={w + 8} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={fill} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
    </>
  )
  const topP = "M 206 205 L 266 205 L 272 335 L 210 335 Z"
  const jacketL =
    "M 205 200 C 175 210 158 235 158 262 C 150 320 142 370 138 410 L 218 424 C 216 380 218 340 222 290 L 214 206 Z"
  const jacketR =
    "M 262 204 C 296 212 316 236 322 270 C 334 320 332 370 322 408 L 252 414 C 254 380 260 340 262 296 Z"
  const ids = [shirtId + "t", shirtId + "l", shirtId + "r"]
  const curls: [number, number, number][] = [
    [196, 120, 26], [192, 160, 28], [200, 200, 26], [285, 115, 28], [300, 155, 32], [292, 200, 30], [250, 72, 34],
  ]
  return (
    <g transform="translate(-30 0)">
      <g className="wpl-rise">
        <g className="wpl-tilt">
          <g className="wpl-breathe">
            {/* legs: wide trousers, mid-stride */}
            <g className="wpl-legA">
              <path d="M 208 330 L 256 330 C 258 400 250 480 238 556 L 148 546 C 168 480 196 400 208 330 Z" fill={paper} stroke={ink} strokeWidth={4} strokeLinejoin="round" />
              <path d="M 176 505 C 196 512 214 510 228 502" fill="none" stroke={ink} strokeWidth={3} strokeLinecap="round" />
              <path d="M 146 540 L 242 552 L 246 592 L 128 594 C 120 572 130 552 146 540 Z" fill={ink} />
              <path d="M 168 548 L 178 562 M 184 550 L 192 564 M 130 586 L 244 586" stroke={paper} strokeWidth={2.5} strokeLinecap="round" />
              <circle cx={232} cy={575} r={3.5} fill={paper} />
              <circle cx={210} cy={578} r={3} fill={paper} />
            </g>
            <g className="wpl-legB">
              <path d="M 244 330 L 276 330 C 310 400 350 470 374 548 L 300 566 C 280 490 256 420 244 330 Z" fill={paper} stroke={ink} strokeWidth={4} strokeLinejoin="round" />
              <path d="M 318 482 C 332 492 346 494 358 490" fill="none" stroke={ink} strokeWidth={3} strokeLinecap="round" />
              <path d="M 296 556 L 372 542 C 392 556 398 580 390 594 L 292 596 Z" fill={ink} />
              <path d="M 340 546 L 350 560 M 356 544 L 364 558 M 294 588 L 392 588" stroke={paper} strokeWidth={2.5} strokeLinecap="round" />
              <circle cx={312} cy={576} r={3.5} fill={paper} />
            </g>

            {/* plaid top */}
            <clipPath id={ids[0]}><path d={topP} /></clipPath>
            <path d={topP} fill={paper} stroke={ink} strokeWidth={4} strokeLinejoin="round" />
            <path d={grid(206, 272, 205, 335, 15, 22)} clipPath={"url(#" + ids[0] + ")"} stroke={ink} strokeWidth={2.5} fill="none" />
            {/* belt */}
            <path d="M 209 322 L 273 322 L 273 338 L 209 338 Z" fill={ink} />
            <circle cx={241} cy={330} r={6} fill={paper} stroke={ink} strokeWidth={2} />

            {/* jacket, open, in the accent colour */}
            <clipPath id={ids[1]}><path d={jacketL} /></clipPath>
            <clipPath id={ids[2]}><path d={jacketR} /></clipPath>
            <path d={jacketL} fill={accent} stroke={ink} strokeWidth={4} strokeLinejoin="round" />
            <path d={grid(130, 224, 270, 430, 20, 26)} clipPath={"url(#" + ids[1] + ")"} stroke={ink} strokeWidth={2.5} fill="none" />
            <path d={jacketR} fill={accent} stroke={ink} strokeWidth={4} strokeLinejoin="round" />
            <path d={grid(250, 336, 270, 420, 20, 26)} clipPath={"url(#" + ids[2] + ")"} stroke={ink} strokeWidth={2.5} fill="none" />
            <circle cx={226} cy={262} r={3.5} fill={paper} stroke={ink} strokeWidth={2} />
            <circle cx={224} cy={300} r={3.5} fill={paper} stroke={ink} strokeWidth={2} />
            {/* collar */}
            <path d="M 204 200 L 190 236 L 222 222 Z M 266 204 L 284 240 L 250 224 Z" fill={accent} stroke={ink} strokeWidth={4} strokeLinejoin="round" />

            {/* the arm in the pocket */}
            {limb("M 306 234 C 352 264 366 330 326 388", 50, accent)}
            <path d="M 334 262 C 350 290 350 320 340 346" fill="none" stroke={ink} strokeWidth={2.5} strokeLinecap="round" />
            <ellipse cx={316} cy={396} rx={18} ry={11} fill={paper} stroke={ink} strokeWidth={3.5} transform="rotate(-20 316 396)" />
            <path d="M 300 392 C 310 388 322 388 332 394" fill="none" stroke={ink} strokeWidth={2.5} strokeLinecap="round" />

            {/* the selfie arm */}
            <g className="wpl-uarm">
              <g className="wpl-farm">
                {limb("M 112 292 L 106 206", 36, accent)}
                <path d="M 88 204 L 126 208 L 126 226 L 88 222 Z" fill={paper} stroke={ink} strokeWidth={3.5} strokeLinejoin="round" />
                <path d="M 98 204 L 98 223 M 108 205 L 108 224 M 118 207 L 118 225 M 88 213 L 126 217" stroke={ink} strokeWidth={2} />
                <g className="wpl-hand">
                  <g transform="translate(-8 26) rotate(14 150 110)">
                    <rect x={130} y={66} width={42} height={76} rx={9} fill={paper} stroke={ink} strokeWidth={4} />
                    <circle cx={142} cy={80} r={5} fill="none" stroke={ink} strokeWidth={3} />
                    <circle className="wpl-flash" cx={142} cy={80} r={22} fill={accent} />
                  </g>
                  <ellipse cx={116} cy={176} rx={21} ry={26} fill={paper} stroke={ink} strokeWidth={4} transform="rotate(8 116 176)" />
                  <path d="M 126 158 C 138 152 150 156 148 166 M 128 172 C 140 166 152 172 148 180 M 126 188 C 136 184 146 188 142 196" fill="none" stroke={ink} strokeWidth={3.5} strokeLinecap="round" />
                  <path d="M 112 156 C 108 164 108 170 112 176" fill="none" stroke={ink} strokeWidth={2.5} strokeLinecap="round" />
                </g>
                              </g>
              {limb("M 205 242 C 168 248 138 268 116 292", 56, accent)}
              <path d="M 176 262 C 160 272 148 282 140 296" fill="none" stroke={ink} strokeWidth={2.5} strokeLinecap="round" />
            </g>

            {/* neck + head */}
            <path d="M 224 160 L 224 208 L 252 208 L 252 160 Z" fill={paper} stroke={ink} strokeWidth={4} />
            <g className="wpl-head" ref={headRef}>
              <g className="wpl-look">
                <g className="wpl-hair">
                  {curls.map(([x, y, r], i) => (
                    <circle key={i} cx={x} cy={y} r={r} fill={ink} />
                  ))}
                  <path d="M 184 150 C 176 160 178 172 188 176 M 200 205 C 192 212 194 224 204 226 M 296 140 C 306 150 306 164 298 170 M 290 195 C 300 204 298 216 288 220" fill="none" stroke={paper} strokeWidth={2.5} strokeLinecap="round" />
                </g>
                <ellipse cx={274} cy={128} rx={7} ry={11} fill={paper} stroke={ink} strokeWidth={3.5} />
                <path d="M 200 125 C 200 92 218 82 236 82 C 258 82 274 98 272 128 C 270 154 254 170 236 170 C 216 170 200 152 200 125 Z" fill={paper} stroke={ink} strokeWidth={4} />
                {/* cap */}
                <path d="M 198 98 C 196 56 226 44 244 46 C 270 48 282 76 280 100 C 250 92 222 92 198 98 Z" fill={accent} stroke={ink} strokeWidth={4} strokeLinejoin="round" />
                <path d="M 200 98 C 182 90 160 94 148 106 C 168 114 192 112 212 106 Z" fill={ink} />
                <path d="M 240 48 C 236 68 236 84 238 94" fill="none" stroke={ink} strokeWidth={2.5} strokeLinecap="round" />
                <circle cx={244} cy={45} r={4} fill={ink} />
                <g className="wpl-brows">
                  <path d="M 212 108 C 218 104 226 104 232 107 M 246 106 C 252 103 260 104 265 108" fill="none" stroke={ink} strokeWidth={3.5} strokeLinecap="round" />
                </g>
                <g className="wpl-eyes">
                  <g className="wpl-pupils">
                  <circle cx={222} cy={122} r={4.4} fill={ink} />
                  <circle cx={252} cy={120} r={4.4} fill={ink} />
                  </g>
                </g>
                <path className="wpl-happy" d="M 215 124 Q 222 114 229 124 M 245 122 Q 252 112 259 122" fill="none" stroke={ink} strokeWidth={3.5} strokeLinecap="round" />
                <path d="M 238 128 C 233 136 237 139 242 138" fill="none" stroke={ink} strokeWidth={3} strokeLinecap="round" />
                <path className="wpl-smile" d="M 222 146 C 232 158 250 156 260 142" fill="none" stroke={ink} strokeWidth={3.5} strokeLinecap="round" />
                <path className="wpl-grin" d="M 221 144 C 232 168 252 164 261 140 Z" fill={ink} stroke={ink} strokeWidth={3} strokeLinejoin="round" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  )
}
// #endregion character

const WPL_CSS = `
.wpl-root{position:relative;width:100%;overflow:hidden;background:var(--wpl-paper);color:var(--wpl-ink);container-type:size;isolation:isolate;user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:transparent}
.wpl-sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
.wpl-stage{position:absolute;inset:0}
.wpl-poster{position:absolute;left:3%;top:10%;width:94%;height:70%;max-width:none;overflow:visible;z-index:2}
.wpl-label{font-family:"Futura","Century Gothic","Avenir Next","Trebuchet MS",ui-sans-serif,system-ui,sans-serif;font-weight:700;font-size:30px;letter-spacing:.04em;fill:var(--wpl-accent)}
.wpl-bubble-text{fill:var(--wpl-ink);font-size:26px}
.wpl-par-letters{transform:translate(calc(var(--wpl-mx,0) * -14px),calc(var(--wpl-my,0) * -8px));transition:transform .7s cubic-bezier(.2,.8,.2,1)}
.wpl-par-lines{transform:translate(calc(var(--wpl-mx,0) * -5px),calc(var(--wpl-my,0) * -3px));transition:transform .7s cubic-bezier(.2,.8,.2,1)}
.wpl-par-char{transform:translate(calc(var(--wpl-mx,0) * 9px),0px);transition:transform .7s cubic-bezier(.2,.8,.2,1)}
.wpl-draw{stroke-dasharray:1;stroke-dashoffset:0}
.wpl-dot{transform-box:fill-box;transform-origin:center}
.wpl-reel.is-rolling{animation:wpl-roll var(--dur,1s) var(--delay,0s) both}
.wpl-cell{cursor:crosshair}
.wpl-char{cursor:pointer;outline:none}
.wpl-char:focus-visible .wpl-head{filter:drop-shadow(0 0 6px var(--wpl-accent))}
.wpl-tilt{transform-box:view-box;transform-origin:205px 600px;transform:rotate(-2deg)}
.wpl-breathe{transform-box:view-box;transform-origin:205px 600px;animation:wpl-bob 1.2s ease-in-out infinite}
.wpl-legA{animation:wpl-stepA 1.2s ease-in-out infinite}
.wpl-legB{animation:wpl-stepB 1.2s ease-in-out infinite}
.wpl-uarm{transform-box:view-box;transform-origin:205px 238px}
.wpl-legA,.wpl-legB{transform-box:view-box;transform-origin:236px 335px}
.wpl-hair{transform-box:view-box;transform-origin:240px 110px;animation:wpl-hairb 1.2s ease-in-out infinite}
.wpl-flash{opacity:0}
.wpl-farm{transform-box:view-box;transform-origin:112px 292px}
.wpl-hand{transform-box:view-box;transform-origin:106px 196px}
.wpl-head{transform-box:view-box;transform-origin:236px 190px;transform:rotate(-4deg)}
.wpl-look{transform-box:view-box;transform-origin:236px 190px;transform:rotate(calc(var(--wpl-hr,0) * 1deg));transition:transform .4s ease-out}
.wpl-pupils{transform:translate(calc(var(--wpl-ex,0) * 1px),calc(var(--wpl-ey,0) * 1px));transition:transform .2s ease-out}
.wpl-eyes{transform-box:fill-box;transform-origin:center;animation:wpl-blink 5.2s 7.5s infinite}
.wpl-brows{transition:transform .25s cubic-bezier(.3,1.6,.5,1)}
.wpl-happy,.wpl-grin{opacity:0}
.wpl-bubble{transform-box:fill-box;transform-origin:0% 100%;animation:wpl-pop .45s cubic-bezier(.3,1.6,.5,1) both}
.wpl-root[data-intro="done"] .wpl-farm{animation:wpl-sway 2.4s ease-in-out infinite}

.wpl-root[data-intro="on"] .wpl-poster{animation:wpl-thump .5s 2.5s both}
.wpl-root[data-intro="on"] .wpl-draw{animation:wpl-draw .9s cubic-bezier(.6,0,.2,1) both}
.wpl-root[data-intro="on"] .wpl-dot{animation:wpl-dot .45s cubic-bezier(.3,1.8,.5,1) both}
.wpl-root[data-intro="on"] .wpl-rise{animation:wpl-rise .95s 3.4s cubic-bezier(.2,1.2,.35,1) both}
.wpl-root[data-intro="on"] .wpl-tilt{animation:wpl-tilt .8s 6s cubic-bezier(.3,1.5,.5,1) both}
.wpl-root[data-intro="on"] .wpl-uarm{animation:wpl-uarm .6s 4.3s cubic-bezier(.3,1.3,.5,1) both}
.wpl-root[data-intro="on"] .wpl-farm{animation:wpl-farm .62s 4.3s cubic-bezier(.3,1.3,.5,1) both}
.wpl-root[data-intro="on"] .wpl-head{animation:wpl-headin 1.3s 3.5s ease-out both}
.wpl-root[data-intro="on"] .wpl-corner-l{animation:wpl-corner-l .9s 2.7s cubic-bezier(.2,.9,.2,1) both}
.wpl-root[data-intro="on"] .wpl-corner-r{animation:wpl-corner-r .9s 2.8s cubic-bezier(.2,.9,.2,1) both}
.wpl-root[data-intro="on"] .wpl-sign svg{animation:wpl-sign .7s 3s cubic-bezier(.3,1.6,.5,1) both}

.wpl-char.is-waving .wpl-farm{animation:wpl-wave 1.5s ease-in-out}
.wpl-char.is-waving .wpl-hand{animation:wpl-hand 1.5s ease-in-out}
.wpl-char.is-waving .wpl-flash{animation:wpl-flashy 1.5s ease-out}
.wpl-char.is-waving .wpl-head{animation:wpl-nod 1.5s ease-in-out}
.wpl-char.is-waving .wpl-brows{transform:translateY(-6px)}
.wpl-char.is-waving .wpl-eyes,.wpl-char.is-waving .wpl-smile{opacity:0}
.wpl-char.is-waving .wpl-happy,.wpl-char.is-waving .wpl-grin{opacity:1}

.wpl-storm{position:absolute;inset:-25% -15%;display:flex;flex-direction:column;justify-content:center;gap:2.2cqh;transform:rotate(-7deg);pointer-events:none;z-index:3}
.wpl-srow{height:15cqh;flex:none;overflow:visible;animation:wpl-row-in .6s cubic-bezier(.2,.9,.2,1) both,wpl-shutter .45s cubic-bezier(.7,0,.3,1) forwards}
.wpl-srow[data-dir="r"]{animation-name:wpl-row-in-r,wpl-shutter}
.wpl-strip{display:block;height:100%;width:auto;max-width:none;animation:wpl-marq 5s linear infinite;will-change:transform}
.wpl-strip[data-dir="r"]{animation-name:wpl-marq-r}

.wpl-corner{position:absolute;top:0;width:clamp(64px,15cqmin,168px);height:clamp(64px,15cqmin,168px);margin:0;padding:0;border:0;background:none;cursor:pointer;z-index:4}
.wpl-corner-l{left:0}
.wpl-corner-r{right:0}
.wpl-corner svg{display:block;width:100%;height:100%;max-width:none;overflow:visible}
.wpl-corner-r svg{transform:scaleX(-1)}
.wpl-corner:hover .wpl-pips{transform:rotate(-8deg)}
.wpl-pips{transform-box:fill-box;transform-origin:center;transition:transform .3s cubic-bezier(.3,1.6,.5,1)}
.wpl-pips.is-rolled{animation:wpl-dice .6s cubic-bezier(.3,1.4,.5,1)}

.wpl-sign{position:absolute;left:50%;bottom:clamp(12px,4cqh,44px);width:clamp(60px,11cqmin,120px);height:clamp(60px,11cqmin,120px);margin:0;padding:0;border:0;background:none;cursor:pointer;z-index:4;transform:translateX(-50%);transition:transform .35s cubic-bezier(.3,1.6,.5,1)}
.wpl-sign:hover{transform:translateX(-50%) rotate(-8deg) scale(1.07)}
.wpl-sign svg{display:block;width:100%;height:100%;max-width:none;overflow:visible}
.wpl-root button:focus-visible{outline:2px solid var(--wpl-accent);outline-offset:4px}

.wpl-burst{position:absolute;width:0;height:0;pointer-events:none;z-index:6}
.wpl-bit{position:absolute;left:-9px;top:-18px;width:18px;height:36px;max-width:none;overflow:visible;animation:wpl-bit .95s cubic-bezier(.15,.7,.3,1) forwards}

@container (max-aspect-ratio: 9/10){
.wpl-poster{left:2%;width:96%;top:12%;height:66%}
}

@keyframes wpl-roll{
0%{transform:translateY(var(--dist));opacity:0;animation-timing-function:cubic-bezier(.5,0,.25,1)}
6%{opacity:1}
82%{transform:translateY(-16px);opacity:1;animation-timing-function:ease-in-out}
100%{transform:translateY(0px);opacity:1}
}
@keyframes wpl-thump{0%{transform:none}30%{transform:translateY(7px) scale(1.012)}60%{transform:translateY(-3px)}100%{transform:none}}
@keyframes wpl-draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
@keyframes wpl-dot{from{transform:scale(0)}to{transform:scale(1)}}
@keyframes wpl-rise{from{transform:translateY(640px)}to{transform:translateY(0px)}}
@keyframes wpl-tilt{from{transform:rotate(0deg)}to{transform:rotate(-2deg)}}
@keyframes wpl-uarm{from{transform:rotate(-30deg)}to{transform:rotate(0deg)}}
@keyframes wpl-farm{from{transform:rotate(70deg)}to{transform:rotate(0deg)}}
@keyframes wpl-headin{0%{transform:rotate(9deg)}55%{transform:rotate(-8deg)}100%{transform:rotate(-4deg)}}
@keyframes wpl-wave{0%{transform:rotate(0deg)}15%{transform:rotate(-17deg)}32%{transform:rotate(12deg)}50%{transform:rotate(-17deg)}68%{transform:rotate(12deg)}84%{transform:rotate(-7deg)}100%{transform:rotate(0deg)}}
@keyframes wpl-hand{0%{transform:rotate(0deg)}15%{transform:rotate(-10deg)}32%{transform:rotate(10deg)}50%{transform:rotate(-10deg)}68%{transform:rotate(10deg)}84%{transform:rotate(-5deg)}100%{transform:rotate(0deg)}}
@keyframes wpl-nod{0%{transform:rotate(-4deg)}25%{transform:rotate(-9deg)}55%{transform:rotate(-1deg)}80%{transform:rotate(-6deg)}100%{transform:rotate(-4deg)}}
@keyframes wpl-wiggle{0%,86%,100%{transform:rotate(0deg)}90%{transform:rotate(-9deg)}94%{transform:rotate(7deg)}97%{transform:rotate(-3deg)}}
@keyframes wpl-bob{0%,50%,100%{transform:translateY(0)}25%,75%{transform:translateY(-6px)}}
@keyframes wpl-stepA{0%,100%{transform:rotate(5deg)}50%{transform:rotate(-5deg)}}
@keyframes wpl-stepB{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(5deg)}}
@keyframes wpl-hairb{0%,50%,100%{transform:rotate(0deg)}25%,75%{transform:rotate(3deg) translateY(2px)}}
@keyframes wpl-sway{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}
@keyframes wpl-flashy{0%,40%{opacity:0}45%{opacity:.95}100%{opacity:0}}
@keyframes wpl-blink{0%,94%,100%{transform:scaleY(1)}97%{transform:scaleY(.1)}}
@keyframes wpl-pop{from{transform:scale(0) rotate(-8deg);opacity:0}to{transform:scale(1) rotate(0deg);opacity:1}}
@keyframes wpl-corner-l{from{transform:translate(-70%,-70%)}to{transform:translate(0,0)}}
@keyframes wpl-corner-r{from{transform:translate(70%,-70%)}to{transform:translate(0,0)}}
@keyframes wpl-sign{from{transform:scale(0) rotate(-40deg)}to{transform:scale(1) rotate(0deg)}}
@keyframes wpl-dice{from{transform:rotate(-360deg) scale(.4)}to{transform:rotate(0deg) scale(1)}}
@keyframes wpl-row-in{from{transform:translateX(35%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes wpl-row-in-r{from{transform:translateX(-35%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes wpl-shutter{from{transform:scaleY(1);opacity:1}to{transform:scaleY(0);opacity:0}}
@keyframes wpl-marq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes wpl-marq-r{from{transform:translateX(-50%)}to{transform:translateX(0)}}
@keyframes wpl-bit{from{transform:translate(0,0) rotate(0deg) scale(.4);opacity:1}to{transform:translate(var(--dx),var(--dy)) rotate(var(--rot)) scale(1);opacity:0}}

@media (prefers-reduced-motion:reduce){
.wpl-root *,.wpl-root *::before,.wpl-root *::after{animation:none!important;transition:none!important}
}
`
