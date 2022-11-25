import { Container, Box, Typography, Button, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ConsoleWindow from './ConsoleWindow';
import { motion } from 'framer-motion';
import { CodeBlock } from '../../components';
import {
  CollectionsOutlined,
  GroupOutlined,
  HubOutlined,
} from '@mui/icons-material';
import ImageSlide from './ImageSlide';

const headerAnimation = [
  {
    endpoint: 'https://localhost:8000/api/user/3',
    img: 'https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=683&q=80',
    result: `
    {
      "id": 3,
      "username": "placeholder3",
      "email": "placeholder3@email.com",
      "avatar": "",
      "name": "Place3",
      "surname": "Holder3",
      "bio": "",
      "isPro": false,
      "profileBg": "",
      "posts": [],
      "skills": [],
      "interest": [],
      "links": {
        "facebook": "#",
        "instagram": "#",
        "website": "#"
      },
      "location": "",
      "followers": [],
      "following": [],
      "likedPosts": []
    }
    `,
  },
  {
    endpoint: 'https://localhost:8000/api/post/1',
    img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80',
    result: `
    {
      "id": 1,
      "title": "First post",
      "image": "https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=683&q=80",
      "location": "Warsaw",
      "tags": ["Placeholder", "Placeholder1"],
      "description": "Short description",
      "views": 5,
      "downloads": 1,
      "device": "Nikon",
      "user": {
        "id": 2,
        "username": "placeholder2",
        "email": "placeholder2@email.com",
        "avatar": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
        "name": "Place2",
        "surname": "Holder2",
        "bio": "",
        "isPro": false,
        "profileBg": "",
        "posts": [
          {
            "id": 1,
            "title": "First post",
            "image": "https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=683&q=80",
            "location": "Warsaw",
            "tags": ["Placeholder", "Placeholder1"],
            "description": "Short description",
            "views": 5,
            "downloads": 1,
            "device": "",
            "likes": [],
            "comments": []
          }
        ],
        "skills": [],
        "interest": [],
        "links": {
          "facebook": "#",
          "instagram": "#",
          "website": "#"
        },
        "location": "",
        "followers": [],
        "following": [],
        "likedPosts": []
    },
    `,
  },
];

const infoBlocks = [
  {
    icon: <HubOutlined fontSize="large" sx={{ transform: 'scale(1.5)' }} />,
    title: '1.5K',
    subtitle: 'request/month',
  },
  {
    icon: (
      <CollectionsOutlined fontSize="large" sx={{ transform: 'scale(1.5)' }} />
    ),
    title: '1K',
    subtitle: 'photos',
  },
  {
    icon: <GroupOutlined fontSize="large" sx={{ transform: 'scale(1.5)' }} />,
    title: '50K',
    subtitle: 'users',
  },
];

const DevelopersPage = () => {
  const [anim, setAnim] = useState(headerAnimation[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnim(
        headerAnimation[Math.floor(Math.random() * headerAnimation.length)]
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Container>
        <Box component="section" sx={{ pt: { xs: '30px', md: '120px' } }}>
          <Box
            sx={{
              display: 'flex',
              gap: 4,
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography component="h1" variant="h2" fontWeight="bold">
                The most powerful photo engine in the world.
              </Typography>
              <Typography>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Voluptates minus itaque incidunt ratione consequatur minima et
                sapiente ipsum! Eum, atque?
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  mt: 3,
                  mb: 3,
                  gap: 2,
                }}
              >
                <Button variant="contained" component={Link} to="/register">
                  Register as developer
                </Button>
                <Button variant="outlined" component={Link} to="/documentation">
                  View documentation
                </Button>
              </Box>
              <Paper sx={{ p: 1.5 }}>
                <Typography>
                  Interested in using the Imaggy API in a high-volume
                  application? Get in touch with our Partnerships team at
                  partnerships@imaggy.pl
                </Typography>
              </Paper>
            </Box>
            <Box
              sx={{
                flex: 1,
                fontFamily: 'monospace',
                maxWidth: { xs: '100%', md: '500px' },
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <ConsoleWindow>
                  <motion.div
                    key={anim.result}
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.7,
                      ease: 'easeInOut',
                    }}
                  >
                    <span style={{ color: 'orange' }}>$ </span>
                    <span>curl {anim.endpoint}</span>
                    <CodeBlock language="js" code={anim.result} />
                  </motion.div>
                </ConsoleWindow>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: '-20px',
                    right: '10px',
                    width: '200px',
                  }}
                >
                  <ConsoleWindow height="120px">
                    <motion.img
                      key={anim.result}
                      animate={{ y: '0%', opacity: 1 }}
                      exit={{ y: '10%', opacity: 0 }}
                      initial={{ y: '-10%', opacity: 0 }}
                      transition={{
                        duration: 0.4,
                      }}
                      style={{
                        width: '100%',
                        height: '120%',
                        objectFit: 'cover',
                      }}
                      src={anim.img}
                    ></motion.img>
                  </ConsoleWindow>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              gap: 4,
              mt: 6,
            }}
          >
            {infoBlocks.map((block) => (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                {block.icon}
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h3" component="h4" fontWeight="bolder">
                    {block.title}
                  </Typography>
                  <Typography color="grey">{block.subtitle}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
      <ImageSlide />
    </>
  );
};

export default DevelopersPage;
