import React from "react"
import { serviceData } from "../../db/data"
import styles from './service.module.scss'

const Services = () => {

  return (
      <div className={styles.serviceWrapper}>
        {serviceData.map((item, index) => {
            return (
              <div style={{backgroundColor:item.bg}} className={styles.featureItem} key={index}>
                <div className={styles.icon}>
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
              </div>
            )
          })}
      </div>
  )
}

export default Services
