/*
 * jQuery scrollintoview() plugin and :scrollable selector filter
 *
 * Version 1.8 (14 Jul 2011)
 * Requires jQuery 1.4 or newer
 *
 * Copyright (c) 2011 Robert Koritnik
 * Licensed under the terms of the MIT license
 * http://www.opensource.org/licenses/mit-license.php
 */
(function(f){var c={vertical:{x:false,y:true},horizontal:{x:true,y:false},both:{x:true,y:true},x:{x:true,y:false},y:{x:false,y:true}};var b={duration:"fast",direction:"both"};var e=/^(?:html)$/i;var g=function(k,j){j=j||(document.defaultView&&document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(k,null):k.currentStyle);var i=document.defaultView&&document.defaultView.getComputedStyle?true:false;var h={top:(parseFloat(i?j.borderTopWidth:f.css(k,"borderTopWidth"))||0),left:(parseFloat(i?j.borderLeftWidth:f.css(k,"borderLeftWidth"))||0),bottom:(parseFloat(i?j.borderBottomWidth:f.css(k,"borderBottomWidth"))||0),right:(parseFloat(i?j.borderRightWidth:f.css(k,"borderRightWidth"))||0)};return{top:h.top,left:h.left,bottom:h.bottom,right:h.right,vertical:h.top+h.bottom,horizontal:h.left+h.right}};var d=function(h){var j=f(window);var i=e.test(h[0].nodeName);return{border:i?{top:0,left:0,bottom:0,right:0}:g(h[0]),scroll:{top:(i?j:h).scrollTop(),left:(i?j:h).scrollLeft()},scrollbar:{right:i?0:h.innerWidth()-h[0].clientWidth,bottom:i?0:h.innerHeight()-h[0].clientHeight},rect:(function(){var k=h[0].getBoundingClientRect();return{top:i?0:k.top,left:i?0:k.left,bottom:i?h[0].clientHeight:k.bottom,right:i?h[0].clientWidth:k.right}})()}};f.fn.extend({scrollintoview:function(j){j=f.extend({},b,j);j.direction=c[typeof(j.direction)==="string"&&j.direction.toLowerCase()]||c.both;var n="";if(j.direction.x===true){n="horizontal"}if(j.direction.y===true){n=n?"both":"vertical"}var l=this.eq(0);var i=l.closest(":scrollable("+n+")");if(i.length>0){i=i.eq(0);var m={e:d(l),s:d(i)};var h={top:m.e.rect.top-(m.s.rect.top+m.s.border.top),bottom:m.s.rect.bottom-m.s.border.bottom-m.s.scrollbar.bottom-m.e.rect.bottom,left:m.e.rect.left-(m.s.rect.left+m.s.border.left),right:m.s.rect.right-m.s.border.right-m.s.scrollbar.right-m.e.rect.right};var k={};if(j.direction.y===true){if(h.top<0){k.scrollTop=m.s.scroll.top+h.top}else{if(h.top>0&&h.bottom<0){k.scrollTop=m.s.scroll.top+Math.min(h.top,-h.bottom)}}}if(j.direction.x===true){if(h.left<0){k.scrollLeft=m.s.scroll.left+h.left}else{if(h.left>0&&h.right<0){k.scrollLeft=m.s.scroll.left+Math.min(h.left,-h.right)}}}if(!f.isEmptyObject(k)){if(e.test(i[0].nodeName)){i=f("html,body")}i.animate(k,j.duration).eq(0).queue(function(o){f.isFunction(j.complete)&&j.complete.call(i[0]);o()})}else{f.isFunction(j.complete)&&j.complete.call(i[0])}}return this}});var a={auto:true,scroll:true,visible:false,hidden:false};f.extend(f.expr[":"],{scrollable:function(k,i,n,h){var m=c[typeof(n[3])==="string"&&n[3].toLowerCase()]||c.both;var l=(document.defaultView&&document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(k,null):k.currentStyle);var o={x:a[l.overflowX.toLowerCase()]||false,y:a[l.overflowY.toLowerCase()]||false,isRoot:e.test(k.nodeName)};if(!o.x&&!o.y&&!o.isRoot){return false}var j={height:{scroll:k.scrollHeight,client:k.clientHeight},width:{scroll:k.scrollWidth,client:k.clientWidth},scrollableX:function(){return(o.x||o.isRoot)&&this.width.scroll>this.width.client},scrollableY:function(){return(o.y||o.isRoot)&&this.height.scroll>this.height.client}};return m.y&&j.scrollableY()||m.x&&j.scrollableX()}})})(jQuery);


