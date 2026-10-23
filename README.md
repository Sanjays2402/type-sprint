# ⌨️ type sprint

A sleek, minimal typing speed test built for keyboard enthusiasts. Inspired by [monkeytype](https://monkeytype.com) — fast, focused, and distraction-free.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)

## ✨ Features

- **⏱️ Multiple test modes** — 15s, 30s, 60s, or set your own custom duration
- **📊 Live WPM & accuracy** — real-time stats as you type
- **🎯 Character highlighting** — green for correct, red for errors, blinking caret cursor
- **📈 Results dashboard** — WPM, accuracy %, total characters, error count, and a WPM-over-time graph
- **🏆 Personal bests** — tracked in localStorage per duration mode
- **🎨 5 themes** — Dark, Light, Monokai, Dracula, Nord
- **🔥 Keyboard heatmap** — visualizes your most-missed keys after each test
- **🪶 Ultra-clean UI** — monospace typography, subtle animations, zero distractions

## 🚀 Quick Start

```bash
git clone https://github.com/Sanjays2402/type-sprint.git
cd type-sprint
npm install
npm run dev
```

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| **React 19** | UI framework |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Animations & transitions |

## 🎨 Themes

| Theme | Vibe |
|-------|------|
| 🌑 Dark | Deep navy, gold accents |
| ☀️ Light | Clean white, orange accents |
| 🟢 Monokai | Classic editor green-on-dark |
| 🧛 Dracula | Purple-tinted dark mode |
| 🧊 Nord | Arctic blue, muted tones |

## ⌨️ Controls

- **Start typing** to begin the test
- **Tab** to restart at any time
- **Space** to move to the next word

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx          # App logo/title
│   ├── ModeSelector.jsx    # Duration picker (15s/30s/60s/custom)
│   ├── TypingArea.jsx      # Core typing interface with live stats
│   ├── ResultsScreen.jsx   # Post-test stats & WPM graph
│   ├── KeyboardHeatmap.jsx # Visual missed-keys heatmap
│   ├── ThemeSelector.jsx   # Theme picker dropdown
│   └── Footer.jsx          # Hotkeys & theme toggle
├── context/
│   └── ThemeContext.jsx     # Theme state management
├── data/
│   ├── words.js            # 500+ word corpus & generator
│   └── themes.js           # Theme color definitions
├── hooks/
│   ├── useTypingTest.js    # Core typing test logic
│   └── usePersonalBest.js  # localStorage personal best tracking
├── App.jsx                 # Main app orchestrator
└── main.jsx                # Entry point
```

## 📜 License

MIT

## Terms & Disclaimer

By using this project you agree to the following.

- **No warranty.** This software is provided "as is", without warranty of any kind, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.
- **No liability.** To the maximum extent permitted by law, the author and contributors are not liable for any claim, loss, or damage (direct, indirect, incidental, or consequential, including lost data or profits) arising from its use.
- **Your responsibility.** You use it at your own risk and are responsible for complying with the laws that apply to you.
- **Game.** Provided for entertainment. Take breaks; it is not designed for people with photosensitive epilepsy, and flashing effects may occur.
- **Third parties.** Names, logos, APIs, and services of others belong to their owners and are used for identification only; no affiliation or endorsement is implied.
- **Your statutory rights.** Nothing here limits rights that cannot be waived by agreement, including under consumer-protection laws in the USA, Canada (including Quebec), and India (Consumer Protection Act, 2019).
- **License.** Use, copying, and distribution are governed by the [LICENSE](LICENSE) file; if anything here conflicts with it, the license controls.

## Content, Assets & Fair Use

- **Original work.** Unless noted otherwise (including below), the code, text, design, and images in this repository were created by the author.
- **Libraries, fonts, and icons.** Third-party libraries, fonts (for example Google Fonts), and icon sets belong to their creators and are used under their own licenses; see the dependency manifests and each source for terms.
- **Logos, brands, and screenshots.** Third-party names, logos, and screenshots appear only to identify or describe their products (nominative use). They remain the property of their owners and do not imply affiliation or endorsement.
- **Ideas and inspiration.** Where this project is inspired by another product, game, or idea, it is an independent implementation. It borrows only general ideas, mechanics, or styles, which are not anyone's exclusive property, and is meant to contain no third-party code or artwork used without permission.
- **Fair use and fair dealing.** Any third-party material is used in limited ways for purposes such as education, research, review, commentary, or identification, relying on fair use in the USA (17 U.S.C. § 107), fair dealing in Canada (Copyright Act, ss. 29–29.2), and fair dealing in India (Copyright Act, 1957, s. 52), where they apply.
- **Concerns and takedown requests.** If you own rights in something here and believe it is used improperly, [open an issue](https://github.com/Sanjays2402/type-sprint/issues) or contact the author through their GitHub profile with a link to the material and your claim. It will be reviewed promptly and credited, changed, or removed as appropriate. You may also use GitHub's DMCA process.
- **Contributions.** By contributing, you confirm you have the right to submit your contribution and agree it is licensed under this repository's license.
- **Website.** The project site has its own [Terms](https://sanjays2402.github.io/type-sprint/terms.html) and [Fair Use](https://sanjays2402.github.io/type-sprint/fair-use.html) pages.
