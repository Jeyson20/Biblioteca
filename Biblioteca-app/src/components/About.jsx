import React from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";

const About = () => {
  return (
    <div>
      <Header />
      <div className="container py-5 my-5">
        <div className="row">
          <div className="col-md-6">
            <h1 className="text-primary fw-bold mb-4">About Us</h1>
            <p className="lead mb-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi,
              dolorum voluptate explicabo beatae, similique vel voluptates quae
              atque molestiae aliquam animi praesentium veritatis qui dolore
              quidem vero corporis possimus tempora rerum modi architecto!
              Facilis libero blanditiis sint inventore nam voluptas aliquid quae
              ipsa eos, perspiciatis ad aut sit enim obcaecati possimus earum
              eveniet ut magni odio praesentium. Tenetur deleniti ipsum
              aspernatur numquam veritatis corrupti eaque amet. Repellendus
              reiciendis quidem minima illum? Rerum mollitia perspiciatis
              consectetur eaque reprehenderit velit nulla? Vero ipsam placeat
              distinctio quam quo voluptatibus maxime suscipit nihil illo nulla.
              Quas, laboriosam ea? Voluptatem dolore harum maxime at magnam.
            </p>
            <NavLink to="/contact" className="btn btn-outline-primary px-3">
              Contact Us
            </NavLink>
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <img
              src="/assets/images/about/about.jpg"
              alt="About Us"
              height="720"
              width="400px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
