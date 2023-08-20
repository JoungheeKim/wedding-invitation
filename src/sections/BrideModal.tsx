import styled from "@emotion/styled";
import usePhone from "../hooks/phone";
import { Grid, GridTitle, Icon } from "./styled";


const BrideModal = () => {

  const {phone: phone1, msg: msg1} = usePhone('010-6384-8971')
  const {phone: phone2, msg: msg2} = usePhone('010-6384-8971')
  const {phone: phone3, msg: msg3} = usePhone('010-6384-8971')

  return (
    <Grid className="p(44px/20px/24px) bg(--color-gray-300) w(100%) border-radius(12px)">
      <GridTitle primary maxRow={4}>신부 측</GridTitle>
      <p className="font-family(--font-SpoqaHanSans) color(--color-black-300)">도유진</p>
      <div className="hbox(right) gap(10px)">
        <a href={msg1}>
          <Icon src="/message.png"/>
        </a>
        <a href={phone1}>
          <Icon src="/phone.png"/>
        </a>
      </div>

      <p className="font-family(--font-SpoqaHanSans) color(--color-black-300)">부 | 도종도</p>
      <div className="hbox(right) gap(10px)">
      <a href={msg2}>
          <Icon src="/message.png"/>
        </a>
        <a href={phone2}>
          <Icon src="/phone.png"/>
        </a>
      </div>

      <p className="font-family(--font-SpoqaHanSans) color(--color-black-300)">모 | 김정현</p>
      <div className="hbox(right) gap(10px)">
        <a href={msg3}>
          <Icon src="/message.png"/>
        </a>
        <a href={phone3}>
          <Icon src="/phone.png"/>
        </a>
      </div>
    </Grid>
  )
}

export default BrideModal;