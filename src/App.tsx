import { useEffect, useMemo, useRef, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import "@adorable.css"
import Tickets from './sections/Ticket'
import styled from '@emotion/styled'
import Gallery from './sections/Gallary'
import Map from './sections/Map'
import RenderIf from './comp/RenderIf'
import BrideModal from './sections/BrideModal'
import GroomModal from './sections/GroomModal'
import AccountBrideModal from './sections/AccountBrideModal'
import AccountGroomModal from './sections/AccountGroomModal'
import Lottie from 'lottie-web'

import CommentSection from './sections/CommentSection'

const MainImage = styled.img`
  width: 100%;
  min-height: 590px;
`
const NameSpan = styled.span<{primary?: boolean}>`
  font-family: var(--font-SpoqaHanSans);
  font-size: 16px;
  font-weight: 700;
  color: var(${({primary}) => primary ? '--color-primary-1' : '--color-secondary'});
  line-height: 28px;
`

const Text = styled.p<{primary?: boolean, fontFamily?: string}>`
  font-family: ${({fontFamily}) => fontFamily ? fontFamily  : 'var(--font-SpoqaHanSans)'};
  font-size: 16px;
  font-weight: 700;
  color: var(${({primary}) => primary ? '--color-primary-1' : '--color-secondary'});
  line-height: 28px;
`

const MapMenu = styled.button<{active?: boolean}>`
  background: ${({active}) => active ? 'var(--color-gray-300)' : 'var(--color-white)'};
  flex: 1;
  padding: 14px 0 18px;
  font-family: var(--font-SpoqaHanSans);
  font-weight: 700;
`

const Modal = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 4000;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`

function App() {
  const [isTicketFinish, setIsTicketFinish] = useState(false)
  const [menuActive, setMenuActive] = useState<'BON' | 'PIRO'>('BON')
  const [modalOpen, setModalOpen] = useState<'BrideNumber' | 'GroomNumber' | 'BrideAccount' | 'GroomAccount' | null>(null)

  const setScreenSize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  const ModalView = useMemo(() => {
    if (modalOpen === 'BrideNumber') return <BrideModal />
    if (modalOpen === 'GroomNumber') return <GroomModal />
    if (modalOpen === 'BrideAccount') return <AccountBrideModal />
    if (modalOpen === 'GroomAccount') return <AccountGroomModal />
    return null;
  }, [modalOpen])

  useEffect(() => {
    setScreenSize()
    window.addEventListener('resize', () => setScreenSize());
    return () => {
      window.removeEventListener('resize', setScreenSize)
    }
  }, [])

  useEffect(() => {
    const mainImg = new Image()
    mainImg.src = "main.png"
  }, [])

  useEffect(() => {
    if (isTicketFinish) {
      Lottie.loadAnimation({
        container: document.getElementById('lottie-id'),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: 'particle.json'
      })
    }

    return () => {
      document.getElementById('lottie-id').innerHTML = ''
    }
  }, [isTicketFinish])


  return (
    <div className="App">
      <RenderIf isRender={modalOpen !== null}>
        <Modal onClick={() => setModalOpen(null)}>
          <div onClick={(e) => e.stopPropagation()} className="w(90%)">
            {ModalView}
          </div>
        </Modal>
      </RenderIf>
      <RenderIf isRender={!isTicketFinish} >
        <Tickets onAnimationEnd={() => setIsTicketFinish(true)} />
      </RenderIf>
      <RenderIf isRender={isTicketFinish} >
        
        {isTicketFinish && (
          <div className='max-width(375px) vbox(fill) margin(0/auto) relative'>
            <div className='max-width(375px) min-height(500px) overflow(hidden) absolute z-index(9999) left(0px)'>
              <div className='transform(scale(2)) w(100%) h(100%) relative top(210px)' id="lottie-id"></div>
            </div>
          </div>
        )}
        <div className={`max-width(375px) vbox(fill) margin(0/auto) pb(100px) ${isTicketFinish && 'animation(2.5s/ease/forwards/pangAnimation)'}`}>
          <p className='mb(20px) font-family(--font-IBM) font(12)'>NO.20231203</p>
          {/* 풀이미지 */}
          <div className='width(100%) relative'>
            {/* 백그라운드 이미지 추가 */}
            <MainImage src="/main.png" />
            <div className='absolute  top(60px) left(50%) transform(translate(-50%,0)) vbox(center) gap(12px)'>
              <p className='font-family(--font-NanumMyeongjo) font(16) font-weight(700)'>김정희</p>
              <div className='width(12px) height(1px) bg(--color-black)'></div>
              <p className='font-family(--font-NanumMyeongjo) font(16) font-weight(700)'>도유진</p>
            </div>
          </div>
          {/* 장소 누군지 보여주는곳 */}
          <div className='mt(80px) mb(80px)'>
            <a href="#map">
              <p className='font-family(--font-NanumMyeongjo) font-size(16px) text-center line-height(28px) mb(40px) '>
                2023년 12월 3일 일요일 오후 3시 30분<br /><span className='text-decoration(underline)'>aT포레 웨딩홀</span>
              </p>
            </a>
            <div className='vbox(center)'>
              <div className='vbox(right) gap(12px)'>
                <p className='font-family(--font-SpoqaHanSans) color(--color-black-300) font(14px)'>
                  <NameSpan>김현승 | 최영희</NameSpan>의 장남 <NameSpan>정희</NameSpan>
                </p>
                <p className='font-family(--font-SpoqaHanSans) color(--color-black-300) font(14px)'>
                  <NameSpan primary>도종도 | 김정현</NameSpan>의 둘째 <NameSpan primary>유진</NameSpan>
                </p>
              </div>
            </div>
            {/* 박스 그림 그리기 */}
            <div className='' />
          </div>
          {/* 인사의 말 */}
          <div className='font-family(--font-SpoqaHanSans) font(16px)'>
            <Text primary className='text-align(center) mb(10px)'>인사의 말</Text>
            <p className='text-align(center) font-family(--font-SpoqaHanSans) font(14px) font-weight(400)'>
              사랑이 물들어가는 계절,<br />
              연인에서 부부라는 이름으로<br />
              평생을 함께 하고자 합니다.<br /><br />
              귀한 걸음 하시어<br />
              두 사람의 언약을 지켜봐 주시면<br />
              더 없는 기쁨으로 간직하겠습니다.<br /><br />
            </p>
          </div>

          {/* 연락하기 */}
          <div className='padding(120px/0) vbox gap(18px)'>
            <button className='hbox(center) gap(23px)' onClick={() => setModalOpen('GroomNumber')}>
              <p><NameSpan>신랑 측</NameSpan>에게 연락하기</p>
              <img src="man.png" />
            </button>
            <button className='hbox(center) gap(23px)' onClick={() => setModalOpen('BrideNumber')}>
              <p><NameSpan primary>신부 측</NameSpan>에게 연락하기</p>
              <img src="woman.png" />
            </button>
          </div>

          {/* 달력 */}
          <div>
            <img src="calendar.png" />
          </div>

          {/* 슬라이드 갤러리; */}
          <div className='vbox(center) mt(120px)'>
            <Text primary fontFamily='var(--font-NanumMyeongjo)' className="mb(20px)">서로, 함께, 평생.</Text>
            <Text primary className='mb(15px)'>Gallary</Text>
            <div className='border-bottom(1px/solid/var(--color-primary)) w(12px) mb(20px)' />

            <Gallery />
            
          </div>

          {/* 맵 */}
          <Text primary className='text-align(center) mb(20px) mt(77px)' fontFamily='var(--font-NanumMyeongjo)'>오셔서 자리를 빛내주세요.</Text>
          <Text primary className='mb(15px) text-center' id='map'>MAP</Text>
          <div className='border-bottom(1px/solid/var(--color-primary)) w(12px) margin(0/auto/20px)' />

          <div>
            <div className='display(flex) '>
              <MapMenu active={menuActive === 'BON'} onClick={() => setMenuActive('BON')}>본식</MapMenu>
              {/* <MapMenu active={menuActive === 'PIRO'} onClick={() => setMenuActive('PIRO')}>피로연</MapMenu> */}
            </div>
            <Map menu={menuActive}/>
          </div>


          {/* 계좌번호 */}
          <div className='mt(120px)'>
            <Text primary className='text-align(center) mb(20px)' fontFamily='var(--font-NanumMyeongjo)'>신랑 신부에게 축하의 마음을 전해보세요.</Text>
            <div className='border-bottom(1px/solid/var(--color-primary)) w(12px) margin(0/auto/20px)' />
            
            <div className='vbox gap(18px)'>
              <button className='hbox(center) gap(37px)' onClick={() => setModalOpen('GroomAccount')}>
                <p><NameSpan>신랑 측</NameSpan> 계좌번호</p>
                <img src="man.png" />
              </button>
              <button className='hbox(center) gap(37px)' onClick={() => setModalOpen('BrideAccount')}>
                <p><NameSpan primary>신부 측</NameSpan> 계좌번호</p>
                <img src="woman.png" />
              </button>
            </div>

          </div>
          <div className='mt(120px)' />
          {/* <button className='border(1px/solid/var(--color-primary-1)) p(10px)' onClick={() => alert('joey.team 댓글 페이지로 이동')}>
            <Text primary className='text-align(center)' fontFamily='var(--font-NanumMyeongjo)'>축하댓글 남기러가기</Text>
          </button> */}
          
          
          {/* <CommentSection /> */}
          {/* 방명록 */}
          {/* <DiscussionEmbed
            shortname='solsu-invitation-1'
            config={
              {
                url: 'https://solsu-invitation-1.disqus.com/embed.js',
                title: 'solsu-invitation',
                language: 'ko_KR'
              }
            }
          /> */}
        
        </div>
      </RenderIf>
    </div>
  )
}


export default App

