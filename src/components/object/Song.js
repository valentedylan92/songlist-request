import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PanToolIcon from '@material-ui/icons/PanTool';
import Button from '@material-ui/core/Button';
import '../../App';

const styles = {
    typography: {
        useNextVariants: true,
      },
    card: {
        minHeight: 0,
        minWidth: 0,
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
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
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <div className="header">
                            <Typography noWrap component="h2" style={{color:'white'}}>
                                {this.props.song.title}
                            </Typography>
                        </div>
                        <div className={classes.cardContent}>
                            <div>
                                <Typography className={classes.contentInformation} component="p">
                                    <span className={classes.infoName}>Artist : </span>
                                    <span className={classes.info}>{this.props.song.artist}</span>
                                </Typography>
                            </div>
                            <div>
                                {this.renderMovie()}
                            </div>
                            <div>
                                <Typography className={classes.contentLink} noWrap component="p">
                                    <span className={classes.infoName}>Link of the sheet: </span>
                                    <span className={classes.infoLink}>{this.props.song.link}</span>
                                </Typography>
                            </div>
                        </div>
                    </CardContent>
                    <CardActions className={classes.action}>
                        <Button className={classes.button} ><PanToolIcon className={classes.icon} />Request</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

Song.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Song);
