import React, { useState } from "react";
import { Grid, makeStyles, Card, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  container: { paddingBottom: 30 },
  flipCard: (prop) => ({
    width: prop.width || 200,
    height: prop.height || 300,
    perspective: "1000px",
  }),
  flipCardInner: {
    width: "100%",
    height: "100%",
    transformStyle: "preserve-3d",
    transition: "transform 2s",
  },
  flipCardHover: {
    "&:hover $flipCardInner": {
      transform: "rotateY(-180deg)",
    },
  },
  flipCardFront: (props) => ({
    color: props.color || "white",
    position: props.position || "absolute",
    width: props.width || "100%",
    height: props.height || "100%",
    backfaceVisibility: props.backfaceVisibility || "hidden",
    backgroundColor: props.frontcardColor || "#FF7704",
    display: props.display || "flex",
    alignItems: props.align || "center",
    justifyContent: props.justify || "center",
    borderRadius: props.borderRadius || 10,
    boxShadow: props.boxShadow || "5px 5px 5px rgba(0,0,0,0.6)",
    border: `3px solid ${props.frontcardColor}` || "5px solid orange",
  }),
  flipCardBack: (props) => ({
    color: props.color || "white",
    position: props.position || "absolute",
    width: props.width || "100%",
    height: props.height || "100%",
    backfaceVisibility: props.backfaceVisibility || "hidden",
    backgroundColor: props.frontcardColor || "#FF7704",
    display: props.display || "flex",
    alignItems: props.align || "center",
    justifyContent: props.justify || "center",
    borderRadius: props.borderRadius || 10,
    boxShadow: props.boxShadow || "5px 5px 5px rgba(0,0,0,0.6)",
    border: `3px solid ${props.frontcardColor}` || "5px solid Black",
    transform: "rotateY(180deg)",
  }),
});

const CardFlip = (props) => {
  const classes = useStyles(props);
  const [isFlipped, setFlipped] = useState(false);

  const handleHover = () => {
    setFlipped(!isFlipped);
  };

  return (
    <div className={classes.container}>
      <div
        className={`${classes.flipCard} ${classes.flipCardHover}`}
        onMouseOver={handleHover}
        onMouseOut={handleHover}
      >
        <div className={classes.flipCardInner}>
          <Card className={classes.flipCardFront}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Box
                style={{
                  height: 75,
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  backgroundColor: props.frontcardColor || "#FF7704",
                  color: props.color || "black",
                  padding: "10px",
                }}
              >
                <Typography align="center">
                  <Box lineHeight={1} fontSize={20} fontWeight={900}>
                    {props.Title || "Title"}
                  </Box>
                </Typography>
                <Typography variant="body2">{props.Subtitle || ""}</Typography>
              </Box>
              {props.frontContent}
              {/* Add image here */}
              <img
                src={props.frontImage}
                alt="Front"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </Grid>
          </Card>
          <Card className={classes.flipCardBack}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Box
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  backgroundColor: props.frontcardColor || "#FF7704",
                  color: props.color || "white",
                  padding: "10px",
                }}
              ></Box>
              {props.backContent}
              {/* Add image here */}
              <img
                src={props.backImage}
                alt="Back"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </Grid>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CardFlip;
