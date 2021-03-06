import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ImportExportIcon from '@material-ui/icons/ImportExport';


const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    display:"flex", 
    flexDirection:"column",
    padding: 20,
    margin: 0,
    alignItems:"center",
    justifyContent: "center"
  },
  col:{
    display:"flex", 
    flexDirection:"column",
    alignItems:"center",
    justifyContent: "center",
    padding:20
  }
});


function LandingPage() {
  const classes = useStyles();

  return (
    <div >
        <h1 className={classes.root}>Benvenuto! </h1>
        <br/>
        <div className={classes.col} >
          <h3>Cosa puoi fare con questa piattaforma? </h3>

          <List component="nav" aria-label="main mailbox folders">
          <ListItem button>
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Crea e personalizza le tue canvas" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <ImportExportIcon />
            </ListItemIcon>
            <ListItemText primary="Carica le canvas di default dai template" />
          </ListItem>
          
        </List>

        <Button variant="contained" color="primary" 
        style={{padding: 10, width:300, marginTop:20}}
        onClick={()=>{window.location ="/signup"}}>crea un account</Button>

        <ExpansionPanel style={{marginTop:50, maxWidth: 500, marginBottom: 50}}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Come funziona?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
            <iframe
            src="https://www.youtube.com/embed/3XhBCOxjyG0" 
            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen></iframe>
            <p>
              Questo tool ti permette di creare le tue canvas personalizzate.
              Puoi infatti aggiungere/modificare le varie board.
              In ogni board puoi aggiungere più post-it dei quali puoi modificare anche il colore di sfondo.
              Se non hai esigenze particolari puoi utilizzare i template già pronti :) 
              P.s. questa è una versione alpha. Se hai qualche suggetimento o qualche bug da segnalare #escilo
            </p>
            </div>
           
          </ExpansionPanelDetails>
        </ExpansionPanel>
        
      </div>
     
    </div>
  );
}

export default LandingPage;
