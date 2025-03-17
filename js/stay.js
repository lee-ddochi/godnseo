            // JSON 형태의 이미지 데이터 – 각 클릭 대상 div의 id를 키로 사용
            const imageData = {
              "sec2-1": ["./image/stay/hyatt/park_4.jpg", "./image/stay/hyatt/park_2.PNG", "./image/stay/hyatt/park_1.PNG"],
              "sec2-2": ["./image/stay/hyatt/park_3.jpg", "./image/stay/hyatt/park_5.jpg", "./image/stay/hyatt/park_7.jpg", "./image/stay/hyatt/park_8.jpg"],
              "sec2-3": ["./image/stay/hyatt/park_6.png", "./image/stay/hyatt/park_13.jpg", "./image/stay/hyatt/park_14.jpg"],
              "sec2-4": ["./image/stay/hyatt/park_10.jpg", "./image/stay/hyatt/park_9.jpg", "./image/stay/hyatt/park_17.jpg", "./image/stay/hyatt/park_18.jpg"],
              
              "sec3-1": ["./image/stay/west/west_21.jpg", "./image/stay/west/west_1.jpg", "./image/stay/west/west_4.jpg"],
              "sec3-2": ["./image/stay/west/west_23.jpg", "./image/stay/west/west_9.png", "./image/stay/west/west_13.png"],
              "sec3-3": ["./image/stay/west/west_2.png", "./image/stay/west/west_15.png", "./image/stay/west/west_17.png"],
              "sec3-4": ["./image/stay/west/west_18.png", "./image/stay/west/west_19.png", "./image/stay/west/west_20.png"],
              
              "sec4-1": ["./image/stay/para/para_36.jpg", "./image/stay/para/para_1.jpg", "./image/stay/para/para_37.jpg"],
              "sec4-2": ["./image/stay/para/para_12.jpg", "./image/stay/para/para_13.jpg", "./image/stay/para/para_16.jpg"],
              "sec4-3": ["./image/stay/para/para_10.jpg", "./image/stay/para/para_8.jpg", "./image/stay/para/para_9.jpg"],
              "sec4-4": ["./image/stay/para/para_25.jpg", "./image/stay/para/para_28.jpg", "./image/stay/para/para_33.jpg"],
              
              "sec5-1": ["./image/stay/sig/sig_18.jpg", "./image/stay/sig/sig_16.jpg", "./image/stay/sig/sig_17.jpg"],
              "sec5-2": ["./image/stay/sig/sig_10.jpg", "./image/stay/sig/sig_11.jpg", "./image/stay/sig/sig_9.jpg"],
              "sec5-3": ["./image/stay/sig/sig_2.png", "./image/stay/sig/sig_3.png", "./image/stay/sig/sig_8.jpg"],
              "sec5-4": ["./image/stay/sig/sig_5.png", "./image/stay/sig/sig_13.jpg", "./image/stay/sig/sig_14.jpg"],
              
              "sec6-1": ["./image/stay/grand/grand_2.jpg", "./image/stay/grand/grand_18.jpg", "./image/stay/grand/grand_19.jpg"],
              "sec6-2": ["./image/stay/grand/grand_16.jpg", "./image/stay/grand/grand_10.jpg", "./image/stay/grand/grand_13.jpg"],
              "sec6-3": ["./image/stay/grand/grand_4.jpg", "./image/stay/grand/grand_3.jpg", "./image/stay/grand/grand_20.jpg"],
              "sec6-4": ["./image/stay/grand/grand_21.jpg", "./image/stay/grand/grand_22.jpg", "./image/stay/grand/grand_23.jpg"]
            };
            
            document.addEventListener("DOMContentLoaded", function(){
              const modal = document.getElementById("modal");
              const modalImg = document.getElementById("modal-img");
              const modalClose = document.getElementById("modal-close");
              const modalName = document.querySelector(".modal-Name");
              
              const clickableDivs = document.querySelectorAll(
                "#sec2_botBox_id > div, #sec3_botBox_id > div, #sec4_botBox_id > div, #sec5_botBox_id > div, #sec6_botBox_id > div"
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
    