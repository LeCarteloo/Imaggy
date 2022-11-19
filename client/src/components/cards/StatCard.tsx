import { Card, CardContent, Typography } from '@mui/material';

interface StatCardProps {
  title: string;
  desc: string;
  bgColor?: string;
  fontColor?: string;
}

const StatCard = ({ title, desc, bgColor, fontColor }: StatCardProps) => {
  return (
    <Card>
      <CardContent
        sx={{
          minHeight: '250px',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: bgColor,
          gap: 4,
          color: fontColor,
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
        <Typography>{desc}</Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;
