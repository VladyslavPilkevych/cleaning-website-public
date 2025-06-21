import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { getDistance } from "geolib";
import { Label, HelperText, customStyles } from "./styled-async-select";
import Box from "../../../../components/box";
import { useTranslation } from "react-i18next";
import { components } from "react-select";

type OptionType = {
  label: string;
  value: string;
};

const CENTER_COORDS = {
  latitude: 48.1486,
  longitude: 17.1077,
};

const MAX_RADIUS_KM = 100;
const SURCHARGE_PER_KM = 0.8;

const DeliveryCalculator: React.FC = () => {
  const { t, i18n } = useTranslation("translation");

  const [selectedAddress, setSelectedAddress] = useState<OptionType | null>(
    null
  );
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [priceExtra, setPriceExtra] = useState<number | null>(null);

  const loadOptions = async (inputValue: string): Promise<OptionType[]> => {
    if (!inputValue) return [];
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          city: "Bratislava",
          street: inputValue,
          format: "json",
          addressdetails: 1,
          limit: 5,
          "accept-language": i18n.language,
          bounded: 1,
          viewbox: "16.7604,47.6985,18.8917,48.9331",
        },
      }
    );
    // params: {
    //   q: inputValue,
    //   format: "json",
    //   addressdetails: 1,
    //   limit: 5,
    //   "accept-language": "sk",
    //   bounded: 1,
    //   viewbox: "16.8,48.6,17.6,47.9", // лево, верх, право, низ (long, lat)
    // }

    return response.data.map((item: any) => ({
      label: item.display_name,
      value: item.display_name,
    }));
  };

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
      setPriceExtra(null);
      alert("Адрес за пределами зоны доставки (100 км)");
    } else {
      const surcharge = Math.round(km * SURCHARGE_PER_KM * 100) / 100;
      setPriceExtra(surcharge);
    }
  };

  // return (
  //   <div style={{ maxWidth: 500, margin: "auto" }}>
  //     <h2>Адрес доставки (Братислава)</h2>
  //     <AsyncSelect
  //       loadOptions={loadOptions}
  //       onChange={handleChange}
  //       placeholder="Введите улицу"
  //       cacheOptions
  //       defaultOptions
  //     />

  //     {distanceKm !== null && (
  //       <p>📏 Расстояние от центра: {distanceKm.toFixed(2)} км</p>
  //     )}
  //     {priceExtra !== null && (
  //       <p>💰 Надбавка: {priceExtra.toFixed(2)} EUR</p>
  //     )}
  //   </div>
  // );

  const customComponents = {
    LoadingMessage: (props: any) => (
      <components.LoadingMessage {...props}>
        <span style={{ color: "white", fontFamily: "Montserrat" }}>Загрузка...</span>
      </components.LoadingMessage>
    ),
    NoOptionsMessage: (props: any) => (
      <components.NoOptionsMessage {...props}>
        <span style={{ color: "white", fontFamily: "Montserrat" }}>Ничего не найдено</span>
      </components.NoOptionsMessage>
    ),
  };
  return (
    <Box>
      <Label>{t("pricing.address-form.address-select")}</Label>
      <AsyncSelect
        loadOptions={loadOptions}
        onChange={handleChange}
        placeholder={t("pricing.address-form.address-select-placeholder")}
        cacheOptions
        defaultOptions
        styles={customStyles}
        components={customComponents}
      />
      {distanceKm !== null && (
        <HelperText>Расстояние: {distanceKm.toFixed(2)} км</HelperText>
      )}

      {priceExtra !== null && (
        <HelperText style={{ top: "4rem" }}>
          Надбавка: {priceExtra.toFixed(2)} EUR
        </HelperText>
      )}
    </Box>
  );
};

export default DeliveryCalculator;
