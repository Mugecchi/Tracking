import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { Paper, Modal, Backdrop, Fade } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    elevation: 10,
    backgroundColor: "ddd",
  },
  imageList: {
    width: 600,
    height: 600,
    transform: "translateZ(0)",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    borderRadius: "5px",
  },
  modalImage: {
    maxWidth: "80vw",
    maxHeight: "80vh",
  },
}));

export default function LandingPage({ itemData = [], header }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = (img) => {
    setSelectedImage(img);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <ImageList rowHeight={300} gap={0} className={classes.imageList}>
          {header && (
            <ImageListItem key="Subheader" cols={2} style={{ height: "auto" }}>
              <ListSubheader component="div">{header}</ListSubheader>
            </ImageListItem>
          )}

          {itemData.map((item) => (
            <ImageListItem
              key={item.img}
              cols={item.featured ? 2 : 1}
              rows={item.featured ? 2 : 1}
              onClick={() => handleOpen(item.img)}
            >
              <img src={item.img} alt={item.title} />
              {item.title && (
                <ImageListItemBar
                  title={item.title}
                  subtitle={<span>{item.subtitle}</span>}
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${item.title}`}
                      className={classes.icon}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              )}
            </ImageListItem>
          ))}
        </ImageList>
      </Paper>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.modalContent}>
            <img
              src={selectedImage}
              alt="Selected"
              className={classes.modalImage}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
