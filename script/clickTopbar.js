clickTopbar();

function clickTopbar(){
	var doc=document;
	var win=doc.defaultView||doc.parentWindow;
	var utils={
		isMob:(function(){
			var ua=navigator.userAgent.toLowerCase();
			var agents=["Android","iPhone","SymbianOS","Window Phone","iPad","iPod"];
			var result=false;
			for(var i=0; i<agents.length; i++){
				if(ua.indexOf(agents[i].toLowerCase())>-1){
					result=true;
				}
			}
			return result;
		})()
	}

	if (utils.isMob) {
		doc.documentElement.className+=" mob";
	}else{
		doc.documentElement.className+=" pc";
	}

	var Dom={
		$sidebar : doc.querySelector("#sidebar"),
		$main : doc.querySelector("#main"),
		$sidebar_mark :doc.querySelector("#sidebar-mark"),
		$body : doc.body,
		$btn_side : doc.querySelector("#topbar .btn-bar"),
		$article : doc.querySelectorAll(".mob #page-index article")
	};

	Dom.bindEvent=function(){
		var _this=this,
			body_class_name="side",
			eventFirst="click",
			eventSecond="click";
		if(utils.isMob){
			eventFirst="touchstart";
			eventSecond="touchend"
		}

		this.$btn_side.addEventListener(eventSecond,function(){
			if (_this.$body.className.indexOf(body_class_name)>-1) {
				_this.$body.className=_this.$body.className.replace(body_class_name,"");
				_this.$sidebar_mark.style.display="none";
			}else{
				_this.$body.className+=(" "+body_class_name);
				_this.$sidebar_mark.style.display="block";
			}
		},false);

		this.$sidebar_mark.addEventListener(eventFirst,function(e){
			_this.$body.className=_this.$body.className.replace(body_class_name,"");
			_this.$sidebar_mark.style.display="none";
			e.preventDefault();
		},false);

		win.addEventListener("resize",function(){
			_this.$body.className=_this.$body.className.replace(body_class_name,"");
			_this.$sidebar_mark.style.display="none";
		},false);
	}

	Dom.bindEvent();
}