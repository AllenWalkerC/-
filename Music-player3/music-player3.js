		function MusicPlayer(){
			this.init = function(){
                 this.audio = new Audio();
                 this.num = 0;
                 this.len = 0;
                 this.audio.autoplay = true;
                 this.bind();
                 this.musicList = [];
                 this.musicChannel= [
                                {name:'漫步春天',channel_id: 'public_tuijian_spring'},
                                {name:'秋日私语',channel_id: 'public_tuijian_autumn'},
                                {name:'温暖冬日',channel_id: 'public_tuijian_winter'},
                                {name:'热歌',channel_id: 'public_tuijian_rege'},
                                {name:'KTV金曲',channel_id: 'public_tuijian_ktv'},
                                {name:'Billboard',channel_id: 'public_tuijian_billboard'},
                                {name:'成名曲',channel_id: 'public_tuijian_chengmingqu'},
                                {name:'网络歌曲',channel_id: 'public_tuijian_wangluo'},
                                {name:'开车',channel_id: 'public_tuijian_kaiche'},
                                {name:'影视',channel_id: 'public_tuijian_yingshi'},
                                {name:'随便听听',channel_id: 'public_tuijian_suibiantingting'},
                                {name:'经典老歌',channel_id: 'public_shiguang_jingdianlaoge'},
                                {name:'70后',channel_id: 'public_shiguang_70hou'},
                                {name:'80后',channel_id: 'public_shiguang_80hou'},
                                {name:'90后',channel_id: 'public_shiguang_90hou'},
                                {name:'火爆新歌',channel_id: 'public_shiguang_xinge'},
                                {name:'儿歌',channel_id: 'public_shiguang_erge'},
                                {name:'旅行',channel_id: 'public_shiguang_lvxing'},
                                {name:'夜店',channel_id: 'public_shiguang_yedian'},
                                {name:'流行',channel_id: 'public_fengge_liuxing'},
                                {name:'摇滚',channel_id: 'public_fengge_yaogun'},
                                {name:'民谣',channel_id: 'public_fengge_minyao'},
                                {name:'轻音乐',channel_id: 'public_fengge_qingyinyue'},
                                {name:'小清新',channel_id: 'public_fengge_xiaoqingxin'},
                                {name:'中国风',channel_id: 'public_fengge_zhongguofeng'},
                                {name:'DJ舞曲',channel_id: 'public_fengge_dj'},
                                {name:'电影',channel_id: 'public_fengge_dianyingyuansheng'},
                                {name:'轻松假日',channel_id: 'public_xinqing_qingsongjiari'},
                                {name:'欢快旋律',channel_id: 'public_xinqing_huankuai'},
                                {name:'甜蜜感受',channel_id: 'public_xinqing_huankuai'},
                                {name:'寂寞',channel_id: 'public_xinqing_jimo'},
                                {name:'单身情歌',channel_id: 'public_xinqing_qingge'},
                                {name:'舒缓节奏',channel_id: 'public_xinqing_shuhuan'},
                                {name:'慵懒午后',channel_id: 'public_xinqing_yonglanwuhou'},
                                {name:'伤感',channel_id: 'public_xinqing_shanggan'},
                                {name:'华语',channel_id: 'public_yuzhong_huayu'},
                                {name:'欧美',channel_id: 'public_yuzhong_oumei'},
                                {name:'日语',channel_id: 'public_yuzhong_riyu'},
                                {name:'韩语',channel_id: 'public_yuzhong_hanyu'},
                                {name:'粤语',channel_id: 'public_yuzhong_yueyu'},
                 ];
                 this.timeLock;
                 this.lyricLock; 
			}
		this.init()
		}
		MusicPlayer.prototype = {
			bind: function(){
                var _this = this;
                $('.play').on('click',function(){
                	_this.play()
                })
                $('.mini-play').on('click',function(){
                	_this.play()
                })
                $('.pause').on('click',function(){
                    _this.pause()
                })
                $('.mini-pause').on('click',function(){
                    _this.pause()
                })
                $('.next').on('click',function(){
                	_this.next()
                })
                $('.mini-next').on('click',function(){
                	_this.next()
                })
                $('.time-line').on('click',function(e){
                	if(_this.audio.src){
						var offset = e.offsetX;
						$('real-time-line').css({
							'width': offset
						})
						_this.audio.currentTime = (offset*_this.audio.duration)/$(this).width();
					}
                })
                $('.real-time-line').on('click',function(e){
                	if(_this.audio.src){
						var offset = e.offsetX;
						$('real-time-line').css({
							'width': offset
						})
						_this.audio.currentTime = (offset*_this.audio.duration)/$('.time-line').width();
					}
                })
                $('.volume-line').on('click',function(e){
                	var offset = $(this).height() - e.offsetY;
                	$('.real-volume-line').css({
						'height': offset
					})
					_this.audio.volume = parseFloat(offset/$(this).height());
					$('.volume-min').addClass('hide');
					$('.volume-max').removeClass('hide');
                })
                $('.real-volume-line').on('click',function(e){
                	var offset = $(this).height() - e.offsetY;
                	$('.real-volume-line').css({
						'height': offset
					})
					_this.audio.volume = parseFloat(offset/$('.volume-line').height());
					$('.volume-min').addClass('hide');
					$('.volume-max').removeClass('hide');
                })
                $('.volume-max').on('click',function(){
                	$('.volume-min').removeClass('hide');
					$('.volume-max').addClass('hide');
					_this.audio.volume = 0;
					$('.real-volume-line').css({
						'height': 0
					})
                })
                $('.volume-min').on('click',function(){
                	$('.volume-min').addClass('hide');
					$('.volume-max').removeClass('hide');
					$('.real-volume-line').css({
						'height': 100
					})
					_this.audio.volume = 1;
                })
                $('.lyric-btn').on('click',function(){
                	if($('#lyric').hasClass('show')){
                		$('#lyric').removeClass('show');
                		$('#lyric').fadeOut(1000);
                		$('.music-picture').fadeIn(1000);
                		$('.music-name').fadeIn(1000);
                		$('.singer').fadeIn(1000);
                		$(this).css({
                			color: '#fff'
                		})
                	}else{
                		$('#lyric').addClass('show');
                		$('#lyric').fadeIn(1000);
                		$('.music-picture').fadeOut(1000);
                		$('.music-name').fadeOut(1000);
                		$('.singer').fadeOut(1000);
                		$(this).css({
                			color: '#1FF4CC'
                		})
                	}
                })
                $('.channel').on('click',function(){
                	if($('#channel-list').hasClass('show')){
                		$('#channel-list').removeClass('show')
                		$('#channel-list').slideUp();
                		$(this).css({
                			color: '#fff'
                		})
                	}else{
                		$('#channel-list').addClass('show')
                		$('#channel-list').slideDown();
                		$(this).css({
                			color: '#1FF4CC'
                		})
                	}
                })
                $('#channel-list li').on('click',function(){
                	$(this).siblings('li').removeClass('active');
                	$(this).addClass('active');
                	_this.getMusic();
                })
                $('.music-list').on('click',function(){
                	if($('#history').hasClass('show')){
                        $('#history').removeClass('show');
                		$('#history').animate({
                			display: 'block',
	                		width: '0',
	                		height: '0'
                	    })
                	    $(this).css({
                			color: '#fff'
                		})
                	}else{
                		$('#history').addClass('show');
                		$('#history').css({
                			display: 'block'
                		})
                		$('#history').animate({
                			display: 'block',
	                		width: '289',
	                		height: '379'
                	    })
                	    $(this).css({
                			color: '#1FF4CC'
                		})
                		_this.historyScroll();
                	}
                })
                $('#history').on('click','li',function(){
                	var index = $(this).index();
                	_this.getLyric(_this.musicList[index].sid);
            		_this.changeHtml(_this.musicList[index]);
            		_this.num = index+1;
            		$(this).siblings('li').removeClass('change-color');
                	$(this).addClass('change-color');
                	_this.historyScroll();
                })
                $('.pack-up').on('click',function(){
                	$('#music-box').slideUp()
                	setTimeout(function(){
                		$('#mini-music-box').slideDown()
                	},500)
                })
                $('.pack-down').on('click',function(){
                	$('#mini-music-box').slideUp()
                	setTimeout(function(){
                		$('#music-box').slideDown(800)
                	},500)
                })
                $(_this.audio).on('playing',function(){
                	_this.lyricLock = setInterval(function(){
                		_this.synchronousLyric();
                	},300)
                	_this.timeLock = setInterval(function(){
                        _this.progress();
                        _this.time(_this.audio.currentTime,$('.real-time'));
                	},1000)
                	_this.time(_this.audio.duration,$('.time'));
                	$('.play').addClass('hide');
                	$('.pause').removeClass('hide');
                	$('.mini-play').addClass('hide');
                	$('.mini-pause').removeClass('hide');
                    $('#history li').eq(_this.num-1).siblings('li').removeClass('change-color');
                    $('#history li').eq(_this.num-1).addClass('change-color');
                })
                $(_this.audio).on('pause',function(){
                	clearInterval(_this.timeLock);
                	clearInterval(_this.lyricLock);
                	$('.play').removeClass('hide');
                	$('.pause').addClass('hide');
                	$('.mini-play').removeClass('hide');
                	$('.mini-pause').addClass('hide');
                })
                _this.audio.addEventListener('ended',function(){
                	if(_this.musicList[_this.num]){
                        _this.getLyric(_this.musicList[_this.num].sid);
            		    _this.changeHtml(_this.musicList[_this.num]);
            		    _this.num++;
            		    _this.historyScroll();
                	}else{
                		_this.getMusic();
                	}
                })
			},
            getMusic: function(){
            	var _this = this,
            	    channel = '';
            	$.each(_this.musicChannel,function(index,value){
                    if(value.name === $('.active').text()){
                        channel = value.channel_id;
                    }
            	})
            	$.ajax({
            		url: 'http://api.jirengu.com/fm/getSong.php',
            		method: 'get',
            		data: {
                        channel: channel
            		}
            	}).done(function(result){
            		var data = JSON.parse(result).song[0];
            		_this.getLyric(data.sid);
            		_this.num++;
            		_this.len++;
            		_this.changeHtml(data);
            		_this.addMusic(data);
            		_this.showMusicList(data);
            	})
            },
			play: function(result){
                if(this.audio.src){
                	this.audio.play();
                    $('.play').addClass('hide');
                    $('.pause').removeClass('hide');
                    $('.mini-play').addClass('hide');
                    $('.mini-pause').removeClass('hide');
                }else{
                	this.getMusic();
                	$('.play').addClass('hide');
                    $('.pause').removeClass('hide');
                    $('.mini-play').addClass('hide');
                    $('.mini-pause').removeClass('hide');
                }
			},
			pause: function(){
                this.audio.pause();
                $('.play').removeClass('hide');
                $('.pause').addClass('hide');
                $('.mini-play').removeClass('hide');
                $('.mini-pause').addClass('hide');
			},
			next: function(){
				if(this.musicList[this.num]){
					this.getLyric(this.musicList[this.num].sid );
            		this.changeHtml(this.musicList[this.num]);
            		$('#history li').eq(this.num).siblings('li').removeClass('change-color');
                	$('#history li').eq(this.num).addClass('change-color');
            		this.num++;
            		this.historyScroll();
				}else{
                    this.getMusic()
				}
			},
			changeHtml: function(result){
				this.audio.src = result.url;
				$('.music-name').text(result.title);
				$('.mini-music-name').text(result.title);
				$('.singer').text(result.artist);
				$('.mini-singer').text(result.artist);
				$('.music-picture').css({
					backgroundImage: 'url('+result.picture+')'
				})
				$('.music-name').attr('title',result.title);
				$('.mini-music-name').attr('title',result.title);
				$('.singer').attr('title',result.artist);
				$('.mini-singer').attr('title',result.artist);
			},
			addMusic: function(result){
                var musicInfo = {};
                 musicInfo.artist = result.artist;
                 musicInfo.title = result.title;
                 musicInfo.picture = result.picture;
                 musicInfo.sid = result.sid;
                 musicInfo.url = result.url;
                 this.musicList.push(musicInfo);
			},
			showMusicList: function(result){
				var li = $('<li></li>');
				li.text(this.len+ '. ' + result.title+' — '+result.artist);
				$('#history>ul').append(li);
				li.siblings('li').removeClass('change-color');
                li.addClass('change-color');
                this.historyScroll();
			},
			getLyric: function(result){
				var _this = this;
				$.ajax({
					url: 'http://api.jirengu.com/fm/getLyric.php',
            		method: 'get',
            		data: {
                        sid: result
            		}
				}).done(function(result){
					$('#lyric>ul').empty();
					var reg = /Warning/g;
					if(reg.test(result)){
						var li = $('<li>抱歉，此歌曲没歌词</li>');
						$('#lyric>ul').append(li);
					}else{
						var lyric = JSON.parse(result).lyric;
                        _this.analysisLyric(lyric,_this.addLyric)
					}
				})
			},
			analysisLyric: function(result,fn){
				var lyric = result.split('\n'),
				    lyricArr = [];
				    reg = /\[\d{2}:\d{2}\.\d{2}\]/g;
				$.each(lyric,function(index,value){
					if(reg.test(value)){
						for(var i = 0;i<value.match(reg).length;i++){
							var arr = [];
							    time = value.match(reg)[i].slice(1,-1).split(':'),
		                        time = parseInt(time[0])*60 + parseFloat(time[1]);
			                    if(value.replace(reg,'') !== ''){
			                    	str = value.replace(reg,'')
			                    }
			                arr.push(time);
	                        arr.push(str);
	                        lyricArr.push(arr);
						}
					}
				})
				lyricArr.sort(function(v1,v2){
					return v1[0]-v2[0]
				})
				fn(lyricArr);
			},
			addLyric: function(arr){
				$.each(arr,function(index,value){
					var li = $('<li>'+value[1]+'</li>');
					li.attr('data-time',value[0])
					$('#lyric>ul').append(li);
				})
			},
            synchronousLyric: function(){
            	var lyricList = $('#lyric>ul>li'),
            	    _this = this;
            	$.each(lyricList,function(index,value){
                    if(_this.audio.currentTime > parseFloat($(value).attr('data-time'))){
                        $(value).addClass('change-color');
                        $(value).siblings('li').removeClass('change-color');
                        if(($(value).offset().top+80) > ($('#lyric').height()+$('#lyric').offset().top)){
                        	var offset = index * $(value).outerHeight(true);
                        	$('#lyric>ul').css({
                        		top: -offset+270
                        	})
                        }else if($(value).offset().top<0){
                        	var offset = index * $(value).outerHeight(true);
                            $('#lyric>ul').css({
                        		top: offset
                        	})
                        }
                    }
            	})
            },
            progress: function(){
                var time = this.audio.duration,
                    currentTime = this.audio.currentTime,
                    length = $('.time-line').width();
                $('.real-time-line').css({
                	'width': length*currentTime/time
                })
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
			historyScroll: function(){
				var index = $('#history li').last().index();
                $('#history').scrollTop(index*50);

			}
		}
		var music = new MusicPlayer();