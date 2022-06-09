import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type AlertDialogProps = {
  title?: string;
  content?: string;
  okButton?: string;
  cancelButton?: string;
  open: boolean;
  handleClose: () => void;
  handleOk: () => void;
};

export default function AlertDialog({
  title = 'New alert message',
  content,
  okButton = 'OK',
  open = false,
  cancelButton = 'Cancel',
  handleClose,
  handleOk,
}: AlertDialogProps) {

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{cancelButton}</Button>
          <Button onClick={handleOk} autoFocus>
            {okButton}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
