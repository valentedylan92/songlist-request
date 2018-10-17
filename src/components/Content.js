import React, { Component } from 'react';
import config from '../config';
import {load} from '../utils/spreadsheets';
import { withStyles } from '@material-ui/core/styles';
import Song from './object/Song';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { names } from './object/Skills';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';



const styles = theme => ({
    typography: {
        useNextVariants: true,
      },
    paper: {
    position: 'absolute',
    width: theme.spacing.unit * 80,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    },
    root: {
    width: '100%',
    },
    grow: {
    marginLeft: 15
    },
    menuButton: {
    marginLeft: -12,
    marginRight: 20,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
          display: 'block',
      },
    },
    search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit,
        width: 'auto',
      },
    },

 containerNoresult:{
   marginTop: 40,
 },
 noResult:{
    fontSize :20,
    color:"#3F51B5",

 },
 progress: {
    margin: theme.spacing.unit * 2,
  },
 searchIcon: {
        width: theme.spacing.unit * 6,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
            width: 200,
            },
        },
    },
    contentModal:{
      marginTop: 10,
      marginBottom: 10
    },
    icon:{
        fontSize: 18,
        marginLeft: 10,
    },
    iconSend:{
        fontSize: 22,
        marginLeft: 10,
    },
    row:{
      float: "right",
      fontSize:14,
    },

      closeButton:{
        cursor:"pointer",
        position: "absolute",
        top: 5,
        fontSize: 25,
        opacity:1,
        transitionProperty: 'all',
        transitionDuration: '800ms',
        '&:hover':{
          transform: 'rotate(180deg)',

        }

    },
    containerSelect: {
    margin: theme.spacing.unit,
    display:'flex',
    minWidth: 120,
    width:"100%"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  labelSelect:{
    textAlign:"left",
    color:'white'
  },
  selectSkill:{
    color:theme.palette.common.white,

    '&::before':{
      borderColor:theme.palette.common.white,
      '&:hover': {
        borderColor:theme.palette.common.white,
      },
    },
    '& svg':{
      color:theme.palette.common.white,
    },
  },

  chip:{
    fontSize:14,
    textTransform:"uppercase",
    margin: theme.spacing.unit / 4,
    color : theme.palette.common.white,

  },
  formControl: {
   margin: theme.spacing.unit,
   minWidth: 120,
   maxWidth: 300,
   '&:hover':{
     borderColor:theme.palette.common.white
   }
 },
 chips: {
   display: 'flex',
   flexWrap: 'wrap',
   marginTop: 25
 },
 optionSkill:{
   textTransform:'uppercase'
 },


});

class Content extends Component {

  onLoad = (data, error) => {
    if (data) {
      this.setState({
        rows: data.rows
      });
    } else {
      this.setState({ error});
    }
  };


  componentDidMount() {
  // 1. Load the JavaScript client library.
  window.gapi.load("client", this.initClient);
  }


