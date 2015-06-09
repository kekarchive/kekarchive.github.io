  window.onload = function() {
      	var drag = ToolMan.drag()
   	var shortcutWindow = document.getElementById("shortcut")
   	group = drag.createSimpleGroup(shortcutWindow, document.getElementById("shortcutinner"))
  }

      var ids = new Array('shortcutartist', 'shortcutfilmartist', 'shortcutrelease', 'shortcutlabel', 'shortcutwork', 'shortcutfilm','shortcutvideo', 'shortcutpicture');
      function viewshortcut (name, func)
      {
         for(i = 0; i < ids.length; i++ )
         {
            if ( name == ids[i] ) 
            {
               did('shortcutsearchframe').src = '/go/search2?type=' + name + '&func=' + func;
               document.getElementById('btn'+ids[i]).style.background='#bbf';
            }
            else
            {
               if ( document.getElementById('btn'+ids[i]) )
               {
                     document.getElementById('btn'+ids[i]).style.background='#eef';
               }
            }
         }
        return false;
      }
//      viewmusic('shortcutartist');  
  function insertAtCursor(myField, myValue) {
      //IE support
      if (document.selection) {
            myField.focus();
            sel = document.selection.createRange();
            sel.text = myValue;
            }
            //MOZILLA/NETSCAPE support
            else if (myField.selectionStart || myField.selectionStart == '0') {
            var startPos = myField.selectionStart;
            var endPos = myField.selectionEnd;
            myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
      } else {
             myField.value += myValue;
      }
}

  var currentArtistElement = null; 

  var oldbackground = '#ccc';

  var inShortcut = false;
  
  var currentElement = null;
  function openShortcut(element)
  {
      currentElement = element;
      if ( currentArtistElement == null ) 
      {
      //   alert('click where you want to add the artist first.');
      //   return;
      }
      var pos = Position.get(element);
      var shortcutEl = did('shortcut');

      shortcutEl.style.top=pos.top + 'px';
      shortcutEl.style.left=(pos.left + pos.width + 20) + 'px';

      did('shortcut').style.display='';
      inShortcut=true;
      if ( currentArtistElement )
      {
         oldbackground = currentArtistElement.style.background;
         currentArtistElement.style.background = '#fdc';
      }
  }
  function closeShortcut()
  {
      did('shortcut').style.display='none';
      inShortcut=false;      
      if ( currentArtistElement != null ) 
      {  
         currentArtistElement.style.background = oldbackground;
         currentArtistElement = null;
      }
  }


  function setArtistElement (id)
  {
      if(did('insertArtistLink')) did('insertArtistLink').className='ratingbuttonhc';  
      if ( !inShortcut ) 
      {
         currentArtistElement = did(id); 

         currentArtistText = did(id + '_label'); 

         return;
      }
      if ( currentArtistElement != null ) 
      {  
         currentArtistElement.style.background = oldbackground;
      }
      oldbackground = did(id).style.background;
      currentArtistElement = did(id);  
      currentArtistText = did(id + '_label');
      currentArtistElement.style.background = '#fdc';

  }
  function cancelArtistElement()
  {
      if(did('insertArtistLink')) did('insertArtistLink').className='ratingbutton';  
  }
  function createShortcut(type, assoc_id)
  {
      insertAtCursor(currentElement,getShortcut(type, assoc_id));
      currentElement.focus();
      closeShortcut();
  }
  

// calling the function
//insertAtCursor(document.formName.fieldName, �this value�);


  function getShortcut(type, assoc_id)
  {
       if ( type == "w" )
       {
            return "[wi:" + assoc_id + "]";
       }
       if ( type == "a" )
       {
            return "[Artist" + assoc_id + "]";
       }
       if ( type == "l" )
       {
            return "[Album" + assoc_id + "]";
       }
       if ( type == "r" )
       {
            return "[Work" + assoc_id + "]";
       }       
       if ( type == "F" )
       {
            return "[Film" + assoc_id + "]";
       }
       if ( type == "yt" )
       {
            return "[YouTube " + assoc_id + "]";
       }
       if ( type == "b" )
       {
            return "[Label" + assoc_id + "]";
       }
      
  }