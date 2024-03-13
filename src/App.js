import { useEffect, useRef, useState } from 'react';
import { createTheme, ThemeProvider, Typography, Box } from '@mui/material';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

function App() {
  const parallaxRef = useRef();
  const introVideo = useRef();
  const [scrollRatio, setScrollRatio] = useState(0);
  const leadbellyAudio = useRef();
  const milesDavisAudio = useRef();
  const samaraJoyAudio = useRef();
  const [readyClicked, setReadyClicked] = useState(false);

  const audios = [
    {
      mediaRef: introVideo,
      start: 0,
      end: 6,
      startTime: 92,
    },
    {
      mediaRef: leadbellyAudio,
      start: 5.5,
      end: 9,
      startTime: 0,
    },
    {
      mediaRef: milesDavisAudio,
      start: 9,
      end: 12.5,
      startTime: 0,
    },
    {
      mediaRef: samaraJoyAudio,
      start: 12,
      end: 15,
      startTime: 0,
    },
  ];

  const handleScroll = () => {
    if (!parallaxRef.current) return;
    const scrollRatio = parallaxRef.current.current / parallaxRef.current.space;
    setScrollRatio(scrollRatio);
    audios.forEach(({ mediaRef, start, end, startTime }) => {
      let newVolume =
        scrollRatio >= start && scrollRatio <= end
          ? Math.min(
              1,
              ((scrollRatio - start) * 2) ** 2,
              ((scrollRatio - end) * 2) ** 2
            )
          : 0;
      if (mediaRef.current) mediaRef.current.volume = newVolume;
      if (newVolume > 0 && mediaRef.current.paused) {
        mediaRef.current.currentTime = startTime;
        mediaRef.current.play();
      }
      if (newVolume === 0) mediaRef.current.pause();
    });
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
            pages={15}
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
                  ref={introVideo}
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
                      Lorraine Gordon, a renowned jazz promoter in her own
                      right, took over operation of the Village Vanguard.
                      Undeniably, she has contributed greatly to the Village
                      Vanguard's continued commitment to innovation and
                      appreciation in jazz. Lorraine has contributed to a space
                      that is "common, in a way," where audience and artist can
                      have a uniquely intimate exchange. Lorraine has been
                      credited with discovering prolific jazz pianist Thelonias
                      Monk in the 40s when she convinced her then-husband (the
                      founder of the jazz label Blue Note) to record the
                      eccentric musician and composer.
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

            {/* LEAD BELLY */}
            <ParallaxLayer offset={6} speed={-0.5}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: '100%',
                  opacity: `${Math.min(
                    2 * (scrollRatio - 5.25),
                    2 * (6.5 - scrollRatio)
                  )}`,
                }}
              >
                <Typography variant='h1' color='textPrimary'>
                  Lead Belly
                </Typography>
                <Typography variant='h3' color='textPrimary'>
                  1888 - 1949
                </Typography>
              </Box>
            </ParallaxLayer>
            <ParallaxLayer
              sticky={{ start: 6, end: 8.5 }}
              style={{
                opacity: `${scrollRatio - 5.75}`,
                backgroundColor: 'black',
                zIndex: '-1',
              }}
            >
              <Box
                component='img'
                src='https://myauctionfinds.com/wp-content/uploads/2018/03/leadbelly1.jpg'
                sx={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  objectFit: 'cover',
                  zIndex: '-1',
                }}
              />
              <audio loop ref={leadbellyAudio}>
                <source src='/leadbelly.mp3' type='audio/mp3' />
                Your browser does not support the audio element.
              </audio>
              <Box
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  position: 'absolute',
                  top: '0',
                  left: `${-70 * (scrollRatio - 6.4) + 70 * 2}vw`,
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
                  <Typography variant='h4' color='textPrimary' mb={2}>
                    From Lead Belly to Nirvana?
                  </Typography>
                  <Typography
                    variant='body1'
                    color='textPrimary'
                    sx={{ textAlign: 'justify' }}
                    mb={2}
                  >
                    Lead Belly was one of the early performers at The Village
                    Vanguard. Known for his signature, Mexican-inspired
                    12-string guitar, Lead Belly embodies one of the unique
                    qualities of jazz – genuine appreciation for and
                    incorporation of other cultures. Despite his innovative and
                    prolific musicianship, Lead Belly’s career was plagued with
                    overbearing media coverage that focused on his race,
                    criminal history, and various controversies that detracted
                    from his music. Regardless, with platforms like The Village
                    Vanguard, Lead Belly’s musical legacy was eventually
                    solidified. Lead Belly’s influence is apparent not only in
                    his contemporaries but also in later acts including the
                    Beatles and even Nirvana, who wore their influence on their
                    sleeves covering Lead Belly’s “Where Did You Sleep Last
                    Night?”. Ultimately, jazz music is heavily comprised of a
                    set of songs (“standards”) that different musicians create
                    their own renditions of. In a way, Nirvana continued this
                    jazz culture of appreciation and reinterpretation in their
                    cover of Lead Belly’s standard. This culture thrives when we
                    appreciate artists for their music, regardless of their
                    backgrounds, as The Village Vanguard did with Lead Belly.
                  </Typography>
                </Box>
              </Box>
            </ParallaxLayer>
            <ParallaxLayer offset={7.8} speed={1}>
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
                    'https://64parishes.org/wp-content/uploads/9632180778_86fd36b2ee_o-1.jpg'
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
                      Humble Beginnings
                    </Typography>
                    <Typography variant='body2' color='textPrimary'>
                      Lead Belly's career began in Saint Paul's Bottoms, the red
                      light district of Lousianna. Here, Lead Belly began
                      playing at the various salloons, dance halls, and
                      brothels.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </ParallaxLayer>
            <ParallaxLayer offset={8.5} speed={5}>
              <Box
                sx={{
                  width: '70vw',
                  marginLeft: '40vw',
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
                    'https://c3c7n5y6.rocketcdn.me/wp-content/uploads/2021/01/Lead-Belly-1.webp'
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
                      The 12-String King
                    </Typography>
                    <Typography variant='body2' color='textPrimary'>
                      12-string guitars were intitially novelty instruments,
                      likely inspired by the Mexican guitarra séptima or bajo
                      sexto. As such, these instruments were usually cheaply
                      made and consequently made their way into the hands of
                      poor blues musicians like Lead Belly.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </ParallaxLayer>
            <ParallaxLayer offset={8.95} speed={1.25}>
              <Box
                sx={{
                  width: '70vw',
                  marginLeft: '30vw',
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
                    'https://cdn.britannica.com/57/178357-050-7A22FEA9/Movie-still-Beatle-George-Harrison-Help-1965.jpg'
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
                      Timeless Influence
                    </Typography>
                    <Typography variant='body2' color='textPrimary'>
                      George Harrison of Beatles fame has said, "No Leadbelly,
                      no Lonnie Donnegan, No Beatles". Evidently, Lead Belly's
                      musical influence endured despite a lack of recognition
                      throughout much of his lifetime.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </ParallaxLayer>

            {/* MILES DAVIS */}
            <audio loop ref={milesDavisAudio}>
              <source src='/milesdavis.mp3' type='audio/mp3' />
              Your browser does not support the audio element.
            </audio>
            <ParallaxLayer offset={9.95} speed={0.75}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: '100%',
                  opacity: `${2 * (scrollRatio - 9)}`,
                }}
              >
                <Typography variant='h1' color='textPrimary'>
                  Miles Davis
                </Typography>
                <Typography variant='h3' color='textPrimary'>
                  1926-1991
                </Typography>
              </Box>
            </ParallaxLayer>
            <ParallaxLayer
              sticky={{ start: 9, end: 11.5 }}
              style={{
                opacity: `${scrollRatio - 9}`,
                backgroundColor: 'black',
                zIndex: '-1',
              }}
            >
              <Box
                component='img'
                src='https://pbs.twimg.com/media/DqZp2HjUUAUsb-g.jpg'
                sx={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  objectFit: 'cover',
                  zIndex: '-1',
                }}
              />
            </ParallaxLayer>
            <ParallaxLayer
              sticky={{ start: 10, end: 11 }}
              sx={{ zIndex: '-1' }}
            >
              <Box
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  position: 'absolute',
                  top: '0',
                  left: `${(scrollRatio - 10) * 100}vw`,
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
                    Jazz Hits its Stride
                  </Typography>
                  <Typography
                    variant='body1'
                    color='textPrimary'
                    sx={{ textAlign: 'justify' }}
                    mb={2}
                  >
                    Miles Davis is unanimously known as one of the most
                    influential voices in jazz. As a jazz great, Davis naturally
                    found himself playing at the Village Vanguard throughout the
                    60s. Davis was well known for being unapologetically honest
                    and allegedly disagreeable at times. Similar to Lead Belly,
                    this focus on Davis’ reputation detracted from what Davis
                    solely saw himself as – a musician. Indeed, Davis insisted
                    on being a musician first and foremost and rejected the
                    entertainer role that white Americans had caricatured in
                    tropes like Uncle Tom. Whether in the media or in
                    performance, Davis was obstinate in being taken seriously as
                    a black musician, expecting the same respect as any
                    contemporary, white classical musician.
                  </Typography>
                </Box>
              </Box>
            </ParallaxLayer>
            <ParallaxLayer offset={10.2} speed={1}>
              <Box
                sx={{
                  width: '70vw',
                  marginLeft: '30vw',
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
                    'https://static01.nyt.com/images/2016/03/13/fashion/13MILES/13MILES-articleLarge.jpg?quality=75&auto=webp&disable=upscale'
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
                    <Typography variant='body2' color='textPrimary'>
                      Davis’ jazz transcended racial boundaries. Besides his
                      refusal to accept the Uncle Tom role that persisted among
                      black artists, Davis also refused the “Crow Jim”
                      phenomenon that some of his black contemporaries
                      practiced. “I think prejudice one way is just as bad as
                      the other way. I wouldn't have no other arranger but Gil
                      Evans - we couldn't be much closer if he was my brother.”
                      Davis respected this aspect of jazz that welcomes all to
                      participate and contribute.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </ParallaxLayer>
            <ParallaxLayer offset={11} speed={1.25}>
              <Box
                sx={{
                  width: '70vw',
                  marginLeft: '15vw',
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
                    'https://media.npr.org/assets/img/2012/01/31/miles-davis-2_wide-b2ba5a4cdd0039f88f30a83a579e47dc9874b5bd-s1400-c100.jpg'
                  }
                />
                <Box sx={{ position: 'absolute' }}>
                  <Box
                    sx={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      position: 'relative',
                      top: '20vh',
                      right: '300px',
                      width: '400px',
                      textAlign: 'left',
                    }}
                    p={1.5}
                  >
                    <Typography variant='body2' color='textPrimary'>
                      “Even in jazz - you look at the white bandleaders - if
                      they don't want anybody messing with them when they are
                      working, you don't hear anybody squawking. It's just if a
                      Negro is involved that there's something wrong with him.
                      My troubles started when I learned to play the trumpet and
                      hadn't learned to dance.” - <b>Miles Davis</b>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </ParallaxLayer>
            <ParallaxLayer offset={11.9} speed={0.75}>
              <Box
                sx={{
                  width: '70vw',
                  marginLeft: '15vw',
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
                    'https://s3.amazonaws.com/allaboutjazz/photos/a_large/0f830ac79973c8dbcc129874da68ea8b.jpg'
                  }
                />
                <Box sx={{ position: 'absolute' }}>
                  <Box
                    sx={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      position: 'relative',
                      top: '20vh',
                      right: '300px',
                      width: '400px',
                      textAlign: 'left',
                    }}
                    p={1.5}
                  >
                    <Typography variant='body2' color='textPrimary'>
                      Perhaps Davis' sometimes fierce commitment to music for
                      music's sake is what attracted him to the Village
                      Vanguard. With only 132 people able to squeeze into its
                      confines, the Vanguard forces the audience to engage with
                      the musicians practically within arm's reach. Indeed, the
                      Vanguard has forced countless people and musicians from
                      all walks of life into this intimate exchange since 1935.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </ParallaxLayer>

            {/* SAMARA JOY */}
            <audio loop ref={samaraJoyAudio}>
              <source src='/samarajoy.mp3' type='audio/mp3' />
              Your browser does not support the audio element.
            </audio>
            <ParallaxLayer offset={12.9} speed={0.75}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: '100%',
                  opacity: `${4 * (scrollRatio - 12.25)}`,
                }}
              >
                <Typography variant='h1' color='textPrimary'>
                  Samara Joy
                </Typography>
                <Typography variant='h3' color='textPrimary'>
                  1999 -
                </Typography>
              </Box>
            </ParallaxLayer>
            <ParallaxLayer
              sticky={{ start: 12.5, end: 15 }}
              style={{
                opacity: `${scrollRatio - 12}`,
                backgroundColor: 'black',
                zIndex: '-1',
              }}
            >
              <Box
                component='img'
                src='https://www.samarajoy.com/files/2022/08/samara-og-compressed.jpg'
                sx={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  objectFit: 'cover',
                  zIndex: '-1',
                }}
              />
            </ParallaxLayer>
            <ParallaxLayer
              sticky={{ start: 13, end: 15 }}
              sx={{ zIndex: '-1' }}
            >
              <Box
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  position: 'absolute',
                  top: '0',
                  right: `${(scrollRatio - 13) * 100}vw`,
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
                    Jazz Is Not Dead
                  </Typography>
                  <Typography
                    variant='body1'
                    color='textPrimary'
                    sx={{ textAlign: 'justify' }}
                    mb={2}
                  >
                    Today, the Village Vanguard remains at the forefront of jazz
                    innovation. After Max Gordon’s passing in 1989, his wife
                    Lorain Gordon took ownership of the club, and "championed
                    younger players, like the trio The Bad Plus and pianist Brad
                    Mehldau” much like her husband did. These aforementioned
                    acts continue to pioneer new sounds in jazz and tend to push
                    many layman listeners well beyond their comfort zone.
                    Indeed, jazz continues to evolve even today at the Village
                    Vanguard, and this is best embodied by a recent performer at
                    the club, Samara Joy.
                  </Typography>
                  <Typography
                    variant='body1'
                    color='textPrimary'
                    sx={{ textAlign: 'justify' }}
                    mb={2}
                  >
                    Joy’s position as a key proponent of contemporary jazz has
                    been solidified by her recent Grammy winnings, including
                    Best New Artist and Best Jazz Vocal. She is the second-ever
                    Jazz artist to win in the new artist category, which speaks
                    to her ability to keep the jazz conversation alive in
                    America. Joy, much like Lead Belly and Miles Davis,
                    participates in a jazz that is appreciative of other
                    cultures. With her genre and even language-blending style,
                    Joy shows genuine engagement with other musical cultures.
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
