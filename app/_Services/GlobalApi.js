import request, { gql } from "graphql-request";

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const AUTH_TOKEN = process.env.NEXT_PUBLIC_MUTATION_TOKEN;

const getCategory = async () => {
  const query = gql`
    query GetCategories {
      categories {
        id
        name
        icon {
          url
        }
        bgcolor {
          hex
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getAllBusinessList = async () => {
  const query = gql`
    query BusinessList {
      businessLists {
        about
        address
        category {
          name
        }
        contactPerson
        email
        images {
          url
        }
        id
        name
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getBusinessByCategory = async (category) => {
  const query =
    gql`
    query MyQuery {
      businessLists(where: { category: { name: "` +
    category +
    `" } }) {
        about
        address
        category {
          name
        }
        contactPerson
        email
        id
        name
        images {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getBusinessById = async (id) => {
  const query =
    gql`
  query GetBusinessById {
    businessList(where: { id: "` +
    id +
    `" }) {
      about
      address
      category {
        name
      }
      contactPerson
      email
      id
      name
      images {
        url
      }
    }
  }
`;
  const result = await request(MASTER_URL, query);
  return result;
};

const createNewBooking = async (
  businessId,
  date,
  time,
  userEmail,
  userName
) => {
  const mutationQuery =
    gql`
    mutation CreateBooking {
      createBooking(
        data: {
          bookingStatus: booked
          business: { connect: { id: "` +
    businessId +
    `" } }
          date: "` +
    date +
    `"
          time: "` +
    time +
    `"
          userEmail: "` +
    userEmail +
    `"
          userName: "` +
    userName +
    `"
        }
      ) {
        id
      }
       publishManyBookings(to: PUBLISHED) {
    count
  }
    }
  `;
  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

const BusinessBooedSlot =async(businessId,date)=>{
  const query =
    gql`
    query BusinessBookedSlot {
      bookings(where: { business: { id: "` +
    businessId +
    `" }, date: "` +
    date +
    `" }) {
        date
        time
      }
    }
  `;
   const result = await request(MASTER_URL, query);
   return result;
}

const GetUserBookingHistory = async(userEmail)=>{
  const query =
    gql`
  query GetUserBookinigHistory {
  bookings(where: {userEmail: "` +
    userEmail +
    `"},orderBy: publishedAt_DESC) {
    business {
      name
      images {
        url
      }
      contactPerson
      address
    }
    date
    time
  }
}
  `;
   const result = await request(MASTER_URL, query);
   return result;
}

export default {
  getCategory,
  getAllBusinessList,
  getBusinessByCategory,
  getBusinessById,
  createNewBooking,
  BusinessBooedSlot,
  GetUserBookingHistory,
};
