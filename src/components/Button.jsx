import './Button.css'; // 버튼 스타일링을 위한 CSS 파일을 가져옵니다.

const Button = ({ title, onClick, type }) => {
  // type에 따라 버튼의 클래스를 지정합니다.
  const buttonClass = type === 'POSITIVE' ? 'button-positive' : type === 'NEGATIVE' ? 'button-negative' : 'button-default';

  return (
    <button className={`button ${buttonClass}`} onClick={onClick}>{title}</button>
  );
}

export default Button;
