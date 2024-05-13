export type InitialStateType = {
  filter: string;
  recommended: [];
  startDate: string;
};

export const initialState: InitialStateType = {
  filter: '',
  recommended: [],
  startDate: '',
};

// Options
export const otherOptions = [
  {
    id: 1,
    label: 'Earliest take-off (DAC)',
    value: 'earliest-take-off',
  },
  {
    id: 2,
    label: 'Latest take-off (DAC)',
    value: 'latest-take-off',
  },
  {
    id: 3,
    label: 'Earliest landing (JFK)',
    value: 'earliest-landing',
  },
  {
    id: 4,
    label: 'Latest landing (JFK)',
    value: 'latest-landing',
  },
  {
    id: 5,
    label: 'Earliest take-off (JFK)',
    value: 'earliest-take-off-jfk',
  },
];

export const tags = [
  {
    name: 'Cheapest',
    value: '$89.2 • 21h 02m',
  },
  {
    name: 'Best',
    value: '$89.2 • 21h 02m',
  },
  {
    name: 'Quickest',
    value: '$71.49 • 19h 50m',
  },
];

export const recommendedData = [
  {
    id: '1',
    name: 'Hide 2+ stops',
    count: 105.0,
  },
];

export const stopsData = [
  {
    id: 1,
    name: 'Direct',
    count: 0,
  },
  {
    id: 2,
    name: '1 stop',
    count: 105.0,
  },
  {
    id: 3,
    name: '2 stop',
    count: 85.5,
  },
];

export const paymentMethods = [
  {
    id: 1,
    name: 'American Express',
  },
  {
    id: 2,
    name: 'Mobile Wallet',
  },
  {
    id: 3,
    name: 'Net Banking',
  },
  {
    id: 4,
    name: 'RuPay',
  },
  {
    id: 5,
    name: 'Diners Club',
  },
  {
    id: 6,
    name: 'UPI',
  },
  {
    id: 7,
    name: 'MasterCard Credit',
  },
  {
    id: 8,
    name: 'Visa Credit',
  },
  {
    id: 9,
    name: 'MasterCard Debit',
  },
  {
    id: 10,
    name: 'Visa Debit',
  },
];

export const airlinesData = [
  {
    id: 1,
    name: 'Multiple Airlines',
    tooltipText:
      'Select the option to see tickets that combine multiple airlines',
    count: 0,
  },
  {
    id: 2,
    name: 'Emirates',
    count: 105.0,
  },
  {
    id: 3,
    name: 'Etihad Airways',
    count: 85.5,
  },
  {
    id: 4,
    name: 'IndiGo',
    count: 125.5,
  },
  {
    id: 5,
    name: 'Qatar Airways',
    count: 125.5,
  },
  {
    id: 6,
    name: 'Turkish Airlines',
    count: 125.5,
  },
];

export const bookingData = [
  {
    id: 1,
    name: 'Airlines only',
    tooltipText: 'Book your ticket directly with the airline',
    count: 0,
  },
  {
    id: 2,
    name: 'Allegiant Airlines',
    count: 105.0,
  },
  {
    id: 3,
    name: 'Bravofly',
    count: 85.5,
  },
  {
    id: 4,
    name: 'British Airways',
    count: 125.5,
  },
  {
    id: 5,
    name: 'Qatar Airways',
    count: 125.5,
  },
  {
    id: 6,
    name: 'BudgetAir',
    count: 125.5,
  },
  {
    id: 7,
    name: 'Cathay Pacific',
    count: 125.5,
  },
];

export type LayoverAirPortOptionType = {
  id: number;
  name: string;
  isGroupTitle?: boolean;
  checked?: boolean;
  disabled?: boolean;
};

export const layoverAirportsData: LayoverAirPortOptionType[] = [
  { id: 1, name: 'United Arab Emirates', isGroupTitle: true },
  {
    id: 2,
    name: 'Abu Dhabi (AUH)',
  },
  {
    id: 3,
    name: 'Dubai (DXB)',
  },
  { id: 4, name: 'United States', isGroupTitle: true },
  {
    id: 5,
    name: 'Boston (BOS)',

    disabled: true,
  },
  {
    id: 6,
    name: 'Chicago (ORD)',

    disabled: true,
  },
  {
    id: 7,
    name: 'Dallas (DFW)',

    disabled: true,
  },
  {
    id: 8,
    name: 'Los Angeles (LAX)',
  },
  {
    id: 9,
    name: 'Miami (MIA)',
  },
  {
    id: 10,
    name: 'San Francisco (SFO)',
  },
  {
    id: 11,
    name: 'Singapore',
    isGroupTitle: true,
  },
  { id: 12, name: 'Singapore (SIN)', disabled: true },

  {
    id: 13,
    name: 'United Kingdom',
    isGroupTitle: true,
  },
  {
    id: 14,
    name: 'London (LGW)',
  },
  {
    id: 15,
    name: 'London (LHR)',
  },
  {
    id: 16,
    name: 'Manchester (MAN)',
  },
  {
    id: 17,
    name: 'Germany',
    isGroupTitle: true,
  },
  {
    id: 18,
    name: 'Frankfurt am Main (FRA)',
  },
  {
    id: 19,
    name: 'Sri Lanka',
    isGroupTitle: true,
  },
  {
    id: 20,
    name: 'Colombo (CMB)',
  },
];

