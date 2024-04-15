import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Modal = ({ open, onClose, children, title }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='customized-dialog-title'
      PaperProps={{
        style: { maxWidth: "400px", width: "100%" },
      }}
    >
      <DialogContent dividers>
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <div className='flex flex-col items-center'>
          {title && (
            <h2 id='customized-dialog-title' className='font-bold text-2xl'>
              {title}
            </h2>
          )}
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
