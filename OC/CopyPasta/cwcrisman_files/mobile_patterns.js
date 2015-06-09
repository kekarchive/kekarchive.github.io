// mobile_patterns.js

var RYMmobile = {


   mobileMenu:{

      enterSelectionMode:function() {
         $(".mobile_menu")[0].className = 'mobile_menu selection_mode';
      },

      exitSelectionMode:function() {
         $(".mobile_menu")[0].className = 'mobile_menu';
      }

   },

   mobileExpand:{
      toggleFull:function(id) {
         $('#expand_full_' + id).toggleClass('expanded');
      },
      toggleSection:function(id) {
         $('#expand_section_' + id).toggleClass('expanded');
      },
      toggleFade:function(id) {
         $('#expand_fade_' + id).toggleClass('expanded');
      }

   }


}