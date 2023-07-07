/* eslint-disable react/no-unescaped-entities */
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import backgroundVideo from "../../video.mp4";
import "../../styles.css";
import { useEffect, useState } from "react";
import { fetchTableContent } from "../../service/api";
import TableContentItem from "./TableContentItem";

const TableContent = () => {
  const [tableContentArray, setTableContentArray] = useState([]);

  useEffect(() => {
    getTableContent();

    async function getTableContent() {
      const response = await fetchTableContent();
      setTableContentArray(response?.data || []);
    }
  }, []);

  return (
    <div className="about">
      <div className="content-container">
        <div className="text-container">
          <div>
            <Carousel showThumbs={false} infiniteLoop={true} autoPlay={false}>
              {tableContentArray.map((iterator, index) => {
                return <TableContentItem key={index} tableContent={iterator} />;
              })}
            </Carousel>
          </div>
        </div>
        <div className="video-container">
          <video autoPlay loop muted id="video">
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          <div className="transbox"></div>
        </div>
      </div>
    </div>
  );
};

export default TableContent;
