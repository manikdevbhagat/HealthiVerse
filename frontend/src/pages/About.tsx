import React from "react";

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="lg:w-[650px] mx-auto">
          <h2 className="heading text-center">About Us</h2>
          <p className="text__para text-center">
            At HealthiVerse, we are on a mission to revolutionize the way you
            approach health and fitness. We believe that everyone deserves
            access to a healthier and happier life, and we've created a platform
            that makes this journey more accessible, enjoyable, and effective
            than ever before.
          </p>
        </div>

        <div className="lg:w-[650px] mx-auto mt-12">
          <h2 className="heading text-center">Our Vision</h2>
          <p className="text__para text-center">
            Our vision is simple: to empower individuals to take control of
            their well-being and lead more fulfilling lives. We envision a world
            where achieving your health and fitness goals is not just a dream
            but a reality for everyone, regardless of their starting point. We
            want to make it easy for you to make the right choices and connect
            with the resources you need to succeed.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;