import React, { Component } from 'react';
import { BrowserRouter as  Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import '../../App';

const styles = {
    typography: {
        useNextVariants: true,
      },
    card: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection:'row-reverse',
        maxWidth: 360,
        width: '100%',
        height: 180
    },

    title: {
        marginBottom: 16,
        fontSize: 14,
    },

    content: {
        padding: 0,
    },

    cardContent: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        textAlign: "left",
    },

    contentInformation: {
        display: "flex",
        justifyContent: 'space-between',
    },

    infoName: {
        fontWeight: "bold",
        margin: 5,
    },

    info: {
        paddingLeft:40,
        margin: 5,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },

    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },

    pos: {
        display: "flex",
        marginTop: 25,
        fontSize:15,
        textAlign: "left",
        alignItems:"flex-end"
    },

    action: {
        paddingLeft: 4,
        paddingRight: 4,
        paddingBottom: 8,
        display: "flex",
        flexDirection: "column",
    },

    button: {
        backgroundColor: "#3F51B5",
        color: "white",
        // width: 130,
        padding: 10,
        '&:hover': {
            backgroundColor: "#1f285b",
          },
        '& span': {
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            color: "white",
        }
    },
    icon:{
        fontSize : 22,
        marginRight : 5
    },
    dateInfo:{
      display:'flex',
      justifyContent: "space-between",
    },
    contentLink:{
        display:'flex',
        flexDirection:'column'
    },
    infoLink:{
        paddingLeft:0,
        fontSize:12
    },

    details: {
      display: 'flex',
      flexDirection: 'column',
      padding: 15,
      paddingRight:0,
      maxWidth: 200,
      width: '100%'

    },

    cover: {
      width: '100%',
      height: '100%',
      maxWidth :160
    },
    linkImg:{
      display:'block',
      maxWidth :160,
      width: '100%'
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      justifyContent:'center',
      paddingRight: 15
    },
    playIcon: {
      height: 38,
      width: 38,
    },
    titleCard:{
      fontSize:20,
      fontWeight:300,
      marginBottom: 10,
      letterSpacing:2,
      textAlign:'left'

    },
    artist:{
      fontSize:16,
      marginBottom: 10,
      letterSpacing:2,
      textAlign:'left'

    },
    addIcon:{
      transitionProperty: 'background',
      transitionDuration: '600ms'

    },
    '@media (max-width : 600px)': {
    card: {
      flexDirection:'column-reverse',
      height : 250
    },
    titleCard:{
      fontSize : 16,
      marginBottom:5
    },
    artist:{
      fontSize : 12
    },
    cover:{
      height:100,
      maxWidth : 'inherit'
    },
    linkImg:{
      display:'block',
      width: '100%',
      maxWidth : 'inherit'

    }
  }
};

class Song extends Component{

    renderMovie(){
        if(this.props.song.movie !== ''){
          return(

             <Typography className={this.props.classes.contentInformation} noWrap component="p">
                <span className={this.props.classes.infoName}>Movie : </span>
                <span className={this.props.classes.info}>{this.props.song.movie}</span>
            </Typography>
          )
        }
      }

    render(){
        const { classes } = this.props;
        return (
          <div className='song'>
            <Card className={classes.card + ' cardResponsive'}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography className={classes.titleCard} component="h5">
                  {this.props.song.title}

                  </Typography>
                  <Typography className={classes.artist}  color="textSecondary">
                    {this.props.song.artist}
                  </Typography>
                </CardContent>
                <div className={classes.controls}>
                  <Link className={classes.linkNav} key={this.props.song.id} to='/queue'>

                  <IconButton className={classes.addIcon} aria-label="Add">
                    <AddCircleOutlinedIcon className={classes.playIcon} />
                  </IconButton>

                  </Link>

                </div>
              </div>
              <a className={classes.linkImg} href={this.props.song.link} target="_blank" rel="noreferrer noopener">
              <CardMedia
                className={classes.cover}
                image={this.props.song.img}
                title={"Cover " + this.props.song.title + " - " + this.props.song.artist}
              />
              </a>


            </Card>
          </div>
        );
    }
}

Song.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Song);
