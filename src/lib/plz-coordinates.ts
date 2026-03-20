// Swiss PLZ → coordinates lookup (major postal codes)
// Covers ~95% of Swiss population centers

const PLZ_COORDS: Record<number, [number, number]> = {
  // Waadt / Vaud
  1000: [46.5197, 6.6323], // Lausanne
  1003: [46.5197, 6.6323], 1004: [46.5197, 6.6323], 1005: [46.5197, 6.6323],
  1006: [46.5197, 6.6323], 1007: [46.5197, 6.6323], 1010: [46.5197, 6.6323],
  1012: [46.5197, 6.6323], 1018: [46.5197, 6.6323],
  1020: [46.5381, 6.5905], // Renens
  1022: [46.5548, 6.5788], // Chavannes
  1024: [46.5456, 6.6093], // Ecublens
  1030: [46.5395, 6.6588], // Bussigny
  1040: [46.5558, 6.7393], // Echallens
  1052: [46.5741, 6.7125], // Le Mont
  1066: [46.5607, 6.7668], // Epalinges
  1070: [46.5547, 6.7309], // Puidoux
  1110: [46.4815, 6.4421], // Morges
  1170: [46.4587, 6.3836], // Aubonne
  1196: [46.4296, 6.3581], // Gland
  1200: [46.2044, 6.1432], // Genève
  1201: [46.2044, 6.1432], 1202: [46.2044, 6.1432], 1203: [46.2044, 6.1432],
  1204: [46.2044, 6.1432], 1205: [46.2044, 6.1432], 1206: [46.2044, 6.1432],
  1207: [46.2044, 6.1432], 1208: [46.2044, 6.1432], 1209: [46.2044, 6.1432],
  1210: [46.2044, 6.1432], 1211: [46.2044, 6.1432], 1212: [46.2044, 6.1432],
  1213: [46.1855, 6.0785], // Onex
  1214: [46.1766, 6.0948], // Vernier
  1215: [46.2165, 6.1006], // Genève Aéroport
  1216: [46.1797, 6.1321], // Cointrin
  1217: [46.2255, 6.0808], // Meyrin
  1218: [46.1879, 6.1615], // Le Grand-Saconnex
  1219: [46.1948, 6.0730], // Aïre
  1220: [46.2139, 6.0590], // Les Avanchets
  1222: [46.2238, 6.1223], // Vésenaz
  1223: [46.2355, 6.0620], // Cologny
  1224: [46.2139, 6.0590], // Chêne-Bougeries
  1225: [46.1899, 6.1864], // Chêne-Bourg
  1226: [46.1787, 6.1820], // Thônex
  1227: [46.1817, 6.1515], // Carouge
  1228: [46.1626, 6.1336], // Plan-les-Ouates
  1230: [46.1718, 6.0866], // Carouge area
  1260: [46.3804, 6.2384], // Nyon
  1290: [46.3588, 6.2313], // Versoix
  1300: [46.5196, 6.5032], // Éclépens / Renens area
  1350: [46.7169, 6.5242], // Orbe
  // Freiburg / Fribourg
  1400: [46.7700, 6.6413], // Yverdon-les-Bains
  1530: [46.8961, 6.9296], // Payerne
  1580: [46.8855, 6.9461], // Avenches
  1700: [46.8065, 7.1620], // Fribourg
  1701: [46.8065, 7.1620], 1708: [46.8065, 7.1620],
  1720: [46.7662, 7.1074], // Corminboeuf
  1752: [46.7843, 7.1486], // Villars-sur-Glâne
  1800: [46.4613, 6.8426], // Vevey
  1815: [46.4348, 6.9143], // Clarens
  1820: [46.4529, 6.8536], // Montreux/Territet
  // Wallis / Valais
  1870: [46.2583, 6.9641], // Monthey
  1890: [46.3010, 6.9468], // St-Maurice
  1900: [46.2278, 7.3600], // Martigny
  1920: [46.2278, 7.3600], // Martigny area
  1950: [46.2333, 7.3612], // Sion
  1951: [46.2333, 7.3612],
  // Neuenburg / Neuchâtel
  2000: [46.9900, 6.9293], // Neuchâtel
  2016: [46.9628, 6.8533], // Cortaillod
  2034: [46.9628, 6.8533], // Peseux
  2068: [46.9628, 6.8533], // Hauterive
  2074: [46.9628, 6.8533], // Marin
  2114: [46.9425, 6.6800], // Fleurier
  // Bern
  2300: [47.0501, 6.9963], // La Chaux-de-Fonds
  2400: [47.0628, 6.7468], // Le Locle
  2500: [47.1368, 7.2467], // Biel/Bienne
  2501: [47.1368, 7.2467], 2502: [47.1368, 7.2467], 2503: [47.1368, 7.2467],
  2504: [47.1368, 7.2467], 2505: [47.1368, 7.2467],
  2540: [47.1952, 7.3648], // Grenchen
  2560: [47.1724, 7.2177], // Nidau
  2600: [47.1951, 7.3131], // Solothurn area
  2740: [47.2938, 7.3203], // Moutier
  2800: [47.3647, 7.3491], // Delémont
  3000: [46.9480, 7.4474], // Bern
  3001: [46.9480, 7.4474], 3003: [46.9480, 7.4474], 3004: [46.9480, 7.4474],
  3005: [46.9480, 7.4474], 3006: [46.9480, 7.4474], 3007: [46.9480, 7.4474],
  3008: [46.9480, 7.4474], 3010: [46.9480, 7.4474], 3011: [46.9480, 7.4474],
  3012: [46.9480, 7.4474], 3013: [46.9480, 7.4474], 3014: [46.9480, 7.4474],
  3015: [46.9480, 7.4474], 3018: [46.9480, 7.4474], 3019: [46.9480, 7.4474],
  3020: [46.9292, 7.4625], // Bern area
  3027: [46.9480, 7.4474], 3030: [46.9480, 7.4474],
  3038: [46.9292, 7.4625], // Kirchlindach
  3042: [46.9292, 7.4625], // Ortschwaben
  3063: [46.9292, 7.4625], // Ittigen
  3072: [46.9240, 7.4961], // Ostermundigen
  3073: [46.8927, 7.4888], // Gümligen
  3084: [46.8990, 7.5243], // Wabern
  3098: [46.8841, 7.4308], // Köniz
  3110: [46.8437, 7.5072], // Münsingen
  3122: [46.8160, 7.4983], // Kehrsatz
  3150: [46.8437, 7.5072], // Schwarzenburg
  3172: [46.8437, 7.5072], // Niederwangen
  3176: [46.8610, 7.3647], // Neuenegg
  3178: [46.8610, 7.3647], // Bösingen
  3250: [46.8841, 7.3308], // Lyss
  3270: [46.8841, 7.3308], // Aarberg
  3280: [46.9000, 7.1167], // Murten
  3400: [47.0502, 7.5673], // Burgdorf
  3414: [47.0825, 7.6319], // Oberburg
  3422: [47.0700, 7.6500], // Kirchberg
  3454: [47.0825, 7.6319], // Sumiswald
  3600: [46.7583, 7.6282], // Thun
  3604: [46.7583, 7.6282], 3608: [46.7583, 7.6282],
  3612: [46.7583, 7.6282], // Steffisburg
  3700: [46.6863, 7.8586], // Spiez
  3706: [46.6863, 7.8586], // Leissigen
  3714: [46.6863, 7.8586], // Frutigen
  3770: [46.5540, 7.8780], // Zweisimmen
  3800: [46.6863, 7.8586], // Interlaken
  3806: [46.6905, 7.8722], // Bönigen
  3812: [46.5873, 7.9087], // Wilderswil
  3818: [46.5873, 7.9087], // Grindelwald
  3900: [46.3163, 7.9781], // Brig
  3930: [46.3088, 7.6361], // Visp
  3945: [46.2990, 7.5960], // Gampel
  3960: [46.3084, 7.5355], // Sierre
  3963: [46.2840, 7.5210], // Crans-Montana
  // Basel
  4000: [47.5596, 7.5886], // Basel
  4001: [47.5596, 7.5886], 4002: [47.5596, 7.5886], 4003: [47.5596, 7.5886],
  4004: [47.5596, 7.5886], 4005: [47.5596, 7.5886], 4007: [47.5596, 7.5886],
  4008: [47.5596, 7.5886], 4009: [47.5596, 7.5886], 4010: [47.5596, 7.5886],
  4051: [47.5596, 7.5886], 4052: [47.5596, 7.5886], 4053: [47.5596, 7.5886],
  4054: [47.5596, 7.5886], 4055: [47.5596, 7.5886], 4056: [47.5596, 7.5886],
  4057: [47.5596, 7.5886], 4058: [47.5596, 7.5886], 4059: [47.5596, 7.5886],
  4101: [47.5279, 7.5735], // Binningen
  4102: [47.5279, 7.5735],
  4103: [47.5263, 7.5597], // Bottmingen
  4104: [47.5082, 7.5735], // Oberwil
  4105: [47.5082, 7.5735], // Biel-Benken
  4106: [47.5082, 7.5735], // Therwil
  4107: [47.5082, 7.5735], // Ettingen
  4123: [47.4752, 7.5064], // Allschwil
  4125: [47.5279, 7.6235], // Riehen
  4127: [47.5279, 7.6235], // Birsfelden
  4132: [47.4752, 7.6064], // Muttenz
  4133: [47.4752, 7.6064], // Pratteln
  4142: [47.4542, 7.6558], // Münchenstein
  4144: [47.4316, 7.6817], // Arlesheim
  4153: [47.4820, 7.6888], // Reinach
  4242: [47.4150, 7.5100], // Laufen
  4310: [47.4930, 7.8433], // Rheinfelden
  4410: [47.4543, 7.6946], // Liestal
  4414: [47.4543, 7.6946], // Füllinsdorf
  4416: [47.4543, 7.6946], // Bubendorf
  4450: [47.4543, 7.6946], // Sissach
  // Solothurn
  4500: [47.2060, 7.5371], // Solothurn
  4502: [47.2060, 7.5371],
  4528: [47.1849, 7.5939], // Zuchwil
  4532: [47.1927, 7.6232], // Feldbrunnen
  4542: [47.2040, 7.5650], // Luterbach
  4600: [47.3143, 7.7961], // Olten
  4612: [47.3143, 7.7961], // Wangen
  4614: [47.3143, 7.7961], // Hägendorf
  4616: [47.3143, 7.7961], // Kappel
  4710: [47.2833, 7.6167], // Balsthal
  4800: [47.2451, 7.8956], // Zofingen
  // Aargau
  4900: [47.2440, 7.8710], // Langenthal
  5000: [47.3905, 8.0458], // Aarau
  5001: [47.3905, 8.0458], 5004: [47.3905, 8.0458],
  5012: [47.3905, 8.0458], // Schönenwerd
  5014: [47.3905, 8.0458], // Gretzenbach
  5015: [47.3905, 8.0458], // Erlinsbach
  5017: [47.4059, 7.9953], // Barmelweid
  5022: [47.3905, 8.0458], // Rombach
  5024: [47.3905, 8.0458], // Küttigen
  5032: [47.3905, 8.0458], // Rohr
  5034: [47.3905, 8.0458], // Suhr
  5035: [47.3905, 8.0458], // Unterentfelden
  5036: [47.3905, 8.0458], // Oberentfelden
  5040: [47.3905, 8.0458], // Schöftland
  5200: [47.4814, 8.2124], // Brugg
  5210: [47.4814, 8.2124], // Windisch
  5242: [47.5107, 8.1517], // Birr
  5243: [47.5107, 8.1517], // Mülligen
  5300: [47.4628, 8.1765], // Turgi
  5400: [47.4810, 8.2089], // Baden
  5401: [47.4810, 8.2089],
  5408: [47.4810, 8.2089], // Ennetbaden
  5412: [47.4810, 8.2089], // Gebenstorf
  5415: [47.4810, 8.2089], // Nussbaumen
  5430: [47.4810, 8.2089], // Wettingen
  5432: [47.4810, 8.2089], // Neuenhof
  5436: [47.4810, 8.2089], // Würenlos
  5443: [47.4810, 8.2089], // Niederrohrdorf
  5500: [47.3883, 8.1536], // Lenzburg
  5502: [47.3883, 8.1536], // Hunzenschwil
  5506: [47.3883, 8.1536], // Mägenwil
  5600: [47.3883, 8.1536], // Lenzburg area
  5610: [47.4017, 8.2897], // Wohlen
  5620: [47.3715, 8.2610], // Bremgarten
  5630: [47.3715, 8.2610], // Muri
  5734: [47.3174, 8.1762], // Reinach
  5742: [47.3174, 8.1762], // Kölliken
  // Luzern
  6000: [47.0502, 8.3093], // Luzern
  6002: [47.0502, 8.3093], 6003: [47.0502, 8.3093], 6004: [47.0502, 8.3093],
  6005: [47.0502, 8.3093], 6006: [47.0502, 8.3093], 6009: [47.0502, 8.3093],
  6010: [47.0445, 8.2757], // Kriens
  6012: [47.0445, 8.2757], // Obernau
  6014: [47.0445, 8.2757], // Luzern area
  6015: [47.0445, 8.2757], // Reussbühl
  6020: [47.0502, 8.3093], // Emmenbrücke
  6023: [47.0795, 8.3020], // Rothenburg
  6030: [47.0795, 8.3020], // Ebikon
  6032: [47.0795, 8.3020], // Emmen
  6034: [47.0795, 8.3020], // Inwil
  6036: [47.0795, 8.3020], // Dierikon
  6037: [47.0795, 8.3020], // Root
  6038: [47.0795, 8.3020], // Honau
  6042: [47.0795, 8.3020], // Dietwil
  6048: [47.0445, 8.2757], // Horw
  6052: [47.0445, 8.2757], // Hergiswil
  6060: [46.9965, 8.2510], // Sarnen
  6110: [47.1315, 8.1805], // Wolhusen
  6130: [47.1824, 8.1061], // Willisau
  6210: [47.1663, 8.3139], // Sursee
  6260: [47.2032, 8.2036], // Reiden
  6300: [47.1756, 8.5145], // Zug
  6301: [47.1756, 8.5145], 6302: [47.1756, 8.5145], 6303: [47.1756, 8.5145],
  6312: [47.1756, 8.5145], // Steinhausen
  6314: [47.1756, 8.5145], // Unterägeri
  6330: [47.2046, 8.5196], // Cham
  6340: [47.2046, 8.5196], // Baar
  6343: [47.1636, 8.5856], // Rotkreuz
  6370: [47.0019, 8.5120], // Stans
  // Schwyz
  6410: [47.0221, 8.6576], // Goldau
  6414: [47.0221, 8.6576], // Arth
  6418: [47.0221, 8.6576], // Rothenthurm
  6422: [47.0390, 8.6870], // Steinen
  6430: [47.0227, 8.7437], // Schwyz
  6440: [46.9819, 8.6413], // Brunnen
  6460: [46.8763, 8.6444], // Altdorf
  6490: [46.8763, 8.6444], // Andermatt
  // Tessin / Ticino
  6500: [46.1685, 8.7999], // Bellinzona
  6512: [46.1685, 8.7999], // Giubiasco
  6528: [46.1685, 8.7999], // Camorino
  6600: [46.1711, 8.7949], // Locarno
  6612: [46.1711, 8.7949], // Ascona
  6614: [46.1711, 8.7949], // Brissago
  6616: [46.1711, 8.7949], // Losone
  6648: [46.1711, 8.7949], // Minusio
  6653: [46.1711, 8.7949], // Verscio
  6670: [46.1711, 8.7949], // Avegno
  6710: [46.1685, 8.7999], // Biasca
  6760: [46.2961, 8.8517], // Faido
  6802: [46.1685, 8.7999], // Rivera
  6810: [46.0037, 8.9511], // Isone
  6815: [46.0037, 8.9511], // Melide
  6828: [45.8474, 8.9516], // Balerna
  6830: [45.8543, 9.0204], // Chiasso
  6850: [45.8474, 8.9516], // Mendrisio
  6900: [46.0037, 8.9511], // Lugano
  6901: [46.0037, 8.9511], 6903: [46.0037, 8.9511], 6904: [46.0037, 8.9511],
  6906: [46.0037, 8.9511], 6907: [46.0037, 8.9511],
  6912: [46.0037, 8.9511], // Pazzallo
  6914: [46.0037, 8.9511], // Carona
  6916: [46.0037, 8.9511], // Grancia
  6917: [46.0037, 8.9511], // Barbengo
  6918: [46.0037, 8.9511], // Figino
  6919: [46.0037, 8.9511], // Carabietta
  6924: [46.0037, 8.9511], // Sorengo
  6928: [46.0037, 8.9511], // Manno
  6933: [46.0037, 8.9511], // Muzzano
  6934: [46.0037, 8.9511], // Bioggio
  6942: [46.0037, 8.9511], // Savosa
  6950: [46.0037, 8.9511], // Tesserete
  // Graubünden / Grisons
  7000: [46.8499, 9.5329], // Chur
  7001: [46.8499, 9.5329], 7002: [46.8499, 9.5329],
  7004: [46.8499, 9.5329],
  7013: [46.8499, 9.5329], // Domat/Ems
  7014: [46.8499, 9.5329], // Trin
  7015: [46.8499, 9.5329], // Tamins
  7016: [46.8499, 9.5329], // Trin Mulin
  7017: [46.8499, 9.5329], // Flims
  7018: [46.8499, 9.5329], // Flims Waldhaus
  7023: [46.8499, 9.5329], // Haldenstein
  7026: [46.8499, 9.5329], // Maladers
  7050: [46.7735, 9.8412], // Arosa
  7056: [46.8499, 9.5329], // Molinis
  7062: [46.8499, 9.5329], // Passugg
  7074: [46.8499, 9.5329], // Malix
  7075: [46.8499, 9.5329], // Churwalden
  7078: [46.7530, 9.6800], // Lenzerheide
  7260: [46.8832, 9.8393], // Davos
  7270: [46.8832, 9.8393], // Davos Platz
  7500: [46.4908, 10.0007], // St. Moritz
  7502: [46.4908, 10.0007], // Bever
  7503: [46.4908, 10.0007], // Samedan
  7504: [46.4908, 10.0007], // Pontresina
  7505: [46.4908, 10.0007], // Celerina
  7514: [46.4908, 10.0007], // Sils
  7522: [46.4908, 10.0007], // La Punt
  7524: [46.4908, 10.0007], // Zuoz
  7530: [46.4908, 10.0007], // Zernez
  7550: [46.4908, 10.0007], // Scuol
  // Zürich
  8000: [47.3769, 8.5417], // Zürich
  8001: [47.3769, 8.5417], 8002: [47.3769, 8.5417], 8003: [47.3769, 8.5417],
  8004: [47.3769, 8.5417], 8005: [47.3769, 8.5417], 8006: [47.3769, 8.5417],
  8008: [47.3769, 8.5417], 8010: [47.3769, 8.5417], 8032: [47.3769, 8.5417],
  8037: [47.3769, 8.5417], 8038: [47.3769, 8.5417], 8040: [47.3769, 8.5417],
  8041: [47.3769, 8.5417], 8044: [47.3769, 8.5417], 8045: [47.3769, 8.5417],
  8046: [47.3769, 8.5417], 8047: [47.3769, 8.5417], 8048: [47.3769, 8.5417],
  8049: [47.3769, 8.5417], 8050: [47.3769, 8.5417], 8051: [47.3769, 8.5417],
  8052: [47.3769, 8.5417], 8053: [47.3769, 8.5417], 8055: [47.3769, 8.5417],
  8057: [47.3769, 8.5417], 8063: [47.3769, 8.5417], 8064: [47.3769, 8.5417],
  8102: [47.3534, 8.5087], // Oberengstringen
  8103: [47.3534, 8.5087], // Unterengstringen
  8104: [47.3534, 8.5087], // Weiningen
  8105: [47.3534, 8.5087], // Regensdorf
  8106: [47.3534, 8.5087], // Adlikon
  8107: [47.4262, 8.4628], // Buchs
  8108: [47.3534, 8.5087], // Dällikon
  8112: [47.3193, 8.5254], // Otelfingen
  8114: [47.3193, 8.5254], // Dänikon
  8118: [47.3193, 8.5254], // Pfaffhausen
  8121: [47.3193, 8.5254], // Benglen
  8122: [47.3193, 8.5254], // Binz
  8123: [47.3493, 8.5937], // Ebmatingen
  8124: [47.3493, 8.5937], // Maur
  8125: [47.3493, 8.5937], // Zollikerberg
  8126: [47.3493, 8.5937], // Zumikon
  8127: [47.3493, 8.5937], // Forch
  8132: [47.3089, 8.5693], // Egg
  8134: [47.2924, 8.5654], // Adliswil
  8135: [47.2924, 8.5654], // Langnau am Albis
  8136: [47.2924, 8.5654], // Gattikon
  8152: [47.4143, 8.4513], // Glattbrugg
  8153: [47.4143, 8.4513], // Rümlang
  8154: [47.4143, 8.4513], // Oberglatt
  8157: [47.4493, 8.4344], // Dielsdorf
  8180: [47.4493, 8.4344], // Bülach
  8184: [47.4493, 8.4344], // Bachenbülach
  8185: [47.4493, 8.4344], // Winkel
  8200: [47.6965, 8.6345], // Schaffhausen
  8201: [47.6965, 8.6345], 8203: [47.6965, 8.6345], 8207: [47.6965, 8.6345],
  8212: [47.6698, 8.6371], // Neuhausen
  8240: [47.6698, 8.6371], // Thayngen
  8245: [47.6898, 8.4300], // Feuerthalen
  8247: [47.6698, 8.6371], // Flurlingen
  8260: [47.6698, 8.6371], // Stein am Rhein
  8280: [47.6206, 8.8586], // Kreuzlingen
  8302: [47.4528, 8.5844], // Kloten
  8303: [47.4143, 8.5513], // Bassersdorf
  8304: [47.4143, 8.5513], // Wallisellen
  8305: [47.4143, 8.5513], // Dietlikon
  8306: [47.4143, 8.5513], // Brüttisellen
  8307: [47.4143, 8.5513], // Effretikon
  8310: [47.4143, 8.5513], // Kemptthal
  8320: [47.4143, 8.5513], // Fehraltorf
  8330: [47.4143, 8.5513], // Pfäffikon
  8332: [47.3535, 8.7175], // Russikon
  8340: [47.4143, 8.5513], // Hinwil
  8352: [47.4623, 8.6992], // Elsau
  8353: [47.4623, 8.6992], // Elgg
  8400: [47.4978, 8.7243], // Winterthur
  8401: [47.4978, 8.7243], 8402: [47.4978, 8.7243], 8404: [47.4978, 8.7243],
  8405: [47.4978, 8.7243], 8406: [47.4978, 8.7243], 8408: [47.4978, 8.7243],
  8409: [47.4978, 8.7243], 8410: [47.4978, 8.7243], 8411: [47.4978, 8.7243],
  8412: [47.4978, 8.7243], 8413: [47.4978, 8.7243], 8414: [47.4978, 8.7243],
  8500: [47.5535, 8.8920], // Frauenfeld
  8501: [47.5535, 8.8920],
  8505: [47.5535, 8.8920], // Pfyn
  8510: [47.5535, 8.8920], // Frauenfeld area
  8520: [47.5535, 8.8920], // Stettfurt
  8570: [47.5924, 9.1761], // Weinfelden
  8580: [47.5535, 8.8920], // Amriswil
  8590: [47.6052, 9.1082], // Romanshorn
  8600: [47.3227, 8.7228], // Dübendorf
  8602: [47.3227, 8.7228],
  8603: [47.3227, 8.7228], // Schwerzenbach
  8604: [47.3227, 8.7228], // Volketswil
  8606: [47.3227, 8.7228], // Greifensee
  8610: [47.3551, 8.7315], // Uster
  8614: [47.3551, 8.7315], // Bertschikon
  8620: [47.2655, 8.7271], // Wetzikon
  8623: [47.2655, 8.7271], // Wetzikon area
  8625: [47.2655, 8.7271], // Gossau
  8626: [47.2655, 8.7271], // Ottikon
  8630: [47.2267, 8.7255], // Rüti
  8700: [47.2603, 8.7227], // Küsnacht
  8702: [47.3093, 8.5744], // Zollikon
  8704: [47.3093, 8.5744], // Herrliberg
  8706: [47.3093, 8.5744], // Meilen
  8707: [47.3093, 8.5744], // Uetikon
  8708: [47.3093, 8.5744], // Männedorf
  8712: [47.2424, 8.6363], // Stäfa
  8800: [47.2031, 8.7517], // Thalwil
  8802: [47.1730, 8.7272], // Kilchberg
  8803: [47.1730, 8.7272], // Rüschlikon
  8804: [47.2244, 8.8036], // Au
  8805: [47.2244, 8.8036], // Richterswil
  8810: [47.2244, 8.8036], // Horgen
  8820: [47.2244, 8.8036], // Wädenswil
  8834: [47.1314, 8.7524], // Schindellegi
  8840: [47.2244, 8.8036], // Einsiedeln
  8853: [47.1314, 8.7524], // Lachen
  8854: [47.1314, 8.7524], // Siebnen
  8855: [47.1314, 8.7524], // Nuolen
  8856: [47.1314, 8.7524], // Tuggen
  8857: [47.1314, 8.7524], // Vorderthal
  8862: [47.1314, 8.7524], // Schübelbach
  8864: [47.1314, 8.7524], // Reichenburg
  8866: [47.1314, 8.7524], // Ziegelbrücke
  8867: [47.1314, 8.7524], // Niederurnen
  8872: [47.1314, 8.7524], // Weesen
  8890: [47.1314, 8.7524], // Flums
  8898: [47.1314, 8.7524], // Flumserberg
  8902: [47.3320, 8.5810], // Urdorf
  8903: [47.3320, 8.5810], // Birmensdorf
  8904: [47.3320, 8.5810], // Aesch
  8906: [47.3320, 8.5810], // Bonstetten
  8907: [47.3320, 8.5810], // Wettswil
  8910: [47.2527, 8.4740], // Affoltern am Albis
  8952: [47.3769, 8.4217], // Schlieren
  8953: [47.3769, 8.4217], // Dietikon
  8954: [47.3769, 8.4217], // Geroldswil
  8955: [47.3769, 8.4217], // Oetwil
  // St. Gallen
  9000: [47.4245, 9.3767], // St. Gallen
  9001: [47.4245, 9.3767], 9004: [47.4245, 9.3767], 9006: [47.4245, 9.3767],
  9007: [47.4245, 9.3767], 9008: [47.4245, 9.3767], 9010: [47.4245, 9.3767],
  9011: [47.4245, 9.3767], 9012: [47.4245, 9.3767], 9013: [47.4245, 9.3767],
  9014: [47.4245, 9.3767], 9015: [47.4245, 9.3767], 9016: [47.4245, 9.3767],
  9032: [47.4245, 9.3767], // Engelburg
  9034: [47.4245, 9.3767], // Eggersriet
  9042: [47.3800, 9.3000], // Speicher
  9043: [47.3624, 9.4085], // Trogen
  9050: [47.3624, 9.4085], // Appenzell
  9053: [47.3624, 9.4085], // Teufen
  9055: [47.3624, 9.4085], // Bühler
  9056: [47.3624, 9.4085], // Gais
  9062: [47.3624, 9.4085], // Lustmühle
  9100: [47.3800, 9.3100], // Herisau
  9200: [47.4543, 9.3113], // Gossau SG
  9230: [47.4543, 9.3113], // Flawil
  9240: [47.5247, 9.1655], // Uzwil
  9300: [47.4760, 9.1842], // Wittenbach
  9320: [47.4760, 9.1842], // Arbon
  9400: [47.4335, 9.3975], // Rorschach
  9410: [47.4335, 9.3975], // Heiden
  9424: [47.3400, 9.4700], // Rheineck
  9430: [47.3400, 9.4700], // St. Margrethen
  9435: [47.3400, 9.4700], // Heerbrugg
  9450: [47.3400, 9.4700], // Altstätten
  9470: [47.1734, 9.4435], // Buchs SG
  9471: [47.1734, 9.4435], // Buchs area
  9475: [47.1734, 9.4435], // Sevelen
  9490: [47.1734, 9.4435], // Vaduz area
  9500: [47.5247, 9.0642], // Wil SG
  9532: [47.5247, 9.0642], // Rickenbach
  9533: [47.5247, 9.0642], // Kirchberg SG
  9542: [47.5247, 9.0642], // Münchwilen
  9545: [47.5247, 9.0642], // Wängi
  9548: [47.5247, 9.0642], // Matzingen
  9602: [47.4543, 9.3113], // Bazenheid
  9620: [47.2300, 9.2800], // Lichtensteig
  9630: [47.2300, 9.2800], // Wattwil
  9642: [47.2300, 9.2800], // Ebnat-Kappel
  9650: [47.2300, 9.2800], // Nesslau
  9700: [47.3400, 9.4700], // Altstätten area
  9800: [47.3400, 9.4700], // Thal
  // Genève extras
  1231: [46.1503, 6.1053], // Conches
  1232: [46.1503, 6.1053], // Confignon
  1233: [46.1503, 6.1053], // Bernex
  1234: [46.1503, 6.1053], // Vessy
  1236: [46.1503, 6.1053], // Cartigny
  1239: [46.1503, 6.1053], // Collex
  1241: [46.2044, 6.1432], // Puplinge
  1242: [46.2044, 6.1432], // Satigny
  1243: [46.2044, 6.1432], // Presinge
  1244: [46.2044, 6.1432], // Choulex
  1245: [46.2044, 6.1432], // Collonge-Bellerive
  1246: [46.2044, 6.1432], // Corsier
  1247: [46.2044, 6.1432], // Anières
  1248: [46.2044, 6.1432], // Hermance
  1251: [46.2044, 6.1432], // Gy
  1252: [46.2044, 6.1432], // Meinier
  1253: [46.2044, 6.1432], // Vandoeuvres
  1254: [46.2044, 6.1432], // Jussy
  1255: [46.2044, 6.1432], // Veyrier
  1256: [46.2044, 6.1432], // Troinex
};

