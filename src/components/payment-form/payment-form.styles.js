import styled from "styled-components";
import Button from "../button/button.component";

export const PaymentFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.form`
  height: 100px;
  min-width: 600px;
`;

export const PaymentButton = styled(Button)`
  margin-left: auto;
  margin-top: 20px;
`;
