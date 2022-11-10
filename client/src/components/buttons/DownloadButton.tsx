import { Download } from '@mui/icons-material';
import { Tooltip, IconButton } from '@mui/material';

type DownloadButtonProps = {
  fileTitle: string;
  size?: 'small' | 'medium' | 'large';
  onDownload: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const DownloadButton = ({
  fileTitle,
  size = 'medium',
  onDownload,
}: DownloadButtonProps) => {
  return (
    <Tooltip title="Download">
      <IconButton
        sx={{ color: 'white' }}
        aria-label={`download ${fileTitle}`}
        onClick={onDownload}
      >
        <Download fontSize={size} />
      </IconButton>
    </Tooltip>
  );
};

export default DownloadButton;
