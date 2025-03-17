            // JSON 형태의 이미지 데이터 – 각 클릭 대상 div의 id를 키로 사용
            const imageData = {
                "sec2-1": ["./image/food/sijang/kom4.jpg", "./image/food/sijang/kom3.jpg", "./image/food/sijang/kom6.jpg"],
                "sec2-2": ["./image/food/sijang/odaeng1.jpeg", "./image/food/sijang/odaeng4.jpeg", "./image/food/sijang/odaeng3.jpg", "./image/food/sijang/odaeng5.jpeg"],
                "sec2-3": ["./image/food/sijang/donuts.jpg", "./image/food/sijang/fry1.jpeg", "./image/food/sijang/kkochi.jpg"],
                "sec2-4": ["./image/food/sijang/Ejr1.jpeg", "./image/food/sijang/Ejr2.jpg", "./image/food/sijang/Ejr3.png", "./image/food/sijang/Ejr5.png"],
                
                "sec3-1": ["./image/food/coffee/rang/co.jpeg", "./image/food/coffee/rang/co2.jpeg", "./image/food/coffee/rang/co4.jpeg"],
                "sec3-2": ["./image/food/coffee/rang/te3.jpeg", "./image/food/coffee/rang/tea.jpeg", "./image/food/coffee/rang/te4.jpeg"],
                "sec3-3": ["./image/food/coffee/rang/de4.jpeg", "./image/food/coffee/rang/de3.jpeg", "./image/food/coffee/rang/de6.jpeg"],
                "sec3-4": ["./image/food/coffee/rang/view2.jpeg", "./image/food/coffee/rang/view3.jpeg", "./image/food/coffee/rang/view4.jpeg"],
                
                "sec4-1": ["./image/food/coffee/black/co1.jpeg", "./image/food/coffee/black/black 5.jpg", "./image/food/coffee/black/co3.jpeg"],
                "sec4-2": ["./image/food/coffee/black/te6.jpg", "./image/food/coffee/black/te1.png", "./image/food/coffee/black/te2.png"],
                "sec4-3": ["./image/food/coffee/black/black6.jpg", "./image/food/coffee/black/de.jpeg", "./image/food/coffee/black/de3.jpeg"],
                "sec4-4": ["./image/food/coffee/black/in1.jpeg", "./image/food/coffee/black/in4.jpeg", "./image/food/coffee/black/in2.jpeg"],
                
                "sec5-1": ["./image/food/coffee/AND COFFEE/and 7.jpg ", "./image/food/coffee/AND COFFEE/co1.jpeg", "./image/food/coffee/AND COFFEE/co3.jpeg"],
                "sec5-2": ["./image/food/coffee/AND COFFEE/in1.jpeg", "./image/food/coffee/AND COFFEE/in3.jpeg", "./image/food/coffee/AND COFFEE/in2.jpeg"],
                "sec5-3": ["./image/food/coffee/AND COFFEE/and 4.jpg", "./image/food/coffee/AND COFFEE/de3.jpeg", "./image/food/coffee/AND COFFEE/de2.jpeg"],
                "sec5-4": ["./image/food/coffee/AND COFFEE/and 10.jpg", "./image/food/coffee/AND COFFEE/and 6.jpg", "./image/food/coffee/AND COFFEE/de1.jpeg"],
                
                "sec6-1": ["./image/food/foods/rma/rma7.jpg", "./image/food/foods/rma/rma13.jpeg", "./image/food/foods/rma/rma12.jpeg"],
                "sec6-2": ["./image/food/foods/rma/rma6.jpg", "./image/food/foods/rma/rma14.jpeg", "./image/food/foods/rma/rma14.jpeg"],
                "sec6-3": ["./image/food/foods/rma/rma1.jpg", "./image/food/foods/rma/rma5.jpg", "./image/food/foods/rma/rma8.jpg"],
                "sec6-4": ["./image/food/foods/rma/in2.jpeg", "./image/food/foods/rma/in4.jpeg", "./image/food/foods/rma/in.jpeg","./image/food/foods/rma/in3.jpeg"],

                "sec7-1": ["./image/food/foods/dml/dml3.jpg", "./image/food/foods/dml/dml6.jpeg", "./image/food/foods/dml/dml5.jpg"],
                "sec7-2": ["./image/food/foods/dml/dml9.png", "./image/food/foods/dml/dml8.png", "./image/food/foods/dml/dml10.png"],
                "sec7-3": ["./image/food/foods/dml/tlf1.jpeg", "./image/food/foods/dml/tlf2.jpeg", "./image/food/foods/dml/tlf3.jpeg"],
                "sec7-4": ["./image/food/foods/dml/menu.jpg"],

                "sec8-1": ["./image/food/foods/al/mi4.jpg", "./image/food/foods/al/mi.jpg", "./image/food/foods/al/thx2.jpeg"],
                "sec8-2": ["./image/food/foods/al/go.jpeg", "./image/food/foods/al/go2.jpeg", "./image/food/foods/al/go3.jpeg"],
                "sec8-3": ["./image/food/foods/al/menu.jpg", "./image/food/foods/al/menu1.jpg", "./image/food/foods/al/menu2.jpg"],
                "sec8-4": ["./image/food/foods/al/tlf1.jpeg", "./image/food/foods/al/tlf2.jpeg", "./image/food/foods/al/tlf3.jpeg","./image/food/foods/al/tlf4.jpeg"]
              };
              
              document.addEventListener("DOMContentLoaded", function(){
                const modal = document.getElementById("modal");
                const modalImg = document.getElementById("modal-img");
                const modalClose = document.getElementById("modal-close");
                const modalName = document.querySelector(".modal-Name");
                
                const clickableDivs = document.querySelectorAll(
                  "#sec2_botBox_id > div, #sec3_botBox_id > div, #sec4_botBox_id > div, #sec5_botBox_id > div, #sec6_botBox_id > div, #sec7_botBox_id > div, #sec8_botBox_id > div"
                );
                
                let currentImageIndex = 0;
                let currentImages = [];
                
                clickableDivs.forEach(function(div) {
                  div.addEventListener("click", function(){
                    const img = div.querySelector("img");
                    if(img) {
                      const divId = div.getAttribute("id");
                      if(imageData[divId] && imageData[divId].length > 0) {
                        currentImages = imageData[divId];
                      } else {
                        currentImages = [img.src];
                      }
                      currentImageIndex = 0;
                      modalImg.src = currentImages[currentImageIndex];
                      const labelDiv = div.querySelector("div");
                      if(labelDiv && modalName) {
                        modalName.textContent = labelDiv.textContent;
                      } else if(modalName) {
                        modalName.textContent = "";
                      }
                      modal.classList.add("active");
                    }
                  });
                });
                
                const prevBtn = document.createElement("button");
                prevBtn.classList.add("modal-nav", "prev-btn");
                prevBtn.innerHTML = "&#10094;";
                modal.appendChild(prevBtn);
                
                const nextBtn = document.createElement("button");
                nextBtn.classList.add("modal-nav", "next-btn");
                nextBtn.innerHTML = "&#10095;";
                modal.appendChild(nextBtn);
                
                prevBtn.addEventListener("click", function(e){
                  e.stopPropagation();
                  if(currentImages.length > 0) {
                    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
                    modalImg.src = currentImages[currentImageIndex];
                  }
                });
                
                nextBtn.addEventListener("click", function(e){
                  e.stopPropagation();
                  if(currentImages.length > 0) {
                    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
                    modalImg.src = currentImages[currentImageIndex];
                  }
                });
                
                modalClose.addEventListener("click", function(){
                  modal.classList.remove("active");
                });
                
                modal.addEventListener("click", function(e){
                  if(e.target === modal) {
                    modal.classList.remove("active");
                  }
                });
              });
              
              document.addEventListener("DOMContentLoaded", function() {
                const sections = document.querySelectorAll("section");
                const observer = new IntersectionObserver((entries, observer) => {
                  entries.forEach(entry => {
                    if (entry.isIntersecting) {
                      entry.target.classList.add("show");
                      observer.unobserve(entry.target);
                    }
                  });
                }, { threshold: 0.5 });
                sections.forEach(section => {
                  section.classList.add("hidden");
                  observer.observe(section);
                });
              });
              
              const topBtn = document.querySelector("#topBtn");
              window.addEventListener('scroll', function(){
                if(window.scrollY > 500){
                  topBtn.style.opacity = 1;
                  topBtn.style.visibility ="visible";
                } else {
                  topBtn.style.opacity = 0;
                  topBtn.style.visibility ="hidden";
                }
              });
              topBtn.addEventListener('click', function(){
                window.scrollTo({
                  top: 0,
                  behavior: "smooth"
                });
              });
        
              document.addEventListener("DOMContentLoaded", function () {
          const textBoxes = document.querySelectorAll(".text-box");
        
          const observer = new IntersectionObserver(
            (entries, observer) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("show"); // .show 클래스 추가
                  observer.unobserve(entry.target); // 한 번 실행 후 관찰 중지
                }
              });
            },
            { threshold: 0.5 }
          );
        
          textBoxes.forEach((box) => {
            observer.observe(box);
          });
        });
        
        document.addEventListener("DOMContentLoaded", function () {
          const mainName = document.querySelector(".mainName");
        
          const observer = new IntersectionObserver(
            (entries, observer) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("show"); // .show 클래스 추가
                  observer.unobserve(entry.target); // 한 번 실행 후 관찰 중지
                }
              });
            },
            { threshold: 0.5 }
          );
        
          observer.observe(mainName);
        });
        
        document.addEventListener("DOMContentLoaded", function () {
          const botBoxes = document.querySelectorAll(".sec2_botBox, .sec3_botBox");
        
          const observer = new IntersectionObserver(
            (entries, observer) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("show"); // .show 클래스 추가
                  observer.unobserve(entry.target); // 한 번 실행 후 관찰 중지
                }
              });
            },
            { threshold: 0.2 }
          );
        
          botBoxes.forEach((box) => {
            observer.observe(box);
          });
        });
      
        // 창우형  JS ///////////////////////////////////
      
      
          //슬라이드쇼
      
          
          //햄버거버튼 
          const hamberger = document.querySelector('.hamburger');
          const modalmodal = document.querySelector('.modalmodal');
          const mocloseBtn =document.querySelector('#mocloseBtn');
      
          hamberger.addEventListener('click', function(){
            modalmodal.classList.toggle('on');
          });
          mocloseBtn.addEventListener('click', function(){
            modalmodal.classList.toggle('on');
          });
      