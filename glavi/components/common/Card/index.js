import React, { useState, useEffect } from "react";
import axios from "axios";
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
import useInmuebles from "./../../../hooks/useInmuebles";
//import ReactImageProcess from "react-image-process";
//import watermarkImage from "./../../../public/logowatermark.png";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    boxShadow: "0px 2px 15px 3px rgb(0 0 0 / 20%)",
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

  description: {
    height: 142,
    overflow: "hidden",
  },

  descriptionCorta: {
    height: 111,
    overflow: "hidden",
  },

  titulo: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 700,
    paddingLeft: 17,
    paddingRight: 17,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20,
    color: "#7d7d7d",
  },

  subtitulo: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 400,
    paddingLeft: 17,
    paddingRight: 17,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 22,
    color: "#ffffff",
    backgroundColor: "#7fd4e9",
  },
}));

export default function RecipeReviewCard() {
  useEffect(() => {
    const getInmuebles = async () => {
      const resultado = await axios.get("http://192.34.57.251/inmuebles");
      console.log(resultado);
      setInmuebles(resultado.data);
    };
    getInmuebles();
  }, []);

  const [inmuebles, setInmuebles] = useState([]);

  const { Inmuebles } = useInmuebles(inmuebles);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const PrecioTarjeta = (props) => {
    if (props.arriendo && props.venta) {
      return `Arriendo: ${props.arriendo} Venta: ${props.venta}`;
    }

    if (props.arriendo) {
      return `Arriendo: ${props.arriendo}`;
    }
    if (props.venta) {
      return `Venta: ${props.venta}`;
    }
  };

  const Descripcion = (props) => {
    if (props.arriendo && props.venta) {
      return (
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.descriptionCorta}
        >
          {props.descripcion}
        </Typography>
      );
    } else {
      return (
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.description}
        >
          {props.descripcion}
        </Typography>
      );
    }
  };

  return (
    <div className={styles.container_cards}>
      {inmuebles.map((inmueble) => (
        <div className={styles.individualCard} key={inmueble.id}>
          <Card className={classes.root}>
            <div className={classes.titulo}>{inmueble.titulo}</div>
            <div className={classes.subtitulo}>
              {
                <PrecioTarjeta
                  arriendo={inmueble.arriendoPrecio}
                  venta={inmueble.ventaPrecio}
                />
              }
            </div>
          
              <CardMedia
                className={classes.media}
                image={`http://192.34.57.251${inmueble.portada.url}`}
                title="Glavi Propiedades"
              />
            
            <CardContent>
              <Descripcion
                descripcion={inmueble.descripcion}
                arriendo={inmueble.arriendoPrecio}
                venta={inmueble.ventaPrecio}
              />
            </CardContent>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs className={classes.paper}>
                  <Icon>
                    <AspectRatio />
                    <Typography className={classes.font}>
                      <span>{`${inmueble.areaConstruida}m²`}</span>
                    </Typography>
                  </Icon>
                </Grid>

                <Grid item xs className={classes.paper}>
                  <Icon>
                    <HotelIcon />
                    <Typography className={classes.font}>
                      <span>{inmueble.habitaciones}</span>
                    </Typography>
                  </Icon>
                </Grid>

                <Grid item xs className={classes.paper}>
                  <Icon>
                    <Bathtub />
                    <Typography className={classes.font}>
                      <span>{inmueble.bathroom}</span>
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
              ></IconButton>
            </CardActions>
            
          </Card>
        </div>
      ))}
    </div>
  );
}
