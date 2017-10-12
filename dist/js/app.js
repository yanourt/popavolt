window.onload = function(){

    //background img method
    document.getElementById('bgvideo').play();


    var seed = document.getElementById('seed'),
        winH = window.innerHeight,
        scrollpos = window.pageYOffset,
        pause = false,
        scrollLength = 1500,
        loopLength = 500;

    var frames = 89,
        cframe = 0,
        width = 75,
        position = 0,
        containerfixed = true;


    window.onresize = function(){
        winH = window.innerHeight;
    }

    window.addEventListener('scroll', function(){
        scrollpos = window.pageYOffset;
        // console.log(scrollpos);
        if(scrollpos > winH && scrollpos < winH + scrollLength){
            window.requestAnimationFrame(animVideo);
        }else if (scrollpos < winH) {
            getFrame(0);
        }else if (scrollpos > winH + scrollLength){
            window.requestAnimationFrame(loopanim);
            if(scrollpos > winH + scrollLength + loopLength && containerfixed){
                unfixAnim();
            }
        }

        if(scrollpos < winH + scrollLength + loopLength && !containerfixed){
            fixAnim();
        }
    });

    if(scrollpos > winH && scrollpos < winH + scrollLength){
        window.requestAnimationFrame(animVideo);
    }else if (scrollpos < winH) {
        getFrame(0);

    }else if (scrollpos > winH + scrollLength){
        window.requestAnimationFrame(loopanim);
    }else if (scrollpos > winH + scrollLength + loopLength) {
        unfixAnim();
    }

    function animVideo(){

        if(scrollpos > winH && scrollpos < winH + scrollLength && !pause){
            getFrame(Math.round(((scrollpos - winH) / scrollLength) * frames))
            // position =  Math.round(((scrollpos - winH) / scrollLength) * frames) * width * -1;
            // seed.style.backgroundPosition = position+ "px, 0";
            // console.log(position);
            window.requestAnimationFrame(animVideo);
        }

    }

    function loopanim(){
        if(scrollpos > winH + scrollLength){
            if(cframe == 98){
                getFrame(89);
            }else{
                getFrame(cframe + 1);
            }
            window.requestAnimationFrame(loopanim);
        }
    }


    function getFrame(frame){
        position = frame * width * -1;
        seed.style.backgroundPosition = position + "px, 0";
        cframe = frame;
    }


    function unfixAnim(){
        seed.parentNode.style.position = "static";
        seed.parentNode.style.marginTop = scrollLength + loopLength + "px";
        containerfixed = false;
    }


    function fixAnim(){
        seed.parentNode.style.position = "";
        seed.parentNode.style.marginTop = "0";
        containerfixed = true;
    }



    // var vid = document.getElementById('seed'),
    //     winH = window.innerHeight,
    //     scrollpos = window.pageYOffset,
    //     scrollLength = 1500;
    //
    // window.addEventListener('scroll', function(){
    //     scrollpos = window.pageYOffset;
    //     console.log(scrollpos);
    //     if(scrollpos > winH && scrollpos < winH + scrollLength){
    //         window.requestAnimationFrame(animVideo);
    //     }else if (scrollpos < winH) {
    //         vid.currentTime = 0;
    //     }else if (scrollpos > winH + scrollLength){
    //         vid.currentTime = vid.duration;
    //     }
    // });
    //
    // if(scrollpos > winH && scrollpos < winH + scrollLength){
    //     window.requestAnimationFrame(animVideo);
    // }else if (scrollpos < winH) {
    //     vid.currentTime = 0;
    // }else if (scrollpos > winH + scrollLength){
    //     vid.currentTime = vid.duration;
    // }
    //
    // function animVideo(){
    //
    //     if(scrollpos > winH && scrollpos < winH + scrollLength){
    //         vid.currentTime = ((scrollpos - winH) / scrollLength) * vid.duration;
    //         console.log(vid.currentTime);
    //         window.requestAnimationFrame(animVideo);
    //     }
    //
    // }

}



    // var seed = document.getElementById('seed'),
    // seedloop = document.getElementById('seed-loop'),
    // winH = window.innerHeight,
    // framerate = 29.97,
    // seedDuration = seed.duration,
    // totalFrame = framerate * seedDuration,
    // goTo = 0,
    // goTovid = 0,
    // scrollSpace = 1500;
    //
    // window.onresize = function(){
    //     winH = window.innerHeight;
    // };
    //
    //
    // window.addEventListener('scroll', scrolling);
    //
    // function scrolling(e){
    //     if(e.pageY >= winH){
    //         goTo = (e.pageY - winH) / scrollSpace;
    //         if(e.pageY > scrollSpace + winH){
    //
    //         }else{
    //             animVideo(seed, goTo, framerate);
    //         }
    //     }
    // }
    //
    //
    // function animVideo(video, timetogo, framerate){
    //     if ((timetogo * video.duration) >= video.currentTime){
    //         // console.log('en avant');
    //         goToVid = timetogo * video.duration;
    //         window.requestAnimationFrame(goForward);
    //     }else if ((timetogo * video.duration) <= video.currentTime) {
    //         // console.log('en arrière');
    //         goTovid = timetogo * video.duration;
    //         window.requestAnimationFrame(goBackward);
    //     }
    // };
    //
    //
    //
    // function goForward(timestamp){
    //     if(seed.currentTime < goToVid){
    //         seed.currentTime += 1/framerate;
    //         window.requestAnimationFrame(goForward);
    //     }
    // }
    // function goBackward(timestamp){
    //     if(seed.currentTime > goToVid){
    //         seed.currentTime -= 1/framerate;
    //         window.requestAnimationFrame(goForward);
    //     }
    // }



    // select video element
    // var vid = document.getElementById('seed');
    // var windowheight = window.innerHeight -20;
    //
    //
    // var scrollpos = window.pageYOffset/400;
    // var targetscrollpos = scrollpos;
    // var accel = 0;
    //
    //
    // // ---- Values you can tweak: ----
    // var accelamount = 1; //How fast the video will try to catch up with the target position. 1 = instantaneous, 0 = do nothing.
    // var bounceamount = 0; //value from 0 to 1 for how much backlash back and forth you want in the easing. 0 = no bounce whatsoever, 1 = lots and lots of bounce
    //
    // // pause video on load
    // vid.pause();
    //
    // window.onscroll = function(){
    //     //Set the video position that we want to end up at:
    //     targetscrollpos = window.pageYOffset/400;
    //
    // };
    //
    //
    // setInterval(function(){
    //
    //       //Accelerate towards the target:
    //       accel += (targetscrollpos - scrollpos)*accelamount;
    //
    //       //clamp the acceleration so that it doesnt go too fast
    //       if (accel > 1) accel = 1;
    //       if (accel < -1) accel = -1;
    //
    //       //move the video scroll position according to the acceleration and how much bouncing you selected:
    //       scrollpos = (scrollpos + accel) * (bounceamount) + (targetscrollpos * (1-bounceamount));
    //
    //
    //       //update video playback
    //       vid.currentTime = scrollpos;
    //       vid.pause();
    //
    // }, 40);
