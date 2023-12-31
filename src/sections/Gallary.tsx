import styled from "@emotion/styled";
import { MouseEvent, useMemo, useState } from "react";
import RenderIf from "../comp/RenderIf";
import Slider from 'react-touch-drag-slider'
import XIcon from "../comp/XIcon";

const IMAGES = [
  "/slider/photo-01.jpg",
  "/slider/photo-02.jpg",
  "/slider/photo-03.jpg",
  "/slider/photo-04.jpg",
  "/slider/photo-05.jpg",
  "/slider/photo-06.jpg",
  "/slider/photo-07.jpg",
  "/slider/photo-08.jpg",
  "/slider/photo-09.jpg",
  "/slider/photo-10.jpg",
  "/slider/photo-11.jpg",
  "/slider/photo-12.jpg",
  "/slider/photo-13.jpg",
  "/slider/photo-14.jpg",
  "/slider/photo-15.jpg",
  "/slider/photo-16.jpg",
  "/slider/photo-17.jpg",
]

const ImageView = styled.img<{active?: boolean}>`
  flex: 1;
  aspect-ratio: 1 / 1;
  border: 3px solid ${({active}) => active ? 'var(--color-primary-1)' : 'var(--color-gray)'};
  object-fit: cover;
  overflow: hidden;

`

const EmptyImage = styled.div`
  flex: 1;
`

const DISPLAY_MAX = 4

const Gallery = () => {

  const [openImageModal, setOpenImageModal] = useState(false);
  const [displayImageIndex, setDisplayImageIndex] = useState(0)
  // const [displayBottomIndex, setDisplayBottomIndex] = useState(0);

  const images = useMemo(() => {
    return IMAGES.map(url => {
      const image = new Image();
      image.src = url;
      return {
        img: image,
        url,
      }
    })
  }, [])



  // const onClickNext = () => {
  //   if (displayBottomIndex * DISPLAY_MAX + DISPLAY_MAX < images.length) {
  //     setDisplayBottomIndex(displayBottomIndex + 1)
  //   }
  // }
  // const onClickPrev = () => {
  //   if (displayBottomIndex > 0) {
  //     setDisplayBottomIndex(displayBottomIndex - 1)
  //   }
  // }

  const onClickNextImage = (e: MouseEvent) => {
    e.stopPropagation();
    if (displayImageIndex + 1 < images.length) {
      setDisplayImageIndex(displayImageIndex + 1)
    } else {
      setDisplayImageIndex(0)
    }
  }
  const onClickPrevImage = (e: MouseEvent) => {
    e.stopPropagation();
    if (displayImageIndex > 0) {
      setDisplayImageIndex(displayImageIndex - 1)
    } else { 
      setDisplayImageIndex(images.length - 1)
    }
  }

  const displayBottomIndex = Math.trunc(displayImageIndex / 4)
  const displayImages = images.slice(displayBottomIndex * DISPLAY_MAX, displayBottomIndex * DISPLAY_MAX + DISPLAY_MAX)
  const emptyImages = useMemo(() => {
    const emptyCount = DISPLAY_MAX - displayImages.length
    const result = []

    for (let i = 0 ; i < emptyCount; i ++) {
      result.push(i)
    }
    return result;
  }, [displayImages])
  return (    
    <div className='w(100%)'>
      {/* 이미지 모달창 */}
      <RenderIf isRender={openImageModal}>
        <div className="position(fixed) w(100vw) h(100vh) bg(--color-white) z-index(9999) left(0) top(0) animation(0.3s/ease/forwards/mainOpacity)" >
          <div onClick={() => setOpenImageModal(false)} className="w(30px) h(30px) top(10px) left(10px) absolute z-index(4000)">
            <XIcon fill="red" />  
          </div>
          {/* @ts-ignore */}
          <Slider
            onSlideComplete={(i: number) => {
              setDisplayImageIndex(i)
              console.log('finished dragging, current slide is', i)
            }}
            onSlideStart={(i: number) => {
              console.log('started dragging on slide', i)
            }}
            activeIndex={displayImageIndex}
            threshHold={100}
            transition={0.5}
            scaleOnDrag={false}
          >
            {images.map(({img}) => <img src={img.src} className="object-fit(contain) h(100%)" />)}
          </Slider>
        </div>
      </RenderIf>
      <div className='w(100%) h(270px) bg(--color-gray-300) mb(24px) hbox(center)' onClick={() => setOpenImageModal(true)}>
        {/* @ts-ignore */}
        <Slider
          onSlideComplete={(i: number) => {
            setDisplayImageIndex(i)
            console.log('finished dragging, current slide is', i)
          }}
          onSlideStart={(i: number) => {
            console.log('started dragging on slide', i)
          }}
          activeIndex={displayImageIndex}
          threshHold={100}
          transition={0.5}
          scaleOnDrag={false}
        >
          {images.map(({img}) => <img src={img.src} className="object-fit(contain) h(100%)" />)}
        </Slider>
      </div>
      <div className='w(100%) h(76px) bg(--color-gray-300) p(8px/21px) flex-direction(row) display(flex) gap(8px)'>
        <img src="arrowLeft.png" onClick={onClickPrevImage}/>
        <div className="flex(1) display(flex) space-between hbox overflow(hidden) gap(8px)">
          {displayImages.map((item, index) => <ImageView active={displayImageIndex ===  displayBottomIndex * DISPLAY_MAX + index } src={item.img.src} key={item.url} onClick={() => setDisplayImageIndex(displayBottomIndex * DISPLAY_MAX + index)} />)}
          {emptyImages.map((item) => <EmptyImage key={item} />)}
        </div>
        <img src="arrowRight.png" onClick={onClickNextImage}/>
      </div>
    </div>
  )
}

export default Gallery;