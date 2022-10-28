import { Download } from '@mui/icons-material';
import { Tooltip, IconButton } from '@mui/material';

type DownloadButtonProps = {
  fileTitle: string;
  onDownload: () => void;
};

const DownloadButton = ({ fileTitle, onDownload }: DownloadButtonProps) => {
  return (
    <Tooltip title="Download">
      <IconButton
        sx={{ color: 'white' }}
        aria-label={`download ${fileTitle}`}
        onClick={onDownload}
      >
        <Download />
      </IconButton>
    </Tooltip>
  );
};

export default DownloadButton;
