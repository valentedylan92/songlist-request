import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import Song from './object/Song';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import deburr from 'lodash/deburr';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import config from '../config';
import {load} from '../utils/spreadsheets';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';


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
    flexGrow: 1,

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

 container: {
   position: 'relative',
 },
 suggestionsContainerOpen: {
   position: 'fixed',
   zIndex: 1300,
   marginTop: theme.spacing.unit,
   right: 20,
   top: 39,
   width: 150
 },
 suggestion: {
   display: 'block',
 },
 suggestionsList: {
   margin: 0,
   padding: 0,
   listStyleType: 'none',
 },
 divider: {
   height: theme.spacing.unit * 2,
 },
 appBar:{
   top:64,
   width: 'calc(100% - 240px)',
   boxShadow:'0 4px 2px -2px gray;'
 },
 inputSearch:{
   position: 'fixed',
   top: 13,
   right: 20,
   zIndex: 1200,
   width: 150,
   color:'white',
   borderBottomColor:'white',
   borderBottomWidth:1,
   borderBottomStyle:'solid',
 }


});


class Content extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      data: {},
      rows: [],
      error: null,
      single:'',
      searchKeywords: "",
      suggestions: []
    }
  }

   renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;

    return (
      <TextField
        className= "inputSearchSong"
        InputProps={{
          inputRef: node => {
            ref(node);
            inputRef(node);
          },
          classes: {
            input: classes.inputSearch,
          },
        }}
        {...other}
      />
    );
  }

   renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion, query);
    const parts = parse(suggestion, matches);
    return (
      <ListItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            );
          })}
        </div>
      </ListItem>
    );
  }

   getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    let keyWords = [];
    this.state.rows.forEach( el => {
        keyWords.push(el.artist);
        keyWords.push(el.title);
    })
    let unique_array = keyWords.filter(function(elem, index, self) {
       return index === self.indexOf(elem);
     });

    return inputLength === 0
      ? []
      : unique_array.filter(suggestion => {
          const keep =
            count < 8 && suggestion.slice(0, inputLength).toLowerCase() === inputValue;
          if (keep) {
            count += 1;
          }
          return keep;
        });
  }

   getSuggestionValue(suggestion) {
    return suggestion;
    }

    handleSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: this.getSuggestions(value),
      });
    };

    handleSuggestionsClearRequested = () => {
      this.setState({
        suggestions: [],
      });
    };

    handleChange = (event, { newValue }) => {
      this.setState({
        single: newValue,
      });
    };


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


    handleClickMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
    };

    handleCloseMenu = () => {
      this.setState({ anchorEl: null });
    };

    handleChangeKey(e, { newValue }){
        let regex= /([A-Za-z0-9éèùúáàóòíìâêîôûäëïöüç& ])/g;
        if(e.target.value && e.target.value.match(regex)){
        this.setState({searchKeywords: e.target.value.match(regex).join('')});
        }else{
            this.setState({searchKeywords: ""});
        }
        this.setState({
          searchKeywords: newValue,
        });
    };

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
            let search = row.artist + ' ' + row.title;
            return search.match(this.state.searchKeywords);
        })
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

                  <Autosuggest
                    suggestions ={ this.state.suggestions}
                    onSuggestionsFetchRequested = {this.handleSuggestionsFetchRequested}
                    onSuggestionsClearRequested = {this.handleSuggestionsClearRequested}
                    renderInputComponent = {this.renderInputComponent}
                    getSuggestionValue = {this.getSuggestionValue}
                    renderSuggestion = {this.renderSuggestion}

                    onChange={this.handleChangeKey.bind(this)}
                    inputProps={{
                      classes,
                      placeholder: 'Search',
                      value: this.state.searchKeywords,
                      onChange: this.handleChangeKey.bind(this)
                    }}
                    theme={{
                      container: classes.container,
                      suggestionsContainerOpen: classes.suggestionsContainerOpen,
                      suggestionsList: classes.suggestionsList,
                      suggestion: classes.suggestion,
                    }}
                    renderSuggestionsContainer={options => (
                      <Paper  {...options.containerProps} square>
                        {options.children}
                      </Paper>
                    )}
                  />
                  <div className={classes.divider} />


                <div className="cards">
                  {this.renderContent()}
                </div>

            </div>
        );
    }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Content);