  initClient = () => {
  // 2. Initialize the JavaScript client library.
    window.gapi.client
      .init({
        apiKey: config.apiKey,
        // Your API key will be automatically added to the Discovery Document URLs.
        discoveryDocs: config.discoveryDocs
      })
      .then(() => {
      // 3. Initialize and make the API request.
      load(this.onLoad);
    });
  };

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            data: {},
            rows: [],
            error: null,
            searchArtist: "",
            searchTitle: "",
            skill: [],
            anchorEl: null,

        }
    }

    handleClickMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };

    handleChangeSkill = (name) => {
      console.log(name)
      if(this.state.skill.indexOf(name) < 0){
        this.state.skill.push(name);
      }else{
        this.state.skill.forEach(function(el,index,array){
          if(el===name){
            array.splice(index,1)
          }
        })
      }
      this.setState({skill:this.state.skill})
      this.renderChip();
    };

    renderChip(){
      if(this.state.skill !== ""){
        return(
        this.state.skill.map(value => (
          <Chip key={value} color="primary" label={value} onDelete={this.handleDelete}  className={this.props.classes.chip}  />
        ))
      )

      }
    }

    handleChangeKey(e){
        let regex= /([A-Za-z0-9éèùúáàóòíìâêîôûäëïöüç& ])/g;
        if(e.target.value && e.target.value.match(regex)){
        this.setState({searchArtist: e.target.value.match(regex).join('')});
        }else{
            this.setState({searchArtist: ""});
        }
    };

    handleChangeTitle(e){
        let regex= /([A-Za-z0-9éèùúáàóòíìâêîôûäëïöüç ])/g;
        if(e.target.value && e.target.value.match(regex)){
            this.setState({searchTitle: e.target.value.match(regex).join('')});
        }else{
            this.setState({searchTitle: ""});

        }

    }

    data(test){
        this.setState({data: test})
        this.handleOpen()
    }

    handleOpen(){
        this.setState({ open: true });
    };

    handleClose(){
        this.setState({ open: false });
    };

    handleDelete = event => {
      this.state.skill.forEach(function(el,index,array){
        if(el===event.currentTarget.previousElementSibling.innerHTML){
          array.splice(index,1)
        }
      })
      this.setState({skill:this.state.skill})
      this.renderChip();
      }

    renderContent(){
      if(this.state.rows.length === 0){
        return(
          <div className={this.props.classes.containerNoresult}>
              <CircularProgress size={70} className={this.props.classes.progress} />
          </div>
        )
      }
      else{
        let filterKeywords = this.state.rows.filter((row) => {
            let search = row.artist;
            return search.toLowerCase().match(this.state.searchArtist);
        }).filter((title) => {
            let result = title.title;
            return result.toString().toLowerCase().match(this.state.searchTitle);
        });

        if(this.state.skill.length !== 0){
          this.state.skill.forEach(function(el){
            filterKeywords = filterKeywords.filter((skill) => {
                let search = skill.skills;
                return search.toLowerCase().match(el);
            });
          })
        }
        if(filterKeywords.length === 0){
         return(
           <div className={this.props.classes.containerNoresult}>
              <Typography className={this.props.classes.contentNoResults} component="p">
                <span className={this.props.classes.noResult}>No results found.</span>
              </Typography>
            </div>
          )
        }else{
          const listSong = filterKeywords.map((row, i) =>  {
            return (
              <Song
                  key={i}
                  song={row}
                  data={this.data.bind(this)}
              />
            )
          })
          return listSong;
        }

      }

    }



    render() {
      const { anchorEl } = this.state;
        const { classes } = this.props;
       

        return (
            <div>
              <div>
              <AppBar position="static">
               <Toolbar className="barResponsive">
                 
                 <div className={classes.search + " inputResponsive"}>
                   <div className={classes.searchIcon}>
                     <SearchIcon />
                   </div>
                   <InputBase
                     placeholder="Search an artist…"
                     type="text"
                     value={this.state.searchArtist}
                     onChange={this.handleChangeKey.bind(this)}
                     classes={{
                       root: classes.inputRoot,
                       input: classes.inputInput,
                     }}
                   />
                 </div>
                 <div className={classes.search + " inputResponsive"}>
                   <div className={classes.searchIcon}>
                     <SearchIcon />
                   </div>
                   <InputBase
                     placeholder="Search a Title..."
                     type="text"
                     value={this.state.searchTitle}
                     onChange={this.handleChangeTitle.bind(this)}
                     classes={{
                       root: classes.inputRoot,
                       input: classes.inputInput,
                     }}
                   />
                 </div>
                 {/*<div className = {classes.containerSelect + " select-responsive"}>

                            <Button
                        onClick={this.handleClickMenu}
                        aria-owns={anchorEl ? 'simple-menu' : null}
                        aria-haspopup="true"
                        className="menuSelect"
                      >
                        Select your skill
                      </Button>
                      <Menu
                        id="simple-menu"
                        onClose={this.handleCloseMenu}
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                      >
                       {names.map(name => (

                         <MenuItem
                           className={classes.optionSkill}
                           key={name}
                           value={name}
                           button={Boolean(true)}
                           onClick={()=>this.handleChangeSkill(name)}
                           >
                           <Checkbox checked={this.state.skill.indexOf(name) > -1}  value={name}/>
                           <ListItemText primary={name}  value={name}/>
                         </MenuItem>
                       ))}*/}
                     {/*</Select>*/}
                     {/*</Menu>*/}


                  {/*</div>*/}
               </Toolbar>
             </AppBar>
                </div>
                <div className={classes.chips}>
                {this.renderChip()}
                </div>

                <div className="cards">
                  {this.renderContent()}
                </div>
                
            </div>
        );
    }
}

export default withStyles(styles)(Content);
