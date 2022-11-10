import {
  CalendarMonth,
  CameraAlt,
  Comment,
  Download,
  Favorite,
  Visibility,
} from "@mui/icons-material";
import {
  Box,
  CardHeader,
  Chip,
  Grid,
  Stack,
  SvgIconProps,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../api/postsApi";
import { useParams } from "react-router-dom";
import {
  Avatar,
  CommentButton,
  DownloadButton,
  ImageSection,
  LikeButton,
  ShareButton,
} from "../components";
import Loader from "../Loader";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { UserInterface } from "../types/types";

type DetailsItemProps = {
  icon: React.ReactElement<SvgIconProps>;
  title: string | number;
  subtitle: string | number;
};

const DetailsItem = ({ icon, title, subtitle }: DetailsItemProps) => {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
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
  const [isLiked, setIsLiked] = useState(false);
  const { postId } = useParams();
  const authUser = useUserContext();

  // TODO: Change any type to PostInterface later
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<any | Error>({
    queryKey: ["post", postId],
    enabled: Boolean(postId),
    queryFn: () => getPost(postId),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    // TODO: Remove ? later
    const isPostLiked = post?.likes.find(
      (user: UserInterface) => user.id === authUser.id
    );

    setIsLiked(Boolean(isPostLiked));
  }, []);

  if (isLoading || isError) {
    return <Loader />;
  }

  const details = [
    {
      icon: <Visibility fontSize="small" />,
      title: "Views",
      subtitle: post.views,
    },
    {
      icon: <Favorite fontSize="small" />,
      title: "Likes",
      subtitle: post.likes.length,
    },
    {
      icon: <Download fontSize="small" />,
      title: "Downloads",
      subtitle: post.downloads,
    },
    {
      icon: <Comment fontSize="small" />,
      title: "Comments",
      subtitle: post.comments.length,
    },
    {
      icon: <CalendarMonth fontSize="small" />,
      title: "Published on",
      // TODO: Add timestamp to post interface and mongodb model
      subtitle: post?.timestamp,
    },
    {
      icon: <CameraAlt fontSize="small" />,
      title: "Device used",
      subtitle: post.device,
    },
  ];

  return (
    <Container sx={{ pt: 4, pb: 6 }}>
      <CardHeader
        avatar={<Avatar width={50} height={50} name={"P"} surname={"P"} />}
        title={post.title}
        subheader={`@${post.user.username}`}
        action={
          <>
            <LikeButton
              isLiked={isLiked}
              ariaLabel={`${isLiked ? "Like" : "Unlike"} ${post.title}`}
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
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={post.image}
          style={{
            objectFit: "cover",
            height: "100%",
            maxHeight: "750px",
            maxWidth: "100%",
            borderRadius: "4px",
          }}
        />
      </Box>
      <Typography variant="body1" component="p" sx={{ mt: 3, mb: 2 }}>
        {post.description}
      </Typography>
      <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
        Details
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {details.map((detailItem) => (
          <DetailsItem
            icon={detailItem.icon}
            title={detailItem.title}
            subtitle={detailItem.subtitle}
          />
        ))}
      </Box>
      <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
        Tags
      </Typography>
      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
        {post.tags.map((tag, i) => (
          <Chip label={tag} clickable key={`chip-${i}`} />
        ))}
      </Stack>
      <Box>
        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          More by X user
        </Typography>
        <Grid container spacing={2}>
          {[1, 2, 3, 4].map((test, i) => (
            <Grid item xs={12} sm={6} md={3} key={`image-${i}`}>
              <img
                src="/images/photo.avif"
                style={{
                  objectFit: "cover",
                  borderRadius: "4px",
                  height: "100%",
                  width: "100%",
                  maxHeight: "250px",
                  aspectRatio: "1/1",
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
