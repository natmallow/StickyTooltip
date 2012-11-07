/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

(function($){
         
    //creat class in Jquery
    $.stickyToolTip = function(element, params){

        var $this = this;
           
        //jquery and dom versions of object
        $this.$el = $(element);
        $this.el = element;
        
        
        // reverse reference to the DOM object
        $this.$el.data('stickyToolTip', $this);
        
        //initial default params loaded
        $this.init = function(){
            $this.params = $.extend({},$.stickyToolTip.defaultParams,params);
               
               
            //more stuff to init if needed
            $this.run();
        }
        
        $this.run = function(){
            $this.$el.each(function(){
                var set = $(document).scrollTop();
                var parentLoc = $this.$el.parent().position();
                var absTop = parentLoc.top + $this.params.offsetTop;
                var absLeft = parentLoc.left;
                var parentHeight = Math.floor($this.$el.parent().height());
                var maxRange = Math.floor(parentLoc.top + parentHeight + $this.params.offsetBottom);              
                if(absTop<set && set<maxRange){
                    $this.$el.show();
                    /**/
                    switch($this.params.transitionType){
                        case 'elastic':
                            var moveto = set+'px';
                            console.log(set);
                            $this.$el.animate({
                                top:moveto
                            },{
                                duration:500,
                                queue:false
                            });  
                            break;
                        default:
                            $this.$el.css({
                                'position':'fixed',
                                'top':'1',
                                'left':absLeft+'px'
                            }); // for fixed
                            break;
                    }
                
                /**/
                // 
                }else{
                    $this.$el.hide();
                    return;
                }   
            });          
        }
        
        //run init
        $this.init();
    };


    $.stickyToolTip.defaultParams = {
        offsetTop: 0,
        offsetBottom: 0,
        transitionType: "default"
    };


    $.fn.stickyToolTip = function(params){
        return this.each(function(){
            (new $.stickyToolTip(this, params));
        });
    };


})(jQuery);