var RYMrating = function(type, assoc_id, rating) {
   this.type = type;
   this.assoc_id = assoc_id;
   this.rating = rating;
   this.uiRating = rating;
   this.touchReferenceX = null;
   this.setStars(this.rating);
   this.loading = false;
   this.isTouch = false;

   var rating = this;
   $('#my_catalog_rating_' + type + '_' + assoc_id).on('keypress', function(event) {

      if ( event.keyCode >= 48 && event.keyCode <= 57 ) {
         if (event.keyCode == 48) {
            rating.setRating(10);
         } else {
            rating.setRating(event.keyCode-48);
         }
      } else if ( event.keyCode == 45 ) {
         rating.setRating(0);
      } else {
         //alert(event.keyCode)
      }
   });

}


RYMrating.prototype.ratingFromMousePos = function(x) {
   if ( x <= 12 ) {
      return 0
   } else if ( x > 94 ) {
      return 10
   } else {
      return Math.floor( 1.0+((x-12)/9.0) )
      return 3
   }
};
RYMrating.prototype._ratingCallback = function(rating, bumpable) {
   this.rating = rating;
   this.uiRating = rating;
   this.setStars(rating);
   this.loading = false;
   $('#my_catalog_rating_' + this.type + '_' + this.assoc_id)[0].className = 'my_catalog_rating';
   if ( bumpable ) {
      $('#bump_btn_' + this.type + '_' + this.assoc_id).addClass('bumpable').text('Bump').show();
   }
}
RYMrating.prototype.setRating = function(rating) {
   // loading animation
   if ( this.loading ) {
      return;
   }
   if ( this.rating == rating ) {
      return;
   }
   if ( this.type == 'l' || this.type == 'F' || this.type == 'V' || this.type == 'Z') {
      $('#my_catalog_rating_' + this.type + '_' + this.assoc_id)[0].className = 'my_catalog_rating loading';
      this.loading = true;
      rym.request.post ('CatalogSetRating', {type:this.type, assoc_id:this.assoc_id, rating:rating}, null, 'script');
   } else {
      this.rating = rating;
      this.onChange(this.assoc_id, rating);
      $('#my_catalog_rating_' + this.type + '_' + this.assoc_id)[0].className = 'my_catalog_rating';  
   }
/* */
};

RYMrating.prototype.setStars = function(rating) {

   this.uiRating = rating;

   if ( rating == 0 ) {
      $('#rating_num_' + this.type + '_' + this.assoc_id).text('---')
   } else {
      $('#rating_num_' + this.type + '_' + this.assoc_id).text((rating/2.0).toFixed(1))
   }
   document.getElementById('rating_stars_' + this.type + '_' + this.assoc_id).className = 'rating_stars star-' + rating + 'm';
}

RYMrating.prototype.onMouseMove = function(event, ui) {
   if ( this.loading ) {
      return;
   }
   if ( this.isTouch ) { 
      return
   }
   var pageX = event.pageX || (event.clientX + document.documentElement.scrollLeft);
   var x = pageX - $(ui).offset().left;
   var rating = this.ratingFromMousePos(x);
   this.setStars(rating);
};

RYMrating.prototype.onTouchStart = function(event, ui) {

   this.isTouch = true;

   if ( this.loading ) {
      return;
   }

   var targetEvent =  event.touches.item(0);
   this.touchReferenceX = targetEvent.clientX;
   this.touchReferenceRating = this.rating;
   event.preventDefault();
};
RYMrating.prototype.onTouchMove = function(event, ui) {
   if ( this.loading ) {
      return;
   }

   var targetEvent =  event.touches.item(0); 
   var differential = targetEvent.clientX - this.touchReferenceX;
   var stardiff = Math.floor( differential / 9 );
   var newRating = this.touchReferenceRating + stardiff;

   if ( newRating < 0 ) {
      newRating = 0;
   } else if ( newRating > 10 ) {
      newRating = 10;
   }

   this.setStars(newRating)

   event.preventDefault();

};
RYMrating.prototype.onTouchEnd = function(event, ui) {
   if ( this.loading ) {
      return;
   }
   this.setRating(this.uiRating);
};


