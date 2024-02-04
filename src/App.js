import { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import {
  createTheme,
  Container,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

function App() {
  const parallaxRef = useRef();
  const youtubePlayer = useRef();
  const [scrollRatio, setScrollRatio] = useState(0);

  const handleScroll = () => {
    if (!parallaxRef.current) return;
    const scrollRatio = parallaxRef.current.current / parallaxRef.current.space;
    setScrollRatio(scrollRatio);
    if (!youtubePlayer.current) return;
    youtubePlayer.current.setVolume((scrollRatio * 40) ** 2);
  };

  useEffect(() => {
    const container = document.querySelector('.parallax');
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const introVidId = 'zBs9gZQX7lQ';
  const introVidOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      loop: 1,
      controls: 0,
      disablekb: 1,
      // origin: window.location.origin,
    },
  };

  const themeOptions = {
    palette: {
      mode: 'dark',
    },
  };
  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          height: '100%',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Parallax
          className='parallax'
          ref={parallaxRef}
          pages={2}
          style={{
            left: '0',
            top: '0',
            backgroundColor: 'black',
            opacity: `${1 - scrollRatio * 3}`,
          }}
        >
          <ParallaxLayer offset={0.3} speed={0.1}>
            <Typography variant='h1' color='textPrimary'>
              Jazz
            </Typography>
          </ParallaxLayer>
        </Parallax>
      </Container>
      <YouTube
        videoId={introVidId}
        opts={introVidOpts}
        style={{ height: '100vh', width: '100vw' }}
        onReady={(event) => {
          event.target.setVolume(0);
          event.target.playVideo();
          youtubePlayer.current = event.target;
        }}
        onEnd={(event) => {
          event.target.playVideo();
        }}
      />
    </ThemeProvider>
  );
}

export default App;
