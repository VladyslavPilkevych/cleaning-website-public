import React from "react";
import Box from "../../../components/box";
import Title from "../../../components/title";
import { TitleSize } from "../../../components/title/title.constants";
import ThemeColors from "../../../utils/theme/colors";
import Flex from "../../../components/flex";
import { FontWeight } from "../../../utils/theme/fonts";
import {
  DbPricingFormData,
  ServicesFormData,
} from "../../pricing-page/helpers/types";

type AdminTableCurrentInfoProps = {
  selectedEvent: DbPricingFormData | null;
};

export default function AdminTableCurrentInfo({
  selectedEvent,
}: AdminTableCurrentInfoProps) {

  return (
    <Box
      css={{
        margin: "3rem auto",
        gap: "1rem",
        width: "fit-content",
        border: `1px solid ${ThemeColors.Primary}`,
        borderRadius: "5px",
        padding: "3rem",
        backgroundColor: ThemeColors.Background,
      }}
    >
      <Flex gap="1rem">
        <Title
          size={TitleSize.H6}
          color={ThemeColors.Dark}
          fontWeight={FontWeight.Bold}
        >
          {"Ім'я:"}
        </Title>
        <Title size={TitleSize.H5} color={ThemeColors.Primary}>
          {selectedEvent?.contact_name ?? ""}
        </Title>
      </Flex>
      <Flex gap="1rem">
        <Title
          size={TitleSize.H6}
          color={ThemeColors.Dark}
          fontWeight={FontWeight.Bold}
        >
          {"Телефон:"}
        </Title>
        <Title size={TitleSize.H5} color={ThemeColors.Primary}>
          {selectedEvent?.contact_phone ?? ""}
        </Title>
      </Flex>
      <Flex gap="1rem">
        <Title
          size={TitleSize.H6}
          color={ThemeColors.Dark}
          fontWeight={FontWeight.Bold}
        >
          {"Email:"}
        </Title>
        <Title size={TitleSize.H5} color={ThemeColors.Primary}>
          {selectedEvent?.contact_email ?? ""}
        </Title>
      </Flex>
      {/* <Flex gap="1rem">
        <Title
          size={TitleSize.H6}
          color={ThemeColors.Dark}
          fontWeight={FontWeight.Bold}
        >
          {"Початок:"}
        </Title>
        <Title size={TitleSize.H5} color={ThemeColors.Primary}>
          {selectedEvent?.date?.toLocaleString() ?? ""}
        </Title>
      </Flex>
      <Flex gap="1rem">
        <Title
          size={TitleSize.H6}
          color={ThemeColors.Dark}
          fontWeight={FontWeight.Bold}
        >
          {"Кінець:"}
        </Title>
        <Title size={TitleSize.H5} color={ThemeColors.Primary}>
          {selectedEvent?.date?.toLocaleString() ?? ""}
        </Title>
      </Flex> */}
      <Flex gap="1rem">
        <Title
          size={TitleSize.H6}
          color={ThemeColors.Dark}
          fontWeight={FontWeight.Bold}
        >
          {"Адреса:"}
        </Title>
        <Title size={TitleSize.H5} color={ThemeColors.Primary}>
          {selectedEvent?.address_street + ", " + selectedEvent?.address_house}
        </Title>
      </Flex>
      <Flex gap="1rem">
        <Title
          size={TitleSize.H6}
          color={ThemeColors.Dark}
          fontWeight={FontWeight.Bold}
        >
          {"Послуги:"}
        </Title>
        <Title size={TitleSize.H5} color={ThemeColors.Primary}>
          {selectedEvent?.services && JSON.parse(selectedEvent?.services as string)?.length > 0
            ? JSON.parse(selectedEvent?.services as string)
                ?.map(
                  (service: ServicesFormData) =>
                    service.id + ": " + service.count
                )
                ?.join(", ")
            : "-"}
        </Title>
      </Flex>
      <Flex gap="1rem">
        <Title
          size={TitleSize.H6}
          color={ThemeColors.Dark}
          fontWeight={FontWeight.Bold}
        >
          {"Платіжна система:"}
        </Title>
        <Title size={TitleSize.H5} color={ThemeColors.Primary}>
          {selectedEvent?.payment_method === "card"
            ? "Карта - заплачено"
            : "Готівка - оплата на місці"}
        </Title>
      </Flex>
      <Flex gap="1rem">
        <Title
          size={TitleSize.H6}
          color={ThemeColors.Dark}
          fontWeight={FontWeight.Bold}
        >
          {"Загальна ціна:"}
        </Title>
        <Title size={TitleSize.H5} color={ThemeColors.Primary}>
          {(Math.round((selectedEvent?.total_price ?? 0) * 100) / 100).toString() + " EUR"}
        </Title>
      </Flex>
      <Flex gap="1rem">
        <Title
          size={TitleSize.H6}
          color={ThemeColors.Dark}
          fontWeight={FontWeight.Bold}
        >
          {"Тип власності:"}
        </Title>
        <Title size={TitleSize.H5} color={ThemeColors.Primary}>
          {selectedEvent?.property_type ?? ""}
        </Title>
      </Flex>
      <Flex gap="1rem">
        <Title
          size={TitleSize.H6}
          color={ThemeColors.Dark}
          fontWeight={FontWeight.Bold}
        >
          {"Площа власності:"}
        </Title>
        <Title size={TitleSize.H5} color={ThemeColors.Primary}>
          {selectedEvent?.property_area ?? ""}
        </Title>
      </Flex>
      <Flex gap="1rem">
        <Title
          size={TitleSize.H6}
          color={ThemeColors.Dark}
          fontWeight={FontWeight.Bold}
        >
          {"Кількість кімнат:"}
        </Title>
        <Title size={TitleSize.H5} color={ThemeColors.Primary}>
          {selectedEvent?.property_rooms ?? ""}
        </Title>
      </Flex>
      <Flex gap="1rem">
        <Title
          size={TitleSize.H6}
          color={ThemeColors.Dark}
          fontWeight={FontWeight.Bold}
        >
          {"Чи є ступені:"}
        </Title>
        <Title size={TitleSize.H5} color={ThemeColors.Primary}>
          {selectedEvent?.property_steps?.toString() === "false" ? "Ні" : "Так"}
        </Title>
      </Flex>
      {selectedEvent?.windows_cleaning && (
        <>
          <Flex gap="1rem">
            <Title
              size={TitleSize.H6}
              color={ThemeColors.Dark}
              fontWeight={FontWeight.Bold}
            >
              {"Чи потрібна чистка вікон:"}
            </Title>
            <Title size={TitleSize.H5} color={ThemeColors.Primary}>
              {selectedEvent?.windows_cleaning?.toString() === "false"
                ? "Ні"
                : "Так"}
            </Title>
          </Flex>
          <Flex gap="1rem">
            <Title
              size={TitleSize.H6}
              color={ThemeColors.Dark}
              fontWeight={FontWeight.Bold}
            >
              {"Чи потрібна чистка вікон від грибка:"}
            </Title>
            <Title size={TitleSize.H5} color={ThemeColors.Primary}>
              {selectedEvent?.windows_mold?.toString() === "false"
                ? "Ні"
                : "Так"}
            </Title>
          </Flex>
          <Flex gap="1rem">
            <Title
              size={TitleSize.H6}
              color={ThemeColors.Dark}
              fontWeight={FontWeight.Bold}
            >
              {"Площа вікон:"}
            </Title>
            <Title size={TitleSize.H5} color={ThemeColors.Primary}>
              {selectedEvent?.windows_area ?? ""}
            </Title>
          </Flex>
          <Flex gap="1rem">
            <Title
              size={TitleSize.H6}
              color={ThemeColors.Dark}
              fontWeight={FontWeight.Bold}
            >
              {"Кількість вікон:"}
            </Title>
            <Title size={TitleSize.H5} color={ThemeColors.Primary}>
              {selectedEvent?.windows_count ?? ""}
            </Title>
          </Flex>
        </>
      )}
    </Box>
  );
}
