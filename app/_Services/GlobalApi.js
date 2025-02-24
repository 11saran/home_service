import request, {gql} from "graphql-request"

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL
const AUTH_TOKEN = process.env.NEXT_PUBLIC_MUTATION_TOKEN

const getCategory = async()=>{
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
}


const getAllBusinessList=async()=>{
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
}

export default { getCategory, getAllBusinessList };
