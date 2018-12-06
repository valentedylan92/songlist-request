import React, { Component } from 'react';
import { BrowserRouter as  Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
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
        height: 180,
        overflow:"inherit",

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
    iconSubinfos:{
      color : 'white',
      position :'absolute',
      top : '50%',
      left : '50%',
      transform : 'translate(-50%,-50%)',
      fontSize : 25,
      zIndex:20000,
    },

    cover: {
      width: '100%',
      height: '100%',
      maxWidth :160
    },
    linkImg:{
      display:'block',
      maxWidth :160,
      width: '100%',
      position:'relative'

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
    SubInfosFav:{
      width:'40px',
      height: '40px',
      background: '#ff2344',
      position: 'absolute',
      bottom:-10,
      left:-10,
      borderRadius:'100%',

    },
    SubInfosNew:{
      width:'40px',
      height: '40px',
      background: '#3f51b5',
      position: 'absolute',
      bottom:-10,
      left:-10,
      borderRadius:'100%',

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
      maxWidth : 'inherit',
    },
  }
};

class Song extends Component{
    handleQueue(){
        this.props.queue(this.props.song);
        console.log(this.props.song)
    }
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
                  <Link to='/queue'>
                  <Button onClick={()=>this.handleQueue()} className={classes.addIcon} aria-label="Add">
                    <AddCircleOutlinedIcon className={classes.playIcon} />
                  </Button>
                  </Link>

                </div>
              </div>
              <a className={classes.linkImg} href={this.props.song.link} target="_blank" rel="noreferrer noopener">
              {this.props.song.subInfos !== '' && this.props.song.subInfos==='fav' ?
              <div className={classes.SubInfosFav + ' scaleEffect'}>
                <FavoriteIcon className={classes.iconSubinfos} />
              </div> : ''
              }
              {this.props.song.subInfos !== '' && this.props.song.subInfos==='new' ?
              <div className={classes.SubInfosNew + ' scaleEffect'}>
                <NewReleasesIcon className={classes.iconSubinfos} />
              </div> : ''
              }
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
