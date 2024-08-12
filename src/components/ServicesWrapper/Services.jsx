import React from "react"
import { serviceData } from "../../utils/products"
import styled from "styled-components"

const ServiceWrapper= styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  margin: 15px 0px 0px 0px;
  border-radius: 6px;
  .feature-item{
    text-align: center;
    padding: 15px;
    h3{font-size:1.5rem}
    .icon{font-size:2rem}
  }
`;

const Services = () => {
  return (
      <ServiceWrapper>
        {serviceData.map((item, index) => {
            return (
              <div style={{backgroundColor:item.bg}} className='feature-item' key={index}>
                <div className='icon'>
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
              </div>
            )
          })}
      </ServiceWrapper>
  )
}

export default Services
