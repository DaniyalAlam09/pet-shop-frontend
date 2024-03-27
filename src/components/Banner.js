import React from "react";
import { banner, carousel } from "../data/Data";
import Slider from "react-slick";

export default function Banner() {
  const settings = [
    {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
    },
  ];
  return (
    <>
      <div className="container-fluid mb-3">
        <div className="row px-xl-5">
          <div className="col-lg-8">
            <div className="carousel-item mb-30 mb-lg-0">
              <Slider {...settings}>
                {carousel.map((val, index) => (
                  <div className="carousel-inner">
                    <div
                      className="carousel-item position-relative"
                      style={{ height: "430px" }}
                    >
                      <img
                        className="position-absolute w-100 h-100"
                        src={val.cover_img}
                        style={{ objectFit: "cover" }}
                        alt="Carousel Image"
                      />
                      <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                        <div className="p-3" style={{ maxWidth: "700px" }}>
                          <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                            {val.title}
                          </h1>
                          <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                            {val.description}
                          </p>
                          <a
                            className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                            href="#"
                          >
                            {val.btn}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="col-lg-4">
            {banner.map((item, index) => (
              <div className="product-offer mb-30" style={{ height: "200px" }}>
                <img className="img-fluid" src={item.img} alt="iomg" />
                <div className="offer-text">
                  <h6 className="text-white text-uppercase">{item.discount}</h6>
                  <h3 className="text-white mb-3">{item.title}</h3>
                  <a href="" className="btn btn-primary">
                    {item.btn}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