RYMrating.prototype.onClick = function(event, ui) {

   if ( this.isTouch ) { 
      return
   }

   if ( this.loading ) {
      return;
   }
   var pageX = event.pageX || (event.clientX + document.documentElement.scrollLeft);
   var x = pageX - $(ui).offset().left;
   var rating = this.ratingFromMousePos(x);
   this.setRating(rating);
   this.rating = rating;
};

RYMrating.prototype.onMouseOver = function(event, ui) {
   if ( this.loading ) {
      return;
   }
   if ( this.isTouch ) { 
      return
   }
   // add class 'inrate'
   $('#my_catalog_rating_' + this.type + '_' + this.assoc_id).focus()[0].className = 'my_catalog_rating inrate';
};
RYMrating.prototype.onMouseOut = function(event, ui) {
   if ( this.loading ) {
      return;
   }
   if ( this.isTouch ) { 
      return
   }
   // restore old rating stars
   this.setStars(this.rating);
   $('#my_catalog_rating_' + this.type + '_' + this.assoc_id)[0].className = 'my_catalog_rating';
   // remove class inrate
};


var RYMtags = function(type, assoc_id, tags) {
   this.type = type;
   this.assoc_id = assoc_id;
   this.tags = tags;
}

RYMtags.prototype.updateBtn = function() {

}

RYMtags.prototype._callback = function ( tags, tagLabel ) {
   if ( tagLabel.length > 0 ) 
   {
      $('#tags_text_' + this.type + '_' + this.assoc_id).html(tagLabel);
      $('#tag_btn_' + this.type + '_' + this.assoc_id)[0].className = 'tag_btn has_tags';
   } else {
      $('#tags_text_' + this.type + '_' + this.assoc_id).html('Tags');
      $('#tag_btn_' + this.type + '_' + this.assoc_id)[0].className = 'tag_btn';      
   }
}

RYMtags.prototype.save = function() {
   var tags = $('#tags_' + this.type + '_' + this.assoc_id).val();
   $('#tags_text_' + this.type + '_' + this.assoc_id).text('Saving...');
   $('#tag_dlg_' + this.type + '_' + this.assoc_id).hide();
   rym.request.post('CatalogSetTags', {type:this.type, assoc_id:this.assoc_id, tags:tags});
}

var RYMcatalog = function(type, assoc_id, ownership, format) {
   this.type = type;
   this.assoc_id = assoc_id;
   this.ownership = ownership;
   this.format = format;
}

RYMcatalog.prototype.setOwnership = function(ownership) {
//   this.ownership = ownership;
   if ( this.ownership != ownership ) {
      rym.request.post('CatalogSetOwnership', {type:this.type, assoc_id:this.assoc_id, ownership:ownership} );
      $('#catalog_text_' + this.type + '_' + this.assoc_id).text('Saving...')
   }
//   $('#catalog_text_' + this.type + '_' + this.assoc_id).text($('#catalog_btn_' + ownership).text())
   $('.catalog_btn_options_' + this.type + '_' + this.assoc_id).hide();
}

RYMcatalog.prototype._ownershipCallback = function ( ownership, format, ownershipLabel, formatLabel, bumpable ) {

   $('#catalog_text_' + this.type + '_' + this.assoc_id).text(ownershipLabel)
   this.ownership = ownership;   
   this.format = format;
   
   document.getElementById('catalog_' + this.type + '_' + this.assoc_id).className = 'catalog_btn catalog_' + ownership;

   if ( ownership == 'n' ) {
      $('#my_catalog_format_' + this.type + '_' + this.assoc_id).hide();
   } else {
      $('#format_text_' + this.type + '_' + this.assoc_id).text(formatLabel);
      $('#my_catalog_format_' + this.type + '_' + this.assoc_id).show();      
   }

   if ( bumpable ) {
      $('#bump_btn_' + this.type + '_' + this.assoc_id).addClass('bumpable').text('Bump').show();
   }   
}

