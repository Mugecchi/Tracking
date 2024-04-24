import CreateTracking from "./Tracking/CreateTracking";
import GetTracking from "./Tracking/GetTracking";
import { Grid, Paper } from "@material-ui/core";
const Test = () => {
  return (
    <div>
      <Grid>
        <Grid item xs={2}>
          <Paper>
            {" "}
            <CreateTracking />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <GetTracking />
        </Grid>
      </Grid>
    </div>
  );
};

export default Test;
