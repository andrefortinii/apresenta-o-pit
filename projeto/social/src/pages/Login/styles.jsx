import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  height: 100vh;
  background-color: #b0c8d1; /* Fundo um pouco mais escuro e suave */
  font-family: 'Nunito', sans-serif; /* Fonte amigável e arredondada */
`;

export const Content = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); /* Sombra mais suave para dar profundidade */
  background-color: #ffffff;
  max-width: 380px;
  padding: 25px;
  border-radius: 15px; /* Bordas arredondadas para suavizar */
  text-align: center;
`;

export const Label = styled.label`
  font-size: 22px;
  font-weight: 700;
  color: black;
  margin-bottom: 15px; /* Espaço abaixo do título */
`;

export const LabelSignup = styled.label`
  font-size: 16px;
  color: #8b8b8b;
  text-align: center;
`;

export const labelError = styled.label`
  font-size: 14px;
  color: black;
  text-align: center;
`;

export const Strong = styled.strong`
  cursor: pointer;

  a {
    text-decoration: none;
    color: #6ab7e9; /* Cor suave de link */
    font-weight: 600;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #3f8fa4; /* Cor de hover para o link */
    }
  }
`;

// Botão com estilo mais acolhedor
export const Button = styled.button`
  background-color: #ff6f61; /* Cor suave e acolhedora */
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  padding: 12px 20px;
  border-radius: 30px; /* Bordas arredondadas para um toque suave */
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #e15c54;
    transform: scale(1.05); /* Efeito de hover suave */
  }
`;
