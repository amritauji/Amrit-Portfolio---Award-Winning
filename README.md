# Amrit Auji - Space Portfolio 🚀

An immersive 3D portfolio experience featuring a cinematic space journey with advanced animations and user memory.

## ✨ Features

### 🎬 Cinematic Experience
- **4-second intro** with floating spaceship and engine sounds
- **4-second journey** with acceleration effects and dynamic camera
- **Space station arrival** with Interstellar-style music
- **Avatar greeting** with animated welcome message
- **Smooth transitions** between all scenes

### 🎵 Audio System
- **Automatic audio playback** - No user interaction required
- **3 audio tracks**: Engine, Acceleration, Interstellar docking
- **Smooth crossfading** between scenes
- **Performance optimized** loading

### 🍪 User Memory
- **localStorage integration** - Remembers user preferences
- **Skip button** for returning visitors
- **Visit tracking** and progress saving
- **Auto-start** for repeat users

### 🎨 Advanced Animations
- **React Spring** - Smooth UI transitions
- **Anime.js** - Complex keyframe animations
- **Velocity.js** - Performance-optimized effects
- **GSAP** - Professional timeline animations

### 💼 Portfolio Sections
- **About Me** - Professional introduction
- **Technical Arsenal** - Skills by category
- **Mission Portfolio** - Project showcase
- **Communication Array** - Contact information

## 🛠 Tech Stack

- **React 18** + **Vite**
- **Three.js** + **React Three Fiber**
- **GSAP** + **React Spring** + **Anime.js** + **Velocity.js**
- **Enhanced lighting** and **360° space environment**
- **Performance optimizations** and **lazy loading**

## 🚀 Getting Started

1. **Install dependencies:**
```bash
npm install
```

2. **Add audio files** to `public/audio/`:
   - `spaceship-engine.mp3`
   - `spaceship-acceleration.mp3` 
   - `interstellar-docking.mp3`

3. **Start development:**
```bash
npm run dev
```

4. **Build for production:**
```bash
npm run build
```

## 🎮 User Experience

### First Visit
1. Audio preloader (with timeout protection)
2. 4s spaceship intro with engine sound
3. 4s acceleration journey
4. Space station arrival with Interstellar music
5. Avatar greeting scene
6. Portfolio homepage

### Return Visits
- **Auto-start** without prompts
- **Skip button** to jump directly to portfolio
- **Remembered preferences** and progress

## ⚡ Performance Features

- **Optimized particle counts** (1500 stars, 200 portal effects)
- **Hardware acceleration** enabled
- **Lazy loading** for 3D models
- **Memory management** for audio
- **Fallback space environment** during loading

## 🎯 Browser Support

- **Modern browsers** with WebGL 2.0
- **Hardware acceleration** recommended
- **Audio autoplay** support required

## 📁 Project Structure

```
src/
├── components/
│   ├── SpaceScene.jsx          # Main 3D scene
│   ├── AvatarScene.jsx         # Greeting animation
│   ├── Homepage.jsx            # Portfolio sections
│   ├── AudioManager.jsx        # Audio system
│   ├── FadeTransition.jsx      # Scene transitions
│   └── LazyModels.jsx          # 3D model loading
├── utils/
│   └── userPreferences.js      # localStorage management
public/
├── audio/                      # Audio files
└── assets/                     # 3D models (optional)
```

## 🔧 Customization

### Audio
- Replace files in `public/audio/`
- Adjust volumes in `AudioManager.jsx`

### Content
- Update portfolio data in `Homepage.jsx`
- Modify avatar message in `AvatarScene.jsx`

### Animations
- Adjust timing in `SpaceScene.jsx`
- Customize transitions in animation components

## 📄 License

MIT License - Feel free to use for your own space portfolio! 🌌