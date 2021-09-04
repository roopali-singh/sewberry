import React from "react";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Product from "./Product";
import "./Slider.css";

function Slider({ sliderCategory }) {
  return (
    <div className="slider">
      <div className="slider__heading">
        {/* <p>{sliderCategory?.category}</p> */}
        <p>NEW ARRIVALS</p>
      </div>
      <div className="slide">
        <Splide
          options={{
            type: "loop",
            perPage: 4,
            perMove: 4,
            focus: "center",
            lazyLoad: true,
            autoplay: true,
            interval: 2000,
            pauseOnHover: true,
            resetProgress: false,
            pauseOnFocus: false,
            autoWidth: true,
            autoHeight: true,
            // gap: "1rem ",
            // cover: true,
            // height: "22.875rem",
          }}
        >
          {sliderCategory?.map((product) => (
            <SplideSlide key={product?._id} className="SplideSlide">
              <Product key={product?._id} product={product} forSlider />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
}

export default Slider;
