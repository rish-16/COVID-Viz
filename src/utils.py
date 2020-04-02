from pprint import pprint 
import json, os, re, requests, pycountry, math
import numpy as np

class Geocoder(object):
    def __init__(self):
        self.API_KEY = "377c209c0f2541928b02f2b8d07ed70a"
        self.country_lookup = {
            "AD": { "colorCode": 186, "name": 'ANDORRA', "lat": 42.5, "lat": 1.6 },
            "AE": { "colorCode": 22, "name": 'UNITED ARAB EMIRATES', "lat": 24, "lat": 54 },
            "AF": { "colorCode": 30, "name": 'AFGHANISTAN', "lat": 33, "lat": 65 },
            "AG": { "colorCode": 190, "name": 'ANTIGUA AND BARBUDA', "lat": 17.05, "lat": -61.8 },
            "AI": { "colorCode": 215, "name": 'ANGUILLA', "lat": 18.25, "lat": -63.1667 },
            "AL": { "colorCode": 69, "name": 'ALBANIA', "lat": 41, "lat": 20 },
            "AM": { "colorCode": 115, "name": 'ARMENIA', "lat": 40, "lat": 45 },
            "AO": { "colorCode": 47, "name": 'ANGOLA', "lat": -12.5, "lat": 18.5 },
            "AQ": { "colorCode": 152, "name": 'ANTARCTICA', "lat": -90, "lat": 0 },
            "AR": { "colorCode": 76, "name": 'ARGENTINA', "lat": -34, "lat": -64 },
            "AS": { "colorCode": 208, "name": 'AMERICAN SAMOA', "lat": -14.3333, "lat": -170 },
            "AT": { "colorCode": 35, "name": 'AUSTRIA', "lat": 47.3333, "lat": 13.3333 },
            "AU": { "colorCode": 51, "name": 'AUSTRALIA', "lat": -27, "lat": 133 },
            "AW": { "colorCode": 210, "name": 'ARUBA', "lat": 12.5, "lat": -69.9667 },
            "AZ": { "colorCode": 106, "name": 'AZERBAIJAN', "lat": 40.5, "lat": 47.5 },
            "BA": { "colorCode": 94, "name": 'BOSNIA AND HERZEGOVINA', "lat": 44, "lat": 18 },
            "BB": { "colorCode": 191, "name": 'BARBADOS', "lat": 13.1667, "lat": -59.5333 },
            "BD": { "colorCode": 31, "name": 'BANGLADESH', "lat": 24, "lat": 90 },
            "BE": { "colorCode": 100, "name": 'BELGIUM', "lat": 50.8333, "lat": 4 },
            "BF": { "colorCode": 2, "name": 'BURKINA FASO', "lat": 13, "lat": -2 },
            "BG": { "colorCode": 103, "name": 'BULGARIA', "lat": 43, "lat": 25 },
            "BH": { "colorCode": 185, "name": 'BAHRAIN', "lat": 26, "lat": 50.55 },
            "BI": { "colorCode": 104, "name": 'BURUNDI', "lat": -3.5, "lat": 30 },
            "BJ": { "colorCode": 143, "name": 'BENIN', "lat": 9.5, "lat": 2.25 },
            "BL": { "colorCode": 203, "name": 'SAINT BARTHÉLEMY' },
            "BM": { "colorCode": 219, "name": 'BERMUDA', "lat": 32.3333, "lat": -64.75 },
            "BN": { "colorCode": 170, "name": 'BRUNEI DARUSSALAM', "lat": 4.5, "lat": 114.6667 },
            "BO": { "colorCode": 10, "name": 'BOLIVIA, PLURINATIONAL STATE OF', "lat": -17, "lat": -65 },
            "BR": { "colorCode": 24, "name": 'BRAZIL', "lat": -10, "lat": -55 },
            "BS": { "colorCode": 161, "name": 'BAHAMAS', "lat": 24.25, "lat": -76 },
            "BT": { "colorCode": 156, "name": 'BHUTAN', "lat": 27.5, "lat": 90.5 },
            "BW": { "colorCode": 16, "name": 'BOTSWANA', "lat": -22, "lat": 24 },
            "BY": { "colorCode": 5, "name": 'BELARUS', "lat": 53, "lat": 28 },
            "BZ": { "colorCode": 23, "name": 'BELIZE', "lat": 17.25, "lat": -88.75 },
            "CA": { "colorCode": 97, "name": 'CANADA', "lat": 60, "lat": -95 },
            "CD": { "colorCode": 27, "name": 'CONGO, THE DEMOCRATIC REPUBLIC OF THE', "lat": 0, "lat": 25 },
            "CF": { "colorCode": 132, "name": 'CENTRAL AFRICAN REPUBLIC', "lat": 7, "lat": 21 },
            "CG": { "colorCode": 110, "name": 'CONGO', "lat": -1, "lat": 15 },
            "CH": { "colorCode": 13, "name": 'SWITZERLAND', "lat": 47, "lat": 8 },
            "CI": { "colorCode": 11, "name": 'CÔTE D\'IVOIRE', "lat": 8, "lat": -5 },
            "CK": { "colorCode": 206, "name": 'COOK ISLANDS', "lat": -21.2333, "lat": -159.7667 },
            "CL": { "colorCode": 128, "name": 'CHILE', "lat": -30, "lat": -71 },
            "CM": { "colorCode": 14, "name": 'CAMEROON', "lat": 6, "lat": 12 },
            "CN": { "colorCode": 96, "name": 'CHINA', "lat": 35, "lat": 105 },
            "CO": { "colorCode": 45, "name": 'COLOMBIA', "lat": 4, "lat": -72 },
            "CR": { "colorCode": 78, "name": 'COSTA RICA', "lat": 10, "lat": -84 },
            "CU": { "colorCode": 42, "name": 'CUBA', "lat": 21.5, "lat": -80 },
            "CV": { "colorCode": 172, "name": 'CAPE VERDE', "lat": 16, "lat": -24 },
            "CY": { "colorCode": 167, "name": 'CYPRUS', "lat": 35, "lat": 33 },
            "CZ": { "colorCode": 67, "name": 'CZECH REPUBLIC', "lat": 49.75, "lat": 15.5 },
            "DE": { "colorCode": 48, "name": 'GERMANY', "lat": 51, "lat": 9 },
            "DJ": { "colorCode": 105, "name": 'DJIBOUTI', "lat": 11.5, "lat": 43 },
            "DK": { "colorCode": 57, "name": 'DENMARK', "lat": 56, "lat": 10 },
            "DM": { "colorCode": 181, "name": 'DOMINICA', "lat": 15.4167, "lat": -61.3333 },
            "DO": { "colorCode": 32, "name": 'DOMINICAN REPUBLIC', "lat": 19, "lat": -70.6667 },
            "DZ": { "colorCode": 12, "name": 'ALGERIA', "lat": 28, "lat": 3 },
            "EC": { "colorCode": 142, "name": 'ECUADOR', "lat": -2, "lat": -77.5 },
            "EE": { "colorCode": 113, "name": 'ESTONIA', "lat": 59, "lat": 26 },
            "EG": { "colorCode": 87, "name": 'EGYPT', "lat": 27, "lat": 30 },
            "EH": { "colorCode": 66, "name": 'WESTERN SAHARA', "lat": 24.5, "lat": -13 },
            "ER": { "colorCode": 149, "name": 'ERITREA', "lat": 15, "lat": 39 },
            "ES": { "colorCode": 118, "name": 'SPAIN', "lat": 40, "lat": -4 },
            "ET": { "colorCode": 63, "name": 'ETHIOPIA', "lat": 8, "lat": 38 },
            "FI": { "colorCode": 70, "name": 'FINLAND', "lat": 64, "lat": 26 },
            "FJ": { "colorCode": 158, "name": 'FIJI', "lat": -18, "lat": 175 },
            "FK": { "colorCode": 163, "name": 'FALKLAND ISLANDS (MALVINAS)', "lat": -51.75, "lat": -59 },
            "FM": { "colorCode": 184, "name": 'MICRONESIA, FEDERATED STATES OF', "lat": 6.9167, "lat": 158.25 },
            "FO": { "colorCode": 178, "name": 'FAROE ISLANDS', "lat": 62, "lat": -7 },
            "FR": { "colorCode": 3, "name": 'FRANCE', "lat": 46, "lat": 2 },
            "GA": { "colorCode": 119, "name": 'GABON', "lat": -1, "lat": 11.75 },
            "GB": { "colorCode": 77, "name": 'UNITED KINGDOM', "lat": 54, "lat": -2 },
            "GD": { "colorCode": 197, "name": 'GRENADA', "lat": 12.1167, "lat": -61.6667 },
            "GE": { "colorCode": 89, "name": 'GEORGIA', "lat": 42, "lat": 43.5 },
            "GG": { "colorCode": 217, "name": 'GUERNSEY', "lat": 49.5, "lat": -2.56 },
            "GH": { "colorCode": 34, "name": 'GHANA', "lat": 8, "lat": -2 },
            "GI": { "colorCode": 222, "name": 'GIBRALTAR', "lat": 36.1833, "lat": -5.3667 },
            "GL": { "colorCode": 55, "name": 'GREENLAND', "lat": 72, "lat": -40 },
            "GM": { "colorCode": 164, "name": 'GAMBIA', "lat": 13.4667, "lat": -16.5667 },
            "GN": { "colorCode": 80, "name": 'GUINEA', "lat": 11, "lat": -10 },
            "GP": { "colorCode": 3, "name": 'FRANCE', "lat": 46, "lat": 2 },
            "GQ": { "colorCode": 101, "name": 'EQUATORIAL GUINEA', "lat": 2, "lat": 10 },
            "GR": { "colorCode": 140, "name": 'GREECE', "lat": 39, "lat": 22 },
            "GT": { "colorCode": 64, "name": 'GUATEMALA', "lat": 15.5, "lat": -90.25 },
            "GU": { "colorCode": 227, "name": 'GUAM', "lat": 13.4667, "lat": 144.7833 },
            "GW": { "colorCode": 33, "name": 'GUINEA-BISSAU', "lat": 12, "lat": -15 },
            "GY": { "colorCode": 99, "name": 'GUYANA', "lat": 5, "lat": -59 },
            "HK": { "colorCode": 96, "name": 'CHINA', "lat": 35, "lat": 105 },
            "HN": { "colorCode": 125, "name": 'HONDURAS', "lat": 15, "lat": -86.5 },
            "HR": { "colorCode": 54, "name": 'CROATIA', "lat": 45.1667, "lat": 15.5 },
            "HT": { "colorCode": 93, "name": 'HAITI', "lat": 19, "lat": -72.4167 },
            "HU": { "colorCode": 120, "name": 'HUNGARY', "lat": 47, "lat": 20 },
            "ID": { "colorCode": 7, "name": 'INDONESIA', "lat": -5, "lat": 120 },
            "IE": { "colorCode": 81, "name": 'IRELAND', "lat": 53, "lat": -8 },
            "IL": { "colorCode": 137, "name": 'ISRAEL', "lat": 31.5, "lat": 34.75 },
            "IM": { "colorCode": 226, "name": 'ISLE OF MAN', "lat": 54.23, "lat": -4.55 },
            "IN": { "colorCode": 95, "name": 'INDIA', "lat": 20, "lat": 77 },
            "IQ": { "colorCode": 53, "name": 'IRAQ', "lat": 33, "lat": 44 },
            "IR": { "colorCode": 61, "name": 'IRAN, ISLAMIC REPUBLIC OF', "lat": 32, "lat": 53 },
            "IS": { "colorCode": 126, "name": 'ICELAND', "lat": 65, "lat": -18 },
            "IT": { "colorCode": 28, "name": 'ITALY', "lat": 42.8333, "lat": 12.8333 },
            "JE": { "colorCode": 214, "name": 'JERSEY', "lat": 49.21, "lat": -2.13 },
            "JM": { "colorCode": 166, "name": 'JAMAICA', "lat": 18.25, "lat": -77.5 },
            "JO": { "colorCode": 20, "name": 'JORDAN', "lat": 31, "lat": 36 },
            "JP": { "colorCode": 40, "name": 'JAPAN', "lat": 36, "lat": 138 },
            "KE": { "colorCode": 18, "name": 'KENYA', "lat": 1, "lat": 38 },
            "KG": { "colorCode": 72, "name": 'KYRGYZSTAN', "lat": 41, "lat": 75 },
            "KH": { "colorCode": 123, "name": 'CAMBODIA', "lat": 13, "lat": 105 },
            "KI": { "colorCode": 183, "name": 'KIRIBATI', "lat": 1.4167, "lat": 173 },
            "KM": { "colorCode": 176, "name": 'COMOROS', "lat": -12.1667, "lat": 44.25 },
            "KN": { "colorCode": 201, "name": 'SAINT KITTS AND NEVIS', "lat": 17.3333, "lat": -62.75 },
            "KP": { "colorCode": 139, "name": 'KOREA, DEMOCRATIC PEOPLE\'S REPUBLIC OF', "lat": 40, "lat": 127 },
            "KR": { "colorCode": 124, "name": 'KOREA, REPUBLIC OF', "lat": 37, "lat": 127.5 },
            "KW": { "colorCode": 159, "name": 'KUWAIT', "lat": 29.3375, "lat": 47.6581 },
            "KY": { "colorCode": 200, "name": 'CAYMAN ISLANDS', "lat": 19.5, "lat": -80.5 },
            "KZ": { "colorCode": 151, "name": 'KAZAKHSTAN', "lat": 48, "lat": 68 },
            "LA": { "colorCode": 138, "name": 'LAO PEOPLE\'S DEMOCRATIC REPUBLIC', "lat": 18, "lat": 105 },
            "LB": { "colorCode": 147, "name": 'LEBANON', "lat": 33.8333, "lat": 35.8333 },
            "LC": { "colorCode": 194, "name": 'SAINT LUCIA', "lat": 13.8833, "lat": -61.1333 },
            "LI": { "colorCode": 211, "name": 'LIECHTENSTEIN', "lat": 47.1667, "lat": 9.5333 },
            "LK": { "colorCode": 136, "name": 'SRI LANKA', "lat": 7, "lat": 81 },
            "LR": { "colorCode": 130, "name": 'LIBERIA', "lat": 6.5, "lat": -9.5 },
            "LS": { "colorCode": 102, "name": 'LESOTHO', "lat": -29.5, "lat": 28.5 },
            "LT": { "colorCode": 134, "name": 'LITHUANIA', "lat": 56, "lat": 24 },
            "LU": { "colorCode": 175, "name": 'LUXEMBOURG', "lat": 49.75, "lat": 6.1667 },
            "LV": { "colorCode": 58, "name": 'LATVIA', "lat": 57, "lat": 25 },
            "LY": { "colorCode": 4, "name": 'LIBYA', "lat": 25, "lat": 17 },
            "MA": { "colorCode": 129, "name": 'MOROCCO', "lat": 32, "lat": -5 },
            "MC": { "colorCode": 224, "name": 'MONACO', "lat": 43.7333, "lat": 7.4 },
            "MD": { "colorCode": 146, "name": 'MOLDOVA, REPUBLIC OF', "lat": 47, "lat": 29 },
            "ME": { "colorCode": 112, "name": 'MONTENEGRO', "lat": 42, "lat": 19 },
            "MG": { "colorCode": 9, "name": 'MADAGASCAR', "lat": -20, "lat": 47 },
            "MH": { "colorCode": 209, "name": 'MARSHALL ISLANDS', "lat": 9, "lat": 168 },
            "MK": { "colorCode": 15, "name": 'MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF', "lat": 41.8333, "lat": 22 },
            "ML": { "colorCode": 26, "name": 'MALI', "lat": 17, "lat": -4 },
            "MM": { "colorCode": 62, "name": 'MYANMAR', "lat": 22, "lat": 98 },
            "MN": { "colorCode": 155, "name": 'MONGOLIA', "lat": 46, "lat": 105 },
            "MP": { "colorCode": 187, "name": 'NORTHERN MARIANA ISLANDS', "lat": 15.2, "lat": 145.75 },
            "MR": { "colorCode": 46, "name": 'MAURITANIA', "lat": 20, "lat": -12 },
            "MS": { "colorCode": 202, "name": 'MONTSERRAT', "lat": 16.75, "lat": -62.2 },
            "MT": { "colorCode": 198, "name": 'MALTA', "lat": 35.8333, "lat": 14.5833 },
            "MU": { "colorCode": 177, "name": 'MAURITIUS', "lat": -20.2833, "lat": 57.55 },
            "MV": { "colorCode": 199, "name": 'MALDIVES', "lat": 3.25, "lat": 73 },
            "MW": { "colorCode": 121, "name": 'MALAWI', "lat": -13.5, "lat": 34 },
            "MX": { "colorCode": 21, "name": 'MEXICO', "lat": 23, "lat": -102 },
            "MY": { "colorCode": 107, "name": 'MALAYSIA', "lat": 2.5, "lat": 112.5 },
            "MZ": { "colorCode": 39, "name": 'MOZAMBIQUE', "lat": -18.25, "lat": 35 },
            "NA": { "colorCode": 85, "name": 'NAMIBIA', "lat": -22, "lat": 17 },
            "NC": { "colorCode": 157, "name": 'NEW CALEDONIA', "lat": -21.5, "lat": 165.5 },
            "NE": { "colorCode": 56, "name": 'NIGER', "lat": 16, "lat": 8 },
            "NG": { "colorCode": 82, "name": 'NIGERIA', "lat": 10, "lat": 8 },
            "NI": { "colorCode": 127, "name": 'NICARAGUA', "lat": 13, "lat": -85 },
            "NL": { "colorCode": 131, "name": 'NETHERLANDS', "lat": 52.5, "lat": 5.75 },
            "NO": { "colorCode": 145, "name": 'NORWAY', "lat": 62, "lat": 10 },
            "NP": { "colorCode": 148, "name": 'NEPAL', "lat": 28, "lat": 84 },
            "NR": { "colorCode": 221, "name": 'NAURU', "lat": -0.5333, "lat": 166.9167 },
            "NU": { "colorCode": 204, "name": 'NIUE', "lat": -19.0333, "lat": -169.8667 },
            "NZ": { "colorCode": 41, "name": 'NEW ZEALAND', "lat": -41, "lat": 174 },
            "OM": { "colorCode": 74, "name": 'OMAN', "lat": 21, "lat": 57 },
            "PA": { "colorCode": 75, "name": 'PANAMA', "lat": 9, "lat": -80 },
            "PE": { "colorCode": 1, "name": 'PERU', "lat": -10, "lat": -76 },
            "PF": { "colorCode": 173, "name": 'FRENCH POLYNESIA', "lat": -15, "lat": -140 },
            "PG": { "colorCode": 52, "name": 'PAPUA NEW GUINEA', "lat": -6, "lat": 147 },
            "PH": { "colorCode": 108, "name": 'PHILIPPINES', "lat": 13, "lat": 122 },
            "PK": { "colorCode": 6, "name": 'PAKISTAN', "lat": 30, "lat": 70 },
            "PL": { "colorCode": 84, "name": 'POLAND', "lat": 52, "lat": 20 },
            "PM": { "colorCode": 205, "name": 'SAINT PIERRE AND MIQUELON', "lat": 46.8333, "lat": -56.3333 },
            "PN": { "colorCode": 223, "name": 'PITCAIRN', "lat": -24.7, "lat": -127.4 },
            "PR": { "colorCode": 168, "name": 'PUERTO RICO', "lat": 18.25, "lat": -66.5 },
            "PS": { "colorCode": 169, "name": 'PALESTINIAN TERRITORY, OCCUPIED', "lat": 32, "lat": 35.25 },
            "PT": { "colorCode": 44, "name": 'PORTUGAL', "lat": 39.5, "lat": -8 },
            "PW": { "colorCode": 188, "name": 'PALAU', "lat": 7.5, "lat": 134.5 },
            "PY": { "colorCode": 79, "name": 'PARAGUAY', "lat": -23, "lat": -58 },
            "QA": { "colorCode": 165, "name": 'QATAR', "lat": 25.5, "lat": 51.25 },
            "RE": { "colorCode": 3, "name": 'FRANCE', "lat": 46, "lat": 2 },
            "RO": { "colorCode": 59, "name": 'ROMANIA', "lat": 46, "lat": 25 },
            "RS": { "colorCode": 111, "name": 'SERBIA', "lat": 44, "lat": 21 },
            "RU": { "colorCode": 92, "name": 'RUSSIAN FEDERATION', "lat": 60, "lat": 100 },
            "RW": { "colorCode": 114, "name": 'RWANDA', "lat": -2, "lat": 30 },
            "SA": { "colorCode": 90, "name": 'SAUDI ARABIA', "lat": 25, "lat": 45 },
            "SB": { "colorCode": 73, "name": 'SOLOMON ISLANDS', "lat": -8, "lat": 159 },
            "SC": { "colorCode": 189, "name": 'SEYCHELLES', "lat": -4.5833, "lat": 55.6667 },
            "SD": { "colorCode": 49, "name": 'SUDAN', "lat": 15, "lat": 30 },
            "SE": { "colorCode": 36, "name": 'SWEDEN', "lat": 62, "lat": 15 },
            "SG": { "colorCode": 228, "name": 'SINGAPORE', "lat": 1.3667, "lat": 103.8 },
            "SH": { "colorCode": 213, "name": 'SAINT HELENA, ASCENSION AND TRISTAN DA CUNHA', "lat": -15.9333, "lat": -5.7 },
            "SI": { "colorCode": 144, "name": 'SLOVENIA', "lat": 46, "lat": 15 },
            "SK": { "colorCode": 133, "name": 'SLOVAKIA', "lat": 48.6667, "lat": 19.5 },
            "SL": { "colorCode": 25, "name": 'SIERRA LEONE', "lat": 8.5, "lat": -11.5 },
            "SM": { "colorCode": 218, "name": 'SAN MARINO', "lat": 43.7667, "lat": 12.4167 },
            "SN": { "colorCode": 116, "name": 'SENEGAL', "lat": 14, "lat": -14 },
            "SO": { "colorCode": 29, "name": 'SOMALIA', "lat": 10, "lat": 49 },
            "SR": { "colorCode": 65, "name": 'SURINAME', "lat": 4, "lat": -56 },
            "ST": { "colorCode": 179, "name": 'SAO TOME AND PRINCIPE', "lat": 1, "lat": 7 },
            "SV": { "colorCode": 98, "name": 'EL SALVADOR', "lat": 13.8333, "lat": -88.9167 },
            "SY": { "colorCode": 71, "name": 'SYRIAN ARAB REPUBLIC', "lat": 35, "lat": 38 },
            "SZ": { "colorCode": 153, "name": 'SWAZILAND', "lat": -26.5, "lat": 31.5 },
            "TC": { "colorCode": 192, "name": 'TURKS AND CAICOS ISLANDS', "lat": 21.75, "lat": -71.5833 },
            "TD": { "colorCode": 68, "name": 'CHAD', "lat": 15, "lat": 19 },
            "TG": { "colorCode": 117, "name": 'TOGO', "lat": 8, "lat": 1.1667 },
            "TH": { "colorCode": 50, "name": 'THAILAND', "lat": 15, "lat": 100 },
            "TJ": { "colorCode": 122, "name": 'TAJIKISTAN', "lat": 39, "lat": 71 },
            "TL": { "colorCode": 160, "name": 'TIMOR-LESTE', "lat": -8.55, "lat": 125.5167 },
            "TM": { "colorCode": 141, "name": 'TURKMENISTAN', "lat": 40, "lat": 60 },
            "TN": { "colorCode": 83, "name": 'TUNISIA', "lat": 34, "lat": 9 },
            "TO": { "colorCode": 182, "name": 'TONGA', "lat": -20, "lat": -175 },
            "TR": { "colorCode": 37, "name": 'TURKEY', "lat": 39, "lat": 35 },
            "TT": { "colorCode": 171, "name": 'TRINIDAD AND TOBAGO', "lat": 11, "lat": -61 },
            "TV": { "colorCode": 220, "name": 'TUVALU', "lat": -8, "lat": 178 },
            "TW": { "colorCode": 19, "name": 'TAIWAN', "lat": 23.5, "lat": 121 },
            "TZ": { "colorCode": 88, "name": 'TANZANIA, UNITED REPUBLIC OF', "lat": -6, "lat": 35 },
            "UA": { "colorCode": 17, "name": 'UKRAINE', "lat": 49, "lat": 32 },
            "UG": { "colorCode": 38, "name": 'UGANDA', "lat": 1, "lat": 32 },
            "US": { "colorCode": 150, "name": 'UNITED STATES', "lat": 38, "lat": -97 },
            "UY": { "colorCode": 109, "name": 'URUGUAY', "lat": -33, "lat": -56 },
            "UZ": { "colorCode": 154, "name": 'UZBEKISTAN', "lat": 41, "lat": 64 },
            "VA": { "colorCode": 225, "name": 'HOLY SEE (VATICAN CITY STATE)', "lat": 41.9, "lat": 12.45 },
            "VC": { "colorCode": 193, "name": 'SAINT VINCENT AND THE GRENADINES', "lat": 13.25, "lat": -61.2 },
            "VE": { "colorCode": 43, "name": 'VENEZUELA, BOLIVARIAN REPUBLIC OF', "lat": 8, "lat": -66 },
            "VG": { "colorCode": 212, "name": 'VIRGIN ISLANDS, BRITISH', "lat": 18.5, "lat": -64.5 },
            "VI": { "colorCode": 196, "name": 'VIRGIN ISLANDS, U.S.', "lat": 18.3333, "lat": -64.8333 },
            "VN": { "colorCode": 91, "name": 'VIET NAM', "lat": 16, "lat": 106 },
            "VU": { "colorCode": 162, "name": 'VANUATU', "lat": -16, "lat": 167 },
            "WF": { "colorCode": 207, "name": 'WALLIS AND FUTUNA', "lat": -13.3, "lat": -176.2 },
            "WS": { "colorCode": 174, "name": 'SAMOA', "lat": -13.5833, "lat": -172.3333 },
            "YE": { "colorCode": 8, "name": 'YEMEN', "lat": 15, "lat": 48 },
            "YT": { "colorCode": 195, "name": 'MAYOTTE', "lat": -12.8333, "lat": 45.1667 },
            "ZA": { "colorCode": 86, "name": 'SOUTH AFRICA', "lat": -29, "lat": 24 },
            "ZM": { "colorCode": 60, "name": 'ZAMBIA', "lat": -15, "lat": 30 },
            "ZW": { "colorCode": 135, "name": 'ZIMBABWE', "lat": -20, "lat": 30 }
        }   

    def get_decimal(self, dms_str):
        dms_str = re.sub(r'\s', '', dms_str)

        sign = -1 if re.search('[swSW]', dms_str) else 1

        numbers = [*filter(len, re.split('\D+', dms_str, maxsplit=4))]

        degree = numbers[0]
        minute = numbers[1] if len(numbers) >= 2 else '0'
        second = numbers[2] if len(numbers) >= 3 else '0'
        frac_seconds = numbers[3] if len(numbers) >= 4 else '0'

        second += "." + frac_seconds

        return sign * (int(degree) + float(minute) / 60 + float(second) / 3600)

    def get_country_code(self, location):
        location = '/'.join(location.split(" / ")).split("/")[1]
        possible_codes = []
        for code, meta in self.country_lookup.items():
            if code in location.upper():
                possible_codes.append(code)
            if location.upper() in meta['name']:
                possible_codes.append(code)

        return list(set(possible_codes))

    def geocode(self, location):
        # GISAID metadata outputs location strings in reverse order
        location = location.split(" / ")
        location = reversed(location)
        location = ", ".join(location)

        # https://api.opencagedata.com/geocode/v1/json?q=MYSTRING&key=377c209c0f2541928b02f2b8d07ed70a
        url = "https://api.opencagedata.com/geocode/v1/json?q={}&key={}".format(location, self.API_KEY)
        res = requests.get(url)
        results = res.json()
        if len(results['results']) > 0:
            results = results['results'][0]['annotations']['DMS']

            lat_dms = results['lat']
            lon_dms = results['lng']

            lat_dec = self.get_decimal(lat_dms)
            lon_dec = self.get_decimal(lon_dms)

            coords = {
                'lat': lat_dec,
                'lng': lon_dec
            }

            return coords
        else:
            return {
                'lat': None,
                'lng': None
            }

    def get_geo_dist(self, c1, c2, unit):
        lat1 = c1['lat']
        lon1 = c1['lng']

        lat2 = c2['lat']
        lon2 = c2['lng']

        coords = [lat1, lon1, lat2, lon2]

        if lat1 != None and lon1 != None and lat2 != None and lon2 != None:
            if (lat1 == lat2) and (lon1 == lon2):
                return 0
            else:
                rad_lat1 = math.pi * lat1/180
                rad_lat2 = math.pi * lat2/180

                theta = lon1 - lon2
                rad_theta = math.pi * theta

                dist = np.sin(rad_lat1) * np.sin(rad_lat2) + np.cos(rad_lat1) * np.cos(rad_lat2) * np.cos(rad_theta)

                if dist > 1:
                    dist = 1
                
                dist = np.arccos(dist)
                dist = dist * 180/math.pi
                dist = dist * 60 * 1.1515

                if unit.upper() == "K":
                    dist = dist * 1.609344
                elif unit.upper() == "M":
                    dist = dist * 0.8684

                return dist
        else:
            return 0

