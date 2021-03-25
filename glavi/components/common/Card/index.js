import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Icon } from "@material-ui/core";
import Bathtub from "@material-ui/icons/Bathtub";
import HotelIcon from "@material-ui/icons/Hotel";
import styles from "./Card.module.css";
import Grid from "@material-ui/core/Grid";
import AspectRatio from "@material-ui/icons/AspectRatio";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    justifyContent: "center",

    color: theme.palette.text.secondary,
  },

  font: {
    fontSize: 17,
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader title="Casa con piscina" subheader="CEDRITOS, Bogotá D.C." />
      <CardMedia
        className={classes.media}
        image="/herofondo.svg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          La casa ideal ddfg dfghdfh fgh fgh fghfdhfdgh fghfgh fhfdhg hg
          hdfhfdghhf gf hfhsfd
        </Typography>
      </CardContent>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs className={classes.paper}>
            <Icon>
              <AspectRatio />
              <Typography className={classes.font}>
                <span>44 m²</span>
              </Typography>
            </Icon>
          </Grid>

          <Grid item xs className={classes.paper}>
            <Icon>
              <HotelIcon />
              <Typography className={classes.font}>
                <span>4</span>
              </Typography>
            </Icon>
          </Grid>

          <Grid item xs className={classes.paper}>
            <Icon>
              <Bathtub />
              <Typography className={classes.font}>
                <span>4</span>
              </Typography>
            </Icon>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>La propiedad bla bla bla</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