/**
 * Swiss city/town name → coordinates lookup (case-insensitive, supports French/German/Italian variants)
 */
const CITY_COORDS: Record<string, [number, number]> = {
  // Major cities — German names
  "zürich": [47.3769, 8.5417], "zurich": [47.3769, 8.5417],
  "bern": [46.9480, 7.4474], "berne": [46.9480, 7.4474],
  "basel": [47.5596, 7.5886], "bâle": [47.5596, 7.5886],
  "luzern": [47.0502, 8.3093], "lucerne": [47.0502, 8.3093],
  "st. gallen": [47.4245, 9.3767], "st.gallen": [47.4245, 9.3767], "saint-gall": [47.4245, 9.3767],
  "winterthur": [47.4978, 8.7243], "winterthour": [47.4978, 8.7243],
  "lausanne": [46.5197, 6.6323],
  "genève": [46.2044, 6.1432], "genf": [46.2044, 6.1432], "geneva": [46.2044, 6.1432], "geneve": [46.2044, 6.1432],
  "lugano": [46.0037, 8.9511],
  "biel": [47.1368, 7.2467], "bienne": [47.1368, 7.2467],
  "thun": [46.7583, 7.6282], "thoune": [46.7583, 7.6282],
  "fribourg": [46.8065, 7.1620], "freiburg": [46.8065, 7.1620],
  "schaffhausen": [47.6965, 8.6345],
  "chur": [46.8499, 9.5329], "coire": [46.8499, 9.5329],
  "neuchâtel": [46.9900, 6.9293], "neuenburg": [46.9900, 6.9293], "neuchatel": [46.9900, 6.9293],
  "sion": [46.2333, 7.3612], "sitten": [46.2333, 7.3612],
  "aarau": [47.3905, 8.0458],
  "olten": [47.3143, 7.7961],
  "solothurn": [47.2060, 7.5371], "soleure": [47.2060, 7.5371],
  "zug": [47.1756, 8.5145], "zoug": [47.1756, 8.5145],
  "frauenfeld": [47.5535, 8.8920],
  "baden": [47.4810, 8.2089],
  "davos": [46.8832, 9.8393],
  "interlaken": [46.6863, 7.8586],
  // Medium cities
  "uster": [47.3551, 8.7315],
  "köniz": [46.8841, 7.4308], "koniz": [46.8841, 7.4308],
  "emmen": [47.0795, 8.3020],
  "kriens": [47.0445, 8.2757],
  "rapperswil": [47.2267, 8.8255], "rapperswil-jona": [47.2267, 8.8255],
  "wetzikon": [47.2655, 8.7271],
  "dübendorf": [47.3227, 8.7228], "dubendorf": [47.3227, 8.7228],
  "dietikon": [47.3769, 8.4217],
  "wädenswil": [47.2244, 8.8036], "wadenswil": [47.2244, 8.8036],
  "horgen": [47.2244, 8.8036],
  "kloten": [47.4528, 8.5844],
  "wil": [47.5247, 9.0642],
  "arbon": [47.4760, 9.1842],
  "weinfelden": [47.5924, 9.1761],
  "kreuzlingen": [47.6206, 8.8586],
  "romanshorn": [47.6052, 9.1082],
  "gossau": [47.4543, 9.3113],
  "herisau": [47.3800, 9.3100],
  "appenzell": [47.3624, 9.4085],
  "buchs": [47.1734, 9.4435],
  "altstätten": [47.3400, 9.4700], "altstatten": [47.3400, 9.4700],
  "rorschach": [47.4335, 9.3975],
  "liestal": [47.4543, 7.6946],
  "reinach": [47.4820, 7.6888],
  "muttenz": [47.4752, 7.6064],
  "pratteln": [47.4752, 7.6064],
  "allschwil": [47.4752, 7.5064],
  "binningen": [47.5279, 7.5735],
  "riehen": [47.5279, 7.6235],
  "burgdorf": [47.0502, 7.5673],
  "langenthal": [47.2440, 7.8710],
  "grenchen": [47.1952, 7.3648],
  "lenzburg": [47.3883, 8.1536],
  "brugg": [47.4814, 8.2124],
  "wohlen": [47.4017, 8.2897],
  "wettingen": [47.4810, 8.2089],
  "rheinfelden": [47.4930, 7.8433],
  "sursee": [47.1663, 8.3139],
  "willisau": [47.1824, 8.1061],
  "stans": [47.0019, 8.5120],
  "schwyz": [47.0227, 8.7437],
  "altdorf": [46.8763, 8.6444],
  "sarnen": [46.9965, 8.2510],
  "glarus": [47.0404, 9.0683],
  "delémont": [47.3647, 7.3491], "delemont": [47.3647, 7.3491],
  "bellinzona": [46.1685, 8.7999], "bellenz": [46.1685, 8.7999],
  "locarno": [46.1711, 8.7949],
  "chiasso": [45.8543, 9.0204],
  "mendrisio": [45.8474, 8.9516],
  "martigny": [46.2278, 7.3600],
  "monthey": [46.2583, 6.9641],
  "sierre": [46.3084, 7.5355], "siders": [46.3084, 7.5355],
  "visp": [46.3088, 7.6361],
  "brig": [46.3163, 7.9781],
  "nyon": [46.3804, 6.2384],
  "morges": [46.4815, 6.4421],
  "vevey": [46.4613, 6.8426],
  "montreux": [46.4529, 6.8536],
  "yverdon": [46.7700, 6.6413], "yverdon-les-bains": [46.7700, 6.6413],
  "renens": [46.5381, 6.5905],
  "la chaux-de-fonds": [47.0501, 6.9963],
  "le locle": [47.0628, 6.7468],
  "payerne": [46.8961, 6.9296],
  "murten": [46.8000, 7.1167], "morat": [46.8000, 7.1167],
  "spiez": [46.6863, 7.8586],
  "moutier": [47.2938, 7.3203],
  // Smaller towns commonly seen in listings
  "aadorf": [47.4920, 8.9010],
  "embrach": [47.5065, 8.5943],
  "diepoldsau": [47.3874, 9.6530],
  "bülach": [47.5215, 8.5404], "bulach": [47.5215, 8.5404],
  "volketswil": [47.3900, 8.6800],
  "effretikon": [47.4283, 8.6883],
  "illnau": [47.4100, 8.7200],
  "pfäffikon": [47.3647, 8.7843], "pfaffikon": [47.3647, 8.7843],
  "baar": [47.2046, 8.5196],
  "cham": [47.2046, 8.5196],
  "horw": [47.0445, 8.2757],
  "ebikon": [47.0795, 8.3020],
  "root": [47.0795, 8.3020],
  "küsnacht": [47.2603, 8.7227], "kusnacht": [47.2603, 8.7227],
  "meilen": [47.3093, 8.5744],
  "stäfa": [47.2424, 8.6363], "stafa": [47.2424, 8.6363],
  "thalwil": [47.2031, 8.7517],
  "adliswil": [47.2924, 8.5654],
  "treyvaux": [46.7500, 7.1167],
  "carouge": [46.1817, 6.1515],
  "vernier": [46.1766, 6.0948],
  "meyrin": [46.2255, 6.0808],
  "lancy": [46.1879, 6.1115],
  "onex": [46.1855, 6.0785],
  "thônex": [46.1787, 6.1820], "thonex": [46.1787, 6.1820],
  "plan-les-ouates": [46.1626, 6.1336],
  "ostermundigen": [46.9240, 7.4961],
  "münsingen": [46.8437, 7.5072], "munsingen": [46.8437, 7.5072],
  "steffisburg": [46.7720, 7.6300],
  "lyss": [47.0742, 7.3067],
  "nidau": [47.1320, 7.2370],
  "suhr": [47.3730, 8.0800],
  "oberentfelden": [47.3580, 8.0500],
  "gränichen": [47.3600, 8.1000], "granichen": [47.3600, 8.1000],
  "zofingen": [47.2880, 7.9460],
  "goldau": [47.0490, 8.5470],
  "einsiedeln": [47.1270, 8.7470],
  "arosa": [46.7735, 9.8412],
  "flims": [46.8270, 9.2830],
  "lenzerheide": [46.7530, 9.6800],
  "st. moritz": [46.4908, 10.0007],
  "pontresina": [46.4950, 9.9000],
  "scuol": [46.7960, 10.2970],
  "ascona": [46.1580, 8.7720],
  "crans-montana": [46.2840, 7.5210],
  "verbier": [46.0970, 7.2280],
  "zermatt": [46.0207, 7.7491],
  "grindelwald": [46.6240, 8.0340],
  "gstaad": [46.4750, 7.2870],
  "engelberg": [46.8190, 8.4060],
  "andermatt": [46.6340, 8.5940],
  // Smaller Romandie / Westschweiz towns
  "thierrens": [46.6800, 6.7900],
  "venthône": [46.3200, 7.5300], "venthone": [46.3200, 7.5300],
  "châtel-saint-denis": [46.5250, 6.9000], "chatel-saint-denis": [46.5250, 6.9000],
  "châtel-st-denis": [46.5250, 6.9000], "chatel-st-denis": [46.5250, 6.9000],
  "gland": [46.4296, 6.3581],
  "leytron": [46.1900, 7.2100],
  "valais": [46.2333, 7.3612],
  "aproz": [46.2200, 7.3700],
  "estavayer": [46.8500, 6.8400], "estavayer-le-lac": [46.8500, 6.8400],
  "lens": [46.2800, 7.4400],
  "ollon": [46.2900, 6.9900],
  "savièse": [46.2500, 7.3500], "saviese": [46.2500, 7.3500],
  "bulle": [46.6200, 7.0600],
  "châtonnaye": [46.7400, 6.9400], "chatonnaye": [46.7400, 6.9400],
  "jura": [47.3647, 7.3491],
  "léchelles": [46.8400, 7.0600], "lechelles": [46.8400, 7.0600],
  "nendaz": [46.1900, 7.3000],
  "niederbipp": [47.2700, 7.7000],
  "moudon": [46.6700, 6.7900],
  "romont": [46.6900, 6.9100],
  "aigle": [46.3200, 6.9700],
  "bex": [46.2500, 7.0100],
  "villeneuve": [46.4000, 6.9300],
  "orbe": [46.7169, 6.5242],
  "cossonay": [46.6100, 6.5100],
  "echallens": [46.6400, 6.6300],
  "rolle": [46.4600, 6.3400],
  "coppet": [46.3200, 6.1900],
  "grandson": [46.8100, 6.6500],
  "avenches": [46.8800, 7.0400],
  "yvonand": [46.7900, 6.7400],
  "pully": [46.5100, 6.6600],
  "lutry": [46.5000, 6.6900],
  "cully": [46.4900, 6.7300],
  "rivaz": [46.4800, 6.7800],
  "villars-sur-glâne": [46.7800, 7.1400], "villars-sur-glane": [46.7800, 7.1400],
  "marly": [46.7800, 7.1600],
  "givisiez": [46.8100, 7.1400],
  "tafers": [46.8100, 7.2200],
  "düdingen": [46.8500, 7.1900], "dudingen": [46.8500, 7.1900],
  "flamatt": [46.8900, 7.3200],
  "schwarzenburg": [46.8200, 7.3400],
  "belp": [46.8900, 7.5000],
  "wimmis": [46.6700, 7.6400],
  "saxon": [46.1500, 7.1800],
  "troistorrents": [46.2300, 6.9200],
  "vionnaz": [46.3100, 6.9000],
  "val de travers": [46.9300, 6.6200],
  "sembrancher": [46.0800, 7.1500],
  "widnau": [47.4000, 9.6300],
  "viège": [46.3088, 7.6361], "viege": [46.3088, 7.6361],
  "suisse": [46.8000, 8.2000],
};

