document.addEventListener("DOMContentLoaded", () => {
    //슬라이드쇼
    const slidesContainer = document.querySelector("#slides");
    const leftBtn = document.querySelector("#leftBtn");
    const rightBtn = document.querySelector("#rightBtn");
    const circles = document.querySelectorAll("#circles > div");

    let slides = document.querySelectorAll("#slides div");
    const totalSlides = slides.length;

    let curIndex = 1; // 가짜 첫 번째 슬라이드에서 시작
    let slideInterval;
    let isTransitioning = false;

    // 슬라이드 복제 (앞뒤로 추가)
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[totalSlides - 1].cloneNode(true);
    
    slidesContainer.appendChild(firstClone);
    slidesContainer.insertBefore(lastClone, slides[0]);

    slides = document.querySelectorAll("#slides div"); // 다시 슬라이드 목록 가져오기
    const updatedTotalSlides = slides.length; // 복제된 슬라이드 포함한 총 개수

    slidesContainer.style.transform = `translateX(${-curIndex * 100}vw)`;

    function updateSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        slidesContainer.style.transition = "transform 0.5s ease-in-out";
        slidesContainer.style.transform = `translateX(${-index * 100}vw)`;

        // 인디케이터 업데이트
        circles.forEach(circle => circle.classList.remove("on"));
        circles[(index - 1 + totalSlides) % totalSlides].classList.add("on");

        setTimeout(() => {
            if (index === 0) {
                slidesContainer.style.transition = "none";
                curIndex = totalSlides;
                slidesContainer.style.transform = `translateX(${-curIndex * 100}vw)`;
            } else if (index === updatedTotalSlides - 1) {
                slidesContainer.style.transition = "none";
                curIndex = 1;
                slidesContainer.style.transform = `translateX(${-curIndex * 100}vw)`;
            }
            isTransitioning = false;
        }, 500);
    }

    function nextSlide() {
        if (isTransitioning) return;
        curIndex++;
        updateSlide(curIndex);
    }

    function prevSlide() {
        if (isTransitioning) return;
        curIndex--;
        updateSlide(curIndex);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 3000);
    }

    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }

    // 버튼 클릭 이벤트
    leftBtn.addEventListener("click", function () {
        prevSlide();
        resetAutoSlide();
    });

    rightBtn.addEventListener("click", function () {
        nextSlide();
        resetAutoSlide();
    });

    // 인디케이터 클릭 이벤트
    circles.forEach((circle, index) => {
        circle.addEventListener("click", function () {
            curIndex = index + 1;
            updateSlide(curIndex);
            resetAutoSlide();
        });
    });

    updateSlide(curIndex);
    startAutoSlide();


    //스크롤 애니메이션

    function scrollAnimation(){
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        const sloganImg = document.querySelector(".slogan img");
        const slogan = document.querySelector('.slogan')
        const tourText = document.querySelector('.tour .textBox h1');
        const stayText = document.querySelector('.stay .textBox h1');
        const foodText = document.querySelector('.food .textBox h1');
        const tourDetail = document.querySelector('.tour .textBox div') 
        const stayDetail = document.querySelector('.stay .textBox div') 
        const foodDetail = document.querySelector('.food .textBox div') 
        const tourBtn = document.querySelector('.tour .textBox button') 
        const stayBtn = document.querySelector('.stay .textBox button') 
        const foodBtn = document.querySelector('.food .textBox button') 
        const festivalh1 = document.querySelector('.fesSec h1');
        

        const sloganOffset = slogan.offsetTop;
        const tourOffset = tourText.offsetTop;
        const stayOffset = stayText.offsetTop;
        const foodOffset = foodText.offsetTop;
        const festivalh1Offset = festivalh1.offsetTop;

        const triggerPoint = scrollY + windowHeight* 0.8;

        if(triggerPoint > sloganOffset){
            sloganImg.style.opacity = 1;
        }
        if(triggerPoint > tourOffset){
            tourText.style.opacity = 1;
            tourDetail.style.opacity = 1;
            tourBtn.style.opacity =1;
            tourText.style.transform ="translateX(0)"
        }
        if(triggerPoint > stayOffset){
            stayText.style.opacity = 1;
            stayDetail.style.opacity = 1;
            stayBtn.style.opacity =1;
            stayText.style.transform ="translateX(0)"
        }
        if(triggerPoint > foodOffset){
            foodText.style.opacity = 1;
            foodDetail.style.opacity = 1;
            foodBtn.style.opacity =1;
            foodText.style.transform ="translateX(0)"
        }
        if(triggerPoint > festivalh1Offset){
            festivalh1.style.opacity = 1;
            festivalh1.style.transform ="translate(0,0)"
        }
    }
    window.addEventListener('scroll', scrollAnimation)
    scrollAnimation()

    //top버튼
    const topBtn = document.querySelector("#topBtn")

    window.addEventListener('scroll', function(){
        if(window.scrollY >500){
            topBtn.style.opacity = 1;
            topBtn.style.visibility ="visible"
        }else{
            topBtn.style.opacity = 0;
            topBtn.style.visibility ="hidden"
        }
    })
    topBtn.addEventListener('click',function(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    })

    //캔버스
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    
    // 캔버스 크기 설정
    canvas.width = window.innerWidth;
    canvas.height = 700;
    
    // 서핑보드 이미지 로드
    const surfboardImg = new Image();
    surfboardImg.src = '/image/home/surfboard.png'; // 절대경로로 수정
    
    // 파도 애니메이션 관련 변수(진폭,길이(파동주기),속도)
    let waveAmplitude1 = 50, waveAmplitude2 = 70, waveAmplitude3 = 90; 
    let waveLength1 = 0.02, waveLength2 = 0.015, waveLength3 = 0.01; 
    let waveSpeed1 = 0.04, waveSpeed2 = 0.03, waveSpeed3 = 0.02; 
    let offset1 = 0, offset2 = 0, offset3 = 0; 
    
    // 서핑보드 위치 및 흔들림 효과
    let surfboardRight = {
        x: canvas.width / 2  +600, 
        y: canvas.height / 2,
        width: 200,
        height: 200,
        angle: 0, 
        waveEffect: 0 
    };
    let surfboardLeft = {
        x: canvas.width / 2 -600, 
        y: canvas.height,
        width: 200,
        height: 200,
        angle: 0, 
        waveEffect: 0 
    };
    
    function drawWaves() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        function drawSingleWave(color, amplitude, length, offset, yOffset) {
            ctx.fillStyle = color;
            ctx.beginPath();
            for (let x = 0; x < canvas.width; x++) {
                let y = Math.sin(x * length + offset) * amplitude * Math.sin(offset * 0.5) + canvas.height / 2 + yOffset;
                ctx.lineTo(x, y);
            }
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.closePath();
            ctx.fill();
        }
    
        drawSingleWave('rgba(0, 50, 200, 0.5)', waveAmplitude3, waveLength3, offset3, 80);
        drawSingleWave('rgba(0, 100, 255, 0.6)', waveAmplitude2, waveLength2, offset2, 50);
        drawSingleWave('rgba(0, 150, 255, 0.7)', waveAmplitude1, waveLength1, offset1, 20);
    }
    
    function drawSurfboard(surfboard, flip = false) {
        let waveY = Math.sin(surfboard.x * waveLength1 + offset1) * waveAmplitude1 + canvas.height / 2;
        
        surfboard.y = waveY - surfboard.height/2.8; // 더 적절한 높이 조정
        
        // 서핑보드 흔들림 효과 추가
        surfboard.waveEffect = Math.sin(offset1 * 2) * 5; 
        let angleInRadians = surfboard.waveEffect * (Math.PI / 180);
    
        ctx.save();
        ctx.translate(surfboard.x + surfboard.width / 2, surfboard.y + surfboard.height / 2);
        if(flip){ctx.scale(-1,1)}
        ctx.rotate(angleInRadians);
        ctx.drawImage(surfboardImg, flip ? -surfboard.width / 2 * -1 : -surfboard.width / 2, -surfboard.height / 2, surfboard.width, surfboard.height);
        ctx.restore();
    }
    
    function animateWaves() {
        offset1 += waveSpeed1;
        offset2 += waveSpeed2;
        offset3 += waveSpeed3;
    
        drawWaves();
        if (surfboardImg.complete) {
            drawSurfboard(surfboardRight, false);
            drawSurfboard(surfboardLeft, true);
        }
    
        requestAnimationFrame(animateWaves);
    }
    
    // 창 크기 변경 시 캔버스 크기 자동 조정
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = 700;
    });
    
    // 이미지가 완전히 로드된 후 애니메이션 실행
    surfboardImg.onload = function () {
        console.log("서핑보드 이미지 로드 완료"); // 디버깅
        animateWaves();
    };
    
    //햄버거버튼 
    const hamberger = document.querySelector('.hamburger');
    const modal = document.querySelector('.modal');
    const mocloseBtn =document.querySelector('#mocloseBtn');

    hamberger.addEventListener('click', function(){
        modal.classList.toggle('on');
    });
    mocloseBtn.addEventListener('click', function(){
        modal.classList.toggle('on');
    });


    //폭죽 효과
    
    function createFirework (){
        const fireworkContainer = document.querySelector('#firework');
        const firework = document.createElement('div');
        firework.classList.add('firework-effect');

        firework.style.left = Math.random() * 100 +"%";
        firework.style.top = Math.random() * 100 +"%";

        fireworkContainer.appendChild(firework);

        setTimeout(()=>{
            firework.remove()
        },1500)
    }

    setInterval(createFirework,300);
});