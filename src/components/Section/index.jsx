import { Container } from "react-bootstrap";
import {ProductSlider} from "../ProductSlider";
import styles from './section.module.scss'


export const Section = ({ title, bgColor, productItems }) => {
  return (
    <section style={{ background: bgColor }} className={styles.sectionWrapper}>
        <Container fluid>
        <h1 className={styles.sectionTitle}>{title}</h1>
        <ProductSlider SliderData={productItems} title={title}/>
        </Container>
    </section>
  );
};

