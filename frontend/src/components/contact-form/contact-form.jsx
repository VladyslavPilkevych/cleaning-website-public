import { useState } from "react";
import styled from "styled-components";
import ThemeColors from "../../utils/theme/colors";
import Button from "../button";
import { ButtonType } from "../button/button.constants";
import Flex from "../flex";
import Box from "../box";
import { FlexDirection } from "../flex/flex.constants";
import { ButtonVariant, ButtonSize } from "../button/button.constants";

const Label = styled.label`
  font-family: "Montserrat";
  font-weight: regular;
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: ${ThemeColors.White};
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: ${ThemeColors.Accent};
  color: white;
  font-size: 16px;

  &::placeholder {
    color: ${ThemeColors.White};
    opacity: 0.4;
  }
`;

const TextArea = styled.textarea`
  width: 95%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: ${ThemeColors.Accent};
  color: white;
  font-size: 16px;
  height: 150px;
  resize: none;

  &::placeholder {
    color: ${ThemeColors.White};
    opacity: 0.4;
  }
`;

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex flexDirection={FlexDirection.COLUMN} gap="2rem">
        <Flex gap="1rem" width="100%">
          <Box>
            <Label>Full Name*</Label>
            <Input
              type="text"
              name="name"
              placeholder="Your name..."
              value={formData.name}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <Label>Phone Number*</Label>
            <Input
              type="text"
              name="phone"
              placeholder="Phone number..."
              value={formData.phone}
              onChange={handleChange}
            />
          </Box>
        </Flex>

        <Box>
          <Label>Email Address*</Label>
          <Input
            type="email"
            name="email"
            placeholder="Your email..."
            value={formData.email}
            onChange={handleChange}
            style={{
              width: "95%",
            }}
          />
        </Box>

        <Box>
          <Label>Message*</Label>
          <TextArea
            name="message"
            placeholder="Text..."
            value={formData.message}
            onChange={handleChange}
          />
        </Box>

        <Button
          variant={ButtonVariant.ACCENT}
          size={ButtonSize.LARGE}
          type={ButtonType.SUBMIT}
          css={{ color: ThemeColors.White }}
        >
          Submit
        </Button>
      </Flex>
    </form>
  );
}