class Tempest(object):
    def open_fasta(self, fasta_path):
        with open(fasta_path) as f:
            data = f.read().strip().split("\n")
            data = [data[i].strip() for i in range(len(data))]

        return data

    def is_header(self, line):
        if list(line)[0] == ">":
            return True

        return False

    def extract_fasta(self, fasta_path):
        data = self.open_fasta(fasta_path)
        instances = []
        final_covid = []

        for i in range(len(data)):
            line = data[i]

            if self.is_header(line):
                instances.append(line)
                j = i + 1
                seq = ""

                while True:
                    if j < len(data):
                        if not self.is_header(data[j]):
                            seq += data[j]
                            j += 1
                        else:
                            break
                    else:
                        break

                final_covid.append(seq)

        print ("Loaded all sequences.")
        return instances, final_covid

    def get_fasta_records(self, fasta_path):
        instances, final_covid = self.extract_fasta(fasta_path)
        records = []
        for i in range(len(instances)):
            header = instances[i]
            sequence = final_covid[i]
            records.append({
                "header": header,
                "sequence": sequence
            })

        return records

    def get_json_records(self, filepath):
        with open(filepath) as f:
            data = json.load(f)
        
        return data

    def save_dict(self, dic, filepath):
        with open(filepath, 'w') as f:
            json.dump(dic, f, indent=4, ensure_ascii=True)

    def json_to_fasta(self, dic, filepath):
        with open(filepath, "a") as f:
            for key, val in dic.items():
                f.write(">" + key + "\n")
                f.write(val + "\n")

    def merge_fastas(self, fasta1, fasta2, final_fasta):
        data1 = self.get_fasta_records(fasta1)
        data2 = self.get_fasta_records(fasta2)
        
        og_genomes = len(data1)
        new_genomes = len(data2)

        data1.extend(data2)

        print ("Original genomes: {} | New genomes: {} | Total: {}".format(og_genomes, new_genomes, len(data1)))

        with open(final_fasta, "w") as f:
            for i in range(len(data1)):
                f.write(data1[i]['header'] + "\n")
                f.write(data1[i]['sequence'] + "\n")

        print ("Merged two FASTA files. Final destination: '{}'".format(final_fasta))

    def jsonarr_to_fasta(self, json_arr, fasta_path):
        lines = []
        for i in range(len(json_arr)):
            cur = json_arr[i]
            lines.append(">" + cur['covv_virus_name'])
            lines.append(cur['sequence'].strip("\n"))
        
        with open(fasta_path, "a") as f:
            for i in range(len(lines)):
                f.write(lines[i] + "\n")

