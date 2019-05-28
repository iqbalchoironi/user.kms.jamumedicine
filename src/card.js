import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = muiBaseTheme => ({
  card: {
    maxWidth: 300,
    height: 315,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    paddingTop: "56.25%"
  },
  content: {
    textAlign: "left",
    padding: muiBaseTheme.spacing.unit * 3
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 3}px 0`
  },
  heading: {
    fontWeight: "bold"
  },
  subheading: {
    lineHeight: 1.8
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -muiBaseTheme.spacing.unit
    }
  }
});

const List = ({ item }) => {
  if(item.sname !== ''){
    return <li>{item.sname}</li>
  }

  return null;
}

function CardExample(props) {
  const {
    classes
  } = props;
    console.log(props)
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={props.image}
        />
        <CardContent className={classes.content}>
          <Typography
            className={"MuiTypography--heading"}
            variant={"h6"}
            gutterBottom
          >
            {props.name}
          </Typography>
          <Typography
            className={"MuiTypography--subheading"}
            variant={"caption"}
          >
           <ul className="reff">
                 {props.reff.map( item => (
                    <List item = { item } />
                ))} 
            
          </ul>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default withStyles(styles)(CardExample);
