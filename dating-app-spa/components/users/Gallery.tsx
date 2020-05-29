import React from "react";
import Slider, { CustomArrowProps, Settings } from "react-slick";
import { IPhoto } from "../../_models";
import styled from "styled-components";

/*
  id: number;
  url: string;
  description: string;
  dateAdded: Date;
  isMain: boolean;
*/

interface Props {
  photos: IPhoto[] | undefined;
}

export const Gallery: React.FunctionComponent<Props> = ({ photos }: Props) => {
  let slider1: any, slider2: any;
  const [state, setState] = React.useState({
    nav1: undefined,
    nav2: undefined,
  });

  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  React.useEffect(() => {
    setState({
      nav1: slider1,
      nav2: slider2,
    });
  }, []);

  const displayPhotos = (type: string = "main") => {
    if (!photos) return null;

    return photos.map((photo, i) => {
      const styles: React.CSSProperties = {
        width: type === "main" ? 500 : 166.67,
        height: type === "main" ? 500 : 160,
        filter:
          type === "main"
            ? `opacity(1)`
            : currentSlideIndex === i
            ? `opacity(1)`
            : `opacity(0.5)`,
        transition: `filter 300ms ease`,
      };

      if (type === "thumbnails" && photos.length === 2) {
        styles.marginLeft = "auto";
        styles.marginRight = "auto";
      }

      return (
        <div key={photo.id}>
          <img src={photo.url} style={styles} />
        </div>
      );
    });
  };

  const settings: Settings = {
    // dots: true,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 1,
    // slidesToScroll: 1,
  };

  if (!photos) return null;

  return (
    <GalleryWrapper>
      <Slider
        asNavFor={state.nav2}
        ref={(slider) => (slider1 = slider)}
        {...settings}
        className="main-slider"
      >
        {displayPhotos("main")}
      </Slider>
      {photos.length > 1 ? (
        <Slider
          asNavFor={state.nav1}
          ref={(slider) => (slider2 = slider)}
          slidesToShow={photos.length < 3 ? photos.length : 3}
          swipeToSlide={true}
          focusOnSelect={true}
          beforeChange={(oldIndex, newIndex) => {
            setCurrentSlideIndex(newIndex);
          }}
          className="thumbnails-slider"
          {...settings}
        >
          {displayPhotos("thumbnails")}
        </Slider>
      ) : null}
    </GalleryWrapper>
  );
};

export default Gallery;

const GalleryWrapper = styled.div`
  max-width: 50rem;

  .main-slider {
    margin-bottom: 1rem;
  }
  .slick-next:before,
  .slick-prev:before {
    color: var(--dark);
  }
`;