RYMcatalog.prototype._formatCallback = function(format, formatLabel) {
   this.format = format;
   $('#format_text_' + this.type + '_' + this.assoc_id).text(formatLabel);
}
RYMcatalog.prototype.setFormat = function(format) {
   if ( this.format != format ) {
      rym.request.post('CatalogSetFormat', {type:this.type, assoc_id:this.assoc_id, format:format} );
      $('#format_text_' + this.type + '_' + this.assoc_id).text('Saving...')
      $('.format_btn_options').hide();
   }
}

RYMcatalog.prototype._bumpCallback = function(formatted_date) {
   $('#catalog_date_inner_' + this.type + '_' + this.assoc_id).text(formatted_date);
   $('#bump_btn_' + this.type + '_' + this.assoc_id).removeClass('bumpable').text('bumped');
}

RYMcatalog.prototype.bump = function() {
   if(confirm('This will bump your rating, catalog, and review to today\'s date.  Are you sure?') ) {
      rym.request.post('CatalogBump', {type:this.type, assoc_id:this.assoc_id} );
   }
}

var RYMreview = function(type, assoc_id, title, body, attribution, pub_visible, supplement) {
   this.type = type;
   this.assoc_id = assoc_id;
   this.title = title;
   this.body = body;
   this.attribution = attribution;
   this.pub_visible = pub_visible;
   this.supplement = supplement;
   this.modified = false;
   this.empty = (title.length == 0 && body.length == 0 && attribution.length == 0 && supplement.length == 0);
   if ( this.empty ) {
      $('#review_btn')[0].className = 'review_btn';
   } else {
      $('#review_btn')[0].className = 'review_btn has_review';      
   }
}

RYMreview.prototype.onClickPublish = function(event, ui) {
   var published = $('#review_publish').is(':checked');

   if ( published) {
      $('#published_rules').fadeIn(100);
   } else {
      $('#published_rules').fadeOut(100);      
   }
   this.onChangeReviewField(event, ui);
}

RYMreview.prototype.onChangeReviewField = function(event, ui) {
   $('#review_save_btn').attr('disabled', false);
   this.modified = true;
}

RYMreview.prototype.edit = function(event, ui) {
//   alert(ui.id);
   $('#my_review').removeClass('view_mode').addClass('edit_mode')
}

RYMreview.prototype.remove = function(event, ui) {
   if(confirm('Are you sure you want to delete your review?  This cannot be undone.') ) {
      rym.request.post('CatalogSetReview', {type:this.type, assoc_id:this.assoc_id, title:'', pub_visible:false, body:'', supplement:'', attribution:'' });
   }
}

RYMreview.prototype.toggleSection = function(event, ui) {
   if ( $('#my_track_ratings').is(':visible') ) {
      if ( track_ratings.cancel() ) {
        $('#my_review').slideToggle(100);
      }
      return
   }
   if ( $('#my_more_info').is(':visible') ) {
      if ( more_info.cancel() ) {
        $('#my_review').slideToggle(100);
      }
      return
   }
   $('#my_review').slideToggle(100);
}

RYMreview.prototype._callback = function(review_id, title, body, supplement, attribution, pub_visible, formatted_review, formatted_std_review, bumpable) {

   this.modified = false;

   this.title = title;
   this.body = body;
   this.supplement = supplement;
   this.attribution = attribution;
   this.pub_visible = pub_visible;

   this.empty = (title.length == 0 && body.length == 0 && attribution.length == 0 && supplement.length == 0);

   if ( !this.empty ) {
      $('#my_review').removeClass('edit_mode').addClass('view_mode');
      if ( pub_visible == 't' ) {
          $('#review_shell_std_' + review_id).html(formatted_std_review).show();
      } else {
          $('#review_shell_std_' + review_id).html(formatted_std_review).hide();         
      }
      $('#saved_review_inner').html(formatted_review);
      $('#my_catalog').scrollintoview(100);
      $('#review_btn')[0].className = 'review_btn has_review';
   } else {
      $('#saved_review_inner').html('');
      $('#review_shell_std_' + review_id).hide();
      $('#my_review').removeClass('view_mode').addClass('edit_mode').slideToggle(100);
      $('#my_catalog').scrollintoview(100);
      $('#review_btn')[0].className = 'review_btn';
   }

   if ( bumpable ) {
      $('#bump_btn_' + this.type + '_' + this.assoc_id).addClass('bumpable').text('Bump').show();
   }


}

