<template>
  <div>

    <div class="board_section1">
      <div>
        <h3>고객센터</h3>

        <a id="faq1" href="#">FAQ (1:1 상담)</a>

        <div id="cus_menu">
          <ul>
            <li>
              반품/교환/환불
              <div class="sub_nav">
                <ul>
                  <li>주문취소/변경</li>
                  <li>반품/교환/환불</li>
                  <li>주의사항</li>
                </ul>
              </div>
            </li>
            <li>
              주문/결제
              <div class="sub_nav">
                <ul>
                  <li>주문</li>
                  <li>결제</li>
                  <li>마일리지/예치금</li>
                  <li>할인쿠폰</li>
                  <li>통합포인트</li>
                  <li>기프트카드</li>
                  <li>상품권</li>
                </ul>
              </div>
            </li>
            <li>
              eBook
              <div class="sub_nav">
                <ul>
                  <li>eBook</li>
                  <li>대여</li>
                  <li>주문(결제)환불</li>
                  <li>교보e캐시</li>
                  <li>학술논문</li>
                  <li>eBook뷰어(e서재)</li>
                </ul>
              </div>
            </li>
            <li>
              sam
              <div class="sub_nav">
                <ul>
                  <li>서비스안내</li>
                  <li>샘서재/e서재</li>
                  <li>주문/결제</li>
                  <li>sam단말기/모바일</li>
                  <li>시스템오류/장애</li>
                  <li>기타</li>
                  <li>요금납부</li>
                </ul>
              </div>
            </li>
            <li>
              회원
              <div class="sub_nav">
                <ul>
                  <li>회원가입/탈퇴</li>
                  <li>회원제도변경</li>
                  <li>회원혜택</li>
                  <li>회원정보 확인/변경</li>
                  <li>가입관련 장애</li>
                  <li>개인정보유효기간제</li>
                </ul>
              </div>
            </li>
            <li>
              도서/상품정보/교과서
              <div class="sub_nav">
                <ul>
                  <li>정보/검색/알림기능</li>
                  <li>서양도서</li>
                  <li>일본도서</li>
                  <li>일본잡지정기구독</li>
                  <li>교과서</li>
                  <li>기프트</li>
                </ul>
              </div>
            </li>
            <li>
              중고장터
              <div class="sub_nav">
                <ul>
                  <li>구매하기</li>
                  <li>판매하기</li>
                </ul>
              </div>
            </li>
            <li>
              모바일교보문고
            </li>
            <li>
              배송/수령일안내
              <div class="sub_nav">
                <ul>
                  <li>배송료</li>
                  <li>배송안내</li>
                  <li>해외배송안내</li>
                  <li>바로드림서비스</li>
                  <li>바로배송서비스</li>
                </ul>
              </div>
            </li>
            <li>
              세금계산서/증빙
              <div class="sub_nav">
                <ul>
                  <li>현금영수증</li>
                  <li>세금계산서</li>
                  <li>거래명세서</li>
                  <li>신용카드전표</li>
                  <li>도서소득공제</li>
                </ul>
              </div>
            </li>
            <li>
              퍼플 PubPle
              <div class="sub_nav">
                <ul>
                  <li>서비스안내</li>
                  <li>가입/탈퇴</li>
                  <li>ePUB 에디터안내</li>
                  <li>PDF제작안내</li>
                  <li>판매신청/관리</li>
                  <li>판매내역/정산</li>
                  <li>POD제작안내</li>
                  <li>기타</li>
                </ul>
              </div>
            </li>
            <li>
              도서주문판매 POD
              <div class="sub_nav">
                <ul>
                  <li>서비스 정의</li>
                  <li>POD 출판사 제휴 안내</li>
                  <li>POD 개인 출판 안내</li>
                  <li>판매내역/정산</li>
                  <li>구매/배송</li>
                  <li>취소/환불/기타</li>
                </ul>
              </div>
            </li>
            <li>
              북모닝
              <div class="sub_nav">
                <ul>
                  <li>서비스안내</li>
                  <li>이달의 북모닝도서</li>
                  <li>독한 강연</li>
                  <li>뉴스레터</li>
                  <li>결제/환불</li>
                  <li>콘텐츠</li>
                  <li>오늘아침지식</li>
                </ul>
              </div>
            </li>
            <li>
              서비스/기타
              <div class="sub_nav">
                <ul>
                  <li>시스템 오류/장애</li>
                  <li>문서 검색 서비스</li>
                  <li>로그인 도용방지</li>
                  <li>안심번호서비스</li>
                  <li>리뷰리워드 서비스</li>
                  <li>카카오톡 알림톡</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


@Component
export default class CategoryList extends Vue{

}
</script>

<style scoped>

#faq1{
  text-decoration: none;
  color: #4f5050;
}

h3{
  border-bottom: 2px solid black;
  font-size: 25px;
  padding-bottom: 8px;
}

#cus_menu{
  background-color: #f6f5f5;
  font-size: 13px;
}

.board_section1{
  width: 170px;
  height: 360px;
  margin-left: 20px;
  margin-bottom: 20px;
}

.board_section1 > div > div#cus_menu > ul{
  padding-left: 0;
}

.board_section1 > div > div#cus_menu > ul > li {
  list-style:none ;
  margin-top: 5px;
}

.board_section1 > div > div#cus_menu > ul > li:hover{
  background-color: #312f2f;
  color: #ffffff;
  cursor: pointer;
}
.board_section1 > div > div#cus_menu > ul > li:hover > .sub_nav ul{
  list-style: none;
  padding-left: 5px;
}
.board_section1 > div > div#cus_menu > ul > li:hover > .sub_nav ul li{
  margin-bottom: 3px;
}
.board_section1 > div > div#cus_menu > ul > li:hover > .sub_nav{
  background-color: #ffffff;
  border: 2px solid #3b5999;
  width: 170px;
  padding: 10px;
  height: auto;
  display: block;
  color: black;
  position: absolute;
  left: 630px;
}

.sub_nav{
  display: none;
}

@media screen and (max-width: 1700px){
  .board_section1 > div > div#cus_menu > ul > li:hover > .sub_nav{
    position: absolute;
    left: 500px;
  }
}

@media screen and (max-width: 1630px){
  .board_section1 > div > div#cus_menu > ul > li:hover > .sub_nav{
    position: absolute;
    left: 400px;
  }
}
</style>