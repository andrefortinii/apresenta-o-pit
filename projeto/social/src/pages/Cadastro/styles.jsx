import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  height: 100vh;
  background-color: #afd1db; /* Fundo mais escuro, conforme solicitado */
`;

export const Content = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1); /* Box shadow suave */
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  transition: all 0.3s ease-in-out; /* Transição suave */
  
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Aumenta o efeito de sombra ao passar o mouse */
  }
`;

export const Label = styled.label`
  font-size: 20px;
  font-weight: bold;
  color: #333; /* Cor mais suave para o texto */
  margin-bottom: 10px;
`;

export const LabelSignin = styled.label`
  font-size: 16px;
  color: #333;
  margin-top: 10px;
`;

export const labelError = styled.label`
  font-size: 14px;
  color: red;
  margin-top: 10px;
`;

export const Strong = styled.strong`
  cursor: pointer;

  a {
    text-decoration: none;
    color: black; /* Cor vibrante e moderna para o link */
    font-weight: bold;

    
  }
`;

// Input Styled Component para melhorar os campos
export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  outline: none;
  margin-bottom: 10px;
  transition: all 0.3s ease-in-out;

  &:focus {
    border-color: #009688; /* Cor de foco */
    box-shadow: 0 0 5px rgba(0, 150, 136, 0.5); /* Sombra ao focar */
  }

  &::placeholder {
    color: #999;
  }
`;

// Botão estilizado com efeitos
export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #009688;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease-in-out;

  &:hover {
    background-color: #00796b; /* Cor de hover do botão */
    transform: scale(1.05); /* Efeito de aumentar o botão ao passar o mouse */
  }

  &:active {
    background-color: #004d40; /* Cor ao clicar no botão */
  }
`;