/**
 * Look up approximate coordinates for a Swiss PLZ.
 * Falls back to nearest hundred, then nearest thousand.
 * Returns null if no match found.
 */
export function getPlzCoordinates(plz: string): { lat: number; lng: number } | null {
  const p = parseInt(plz, 10);
  if (isNaN(p) || p < 1000 || p > 9999) return null;

  // Exact match
  if (PLZ_COORDS[p]) {
    return { lat: PLZ_COORDS[p][0], lng: PLZ_COORDS[p][1] };
  }

  // Try nearest hundred (e.g., 8037 → 8000)
  const hundred = Math.floor(p / 100) * 100;
  if (PLZ_COORDS[hundred]) {
    return { lat: PLZ_COORDS[hundred][0], lng: PLZ_COORDS[hundred][1] };
  }

  // Try nearest thousand (e.g., 8537 → 8500)
  const thousand = Math.floor(p / 1000) * 1000;
  if (PLZ_COORDS[thousand]) {
    return { lat: PLZ_COORDS[thousand][0], lng: PLZ_COORDS[thousand][1] };
  }

  return null;
}

/**
 * Look up coordinates by city/town name.
 * Case-insensitive, supports German/French/Italian variants.
 */
export function getCityCoordinates(city: string): { lat: number; lng: number } | null {
  if (!city || city.length < 2) return null;
  const normalized = city.toLowerCase().trim();
  const coords = CITY_COORDS[normalized];
  if (coords) {
    return { lat: coords[0], lng: coords[1] };
  }
  return null;
}