class Mutant(object):
    def extract_segment(self, sequence, start, end):
        """
        `sequences` is a list of nucleotide seqeuence strings.
        1 is subtracted from `start` and `end` because of indexing.
        7 is added to `start` and `end` because the alignment shifted the 
        original strain's first base by 7 units
        """
        start = start - 1 + 7
        end = end - 1 + 7

        sequence = list(sequence)
        
        return ''.join(sequence[start:end+1])

    def get_appr_translation(self, codon, table):
        codes = list(codon)
        c = codes.count("N")
        
        if c < 2:
            if self.check_codon(codes) == True:
                most_prob_codon = self.get_codon_ranking(codon, table)
                most_prob_aa = table[most_prob_codon]
                assert len(most_prob_aa) == 1, "Error in translating codon to amino acid"
                return most_prob_aa
        
        return "J" # placeholder for ambiguous codons

    def get_sim_score(self, codon, ref_codon):
        codon = list(codon)
        ref_codon = list(ref_codon)
        sim_score = 0
        for i in range(len(codon)):
            if codon[i] == ref_codon[i]:
                sim_score += 1
        
        return sim_score

    def get_codon_ranking(self, codon, table):
        rankings = []
        all_codons = list(table.keys())
        for i in range(len(all_codons)):
            sim = self.get_sim_score(codon, all_codons[i])
            rankings.append([sim, all_codons[i]])
        rankings = sorted(rankings, key=lambda x:x[0], reverse=True)

        # return most probable codon
        return rankings[0][1]

    def check_codon(self, codon):
        flags = [False, False, False]
        for i in range(len(codon)):
            if not codon[i].lower().isalpha():
                flags[i] = True

        if any(flags) == True:
            return False
        
        return True
        
    def translate(self, segment):
        segment = segment.upper()

        # ambiguous codes
        segment = segment.replace("W", "N")
        segment = segment.replace("Y", "N")
        segment = segment.replace("R", "N")
        segment = segment.replace("S", "N")
        segment = list(segment)

        protein = ""

        table = {"TTT" : "F", "CTT" : "L", "ATT" : "I", "GTT" : "V",
                 "TTC" : "F", "CTC" : "L", "ATC" : "I", "GTC" : "V",
                 "TTA" : "L", "CTA" : "L", "ATA" : "I", "GTA" : "V",
                 "TTG" : "L", "CTG" : "L", "ATG" : "M", "GTG" : "V",
                 "TCT" : "S", "CCT" : "P", "ACT" : "T", "GCT" : "A",
                 "TCC" : "S", "CCC" : "P", "ACC" : "T", "GCC" : "A",
                 "TCA" : "S", "CCA" : "P", "ACA" : "T", "GCA" : "A",
                 "TCG" : "S", "CCG" : "P", "ACG" : "T", "GCG" : "A",
                 "TAT" : "Y", "CAT" : "H", "AAT" : "N", "GAT" : "D",
                 "TAC" : "Y", "CAC" : "H", "AAC" : "N", "GAC" : "D",
                 "TAA" : "*", "CAA" : "Q", "AAA" : "K", "GAA" : "E",
                 "TAG" : "*", "CAG" : "Q", "AAG" : "K", "GAG" : "E",
                 "TGT" : "C", "CGT" : "R", "AGT" : "S", "GGT" : "G",
                 "TGC" : "C", "CGC" : "R", "AGC" : "S", "GGC" : "G",
                 "TGA" : "*", "CGA" : "R", "AGA" : "R", "GGA" : "G",
                 "TGG" : "W", "CGG" : "R", "AGG" : "R", "GGG" : "G" 
                }

        for i in range(0, len(segment), 3):
            cur_seg = segment[i:i+3]
            if self.check_codon(cur_seg):
                if any(cur_seg) not in ["A", "C", "T", "G", "a", "c", "t", "g"]:
                    proc_dna = self.get_appr_translation(cur_seg, table)
                    protein += proc_dna
                else:
                    dna = table[''.join(cur_seg)]
                    protein += dna
            else:
                protein += "*"
        
        return protein
    
    def get_mutations(self, og_strain, ref_strain, start, protein_name):
        mutations = []
        
        og_strain = list(og_strain)
        ref_strain = list(ref_strain)

        for i in range(len(og_strain)):
            if og_strain[i] != ref_strain[i]:
                if og_strain[i] == "J" or ref_strain[i] == "J":
                    pass
                else:
                    # point mutation index does not consider alignment shift of 7 units
                    # point mutation index is for unaligned amino acid sequence
                    mut = og_strain[i] + str(start + i + 1) + ref_strain[i]
                    mut = protein_name + "_" + mut
                    if "*" not in mut: # ignore ambiguous mutations
                        mutations.append(mut)
            
        return mutations

    def get_nuc_diff(self, s1, s2):
        s1 = list(s1)
        s2 = list(s2)

        num_nuc_diff = 0

        for i in range(len(s1)):
            # ignore '-' and 'n' comparisons
            if s1[i].lower() in ['a', 't', 'c', 'g'] and s2[i].lower() in ['a', 't', 'c', 'g']:
                if s1[i] != s2[i]:
                    num_nuc_diff += 1

        return num_nuc_diff