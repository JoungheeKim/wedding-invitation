import styled from "@emotion/styled";
import AccountBox from "../comp/AccountBox";
import usePhone from "../hooks/phone";
import { AccountTitle, AccountWrapper, Grid, GridTitle, Icon } from "./styled";

const AccountBrideModal = () => {

  return (
    <AccountWrapper className="p(44px/20px/24px) bg(--color-gray-300) w(100%) border-radius(12px)">
      <AccountTitle primary>신부 측에게 마음 전하기</AccountTitle>
      
      <AccountBox name="도유진" bank="우리은행 1002-156-552490" primary/>
      <AccountBox name="부 | 도종도" bank="케이뱅크 1002-156-552490" primary/>
    </AccountWrapper>
  )
}

export default AccountBrideModal;