RYMreview.prototype.save = function() {
   var title = $('#review_title').val();
   var pub_visible = $('#review_publish').is(':checked');
   var body = $('#review_body').val();
   var supplement = $('#review_supplement').val();
   var attribution = $('#review_attribution').val();

   rym.request.post('CatalogSetReview', {type:this.type, assoc_id:this.assoc_id, title:title, pub_visible:pub_visible, body:body, supplement:supplement, attribution:attribution });
}


RYMreview.prototype.preview = function() {
   var title = $('#review_title').val();
   var pub_visible = $('#review_publish').is(':checked');
   var body = $('#review_body').val();
   var supplement = $('#review_supplement').val();
   var attribution = $('#review_attribution').val();

   rym.request.post('CatalogPreviewReview', {type:this.type, assoc_id:this.assoc_id, title:title, pub_visible:pub_visible, body:body, supplement:supplement, attribution:attribution });
}

RYMreview.prototype.cancelEdit = function(event, ui) {

   if ( !this.modified ) {
      if ( !this.empty ) {
         $('#my_review').removeClass('edit_mode').addClass('view_mode');
      } else {
         $('#my_review').slideToggle(100);         
      }
      //      $('#my_review').removeClass('edit_mode').addClass('view_mode');
      $('#my_catalog').scrollintoview(100);
      return true;
   }

   if(confirm('Are you sure you want to cancel your review edit?  Any changes you made to your review will be lost.') ) {

      $('#review_title').val(this.title);
      $('#review_body').val(this.body);
      $('#review_supplement').val(this.supplement);
      $('#review_attribution').val(this.attribution);
      $('#review_publish').attr('checked', (this.pub_visible == 't'));
      this.modified = false;
      if ( !this.empty ) {
         $('#my_review').removeClass('edit_mode').addClass('view_mode');
         $('#my_catalog').scrollintoview(100);
      } else {
         $('#my_review').hide();         
         $('#my_catalog').scrollintoview(100);
      }
      //document.getElementById('my_catalog').scrollIntoView();
      return true;
   } else {
      return false;
   }

   return true;
}

var RYMtrackRatings = function(type, assoc_id, ratings) {
   this.type = type;
   this.assoc_id = assoc_id;
   this.ratings = ratings;
   this.newRatings = JSON.parse(JSON.stringify(ratings));
   this.modified = false;
}

RYMtrackRatings.prototype.updateButton = function ( ) {

   var empty = true;
   var ratings = this.ratings;

   for ( var i in ratings ) {
      if ( ratings[i].rating && ratings[i].rating > 0 ) {
         empty = false;
         break;
      }
   }
   if ( empty ) {
      $('#track_rating_btn')[0].className = 'track_rating_btn';
   } else {
      $('#track_rating_btn')[0].className = 'track_rating_btn has_ratings';      
   }
}

RYMtrackRatings.prototype.onChange = function(index, rating) {
   // for ( i in this.newRatings ) {
   //    if ( this.newRatings[i].index = index ) {
   //       this.newRatings[i].rating = rating;
   //       break;
   //    }
   // }
   this.newRatings[index].rating = rating;
   $('#track_ratings_save_btn').attr('disabled', false);
   $('#track_ratings_cancel_btn').attr('disabled', false);
   $('#track_rating_success').hide();

   this.modified = true;
}

RYMtrackRatings.prototype.toggleSection = function(event, ui) {
   if ( $('#my_review').is(':visible') ) {
      if ( review.cancelEdit() ) {
        $('#my_track_ratings').show();
        $('#my_review').hide();
      }
      return
   }
   if ( $('#my_more_info').is(':visible') ) {
      if ( more_info.cancel() ) {
        $('#my_track_ratings').slideToggle(100);
      }
      return
   }
   $('#my_track_ratings').toggle();
}

RYMtrackRatings.prototype.cancel = function(event, ui) {

   if ( this.modified ) {
      if(confirm('You have not saved your track ratings.  Are you sure you want to leave this section?') ) {
        // rym.request.post('')
        var ratings = this.ratings;
        for ( i in ratings ) {
            window['rating_z_' + i].setRating(ratings[i].rating)
            window['rating_z_' + i].setStars(ratings[i].rating)
        }
        $('#my_track_ratings').slideToggle(100);
        return true;
      }
   } else {
        $('#my_track_ratings').slideToggle(100);
        return true;
   }

   return false;
}

