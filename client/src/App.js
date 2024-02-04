import YouTube from 'react-youtube';
import { Box } from '@mui/material';

function App() {
  const introVidId = 'zBs9gZQX7lQ';
  const introVidOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      loop: 1,
      // controls: 0,
      // disablekb: 1,
      // origin: window.location.origin,
    },
  };

  return (
    <Box sx={{ pointerEvents: 'none' }}>
      <YouTube
        videoId={introVidId}
        opts={introVidOpts}
        style={{ height: '100vh', width: '100vw' }}
        onReady={(event) => {
          event.target.playVideo();
        }}
        onError={(event) => {
          event.target.playVideo();
        }}
        onEnd={(event) => {
          event.target.playVideo();
        }}
      />
    </Box>
  );
}

export default App;
