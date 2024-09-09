'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Save, Download, Trash2 } from 'lucide-react'
import html2canvas from 'html2canvas'

import topOreo from './assets/top_oreo.png'
import bottomOreo from './assets/bottom_oreo.png'
import oreoFilling from './assets/oreo_filling.png'

type OreoPart = 'dark' | 'white'

export default function OreoBuilder() {
  const [oreoParts, setOreoParts] = useState<OreoPart[]>([])
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const polaroidRef = useRef<HTMLDivElement>(null)
  const [sounds, setSounds] = useState<Record<string, HTMLAudioElement>>({});

  useEffect(() => {
    setSounds({
      o: new Audio('/sounds/o.mp3'),
      ooo: new Audio('/sounds/ooo.mp3'),
      re: new Audio('/sounds/re.mp3'),
      ree: new Audio('/sounds/ree.mp3'),
    });
  }, []);

  const addPart = (part: OreoPart) => {
    setOreoParts(prev => [...prev, part])
  }

  function handleButtonClick(part: OreoPart, soundKey: string) {
    addPart(part);
    playSound(soundKey);
  }

  const finishOreo = () => {
    setIsPopupOpen(true);
    playOreoSounds();
  };

  const playOreoSounds = () => {
    const darkCount = oreoParts.filter(part => part === 'dark').length;
    const whiteCount = oreoParts.filter(part => part === 'white').length;

    let additionalSoundKey: string | null = null;
    if (darkCount > 5 && whiteCount === 0) {
      additionalSoundKey = 'ooo';
    } else if (whiteCount > 5 && darkCount === 0) {
      additionalSoundKey = 'ree';
    }

    if (additionalSoundKey) {
      playSound(additionalSoundKey);
      return;
    }

    const soundSequence: string[] = oreoParts.map(part => (part === 'dark' ? 'o' : 're'));

    let delay = 0;
    soundSequence.forEach((soundKey) => {
      setTimeout(() => {
        playSound(soundKey);
      }, delay);
      delay += 300;
    });
  };





  const clearOreo = () => {
    setOreoParts([])
  }

  function playSound(soundKey: string) {
    const sound = sounds[soundKey];
    if (sound) {
      sound.play().catch(error => console.error('Error playing audio:', error));
    }
  }

  const downloadOreo = () => {
    if (polaroidRef.current) {
      html2canvas(polaroidRef.current).then(canvas => {
        const link = document.createElement('a')
        link.download = 'my-oreo.png'
        link.href = canvas.toDataURL()
        link.click()
      })
    }
  }

  const getOreoImage = (part: OreoPart, index: number) => {
    if (part === 'dark') {
      if (index === 0) return topOreo.src
      if (index === oreoParts.length - 1) return bottomOreo.src
      return bottomOreo.src
    }
    return oreoFilling.src
  }



  const oreoTitle = oreoParts.map(part => part === 'dark' ? 'O' : 'RE').join('')

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <h1 className="text-4xl font-bold text-center py-8 text-primary">Monte sua Oreo!</h1>
      <p className="text-gray-600 text-sm absolute top-[4.5rem] left-1/2 transform -translate-x-1/2  ">
        Feito com <span role="img" aria-label="heart">❤️</span> por{' '}
        <a href="https://eduardev.com/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
         EDUARDEV
        </a>
      </p>

      <div className="flex-grow overflow-y-auto" style={{ maxHeight: 'calc(100vh - 225px)' }}>
        <div className="flex flex-col items-center pb-32">
          {oreoParts.map((part, index) => (
            <img
              key={index}
              src={getOreoImage(part, index)}
              className="w-40"
              style={{
                marginBottom: '-4rem',
                zIndex: oreoParts.length - index
              }}
              alt={part === 'dark' ? 'Oreo cookie part' : 'Oreo filling part'}
            />
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center gap-4 p-4 bg-gray-100 border-t border-gray-300">
        <div className="flex justify-center gap-4 w-full">
          <Button
            onClick={() => handleButtonClick('dark', 'o')}
            className="text-2xl px-6 py-3 bg-black text-white hover:bg-gray-800"
            aria-label="Add dark Oreo part"
          >
            O
          </Button>

          <Button
            onClick={() => handleButtonClick('white', 're')}
            className="text-2xl px-6 py-3 bg-white text-black border-2 border-black hover:bg-gray-100"
            aria-label="Add white Oreo part"
          >
            RE
          </Button>
        </div>
        <div className="flex justify-center gap-4 w-full">
          <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={finishOreo}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white"
                aria-label="Finish Oreo"
              >
                <Save size={18} />
                Pronto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] bg-white">
              <DialogHeader>
                <DialogTitle className="text-center text-primary">Sua Oreo ficou assim</DialogTitle>
              </DialogHeader>
              <div ref={polaroidRef} className="bg-white p-4 rounded-lg shadow-lg transform rotate-1 transition-all duration-300 ease-in-out hover:rotate-0">
                <div className="bg-gray-200 p-10 rounded-lg shadow-inner">
                  <div className="flex flex-col items-center">
                    {oreoParts.map((part, index) => (
                      <img
                        key={index}
                        src={getOreoImage(part, index)}
                        className="w-20"
                        style={{
                          marginBottom: '-2rem',
                          zIndex: oreoParts.length - index
                        }}
                        alt={part === 'dark' ? 'Oreo cookie part' : 'Oreo filling part'}
                      />
                    ))}

                  </div>
                </div>
                <div className="flex items-center justify-center mt-7">
                  <p
                    className="text-gray-600 text-center w-80 break-words"
                    style={{
                      fontFamily: 'Brush Script MT, cursive',
                      lineHeight: '1.2',
                      maxHeight: '3.6em',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {oreoTitle}
                  </p>
                </div>
              </div>
              <Button onClick={downloadOreo} className="mt-4 w-full">
                <Download size={18} className="mr-2" />
                Download
              </Button>
            </DialogContent>
          </Dialog>
          <Button
            onClick={clearOreo}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white"
            aria-label="Clear Oreo"
          >
            <Trash2 size={18} />
            Limpar
          </Button>
        </div>
      </div>
    </div>
  )
}