interface OpenHours {
  from: string;
  to: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  photo: string;
}

export interface Review {
  client: User;
  gym: string;
  rating: number;
  reviewText: string;
  updatedAt: Date;
}

export interface Gym {
  _id: string;
  name: string;
  email: string;
  role: string;
  photo: string;
  about: string;
  services: string[];
  openHours: OpenHours;
  avgRating: number;
  totalRating: number;
  address: string;
  reviews: Review[];
  membershipPrice: {
    oneSession: string;
    oneMonth: string;
    sixMonth: string;
    oneYear: string;
  };
}

export interface Trainer {
  _id: string;
  name: string;
  email: string;
  role: string;
  photo: string;
  about: string;
  services: string[];
  avgRating: number;
  totalRating: number;
  reviews: Review[];
  membershipPrice: {
    oneSession: string;
    oneMonth: string;
    sixMonth: string;
    oneYear: string;
  };
}

export interface Dietician {
  _id: string;
  name: string;
  email: string;
  role: string;
  photo: string;
  about: string;
  services: string[];
  avgRating: number;
  totalRating: number;
  reviews: Review[];
  membershipPrice: {
    oneSession: string;
    oneMonth: string;
    sixMonth: string;
    oneYear: string;
  };
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  role: string;
  photo: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface GymFormData {
  name: string;
  email: string;
  password: string;
  about: string;
  role: string;
  photo: string;
  services: string[];
  openHours: OpenHours;
  address: string;
  membershipPrice: {
    oneSession: string;
    oneMonth: string;
    sixMonth: string;
    oneYear: string;
  };
}

export interface TrainerFormData {
  name: string;
  email: string;
  password: string;
  about: string;
  role: string;
  photo: string;
  services: string[];
  membershipPrice: {
    oneSession: string;
    oneMonth: string;
    sixMonth: string;
    oneYear: string;
  };
}

export interface DieticianFormData {
  name: string;
  email: string;
  password: string;
  about: string;
  role: string;
  photo: string;
  services: string[];
  membershipPrice: {
    oneSession: string;
    oneMonth: string;
    sixMonth: string;
    oneYear: string;
  };
}

export interface Membership {
  _id: string;
  name: string;
  photo: string;
  endDate: Date;
}

export interface Chat {
  _id: string;
  chatName: string;
  business: {
    businessType: string;
    businessData: {
      _id: string;
      name: string;
      photo: string;
    };
  };
  client: {
    _id: string;
    name: string;
    photo: string;
  };
  latestMessage: {
    sender: {
      senderType: string;
      senderData: {
        name: string;
        photo: string;
      };
    };
    content: string;
    createdAt: Date;
  };
}

export interface Message {
  sender: {
    senderType: "Client" | "Gym" | "Trainer" | "Dietician";
    senderData: string;
  };
  content: string;
  chat: string;
  createdAt: Date;
}

export interface Notification {
  sender: {
    senderType: "Client" | "Gym" | "Trainer" | "Dietician";
    senderData: {
      _id: string;
      name: string;
      photo: string;
    };
  };
  content: string;
  chat: Chat;
  createdAt: Date;
}