// ─── Kanton name / abbreviation mapping ─────────────────────

const KANTON_ABBREV_TO_NAME: Record<string, string> = {
  ag: "Aargau", ai: "Appenzell Innerrhoden", ar: "Appenzell Ausserrhoden",
  be: "Bern", bl: "Basel-Landschaft", bs: "Basel-Stadt",
  fr: "Freiburg", ge: "Genf", gl: "Glarus", gr: "Graubünden",
  ju: "Jura", lu: "Luzern", ne: "Neuenburg", nw: "Nidwalden",
  ow: "Obwalden", sg: "St. Gallen", sh: "Schaffhausen", so: "Solothurn",
  sz: "Schwyz", tg: "Thurgau", ti: "Tessin", ur: "Uri",
  vd: "Waadt", vs: "Wallis", zg: "Zug", zh: "Zürich",
};

const KANTON_NAME_TO_ABBREV: Record<string, string> = {};
for (const [abbr, name] of Object.entries(KANTON_ABBREV_TO_NAME)) {
  KANTON_NAME_TO_ABBREV[name.toLowerCase()] = abbr;
}
// Additional aliases for crawler edge cases
KANTON_NAME_TO_ABBREV["appenzell a."] = "ar";
KANTON_NAME_TO_ABBREV["appenzell i."] = "ai";
KANTON_NAME_TO_ABBREV["st.gallen"] = "sg";
KANTON_NAME_TO_ABBREV["saint-gall"] = "sg";
KANTON_NAME_TO_ABBREV["genève"] = "ge";
KANTON_NAME_TO_ABBREV["vaud"] = "vd";
KANTON_NAME_TO_ABBREV["valais"] = "vs";
KANTON_NAME_TO_ABBREV["neuchâtel"] = "ne";
KANTON_NAME_TO_ABBREV["fribourg"] = "fr";
KANTON_NAME_TO_ABBREV["ticino"] = "ti";
KANTON_NAME_TO_ABBREV["grisons"] = "gr";
KANTON_NAME_TO_ABBREV["grigioni"] = "gr";
KANTON_NAME_TO_ABBREV["berne"] = "be";
KANTON_NAME_TO_ABBREV["lucerne"] = "lu";
KANTON_NAME_TO_ABBREV["zurich"] = "zh";
KANTON_NAME_TO_ABBREV["zürich"] = "zh";
KANTON_NAME_TO_ABBREV["basel"] = "bs";
KANTON_NAME_TO_ABBREV["basel-land"] = "bl";

