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
    console.log(scrollRatio);
    const newVolume =
      scrollRatio <= 6
        ? Math.min(1, (scrollRatio * 2) ** 2, ((scrollRatio - 6) * 2) ** 2)
        : 0;
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
            pages={10}
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
            <ParallaxLayer sticky={{ start: 2, end: 5 }} style={{ zIndex: -1 }}>
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
                    The Village Vanguard has followed jazz from its inception as
                    fringe, black American music to the renowned, influential
                    art form it is today. Throughout this evolution, The Village
                    Vanguard has placed music at the forefront, providing a
                    platform for musicians and audiences of all races and
                    backgrounds to participate in the genre that at its core
                    embodies self-expression, cooperation, and appreciation of
                    others.
                  </Typography>
                </Box>
              </Box>
            </ParallaxLayer>
            <ParallaxLayer offset={2}>
              <Box
                sx={{
                  width: '70vw',
                  height: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{ height: '70vh' }}
                  component={'img'}
                  src={
                    'https://williamwmay.files.wordpress.com/2014/06/max-gordon-copy.jpg'
                  }
                />
                <Box sx={{ position: 'absolute' }}>
                  <Box
                    sx={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      position: 'relative',
                      top: '20vh',
                      left: '100px',
                      width: '400px',
                      textAlign: 'left',
                    }}
                    p={1.5}
                  >
                    <Typography
                      variant='body2'
                      color='textPrimary'
                      sx={{ fontWeight: 'bold' }}
                      mb={0.5}
                    >
                      Max Gordon (1903-1989)
                    </Typography>
                    <Typography variant='body2' color='textPrimary'>
                      In 1935, Lithuanian immigrant, Max Gordon, opened the
                      Village Vanguard. The Village Vanguard initially operated
                      "in the tradition of a Viennese cabaret and poetry house,
                      featuring the likes of Maxwell Bodenheim and Joe Gould"
                      (Observer).
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </ParallaxLayer>
            <ParallaxLayer offset={3}>
              <Box
                sx={{
                  width: '70vw',
                  height: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                ml={'30vw'}
              >
                <Box
                  sx={{ height: '70vh' }}
                  component={'img'}
                  src={
                    'https://i.discogs.com/gHumleBVy2WS9jiM0bKZmpQi8uNS3_1VPkjiGgjV4-g/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTE0NTIw/MTYtMTQ3OTExODcy/OC04NDMwLmpwZWc.jpeg'
                  }
                />
                <Box sx={{ position: 'absolute' }}>
                  <Box
                    sx={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      position: 'relative',
                      top: '20vh',
                      left: '100px',
                      width: '500px',
                      textAlign: 'left',
                    }}
                    p={1.5}
                  >
                    <Typography variant='body2' color='textPrimary' mb={0.5}>
                      <i>
                        “There’s no other place on the planet where so many
                        greats played for so many years, and that’s one of those
                        statements that seems like hyperbole, but it’s not. It’s
                        really the only quote unquote holy place left in
                        jazz—period.”
                      </i>
                    </Typography>
                    <Typography variant='body2' color='textPrimary'>
                      - <b>Loren Schoenberg</b>, artistic director of the
                      National Jazz Museum in Harlem
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </ParallaxLayer>
            <ParallaxLayer offset={4}>
              <Box
                sx={{
                  width: '70vw',
                  height: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                ml={'15vw'}
              >
                <Box
                  sx={{ height: '70vh' }}
                  component={'img'}
                  src={
                    'https://static01.nyt.com/images/2018/06/11/obituaries/11gordon-obit4/11gordon-obit4-superJumbo-v3.jpg'
                  }
                />
                <Box sx={{ position: 'absolute' }}>
                  <Box
                    sx={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      position: 'relative',
                      top: '20vh',
                      left: '300px',
                      width: '500px',
                      textAlign: 'left',
                    }}
                    p={1.5}
                  >
                    <Typography variant='body2' color='textPrimary' mb={0.5}>
                      <b>Lorraine Gordon (1922-2018)</b>
                    </Typography>
                    <Typography variant='body2' color='textPrimary'>
                      Shortly after Max Gordon's passing in 1988, his wife
                      Lorraine Gordon took over operation of the Village
                      Vanguard. Undeniably, she has contributed greatly to the
                      Village Vanguard's continued commitment to innovation and
                      appreciation in jazz. Lorraine has contributed to a space
                      that is "common, in a way," where audience and artist can
                      have a uniquely intimate exchange. Up until her passing in
                      2018, Lorraine continued to champion younger acts like the
                      Bad Plus and Brad Mehldau who continue to push the limits
                      of jazz.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </ParallaxLayer>
            <ParallaxLayer offset={5}>
              <Box
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  position: 'absolute',
                  top: '0',
                  right: `${-70 * (scrollRatio - 1) + 70 * 5}vw`,
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
                  <Typography variant='h3' color='textPrimary' mb={2}>
                    Jazz Beginnings
                  </Typography>
                  <Typography
                    variant='body1'
                    color='textPrimary'
                    sx={{ textAlign: 'justify' }}
                    mb={2}
                  >
                    It wasn't until the mid 1950's that The Village Vanguard
                    narrowed its scope to only jazz. In 1957, the first on-site
                    jazz album was recorded - Sunny Rollins'
                    <i>A Night at the Village Vanguard</i>. Shortly after, a
                    string of now-classic on-site albums were recorded by jazz
                    legends like John Coltrane, Bill Evans, Gerry Mulligan, and
                    others, securing the Vanguard's spot as the historical jazz
                    club it is today.
                  </Typography>
                  <Typography
                    variant='body1'
                    color='textPrimary'
                    sx={{ textAlign: 'justify' }}
                    mb={2}
                  >
                    Even before jazz took hold of the Vanguard, the club was
                    delved in precursor musical cultures that drove the
                    inception of jazz in America. In the late 30s and early 40s,
                    The Vanguard saw the beginnings of calypso legend Harry
                    Belafonte (left) and blues/folk great Lead Belly (right).
                    The Village Vanguard quickly became a place where acts like
                    Belafonte and Lead Belly could exist no longer as black
                    entertainers, but as serious musicians. By following the
                    different musicians who found themselves on the Vanguard
                    bandstand throughout the years, we can follow the evolution
                    of jazz as a uniquely vibrant and diverse genre that finds
                    innovation in the appreciation and inclusion of other
                    musical cultures.
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  width: '70vw',
                  height: '100vh',
                  position: 'absolute',
                  top: '0',
                  left: `${-30 * (scrollRatio - 1) + 30 * 5}vw`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  component='img'
                  src='https://media.newyorker.com/photos/59097e5d8b51cf59fc4241fd/master/pass/Petrusich-HarryBelafonteandtheSocialPowerofSong.jpg'
                  sx={{ width: '20vw' }}
                  mr={3}
                />
                <Box
                  component='img'
                  src='https://greenwichvillagehistory.files.wordpress.com/2011/12/photos-223-box-51-folder-10096-leadbelly-white-bow-tie-playing-guitar-white-background.jpg'
                  sx={{ width: '30vw' }}
                />
              </Box>
            </ParallaxLayer>
          </Parallax>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
