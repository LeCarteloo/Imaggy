import {
  CalendarMonth,
  CameraAlt,
  Comment,
  Download,
  Favorite,
  Visibility,
} from '@mui/icons-material';
import {
  Box,
  CardHeader,
  Chip,
  Grid,
  Stack,
  SvgIconProps,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import {
  Avatar,
  CommentButton,
  DownloadButton,
  ImageSection,
  LikeButton,
  ShareButton,
} from '../components';

type InfoItemProps = {
  icon: React.ReactElement<SvgIconProps>;
  title: string | number;
  subtitle: string | number;
};

const InfoItem = ({ icon, title, subtitle }: InfoItemProps) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {icon}
        <Typography
          variant="overline"
          fontWeight={200}
          component="span"
          sx={{ ml: 0.5 }}
        >
          {title}
        </Typography>
      </Box>
      <Typography>{subtitle}</Typography>
    </Box>
  );
};

const PostPage = () => {
  const tag = ['test1', 'Nature', 'Very long tag', 'Nature', 'Very long tag'];

  return (
    <Container sx={{ pt: 4, pb: 6 }}>
      <CardHeader
        avatar={<Avatar width={50} height={50} name={'P'} surname={'P'} />}
        title="Post title"
        subheader="User name"
        action={
          <>
            <LikeButton
              isLiked={true}
              ariaLabel="like X user"
              onLike={() => {}}
            />
            <DownloadButton fileTitle="fileTitle" onDownload={() => {}} />
            <ShareButton />
            <CommentButton />
          </>
        }
      />
      <Box
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
      </Box>
      <Typography variant="body1" component="p" sx={{ mt: 3, mb: 2 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa facilis
        labore, explicabo dolorem dolore quia pariatur suscipit officiis in
        repudiandae eligendi tempora excepturi reprehenderit earum
        exercitationem incidunt eaque perferendis laborum.
      </Typography>
      <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
        Details
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          width: '100%',
          flexWrap: 'wrap',
        }}
      >
        <InfoItem
          icon={<Visibility fontSize="small" />}
          title="Views"
          subtitle={130000}
        />
        <InfoItem
          icon={<Favorite fontSize="small" />}
          title="Likes"
          subtitle={5330}
        />
        <InfoItem
          icon={<Download fontSize="small" />}
          title="Downloads"
          subtitle={300}
        />
        <InfoItem
          icon={<Comment fontSize="small" />}
          title="Comments"
          subtitle={15}
        />
        <InfoItem
          icon={<CalendarMonth fontSize="small" />}
          title="Published on"
          subtitle={'November 1, 2022'}
        />
        <InfoItem
          icon={<CameraAlt fontSize="small" />}
          title="Device used"
          subtitle={'Nikon D750'}
        />
      </Box>
      <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
        Tags
      </Typography>
      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
        {tag.map((tag) => (
          <Chip label={tag} clickable />
        ))}
      </Stack>
      <Box>
        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          More by X user
        </Typography>
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
        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          You might also like
        </Typography>
        <ImageSection />
      </Box>
    </Container>
  );
};

export default PostPage;