RYMtrackRatings.prototype.deleteAll = function(event, ui) {
   if(confirm('Are you sure you want to delete your track ratings?  This cannot be undone.') ) {
     // rym.request.post('')
   }
}

RYMtrackRatings.prototype._callback = function() {
   $('#track_ratings_save_btn').attr('disabled', true);
   $('#track_rating_success').show();
   $('#track_ratings_cancel_btn').attr('disabled', true);
   this.ratings = JSON.parse(JSON.stringify(this.newRatings));
   this.modified = false;
   this.updateButton();
}

RYMtrackRatings.prototype.save = function(event, ui) {
     var track_rating_json = JSON.stringify(this.newRatings);
     rym.request.post ('CatalogSetTrackRatings', {type:this.type, assoc_id:this.assoc_id, track_ratings:track_rating_json}, null, 'script');
//   alert(ui.id);
//   $('#my_review').removeClass('view_mode').addClass('edit_mode')
};


var RYMmoreInfo = function(type, assoc_id, acq_date, notes ) {
   this.type = type;
   this.assoc_id = assoc_id;
   this.acq_date = acq_date;
   this.notes = notes;

   var empty = (acq_date.length == 0 && notes.length == 0 );
   if ( !empty ) {
      $('#more_btn')[0].className = 'more_btn has_more';
   }
}

RYMmoreInfo.prototype.toggleSection = function ( ) {
   if ( $('#my_track_ratings').is(':visible') ) {
      if ( track_ratings.cancel() ) {
        $('#my_more_info').slideToggle(100);
      }
      return
   }
   if ( $('#my_review').is(':visible') ) {
      if ( review.cancelEdit() ) {
        $('#my_more_info').slideToggle(100);
      }
      return
   }
   $('#my_more_info').slideToggle(100);

}
RYMmoreInfo.prototype.cancel = function ( ) {
   $('#my_more_info').hide();  
   return true 
}
RYMmoreInfo.prototype.onChangeAcqDate = function ( acq_date ) {
   $('#acq_date_save_btn').attr('disabled', false);
   $('#acq_date_success').hide();
}

RYMmoreInfo.prototype.onChangeNotes = function ( notes ) {
   $('#notes_save_btn').attr('disabled', false);
   $('#notes_success').hide();
}

RYMmoreInfo.prototype.saveNotes = function ( ) {
   var notes = $('#notes').val()
   rym.request.post ('CatalogSetNotes', {type:this.type, assoc_id:this.assoc_id, notes:notes}, null, 'script');
}
RYMmoreInfo.prototype._notesCallback = function ( notes ) {
   this.notes = notes;

   $('#notes_save_btn').attr('disabled', true);
   $('#notes_success').fadeIn(100);

   var empty = (this.acq_date.length == 0 && this.notes.length == 0 );
   if ( !empty ) {
      $('#more_btn')[0].className = 'more_btn has_more';
   } else {      
      $('#more_btn')[0].className = 'more_btn';
   }
}
RYMmoreInfo.prototype.saveAcqDate = function ( ) {
   var acq_date = $('#acq_date').val()   
   rym.request.post ('CatalogSetAcquisitionDate', {type:this.type, assoc_id:this.assoc_id, acq_date:acq_date}, null, 'script');   
}
RYMmoreInfo.prototype._acqDateCallback = function ( acq_date ) {
   this.acq_date = acq_date;

   $('#acq_date_save_btn').attr('disabled', true);
   $('#acq_date_success').fadeIn(100);   

   var empty = (this.acq_date.length == 0 && this.notes.length == 0 );
   if ( !empty ) {
      $('#more_btn')[0].className = 'more_btn has_more';
   } else {      
      $('#more_btn')[0].className = 'more_btn';
   }

}


