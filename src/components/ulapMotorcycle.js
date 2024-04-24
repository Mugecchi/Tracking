import { makeStyles, createStyles } from "@material-ui/core/styles";
import CardFlip from "./CardFlip";
import { Container, Grid } from "@material-ui/core";

import Samp from "../images/ent_motorcycle.png";

const useStyles = makeStyles((theme) =>
  createStyles({
    cardImage: {
      resizeMode: "cover",
    },
    root: {
      display: "flex",
      flexWrap: "wrap",
      paddingTop: 300,
      overflow: "hidden",
    },
    linkHover: {
      color: "white",
      "&:hover": {
        color: "white",
      },
    },
  })
);
const App = () => {
  const classes = useStyles();
  return (
    <div>
      <div>
        <Container className={classes.root}>
          <h1>Features</h1>
          <Grid container spacing={8}>
            {/* Set spacing between cards */}
            {/* First card */}
            <Grid item>
              {/* Each card takes half of the space on smaller screens */}
              <CardFlip
                frontImage={Samp}
                backImage="back-image-url.jpg"
                Title="Card Title"
                Subtitle="Card Subtitle"
                frontcardColor="#FF7704"
                color="white"
                width={250} // Adjust the width as needed
                height={350} // Adjust the height as needed
              >
                <div>{/* Front Content goes here */}</div>

                <div>{/* Back Content goes here */}</div>
              </CardFlip>
            </Grid>
            <Grid item>
              <CardFlip
                frontImage="front-image-url.jpg"
                backImage="back-image-url.jpg"
                Title="Card Title"
                Subtitle="Card Subtitle"
                frontcardColor="#FF7704"
                color="white"
                width={250} // Adjust the width as needed
                height={350} // Adjust the height as needed
              >
                <div>{/*Front Content goes here */}</div>

                <div>{/*Back Content goes here */}</div>
              </CardFlip>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default App;
