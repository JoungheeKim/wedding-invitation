import styled from "@emotion/styled";
import AccountBox from "../comp/AccountBox";
import usePhone from "../hooks/phone";
import { AccountTitle, AccountWrapper, Grid, GridTitle, Icon } from "./styled";

const AccountGroomModal = () => {

  return (
    <AccountWrapper className="p(44px/20px/24px) bg(--color-gray-300) w(100%) border-radius(12px)">
      <AccountTitle>신랑 측에게 마음 전하기</AccountTitle>
      
      <AccountBox name="김정희 " bank="카카오뱅크 3333-01-0582511"/>
      <AccountBox name="부 | 김현승" bank="우리은행 1002-452-189042"/>
      <AccountBox name="모 | 최영희" bank="국민은행 061702-04-224566"/>
    </AccountWrapper>
  )
}

export default AccountGroomModal;