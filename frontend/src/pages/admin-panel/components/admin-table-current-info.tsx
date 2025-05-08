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
        Name:
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
          Phone:
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
          Email:
        </Title>
        <Title size={TitleSize.H5} color={ThemeColors.Primary}>
          {selectedEvent?.contact_email ?? ""}
        </Title>
      </Flex>
      <Flex gap="1rem">
        <Title
          size={TitleSize.H6}
          color={ThemeColors.Dark}
          fontWeight={FontWeight.Bold}
        >
          Start time:
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
          End time:
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
          Address:
        </Title>
        <Title size={TitleSize.H5} color={ThemeColors.Primary}>
          {[
            selectedEvent?.address_city,
            selectedEvent?.address_psc,
            selectedEvent?.address_street,
            selectedEvent?.address_house,
          ].join(", ")}
        </Title>
      </Flex>
      <Flex gap="1rem">
        <Title
          size={TitleSize.H6}
          color={ThemeColors.Dark}
          fontWeight={FontWeight.Bold}
        >
          Services:
        </Title>
        <Title size={TitleSize.H5} color={ThemeColors.Primary}>
          {selectedEvent?.services
            ? JSON.parse(selectedEvent?.services as string)
                ?.map(
                  (service: ServicesFormData) =>
                    service.id + ": " + service.count
                )
                ?.join(", ")
            : ""}
        </Title>
      </Flex>
      <Flex gap="1rem">
        <Title
          size={TitleSize.H6}
          color={ThemeColors.Dark}
          fontWeight={FontWeight.Bold}
        >
          Payment method:
        </Title>
        <Title size={TitleSize.H5} color={ThemeColors.Primary}>
          {selectedEvent?.payment_method ?? ""}
        </Title>
      </Flex>
      <Flex gap="1rem">
        <Title
          size={TitleSize.H6}
          color={ThemeColors.Dark}
          fontWeight={FontWeight.Bold}
        >
          Total price:
        </Title>
        <Title size={TitleSize.H5} color={ThemeColors.Primary}>
          {(selectedEvent?.total_price ?? 0).toString() + " EUR"}
        </Title>
      </Flex>
      <Flex gap="1rem">
        <Title
          size={TitleSize.H6}
          color={ThemeColors.Dark}
          fontWeight={FontWeight.Bold}
        >
          Property type:
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
          Property area:
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
          Property rooms:
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
          Property steps:
        </Title>
        <Title size={TitleSize.H5} color={ThemeColors.Primary}>
          {selectedEvent?.property_steps?.toString() ?? ""}
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
              Windows cleaning:
            </Title>
            <Title size={TitleSize.H5} color={ThemeColors.Primary}>
              {selectedEvent?.windows_cleaning?.toString() ?? ""}
            </Title>
          </Flex>
          <Flex gap="1rem">
            <Title
              size={TitleSize.H6}
              color={ThemeColors.Dark}
              fontWeight={FontWeight.Bold}
            >
              Windows mold:
            </Title>
            <Title size={TitleSize.H5} color={ThemeColors.Primary}>
              {selectedEvent?.windows_mold?.toString() ?? ""}
            </Title>
          </Flex>
          <Flex gap="1rem">
            <Title
              size={TitleSize.H6}
              color={ThemeColors.Dark}
              fontWeight={FontWeight.Bold}
            >
              Windows area:
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
              Windows count:
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
