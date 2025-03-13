import React from "react";
import DateCalendarValue from "./components/calendar";
import TimePicker from "./components/time-picker";
import Flex from "../../components/flex";
import { JustifyContent } from "../../components/flex/flex.constants";
import Box from "../../components/box";
import CardContainer from "./components/card-container";
import Checkbox from "./components/checkbox";
import SvgIcon from "./components/svg-icon";
import { useTranslation } from "react-i18next";
import ThemeColors from "../../utils/theme/colors";
import AddressForm from "./components/address-form";
import ContactForm from "./components/contact-form";
import PaymentMethod from "./components/payment-method";

export default function PricingPage() {
  const { t } = useTranslation("translation");
  
  return (
    <Box>
      <Flex justifyContent={JustifyContent.SPACE_EVENLY}>
        <DateCalendarValue />
        <TimePicker />
      </Flex>

      <CardContainer />

      <Checkbox text={t("pricing.vacuum-cleaner")} price="14.99 EUR" icon={<SvgIcon src="./icons/vacuum.svg" />} />

      <Box css={{color: ThemeColors.Dark, width: "100%", height: "4px", margin: "4rem 0"}} />

      <AddressForm />

      <ContactForm />

      <PaymentMethod />
    </Box>
  );
}
