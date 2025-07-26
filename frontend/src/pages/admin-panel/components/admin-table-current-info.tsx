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
import { useTranslation } from "react-i18next";
import { AlignItems } from "../../../components/flex/flex.constants";

type AdminTableCurrentInfoProps = {
  selectedEvent: DbPricingFormData | null;
};

export default function AdminTableCurrentInfo({
  selectedEvent,
}: AdminTableCurrentInfoProps) {
  const { t } = useTranslation("translation");

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
          {t("admin-panel.event.name")}
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
          {t("admin-panel.event.phone")}
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
          {t("admin-panel.event.email")}
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
          {t("admin-panel.event.start")}
        </Title>
        <Title size={TitleSize.H5} color={ThemeColors.Primary}>
          {selectedEvent?.time ?? ""}
        </Title>
      </Flex>
      {/* <Flex gap="1rem">
        <Title
          size={TitleSize.H6}
          color={ThemeColors.Dark}
          fontWeight={FontWeight.Bold}
        >
          {t("admin-panel.event.end")}
        </Title>
        <Title size={TitleSize.H5} color={ThemeColors.Primary}>
          {selectedEvent?.date?.toLocaleString() ?? ""}
        </Title>
      </Flex> */}
      <Flex gap="1rem" alignItems={AlignItems.START}>
        <Title
          size={TitleSize.H6}
          color={ThemeColors.Dark}
          fontWeight={FontWeight.Bold}
        >
          {t("admin-panel.event.address")}
        </Title>
        <Title size={TitleSize.H5} color={ThemeColors.Primary}>
          {selectedEvent?.address_street + ", " + selectedEvent?.address_house}
        </Title>
      </Flex>
      <Flex gap="1rem" alignItems={AlignItems.START}>
        <Title
          size={TitleSize.H6}
          color={ThemeColors.Dark}
          fontWeight={FontWeight.Bold}
        >
          {t("admin-panel.event.services")}
        </Title>
        <Title size={TitleSize.H5} color={ThemeColors.Primary}>
          {selectedEvent?.services && JSON.parse(selectedEvent?.services as string)?.length > 0
            ? JSON.parse(selectedEvent?.services as string)
                ?.map(
                  (service: ServicesFormData) =>
                    <li key={service.id}>{t(`pricing.services.cards.${service.id}`)}: {service.count}</li>
                )
            : "-"}
        </Title>
      </Flex>
      <Flex gap="1rem">
        <Title
          size={TitleSize.H6}
          color={ThemeColors.Dark}
          fontWeight={FontWeight.Bold}
        >
          {t("admin-panel.event.payment-method")}
        </Title>
        <Title size={TitleSize.H5} color={ThemeColors.Primary}>
          {selectedEvent?.payment_method === "card"
            ? t("admin-panel.event.card-paid")
            : t("admin-panel.event.cash-paid")}
        </Title>
      </Flex>
      <Flex gap="1rem">
        <Title
          size={TitleSize.H6}
          color={ThemeColors.Dark}
          fontWeight={FontWeight.Bold}
        >
          {t("admin-panel.event.total-price")}
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
          {t("admin-panel.event.property-type")}
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
          {t("admin-panel.event.property-area")}
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
          {t("admin-panel.event.property-rooms")}
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
          {t("admin-panel.event.property-steps")}
        </Title>
        <Title size={TitleSize.H5} color={ThemeColors.Primary}>
          {selectedEvent?.property_steps?.toString() === "false" ? t("admin-panel.event.no") : t("admin-panel.event.yes")}
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
              {t("admin-panel.event.windows-cleaning")}
            </Title>
            <Title size={TitleSize.H5} color={ThemeColors.Primary}>
              {selectedEvent?.windows_cleaning?.toString() === "false"
                ? t("admin-panel.event.no")
                : t("admin-panel.event.yes")}
            </Title>
          </Flex>
          <Flex gap="1rem">
            <Title
              size={TitleSize.H6}
              color={ThemeColors.Dark}
              fontWeight={FontWeight.Bold}
            >
              {t("admin-panel.event.windows-mold")}
            </Title>
            <Title size={TitleSize.H5} color={ThemeColors.Primary}>
              {selectedEvent?.windows_mold?.toString() === "false"
                ? t("admin-panel.event.no")
                : t("admin-panel.event.yes")}
            </Title>
          </Flex>
          <Flex gap="1rem">
            <Title
              size={TitleSize.H6}
              color={ThemeColors.Dark}
              fontWeight={FontWeight.Bold}
            >
              {t("admin-panel.event.windows-area")}
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
              {t("admin-panel.event.windows-count")}
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
