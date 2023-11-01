export interface IUserInfo {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  dob: {
    date: string;
    age: number;
  };
  phone: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  //   nat: string;
}

interface RandomUserResponse {
  results: IUserInfo[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export interface userReducerState {
  allUsers: IUserInfo[];
  data: IUserInfo[];
  searchValue: string | undefined;
  ageValue: number | 0;
  search: boolean;
  error: boolean;
  loading: boolean;
  errorMessage: string;
  searchResults: IUserInfo[] | null;
  totalPages: number;
  currentPage: number;
  pageLength: number;
  pageData: IUserInfo[];
  activeOrder: string;
  activeGender: string;
}

export interface APP_ACTIONS {
  type: string;
  payload: {
    users?: IUserInfo[];
    errorMsg?: string;
    id?: string;
    searchValue?: string;
    activeCategory: string;
    activeDate: string;
  };
}

export interface IDropDownList {
  id: number;
  value: string;
}
[];
