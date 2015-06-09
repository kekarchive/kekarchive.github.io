// comments.js

var RYMcomments = function (type, context, assoc_id) {

   this.type = type;
   this.context = context;
   this.assoc_id = assoc_id;

}

RYMcomments.prototype.onFocusTextarea = function(event) {

   var help = $('#comment_help_' + this.type + '_' + this.context + '_' + this.assoc_id);

   var el = $('#comments_textarea_'+ this.type + '_' + this.context + '_' + this.assoc_id);

   var pos = el.position();

   //alert('#comment_help_' + this.type + '_' + this.context + '_' + this.assoc_id + ' , ' + pos.top + ', ' + pos.left)
   //help.css('top', (pos.top) + 'px').css('left', (pos.left+40) + 'px').show();
   help.css('top', '0').css('left', (el.outerWidth() + 20) + 'px').show()
}

RYMcomments.prototype.onBlurTextarea = function(event) {
   $('#comment_help_' + this.type + '_' + this.context + '_' + this.assoc_id).hide();
}

RYMcomments.prototype.open = function() {
   $('#comments_' + this.type + '_' + this.context + '_' + this.assoc_id)[0].className = 'comments edit';
   $('#comments_textarea_' + this.type + '_' + this.context + '_' + this.assoc_id).focus();
}
RYMcomments.prototype.cancel = function() {
   $('#comments_' + this.type + '_' + this.context + '_' + this.assoc_id)[0].className = 'comments view';
}

RYMcomments.prototype._postCallback = function( newComment ) {

   $('#comments_post_loading_' + this.type + '_' + this.context + '_' + this.assoc_id).hide();
   var el = $('#comments_list_' + this.type + '_' + this.context + '_' + this.assoc_id).append(newComment)[0];
   $('#comments_' + this.type + '_' + this.context + '_' + this.assoc_id)[0].className = 'comments view';
   $('#comments_textarea_' + this.type + '_' + this.context + '_' + this.assoc_id).val('');
   el.scrollTop = el.scrollHeight;

}

RYMcomments.prototype.post = function() {
   $('#comments_post_loading_' + this.type + '_' + this.context + '_' + this.assoc_id).show();;
   var comment = $('#comments_textarea_' + this.type + '_' + this.context + '_' + this.assoc_id).val();
   rym.request.post('CommentsPost', {type:this.type, context:this.context, assoc_id:this.assoc_id, comment:comment})
}

RYMcomments.prototype._postFlagCallback = function( id ) {

   $('#comments_post_loading_' + this.type + '_' + this.context + '_' + this.assoc_id).hide();
   //var el = $('#comment_' + id).hide();

}
RYMcomments.prototype.flag = function(id) {
   if ( !confirm ('Are you sure you want to report this comment as abusive?') ) {
      return
   }
   $('#comments_post_loading_' + this.type + '_' + this.context + '_' + this.assoc_id).show();;
   var comment = $('#comments_textarea_' + this.type + '_' + this.context + '_' + this.assoc_id).val();
   rym.request.post('CommentsFlag', {type:this.type, context:this.context, assoc_id:this.assoc_id, id:id})
}

RYMcomments.prototype._postDeleteCallback = function( id ) {

   $('#comments_post_loading_' + this.type + '_' + this.context + '_' + this.assoc_id).hide();
   var el = $('#comment_' + id).hide();

}
RYMcomments.prototype.delete = function(id) {
   if ( !confirm ('Are you sure you want to delete this comment?') ) {
      return
   }   
   $('#comments_post_loading_' + this.type + '_' + this.context + '_' + this.assoc_id).show();;
   var comment = $('#comments_textarea_' + this.type + '_' + this.context + '_' + this.assoc_id).val();
   rym.request.post('CommentsDelete', {type:this.type, context:this.context, assoc_id:this.assoc_id, id:id})
}
