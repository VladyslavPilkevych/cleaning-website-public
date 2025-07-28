import React, { useState, useCallback, useEffect, Dispatch, SetStateAction } from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { getDistance } from "geolib";
import { Label, HelperText, customStyles } from "./styled-async-select";
import Box from "../../../../components/box";
import { useTranslation } from "react-i18next";
import { components } from "react-select";
import ThemeColors from "../../../../utils/theme/colors";
import { OptionType, PricingPageFormDataErrors } from "../../helpers/types";
import debounce from "lodash.debounce";
import { ChangeFormDataType } from "../../pricing-page";
import Title from "../../../../components/title";
import { TitleSize } from "../../../../components/title/title.constants";

const CENTER_COORDS = {
  latitude: 48.1486,
  longitude: 17.1077,
};

const MAX_RADIUS_KM = 120;
const SURCHARGE_PER_KM = 0.8;

type DeliveryCalculatorProps = {
  priceDeliveryExtra: number | null;
  setPriceDeliveryExtra: (price: number | null) => void;
  handleChangeFormData: ChangeFormDataType;
  formErrors: PricingPageFormDataErrors;
  setFormErrors: Dispatch<SetStateAction<PricingPageFormDataErrors>>;
};

export function DeliveryCalculator({
  priceDeliveryExtra,
  setPriceDeliveryExtra,
  handleChangeFormData,
  formErrors,
  setFormErrors
}: DeliveryCalculatorProps) {
  const { t, i18n } = useTranslation("translation");

  const [selectedAddress, setSelectedAddress] = useState<OptionType | null>(
    null
  );
  const [distanceKm, setDistanceKm] = useState<number | null>(null);

  const loadOptions = async (inputValue: string): Promise<OptionType[]> => {
    if (!inputValue) return [];
  
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: inputValue,
          format: "json",
          addressdetails: 1,
          limit: 10,
          "accept-language": i18n.language,
          bounded: 1,
          viewbox: "15.6077,47.1486,18.6077,49.1486",
          countrycodes: "sk,at",
        },
      }
    );
  
    return response.data.map((item: any) => ({
      label: item.display_name,
      value: item.display_name,
    }));
  };
  

  const debouncedLoadOptions = useCallback(debounce(loadOptions, 500), [
    i18n.language,
  ]);

  useEffect(() => {
    return () => {
      debouncedLoadOptions.cancel();
    };
  }, [debouncedLoadOptions]);

  const handleChange = async (option: OptionType | null) => {
    setSelectedAddress(option);
    if (!option) return;

    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: option.value,
          format: "json",
          limit: 1,
        },
      }
    );

    const location = response.data[0];
    if (!location) return;

    const distanceMeters = getDistance(
      {
        latitude: parseFloat(location.lat),
        longitude: parseFloat(location.lon),
      },
      CENTER_COORDS
    );

    const km = distanceMeters / 1000;
    setDistanceKm(km);

    if (km > MAX_RADIUS_KM) {
      setPriceDeliveryExtra(null);
      setFormErrors((prev) => ({ ...prev, addressDistance: t("pricing.address-form.address-distance-error") }));
      alert(t("pricing.address-form.address-distance-error"));
    } else {
      setFormErrors((prev) => ({ ...prev, addressDistance: undefined }));
      const surcharge = Math.round(km * SURCHARGE_PER_KM * 100) / 100;
      setPriceDeliveryExtra(surcharge);
      handleChangeFormData("address.street", option.value);
    }
  };

  const customComponents = {
    LoadingMessage: (props: any) => (
      <components.LoadingMessage {...props}>
        <span
          style={{ color: ThemeColors.Secondary, fontFamily: "Montserrat" }}
        >
          {t("pricing.address-form.address-loading")}
        </span>
      </components.LoadingMessage>
    ),
    NoOptionsMessage: (props: any) => (
      <components.NoOptionsMessage {...props}>
        <span
          style={{ color: ThemeColors.Secondary, fontFamily: "Montserrat" }}
        >
          {t("pricing.address-form.address-no-options")}
        </span>
      </components.NoOptionsMessage>
    ),
  };
  return (
    <Box>
      <Label>{t("pricing.address-form.address-select")}</Label>
      <AsyncSelect
        loadOptions={debouncedLoadOptions}
        onChange={handleChange}
        placeholder={t("pricing.address-form.address-select-placeholder")}
        cacheOptions
        defaultOptions
        styles={customStyles}
        components={customComponents}
      />

      {formErrors.addressStreet && (
        <Title size={TitleSize.H6} color={ThemeColors.Warning}>
          {formErrors.addressStreet}
        </Title>
      )}

      {formErrors.addressDistance && (
        <Title size={TitleSize.H6} color={ThemeColors.Warning}>
          {formErrors.addressDistance}
        </Title>
      )}

      {distanceKm !== null && (
        <HelperText style={{ marginTop: "1rem" }}>{`${t(
          "pricing.address-form.address-distance"
        )} ${distanceKm.toFixed(2)} ${t(
          "pricing.address-form.address-km"
        )}`}</HelperText>
      )}

      {/* {priceDeliveryExtra !== null && (
        <HelperText>
          {`${t(
            "pricing.address-form.address-additional-price"
          )} ${priceDeliveryExtra.toFixed(2)} EUR`}
        </HelperText>
      )} */}
    </Box>
  );
}
