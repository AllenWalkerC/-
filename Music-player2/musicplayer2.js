function MusicPlayer(){
			this.init = function(){
				this.audio = new Audio();
				this.musicArr = [];
				this.num = 0;
				this.lyricNum = 0;
				this.songName = $('.song-name');
                this.singer = $('.singer');
                this.musicBg = $('.music-bg');
				this.audio.autoplay = true;
				this.lockTime;
				this.lyricArr = [];
				this.lockLyric;
				this.bind()
			}
			this.init()
		}
		MusicPlayer.prototype = {
			constructor: MusicPlayer,
			getMusic: function(channel){
				var _this = this;
					$.ajax({
					url: 'http://api.jirengu.com/fm/getSong.php',
					method: 'get',
					data: {
						channel: channel
					}
				}).done(function(result){
                    _this.play(result);
                    _this.num++;
                    _this.addMusic(result);
                    _this.getLyric(result)
				})
			},
			play: function(result){
                var data = JSON.parse(result).song[0];
                this.addMusicInfo(data);
			},
			bind: function(){
				var _this = this;
				$('.btn-play').on('click',function(){
					if(_this.audio.src){
						_this.audio.play();
						$(this).addClass('hide');
						$('.btn-pause').removeClass('hide');
					}else{
                        _this.getChannel();
					}
				})
				$('.btn-pause').on('click',function(){
                        $(this).addClass('hide');
						$('.btn-play').removeClass('hide');
						_this.audio.pause();
				})
				_this.audio.addEventListener('playing',function(){
					    _this.lockTime = setInterval(function(){
					    	_this.progress();
					    	_this.time(_this.audio.currentTime,$('.real-music-time'))
					    },1000)
					    $('.btn-play').addClass('hide');
						$('.btn-pause').removeClass('hide');
						_this.time(_this.audio.duration,$('.music-time'))
						_this.lockLyric = setInterval(function(){
							_this.showLyric(_this.synchronous)
						},500)
				})
				_this.audio.addEventListener('pause',function(){
                        if(_this.lockTime){
                        	clearInterval(_this.lockTime);
                        }
                        if(_this.lockLyric){
                        	clearInterval(_this.lockLyric);
                        }
				})
				_this.audio.addEventListener('ended',function(){
					    $('.lyric ul').empty();
					    _this.lyricArr = [];
					    _this.getChannel();
				})
				$('.btn-left').on('click',function(){
					if((_this.num-2)>=0){
						$('.lyric ul').empty();
					    _this.lyricArr = [];
					}
					_this.last(_this.musicArr);
				})
				$('.btn-right').on('click',function(){
					$('.lyric ul').empty();
					_this.lyricArr = [];
					_this.next(_this.musicArr);
				})
				$('.max-volume').on('click',function(){
					$('.real-volume-line').css({
						'height': '110'
					})
					$('.none-volume').addClass('hide');
					$('.min-volume').removeClass('hide');
					_this.audio.volume = 1;
				})
				$('.min-volume').on('click',function(){
					$('.real-volume-line').css({
						'height': '0'
					})
					$(this).addClass('hide')
					$('.none-volume').removeClass('hide');
					_this.audio.volume = 0;
				})
				$('.none-volume').on('click',function(){
					$(this).addClass('hide');
					$('.min-volume').removeClass('hide');
					_this.audio.volume = 0.5;
					$('.real-volume-line').css({
						'height': '55'
					})
				})
				$('.song-time-line').on('click',function(e){
					if(_this.audio.src){
						var offset = e.clientX - $(this).offset().left;
						$('real-song-time-time').css({
							'width': offset
						})
						_this.audio.currentTime = (offset*_this.audio.duration)/$(this).width();
					}
				})
				$('.real-song-time-line').on('click',function(e){
					if(_this.audio.src){
						var offset = e.clientX - $('.song-time-line').offset().left;
						$('real-song-time-time').css({
							'width': offset
						})
						_this.audio.currentTime = (offset*_this.audio.duration)/$('.song-time-line').width();
					}
				})
				$('.volume-line').on('click',function(e){
					var offset = $(this).height()-(e.clientY - $(this).offset().top);
					$('.real-volume-line').css({
						'height': offset
					})
					_this.audio.volume = parseFloat(offset/$(this).height());
					$('.none-volume').addClass('hide');
					$('.min-volume').removeClass('hide');
				})
				$('.real-volume-line').on('click',function(e){
					var offset = $('.volume-line').height()-(e.clientY - $('.volume-line').offset().top);
					$('.real-volume-line').css({
						'height': offset
					})
					_this.audio.volume = parseFloat(offset/$('.volume-line').height());
					$('.none-volume').addClass('hide');
					$('.min-volume').removeClass('hide');
				})
				$('.btn-lyric').on('click',function(){
					if(!$('.main').hasClass('active')){
                        $('.main').animate({
                        	left: 348
                        },1000,function(){
                        	$('.main').addClass('active');
                        })
					}else{
						$('.main').animate({
                        	left: 60
                        },1000,function(){
                        	$('.main').removeClass('active');
                        })
					}
				})
				$('.btn-pre').on('click',function(){
					if($('.show').prev('li').length === 0){
						$('.show').addClass('hide').removeClass('show');
						$('.channel li').last().removeClass('hide').addClass('show');
						$('.lyric ul').empty();
					    _this.lyricArr = [];
						_this.getChannel()
					}else{
						$('.show').removeClass('show').addClass('hide').prev('li').addClass('show').removeClass('hide');
						$('.lyric ul').empty();
					    _this.lyricArr = [];
						_this.getChannel()
					}
				})
				$('.btn-next').on('click',function(){
					if($('.show').next('li').length === 0){
						$('.show').addClass('hide').removeClass('show');
						$('.channel li').first().removeClass('hide').addClass('show');
						$('.lyric ul').empty();
					    _this.lyricArr = [];
						_this.getChannel()
					}else{
						$('.show').removeClass('show').addClass('hide').next('li').addClass('show').removeClass('hide');
						$('.lyric ul').empty();
					    _this.lyricArr = [];
						_this.getChannel()
					}
				})
			},
			addMusic: function(result){
				var data = JSON.parse(result),
				    musicInfo = {
				    	title: data.song[0].title,
				    	artist: data.song[0].artist,
				    	url: data.song[0].url,
				    	picture: data.song[0].picture,
				    	sid: data.song[0].sid
				    };
				this.musicArr.push(musicInfo);
			},
			last: function(arr){
				if((this.num-2)<0){
                  alert('这是你听过的第一首歌')
				}else{
					var data = arr[this.num-2];
					this.addMusicInfo(data);
					this.getLyric(this.musicArr[this.num-2].sid)
	                this.num--;
				}
			},
			next: function(arr){
				if(arr[this.num]){
                    var data = arr[this.num];
                    this.addMusicInfo(data);
                    this.getLyric(this.musicArr[this.num].sid)
	                this.num++;
				}else{
					this.getChannel();
				}
			},
			addMusicInfo: function(data){
                this.songName.text(data.title);
                this.songName.attr('title',data.title);
                this.singer.text(data.artist);
                this.singer.attr('title',data.artist);
                this.musicBg.css({
                	'backgroundImage': 'url('+data.picture+')'
                })
                this.audio.src = data.url;
			},
			time: function(num,$ele){
                var minute = parseInt(num/60),
                    second = parseInt(num%60);
                if(second>=10){
                	second = second
                }else{
                	second = '0'+second;
                }
                if(minute>=10){
                	minute = minute
                }else{
                	minute = '0'+minute;
                }
                $ele.text(minute+':'+second)
			},
			progress: function(){
                var time = this.audio.duration,
                    currentTime = this.audio.currentTime,
                    length = $('.song-time-line').width();
                $('.real-song-time-line').css({
                	'width': length*currentTime/time
                })
			},
			getLyric: function(data){
				if(typeof data === 'number'){
                    var id = data,
				    _this = this;
	                $.ajax({
	                	url: 'http://api.jirengu.com/fm/getLyric.php',
	                	method: 'get',
	                	data: {
	                		sid: id
	                	}
	                }).done(function(result){
	                	var reg = /Warning/g;
	                	if(reg.test(result)){
	                		var li = $('<li>此歌曲没有歌词</li>');
	                		$('.lyric ul').append(li);
	                	}else{
	                		_this.formatLyric(JSON.parse(result).lyric);
	                	    _this.addLyric(_this.lyricArr);
	                	}
	                })
				}else{
					var id = JSON.parse(data).song[0].sid,
				    _this = this;
	                $.ajax({
	                	url: 'http://api.jirengu.com/fm/getLyric.php',
	                	method: 'get',
	                	data: {
	                		sid: id
	                	}
	                }).done(function(result){
	                	var reg = /Warning/g;
	                	if(reg.test(result)){
	                		var li = $('<li>此歌曲没有歌词</li>');
	                		$('.lyric ul').append(li);
	                	}else{
	                		_this.formatLyric(JSON.parse(result).lyric);
	                	    _this.addLyric(_this.lyricArr);
	                	}
	                })
				}
			},
			formatLyric: function(str){
				var _this = this,
				    lyric = str.split('\n'),
				    reg = /\[\d{2}:\d{2}.\d{2}\]/g;
					$.each(lyric,function(index,value){
						if(reg.test(value)){
							var arr = [],
	                        time = value.match(reg)[0].slice(1,-1).split(':'),
	                        time = parseInt(time[0])*60 + parseFloat(time[1]);
		                    if(value.replace(reg,'') !== ''){
		                    	str = value.replace(reg,'')
		                    }
	                        arr.push(time);
	                        arr.push(str);
	                        _this.lyricArr.push(arr);
						}
				    })
			},
			addLyric: function(arr){
                $.each(arr,function(i,v){
                	var li = $('<li></li>');
                	li.text(v[1]);
                	$('.lyric ul').append(li);
                })
			},
			showLyric: function(fn){
				var _this = this,
                    i = 0;
				    lyricList = $('.lyric ul>li')
					$.each(_this.lyricArr,function(index,value){
						if(_this.audio.currentTime > value[0]){
                           lyricList.eq(i).addClass('change-color');
                           lyricList.eq(i).siblings('li').removeClass('change-color')
                           i++;
						}
					})
					fn.bind(_this)()
			},
			synchronous: function(){
				var lyric = $('.lyric');
				if($('.change-color').length !== 0){
                    if(($('.change-color').offset().top+lyric.scrollTop()) > (lyric.height()+lyric.scrollTop())){
                        $('.lyric').scrollTop($('.lyric').scrollTop()+100)
                    }else if($('.change-color').offset().top<0){
                    	$('.lyric').scrollTop($('.change-color').offset().top)
                    }
				}
			},
			getChannel: function(){
                var channelStr = $('.show').text(),
                    channelId = '',
                    _this = this;
                $.ajax({
                	url: 'http://api.jirengu.com/fm/getChannels.php',
                	method: 'get'
                }).done(function(result){
                	var channelList = JSON.parse(result).channels;
                	$.each(channelList,function(index,value){
                		if(value.name === channelStr){
                            channelId = value.channel_id;
                            _this.getMusic(channelId)
                		}
                	})
                })
			}
		}
		var music = new MusicPlayer();