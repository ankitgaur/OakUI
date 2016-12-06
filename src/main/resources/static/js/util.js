var util = {
		
		setCookie : function(cname, cvalue, exdays) {
		    var d = new Date();
		    d.setTime(d.getTime() + (exdays*24*60*60*1000));
		    var expires = "expires="+ d.toUTCString();
		    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
		},

		getCookie : function(cname) {
		    var name = cname + "=";
		    var ca = document.cookie.split(';');
		    for(var i = 0; i <ca.length; i++) {
		        var c = ca[i];
		        while (c.charAt(0)==' ') {
		            c = c.substring(1);
		        }
		        if (c.indexOf(name) == 0) {
		            return c.substring(name.length,c.length);
		        }
		    }
		    return "";
		},
		
		renderLastRumor : function(){
			
			$('.tt-el-ticker').each(function(){
				var _ticker = $(this);
				var _strings = [];
				_ticker.find('.entry-ticker').find('span').each(function(){
					_strings.push($(this).html());
				});
				_ticker.find('.entry-ticker').html('');

				var option_tick = {
					strings: _strings,
					startDelay: 0,
					typeSpeed: -500,
					backSpeed: -800,
					backDelay: 5000,
					loop: true,
					onStringTyped: function(curStrPos){ },
					preStringTyped: function(curStrPos){
						_ticker.attr('data-current', curStrPos);
					}
				};

				_ticker.find('.entry-ticker').typed(option_tick);

				_ticker.find('.ticker-arrow-prev').on('click', function(){
					_ticker.attr('data-current', 0);

					var _cur = parseInt(_ticker.attr('data-current'), 10);
					var _cur_str = [];
					_cur = (_cur==0) ? (_strings.length-1) : _cur-1;

					for(var i=_cur; i<_strings.length; i++){
						_cur_str.push(_strings[i]);
					}

					for(var i=0; i<_cur; i++){
						_cur_str.push(_strings[i]);
					}

					option_tick = $.extend(option_tick, {strings: _cur_str});
					_ticker.find('.entry-ticker').text(_cur_str[0]);
					_ticker.find('.entry-ticker').typed(option_tick);
				});

				_ticker.find('.ticker-arrow-next').on('click', function(){
					_ticker.attr('data-current', 0);

					var _cur = parseInt(_ticker.attr('data-current'), 10);
					var _cur_str = [];
					_cur = (_cur==_strings.length-1) ? 0 : _cur+1;

					for(var i=_cur; i<_strings.length; i++){
						_cur_str.push(_strings[i]);
					}

					for(var i=0; i<_cur; i++){
						_cur_str.push(_strings[i]);
					}

					option_tick = $.extend(option_tick, {strings: _cur_str});
					_ticker.find('.entry-ticker').text(_cur_str[0]);
					_ticker.find('.entry-ticker').typed(option_tick);
				});
				

			});
			
		},
		
		renderNewsSlider : function(){
			$('.news-slider').each(function(){
				var _news_slider = $(this);
				var _id = _news_slider.find('.master-slider').attr('id');
				var slider = new MasterSlider();
				var sliderHeight = 640;

				slider.control('circletimer' , {color:"#FFFFFF" , stroke:9});

				if(_news_slider.hasClass('news-slider-hover')) {
				
					slider.control('thumblist' , { autohide:false ,dir:'v',type:'tabs', align:'right', margin:0, space:25, width:0, height:105, hideUnder:640 });
					slider.control('scrollbar' , '');
					sliderHeight = 600;
				
				} else {
					slider.control('arrows');
					slider.control('thumblist' , { autohide:false ,dir:'v',type:'tabs', align:'right', margin:10, space:25, width:280, height:175, hideUnder:640 });
					slider.control('scrollbar' , {dir:"v"});
				}

				slider.setup(_id , {
					width:1170,
					height:sliderHeight,
					space:0,
					speed: 100,
					view:'fade'
				});

				setTimeout(function(){
					slider.api.addEventListener(MSSliderEvent.CHANGE_END , function(){
				    	msLayerAnimater(_news_slider.find('.ms-slide.ms-sl-selected'));
					});
				}, 400);

			});
			
		},
		
		getDayOfTheWeek: function(wd) {

			day = "";

			switch (wd) {

			case 0:
				day = "SUNDAY";
				break;
			case 1:
				day = "MONDAY";
				break;
			case 2:
				day = "TUESDAY";
				break;
			case 3:
				day = "WEDNESDAY";
				break;
			case 4:
				day = "THURSDAY";
				break;
			case 5:
				day = "FRIDAY";
				break;
			case 6:
				day = "SATURDAY";
				break;

			}

			return day;

		},

		getMonth : function(mon) {

			month = "";

			switch (mon) {

			case 0:
				month = "JAN";
				break;
			case 1:
				month = "FEB";
				break;
			case 2:
				month = "MAR";
				break;
			case 3:
				month = "APR";
				break;
			case 4:
				month = "MAY";
				break;
			case 5:
				month = "JUN";
				break;
			case 6:
				month = "JUL";
				break;
			case 7:
				month = "AUG";
				break;
			case 8:
				month = "SEP";
				break;
			case 9:
				month = "OCT";
				break;
			case 10:
				month = "NOV";
				break;
			case 11:
				month = "DEC";
				break;

			}

			return month;

		}	
		
};