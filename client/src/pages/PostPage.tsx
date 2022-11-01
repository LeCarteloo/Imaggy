import { Box, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import {
  Avatar,
  DownloadButton,
  ImageSection,
  LikeButton,
} from '../components';

const PostPage = () => {
  return (
    <Container sx={{ pt: 4 }}>
      <CardHeader
        avatar={<Avatar width={50} height={50} name={'P'} surname={'P'} />}
        title="Post title"
        subheader="User name"
        action={
          <>
            <LikeButton
              isLiked={true}
              onLike={() => {}}
              ariaLabel="like X user"
            />
            <DownloadButton fileTitle="fileTitle" onDownload={() => {}} />
          </>
        }
      />
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <img
          src="/images/photo.avif"
          style={{
            objectFit: 'cover',
            height: '100%',
            maxHeight: '750px',
            maxWidth: '100%',
            borderRadius: '4px',
          }}
        />
        <Typography variant="body1" component="p" sx={{ mt: 4, mb: 4 }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa facilis
          labore, explicabo dolorem dolore quia pariatur suscipit officiis in
          repudiandae eligendi tempora excepturi reprehenderit earum
          exercitationem incidunt eaque perferendis laborum.
        </Typography>
        <hr style={{ width: '100%' }} />
      </CardContent>
      <Container>
        <Typography variant="h6">More by X user</Typography>
        <Grid container spacing={2}>
          {[1, 2, 3, 4].map((test) => (
            <Grid item xs={12} sm={6} md={3}>
              <img
                src="/images/photo.avif"
                style={{
                  objectFit: 'cover',
                  borderRadius: '4px',
                  height: '100%',
                  width: '100%',
                  maxHeight: '250px',
                  aspectRatio: '1/1',
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <hr style={{ width: '100%' }} />
      <Container>
        <Typography variant="h6">You might also like</Typography>
        <ImageSection />
      </Container>
    </Container>
  );
};

export default PostPage;
