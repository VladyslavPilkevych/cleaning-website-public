import { PaymentElement } from "@stripe/react-stripe-js";
import styled from "styled-components";
import ThemeColors from "../../../../utils/theme/colors";

const StyledForm = styled.form`
  font-family: "Montserrat";
  width: 35vw;
  min-width: 500px;
  align-self: center;
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
  padding: 40px;
  margin: 2rem auto;
  background-color: #ffffff;
`;

const StyledInput = styled.input`
  width: 100%;
  border-radius: 5px;
  border: 1px solid #e6e6e6;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(0, 0, 0, 0.02);
  margin-top: 0.25rem;
  padding: 0.75rem;
  font-size: 16px;
`;

const StyledButton = styled.button`
  background: ${ThemeColors.Primary};
  font-family: Arial, sans-serif;
  color: #ffffff;
  border-radius: 4px;
  border: 0;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: block;
  transition: all 0.2s ease;
  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
  width: 100%;
  margin-top: 2rem;

  &:hover {
    filter: contrast(115%);
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const StyledPaymentElement = styled(PaymentElement)`
  margin-top: 16px;
  margin-bottom: 24px;
`;

const StyledMessage = styled.div`
  font-size: 16px;
  line-height: 20px;
  padding-top: 12px;
  text-align: center;
`;

const Spinner = styled.div`
  border-radius: 50%;
  color: #ffffff;
  font-size: 22px;
  text-indent: -99999px;
  margin: 0px auto;
  position: relative;
  width: 20px;
  height: 20px;
  box-shadow: inset 0 0 0 2px;
  transform: translateZ(0);

  &:before,
  &:after {
    position: absolute;
    content: "";
    border-radius: 50%;
  }

  &:before {
    width: 10.4px;
    height: 20.4px;
    background: #0055de;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    transform-origin: 10.4px 10.2px;
    animation: loading 2s infinite ease 1.5s;
  }

  &:after {
    width: 10.4px;
    height: 10.2px;
    background: #0055de;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    transform-origin: 0px 10.2px;
    animation: loading 2s infinite ease;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const StyledLabel = styled.label`
  display: block;
  font-size: 14px;
  margin: 1rem 0;
  color: #333333;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StyledHeading = styled.h4`
  font-size: 18px;
  font-weight: bold;
  color: #0055de;
  text-align: center;
  margin: 20px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export {
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledButton,
  StyledPaymentElement,
  StyledMessage,
  Spinner,
  StyledHeading,
};