var RYMmediaPage = {
   trackCreditsShown:false,
   vol:1,
   toggleTrackCredits:function ( id ) {

      if ( !RYMmediaPage.trackCreditsShown ) {
        document.getElementById(id).className='tracklisting tracks allcredits';
        $('#track_credit_show_link_' + id).text($('#track_credit_hide_msg_' + id).text());
      } else {
        document.getElementById(id).className='tracklisting tracks';
        $('#track_credit_show_link_' + id).text($('#track_credit_show_msg_' + id).text());
      }
      RYMmediaPage.trackCreditsShown = !RYMmediaPage.trackCreditsShown;

   },
   playPreview: function( url, id ) {
      var html = '<audio id=\"playerel\" onvolumechange=\"RYMmediaPage.vol = volume\" controls autoplay src=\"' + url + '\" type=\"audio/mp4\"></audio>'

      var flashHtml = '<object width=\"320\" height=\"32\" type=\"application/x-shockwave-flash\" data=\"http://75a0d5d34b40760eb8e8-3b38f1c3334d8ecc77d364d763c0b5e6.r42.cf1.rackcdn.com/flashmediaelement.swf\">'
      flashHtml += '<param name=\"movie\" value=\"http://75a0d5d34b40760eb8e8-3b38f1c3334d8ecc77d364d763c0b5e6.r42.cf1.rackcdn.com/flashmediaelement.swf\" /> '
      flashHtml += '<param name=\"flashvars\" value=\"autoplay=true&controls=true&amp;file=' + url + '\" /></object>';

      var a =  document.createElement('audio');
      if ( typeof(a) != 'undefined' && a.canPlayType && a.canPlayType('audio/mp4').replace(/no/, '') ) {
          $('#track_preview_' + id).html(html);
      } else {
          $('#track_preview_' + id).html(flashHtml);
      }
      if (document.getElementById('playerel')) {
         document.getElementById('playerel').volume = RYMmediaPage.vol;
      }
      a = null;
      return;
   }, 
   toggleIssues: function ( num_issues ) {
 
      var state = $('#issue_expand_btn').data('state');

      if ( state == 'compact') {
         $('#issue_expand_btn').data('state', 'expanded');
         var pixels = ((num_issues*33)+100) + 'px';
         $('#issue_expand_btn').text( $('#issue_expand_text_compact').text() );
         $('.issues').animate({'max-height':pixels}, 100);
      } else {
         $('#issue_expand_btn').data('state', 'compact');
         $('#issue_expand_btn').text( $('#issue_expand_text_expand').text() );;
         $('.issues').animate({'max-height':'209px'}, 100);
      }
   }, 
   navCatalog: function ( type, assoc_id, showAll, pane, pageStr) {
      rym.request.post('LoadCatalogPage', {type:type, assoc_id:assoc_id, show_all:showAll, pane:pane, page_str:pageStr }, null, 'script');
   }, 
   onClickReviewPublish: function (event, ui ){
      if ( $('#review_publish').is(':checked') ) {
         $('#published_rules').fadeIn(200);
      } else {
         $('#published_rules').hide(100);
      }
   },
   selectCatalogPane: function ( type, assoc_id, show_all_issues, pane ) {
      $('.rating_info_tab').removeClass('active');
      $('#rating_info_' + pane).addClass('active');
      RYMmediaPage.navCatalog(type, assoc_id, show_all_issues, pane, 1 )
   },
   deleteCatalog: function ( catalogId )  {
      if(confirm('Are you sure you want to delete this catalog entry?  This cannot be undone.') ) {
        // rym.request.post('')
      }
   },
   toggleReviewHelp: function ( el, type, show ) {
      var help = $('#review_help_' + type);

      var pos = $(el).position();
      if ( show ) {
         help.css('top', (pos.top + 30) + 'px').css('left', (pos.left-150) + 'px').show();
      } else {
         help.hide();
      }
   },
    _voteCallback: function (id, content) {
      $('#review_voting_' + id).html(content);
   },
   reviewVoteRemove: function ( type, id ) {
      rym.request.post('ReviewVoteRemove', {type:type, review_id:id }, null, 'script');
   },
   reviewVote: function ( type, id, vote ) {
      rym.request.post('ReviewVote', {type:type, review_id:id, vote:vote}, null, 'script');
   },
   reviewBookmark: function ( type, id ) {
      rym.request.post('ReviewBookmark', {type:type, review_id:id }, null, 'script');
   },
   setSortOrder: function ( sortOrder ) {
      rym.request.post('SetReviewSortOrder', {sort_order:sortOrder}, null, 'script');
   }

}
