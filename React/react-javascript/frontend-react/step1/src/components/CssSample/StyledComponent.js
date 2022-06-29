import styled, {css} from "styled-pages";

const size = {
    desktop: 1024,
    tablet: 768
}

const media = Object.keys(size).reduce((acc,label) => {
    acc[label] = (...args) => css`
      @media(max-width: ${size[label] / 16}em){
        ${css(...args)};
      }
    `;
    return acc;
},{});

const Box = styled.div`
  background: ${props => props.color || 'blue'};
  padding: 1rem;
  display: flex;
  
  width: 1024px;
  margin: 0 auto;
  
  // 미디어 쿼리를 이와 같이도 사용 가능하다.
  ${media.desktop`width: 768px;`}
  ${media.tablet`width: 100%;`}
  /* @media(max-width: 1024px){
     width: 768px;
   }
   @media(max-width: 768px){
     width: 100%;
   }*/
`;

const Button = styled.button`
  background: white;
  color: black;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;
  
  &:hover {
    background: rgba(255,255,255,0.9);
  }
  
  ${props => props.inverted && css`
      background: none;
      border: 2px solid white;
      color: white;
      
      &:hover {
        background: white;
        color: black;
      }
    `};
  & + button{
    margin-left: 1rem;
  }
`;

const StyledComponent = () => (
    <Box color='black'>
        <Button>안녕하세요</Button>
        <Button inverted={true}>테두리만</Button>
    </Box>
);

export default StyledComponent;