export const roadTripData = [
  {
    id: 1,
    name: 'Round Way',
    value: 'round-way',
  },
  {
    id: 2,
    name: 'One Way',
    value: 'one-way',
  },
  {
    id: 3,
    name: 'Multi City',
    value: 'multi-city',
  },
];

export const modelData = [
  {
    tabName: 'Include',
    options: [
      {
        id: 1,
        name: 'Airbus A320neo',
      },
      {
        id: 2,
        name: 'Airbus A330neo',
      },
      {
        id: 3,
        name: 'Airbus A350',
      },
      {
        id: 4,
        name: 'Airbus A380',
      },
      {
        id: 5,
        name: 'Boeing 737 MAX',
      },
      {
        id: 6,
        name: 'Boeing 777',
      },
      {
        id: 7,
        name: 'Other',
      },
    ],
  },
  {
    tabName: 'Exclude',
    options: [
      {
        id: 1,
        name: 'Boeing 737 MAX',
      },
      {
        id: 2,
        name: 'Boeing 777',
      },
      {
        id: 3,
        name: 'Other',
      },
      {
        id: 4,
        name: 'Airbus A320neo',
      },
      {
        id: 5,
        name: 'Airbus A330neo',
      },
      {
        id: 6,
        name: 'Airbus A350',
      },
      {
        id: 7,
        name: 'Airbus A380',
      },
      {
        id: 8,
        name: 'Boeing 737 MAX',
      },
    ],
  },
];

export const locationData = [
  {
    id: '1',
    city: 'Abidjan',
    cityCode: 'ABJ',
    country: 'Ivory Coast',
    airport: 'Felix Houphouet Boigny Airport',
  },
  {
    id: '2',
    city: 'Dhaka',
    cityCode: 'DAC',
    country: 'Bangladesh',
    airport: 'Hazrat Shahjalal International Airport',
  },
  {
    id: '3',
    city: 'Adana',
    cityCode: 'ADA',
    country: 'Turkey',
    airport: 'Adana Airport',
  },
  {
    id: '4',
    city: 'Izmir',
    cityCode: 'ADB',
    country: 'Turkey',
    airport: 'Izmir Adnan Menderes Airport',
  },
  {
    id: '5',
    city: 'Malaga',
    cityCode: 'AGP',
    country: 'Spain',
    airport: 'Malaga Airport',
  },
  {
    id: '6',
    city: 'Almaty',
    cityCode: 'ALA',
    country: 'Kazakhstan',
    airport: 'Almaty International Airport',
  },
  {
    id: '7',
    city: 'Abu Dhabi',
    cityCode: 'AUH',
    country: 'United Arab Emirates',
    airport: 'Abu Dhabi International Airport',
  },
  {
    id: '8',
    city: 'Barcelona',
    cityCode: 'BCN',
    country: 'Spain',
    airport: 'Barcelona International Airport',
  },
];