/** Convert any kanton value (abbreviation, full name, or alias) to full name. */
export function kantonToFullName(value: string): string {
  if (!value) return "";
  const lower = value.toLowerCase().trim();
  // Already a full name?
  if (KANTON_NAME_TO_ABBREV[lower]) {
    const abbr = KANTON_NAME_TO_ABBREV[lower];
    return KANTON_ABBREV_TO_NAME[abbr] || value;
  }
  // Abbreviation?
  if (KANTON_ABBREV_TO_NAME[lower]) {
    return KANTON_ABBREV_TO_NAME[lower];
  }
  return value;
}

/** Convert any kanton value to its 2-letter abbreviation. */
export function kantonToAbbrev(value: string): string {
  if (!value) return "";
  const lower = value.toLowerCase().trim();
  if (KANTON_ABBREV_TO_NAME[lower]) return lower;
  if (KANTON_NAME_TO_ABBREV[lower]) return KANTON_NAME_TO_ABBREV[lower];
  return "";
}

/** City name → kanton full name lookup (common Swiss cities). */
const CITY_TO_KANTON: Record<string, string> = {
  zürich: "Zürich", zurich: "Zürich", winterthur: "Zürich", uster: "Zürich", dübendorf: "Zürich", dietikon: "Zürich",
  kloten: "Zürich", bülach: "Zürich", wädenswil: "Zürich", horgen: "Zürich", thalwil: "Zürich", opfikon: "Zürich",
  bern: "Bern", thun: "Bern", biel: "Bern", bienne: "Bern", burgdorf: "Bern", langenthal: "Bern",
  köniz: "Bern", ostermundigen: "Bern", münsingen: "Bern", spiez: "Bern", interlaken: "Bern", steffisburg: "Bern",
  luzern: "Luzern", lucerne: "Luzern", emmen: "Luzern", kriens: "Luzern", horw: "Luzern", sursee: "Luzern",
  uri: "Uri", altdorf: "Uri",
  schwyz: "Schwyz", einsiedeln: "Schwyz", freienbach: "Schwyz",
  sarnen: "Obwalden",
  stans: "Nidwalden",
  glarus: "Glarus",
  zug: "Zug", baar: "Zug", cham: "Zug",
  freiburg: "Freiburg", fribourg: "Freiburg", bulle: "Freiburg",
  solothurn: "Solothurn", olten: "Solothurn", grenchen: "Solothurn",
  basel: "Basel-Stadt",
  liestal: "Basel-Landschaft", allschwil: "Basel-Landschaft", reinach: "Basel-Landschaft", muttenz: "Basel-Landschaft", binningen: "Basel-Landschaft",
  schaffhausen: "Schaffhausen",
  herisau: "Appenzell Ausserrhoden", teufen: "Appenzell Ausserrhoden",
  appenzell: "Appenzell Innerrhoden",
  "st. gallen": "St. Gallen", "st.gallen": "St. Gallen", rapperswil: "St. Gallen", wil: "St. Gallen", gossau: "St. Gallen", buchs: "St. Gallen", rorschach: "St. Gallen",
  chur: "Graubünden", davos: "Graubünden", "st. moritz": "Graubünden",
  aarau: "Aargau", baden: "Aargau", wettingen: "Aargau", brugg: "Aargau", rheinfelden: "Aargau", lenzburg: "Aargau", wohlen: "Aargau",
  frauenfeld: "Thurgau", kreuzlingen: "Thurgau", amriswil: "Thurgau", weinfelden: "Thurgau", arbon: "Thurgau", aadorf: "Thurgau",
  lugano: "Tessin", bellinzona: "Tessin", locarno: "Tessin", mendrisio: "Tessin", chiasso: "Tessin",
  lausanne: "Waadt", montreux: "Waadt", vevey: "Waadt", nyon: "Waadt", morges: "Waadt", yverdon: "Waadt", renens: "Waadt",
  sion: "Wallis", sierre: "Wallis", visp: "Wallis", brig: "Wallis", martigny: "Wallis",
  "neuchâtel": "Neuenburg", neuchatel: "Neuenburg", "la chaux-de-fonds": "Neuenburg",
  "genève": "Genf", genf: "Genf", geneve: "Genf", carouge: "Genf", vernier: "Genf", lancy: "Genf", meyrin: "Genf", onex: "Genf",
  delémont: "Jura", delemont: "Jura",
  diepoldsau: "St. Gallen", embrach: "Zürich", widnau: "St. Gallen",
  // French city names (non-duplicates only)
  zoug: "Zug", berne: "Bern", bâle: "Basel-Stadt", "bale": "Basel-Stadt",
  monthey: "Wallis", saxon: "Wallis", lens: "Wallis", treyvaux: "Freiburg",
  aigle: "Waadt", villeneuve: "Waadt", pully: "Waadt", lutry: "Waadt",
  prilly: "Waadt", ecublens: "Waadt", crissier: "Waadt", bussigny: "Waadt",
  orbe: "Waadt", payerne: "Waadt", moudon: "Waadt", avenches: "Freiburg",
  romont: "Freiburg", "châtel-st-denis": "Freiburg",
  thônex: "Genf", thonex: "Genf", plan: "Genf", "grand-lancy": "Genf",
  "le locle": "Neuenburg", fleurier: "Neuenburg",
  porrentruy: "Jura", "saignelégier": "Jura", saignelegier: "Jura",
  conthey: "Wallis", naters: "Wallis", "brig-glis": "Wallis",
  collombey: "Wallis", "collombey-muraz": "Wallis", vouvry: "Wallis",
  "val-de-travers": "Neuenburg",
  soleure: "Solothurn", "saint-gall": "St. Gallen",
  coire: "Graubünden", bellinzone: "Tessin",
  schwytz: "Schwyz", thoune: "Bern",
  // Small Swiss villages / edge cases
  thierrens: "Waadt", troistorrents: "Wallis", niederbipp: "Bern",
  "savièse": "Wallis", saviese: "Wallis", valais: "Wallis", "canton du valais": "Wallis",
  estavayer: "Freiburg", "estavayer-le-lac": "Freiburg",
  "léchelles": "Freiburg", lechelles: "Freiburg",
  "venthône": "Wallis", venthone: "Wallis",
  "val de travers": "Neuenburg", sembrancher: "Wallis",
  jura: "Jura", "jura suisse": "Jura",
  ollon: "Waadt", leytron: "Wallis",
  "châtel-saint-denis": "Freiburg", "chatel-saint-denis": "Freiburg",
  aproz: "Wallis", gland: "Waadt", nendaz: "Wallis",
  "châtonnaye": "Freiburg", chatonnaye: "Freiburg",
  "viège": "Wallis", viege: "Wallis",
  suisse: "", // generic, can't determine kanton
};

/** Try to determine kanton from city name. Returns full name or "". */
export function kantonFromCity(city: string): string {
  if (!city) return "";
  const normalized = city.toLowerCase().trim();
  return CITY_TO_KANTON[normalized] || "";
}
