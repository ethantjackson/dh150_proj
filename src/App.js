import { useCallback, useEffect, useRef, useState } from 'react';
import { createTheme, ThemeProvider, Typography, Box } from '@mui/material';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

function App() {
  const parallaxRef = useRef();
  const introVideoRef = useCallback((node) => {
    console.log(node);
    introVideo.current = node;
  }, []);
  const introVideo = useRef();
  const [scrollRatio, setScrollRatio] = useState(0);
  const [readyClicked, setReadyClicked] = useState(false);

  const handleScroll = () => {
    if (!parallaxRef.current) return;
    const scrollRatio = parallaxRef.current.current / parallaxRef.current.space;
    setScrollRatio(scrollRatio);
    const newVolume = Math.min(1, (scrollRatio * 2) ** 2);
    if (introVideo.current) introVideo.current.volume = newVolume;
    if (newVolume > 0 && introVideo.current.paused) {
      introVideo.current.currentTime = 92;
      introVideo.current.play();
    }
  };

  useEffect(() => {
    if (!readyClicked) return;
    const container = document.querySelector('.parallax');
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [readyClicked]);

  const themeOptions = {
    palette: {
      mode: 'dark',
    },
  };
  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          textAlign: 'center',
          backgroundColor: 'black',
        }}
      >
        {!readyClicked ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              cursor: 'pointer',
            }}
            onClick={() => setReadyClicked(true)}
          >
            <Typography color='textPrimary' variant='h6'>
              Click To Begin
            </Typography>
          </Box>
        ) : (
          <Parallax
            className='parallax'
            ref={parallaxRef}
            pages={3}
            style={{
              left: '0',
              top: '0',
              backgroundColor: 'black',
            }}
          >
            <ParallaxLayer offset={0} speed={-0.5}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <Typography variant='h1' color='textPrimary'>
                  The Village Vanguard
                </Typography>
              </Box>
            </ParallaxLayer>
            <ParallaxLayer
              sticky={{ start: 0, end: 1 }}
              style={{
                opacity: `${scrollRatio * 2}`,
                backgroundColor: 'black',
              }}
            >
              <Box sx={{ width: '100vw', height: '100vh' }}>
                <video
                  ref={introVideoRef}
                  id='introVideo'
                  width='100%'
                  height='100%'
                >
                  <source src='/intro.mp4' type='video/mp4' />
                  Your browser does not support the video tag.
                </video>
              </Box>
            </ParallaxLayer>
            <ParallaxLayer offset={2}>
              <Typography variant='h1' color='textPrimary'>
                Test
              </Typography>
            </ParallaxLayer>
          </Parallax>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
