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
    const newVolume = Math.min(
      1,
      (scrollRatio * 2) ** 2,
      ((scrollRatio - 2) * 2) ** 2
    );
    if (introVideo.current) introVideo.current.volume = newVolume;
    if (newVolume > 0 && introVideo.current.paused) {
      introVideo.current.currentTime = 92;
      introVideo.current.play();
    }
    if (newVolume === 0) introVideo.current.pause();
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
                  opacity: `${1 - scrollRatio * 2}`,
                }}
              >
                <Typography variant='h1' color='textPrimary'>
                  The Village Vanguard
                </Typography>
              </Box>
            </ParallaxLayer>
            <ParallaxLayer
              sticky={{ start: 0, end: 2 }}
              style={{
                opacity: `${scrollRatio * 2}`,
                backgroundColor: 'black',
                zIndex: '-1',
              }}
            >
              <Box sx={{ width: '100vw', height: '100vh' }}>
                <video
                  ref={introVideoRef}
                  id='introVideo'
                  width='100%'
                  height='100%'
                  loop
                >
                  <source src='/intro.mp4' type='video/mp4' />
                  Your browser does not support the video tag.
                </video>
              </Box>
            </ParallaxLayer>
            <ParallaxLayer offset={2}>
              <Box
                component='img'
                src='https://assets3.thrillist.com/v1/image/1679673/1200x630'
                sx={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  objectFit: 'cover',
                }}
              />
              <Box
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  position: 'absolute',
                  top: '0',
                  left: `${-70 * (scrollRatio - 1) + 70 * 2}vw`,
                  width: '30vw',
                  height: '100vh',
                }}
              >
                <Box
                  sx={{
                    marginLeft: '40px',
                    width: 'calc(100% - 80px)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant='h2' color='textPrimary' mb={2}>
                    The Home of Jazz
                  </Typography>
                  <Typography
                    variant='body1'
                    color='textPrimary'
                    sx={{ textAlign: 'justify' }}
                    mb={2}
                  >
                    The Vanguard Village, located in Greenwich Village, New
                    York, has hosted nearly every jazz great since its opening
                    in 1935. The majority of influential jazz musicians, from
                    Bill Evans to John Coltrane, all have live recordings at the
                    Village Vanguard among their discographies.
                  </Typography>
                  <Typography
                    variant='body1'
                    color='textPrimary'
                    sx={{ textAlign: 'justify' }}
                  >
                    In my final DH150 project, I aim to explore the history of
                    the Village Vanguard and tell the story of how this club has
                    shaped the state of jazz. Jazz is quintesentially American
                    music, and is intertwined with America's history of race and
                    culture. It has been a force of social change and a platform
                    for self-expression, and it would not be what it is today
                    without the Village Vanguard at its heart.
                  </Typography>
                </Box>
              </Box>
            </ParallaxLayer>
          </Parallax>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
