import {
  Box,
  Paper,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

const FaqSection = () => {
  const faqList = [
    {
      question: 'Faq question #1',
      answer:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium consequatur minima harum velit exercitationem rem. Rem ipsam doloremque veniam sit?',
    },
    {
      question: 'Faq question #2',
      answer:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium consequatur minima harum velit exercitationem rem. Rem ipsam doloremque veniam sit?',
    },
    {
      question: 'Faq question #3',
      answer:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium consequatur minima harum velit exercitationem rem. Rem ipsam doloremque veniam sit?',
    },
    {
      question: 'Faq question #4',
      answer:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium consequatur minima harum velit exercitationem rem. Rem ipsam doloremque veniam sit?',
    },
  ];

  return (
    <Paper component={'section'} sx={{ mt: 10 }}>
      <Container sx={{ pt: 10, pb: 10 }}>
        <Typography variant="h3" component="h2" sx={{ pb: 3 }}>
          Frequently asked questions
        </Typography>
        <Typography>Haven't found what you're looking for?</Typography>
        <Typography>Try our Help Center — we're here to help.</Typography>
        <Box sx={{ mt: 3 }}>
          {faqList.map((item) => (
            <Accordion>
              <AccordionSummary aria-controls={`${item} content`}>
                <Typography>{item.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Paper>
  );
};

export default FaqSection;
