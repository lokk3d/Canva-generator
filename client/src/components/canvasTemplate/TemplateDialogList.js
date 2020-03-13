import React, {useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

export default function AlertDialog({
    templates = [],
    open = false,
    onSave = (id) => console.log("Scelto il template: " + id),
    onClose = () => {}
}) {


    const [templateList, setTemplateList] = useState()

    useEffect(()=>{
        if(typeof templates !== "undefined"){
            setTemplateList(
                templates.map(item => {
                    return(
                        <ListItem button key={item._id} onClick={()=>onSave(item.components)}>
                            {item.title}
                        </ListItem>
                    )
                })
            )
        }
    }, [templates])


  return (

      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Scegli il template"}</DialogTitle>
        <DialogContent>
          <List>
              {templateList}
          </List>
          
        </DialogContent>
       
      </Dialog>
  );
}