import { IDropDownList } from "../store/types";

export const sortAlphabetList: IDropDownList[] = [
  { id: 1, value: "Default" },
  { id: 2, value: "Asc" },
  { id: 3, value: "Desc" },
];

export const genderList: IDropDownList[] = [
  { id: 1, value: "default" },
  { id: 2, value: "Male" },
  { id: 3, value: "Female" },
];

export const mockedUsers = [
  {
    gender: "female",
    name: {
      title: "Madame",
      first: "Marta",
      last: "Francois",
    },
    location: {
      street: {
        number: 6462,
        name: "Place du 8 Février 1962",
      },
      city: "Pomy",
      state: "Fribourg",
      country: "Switzerland",
      postcode: 2388,
      coordinates: {
        latitude: "-62.1043",
        longitude: "126.1586",
      },
      timezone: {
        offset: "-3:30",
        description: "Newfoundland",
      },
    },
    email: "marta.francois@example.com",
    login: {
      uuid: "a5a4a4a4-64dc-4d1b-b3ad-fdc73826008a",
      username: "smallwolf844",
      password: "oooo",
      salt: "p2W1hS9o",
      md5: "4bc5dce1b6aca35d13cdabeaa78e11c7",
      sha1: "bf317def120aff11261797759b6ffed06375adfc",
      sha256:
        "ec3fa4b690d650b6a35103d32b02f8d5db54ec502d27feb2b08eb0399e1fb9cb",
    },
    dob: {
      date: "1987-08-27T10:26:45.341Z",
      age: 36,
    },
    registered: {
      date: "2012-03-13T13:05:47.419Z",
      age: 11,
    },
    phone: "076 005 67 31",
    cell: "077 390 15 86",
    id: {
      name: "AVS",
      value: "756.0766.1295.93",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/women/18.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/18.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/18.jpg",
    },
    nat: "CH",
  },
  {
    gender: "male",
    name: {
      title: "Mr",
      first: "Raul",
      last: "Martin",
    },
    location: {
      street: {
        number: 8531,
        name: "Manchester Road",
      },
      city: "Coventry",
      state: "Oxfordshire",
      country: "United Kingdom",
      postcode: "UJ5 7QG",
      coordinates: {
        latitude: "39.0401",
        longitude: "-42.1359",
      },
      timezone: {
        offset: "+5:00",
        description: "Ekaterinburg, Islamabad, Karachi, Tashkent",
      },
    },
    email: "raul.martin@example.com",
    login: {
      uuid: "286f139c-a0ba-4924-a9e5-74c8ad64baa7",
      username: "saddog290",
      password: "molly",
      salt: "OC2PjMkG",
      md5: "3545e3e30b2955d1858481afeeee1742",
      sha1: "97c3af3ba480dfa1a20571fbd5d06faf45290a29",
      sha256:
        "8c0e197695d42c5e5f0b8919979ebe877517eb661627fd0fe87c82feee981086",
    },
    dob: {
      date: "1978-07-13T13:09:55.683Z",
      age: 45,
    },
    registered: {
      date: "2007-08-28T18:25:36.008Z",
      age: 16,
    },
    phone: "024 7940 6102",
    cell: "07129 743283",
    id: {
      name: "NINO",
      value: "RZ 29 55 01 T",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/men/52.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/52.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/52.jpg",
    },
    nat: "GB",
  },
];
