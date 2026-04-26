import React from 'react';
import AboutData from './aboutdata';
import './about.css';
import Footer from '../footer/footer';

const About = () => {
  return (
  <>
    <div className="about-container">

      <div className="about-main-content">
        {AboutData.map((item) => (
          <div key={item.id} className="about-section-card">
            <h2>{item.title}</h2>
            
            {/* Agar description hai toh wo dikhao */}
            {item.description && <p className="main-desc">{item.description}</p>}

            {/* Agar points hain (list) toh loop chalao */}
            {item.points && (
              <div className="points-grid">
                {item.points.map((p, index) => (
                  <div key={index} className="point-item">
                    <h4>{p.subTitle}</h4>
                    <p>{p.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Side Ad fixed layout ke liye Sidebar bhi use kar sakte ho jo pehle bataya tha */}
    </div>
    <Footer/>
  </>
  );
};

export default About;