export const flightListingData = [
  {
    id: 1,
    image: '/airlines-logo/allegiant-airlines.webp',
    title: 'Allegiant Airlines',
    price: '$540.40',
    meta: {
      model: 'Airbus A330-300',
      hours: '28h 05m',
      stop: '1 stop',
    },
    class: 'Business',
    bucket: {
      luggage: '40 kg',
      bag: '7 kg',
    },
    airlines: 'Allegiant Airlines',
    routes: {
      arrivalDate: 'Thu, July 13',
      arrivalTime: '9:45',
      departureDate: 'Thu, July 14',
      departureTime: '16:45',
      departureCityCode: ' LAX',
      departureCity: 'Los Angeles',
      departureTerminal: 'Los Angeles International Airport',
      arrivalCityCode: 'JFK',
      arrivalCity: 'New York',
      arrivalTerminal: 'New York John F. Kennedy International Airport',
      layover: [
        {
          layoverCityCode: 'DFW',
          layoverCity: 'Dallas',
          layoverTerminal: 'Dallas/Fort Worth International Airport',
          layoverTime: '2 hrs 45 mins Transit',
        },
      ],
    },
    cheapest: true,
    best: false,
    quickest: false,
  },
  {
    id: 2,
    image: '/airlines-logo/delta-airlines.webp',
    title: 'Delta Airlines',
    price: '$1540.40',
    meta: {
      model: 'Airbus A330-300',
      hours: '19h 05m',
      stop: '2 stop',
    },
    class: 'Business',
    bucket: {
      luggage: '40 kg',
      bag: '7 kg',
    },
    airlines: 'Delta Airlines',
    routes: {
      arrivalDate: 'Thu, July 13',
      arrivalTime: '9:45',
      departureDate: 'Thu, July 14',
      departureTime: '16:45',
      departureCityCode: 'ATL',
      departureCity: 'Atlanta',
      departureTerminal: 'Seattle-Tacoma International Airport',
      arrivalCityCode: 'SEA',
      arrivalCity: 'Seattle',
      arrivalTerminal: 'Abu Dhabi International Airport',
      layover: [
        {
          layoverCityCode: 'MSP',
          layoverCity: 'Minneapolis',
          layoverTerminal: 'Minneapolis-Saint Paul International Airport',
          layoverTime: '1 hr 30 mins Transit',
        },
      ],
    },
    cheapest: false,
    best: true,
    quickest: true,
  },
  {
    id: 3,
    image: '/airlines-logo/alaska-airlines.webp',
    title: 'Alaska Airlines',
    price: '$540.40',
    meta: {
      model: 'Airbus A430-400',
      hours: '34h 05m',
      stop: '2 stop',
    },
    class: 'Economy',
    bucket: {
      luggage: '40 kg',
      bag: '7 kg',
    },
    airlines: 'Alaska Airlines',
    routes: {
      arrivalDate: 'Thu, July 13',
      arrivalTime: '9:45',
      departureDate: 'Thu, July 14',
      departureTime: '16:45',
      departureCityCode: 'BWI',
      departureCity: 'Washington DC',
      departureTerminal:
        'Baltimore/Washington International Thurgood Marshall Airport',
      arrivalCityCode: 'LAX',
      arrivalCity: 'Las Vegas ',
      arrivalTerminal: 'Las Vegas McCarran International Airport',
      layover: [
        {
          layoverCityCode: 'DEN',
          layoverCity: 'Denver',
          layoverTerminal: 'Denver International Airport',
          layoverTime: '3 hr 30 mins Transit',
        },
      ],
    },
    cheapest: true,
    best: true,
    quickest: false,
  },
  {
    id: 4,
    image: '/airlines-logo/hawaiian-airlines.webp',
    title: 'Hawaiian Airlines',
    price: '$540.40',
    meta: {
      model: 'Airbus A430-400',
      hours: '8h 05m',
      stop: '2 stop',
    },
    class: 'Economy',
    bucket: {
      luggage: '40 kg',
      bag: '7 kg',
    },
    airlines: 'Hawaiian Airlines',
    routes: {
      arrivalDate: 'Thu, July 13',
      arrivalTime: '9:45',
      departureDate: 'Thu, July 14',
      departureTime: '16:45',
      departureCityCode: 'ORD',
      departureCity: 'Chicago',
      departureTerminal: "O'Hare International Airport",
      arrivalCityCode: 'SFO',
      arrivalCity: 'San Francisco',
      arrivalTerminal: 'San Francisco International Airport',
      layover: [
        {
          layoverCityCode: 'DEN',
          layoverCity: 'Denver',
          layoverTerminal: 'Denver International Airport',
          layoverTime: '1 hr 15 mins Transit',
        },
      ],
    },
    cheapest: true,
    best: true,
    quickest: false,
  },
  {
    id: 5,
    image: '/airlines-logo/jetblue-airlines.webp',
    title: 'Jetblue Airlines',
    price: '$540.40',
    meta: {
      model: 'Airbus A430-400',
      hours: '8h 05m',
      stop: '2 stop',
    },
    class: 'Business',
    bucket: {
      luggage: '40 kg',
      bag: '7 kg',
    },
    airlines: 'Jetblue Airlines',
    routes: {
      arrivalDate: 'Thu, July 13',
      arrivalTime: '9:45',
      departureDate: 'Thu, July 14',
      departureTime: '16:45',
      departureCityCode: 'BWI',
      departureCity: 'Washington DC',
      departureTerminal:
        'Baltimore/Washington International Thurgood Marshall Airport',
      arrivalCityCode: 'LAS',
      arrivalCity: 'Las Vegas',
      arrivalTerminal: 'Las Vegas McCarran International Airport',
      layover: [
        {
          layoverCityCode: 'DEN',
          layoverCity: 'Denver',
          layoverTerminal: 'Denver International Airport',
          layoverTime: '1 hr 30 mins Transit',
        },
      ],
    },
    cheapest: true,
    best: true,
    quickest: false,
  },
  {
    id: 6,
    image: '/airlines-logo/frontier-airlines.webp',
    title: 'Frontier Airlines',
    price: '$540.40',
    meta: {
      model: 'Airbus A430-400',
      hours: '8h 05m',
      stop: 'direct',
    },
    class: 'Business',
    bucket: {
      luggage: '40 kg',
      bag: '7 kg',
    },
    airlines: 'Frontier Airlines',
    routes: {
      arrivalDate: 'Thu, July 13',
      arrivalTime: '9:45',
      departureDate: 'Thu, July 14',
      departureTime: '16:45',
      departureCityCode: 'SEA',
      departureCity: 'Seattle',
      departureTerminal: 'Seattle-Tacoma International Airport',
      arrivalCityCode: 'SFO',
      arrivalCity: 'San Francisco',
      arrivalTerminal: 'San Francisco International Airport',
      layover: [
        {
          layoverCityCode: 'JFK',
          layoverCity: 'New York ',
          layoverTerminal: 'New York John F. Kennedy International Airport',
          layoverTime: '2 hrs 45 mins Transit',
        },
      ],
    },
    cheapest: true,
    best: true,
    quickest: false,
  },
  {
    id: 7,
    image: '/airlines-logo/canadian-north-airlines.webp',
    title: 'Canadian North Airlines',
    price: '$540.40',
    meta: {
      model: 'Airbus A330-300',
      hours: '28h 05m',
      stop: '1 stop',
    },
    class: 'Business',
    bucket: {
      luggage: '40 kg',
      bag: '7 kg',
    },
    airlines: 'Canadian North Airlines',
    routes: {
      arrivalDate: 'Thu, July 13',
      arrivalTime: '9:45',
      departureDate: 'Thu, July 14',
      departureTime: '16:45',
      departureCityCode: 'YYZ',
      departureCity: 'Mississauga',
      departureTerminal: 'Toronto Pearson International Airport',
      arrivalCityCode: 'YVR',
      arrivalCity: 'Richmond, British Columbia',
      arrivalTerminal: 'Vancouver International Airport',
      layover: [
        {
          layoverCityCode: 'YYC',
          layoverCity: 'Calgary, Alberta, Canada',
          layoverTerminal: 'Calgary International Airport',
          layoverTime: '1 hr 15 mins Transit',
        },
      ],
    },
    cheapest: true,
    best: false,
    quickest: false,
  },
  {
    id: 8,
    image: '/airlines-logo/air-transat.webp',
    title: 'Air Transat',
    price: '$1540.40',
    meta: {
      model: 'Airbus A330-300',
      hours: '19h 05m',
      stop: '2 stop',
    },
    class: 'Business',
    bucket: {
      luggage: '40 kg',
      bag: '7 kg',
    },
    airlines: 'Air Transat',
    routes: {
      arrivalDate: 'Thu, July 13',
      arrivalTime: '9:45',
      departureDate: 'Thu, July 14',
      departureTime: '16:45',
      departureCityCode: 'YYC',
      departureCity: 'Calgary, Alberta, Canada',
      departureTerminal: 'Calgary International Airport',
      arrivalCityCode: 'YYZ',
      arrivalCity: 'Mississauga',
      arrivalTerminal: 'Toronto Pearson International Airport ',
      layover: [
        {
          layoverCityCode: 'YVR',
          layoverCity: 'Richmond, British Columbia',
          layoverTerminal: 'Vancouver International Airport',
          layoverTime: '1 hr 30 mins Transit',
        },
      ],
    },
    cheapest: false,
    best: true,
    quickest: true,
  },
  {
    id: 9,
    image: '/airlines-logo/porter-airlines.webp',
    title: 'Porter Airlines',
    price: '$540.40',
    meta: {
      model: 'Airbus A430-400',
      hours: '34h 05m',
      stop: '2 stop',
    },
    class: 'First Class',
    bucket: {
      luggage: '40 kg',
      bag: '7 kg',
    },
    airlines: 'Porter Airlines',
    routes: {
      arrivalDate: 'Thu, July 13',
      arrivalTime: '9:45',
      departureDate: 'Thu, July 14',
      departureTime: '16:45',
      departureCityCode: 'YUL',
      departureCity: 'Dorval',
      departureTerminal:
        'Montreal-Pierre Elliott Trudeau International Airport',
      arrivalCityCode: 'CDG',
      arrivalCity: 'Paris',
      arrivalTerminal: 'Paris Charles de Gaulle Airport',
      layover: [
        {
          layoverCityCode: 'YYZ',
          layoverCity: 'Mississauga',
          layoverTerminal: 'Toronto Pearson International Airport',
          layoverTime: '1 hr 30 mins Transit',
        },
      ],
    },
    cheapest: true,
    best: true,
    quickest: false,
  },
  {
    id: 10,
    image: '/airlines-logo/sunwing-airlines.webp',
    title: 'Sunwing Airlines',
    price: '$540.40',
    meta: {
      model: 'Airbus A430-400',
      hours: '8h 05m',
      stop: '2 stop',
    },
    class: 'First Class',
    bucket: {
      luggage: '40 kg',
      bag: '7 kg',
    },
    airlines: 'Sunwing Airlines',
    routes: {
      arrivalDate: 'Thu, July 13',
      arrivalTime: '9:45',
      departureDate: 'Thu, July 14',
      departureTime: '16:45',
      departureCityCode: 'YTZ',
      departureCity: 'Toronto, Ontario',
      departureTerminal: 'Billy Bishop Toronto City Airport',
      arrivalCityCode: 'EWR',
      arrivalCity: 'New Jersey',
      arrivalTerminal: 'Newark Liberty International Airport',
      layover: [
        {
          layoverCityCode: 'YOW',
          layoverCity: 'Ottawa',
          layoverTerminal: 'Ottawa Macdonald-Cartier International Airport',
          layoverTime: '1 hr 40 mins Transit',
        },
      ],
    },
    cheapest: true,
    best: true,
    quickest: false,
  },
  {
    id: 11,
    image: '/airlines-logo/airnorth-airlines.webp',
    title: 'Airnorth Airlines',
    price: '$540.40',
    meta: {
      model: 'Airbus A430-400',
      hours: '8h 05m',
      stop: '2 stop',
    },
    class: 'Economy',
    bucket: {
      luggage: '40 kg',
      bag: '7 kg',
    },
    airlines: 'Airnorth Airlines',
    routes: {
      arrivalDate: 'Thu, July 13',
      arrivalTime: '9:45',
      departureDate: 'Thu, July 14',
      departureTime: '16:45',
      departureCityCode: 'YHZ',
      departureCity: 'Goffs, Nova Scotia',
      departureTerminal: 'Halifax Stanfield International Airport',
      arrivalCityCode: 'YYZ',
      arrivalCity: 'Mississauga',
      arrivalTerminal: 'Toronto Pearson International Airport',
      layover: [
        {
          layoverCityCode: 'YOW',
          layoverCity: 'Ottawa',
          layoverTerminal: 'Ottawa Macdonald-Cartier International Airport',
          layoverTime: '1 hr 30 mins Transit',
        },
      ],
    },
    cheapest: true,
    best: true,
    quickest: false,
  },
  {
    id: 12,
    image: '/airlines-logo/flair-airlines.webp',

    title: 'Flair Airlines',
    price: '$540.40',
    meta: {
      model: 'Airbus A430-400',
      hours: '8h 05m',
      stop: 'direct',
    },
    class: 'Economy',
    bucket: {
      luggage: '40 kg',
      bag: '7 kg',
    },
    airlines: 'Flair Airlines',
    routes: {
      arrivalDate: 'Thu, July 13',
      arrivalTime: '9:45',
      departureDate: 'Thu, July 14',
      departureTime: '16:45',
      departureCityCode: 'YFB',
      departureCity: 'Iqaluit, Nunavut',
      departureTerminal: 'Iqaluit Airport',
      arrivalCityCode: 'YOW',
      arrivalCity: 'Ottawa',
      arrivalTerminal: 'Ottawa Macdonald-Cartier International Airport',
      layover: [
        {
          layoverCityCode: 'YZF',
          layoverCity: 'Yellowknife',
          layoverTerminal: 'Yellowknife Airport',
          layoverTime: '1 hr 30 mins Transit',
        },
      ],
    },
    cheapest: true,
    best: true,
    quickest: false,
  },
];
