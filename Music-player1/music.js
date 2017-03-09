	    var audio = new Audio(),        //创建一个audio对象
	        musicList = [],             //这个数组用于保存听过的音乐
	        num = 0,                    //这个变量用于记录听过音乐的数量
	        songName  = $('.song-information h4'),     //音乐名
	        songer    = $('.song-information p'),      //歌手
	        playIcon  = $('.play-icon'),               //播放图标
	        pauseIcon = $('.pause-icon'),              //暂停图标
	        rightIcon = $('.right-icon'),              //下一曲
	        leftIcon  = $('.left-icon'),               //上一曲
	        volumeIconMax = $('.volume-icon-max'),     //最大音量
	        volumeIconMin = $('.volume-icon-min'),     //最小音量
	        volumeIconNone = $('.volume-icon-none'),   //静音
	        songTime = $('.song-time'),                //音乐时间
	        timeLine = $('.time-line'),                //固定进度条
	        realTimeLine = $('.real-time-line'),       //实际的进度条
	        volumeLine = $('.volume-line'),            //固定的音量条
	        realVolumeLine = $('.real-volume-line');   //实际的音量条
	        audio.autoplay = true;                     //设置该属性让audio对象的src属性变化后自动播放
		//--------------封装请求音乐资源的函数--------------------------
        var getMusic = function(){
        	  $.get('http://api.jirengu.com/fm/getSong.php',{channel:'public_tuijian_chengmingqu'})
					.done(function(data){
						var message = JSON.parse(data);
					    audio.src = message.song[0].url;
					    var title = message.song[0].title.split('-')[0];
					    songName.text(title);
					    songer.text(message.song[0].artist);
					    var musicMessage = {};
                        musicMessage.songName = title;
                        musicMessage.songer = message.song[0].artist;
                        musicMessage.url = audio.src;
					    musicList.push(musicMessage);
				});
        }
        //--------------给播放图标和暂停图标绑定事件-----------------------
        playIcon.on('click',function(){
        	if(audio.src){
        		audio.play();
        		$(this).addClass('hide');
        		pauseIcon.removeClass('hide');
        	}else{
        		getMusic();
        		num++
        		$(this).addClass('hide');
        		pauseIcon.removeClass('hide');
        	}
        })
        pauseIcon.on('click',function(){
        	audio.pause();
        	$(this).addClass('hide');
        	playIcon.removeClass('hide');
        })
        //---------------当音乐结束时自动获取音乐--------------------------
        audio.addEventListener('ended',function(){
        	getMusic();
        	num++;
        },false)
        //---------------给下一首图标和上一首图标绑定事件--------------------
        rightIcon.on('click',function(){
        	if(musicList[num]){
        		songName.text(musicList[num].songName);
				songer.text(musicList[num].songer);
        		audio.src = musicList[num].url;
        		pauseIcon.removeClass('hide');
        		playIcon.addClass('hide');
        		num++;
        	}else{
        		getMusic();
        		num++;
        		pauseIcon.removeClass('hide');
        		playIcon.addClass('hide');
        	}
        })
        leftIcon.on('click',function(){
        	if((num - 2) < 0){
                alert('这已经是你听过的第一首歌了！')
        	}else{
        		songName.text(musicList[num-2].songName);
				songer.text(musicList[num-2].songer);
        		audio.src = musicList[num-2].url;
        		num--;
        	}
        })
        //---------------给音量图标绑定事件------------------------------------
        volumeIconMax.on('click',function(){
            realVolumeLine.css('width','150px');
            audio.volume = 1;
            volumeIconMin.removeClass('hide');
            volumeIconNone.addClass('hide');
        })
        volumeIconMin.on('click',function(){
            realVolumeLine.css('width','0');
            audio.volume = 0;
            $(this).addClass('hide');
            volumeIconNone.removeClass('hide');
        })
        //---------------音乐时间和进度条-----------------------------------------------
        function getTime(){
            setInterval(function(){       		
			    var time = audio.currentTime;
	        	var minute = parseInt(time/60);
	        	var second = parseInt(time%60);
	    	    if(second >= 10){
	    	    	second = second;
	    	    }else{
	    	    	second = '0'+second;
	    	    }
	            if(minute >= 10){
	    	    	minute = minute;
	    	    }else{
	    	    	minute = '0'+minute;
	    	    }
	    	    songTime.text(minute+':'+second);
	    	    var offset = time/audio.duration*350;
	    	    realTimeLine.width(offset);
        	},1000);				   
        }
        audio.addEventListener('play',function(){
        	getTime()
        },false);
        //------------------进度条拖动-------------------------------------------------
        timeLine.on('click',function(e){
        	if(audio.src){
        		var start = timeLine.offset().left;
	        	var drag = e.clientX-start;
	            realTimeLine.css('width',drag);
	            audio.currentTime = (drag/timeLine.width())*audio.duration;
        	}
        })
        realTimeLine.on('click',function(e){
        	if(audio.src){
        		var start = timeLine.offset().left;
	        	var drag = e.clientX-start;
	            realTimeLine.css('width',drag);
	            audio.currentTime = (drag/timeLine.width())*audio.duration;
        	}
        })
        //------------------音量调节----------------------------------------------------
        volumeLine.on('click',function(e){
        	var start = volumeLine.offset().left;
        	var drag = e.clientX-start;
            realVolumeLine.css('width',drag);
            audio.volume = parseFloat(drag/volumeLine.width());
        })
        realVolumeLine.on('click',function(e){
        	var start = volumeLine.offset().left;
        	var drag = e.clientX-start;
            realVolumeLine.css('width',drag);
            audio.volume = parseFloat(drag/volumeLine.width());
        })