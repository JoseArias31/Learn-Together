import React from "react";
import './styles/ProgramCarousel.css'
const ProgramCarousel = () => {

return (

<div class="w-full relative">
<div class="swiper vertical-slide-carousel swiper-container relative h-96">
<div class="swiper-wrapper">
 <div class="swiper-slide">
   <div class="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center">
     <span class="text-3xl font-semibold text-indigo-600">Slide 1 </span>
   </div>
 </div>
 <div class="swiper-slide">
   <div class="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center">
     <span class="text-3xl font-semibold text-indigo-600">Slide 2 </span>
   </div>
 </div>
 <div class="swiper-slide">
   <div class="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center">
     <span class="text-3xl font-semibold text-indigo-600">Slide 3 </span>
   </div>
 </div>
</div>
<div class="swiper-pagination !right-10 !left-full !top-1/3 !translate-y-8"></div>
</div>
</div>

)

};

export default ProgramCarousel;