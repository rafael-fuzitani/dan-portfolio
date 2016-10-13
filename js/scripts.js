
$(document).ready(function() {
	var projNumber = $('.section2').length;
	var bar = $('#bar');
	var sections = $('section');

	if($('.close-proj').css('display') == 'none') {
		var projShown = 1;
	}else {
		var projShown = 3;		
	}				
	

	$('#bar').width($(window).width() /(sections.length - (projNumber - 1)));

	//Call functions
	$('nav > a').smoothScroll();
	workLoad();	
	generalNav();
	$(window).load(function() {
		var vWidth = $(window).width();
		var pWidth = vWidth/projShown;
		var vHeight = $(window).height();

		$('#reel, #about, #contact').css('width', vWidth).css('height', vHeight);
		$('.section2').each( function(){
			$(this).css('width', pWidth).css('height', vHeight);
		});
	});

	$(window).resize(function() {
		var vWidth = $(window).width();
		var pWidth = vWidth/projShown;
		var vHeight = $(window).height();
		$('#reel, #about, #contact').css('width', vWidth).css('height', vHeight);
		$('#projects').each( function(){
			$(this).css('width', pWidth).css('height', vHeight);
		});	
		console.log('resizing');			
	});
		// HOME REEL
		var iframe = $(document).find('iframe');
		var player = new Vimeo.Player(iframe);

		player.on('play', function() {
			console.log('played the video!');
		});

		player.getVideoTitle().then(function(title) {
			console.log('title:', title);
		});
		$(function() {

			$('.play-button').click(function(){
				var image = $(this).attr('src');
				$("#overlay").css("background", "#333 fixed").fadeIn(400);
				player.play().then(function() {
					    // the video was played
					}).catch(function(error) {
						switch (error.name) {
							case 'PasswordError':
					            // the video is password-protected and the viewer needs to enter the
					            // password first
					            break;

					            case 'PrivacyError':
					            // the video is private
					            break;

					            default:
					            // some other error occurred
					            break;
					        }
					    });
					
					return false;
				});
			
			$('.close').click(function(){
				$("#overlay").fadeOut(400);
				player.unload().then(function() {
					    // the video was unloaded
					}).catch(function(error) {
					    // an error occurred
					});
				});



		});

	


	//SHOW WORKS
	function workLoad(){
		$.ajaxSetup ({ cache: false });
		$('.thumb-wrap').click(function(){
			var $this = $(this),
			newTitle = $this.find('h2').text(),
			newSubTitle = $this.find('h3').text(),
			spinner = '<div class="loader">Loading...</div>',
			newFolder = $this.data('folder')
			newHTML = 'projects/' + newFolder;
			$('.project-load').html(spinner).load(newHTML);
			$('.project-title').text(newTitle);
			$('.project-sub-title').text(newSubTitle);
			
		});
	}



	//GENERAL NAV THROUGH ARROWS
	function generalNav(){

		var sections = $('nav  a');
		var firstProject = $('a.projects').first().attr('href');
		var lastProject = $('a.projects').last().attr('href');
		var fullbarProject = $('a.projects').eq(-2).attr('href'); //third project which means the project bar should be full because all projects should be displayed by then
		var projNumber = $('.section2').length;
		var projIndex = 1 / projNumber;
		var activeIndex;
		var barIndexMax = sections.length - 4;
		var barIndexMin = 0;
		var barIndex = 0;
		var barUnit = $(window).width() / (sections.length - (projNumber - 1));
		console.log('fullbarProject ' + fullbarProject);


		


	    //NEXT ARROW
	    $('.next-section').click(function() {
	    	
	        for(i=0;i<sections.length;i++) { //roda pelos itens do nav
	            if($(sections[i]).hasClass('active')) {  //se o iten tiver active
	                activeIndex = i; //coloca o elemento active nessa vars
	                $(sections[i]).removeClass('active');//tira o active
	            }
	        }


	        
	        $(sections[activeIndex+1]).addClass('active');//coloca active na próxima section
	        

	        var nextSection = $('.active').attr('href');
	        var prevSection = $('.active').prev().attr('href');
	        $(this).attr('href', nextSection);
	        $('.prev-section').attr('href', prevSection);
	        // console.log(url);
	        if (barIndex == barIndexMax) {
	        	barIndex = barIndexMax;
	        }
	        else {
	        	if($('a[href^=#projects]').hasClass('active')){	
	        		// barIndex = barIndex + projIndex;
	        		if (nextSection == firstProject) {
	        			barIndex = projIndex * projShown; 
	        		}
	        		else if ( $('.close-proj').css('display') == 'none') {
	        			barIndex = barIndex + projIndex; 
	        		}
	        		else if (nextSection == fullbarProject || nextSection == $('a.projects').eq(-1).attr('href') || nextSection == $('a.projects').last().attr('href') ) {
	        			barIndex = 2;
	        			nextSection = '#' + $('section#about').attr('id');
	        			$('nav a').removeClass('active');
	        			$('a[href=#about]').addClass('active');
	        			$(this).attr('href', nextSection);

	        		}
	        		else {
	        			barIndex = barIndex + projIndex; 
	        		}
	        	}
	        	

	        	else {
	        		barIndex = barIndex + 1;
	        	}
	        }
	        $('#bar').width(barUnit*(barIndex+1));

	        
	        console.log('barIndex = ' + barIndex);
	    });


	    //PREVIOUS ARROW
	    $('.prev-section').click(function () {
	        for(i=0;i<sections.length;i++) { //roda pelos itens do nav
	            if($(sections[i]).hasClass('active')) {  //se o iten tiver active
	                activeIndex = i; //coloca o elemento active nessa vars
	                
	                $(sections[i]).removeClass('active');//tira o active
	            }
	        }

	        $(sections[activeIndex-1]).addClass('active');//coloca active na section anterior

	        var prevSection = $('.active').attr('href');
	        var nextSection = $('.active').next().attr('href');
	        $(this).attr('href', prevSection);
	        $('.next-section').attr('href', nextSection);
	    	$('.next-section').show(200);	        
	        if(barIndex == barIndexMin) {
	        	barIndex = barIndexMin;
	        }
	        else {
	        	if($('a[href^=#projects]').hasClass('active')){
	        		barIndex = barIndex - projIndex;
	        		if(prevSection == $('a.projects').last().attr('href')){
	        			barIndex = 1;
	        			if ( $('.close-proj').css('display') == 'none') {
	        				barIndex = barIndex - projIndex; 
	        			}else {
	        				prevSection = '#' + $('section#projects2').attr('id');
	        				$('nav a').removeClass('active');
	        				$('a[href=#projects2]').addClass('active');
	        				$(this).attr('href', prevSection);
	        			}
	        			
	        		}
	        	}
	        	else {
	        		barIndex = barIndex - 1;
	        		console.log('barIndex ' + barIndex);
	        	}
	        }
	        if ( prevSection == '#reel') {
	        	barIndex = 0; //força a barra ficar certa
	        }

	        else if ( prevSection == lastProject) {
	        	barIndex = 1;
	        }
	        $('#bar').width(barUnit*(barIndex+1));

	        console.log('barIndex =' + barIndex);

	        
	    });

	    $('nav > a').click(function(){
	    	$(this).siblings('a').removeClass('active');
	    	$(this).addClass('active');
	    	if ($('a[href=#reel]').hasClass('active')) {
	    		barIndex = 0;
	    		console.log('barIndex ' + barIndex);
	    	}
	    	else if ($('a[href^=#projects]').hasClass('active')) {
	    		barIndex = projIndex * projShown;
	    		console.log('barIndex ' + barIndex);
	    	}		
	    	else if ($('a[href=#about]').hasClass('active')) {
	    		barIndex = 2;
	    		console.log('barIndex ' + barIndex);
	    	}
	    	else if ($('a[href=#contact]').hasClass('active')) {
	    		barIndex = 3;
	    		console.log('barIndex ' + barIndex);
	    	}
	    	$('#bar').width(barUnit*(barIndex+1));
	    });


	    $('nav a, .prev-section, .next-section').click(function(){
	    	//hide or show arrows
	    	if($('nav a').first().hasClass('active')){
	    	$('.prev-section').hide(200);
	    	console.log('hide yourself');
		    }
		    else {
		    	$('.prev-section').show(200);
		    }

		    if($('nav a').last().hasClass('active')){
		    	$('.next-section').hide(200);
		    }
		    else {
		    	$('.next-section').show(200);
		    }	


		    //NavBar active projects (T_T)
		    if($('a.projects').hasClass('active')){
		    	$('nav a.projects').first().css('background-color', '#2098d1');
		    }else {
		    	$('nav a.projects').first().css('background-color', '#626262');
		    }
	    });
	    

	    
	    $('a.next-section, a.prev-section').smoothScroll();
	}
	

});

